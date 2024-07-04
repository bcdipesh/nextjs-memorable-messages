import { UpdateOccasionForm } from "@/app/occasions/[id]/update-occasion";
import { getOccasionById } from "@/app/occasions/_actions/get-occasion";
import { type Occasion } from "@/app/occasions/_lib/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Occasion Details",
};

interface OccasionDetailPageProps {
  params: {
    id: string;
  };
}

export default async function OccasionDetailPage({
  params,
}: OccasionDetailPageProps) {
  const { error, occasion } = await getOccasionById(params.id);

  if (error) {
    return notFound();
  }

  return (
    <div className="flex-grow my-4">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
        Occasion Detail
      </h1>

      <div className="mt-4">
        <UpdateOccasionForm occasion={occasion as Occasion} />
      </div>
    </div>
  );
}
