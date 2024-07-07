import { getOccasions } from "@/app/occasions/_actions/get-occasion";
import { type Occasion } from "@/app/occasions/_lib/types";
import { isLoggedIn } from "@/app/occasions/_lib/utils";
import { columns } from "@/app/occasions/columns";
import { DataTable } from "@/app/occasions/data-table";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Occasions",
};

export default async function OccasionsPage() {
  if (!(await isLoggedIn())) {
    return redirect("/api/auth/login");
  }

  const { error, occasions } = await getOccasions();

  if (error) {
    return <p className="container">{error}</p>;
  }

  return (
    <div className="container">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
        Occasions
      </h1>
      <DataTable columns={columns} data={occasions as Occasion[]} />
    </div>
  );
}
