"use client";

import { ModeToggle } from "@/_components/mode-toggle";
import { Spinner } from "@/_components/spinner";
import { Button } from "@/_components/ui/button";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { NextPage } from "next";
import Link from "next/link";
import { Logo } from "./logo";

interface NavbarProps {}

export const Navbar: NextPage<NavbarProps> = ({}) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "z-50 bg-background fixed top-0 flex items-center w-full p-6 dark:bg-[#1f1f1f]",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />

      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant={"ghost"} size={"sm"}>
                Connexion
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size={"sm"}>Essayer Notion</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant={"ghost"} size={"sm"} asChild>
              <Link href={"/documents"}>Essayer Notion</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle key={"notion-theme"} />
      </div>
    </div>
  );
};
