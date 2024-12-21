import { FC } from 'react';

type Props = {};

export const LoaderSpinner: FC<Props> = () => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-30 flex flex-col items-center justify-center bg-neutral-900/50">
      <div className="w-40 bg-black rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 300 150"
          className="text-primary-400">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="30"
            strokeLinecap="round"
            strokeDasharray="300 385"
            strokeDashoffset="0"
            d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z">
            <animate
              attributeName="stroke-dashoffset"
              calcMode="spline"
              dur="2"
              values="685;-685"
              keySplines="0 0 1 1"
              repeatCount="indefinite"></animate>
          </path>
        </svg>
      </div>
    </div>
  );
};
