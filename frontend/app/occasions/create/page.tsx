import { isLoggedIn } from "@/app/occasions/_lib/utils";
import { CreateOccasionForm } from "@/app/occasions/create/create-occasion";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Occasion Details",
};

export default async function OccasionDetailPage() {
  if (!(await isLoggedIn())) {
    return redirect("/api/auth/login");
  }

  return (
    <div className="container">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
        Create Occasion
      </h1>

      <div className="mt-4">
        <CreateOccasionForm />
      </div>
    </div>
  );
}
