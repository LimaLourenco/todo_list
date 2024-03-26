
import fs from "fs"; // ES6.
import { v4 as uuid } from 'uuid';
const DB_FILE_PATH = "./core_do_projeto/db";

console.log("[CRUD]");

type UUID = string;

interface Todo {
    id: UUID;
    date: string;
    content: string; 
    done: boolean;
}

function create(content: string): Todo {
   
    const todo: Todo = {
        id: uuid(),
        date: new Date().toISOString(), 
        content: content,
        done: false
    };


    const todos: Array<Todo> = [ 
        ...read(), 
        todo,
    ]

    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
        todos, 
        dogs: [],
    }, null, 2)) 
    return todo;
}

function read(): Array<Todo> { 
    const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");

    console.log(dbString, "III");

    const db = JSON.parse(dbString || "{}"); 
    if (!db.todos) {
        return [];
    }
    return db.todos;
}

function update(id: UUID, partialTodo: Partial<Todo>): Todo { 
    let updatedTodo;
    const todos = read(); 
    todos.forEach((currentTodo) => { 
        const isToUpdate = currentTodo.id === id; 
        if (isToUpdate) {
            updatedTodo = Object.assign(currentTodo, partialTodo); 
        }
    }); 

    
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
        todos,
    }, null, 2))

    console.log("TODOS ATUALIZADAS", todos);

    if (!updatedTodo) {
        throw new Error("Não foi possivél encontrar o ID!");
    }

    return updatedTodo;
}

function updateContentById(id: UUID, content: string): Todo {
    return update(id, {
        content,
    })
}

function deleteById(id: UUID) {
    const todos = read(); 

    const todosWithoutOne = todos.filter((todo) => {
        if (id === todo.id) { 
            return false; 
        }

        return true;
    })

    console.log("todosWithoutOne", todosWithoutOne);

    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
        todos: todosWithoutOne,
    }, null, 2))
}

function CRUD_DB() {
    fs.writeFileSync(DB_FILE_PATH, "");
}

CRUD_DB();
create("Primeira TODO!!!");

const secondTodo = create("Segunda TODO!!!");
deleteById(secondTodo.id); 

const thirdTodo = create("Segunda TODO!!!");
const fourTodo = create("Segunda TODO!!!");

updateContentById(thirdTodo.id, "Terceira TODO com um novo content!"); 
updateContentById(fourTodo.id, "Quarta TODO com um novo content!"); 

const todos = read();

console.log(todos, 'GG');
console.log(todos.length);


