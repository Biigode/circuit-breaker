import { CircuitBreaker } from "./circuit_breaker.ts";

// URLs dos fornecedores
const FORNECEDOR_1 = "http://localhost:3002/precos";

// URLs dos fallbacks
const FALLBACK_1 = "http://localhost:3003/precos";
const FALLBACK_2 = "http://localhost:3004/precos";

// Instâncias do Circuit Breaker com fallback configurado
const fornecedor1CircuitBreaker = new CircuitBreaker(3, 30000, [
  FALLBACK_1,
  FALLBACK_2,
]);

const buscarDadosDoFornecedor = async (url: string) => {
  const response = await fetch(url, {
    headers: { contentType: "application/json" },
  });
  if (!response.ok) throw new Error(`Erro ao buscar ${url}`);
  return response.json();
};

// Função que consolida os preços dos fornecedores
const consolidarPrecos = async () => {
  try {
    const cbData = fornecedor1CircuitBreaker.call(() =>
      buscarDadosDoFornecedor(FORNECEDOR_1)
    );
    const resultados = await cbData;
    console.log("Preços consolidados:", resultados);
  } catch (error) {
    console.error(error);
  }
};

// Chamada periódica para consolidar os preços
setInterval(consolidarPrecos, 10000);
