import { todoRepository } from "@server/repository/todo";
import { z as zod } from "zod";
import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "uuid";

async function get(req: NextApiRequest, res: NextApiResponse) {
    const query = req.query;
    const page = Number(query.page); // Dado vem pela rede
    const limit = Number(query.limit); // Dado vem pela rede

    console.log("query page", query.page, typeof query.page);

    // console.log("query", query.page);

    console.log("query", query);

    // if (query.page && typeof query.page !== "number") {
    //     // throw new Error("page");
    //     res.status(400).json({
    //         error: {
    //             message: "`page` must be a number",
    //         },
    //     });
    //     return;
    // }

    if (query.page && isNaN(page)) {
        // throw new Error("page");
        res.status(400).json({
            error: {
                message: "`page` must be a number",
            },
        });
        return;
    }

    // if (query.page && typeof query.limit !== "number") {
    //     // throw new Error("page");
    //     res.status(400).json({
    //         error: {
    //             message: "`limit` must be a number",
    //         },
    //     });
    //     return;
    // }

    if (query.limit && isNaN(limit)) {
        // throw new Error("page");
        res.status(400).json({
            error: {
                message: "`limit` must be a number",
            },
        });
        return;
    }

    // Quando for mandar para tela do usuario --> output
    const output = todoRepository.get({
        page: page, // P -> 19:50
        limit: limit,
    });

    res.status(200).json({
        total: output.total,
        pages: output.pages,
        todos: output.todos,
    });
}

async function create(req: NextApiRequest, res: NextApiResponse) {
    const createdTodo = await todoRepository.createByContent(req.body.content);

    // Fail Fast Validations - Se o body é valido
    const body = parse(req.body);

    // Retorna un erro, caso não tenha `content`

    console.log("createdTodo", createdTodo); // P -> 9:30*

    res.status(201).json({
        // todo: {
        //     id: "112213131314",
        //     content: req.body.content, // P -> 7:39
        // },

        todo: createdTodo,
    });
}

export const todoController = {
    // As operações
    get,
    create,
};
