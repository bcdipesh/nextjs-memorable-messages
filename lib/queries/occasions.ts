"use server";

import { db } from "@/lib/db";
import { type Occasion } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";

export async function getOccasions(): Promise<{
  occasions?: Occasion[];
  error?: string;
}> {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "User not found.",
    };
  }

  try {
    const occasions = (await db.occasion.findMany({
      where: {
        userId,
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
  const { userId } = auth();

  if (!userId) {
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
