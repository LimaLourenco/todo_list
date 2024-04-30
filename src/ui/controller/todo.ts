interface TodoControllerGetParams {
    // Aqui será recebido os parametros do meu GET controller;
    page?: number;
}

// Vai retornar um dado assincrono, porque eu não sei quando este dado vai retorna.
async function get({ page }: TodoControllerGetParams = {}) {
    return fetch("/api/todos").then(async (respostaDoServidor) => {
        // Pegando os dados que vem do Back-end, ou seja, do banco de dados
        const todosString = await respostaDoServidor.text();
        const todosFromServer = JSON.parse(todosString).todos;
        return todosFromServer;

        // console.log("III", todos);
        // todos = [...todosFromServer];

        // setTodos(todosFromServer);

        // console.log("YYY", todos);

        // console.log("TODOS", respostaDoServidor);
        // console.log("TODOS", todos);
    });
}

export const todoController = {
    get,
};
