"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { Api } from "@/services";
import { LoginUserDto } from "@/types/login.dto";
import { notify } from "@/utils/notifications";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { ObjectSchema, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema: ObjectSchema<LoginUserDto> = object({
  email: string().email("Проверьте почту!").required("Введите почту!"),
  password: string()
    .min(8, "Введите пароль длинее!")
    .required("Введите пароль!"),
});

const LoginForm = () => {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<LoginUserDto>({
    resolver: yupResolver(schema),
  });
  const loginMutation = useMutation({
    mutationFn: (dto: LoginUserDto) => Api().auth.login(dto),
    onSuccess() {
      router.replace("/scanner");
    },
    onError(e: any) {
      notify(e.response.data.message || "Что-то пошло нетак");
    },
  });

  const onSubmit: SubmitHandler<LoginUserDto> = (data) => {
    loginMutation.mutate(data);
  };
  return (
    <div className={" w-full"}>
      <Typography tag="h1" variant="h2">
        Вход
      </Typography>
      <form
        className={
          "min-h-screen flex gap-4 flex-col items-center justify-center"
        }
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          placeholder="почта"
          disabled={loginMutation.isLoading || loginMutation.isSuccess}
          error={formState.errors.email?.message}
          {...register("email")}
        />
        <Input
          placeholder="пароль"
          disabled={loginMutation.isLoading || loginMutation.isSuccess}
          error={formState.errors.password?.message}
          {...register("password")}
        />
        <Button type="submit">Войти</Button>
      </form>
      <Link href="/auth/register">нет аккаунта?</Link>
    </div>
  );
};

export default LoginForm;
