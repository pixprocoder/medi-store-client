"use client";

import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form-nextjs";
import { toast } from "sonner";

export function LoginForm() {
    const [isLoading, setIsLoading] = React.useState(false);

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Logging in");
            try {
                const { data, error } = await authClient.signIn.email(value);

                if (error) {
                    toast.error(error.message, { id: toastId });
                    return;
                }

                toast.success("User Signed in Successfully", { id: toastId });
            } catch (err) {
                toast.error("Something went wrong, please try again.", { id: toastId });
            }
        },
    });

    async function handleGoogleSignIn() {
        setIsLoading(true);
        // Add Google OAuth logic here
        const { data, error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "http://localhost:3000"
        });
        console.log(data);
        console.log(error);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }

    return (
        <div className="w-full container max-w-sm mx-auto space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
                <p className="text-sm text-muted-foreground">
                    Sign in to your account to continue
                </p>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="space-y-4"
            >
                <form.Field
                    name="email"
                    validators={{
                        onChange: ({ value }) =>
                            !value
                                ? "Email is required"
                                : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                                    ? "Please enter a valid email"
                                    : undefined,
                    }}
                >
                    {(field) => (
                        <div className="space-y-2">
                            <Label htmlFor={field.name}>Email</Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                type="email"
                                placeholder="name@example.com"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                disabled={isLoading}
                            />
                            {field.state.meta.errors && (
                                <p className="text-sm text-destructive">
                                    {field.state.meta.errors.join(", ")}
                                </p>
                            )}
                        </div>
                    )}
                </form.Field>

                <form.Field
                    name="password"
                    validators={{
                        onChange: ({ value }) =>
                            !value ? "Password is required" : undefined,
                    }}
                >
                    {(field) => (
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor={field.name}>Password</Label>
                                <Link
                                    href="/forgot-password"
                                    className="text-xs text-primary hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id={field.name}
                                name={field.name}
                                type="password"
                                placeholder="••••••••"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                disabled={isLoading}
                            />
                            {field.state.meta.errors && (
                                <p className="text-sm text-destructive">
                                    {field.state.meta.errors.join(", ")}
                                </p>
                            )}
                        </div>
                    )}
                </form.Field>

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign in"}
                </Button>

            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>

            <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
            >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                    />
                    <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                    />
                    <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                    />
                    <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                    />
                </svg>
                Sign in with Google
            </Button>

            <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                    href="/auth/register"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                >
                    Register
                </Link>
            </p>
        </div>
    );
}
