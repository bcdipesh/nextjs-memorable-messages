"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  occasionType: z.string().min(1, "Occasion Type is required"),
  message: z.string().min(1, "Message is required"),
  receiverEmail: z.string().email("Please provide a valid email address"),
  deliveryMethod: z.enum(["Email", "SMS"], {
    message: "Only Email and SMS can be used as delivery method",
  }),
  deliveryDate: z.string(),
});

export async function createOccasion(
  formData: z.infer<typeof FormSchema>,
): Promise<{
  error?: string;
}> {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "User not found.",
    };
  }

  try {
    await db.occasion.create({
      data: {
        ...formData,
        deliveryDate: new Date(formData.deliveryDate),
        userId,
      },
    });

    revalidatePath("/occasions");
  } catch (error) {
    return {
      error: "Database error.",
    };
  }
  redirect("/occasions");
}
