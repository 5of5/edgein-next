import { FC, PropsWithChildren } from 'react';

type Props = {
  className?: string;
  heading: string | JSX.Element;
  right?: JSX.Element;
};

export const ElemListEditSection: FC<PropsWithChildren<Props>> = ({
  className = '',
  heading,
  right,
  children,
}) => {
  return (
    <>
      <section className={`w-full  p-3 ${className}`}>
        <div className="flex w-full">
          <div className="flex-1 text-left">
            {heading && <h3 className="font-medium">{heading}</h3>}
          </div>

          <div className="text-sm font-medium shrink-0 text-primary-500">
            {right ? right : ''}
          </div>
        </div>
        <div className="flex-1">{children}</div>
      </section>
    </>
  );
};
