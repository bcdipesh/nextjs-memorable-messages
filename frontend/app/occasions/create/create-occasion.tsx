"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createOccasion } from "@/app/occasions/create/_actions/create-occasion";
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

const formSchema = z.object({
  occasionType: z.string().min(1, "Occasion Type is required"),
  message: z.string().min(1, "Message is required"),
  receiverEmail: z.string().email("Please provide a valid email address"),
  deliveryMethod: z.enum(["Email", "SMS"], {
    message: "Only Email and SMS can be used as delivery method",
  }),
  deliveryDate: z.string(),
});

export function CreateOccasionForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      occasionType: "",
      message: "",
      receiverEmail: "",
      deliveryMethod: "Email",
      deliveryDate: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    toast.loading("Creating occasion...");
    const { error, occasion } = await createOccasion({
      ...values,
      deliveryDate: new Date(values.deliveryDate).toISOString(),
    });
    toast.dismiss();

    if (error) {
      toast.error(error);
    } else {
      toast.success("Occasion successfully created.");
    }

    if (process.env.NODE_ENV === "production") {
      const res = await fetch(
        "https://memorablemessagesapi.vercel.app/api/v1/occasions/schedule",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(occasion),
        }
      );
      const { data } = await res.json();
      console.log(data);
    } else {
      const res = await fetch(
        "http://127.0.0.1:5000/api/v1/occasions/schedule",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(occasion),
        }
      );
      const { data } = await res.json();
      console.log(data);
    }

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

        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
