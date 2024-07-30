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
        limit: 2,
    });
}

function filterTodosByContent<Todo>(
    search: string,
    todos: Array<Todo & { content: string }>
): Array<Todo> {
    // Vai representar as todos na minha HomePage
    const homeTodos = todos.filter((todo) => {
        const searchNormalized = search.toLowerCase();
        const contentNormalized = todo.content.toLowerCase();
        // P -5:56
        return contentNormalized.includes(searchNormalized);
    });
    return homeTodos;
}

// Parei Aqui -> 04:43
interface TodoControllerCreateParams {
    content?: string;
    onError: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (todos: any) => void;
}

function create({ content, onError, onSuccess }: TodoControllerCreateParams) {
    console.log("controller.content", content);
    // Fail Fast
    // se não tiver o content
    if (!content) {
        onError();
        return; // O return, para parar de executar o controller.
    }

    const todo = {
        id: "12345",
        content,
        date: new Date(),
        done: false,
    };

    // Perei em 2:46
    onSuccess(todo);
    // console.log("Criada com sucesso");
}

export const todoController = {
    get,
    filterTodosByContent,
    create,
};
