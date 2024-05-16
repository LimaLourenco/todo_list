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
        const todosFromServer = parseTodosFromServer(
            JSON.parse(todosString)
        ).todos;
        // return todosFromServer;

        console.log("page", page);
        console.log("limit", limit);

        const ALL_TODOS = todosFromServer;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedTodos = ALL_TODOS.slice(startIndex, endIndex);
        const totalPages = Math.ceil(ALL_TODOS.length / limit);

        return {
            todos: paginatedTodos,
            total: ALL_TODOS.length,
            pages: totalPages,
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

function parseTodosFromServer(responseBody: unknown): { todos: Array<Todo> } {
    console.log("responseBody", responseBody);

    // P -> 5:27 -> 9:55
    if (
        responseBody !== null &&
        typeof responseBody === "object" &&
        "todos" in responseBody &&
        Array.isArray(responseBody.todos)
    ) {
        console.log("responseBody", responseBody.todos);

        return {
            todos: responseBody.todos.map((todo: unknown) => {
                if (todo === null && typeof todo !== "object") {
                    throw new Error("Invalid todo from API");
                }

                const { id, content, done, date } = todo as {
                    id: string;
                    content: string;
                    date: string;
                    done: string;
                };

                return {
                    id,
                    content,
                    done: Boolean(done),
                    date: new Date(date),
                };
            }),
        };
    }

    return {
        todos: [],
    };
}
