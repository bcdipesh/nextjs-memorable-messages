"use server";

import { type Occasion } from "@/app/occasions/_lib/types";
import { getUser, isLoggedIn } from "@/app/occasions/_lib/utils";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";


export async function getOccasions(): Promise<{
  occasions?: Occasion[];
  error?: string;
}> {
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
    const occasions = (await db.occasion.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })) as Occasion[];

    return { occasions };
  } catch (error) {
    return {
      error: "Database error.",
    };
  }
}

export async function getOccasionById(occasionId: string): Promise<{
  occasion?: Occasion | null;
  error?: string;
}> {
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
    const occasion = (await db.occasion.findUnique({
      where: {
        id: occasionId,
      },
    })) as Occasion;

    return {
      occasion,
    };
  } catch (error) {
    return {
      error: "Database error.",
    };
  }
}
