"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getUser, isLoggedIn } from "@/app/occasions/_lib/utils";
import { db } from "@/lib/db";
import { scheduleOccasion } from "@/app/occasions/_actions/schedule-occasion";

export async function deleteOccasion(
  occasionId: string
): Promise<{ message?: string; error?: string }> {
  if (!(await isLoggedIn())) {
    return redirect("/api/auth/login");
  }

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
    scheduleOccasion({ occasionId, action: "DELETE" });
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
