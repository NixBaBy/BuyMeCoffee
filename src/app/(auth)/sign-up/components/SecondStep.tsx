"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import { useUser } from "@/app/_context/UsersContext";
import { useState } from "react";
import { RefreshCcw } from "lucide-react";

const SecondStep = ({ name }: { name: string }) => {
  const { signUp } = useUser();
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .refine((password) => /[A-Z]/.test(password), {
        message: "Password must include at least one uppercase letter.",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "Password must include at least one lowercase letter.",
      })
      .refine((password) => /[0-9]/.test(password), {
        message: "Password must include at least one number.",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    signUp(values.email, values.password, name);
    setLoading(false);
  }
  return (
    <div className="flex flex-col gap-[24px]">
      {loading && (
        <div className="absolute flex justify-center items-center inset-0 bg-gray-500 bg-opacity-50">
          <RefreshCcw className="animate-spin w-16 h-16 text-white" />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <h3 className="text-[24px] font-bold tracking-[-0.6px]">
          Welcome,user
        </h3>
        <p className="text-[14px] text-[#71717A]">
          Connect email and set a password
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter email  here"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter password  here"
                    {...field}
                    type="password"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-[#18181B] text-white"
            disabled={loading}
          >
            {loading ? "loading..." : "Continue"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SecondStep;
