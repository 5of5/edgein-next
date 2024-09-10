import { Fragment, useState, FC, PropsWithChildren } from 'react';

type Props = {
  className?: string;
  heading: string;
  right?: JSX.Element;
};

export const EditSection: FC<PropsWithChildren<Props>> = ({
  className = '',
  heading,
  right,
  children,
}) => {
  return (
    <>
      <section className={`py-3 lg:grid lg:grid-cols-5 lg:gap-6 ${className}`}>
        {heading && <div className="font-medium">{heading}</div>}
        <div className={`mt-1 lg:flex lg:col-span-4 lg:mt-0 lg:col-start-2`}>
          <div className="flex-grow">
            <div className="max-w-xl">{children}</div>
          </div>

          <div className="mt-4 flex-shrink-0 flex lg:justify-end lg:items-start lg:mt-0 lg:ml-4 lg:min-w-[100px]">
            {right ? right : ''}
          </div>
        </div>
      </section>
    </>
  );
};
