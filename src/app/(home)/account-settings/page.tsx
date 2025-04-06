"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import ChangePassword from "./components/ChangePassword";
import PaymentChange from "./components/PaymentChange";
import { useUser } from "@/app/_context/UsersContext";
import { Camera } from "lucide-react";

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
import { useProfile } from "@/app/_context/ProfileContext";
import SuccessMessage from "./components/SuccessMessage";

const page = () => {
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    about: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    URL: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });
  const { changeProfile } = useProfile();
  const { logedUser } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: logedUser?.profile?.name,
      about: logedUser?.profile?.about,
      URL: logedUser?.profile?.socialMediaURL,
    },
  });

  if (!logedUser?.profile) {
    return <p>Loading...</p>;
  }
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (logedUser?.profile) {
      changeProfile(
        values.name,
        values.about,
        values.URL,
        logedUser.profile.id
      );
    } else {
      console.log("Profile is not available.");
    }
  }

  return (
    <div className="mt-[124px] flex flex-col px-[24px] gap-6 rounded-lg bg-[#FFF] w-[650px]">
      <p className="text-[24px] font-bold">My account</p>

      <div className="p-6 flex flex-col items-start gap-6 rounded-lg border border-solid border-[#E4E4E7] w-full">
        <p className="font-bold">Personal info</p>
        <div className="flex flex-col gap-3">
          <p className="text-[14px] font-bold">Add photo</p>
          <div
            className="w-[160px] h-[160px] rounded-full bg-center bg-cover"
            style={{
              backgroundImage: `url(${
                logedUser?.profile
                  ? logedUser.profile.avatarImage
                  : "defaultImage.jpg"
              })`,
            }}
          >
            <Input
              type="file"
              className="w-[160px] h-[160px] rounded-full opacity-0"
            />
            <Camera color="white" />
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-col gap-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>About</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="URL"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Social media URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Save changes
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <ChangePassword />
      <PaymentChange />
      <SuccessMessage />
    </div>
  );
};

export default page;
