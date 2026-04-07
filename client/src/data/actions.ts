"use server";
import { z, ZodError } from "zod";
import { subscribeService } from "./services";
import { error } from "console";

const subscribeSchema = z.object({
  email: z.email({
    error: "Please enter a valid email address",
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

  const responseData = await subscribeService(validatedFields.data.email);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      errorMessage: "Ops! Something went wrong. Please try again",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      ZodErrors: null,
      errorMessage: "Failed to Subscribe.",
    };
  }

  return {
    ...prevState,
    strapiErrors: null,
    ZodErrors: null,
    errorMessage: "Successfully Subscribed!",
  };
}
