"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { useAuth } from "@/hooks/react-query/useAuth";
import { signInSchema, type SignInFormData } from "@/app/auth/sign-in/config/authSignInConfig";

const useSignIn = () => {
     const { login, loginState } = useAuth();
     const {
          register,
          handleSubmit,
          formState: { errors, isSubmitting },
     } = useForm<SignInFormData>({
          resolver: yupResolver(signInSchema),
          mode: "onChange",
          defaultValues: {
               email: "",
               password: "",
          },
     });

     const onSubmit = (data: SignInFormData) => {
          login(data);
     };

     return {
          register,
          handleSubmit,
          onSubmit,
          errors,
          isSubmitting: isSubmitting || loginState.isLoading,
     };
};

export default useSignIn;
