import { todoRepository } from "@server/repository/todo";
import { NextApiRequest, NextApiResponse } from "next";

function get(_req: NextApiRequest, res: NextApiResponse) {
    // Quando for mandar para tela do usuario -> output
    const output = todoRepository.get();

    res.status(200).json({
        todos: output.todos,
    });
}

export const todoController = {
    // As operações
    get,
};
