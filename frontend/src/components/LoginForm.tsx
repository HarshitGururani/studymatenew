import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../apiClient";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(apiClient.Login, {
    onSuccess: () => {
      queryClient.invalidateQueries("validateToken");
      toast.success("Login successfull");

      const redirectPath = sessionStorage.getItem("redirectAfterLogin") || "/";
      sessionStorage.removeItem("redirectAfterLogin");
      router.push(redirectPath);
    },
    onError(error) {
      console.log(error);
      toast.error("Something went wrong");
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="bg-slate-100">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="john@email.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p
                className="text-destructive text-sm font-bold"
                aria-live="polite"
              >
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label>Password</Label>
            <div className="flex items-center gap-2">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {showPassword ? (
                <EyeClosed
                  className="size-5 cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  className="size-5 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            {errors.password && (
              <p
                className="text-destructive text-sm font-bold"
                aria-live="polite"
              >
                {errors.password.message}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button
            size="lg"
            type="submit"
            className="flex gap-1"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
            {isLoading && <Loader2 className="size-5 animate-spin" />}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
export default LoginForm;
