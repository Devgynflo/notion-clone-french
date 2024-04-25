"use client";

import { Button } from "@/_components/ui/button";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

interface NotFoundProps {}

const NotFound: NextPage<NotFoundProps> = ({}) => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src={"/error.png"}
        width={300}
        height={300}
        alt="Error"
        className="dark:hidden"
        priority
      />
      <Image
        src={"/error-dark.png"}
        height={300}
        width={300}
        alt="Error"
        className="hidden dark:block"
        priority
      />
      <h2 className="text-3xl font-medium">
        Quelque chose ne fonctionne pas correctement
      </h2>
      <Button asChild>
        <Link href={"/"}>Retour</Link>
      </Button>
    </div>
  );
};

export default NotFound;
