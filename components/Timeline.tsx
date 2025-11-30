import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { TimelineEvent } from '../types';
import { XMarkIcon, BriefcaseIcon, AcademicCapIcon, StarIcon } from '@heroicons/react/24/solid';

type TimelineProps = {
  data: TimelineEvent[];
};

const iconMap: { [key in TimelineEvent['icon']]: React.ReactNode } = {
  work: <BriefcaseIcon className="w-5 h-5 text-white" />,
  education: <AcademicCapIcon className="w-5 h-5 text-white" />,
  milestone: <StarIcon className="w-5 h-5 text-white" />,
};

const TimelineModal: React.FC<{ event: TimelineEvent; onClose: () => void }> = ({ event, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          aria-label="Close modal"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        <div>
          <p className="text-blue-500 dark:text-blue-400 font-semibold mb-2">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">{event.title}</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{event.fullDescription}</p>
        </div>
      </div>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

const TimelineItem: React.FC<{ event: TimelineEvent; index: number; onReadMore: (event: TimelineEvent) => void }> = ({ event, index, onReadMore }) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const isRightAligned = index % 2 === 0;

  return (
    <div ref={itemRef} className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-x-12 items-start group">
      {/* Icon */}
      <div className="absolute left-4 md:left-1/2 top-1 -translate-x-1/2 w-10 h-10 bg-blue-500 dark:bg-blue-400 rounded-full flex items-center justify-center ring-8 ring-slate-50 dark:ring-slate-900 z-10">
        {iconMap[event.icon]}
      </div>
      
      {/* Content */}
      <div className={`transition-all duration-700 ease-out ${isRightAligned ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1 md:text-right'} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 group-hover:shadow-xl dark:group-hover:shadow-slate-700 group-hover:-translate-y-1 transition-all duration-300">
          <p className="text-blue-500 dark:text-blue-400 font-semibold mb-1">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{event.title}</h3>
          <p className="text-slate-600 dark:text-slate-300">{event.description}</p>
          <button onClick={() => onReadMore(event)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors text-sm font-semibold">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};


const Timeline: React.FC<TimelineProps> = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [data]);

  const handleReadMore = (event: TimelineEvent) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <section className="py-20 md:py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold">Timeline</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50">My journey so far</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">All my academic and professional experience with some milestones achieved are summed up here.</p>
        </div>
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 bg-blue-200 dark:bg-slate-700 -translate-x-1/2"></div>

          <div className="space-y-16">
            {sortedData.map((event, index) => (
              <TimelineItem key={index} event={event} index={index} onReadMore={handleReadMore} />
            ))}
          </div>
        </div>
        {modalOpen && selectedEvent && <TimelineModal event={selectedEvent} onClose={handleCloseModal} />}
      </div>
    </section>
  );
};

export default Timeline;