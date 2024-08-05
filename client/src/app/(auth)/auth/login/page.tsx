import { LoginForm } from "./ui/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Форма входа в аккаунт",
};
export default function LoginPage() {
  return (
    <div className="flex w-full flex-col items-center justify-center sm:w-[350px] lg:w-[600px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Войти</h1>
        <p className="text-sm text-muted-foreground">
          Получи доступ к пользовательским колодам и еще всякой хуйне
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
