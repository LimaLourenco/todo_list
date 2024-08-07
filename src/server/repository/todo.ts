import { read, create } from "@db-crud-todo";

interface TodoRepositoryGetParams {
    page?: number;
    limit?: number;
}

interface TodoRepositoryGetOutput {
    todos: Todo[];
    total: number;
    pages: number;
}

function get({
    page,
    limit,
}: TodoRepositoryGetParams = {}): TodoRepositoryGetOutput {
    // page: 1,
    // limit: 2,

    const currentPage = page || 1;
    const currentPageLimit = limit || 10;

    console.log(currentPage, currentPageLimit);

    const ALL_TODOS = read().reverse(); // Peguei aqui as informações

    const startIndex = (currentPage - 1) * currentPageLimit;
    const endIndex = currentPage * currentPageLimit;
    const paginatedTodos = ALL_TODOS.slice(startIndex, endIndex); // Resolvido o caso do tipo any
    const totalPages = Math.ceil(ALL_TODOS.length / currentPageLimit);

    return {
        total: ALL_TODOS.length,
        todos: paginatedTodos,
        pages: totalPages,
    };
}

async function createByContent(content: string): Promise<Todo> {
    const newTodo = create(content);

    return newTodo;
}

export const todoRepository = {
    get,
    createByContent,
};

// Model/Schema -> P: 17:58
interface Todo {
    id: string;
    content: string;
    date: string;
    done: boolean;
}
