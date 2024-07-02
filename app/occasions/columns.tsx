"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteOccasion } from "@/lib/mutations/delete-occasion";
import { type Occasion } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Occasion>[] = [
  {
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "occasionType",
    header: "Occasion Type",
    cell: ({ row }) => {
      const { id, occasionType } = row.original;

      return (
        <Button variant="link" asChild>
          <Link href={`/occasions/${id}`}>{occasionType}</Link>
        </Button>
      );
    },
  },
  {
    accessorKey: "receiverEmail",
    header: "Email",
  },
  {
    accessorKey: "deliveryMethod",
    header: "Delivery Method",
  },
  {
    accessorKey: "deliveryDate",
    header: "Delivery Date",
    cell: ({ row }) => {
      const isoDate = new Date(row.getValue("deliveryDate"));
      const formattedDate = formatDate(isoDate);

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const isoDate = new Date(row.getValue("createdAt"));
      const formattedDate = formatDate(isoDate);

      return <div>{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const occasion = row.original;

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 2-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(occasion.id)}
              >
                Copy occasion ID
              </DropdownMenuItem>
              <DropdownMenuItem>View/Update occasion</DropdownMenuItem>
              <DialogTrigger asChild>
                <DropdownMenuItem>Delete occasion</DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. Are you sure you want to
                permanently delete this occasion?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  onClick={() => deleteOccasion(occasion.id)}
                >
                  Confirm
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
