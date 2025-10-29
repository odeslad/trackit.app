import type { ActionFunctionArgs } from "react-router-dom";

export const Action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = formData.get("name") as string | null;
  return { message: `Hello, ${name ?? "Guest"}! Your form was submitted successfully.` };
}