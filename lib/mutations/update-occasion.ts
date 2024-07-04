"use server";

import { db } from "@/lib/db";
import { type Occasion } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
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

export async function updateOccasion(
  id: string,
  formData: z.infer<typeof FormSchema>,
): Promise<{
  occasion?: Occasion;
  error?: string;
}> {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "User not found.",
    };
  }

  try {
    const occasion = (await db.occasion.update({
      where: {
        id,
      },
      data: {
        ...formData,
        deliveryDate: new Date(formData.deliveryDate),
        userId,
      },
    })) as Occasion;

    revalidatePath("/occasions");

    return {
      occasion,
    };
  } catch (error) {
    return {
      error: "Database error.",
    };
  }
}
