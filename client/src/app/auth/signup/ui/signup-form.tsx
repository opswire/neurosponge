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
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import GoogleIcon from "@/shared/ui/assets/google_web.svg";

const passwordSchema = z
  .string()
  .min(8, { message: "Пароль должен содержать не менее 8 символов" })
  .max(20, { message: "Пароль должен содержать не более 20 символов" })
  .refine((password) => /[A-Z]/.test(password), {
    message: "Пароль должен содержать хотя бы одну заглавную букву",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Пароль должен содержать хотя бы одну строчную букву",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "Пароль должен содержать хотя бы одну цифру",
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: "Пароль должен содержать хотя бы один специальный символ",
  });

const formSchema = z
  .object({
    username: z.string().min(3, {
      message: "Имя пользователя должно содержать не менее 3 символов.",
    }),
    email: z.string().email({
      message: "Необходимо ввести действительную почту.",
    }),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
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
        className="mt-10 w-full p-8 space-y-8"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя пользователя</FormLabel>
              <FormControl>
                <Input placeholder="Марсель" {...field} />
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
                <Input placeholder="marcel@example.com" {...field} />
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
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="yOurStrongP@ssw0rd"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Повторите пароль</FormLabel>
              <FormControl>
                <Input placeholder="yOurStrongP@ssw0rd" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-center">
          <Button
            disabled={isLoading}
            className="min-w-40 w-full"
            type="submit"
          >
            {isLoading && <Octagon className="mr-2 h-4 w-4 animate-spin" />}
            Создать аккаунт
          </Button>
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
