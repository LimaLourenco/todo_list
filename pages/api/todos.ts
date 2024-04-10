import { NextApiRequest, NextApiResponse } from "next";
// import { read } from "../../core_do_projeto/core";
// import { read } from "@db-crud-todo";
import { todoController } from "@server/controller/todo";

// handler -> faz a conexão do sistema.
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

    response.status(405).json({
        message: "Method not allowed",
    });
}
