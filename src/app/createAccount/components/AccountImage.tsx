/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
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

const formSchema = z.object({
  img: z.string().nonempty({
    message: "zurag oruulna uu",
  }),
});

const AccountImage = ({
  setImage,
  setFile,
  image,
}: {
  setImage: Dispatch<SetStateAction<string>>;
  setFile: Dispatch<SetStateAction<File | null>>;
  image: string;
}) => {
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      img: "",
    },
  });

  function onSubmit() {}
  const deleteHandler = () => {
    setImage("");
    setFile(null);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        </form>
      </Form>
    </div>
  );
};

export default AccountImage;
