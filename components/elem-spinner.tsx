import { PropsWithChildren } from 'react';
import styles from '../styles/ElemSpinner.module.css';

type Props = {
  title?: string;
  subtitle?: string;
};

export const ElemSpinner: React.FC<PropsWithChildren<Props>> = ({
  title,
  subtitle,
}) => {
  return (
    <section className="relative">
      <div className="fixed z-30 top-0 left-0 bottom-0 right-0 w-screen h-screen bg-primary-500 opacity-70 loading-page">
        <div className="flex justify-center items-center h-full w-full">
          <div className={`relative ${styles['lds-ripple']}`}>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </section>
  );
};
