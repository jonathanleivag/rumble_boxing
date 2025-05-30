import { seed } from "@/lib/db/actions/user.action";
import { connectToMongoDB } from "@/lib/db/mongoose";
import z from "zod";

const userSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "El password es requerido"),
});

export async function POST(request: Request) {
  await connectToMongoDB();
  const res = await request.json();
  const result = userSchema.safeParse(res);

  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path[0],
      message: issue.message,
    }));
    return Response.json(errors, { status: 400 });
  }

  try {
    const data = await seed(res);
    return Response.json({ data }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al crear el usuario:", error.message);
      return Response.json(
        { error: "Error al crear el usuario" },
        { status: 500 }
      );
    }
    return Response.json({ error: "Error desconocido" }, { status: 500 });
  }
}
