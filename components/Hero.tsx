import React from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Button as MovingButton } from "./ui/moving-border.tsx";

type HeroProps = {
  data: {
    name: string;
    title: string;
    profileImageUrl: string;
    bio: string;
    socialLinks: { name: string; url: string; icon: string }[];
    cvUrl: string;
  };
};

const Hero: React.FC<HeroProps> = ({ data }) => {
  if (!data) return null; 

  return (
    <section className="py-10 md:py-20"> 
      <div className="flex flex-col overflow-hidden"> 
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Redefining the Workflow of <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                  Tomorrow
                </span>
              </h1>
            </>
          }
        >
          <img
            src={data.profileImageUrl}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
            priority={true} 
          />
        </ContainerScroll>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 items-center px-4 md:px-0">
        <div className="md:col-span-3 text-center md:text-left">
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
            {data.bio}
          </p>
          <div className="mt-8 flex justify-center md:justify-start items-center space-x-4">
            <MovingButton
              as="a"
              href={data.cvUrl}
              download="cv.pdf" 
              rel="noopener noreferrer"
              borderRadius="1.75rem"
              containerClassName="w-48 h-14" 
              className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 flex items-center justify-center gap-2 text-sm font-semibold"
            >
              <ArrowDownTrayIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Download CV</span>
            </MovingButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;