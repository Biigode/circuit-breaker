import express from "express";

const app = express();
app.use(express.json());

app.get("/precos", (req, res) => {
  console.log("Recebendo  requisição no fornecedor 2");
  const produtos = [
    {
      id: 1,
      nome: "Arroz",
      preco: 10,
    },
    {
      id: 2,
      nome: "Feijão",
      preco: 8,
    },
    {
      id: 3,
      nome: "Macarrão",
      preco: 5,
    },
    {
      id: 4,
      nome: "Carne",
      preco: 25,
    },
  ];
  res.json(produtos);
});

app.listen(3003, () => {
  console.log("Fornecedor 1 executando na porta 3003");
});
