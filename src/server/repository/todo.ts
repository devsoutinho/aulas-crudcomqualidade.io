import {
  read,
  create,
  update,
  deleteById as dbDeleteById,
} from "@db-crud-todo";
import { HttpNotFoundError } from "@server/infra/errors";
import { createClient } from "@supabase/supabase-js";

// =========
// TODO: Move to another file
const PROJECT_URL = process.env.SUPABASE_URL || "";
const SECRET_KEY = process.env.SUPABASE_SECRET_KEY || "";
const supabase = createClient(PROJECT_URL, SECRET_KEY);
// =========

interface TodoRepositoryGetParams {
  page?: number;
  limit?: number;
}
interface TodoRepositoryGetOutput {
  todos: Todo[];
  total: number;
  pages: number;
}
async function get({
  page,
  limit,
}: TodoRepositoryGetParams = {}): Promise<TodoRepositoryGetOutput> {
  const { data, error, count } = await supabase.from("todos").select("*", {
    count: "exact",
  });

  if (error) throw new Error("Failed to fetch data");

  const todos = data as Todo[];
  // TODO: Enhance that code
  return {
    todos,
    total: count || todos.length,
    pages: 1,
  };

  // const currentPage = page || 1;
  // const currentLimit = limit || 10;
  // const ALL_TODOS = read().reverse();

  // const startIndex = (currentPage - 1) * currentLimit;
  // const endIndex = currentPage * currentLimit;
  // const paginatedTodos = ALL_TODOS.slice(startIndex, endIndex);
  // const totalPages = Math.ceil(ALL_TODOS.length / currentLimit);

  // return {
  //   total: ALL_TODOS.length,
  //   todos: paginatedTodos,
  //   pages: totalPages,
  // };
}

async function createByContent(content: string): Promise<Todo> {
  const newTodo = create(content);

  return newTodo;
}

async function toggleDone(id: string): Promise<Todo> {
  const ALL_TODOS = read();

  const todo = ALL_TODOS.find((todo) => todo.id === id);

  if (!todo) throw new Error(`Todo with id "${id}" not found`);

  const updatedTodo = update(todo.id, {
    done: !todo.done,
  });

  return updatedTodo;
}

async function deleteById(id: string) {
  const ALL_TODOS = read();
  const todo = ALL_TODOS.find((todo) => todo.id === id);

  if (!todo) throw new HttpNotFoundError(`Todo with id "${id}" not found`);
  dbDeleteById(id);
}

export const todoRepository = {
  get,
  createByContent,
  toggleDone,
  deleteById,
};

// Model/Schema
interface Todo {
  id: string;
  content: string;
  date: string;
  done: boolean;
}
