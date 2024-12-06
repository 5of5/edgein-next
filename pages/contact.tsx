import React, { useState } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import { InputText } from '@/components/input-text';
import { InputTextarea } from '@/components/input-textarea';
import { ElemButton } from '@/components/elem-button';
import { IconPaperAirplane } from '@/components/icons';
import { FigureBlurredBg, FigurePerspectiveGrid } from '@/components/figures';
import { useFormspark } from '@formspark/use-formspark';
import { NextSeo } from 'next-seo';

const Contact: NextPage = () => {
  const [submit, submitting] = useFormspark({
    formId: 'AHfFBM4l',
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [formSent, setFormSent] = useState(false);

  const onSubmit = async (e: { preventDefault: () => void }) => {
    if (e) e.preventDefault();
    await submit({
      name: name,
      email: email,
      company: company,
      message: message,
      _email: {
        from: name,
        subject: 'Contact - EdgeIn',
        template: {
          title: false,
          footer: false,
        },
      },
    });

    setFormSent(true);
  };

  return (
    <>
      <NextSeo
        title="Contact"
        description="Request a company profile, tell us about you, or simply get in touch. Our team would love to hear from you!"
      />
      <div className="relative -mb-20 overflow-hidden">
        <FigureBlurredBg className="top-0 -bottom-10 left-0 right-0 -mt-10 md:-mt-64 lg:-mt-32 -mb-32" />
        <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h1 className="relative max-w-3xl text-4xl lg:text-6xl font-bold">
            Contact
          </h1>
          <div className="mt-2 text-xl text-slate-600">
            Partner with EdgeIn, submit a profile, or simply get in touch.
            <div>Our team would love to hear from you!</div>
          </div>
          <div className="mt-16 relative">
            <FigurePerspectiveGrid className="block absolute z-0 w-full scale-[2.5] bottom-0 opacity-30 text-dark-500" />
            <div className="absolute -top-8 left-0 right-0 aspect-video w-10/12 mx-auto rounded-2xl bg-gradient-to-tr from-white/80 to-white/20 border-2 border-white/60 opacity-80 backdrop-blur-3xl"></div>
            <div className="absolute -top-4 left-0 right-0 aspect-video w-11/12 mx-auto rounded-2xl bg-gradient-to-tr from-white/80 to-white/20 border-2 border-white/60 opacity-80 backdrop-blur-3xl"></div>

            <div className="rounded-2xl bg-black p-6 relative z-10">
              {formSent ? (
                <div className="flex flex-col items-center justify-center sm:h-full">
                  <IconPaperAirplane className="mx-auto h-12 w-12 text-gray-300" />
                  <h2 className="text-2xl font-bold text-center mt-5 lg:text-3xl ">
                    Message Sent!
                  </h2>
                </div>
              ) : (
                <>
                  <form
                    className="relative grid grid-cols-1 gap-y-4 mt-6 sm:grid-cols-2 sm:gap-x-8"
                    onSubmit={onSubmit}>
                    <div className="group mb-2 sm:col-span-2">
                      <InputText
                        label="Full Name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. John Edge"
                        required
                      />
                    </div>
                    <div className="group mb-2 sm:col-span-2">
                      <InputText
                        label="Business Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="example@email.com"
                        required
                      />
                    </div>
                    <div className="group mb-2 sm:col-span-2">
                      <InputText
                        label="Company (Optional)"
                        type="text"
                        name="company"
                        value={company}
                        onChange={e => setCompany(e.target.value)}
                        placeholder=""
                      />
                    </div>
                    <div className="group mb-2 sm:col-span-2">
                      <InputTextarea
                        label="Message"
                        name="message"
                        value={message}
                        rows={3}
                        onChange={e => setMessage(e.target.value)}
                        required
                      />
                    </div>
                    <div className="text-right sm:col-span-2">
                      <ElemButton btn="primary" loading={submitting}>
                        Send
                      </ElemButton>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
          <h2 className="relative font-bold text-center pt-12 text-2xl lg:text-3xl">
            Contact our PR team at{' '}
            <a href="mailto:press@edgein.io" className="hover:text-primary-500">
              press@edgein.io
            </a>
          </h2>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default Contact;
