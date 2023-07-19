import { todoController } from "@server/controller/todo";

export async function GET(request: Request) {
  return await todoController.get(request);
}

export async function POST(request: Request) {
  return await todoController.create(request);
}

/*
import { NextApiRequest, NextApiResponse } from "next";
import { todoController } from "@server/controller/todo";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // eslint-disable-next-line no-console
  // console.log(request.method);

  if (request.method === "GET") {
    await todoController.get(request, response);
    return;
  }

  if (request.method === "POST") {
    await todoController.create(request, response);
    return;
  }

  // response.status(405).json({
  //   error: {
  //     message: "Method not allowed",
  //   },
  // });
}
*/
