import { Occasion, columns } from "@/app/occasions/columns";
import { DataTable } from "@/app/occasions/data-table";
import { occasions } from "@/lib/placeholder-data";

async function getData(): Promise<Occasion[]> {
  return occasions;
}

export default async function OccasionsPage() {
  const data = await getData();

  return (
    <div className="flex-grow my-4">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
        Occasions
      </h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
