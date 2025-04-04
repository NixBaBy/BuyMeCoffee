import React from "react";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/app/_context/UsersContext";
const SuccessMessage = () => {
  const { createSuccessMessage } = useProfile();

  const { logedUser } = useUser();

  const formSchema = z.object({
    successMessage: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      successMessage: logedUser?.profile?.successMessage || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (logedUser?.profile) {
      createSuccessMessage(values.successMessage, logedUser.profile.id);
    } else {
      console.log("Profile is not available.");
    }
  }

  return (
    <div className="p-6 flex flex-col items-start gap-6 rounded-lg border border-solid border-[#E4E4E7] w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="successMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} className="w-full" />
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
  );
};

export default SuccessMessage;
