"use client";
import { cn } from "@/lib/utils";
import { Loader2, LogOutIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../apiClient";
import { Button } from "./ui/button";

const LogoutButton = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(apiClient.logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      toast.success("Logged Out!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  const handleClick = () => {
    mutate();
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      variant={"destructive"}
      className="w-full flex gap-2"
    >
      Logout
      <LogOutIcon className="size-5" />
      {isLoading && <Loader2 className={cn("size-5 animate-spin")} />}
    </Button>
  );
};
export default LogoutButton;
