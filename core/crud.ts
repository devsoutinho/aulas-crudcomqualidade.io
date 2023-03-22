import fs from "fs"; // ES6
// const fs = require("fs"); - CommonJS
const DB_FILE_PATH = "./core/db";

console.log("[CRUD]");

interface Todo {
  date: string;
  content: string;
  done: boolean;
}

function create(content: string) {
  const todo: Todo = {
    date: new Date().toISOString(),
    content: content,
    done: false,
  };

  const todos: Array<Todo> = [
    ...read(),
    todo,
  ];

  // salvar o content no sistema
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
    todos,
    dogs: [],
  }, null, 2));
  return content;
}

function read(): Array<Todo> {
  const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
  const db = JSON.parse(dbString || "{}");
  if(!db.todos) { // Fail Fast Validations
    return [];
  }

  return db.todos;
}

function CLEAR_DB() {
  fs.writeFileSync(DB_FILE_PATH, "");
}

// [SIMULATION]
CLEAR_DB()
create("Primeira TODO");
create("Segunda TODO");
console.log(read());