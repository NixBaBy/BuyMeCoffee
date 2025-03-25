"use client";
import React, { Dispatch } from "react";

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
import { useRouter } from "next/navigation";

const page = ({
  setCurrentStep,
  currentStep,
}: {
  setCurrentStep: Dispatch<number>;
  currentStep: number;
}) => {
  const router = useRouter();
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    about: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    mediaUrl: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      about: "",
      mediaUrl: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    setCurrentStep(currentStep + 1);
    localStorage.setItem("name", values.username);
    localStorage.setItem(
      "image",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Cima_da_Conegliano%2C_God_the_Father.jpg/300px-Cima_da_Conegliano%2C_God_the_Father.jpg"
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <div className="flex flex-col gap-6 w-[510px] ">
        <p className="font-bold text-[24px] tracking-[-0.6px]">
          Complete your profile page
        </p>
        <div className="flex flex-col gap-3">
          <p>Add photo</p>
          <div className="w-[160px] h-[160px] border-[1px] border-dashed border-[#E4E4E7] rounded-full flex justify-center items-center">
            <img src="/camera.svg" alt="" />
          </div>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter name  here"
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
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">About</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Write about yourself here"
                        {...field}
                        type="password"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mediaUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Social Media Url
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://"
                        {...field}
                        type="password"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-[#18181B] text-white">
                Continue
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default page;
