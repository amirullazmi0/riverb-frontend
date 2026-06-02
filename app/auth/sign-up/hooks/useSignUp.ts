"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { useAuth } from "@/hooks/react-query/useAuth";
import {
  signUpSchema,
  type SignUpFormData,
} from "@/app/auth/sign-up/config/authSignUpConfig";

const useSignUp = () => {
  const { register: registerAuth, registerState } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    registerAuth(data);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting: isSubmitting || registerState.isLoading,
  };
};

export default useSignUp;
