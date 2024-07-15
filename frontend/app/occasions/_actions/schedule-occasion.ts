"use server";

import { type Occasion } from "@/app/occasions/_lib/types";

export async function scheduleOccasion({
  occasion,
  action,
}: {
  occasion: Occasion;
  action: "CREATE" | "UPDATE" | "DELETE";
}) {
  let API_URL = "http://127.0.0.1:5000/api/v1/occasions/schedule";

  if (process.env.NODE_ENV === "production") {
    API_URL = `${process.env.MEMORABLE_MESSAGES_API}/occasions/schedule`;
  }

  if (action === "CREATE") {
    const res = await fetch(
      "https://memorablemessagesapi.vercel.app/api/v1/occasions/schedule",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(occasion),
      }
    );
    const data = await res.json();
    console.log(data);
  }
}
