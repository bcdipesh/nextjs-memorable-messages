"use server";

import { type Occasion } from "@/app/occasions/_lib/types";

export async function scheduleOccasion({
  occasion,
  occasionId,
  action,
}: {
  occasion?: Occasion;
  occasionId?: string;
  action: "CREATE" | "UPDATE" | "DELETE";
}) {
  let API_URL = `http://127.0.0.1:5000/api/v1/occasions/schedule?action=${action}`;

  if (process.env.NODE_ENV === "production") {
    API_URL = `${process.env.MEMORABLE_MESSAGES_API}/occasions/schedule?action=${action}`;
  }

  switch (action) {
    case "CREATE": {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(occasion),
      });

      console.log(await res.json());
      break;
    }
    case "UPDATE": {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(occasion),
      });

      console.log(await res.json());
      break;
    }
    case "DELETE": {
      const res = await fetch(
        `http://127.0.0.1:5000/api/v1/occasions/schedule/${occasionId}`,
        {
          method: "DELETE",
        }
      );

      console.log(await res.json());
      break;
    }
    default: {
      break;
    }
  }
}
