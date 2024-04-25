import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader } from "lucide-react";
import { NextPage } from "next";

const spinnerVariants = cva("text-muted-forground animate-spin", {
  variants: {
    size: {
      default: "h-4 w-4",
      sm: "h-2 w-2",
      lg: "h-6 w-6",
      xl: "h-12 w-12",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {}

export const Spinner: NextPage<SpinnerProps> = ({ size }: SpinnerProps) => {
  return <Loader className={cn(spinnerVariants({ size }))}></Loader>;
};
