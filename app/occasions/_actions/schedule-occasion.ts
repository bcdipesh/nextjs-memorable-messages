// "use server";

// import { updateOccasion } from "@/app/occasions/[id]/_actions/update-occasion";
// import { type Occasion } from "@/app/occasions/_lib/types";
// import { getUser, sendEmail } from "@/app/occasions/_lib/utils";
// import { db } from "@/lib/db";
// import { revalidatePath } from "next/cache";
// import cron from "node-cron";

// let scheduledEmails: Occasion[] = [];

// export async function scheduleEmail(occasion: Occasion) {
//   const user = await getUser();

//   if (!user) {
//     return {
//       error: "User not found.",
//     };
//   }

//   if (occasion.deliveryDate <= new Date()) {
//     const { error } = await sendEmail(occasion);

//     if (!error) {
//       const updatedOccasion = { ...occasion, status: "Sent" };
//       await updateOccasion(updatedOccasion.id, updatedOccasion);
//       revalidatePath("/occasions");
//     }
//   } else {
//     scheduledEmails.push(occasion);
//   }

//   cron.schedule("* * * * *", async () => {
//     const now = new Date();
//     const pendingEmails = await db.occasion.findMany({
//       where: {
//         status: "Pending",
//         userId: user.id,
//       },
//     });

//     for (const emailJob of scheduledEmails) {
//       if (emailJob.deliveryDate <= now) {
//         const { error } = await sendEmail(occasion);

//         if (!error) {
//           const updatedOccasion = { ...occasion, status: "Sent" };
//           await updateOccasion(updatedOccasion.id, updatedOccasion);
//           revalidatePath("/occasions");
//         }
//       } else {
//         pendingEmails.push(emailJob);
//       }
//     }

//     console.log("Scheduled Emails:", scheduledEmails);
//     console.log("Pending Emails:", pendingEmails);

//     scheduledEmails = pendingEmails as Occasion[];
//   });
// }
