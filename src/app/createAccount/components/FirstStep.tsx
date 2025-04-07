"use client";
import React, { Dispatch, useEffect, useState } from "react";

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
import { useProfile } from "@/app/_context/ProfileContext";
import { useUser } from "@/app/_context/UsersContext";
import AccountImage from "./AccountImage";
import { handleUpload } from "@/lib/handle-upload";

const FirstStep = ({
  setCurrentStep,
  currentStep,
}: {
  setCurrentStep: Dispatch<number>;
  currentStep: number;
}) => {
  const { createProfile } = useProfile();
  const { logedUser } = useUser();

  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string>("");

  if (!logedUser) {
    return <p>Түр хүлээнэ үү...</p>;
  }
  const userId = logedUser?.id;

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
  useEffect(() => {
    const imageUpload = async () => {
      if (file) {
        const imgUrl = await handleUpload(file);
        setImage(imgUrl);
      }
    };
    imageUpload();
  }, [file]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    createProfile(
      image,
      values.username,
      values.about,
      values.mediaUrl,
      userId
    );
    setCurrentStep(currentStep + 1);
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <div className="flex flex-col gap-6 w-[510px] ">
        <p className="font-bold text-[24px] tracking-[-0.6px]">
          Complete your profile page
        </p>
        <AccountImage setFile={setFile} setImage={setImage} image={image} />
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

export default FirstStep;
