import { todoController } from "@server/controller/todo";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "PUT") {
    todoController.toggleDone(request, response);
    return;
  }

  response.status(405).json({
    error: {
      message: "Method not allowed",
    },
  });
}
