import { Metadata } from "next";
import Link from "next/link";

import { SignupForm } from "./ui/signup-form";
import { Button } from "@/shared";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Форма создания нового аккаунта",
};

export default function SignupPage() {
  return (
    <>
      <Button
        asChild
        variant={"ghost"}
        className="absolute z-40 right-4 top-4 md:right-8 md:top-8"
      >
        <Link href="/auth/login">Войти</Link>
      </Button>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Создать аккаунт
          </h1>
          <p className="text-sm text-muted-foreground">
            Получи доступ к пользовательским колодам и еще всякой хуйне
          </p>
        </div>
        <SignupForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Нажимая "продолжить", вы соглашаетесь с нашими{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Условиями обслуживания
          </Link>{" "}
          и{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Политикой конфиденциальности
          </Link>
          .
        </p>
      </div>
    </>
  );
}
