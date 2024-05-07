interface TodoRepositoryGetParams {
    page: number;
    limit: number;
}

interface TodoRepositoryGetOutput {
    todos: Todo[];
    pages: number;
    total: number;
}

function get({
    page,
    limit,
}: TodoRepositoryGetParams): Promise<TodoRepositoryGetOutput> {
    return fetch("/api/todos").then(async (respostaDoServidor) => {
        // Pegando os dados que vem do Back-end, ou seja, do banco de dados
        const todosString = await respostaDoServidor.text();
        const todosFromServer = JSON.parse(todosString).todos;
        // return todosFromServer;

        const ALL_TODOS = todosFromServer;

        return {
            todos: ALL_TODOS,
            total: ALL_TODOS.length,
            pages: 1,
        };

        // console.log("III", todos);
        // todos = [...todosFromServer];

        // setTodos(todosFromServer);

        // console.log("YYY", todos);

        // console.log("TODOS", respostaDoServidor);
        // console.log("TODOS", todos);
    });
}

export const todoRepository = {
    get,
};

// Seria um exemplo de: Model ou Schema - // Parei em 9:45
interface Todo {
    id: string;
    content: string;
    date: Date;
    done: boolean;
}
