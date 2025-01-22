import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

app.get("/precos", (req: Request, res: Response) => {
  const produtos = [
    {
      id: 1,
      nome: "Arroz",
      preco: 20,
    },
    {
      id: 2,
      nome: "Feijão",
      preco: 18,
    },
    {
      id: 3,
      nome: "Macarrão",
      preco: 15,
    },
    {
      id: 4,
      nome: "Carne",
      preco: 40,
    },
  ];
  res.json(produtos);
});

app.listen(3004, () => {
  console.log("Fornecedor 1 executando na porta 3004");
});
