"use server";

import { updateOccasion } from "@/app/occasions/[id]/_actions/update-occasion";
import { type Occasion } from "@/app/occasions/_lib/types";
import { getUser, isLoggedIn, sendEmail } from "@/app/occasions/_lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import schedule from "node-schedule";

export async function scheduleEmail(occasion: Occasion) {
  if (!(await isLoggedIn())) {
    return redirect("/api/auth/login");
  }

  const user = await getUser();

  if (!user) {
    return {
      error: "User not found.",
    };
  }

  if (occasion.deliveryDate <= new Date()) {
    const { error } = await sendEmail(occasion);

    if (!error) {
      const updatedOccasion = { ...occasion, status: "Sent" };
      await updateOccasion(updatedOccasion.id, updatedOccasion);
      revalidatePath("/occasions");
    }
  } else {
    const job = schedule.scheduleJob(occasion.deliveryDate, async () => {
      const { error } = await sendEmail(occasion);

      if (!error) {
        const updatedOccasion = { ...occasion, status: "Sent" };
        await updateOccasion(updatedOccasion.id, updatedOccasion);
        revalidatePath("/occasions");
      }
    });
  }
}
