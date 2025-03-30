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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBankCard } from "@/app/_context/BankCardContext";
import { useUser } from "@/app/_context/UsersContext";

const PaymentChange = () => {
  const { changeBankCard } = useBankCard();
  const { logedUser, loggedInUser } = useUser();
  console.log(loggedInUser);
  const formSchema = z.object({
    country: z.string().min(1, { message: "Country selection is required." }),

    firstName: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    card: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    expires: z.string().min(1, {
      message: "Username must be at least 2 characters.",
    }),
    year: z.string().min(1, {
      message: "Username must be at least 2 characters.",
    }),
    cvc: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: loggedInUser.bankCard?.country || "",
      firstName: loggedInUser.bankCard?.firstName || "",
      lastName: loggedInUser.bankCard?.lastName || "",
      card: loggedInUser.bankCard?.cardNumber || "",
      expires: "",
      year: "",
      cvc: loggedInUser.bankCard?.cvc || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const expiryDate = `${values.year}-${values.expires.padStart(2, "0")}-01`;
    const userId = Number(logedUser);
    changeBankCard(
      values.country,
      values.firstName,
      values.lastName,
      values.card,
      expiryDate,
      userId,
      values.cvc
    );
  }
  return (
    <div className="p-6 flex flex-col items-start gap-6 rounded-lg border border-solid border-[#E4E4E7] w-full">
      <p className="font-bold">Payment details</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-lg space-y-6"
        >
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="mn">Mongolia</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-3 w-full">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">First name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name here"
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
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Last name</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="card"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">
                  Enter your card number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-[16px]">
            <FormField
              control={form.control}
              name="expires"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expires</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full">
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full">
                      <SelectItem value="1">1994</SelectItem>
                      <SelectItem value="2">1995</SelectItem>
                      <SelectItem value="3">1996</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cvc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">
                    Enter your card number
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="CVC" {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PaymentChange;
