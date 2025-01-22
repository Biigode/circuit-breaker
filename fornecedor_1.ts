import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

app.get("/precos", (req: Request, res: Response) => {
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

app.listen(3002, () => {
  console.log("Fornecedor 1 executando na porta 3004");
});
