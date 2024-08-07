import { z as schema } from "zod";
import { Todo, TodoSchema } from "@ui/schema/todo";

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
    // Passando dinamicamente para o todos, o page e limit
    return fetch(`/api/todos?page=${page}&limit=${limit}`).then(
        async (respostaDoServidor) => {
            // Pegando os dados que vem do Back-end, ou seja, do banco de dados
            const todosString = await respostaDoServidor.text();
            const responseParsed = parseTodosFromServer(
                JSON.parse(todosString)
            );
            // return todosFromServer;

            console.log("page", page);
            console.log("limit", limit);

            // const ALL_TODOS = todosFromServer;
            // const startIndex = (page - 1) * limit;
            // const endIndex = page * limit;
            // const paginatedTodos = ALL_TODOS.slice(startIndex, endIndex); // Resolvido o caso do tipo any
            // const totalPages = Math.ceil(ALL_TODOS.length / limit);

            return {
                todos: responseParsed.todos,
                total: responseParsed.total,
                pages: responseParsed.pages,
            };

            // console.log("III", todos);
            // todos = [...todosFromServer];

            // setTodos(todosFromServer);

            // console.log("YYY", todos);

            // console.log("TODOS", respostaDoServidor);
            // console.log("TODOS", todos);
        }
    );
}

export async function createByContent(content: string): Promise<Todo> {
    const response = await fetch("/api/todos", {
        method: "POST",
        // Que tipo de dado estou enviando para o servidor, conhecido como MIME Type
        headers: {
            "Content-type": "application/json",
        },
        // Estou dando o conteudo para ser enviado
        // Vai ser enviado no body
        // Pela rede, só se trafegá String, então não pode ser somente o objeto do javaScript.
        body: JSON.stringify({
            content,
        }),
    });

    if (response.ok) {
        const serverResponse = await response.json();
        // É o serverResponse -> { todo: com tipo que eu espero -> Todo }
        // TodoSchema.safeParse()
        // Realizei uma composição aqui
        const ServerResponseSchema = schema.object({
            // Este todo vai o todoSchema
            todo: TodoSchema,
        });

        const serverResponseParsed =
            ServerResponseSchema.safeParse(serverResponse);

        if (!serverResponseParsed.success) {
            throw new Error("Failed to create TODO :(");
        }

        console.log("serverResponse", serverResponse);

        console.log("serverResponse", serverResponseParsed);
        const todo = serverResponseParsed.data.todo;
        return todo;
    }
    // Se não tiver ok o response
    throw new Error("Failed to create TODO");
}

export const todoRepository = {
    get,
    createByContent,
};

// Seria um exemplo de: Model ou Schema - // Parei em 9:45
// interface Todo {
//     id: string;
//     content: string;
//     date: Date;
//     done: boolean;
// }

function parseTodosFromServer(responseBody: unknown): {
    total: number;
    pages: number;
    todos: Array<Todo>;
} {
    console.log("responseBody", responseBody);

    // P -> 5:27 -> 9:55
    if (
        responseBody !== null &&
        typeof responseBody === "object" &&
        "todos" in responseBody &&
        "total" in responseBody &&
        "pages" in responseBody &&
        Array.isArray(responseBody.todos)
    ) {
        console.log("responseBody", responseBody.todos);

        return {
            total: Number(responseBody.total),
            pages: Number(responseBody.pages),
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
                    done: String(done).toLowerCase() === "true", // O valor passa a ser um boolean
                    // date: new Date(date),
                    date: date,
                };
            }),
        };
    }

    return {
        pages: 1,
        total: 0,
        todos: [],
    };
}
