interface TodoControllerGetParams {
    // Aqui será recebido os parametros do meu GET controller;
    page?: number;
}

// Vai retornar um dado assincrono, porque eu não sei quando este dado vai retorna.
async function get({ page }: TodoControllerGetParams = {}) {}

export const todoController = {
    get,
};
