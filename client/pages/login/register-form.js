import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/components/Input";
import Button from "@/components/Button";
import constants from "utils/constants";
import { useDispatch } from "react-redux";
import { signup } from "redux/actions/userAction";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("* Name is required.")
    .min(2, "* Name is too short"),
  surname: yup
    .string()
    .required("* Surname is required.")
    .min(2, "* Surname is too short"),
  email: yup.string().email().required("* Email is required."),
  password: yup
    .string()
    .required("* Password is required.")
    .min(8, "* Password is too short - should be 8 chars minimum."),
});

export default function RegisterForm() {
  const dispatch = useDispatch();
  const [registerError, setRegisterError] = useState();
  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (value) => {
    if (value) {
      dispatch(signup(value));
      router.push("/")
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Input
        name="name"
        register={register}
        placeholder="Name"
        error={errors.name}
      />
      {errors.name && (
        <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
          {errors.name.message}
        </span>
      )}
      <Input
        name="surname"
        register={register}
        placeholder="Surname"
        error={errors.surname}
      />
      {errors.surname && (
        <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
          {errors.surname.message}
        </span>
      )}
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
      {registerError && (
        <span
          style={{
            color: "red",
            marginTop: 20,
            fontSize: 14,
            marginBottom: -10,
          }}
        >
          {registerError}
        </span>
      )}

      <Button type="submit">{constants.REGISTER}</Button>
      <div style={{ fontSize: 12, display: "flex" }}>
        {constants.REGISTER_POLICY}
      </div>
    </form>
  );
}
