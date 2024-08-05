"use client";

import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Form,
} from "@/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { Octagon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import GoogleIcon from "@/shared/ui/assets/google_web.svg";
import Image from "next/image";
import Link from "next/link";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Имя пользователя должно содержать не менее 3 символов.",
  }),
  email: z.string().email({
    message: "Необходимо ввести действительную почту.",
  }),
});

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full p-8 space-y-8"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя пользователя</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="Марсель" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="marcel@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex flex-col items-center justify-center">
          <Button
            disabled={isLoading}
            className="min-w-40 w-full"
            type="submit"
          >
            {isLoading && <Octagon className="mr-2 h-4 w-4 animate-spin" />}
            Войти
          </Button>
          <div className="flex gap-2 items-center justify-center ">
            <Button className="p-0 underline" variant="link" asChild>
              <Link
                href={"/auth/signup"}
                className="text-xs text-muted-foreground underline"
              >
                Еще нет аккаунта?
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-background px-2 text-muted-foreground">
              Или войти с помощью
            </span>
          </div>
        </div>

        <Button
          className="w-full"
          variant="outline"
          type="button"
          disabled={isLoading}
        >
          {isLoading ? (
            <Octagon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Image src={GoogleIcon} alt="Google Icon" />
          )}{" "}
          Google
        </Button>
      </form>
    </Form>
  );
}
