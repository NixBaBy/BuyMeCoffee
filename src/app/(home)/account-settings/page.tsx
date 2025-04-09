"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { ChangeEvent, useEffect, useState } from "react";
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
import { handleUpload } from "@/lib/handle-upload";
import Image from "next/image";

const page = () => {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState(false);

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
    img: z.string().min(0, {
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
      img: "",
    },
  });

  if (!logedUser?.profile) {
    return <p>Loading...</p>;
  }
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const files = e.target.files[0];
    if (files) {
      setFile(files);
      const tempImageUrl = URL.createObjectURL(files);
      setImage(tempImageUrl);
      form.setValue("img", "uploaded");
    }
  };
  const imageUpload = async () => {
    if (file) {
      const imgUrl = await handleUpload(file);
      return imgUrl;
      // console.log("uploadImage", imgUrl);
      // setImage(imgUrl);
    }
  };

  useEffect(() => {
    if (logedUser.profile?.avatarImage) {
      setImage(logedUser.profile?.avatarImage);
    }
  }, [logedUser]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const image = await imageUpload();
    if (!image) {
      return;
    }
    console.log("onsubmit", image);
    try {
      if (logedUser?.profile) {
        await changeProfile(
          image,
          values.name,
          values.about,
          values.URL,
          logedUser.profile.id
        );
      } else {
        console.log("Profile is not available.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const deleteHandler = () => {
    setImage("");
    setFile(null);
  };

  return (
    <div className="mt-[124px] flex flex-col px-[24px] gap-6 rounded-lg bg-[#FFF] w-[650px]">
      <p className="text-[24px] font-bold">My account</p>

      <div className="p-6 flex flex-col items-start gap-6 rounded-lg border border-solid border-[#E4E4E7] w-full">
        <p className="font-bold">Personal info</p>
        <div className="flex flex-col gap-3">
          <p className="text-[14px] font-bold">Add photo</p>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-col gap-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {image ? (
                  <div className="relative  flex justify-center items-center w-[160px] h-[160px]">
                    <Image
                      src={image}
                      alt=""
                      width={160}
                      height={160}
                      className="rounded-full object-cover"
                    />

                    <Button
                      type="button"
                      className="absolute bg-white text-red-500 rounded-full"
                      onClick={deleteHandler}
                    >
                      X
                    </Button>
                  </div>
                ) : (
                  <FormField
                    control={form.control}
                    name="img"
                    render={({ field: { onChange, value, ...rest } }) => (
                      <FormItem>
                        <FormLabel>Add photo</FormLabel>
                        <FormControl>
                          <div className="flex justify-center items-center gap-2 w-[160px] h-[160px] rounded-full border border-dotted border-gray-300 ">
                            {image ? (
                              <div className="flex justify-center items-center ">
                                <img
                                  className="w-[160px] h-[160px] object-cover  rounded-full absolute"
                                  src={image}
                                  alt="zurag"
                                />
                                <Button
                                  className="absolute bg-white text-red-500 rounded-full"
                                  onClick={deleteHandler}
                                >
                                  X
                                </Button>
                              </div>
                            ) : (
                              <div className="flex justify-center items-center ">
                                <Input
                                  placeholder="image"
                                  type="file"
                                  onChange={handleFile}
                                  {...rest}
                                  className="w-[160px] h-[160px] rounded-full opacity-0"
                                />
                                <img
                                  src="/camera.svg"
                                  alt=""
                                  className="w-[23px] h-[23px] absolute"
                                />
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

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
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "loading" : "Save changes"}
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
