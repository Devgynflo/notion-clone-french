"use client";

import { Spinner } from "@/_components/spinner";
import { Button } from "@/_components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-2 ">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-2">
        Rédiger,planifier,{" "}
        <span className="underline">organiser,s’amuser.</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Donnez vie à vos idées avec l’espace de travail Notion, alimenté par
        l’IA.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size={"lg"} />
        </div>
      )}
      {!isLoading && isAuthenticated && (
        <Button asChild>
          <Link href={"/documents"}>
            Essayer Notion <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isLoading && !isAuthenticated && (
        <SignInButton mode="modal">
          <Button>
            Essayer Notion <ArrowRight className="h-2 -w-2 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};
