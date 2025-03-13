# Node.js Circuit Breaker

## Requisitos

- Node.js versão 23.6.0
- Docker

## Como executar

Para rodar este projeto, execute o comando abaixo:

```sh
docker-compose up
```

Sobre o projeto
Este projeto foi desenvolvido em TypeScript e tem como objetivo ensinar o padrão de Circuit Breaker.

O que é o padrão Circuit Breaker?
O padrão de Circuit Breaker é um padrão de design usado em sistemas distribuídos para melhorar a resiliência e a estabilidade. Ele monitora as chamadas para um serviço remoto e, em caso de falhas repetidas, "desarma" o circuito para evitar novas tentativas de chamada até que o serviço se recupere. Isso ajuda a prevenir a sobrecarga de um serviço que já está falhando e permite que o sistema degrade graciosamente.