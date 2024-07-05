"use server";

import { getUser } from "@/app/occasions/_lib/utils";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteOccasion(
  occasionId: string,
): Promise<{ message?: string; error?: string }> {
  const user = await getUser();

  if (!user) {
    return {
      error: "User not found.",
    };
  }

  try {
    await db.occasion.delete({
      where: {
        id: occasionId,
        userId: user.id,
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
