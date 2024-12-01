import React, { useState } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import { InputText } from '@/components/input-text';
import { ElemButton } from '@/components/elem-button';
import { FigureBlurredBg, FigurePerspectiveGrid } from '@/components/figures';
import { IconChevronDownMini } from '@/components/icons';
import { NextSeo } from 'next-seo';

const AskEdgein: NextPage = () => {
  const [query, setQuery] = useState('');
  const [queryRes, setQueryRes] = useState('');
  const [queryResJson, setQueryResJson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [enableExpand, setEnableExpand] = useState(false);

  const onSubmit = async (e: { preventDefault: () => void }) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const queryRes = await fetch(`/api/query/completions/`, {
        method: 'POST',
        body: JSON.stringify({
          query,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const json = await queryRes.json();
      console.log(json);
      setQueryResJson(json);
      if (!queryRes.ok) {
        setQueryRes('Error');
      } else {
        setQueryRes(json.answer);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setQueryRes('Error');
      setLoading(false);
    }
  };

  return (
    <>
      <NextSeo title="Ask EdgeIn" />
      <div className="relative">
        <FigureBlurredBg className="top-0 left-0 right-0 -mt-10 -mb-32 -bottom-10 md:-mt-64 lg:-mt-32" />
        <div className="max-w-2xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-center lg:text-5xl">
            Ask EdgeIn
          </h1>
          <div className="relative mt-16">
            <FigurePerspectiveGrid className="block absolute z-0 w-full scale-[2.5] bottom-6  text-gray-500" />
            <div className="absolute left-0 right-0 w-10/12 mx-auto border-2 -top-8 h-52 rounded-2xl bg-gradient-to-tr from-white/80 to-white/20 border-white/60 opacity-80 backdrop-blur-3xl"></div>
            <div className="absolute left-0 right-0 w-11/12 mx-auto border-2 -top-4 h-52 rounded-2xl bg-gradient-to-tr from-white/80 to-white/20 border-white/60 opacity-80 backdrop-blur-3xl"></div>

            <div className="relative z-10 p-6 bg-dark-100 rounded-2xl">
              <form
                className="relative grid grid-cols-1 mt-6 gap-y-4 sm:grid-cols-2 sm:gap-x-8"
                onSubmit={onSubmit}>
                <div className="mb-2 group sm:col-span-2">
                  <InputText
                    label="Question"
                    type="text"
                    name="name"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="e.g. How many companies are tagged NFT?"
                    required
                  />
                </div>
                <div className="text-right sm:col-span-2">
                  <ElemButton btn="primary" loading={loading}>
                    Ask
                  </ElemButton>
                </div>
                <div className="mb-2 group sm:col-span-2">{queryRes}</div>
                {queryRes && (
                  <div className="mb-2 group sm:col-span-2">
                    <div onClick={() => setEnableExpand(true)}>
                      <span className="leading-tight text-primary-500 hover:border-b hover:border-primary-500">
                        Details
                      </span>
                      <IconChevronDownMini className="inline h-5 aspect-square text-primary-500" />
                    </div>
                    {enableExpand && (
                      <div>
                        <pre style={{ whiteSpace: 'break-spaces' }}>
                          {JSON.stringify(queryResJson, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>
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

export default AskEdgein;
