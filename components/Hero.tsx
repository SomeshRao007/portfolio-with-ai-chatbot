import React from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Button } from './ui/liquid-glass-button';
import { Button as MovingButton } from "@/components/ui/moving-boder";
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

const ExpandableButton: React.FC<{ href: string; icon: React.ReactNode; text: string; download?: boolean }> = ({ href, icon, text, download }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...(download && { download: 'cv.pdf' })}
        className="group relative flex items-center justify-center h-12 bg-white dark:bg-slate-700 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
    >
        <div className="flex items-center justify-center w-12 h-12">
            {icon}
        </div>
        <div
            className="absolute left-1/2 flex items-center bg-blue-600 dark:bg-blue-500 text-white text-sm font-semibold rounded-full whitespace-nowrap px-0 w-0 h-10 -translate-x-1/2 opacity-0 group-hover:px-6 group-hover:w-auto group-hover:opacity-100 group-focus:px-6 group-focus:w-auto group-focus:opacity-100 transition-all duration-300 ease-in-out"
        >
            <span className="opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 delay-150">{text}</span>
        </div>
    </a>
);

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
              href={data.cvUrl}
              download="cv.pdf" 
              rel="noopener noreferrer"
              borderRadius="1.75rem"
              className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 flex items-center justify-center gap-2"
            >
              <ArrowDownTrayIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span className="font-semibold">Download CV</span>
            </MovingButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;