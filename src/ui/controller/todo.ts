import { todoRepository } from "@ui/repository/todo";

interface TodoControllerGetParams {
  page?: number;
}
async function get(params: TodoControllerGetParams = {}) {
  // Fazer a lógica de pegar os dados
  // eslint-disable-next-line no-console
  console.log(params);
  return todoRepository.get({
    page: 1,
    limit: 1,
  });
}

export const todoController = {
  get,
};
