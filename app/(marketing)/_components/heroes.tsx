import documentImgDark from "@/public/documents-dark.png";
import documentImg from "@/public/documents.png";
import readingImgDark from "@/public/reading-dark.png";
import readingImg from "@/public/reading.png";

import { NextPage } from "next";
import Image from "next/image";

interface Props {}

export const Heroes: NextPage<Props> = ({}) => {
  return (
    <div className="flex flex-col  items-center justify-center max-w-5xl ">
      <div className="flex items-center">
        <div className="relative size-[300px] sm:size-[350px] md:size-[400px]">
          <Image
            src={documentImg}
            alt="Documents"
            className="object-contains dark:hidden"
            priority
          />
          <Image
            src={documentImgDark}
            alt="Documents"
            className="object-contains hidden dark:block"
            priority
          />
        </div>
        <div className="relative size-[400px] hidden md:block">
          <Image
            src={readingImg}
            alt="Reading"
            className="object-contain dark:hidden"
            priority
          />
          <Image
            src={readingImgDark}
            alt="Reading"
            className="object-contain hidden dark:block"
            priority
          />
        </div>
      </div>
    </div>
  );
};
