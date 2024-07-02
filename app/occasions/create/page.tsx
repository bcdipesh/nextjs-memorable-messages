import { CreateOccasionForm } from "@/app/occasions/create/create-occasion";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Occasion Details",
};

export default async function OccasionDetailPage() {
  return (
    <div className="flex-grow my-4">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
        Create Occasion
      </h1>

      <div className="mt-4">
        <CreateOccasionForm />
      </div>
    </div>
  );
}
