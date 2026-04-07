"use server";
import { z } from "zod";

const subscribeSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address",
  }),
});

export async function subscribeAction(prevState: any, formData: FormData) {
  console.log("Our first server action");
  const email = formData.get("email");

  const validatedFields = subscribeSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    const fieldErrors = z.treeifyError(validatedFields.error);
    console.dir(fieldErrors, { depth: null });

    return {
      ...prevState,
      zodErrors: fieldErrors,
      strapiErrors: null,
    };
  }

  console.log(email, "Our email input from form");
}
