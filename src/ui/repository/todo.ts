interface TodoRepositoryGetParams {}

interface TodoRepositoryGetOutput {
    todos: Todo[];
}

function get({}: TodoRepositoryGetParams): TodoRepositoryGetOutput {}

export const todoRepository = {
    get,
};

// Seria uma Model ou Schema - // Parei em 9:45
interface Todo {
    id: string;
    content: string;
    date: Date;
    done: boolean;
}
