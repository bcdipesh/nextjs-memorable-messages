import { type Occasion } from "@/app/occasions/_lib/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import nodemailer from "nodemailer";

export async function isLoggedIn() {
  const { isAuthenticated } = getKindeServerSession();
  return await isAuthenticated();
}

export async function getUser() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return user;
}

export async function sendEmail(occasion: Occasion): Promise<{
  message?: string;
  error?: string;
}> {
  const user = await getUser();

  if (!user) {
    return {
      error: "User not found.",
    };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: occasion.receiverEmail,
    subject: occasion.occasionType,
    text: occasion.message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(
      `Email sent to ${occasion.receiverEmail} from ${user.given_name} ${user.family_name}`,
    );
    return {
      message: `Email sent successfully to ${occasion.receiverEmail} from ${user.given_name} ${user.family_name}`,
    };
  } catch (error) {
    return {
      error: `Error sending email to ${occasion.receiverEmail} from ${user.given_name} ${user.family_name}`,
    };
  }
}
