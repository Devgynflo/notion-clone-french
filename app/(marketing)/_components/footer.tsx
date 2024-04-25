import { Button } from "@/_components/ui/button";
import { Logo } from "@/app/(marketing)/_components/logo";
import { NextPage } from "next";

interface Props {}

export const Footer: NextPage<Props> = ({}) => {
  return (
    <footer className="flex items-center w-full p-6 bg-background z-50 dark:bg-[#1f1f1f]">
      <Logo />
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
        <Button variant={"ghost"} size={"sm"}>
          Conditions générales
        </Button>
        <Button variant={"ghost"} size={"sm"}>
          Conditions
        </Button>
      </div>
    </footer>
  );
};
