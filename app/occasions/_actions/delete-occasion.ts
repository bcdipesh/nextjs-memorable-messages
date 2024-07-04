"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteOccasion(
  occasionId: string,
): Promise<{ message?: string; error?: string }> {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "User not found.",
    };
  }

  try {
    await db.occasion.delete({
      where: {
        id: occasionId,
        userId,
      },
    });

    revalidatePath("/occasions");

    return {
      message: "Occasion successfully deleted.",
    };
  } catch (error) {
    return {
      error: "Database error.",
    };
  }
}
