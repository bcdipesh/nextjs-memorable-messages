"use client";

import { updateOccasion } from "@/app/occasions/[id]/_actions/update-occasion";
import { Occasion } from "@/app/occasions/_lib/types";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  occasionType: z.string().min(1, "Occasion Type is required"),
  message: z.string().min(1, "Message is required"),
  receiverEmail: z.string().email("Please provide a valid email address"),
  deliveryMethod: z.enum(["Email", "SMS"], {
    message: "Only Email and SMS can be used as delivery method",
  }),
  deliveryDate: z.string(),
});

const convertToDateTimeLocalString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

interface UpdateOccasionFormProps {
  occasion: Occasion;
}

export function UpdateOccasionForm({ occasion }: UpdateOccasionFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      occasionType: occasion.occasionType,
      message: occasion.message,
      receiverEmail: occasion.receiverEmail,
      deliveryMethod: occasion.deliveryMethod,
      deliveryDate: convertToDateTimeLocalString(occasion.deliveryDate),
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const promise = updateOccasion(occasion.id, values);

    toast.promise(promise, {
      loading: "Updating occasion...",
      success: "Occasion successfully updated.",
      error: ({error}) => error
    })

    router.push("/occasions");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="occasionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Occasion Type</FormLabel>
              <FormControl>
                <Input placeholder="Occasion Type..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Input placeholder="Message..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="receiverEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Receiver Email</FormLabel>
              <FormControl>
                <Input placeholder="Receiver Email Address..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deliveryMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Method</FormLabel>
              <FormControl>
                <Input
                  placeholder="Delivery Method (Email or SMS)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deliveryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Date</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  placeholder="Delivery Date..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
}
