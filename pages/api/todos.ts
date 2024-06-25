import { NextApiRequest, NextApiResponse } from "next";
// import { read } from "../../core_do_projeto/core";
// import { read } from "@db-crud-todo";
import { todoController } from "@server/controller/todo";

// handler -> A funcao handler(), é a função que captura o request pra mim (ou seja as solicitações).
// E também faz o conectar, ou conexão do sistema.
// O handler de requisição, vai pega a chamada que foi feita, ou realizada, depois chama o controller e devolver.
export default function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    // eslint-disable-next-line no-console
    console.log(request.method, "XX");
    if (request.method === "GET") {
        todoController.get(request, response);
        return;
    }

    if (request.method === "POST") {
        todoController.create(request, response);
        return;
    }

    response.status(405).json({
        message: "Method not allowed",
    });
}
