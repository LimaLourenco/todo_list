import { todoRepository } from "@ui/repository/todo";

interface TodoControllerGetParams {
    // Aqui será recebido os parametros do meu GET controller;
    page?: number;
}

// Vai retornar um dado assincrono, porque eu não sei quando este dado vai retorna.
async function get({ page }: TodoControllerGetParams = {}) {
    return todoRepository.get({
        page: page || 1,
        limit: 10,
    });
}

export const todoController = {
    get,
};
