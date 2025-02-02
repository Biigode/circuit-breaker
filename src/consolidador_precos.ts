import { CircuitBreaker } from "./circuit_breaker.ts";

const FORNECEDOR_1 = process.env.FORNECEDOR_1_URL || "";
const FALLBACK_1 = process.env.FALLBACK_1_URL || "";
const FALLBACK_2 = process.env.FALLBACK_2_URL || "";

// URLs dos fornecedores

const urlValidation = [FORNECEDOR_1, FALLBACK_1, FALLBACK_2].every(
  (v) => v !== undefined
);

if (!urlValidation) {
  console.error("Variáveis de ambiente não configuradas.");
  process.exit(1);
}

// Instâncias do Circuit Breaker com fallback configurado
const fornecedor1CircuitBreaker = new CircuitBreaker(3, 30000, [
  `${FALLBACK_1}/precos`,
  `${FALLBACK_2}/precos`,
]);

const buscarDadosDoFornecedor = async (url: string) => {
  const response = await fetch(`${url}/precos`, {
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
