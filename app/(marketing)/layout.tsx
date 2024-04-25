import { Navbar } from "@/app/(marketing)/_components/navbar";
import { NextPage } from "next";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

const MarketingLayout: NextPage<MarketingLayoutProps> = ({ children }) => {
  return (
    <div className="h-full dark:bg-[#1f1f1f]">
      <Navbar />
      <main className="h-full pt-40">{children}</main>
    </div>
  );
};

export default MarketingLayout;
