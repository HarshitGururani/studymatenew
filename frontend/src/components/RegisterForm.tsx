import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../apiClient";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterFormData>();

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isLoading } = useMutation(apiClient.register, {
    onSuccess: () => {
      queryClient.invalidateQueries("validateToken");
      toast.success("Registeration successfull");
      router.push("/semesters");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="bg-slate-100 p-4">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="First Name"
              {...register("firstName", { required: "First Name is required" })}
            />
            {errors.firstName && (
              <p
                className="text-destructive text-sm font-bold"
                aria-live="polite"
              >
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Last Name"
              {...register("lastName", { required: "Last Name is required" })}
            />
            {errors.lastName && (
              <p
                className="text-destructive text-sm font-bold"
                aria-live="polite"
              >
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
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
            <Label htmlFor="password">Password</Label>
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
            {isLoading ? "Registering..." : "Register"}
            {isLoading && <Loader2 className="size-5 animate-spin" />}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default RegisterForm;
