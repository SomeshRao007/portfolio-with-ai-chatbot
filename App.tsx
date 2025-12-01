
import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Stats from './components/Stats';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import LearningList from './components/LearningList';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import { INITIAL_DATA, createChatbotSystemInstruction } from './constants';
import { ThemeProvider } from './hooks/useTheme';
import { WebGLShader } from "./components/ui/web-gl-shader";
import { LiquidButton } from './components/ui/liquid-glass-button';
import { SpeedInsights } from "@vercel/speed-insights/react"


const IntroScreen: React.FC<{ onEnter: () => void }> = ({ onEnter }) => {
  return (
    <div className="relative flex w-full h-screen flex-col items-center justify-center overflow-hidden bg-black">
      <WebGLShader/> 
      <div className="relative z-10 p-2 w-full mx-auto max-w-3xl">
        <main className="relative border border-white/20 bg-transparent backdrop-blur-md py-10 overflow-hidden rounded-xl shadow-2xl">
            <h1 className="mb-3 text-white text-center text-7xl font-extrabold tracking-tighter md:text-[clamp(2rem,8vw,7rem)]">Somesh Rao Coka</h1>
            <p className="text-white/60 px-6 text-center text-xs md:text-sm lg:text-lg">Speed Security Stability - DevOps Done Right!</p>
            <div className="my-8 flex items-center justify-center gap-1">
                <span className="relative flex h-3 w-3 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                <p className="text-xs text-green-500">Available for New Projects</p>
            </div>
            
            <div className="flex justify-center pb-6"> 
                <LiquidButton className="text-white border border-white/30 rounded-full font-bold tracking-wide" size={'xl'} onClick={onEnter}>Let's Go</LiquidButton> 
            </div> 
        </main>
        <SpeedInsights/>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const portfolioData = INITIAL_DATA;

  const chatbotInstruction = useMemo(() => createChatbotSystemInstruction(portfolioData), [portfolioData]);

  if (showIntro) {
    return <IntroScreen onEnter={() => setShowIntro(false)} />;
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col font-sans animate-in fade-in duration-1000">
        <Header name={portfolioData.personalInfo.name} />
        <main className="flex-grow container mx-auto px-4 md:px-8 py-8">
          <div id="home" className="pt-20 -mt-20">
            <Hero data={portfolioData.personalInfo} />
          </div>
          <Stats data={portfolioData.stats} />
          <div id="skills" className="pt-20 -mt-20">
            <Skills data={portfolioData.skills} />
          </div>
          <div id="timeline" className="pt-20 -mt-20">
            <Timeline data={portfolioData.timeline} />
          </div>
          <div id="projects" className="pt-20 -mt-20">
            <Projects data={portfolioData.projects} />
          </div>
          <div id="certifications" className="pt-20 -mt-20">
            <Certifications data={portfolioData.certifications} />
          </div>
          <div id="testimonials" className="pt-20 -mt-20">
            <Testimonials data={portfolioData.testimonials} />
          </div>
          <div id="learning" className="pt-20 -mt-20">
            <LearningList data={portfolioData.learning} />
          </div>
          <div id="contact" className="pt-20 -mt-20">
            <Contact formspreeEndpoint={portfolioData.personalInfo.formspreeEndpoint} />
          </div>
        </main>
        <Footer name={portfolioData.personalInfo.name} />
        <Chatbot systemInstruction={chatbotInstruction} />
      </div>
      <SpeedInsights/>
    </ThemeProvider>
  );
};

export default App;
