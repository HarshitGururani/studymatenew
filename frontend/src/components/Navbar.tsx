"use client";
import Link from "next/link";
import ContentWrapper from "./ContentWrapper";
import Image from "next/image";
import logo from "../../public/assets/brainwave-symbol.svg";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { useAppContext } from "@/context/AppContext";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const pathName = usePathname();
  const { isLoggedIn } = useAppContext();

  return (
    <ContentWrapper className="flex justify-between py-2 md:py-3">
      <Link href={"/"} className="flex items-center cursor-pointer">
        <Image
          src={logo}
          alt="logo"
          width={50}
          height={20}
          className="w-10 md:w-12"
        />
        <h3 className="text-[20px] font-bold capitalize lg:text-xl ">
          Study-<span className="text-purple-500">Mate</span>
        </h3>
      </Link>

      {pathName.startsWith("/semester") && (
        <div className="hidden md:flex items-center gap-24 font-code font-bold text-slate-700 transition-colors">
          <Link href="/" className="text-slate-700  hover:text-purple-300">
            Home
          </Link>
        </div>
      )}

      <div className="flex gap-2 items-center">
        {pathName.startsWith("/semesters") ? undefined : (
          <div className="flex rounded-xl">
            <Link
              className={buttonVariants({
                className:
                  "hidden sm:flex items-center gap-1 bg-purple-600 text-white hover:bg-purple-600",
              })}
              href={"/semesters"}
            >
              Start Learning
              <ArrowRight className="size-5 ml-1.5" />
            </Link>
          </div>
        )}

        {isLoggedIn ? (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Hello</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogoutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Link href={"/sign-in"} className="border border-border">
            <Button variant={"outline"}>Sign in</Button>
          </Link>
        )}
      </div>
    </ContentWrapper>
  );
};
export default Navbar;
