import { todoRepository } from "@server/repository/todo";
import { NextApiRequest, NextApiResponse } from "next";

function get(req: NextApiRequest, res: NextApiResponse) {
    const query = req.query;

    console.log("query", query.page);

    // Quando for mandar para tela do usuario --> output
    const output = todoRepository.get({
        page: query.page, // P -> 19:50
        limit: query.limit,
    });

    res.status(200).json({
        total: output.total,
        pages: output.pages,
        todos: output.todos,
    });
}

export const todoController = {
    // As operações
    get,
};
