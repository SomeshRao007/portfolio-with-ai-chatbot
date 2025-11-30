import React from 'react';

type ContactProps = {
  formspreeEndpoint: string;
};

const Contact: React.FC<ContactProps> = ({ formspreeEndpoint }) => {
  return (
    <section className="py-20 md:py-24 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50">Let's Connect</h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Have a question or want to work together? Drop me a line!</p>
      </div>
      <div className="max-w-xl mx-auto">
        <form action={formspreeEndpoint} method="POST" className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              required
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              required
              rows={4}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;