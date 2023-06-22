"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { Api } from "@/services";
import { ICreateUserDto } from "@/types/createUser.interface";
import { notify } from "@/utils/notifications";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { ObjectSchema, object, string } from "yup";

const schema: ObjectSchema<ICreateUserDto> = object({
  name: string().required("Введите имя!"),
  email: string().email("Это не почта!").required("Введите почту!"),
  password: string()
    .min(8, "Создайте пароль длиннее!")
    .max(32, "Ваш пароль слишком большой")
    .required("Введите пароль!"),
});

const RegisterForm = () => {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<ICreateUserDto>({
    resolver: yupResolver(schema),
  });

  const createMutation = useMutation({
    mutationFn: (dto: ICreateUserDto) => Api().auth.register(dto),
    onSuccess() {
      router.replace("scanner");
    },
    onError(e: any) {
      notify(e.response.data.message || "что-то пошло нетак...");
    },
  });

  const onSubmit: SubmitHandler<ICreateUserDto> = (data) => {
    createMutation.mutate(data);
  };

  return (
    <div className={" w-full"}>
      <Typography tag="h1" variant="h2">
        Регистрация
      </Typography>
      <form
        className={
          "min-h-screen flex gap-4 flex-col items-center justify-center"
        }
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          placeholder="имя"
          disabled={createMutation.isLoading || createMutation.isSuccess}
          error={formState.errors.name?.message}
          {...register("name")}
        />
        <Input
          placeholder="почта"
          disabled={createMutation.isLoading || createMutation.isSuccess}
          error={formState.errors.email?.message}
          {...register("email")}
        />
        <Input
          placeholder="пароль"
          disabled={createMutation.isLoading || createMutation.isSuccess}
          error={formState.errors.password?.message}
          {...register("password")}
        />
        <Button type="submit">Регистрация</Button>
      </form>
      <Link href="/auth/login">Есть аккаунт?</Link>
    </div>
  );
};

export default RegisterForm;
