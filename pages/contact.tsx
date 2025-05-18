import React, { useState } from 'react';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { motion, AnimatePresence } from 'framer-motion';

const ArrowIcon = () => (
  <svg
    className="w-5 h-5 ml-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="w-12 h-12 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const Contact: NextPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const inputStyles =
    'bg-black border-zinc-800 text-white placeholder-gray-500 focus:border-white focus:ring-white rounded-lg px-4 py-2.5 w-full transition-colors duration-200';
  const labelStyles = 'block text-white text-sm font-medium mb-1.5';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://submit-form.com/X532qUbS8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <NextSeo
        title="Contact"
        description="Partner with Mentibus, submit a profile, or simply get in touch. Our team would love to hear from you!"
      />
      <div className="min-h-screen bg-black flex items-center">
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Get in touch
            </h1>
            <p className="mt-2 text-base text-gray-400">
              Partner with Mentibus, submit a profile, or simply get in touch.
              <br />
              Our team would love to hear from you!
            </p>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-zinc-900 rounded-2xl p-6 shadow-xl border border-zinc-800">
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="rounded-full bg-zinc-800/50 p-4 mb-4">
                      <CheckIcon />
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-2">
                      Message sent successfully
                    </h2>
                    <p className="text-gray-400">
                      Thank you for reaching out. We&apos;ll be in touch soon!
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-zinc-900 rounded-2xl p-6 shadow-xl border border-zinc-800">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className={labelStyles}>
                          Full Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          placeholder="e.g., John Smith"
                          className={inputStyles}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className={labelStyles}>
                          Business Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          placeholder="e.g., john.smith@company.com"
                          className={inputStyles}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="company" className={labelStyles}>
                        Company
                        <span className="text-gray-400 font-normal">
                          {' '}
                          (Optional)
                        </span>
                      </label>
                      <input
                        id="company"
                        type="text"
                        name="company"
                        placeholder="e.g., Acme Corporation"
                        className={inputStyles}
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className={labelStyles}>
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="e.g., I'm interested in partnering with Mentibus for..."
                        rows={3}
                        className={inputStyles}
                        required
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center px-5 py-2.5 text-base font-medium rounded-lg text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white transition-all duration-200 w-full sm:w-auto">
                        Send message
                        <ArrowIcon />
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              For press inquiries, contact us at{' '}
              <a
                href="mailto:press@edgein.io"
                className="font-medium text-white hover:text-gray-300 transition-colors">
                press@edgein.io
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
