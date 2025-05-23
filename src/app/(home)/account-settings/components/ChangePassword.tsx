import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/app/_context/UsersContext";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const { changePassword } = useUser();
  const email = localStorage.getItem("email");
  const formSchema = z
    .object({
      password: z.string().min(2, {
        message: "Username must be at least 2 characters.",
      }),
      confirm: z.string().min(0, {
        message: "Username must be at least 2 characters.",
      }),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Passwords do not match.",
      path: ["confirm"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    if (!email) {
      console.error("Email олдсонгүй! Нэвтрэх шаардлагатай.");
    } else {
      changePassword(email, values.password);
    }
    setLoading(false);
  }
  return (
    <div className="p-6 flex flex-col items-start gap-6 rounded-lg border border-solid border-[#E4E4E7] w-full">
      <p className="font-bold">Set a new password</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a new password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>confirm password</FormLabel>
                <FormControl>
                  <Input placeholder="confirm password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "loading..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChangePassword;
