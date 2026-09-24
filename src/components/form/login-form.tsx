"use client";
import { loginZodSchema } from "@/validation";
import { useForm } from "@tanstack/react-form";
import { Button } from "../ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useLogin } from "@/hooks/auth.hook";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import GoogleLoginComponent from "../modules/google-login/GoogleLogin";
import Link from "next/link";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const { mutate: login, isPending: loginPending } = useLogin();
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        validators: {
            onSubmit: loginZodSchema,
        },
        onSubmit: ({ value }) => {
            const loginData = {
                email: value.email,
                password: value.password,
            };

            login(loginData, {
                onSuccess: () => {
                    toast.add({
                        title: "Login Successful",
                        description: "Welcome back!",
                        type: "success",
                    });

                    const redirectTo = searchParams.get("redirectTo") || "/";

                    router.replace(redirectTo);
                },
                onError: (err) => {
                    console.log(err);
                    toast.add({
                        title: "Login Failed",
                        description: "Please check your email and password.",
                        type: "error",
                    });
                },
            });
        },
    });

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight">
                    Login Form
                </h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your email and password to login
                </p>
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
            >
                <FieldGroup>
                    <form.Field name="email">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Email
                                    </FieldLabel>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        onChange={(e) =>
                                            field.handleChange(e.target.value)
                                        }
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        placeholder="Enter your email"
                                        type="email"
                                        autoComplete="off"
                                        aria-invalid={isInvalid}
                                    />
                                    {isInvalid && (
                                        <FieldError
                                            errors={field.state.meta.errors}
                                        />
                                    )}
                                </Field>
                            );
                        }}
                    </form.Field>
                    <form.Field name="password">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                            return (
                                <Field className="" data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Password
                                    </FieldLabel>
                                    <div className="relative">
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            placeholder="Enter your password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            autoComplete="off"
                                            aria-invalid={isInvalid}
                                        />
                                        <Button
                                            className="absolute top-0 right-0"
                                            type="button"
                                            variant="link"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeClosed />
                                            ) : (
                                                <Eye />
                                            )}
                                        </Button>
                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </div>
                                </Field>
                            );
                        }}
                    </form.Field>
                    <Button type="submit" disabled={loginPending}>
                        {loginPending ? (
                            <>
                                <Spinner /> Logging in...
                            </>
                        ) : (
                            "Login"
                        )}
                    </Button>
                </FieldGroup>
            </form>
            <FieldSeparator>OR</FieldSeparator>
            <GoogleLoginComponent />

            <div className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                    href="/register"
                    className="font-medium underline underline-offset-4 hover:text-primary"
                >
                    Register
                </Link>
            </div>
        </div>
    );
};

export default LoginForm;
