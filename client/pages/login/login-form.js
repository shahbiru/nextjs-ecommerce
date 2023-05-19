import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";
import constants from "utils/constants";
import { useDispatch } from "react-redux";
import { login } from "redux/actions/userAction";
import { Router, useRouter } from "next/router";

const schema = yup.object().shape({
  email: yup.string().email().required("* Email is required."),
  password: yup
    .string()
    .required("* Password is required.")
    .min(8, "* Password is too short - should be 8 chars minimum."),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginError, setLoginError] = useState();

  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if(data){
    dispatch(login(data));
    router.push("/")
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Input
        name="email"
        register={register}
        placeholder="E-mail"
        error={errors.email}
      />
      {errors.email && (
        <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
          {errors.email.message}
        </span>
      )}

      <Input
        name="password"
        register={register}
        placeholder="Password"
        type="password"
        error={errors.password}
      />
      {errors.password && (
        <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
          {errors.password.message}
        </span>
      )}

      <Button type="submit">{constants.LOGIN}</Button>
      {loginError && (
        <span
          style={{
            color: "red",
            marginTop: -10,
            fontSize: 14,
            marginBottom: 10,
          }}
        >
          {loginError}
        </span>
      )}
      <span style={{ fontWeight: "bold" }}>
        <Link href="/forgot-password">{constants.FORGOT_PASSWORD}</Link>
      </span>
    </form>
  );
}
