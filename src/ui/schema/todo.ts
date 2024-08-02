import { z as schema } from "zod";

// interface Todo {
//     id: string;
//     content: string;
//     date: Date;
//     done: boolean;
// }

// Parei no 2:00
export const TodoSchema = schema.object({
    id: schema.string().uuid(),
    content: schema.string(),
    date: schema.string().datetime(),
    done: schema.boolean(),
});
