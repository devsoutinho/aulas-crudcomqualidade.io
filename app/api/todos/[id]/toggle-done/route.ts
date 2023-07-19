import { todoController } from "@server/controller/todo";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  return todoController.toggleDone(request, params.id);
}

// import { todoController } from "@server/controller/todo";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   request: NextApiRequest,
//   response: NextApiResponse
// ) {
//   if (request.method === "PUT") {
//     await todoController.toggleDone(request, response);
//     return;
//   }

//   response.status(405).json({
//     error: {
//       message: "Method not allowed",
//     },
//   });
// }
