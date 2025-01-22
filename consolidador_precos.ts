const FORNECEDOR_1 = "http://localhost:3002/precos";
const FORNECEDOR_2 = "http://localhost:3003/precos";
const FORNECEDOR_3 = "http://localhost:3004/precos";

const consolidarPrecos = async () => {
  const fornecedores = [FORNECEDOR_1, FORNECEDOR_2, FORNECEDOR_3];
  const fornecedoresPromises = fornecedores.map((fornecedor) => {
    return fetch(fornecedor, {
      headers: {
        contentType: "application/json",
      },
    });
  });

    const precos = await Promise.all(fornecedoresPromises);
};
