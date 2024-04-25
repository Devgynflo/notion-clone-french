"use client";

import { SearchCommand } from "@/_components/search-command";
import { Spinner } from "@/_components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { Navigation } from "./_components/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (!isAuthenticated) {
    redirect("/");
  }

  if (isLoading)
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size={"xl"} />
      </div>
    );

  if (isAuthenticated && !isLoading) {
    return (
      <div className="flex h-full dark:bg-[#1F1F1F]">
        <Navigation />
        <SearchCommand />
        <main className="flex-1 h-full overflow-y-auto">{children}</main>
      </div>
    );
  }
}
