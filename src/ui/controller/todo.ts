import { todoRepository } from "@ui/repository/todo";

interface TodoControllerGetParams {
    // Aqui será recebido os parametros do meu GET controller;
    page: number;
}

// Vai retornar um dado assincrono, porque eu não sei quando este dado vai retorna.
async function get(params: TodoControllerGetParams) {
    // eslint-disable-next-line no-console
    console.log(params, "OOO");
    return todoRepository.get({
        page: params.page,
        limit: 1,
    });
}

export const todoController = {
    get,
};
