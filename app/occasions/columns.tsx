"use client";

import { deleteOccasion } from "@/app/occasions/_actions/delete-occasion";
import { type Occasion } from "@/app/occasions/_lib/types";
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
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const formatDate = (date: Date) => {
  return `${date.toDateString()}, ${date.toLocaleTimeString()}`;
};

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
    header: "Receiver Email",
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
      const onDelete = (occasionId: string) => {
        const promise = deleteOccasion(occasionId);

        toast.promise(promise, {
          loading: "Deleting occasion...",
          success: ({ message }) => message,
          error: ({ error }) => error,
        });
      };

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
                className="cursor-pointer"
              >
                Copy occasion ID
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/occasions/${occasion.id}`}>
                  View/Update occasion
                </Link>
              </DropdownMenuItem>
              <DialogTrigger asChild>
                <DropdownMenuItem className="cursor-pointer">
                  Delete occasion
                </DropdownMenuItem>
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
                <Button type="button" onClick={() => onDelete(occasion.id)}>
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
