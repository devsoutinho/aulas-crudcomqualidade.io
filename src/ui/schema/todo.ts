import { z as schema } from "zod";
// Model/Schema
// interface Todo {
//   id: string;
//   content: string;
//   date: Date;
//   done: boolean;
// }
export const TodoSchema = schema.object({
  id: schema.string().uuid(),
  content: schema.string().nonempty(),
  date: schema.string().datetime(),
  done: schema.boolean(),
});

export type Todo = schema.infer<typeof TodoSchema>;
