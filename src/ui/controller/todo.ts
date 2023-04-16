import { todoRepository } from "@ui/repository/todo";
import { Todo } from "@ui/schema/todo";
import { z as schema } from "zod";

interface TodoControllerGetParams {
  page: number;
}
async function get(params: TodoControllerGetParams) {
  // Fazer a lógica de pegar os dados
  return todoRepository.get({
    page: params.page,
    limit: 2,
  });
}

function filterTodosByContent<Todo>(
  search: string,
  todos: Array<Todo & { content: string }>
): Array<Todo> {
  const homeTodos = todos.filter((todo) => {
    const searchNormalized = search.toLowerCase();
    const contentNormalized = todo.content.toLowerCase();
    return contentNormalized.includes(searchNormalized);
  });

  return homeTodos;
}

interface TodoControllerCreateParams {
  content?: string;
  onError: (customMessage?: string) => void;
  onSuccess: (todo: Todo) => void;
}
function create({ content, onSuccess, onError }: TodoControllerCreateParams) {
  // Fail Fast
  const parsedParams = schema.string().nonempty().safeParse(content);
  if (!parsedParams.success) {
    onError();
    return;
  }

  todoRepository
    .createByContent(parsedParams.data)
    .then((newTodo) => {
      onSuccess(newTodo);
    })
    .catch(() => {
      onError();
    });
}

interface TodoControllerToggleDoneParams {
  id: string;
  updateTodoOnScreen: () => void;
  onError: () => void;
}
function toggleDone({
  id,
  updateTodoOnScreen,
  onError,
}: TodoControllerToggleDoneParams) {
  // Optmistic Update
  // updateTodoOnScreen();

  todoRepository
    .toggleDone(id)
    .then(() => {
      // Update Real
      updateTodoOnScreen();
    })
    .catch(() => {
      onError();
    });
}

async function deleteById(id: string): Promise<void> {
  const todoId = id;
  await todoRepository.deleteById(todoId);
}

export const todoController = {
  get,
  filterTodosByContent,
  create,
  toggleDone,
  deleteById,
};
