"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import clsx from "clsx";
import Link from "next/link";

const RegisterForm = () => {
  return (
    <div className={" w-full"}>
      <form
        className={
          "min-h-screen flex gap-4 flex-col items-center justify-center"
        }
      >
        <Typography tag="h1" variant="h2">
          Регистрация
        </Typography>
        <Input placeholder="имя" />
        <Input placeholder="почта" />
        <Input placeholder="пароль" />
        <Button type="submit">Регистрация</Button>
        <Link href="/auth/login">Есть аккаунт?</Link>
      </form>
    </div>
  );
};

export default RegisterForm;
