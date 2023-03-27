import { NextApiRequest, NextApiResponse } from "next";
import { todoController } from "@server/controller/todo";

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // eslint-disable-next-line no-console
  console.log(request.method);

  if (request.method === "GET") {
    todoController.get(request, response);
    return;
  }

  response.status(405).json({
    message: "Method not allowed",
  });
}
