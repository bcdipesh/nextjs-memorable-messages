import { columns } from "@/app/occasions/columns";
import { DataTable } from "@/app/occasions/data-table";
import { getOccasions } from "@/lib/queries/occasions";
import { type Occasion } from "@/lib/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Occasions",
};

export default async function OccasionsPage() {
  const { error, occasions } = await getOccasions();

  if (error) {
    return <p className="flex-grow">{error}</p>;
  }

  return (
    <div className="flex-grow my-4">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
        Occasions
      </h1>
      <DataTable columns={columns} data={occasions as Occasion[]} />
    </div>
  );
}
