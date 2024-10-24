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
        <FigureBlurredBg className="top-0 left-0 right-0 -mt-10 -mb-32 -bottom-10 md:-mt-64 lg:-mt-32" />
        <div className="max-w-2xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8">
          <h1 className="relative max-w-3xl text-4xl font-bold lg:text-6xl">
            Contact
          </h1>
          <div className="mt-2 text-xl text-slate-600">
            Partner with EdgeIn, submit a profile, or simply get in touch.
            <div>Our team would love to hear from you!</div>
          </div>
          <div className="relative mt-16">
            <FigurePerspectiveGrid className="block absolute z-0 w-full scale-[2.5] bottom-0 opacity-30 text-dark-500" />
            <div className="absolute left-0 right-0 w-10/12 mx-auto border-2 -top-8 aspect-video rounded-2xl bg-gradient-to-tr from-white/80 to-white/20 border-white/60 opacity-80 backdrop-blur-3xl"></div>
            <div className="absolute left-0 right-0 w-11/12 mx-auto border-2 -top-4 aspect-video rounded-2xl bg-gradient-to-tr from-white/80 to-white/20 border-white/60 opacity-80 backdrop-blur-3xl"></div>

            <div className="relative z-10 p-6 bg-white rounded-2xl">
              {formSent ? (
                <div className="flex flex-col items-center justify-center sm:h-full">
                  <IconPaperAirplane className="w-12 h-12 mx-auto text-gray-300" />
                  <h2 className="mt-5 text-2xl font-bold text-center lg:text-3xl ">
                    Message Sent!
                  </h2>
                </div>
              ) : (
                <>
                  <form
                    className="relative grid grid-cols-1 mt-5 gap-y-4 sm:grid-cols-2 sm:gap-x-8"
                    onSubmit={onSubmit}>
                    <div className="mb-2 group sm:col-span-2">
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
                    <div className="mb-2 group sm:col-span-2">
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
                    <div className="mb-2 group sm:col-span-2">
                      <InputText
                        label="Company (Optional)"
                        type="text"
                        name="company"
                        value={company}
                        onChange={e => setCompany(e.target.value)}
                        placeholder=""
                      />
                    </div>
                    <div className="mb-2 group sm:col-span-2">
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
          <h2 className="relative pt-12 text-2xl font-bold text-center lg:text-3xl">
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
