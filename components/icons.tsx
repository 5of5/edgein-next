import { FC } from 'react';

export type IconProps = {
  className?: string;
  strokeWidth?: number;
  title?: string;
};

export const IconSpinner: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true">
      <title>{title ? title : 'Loading'}</title>
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"></circle>
      <path
        className="opacity-75 ring-4 ring-primary-500"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
};

export const IconArrowRight: FC<IconProps> = ({
  className,
  strokeWidth,
  title,
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Arrow Right'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  );
};

export const IconArrowUp: FC<IconProps> = ({
  className,
  strokeWidth,
  title,
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Arrow Up'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
      />
    </svg>
  );
};

export const IconEye: FC<IconProps> = ({ className, strokeWidth, title }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'View'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
};

export const IconEyeSlash: FC<IconProps> = ({
  className,
  strokeWidth,
  title,
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Hide'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );
};

export const IconWindowSidebar: FC<IconProps> = ({
  className,
  strokeWidth,
  title,
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Sidebar'}</title>
      <path
        d="M9.5 3.75H5.25C4.65326 3.75 4.08097 3.98705 3.65901 4.40901C3.23705 4.83097 3 5.40326 3 6V18C3 18.5967 3.23705 19.169 3.65901 19.591C4.08097 20.0129 4.65326 20.25 5.25 20.25H9.5M9.5 3.75H18.75C19.3467 3.75 19.919 3.98705 20.341 4.40901C20.7629 4.83097 21 5.40326 21 6V18C21 18.5967 20.7629 19.169 20.341 19.591C19.919 20.0129 19.3467 20.25 18.75 20.25H9.5M9.5 3.75V20.25M4.75 6H7.5M4.75 8.5H7.5M4.75 11H7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const IconArrowDown: FC<IconProps> = ({
  className,
  strokeWidth,
  title,
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Arrow Down'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
      />
    </svg>
  );
};

export const IconCurrencyDollar: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}>
      <title>{title ? title : 'Currency Dollar'}</title>
      <path
        d="M12 8C10.343 8 9 8.895 9 10C9 11.105 10.343 12 12 12C13.657 12 15 12.895 15 14C15 15.105 13.657 16 12 16V8ZM12 8C13.11 8 14.08 8.402 14.599 9L12 8ZM12 8V7V8ZM12 8V16V8ZM12 16V17V16ZM12 16C10.89 16 9.92 15.598 9.401 15L12 16ZM21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const IconInformationCircleSolid: FC<IconProps> = ({
  className,
  title,
}) => {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <title>{title ? title : 'Info'}</title>
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const IconInformationCircle: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Info'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
      />
    </svg>
  );
};

export const IconChartUp: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true">
      <title>{title ? title : 'Chart Up'}</title>
      <path d="M2 12.9053C2 12.6819 2.08872 12.4677 2.24665 12.3098C2.40457 12.1519 2.61877 12.0632 2.84211 12.0632H4.52632C4.74966 12.0632 4.96385 12.1519 5.12177 12.3098C5.2797 12.4677 5.36842 12.6819 5.36842 12.9053V17.1158C5.36842 17.3391 5.2797 17.5533 5.12177 17.7112C4.96385 17.8692 4.74966 17.9579 4.52632 17.9579H2.84211C2.61877 17.9579 2.40457 17.8692 2.24665 17.7112C2.08872 17.5533 2 17.3391 2 17.1158V12.9053ZM6.21053 9.53684C6.21053 9.3135 6.29925 9.09931 6.45717 8.94138C6.6151 8.78346 6.82929 8.69474 7.05263 8.69474H8.73684C8.96018 8.69474 9.17438 8.78346 9.3323 8.94138C9.49023 9.09931 9.57895 9.3135 9.57895 9.53684V17.1158C9.57895 17.3391 9.49023 17.5533 9.3323 17.7112C9.17438 17.8692 8.96018 17.9579 8.73684 17.9579H7.05263C6.82929 17.9579 6.6151 17.8692 6.45717 17.7112C6.29925 17.5533 6.21053 17.3391 6.21053 17.1158V9.53684ZM10.4211 11.2211C10.4211 10.9977 10.5098 10.7835 10.6677 10.6256C10.8256 10.4677 11.0398 10.3789 11.2632 10.3789H12.9474C13.1707 10.3789 13.3849 10.4677 13.5428 10.6256C13.7008 10.7835 13.7895 10.9977 13.7895 11.2211V17.1158C13.7895 17.3391 13.7008 17.5533 13.5428 17.7112C13.3849 17.8692 13.1707 17.9579 12.9474 17.9579H11.2632C11.0398 17.9579 10.8256 17.8692 10.6677 17.7112C10.5098 17.5533 10.4211 17.3391 10.4211 17.1158V11.2211Z" />
      <path d="M14.8782 7.25717C14.7203 7.4151 14.6316 7.62929 14.6316 7.85263V17.1158C14.6316 17.3391 14.7203 17.5533 14.8782 17.7112C15.0362 17.8692 15.2503 17.9579 15.4737 17.9579H17.1579C17.3812 17.9579 17.5954 17.8692 17.7534 17.7112C17.9113 17.5533 18 17.3391 18 17.1158V7.85263C18 7.62929 17.9113 7.4151 17.7534 7.25717C17.5954 7.09925 17.3812 7.01053 17.1579 7.01053H15.4737C15.2503 7.01053 15.0362 7.09925 14.8782 7.25717Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.2683 2.26484C17.5639 2.59324 17.5373 3.09907 17.2089 3.39464L12.9983 7.18412C12.7371 7.41924 12.353 7.45631 12.0516 7.27548L8.32827 5.0415L3.71215 8.88827C3.37273 9.17112 2.86827 9.12526 2.58542 8.78584C2.30257 8.44642 2.34843 7.94197 2.68785 7.65911L7.74048 3.44859C8.00188 3.23076 8.37246 3.20211 8.66423 3.37717L12.3676 5.59919L16.1385 2.20537C16.4669 1.9098 16.9728 1.93643 17.2683 2.26484Z"
      />
    </svg>
  );
};

export const IconBadgeCheckSolid: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true">
      <title>{title ? title : 'Badge Check'}</title>
      <path
        fillRule="evenodd"
        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const IconBadgeCheck: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Badge Check'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
      />
    </svg>
  );
};

export const IconLockClosed: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Lock Closed'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  );
};

export const IconMinus: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
      stroke="currentColor"
      strokeWidth="2">
      <title>{title ? title : 'Minus'}</title>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
    </svg>
  );
};
export const IconAnnotation: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
      stroke="currentColor"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}>
      <title>{title ? title : 'Annotation'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
      />
    </svg>
  );
};

export const IconStatus: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
      stroke="currentColor"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}>
      <title>{title ? title : 'Status'}</title>
      <path
        d="M2 12H9.55585L11 8.5L14.5 15.4442L16 12H18.5M4.68508 15.4442C5.13738 16.5361 5.80031 17.5282 6.63604 18.364C7.47177 19.1997 8.46392 19.8626 9.55585 20.3149C10.6478 20.7672 11.8181 21 13 21C14.1819 21 15.3522 20.7672 16.4442 20.3149C17.5361 19.8626 18.5282 19.1997 19.364 18.364C20.1997 17.5282 20.8626 16.5361 21.3149 15.4442C21.7672 14.3522 22 13.1819 22 12C22 9.61305 21.0518 7.32387 19.364 5.63604C17.6761 3.94821 15.3869 3 13 3C10.6131 3 8.32387 3.94821 6.63604 5.63604C4.94821 7.32387 4 9.61305 4 12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const IconThumbUp: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
      stroke="currentColor"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}>
      <title>{title ? title : 'Like'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
      />
    </svg>
  );
};

export const IconThumbUpSolid: FC<IconProps> = ({ className, title }) => {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <title>{title ? title : 'Like'}</title>
      <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
    </svg>
  );
};

export const IconPaperAirplane: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
      stroke="currentColor"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}>
      <title>{title ? title : 'Send'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
      />
    </svg>
  );
};

export const IconPaperAirplaneSolid: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}>
      <title>{title ? title : 'Send'}</title>
      <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
  );
};

export const IconSelector: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
      stroke="currentColor"
      strokeWidth="2">
      <title>{title ? title : 'Selector'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
      />
    </svg>
  );
};

export const IconCheck: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
      stroke="currentColor"
      strokeWidth="2">
      <title>{title ? title : 'Check'}</title>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
};

export const IconCheckBadge: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Check Badge'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
      />
    </svg>
  );
};

export const IconCheckBadgeSolid: FC<IconProps> = ({ className, title }) => {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <title>{title ? title : 'Check Badge'}</title>
      <path
        fillRule="evenodd"
        d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const IconLinkedIn: FC<IconProps> = ({ className, title }) => {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <title>{title ? title : 'LinkedIn'}</title>
      <path
        fillRule="evenodd"
        d="M4.98 3.5c0 .828-.672 1.5-1.5 1.5S2 4.328 2 3.5C2 2.672 2.672 2 3.48 2S4.98 2.672 4.98 3.5zM2 8h3v12H2V8zm6.5-1.5h3c.83 0 1.5.672 1.5 1.5v9c0 .828-.67 1.5-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-9c0-.828.67-1.5 1.5-1.5zM16 8h3v12h-3V8zm-6.5 1.5v9h3v-9h-3z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const IconSearch: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth ?? 2}>
      <title>{title ? title : 'Search'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
};

export const IconFilter: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={strokeWidth ?? 2}
      //  strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}>
      <title>{title ? title : 'Filter'}</title>

      <path d="M1 5H23M5 12H19M9 19H15" />
    </svg>
  );
};

export const IconGrid: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}>
      <title>{title ? title : 'Grid'}</title>
      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );
};

export const IconList: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}>
      <title>{title ? title : 'List'}</title>
      <path
        fillRule="evenodd"
        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const IconGroup: FC<IconProps> = ({ className, title, strokeWidth }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Group'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
      />
    </svg>
  );
};

export const IconGroupPlus: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Add Group'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  );
};

export const IconEllipsisVertical: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      className={`${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Options'}</title>
      <path
        d="M11.75 6.5C11.5511 6.5 11.3603 6.42098 11.2197 6.28033C11.079 6.13968 11 5.94891 11 5.75C11 5.55109 11.079 5.36032 11.2197 5.21967C11.3603 5.07902 11.5511 5 11.75 5C11.9489 5 12.1397 5.07902 12.2803 5.21967C12.421 5.36032 12.5 5.55109 12.5 5.75C12.5 5.94891 12.421 6.13968 12.2803 6.28033C12.1397 6.42098 11.9489 6.5 11.75 6.5ZM11.75 12.5C11.5511 12.5 11.3603 12.421 11.2197 12.2803C11.079 12.1397 11 11.9489 11 11.75C11 11.5511 11.079 11.3603 11.2197 11.2197C11.3603 11.079 11.5511 11 11.75 11C11.9489 11 12.1397 11.079 12.2803 11.2197C12.421 11.3603 12.5 11.5511 12.5 11.75C12.5 11.9489 12.421 12.1397 12.2803 12.2803C12.1397 12.421 11.9489 12.5 11.75 12.5ZM11.75 18.5C11.5511 18.5 11.3603 18.421 11.2197 18.2803C11.079 18.1397 11 17.9489 11 17.75C11 17.5511 11.079 17.3603 11.2197 17.2197C11.3603 17.079 11.5511 17 11.75 17C11.9489 17 12.1397 17.079 12.2803 17.2197C12.421 17.3603 12.5 17.5511 12.5 17.75C12.5 17.9489 12.421 18.1397 12.2803 18.2803C12.1397 18.421 11.9489 18.5 11.75 18.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const IconEllipsisHorizontal: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      className={`${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Options'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
      />
    </svg>
  );
};

export const IconTrash: FC<IconProps> = ({ className, title, strokeWidth }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Trash'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  );
};

export const IconCustomList: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'List'}</title>
      <rect x="14" y="10" width="7" height="7" />
      <line x1="2" y1="16" x2="11" y2="16" />
      <line x1="2" y1="11" x2="11" y2="11" />
      <line x1="2" y1="6" x2="22" y2="6" />
    </svg>
  );
};

export const IconCash: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}>
      <title>{title ? title : 'Cash'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
      />
    </svg>
  );
};

export const IconDocumentDownload: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Document Download'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
  );
};

export const IconDocument: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Document'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
  );
};

export const IconDocumentText: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Document Text'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
  );
};

export const IconNewspaper: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'News'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
      />
    </svg>
  );
};

export const IconPlayCircle: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Play Circle'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
      />
    </svg>
  );
};

export const IconUsers: FC<IconProps> = ({ className, title, strokeWidth }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}>
      <title>{title ? title : 'Users'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
      />
    </svg>
  );
};

export const IconUser: FC<IconProps> = ({ className, title, strokeWidth }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'User'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  );
};

export const IconUserSolid: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      stroke="none"
      viewBox="0 0 24 24">
      <title>{title ? title : 'User'}</title>
      <path
        fillRule="evenodd"
        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const IconUserPlaceholder: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      stroke="none"
      viewBox="0 0 24 24">
      <title>{title ? title : 'User'}</title>
      <rect opacity="0.20" width="24" height="24" rx="12" />
      <path d="M19 21.7479C17.0298 23.1652 14.6124 24 12 24C9.38763 24 6.97024 23.1652 5 21.7479V20.6C5 18.0595 7.05949 16 9.6 16H14.4C16.9405 16 19 18.0595 19 20.6V21.7479Z" />
      <circle cx="12" cy="9" r="5" />
    </svg>
  );
};

export const IconCompanyPlaceholder: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      stroke="none"
      viewBox="0 0 24 24">
      <title>{title ? title : 'Company'}</title>
      <rect opacity="0.20" width="24" height="24" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5 2.25C4.30109 2.25 4.11032 2.32902 3.96967 2.46967C3.82902 2.61032 3.75 2.80109 3.75 3C3.75 3.19891 3.82902 3.38968 3.96967 3.53033C4.11032 3.67098 4.30109 3.75 4.5 3.75V20.25H3.75C3.55109 20.25 3.36032 20.329 3.21967 20.4697C3.07902 20.6103 3 20.8011 3 21C3 21.1989 3.07902 21.3897 3.21967 21.5303C3.36032 21.671 3.55109 21.75 3.75 21.75H20.25C20.4489 21.75 20.6397 21.671 20.7803 21.5303C20.921 21.3897 21 21.1989 21 21C21 20.8011 20.921 20.6103 20.7803 20.4697C20.6397 20.329 20.4489 20.25 20.25 20.25H19.5V3.75C19.6989 3.75 19.8897 3.67098 20.0303 3.53033C20.171 3.38968 20.25 3.19891 20.25 3C20.25 2.80109 20.171 2.61032 20.0303 2.46967C19.8897 2.32902 19.6989 2.25 19.5 2.25H4.5ZM9 6C8.80109 6 8.61032 6.07902 8.46967 6.21967C8.32902 6.36032 8.25 6.55109 8.25 6.75C8.25 6.94891 8.32902 7.13968 8.46967 7.28033C8.61032 7.42098 8.80109 7.5 9 7.5H10.5C10.6989 7.5 10.8897 7.42098 11.0303 7.28033C11.171 7.13968 11.25 6.94891 11.25 6.75C11.25 6.55109 11.171 6.36032 11.0303 6.21967C10.8897 6.07902 10.6989 6 10.5 6H9ZM8.25 9.75C8.25 9.55109 8.32902 9.36032 8.46967 9.21967C8.61032 9.07902 8.80109 9 9 9H10.5C10.6989 9 10.8897 9.07902 11.0303 9.21967C11.171 9.36032 11.25 9.55109 11.25 9.75C11.25 9.94891 11.171 10.1397 11.0303 10.2803C10.8897 10.421 10.6989 10.5 10.5 10.5H9C8.80109 10.5 8.61032 10.421 8.46967 10.2803C8.32902 10.1397 8.25 9.94891 8.25 9.75ZM9 12C8.80109 12 8.61032 12.079 8.46967 12.2197C8.32902 12.3603 8.25 12.5511 8.25 12.75C8.25 12.9489 8.32902 13.1397 8.46967 13.2803C8.61032 13.421 8.80109 13.5 9 13.5H10.5C10.6989 13.5 10.8897 13.421 11.0303 13.2803C11.171 13.1397 11.25 12.9489 11.25 12.75C11.25 12.5511 11.171 12.3603 11.0303 12.2197C10.8897 12.079 10.6989 12 10.5 12H9ZM12.75 6.75C12.75 6.55109 12.829 6.36032 12.9697 6.21967C13.1103 6.07902 13.3011 6 13.5 6H15C15.1989 6 15.3897 6.07902 15.5303 6.21967C15.671 6.36032 15.75 6.55109 15.75 6.75C15.75 6.94891 15.671 7.13968 15.5303 7.28033C15.3897 7.42098 15.1989 7.5 15 7.5H13.5C13.3011 7.5 13.1103 7.42098 12.9697 7.28033C12.829 7.13968 12.75 6.94891 12.75 6.75ZM13.5 9C13.3011 9 13.1103 9.07902 12.9697 9.21967C12.829 9.36032 12.75 9.55109 12.75 9.75C12.75 9.94891 12.829 10.1397 12.9697 10.2803C13.1103 10.421 13.3011 10.5 13.5 10.5H15C15.1989 10.5 15.3897 10.421 15.5303 10.2803C15.671 10.1397 15.75 9.94891 15.75 9.75C15.75 9.55109 15.671 9.36032 15.5303 9.21967C15.3897 9.07902 15.1989 9 15 9H13.5ZM12.75 12.75C12.75 12.5511 12.829 12.3603 12.9697 12.2197C13.1103 12.079 13.3011 12 13.5 12H15C15.1989 12 15.3897 12.079 15.5303 12.2197C15.671 12.3603 15.75 12.5511 15.75 12.75C15.75 12.9489 15.671 13.1397 15.5303 13.2803C15.3897 13.421 15.1989 13.5 15 13.5H13.5C13.3011 13.5 13.1103 13.421 12.9697 13.2803C12.829 13.1397 12.75 12.9489 12.75 12.75ZM9 19.5V17.25C9 17.0511 9.07902 16.8603 9.21967 16.7197C9.36032 16.579 9.55109 16.5 9.75 16.5H14.25C14.4489 16.5 14.6397 16.579 14.7803 16.7197C14.921 16.8603 15 17.0511 15 17.25V19.5C15 19.6989 14.921 19.8897 14.7803 20.0303C14.6397 20.171 14.4489 20.25 14.25 20.25H9.75C9.55109 20.25 9.36032 20.171 9.21967 20.0303C9.07902 19.8897 9 19.6989 9 19.5Z"
      />
    </svg>
  );
};

export const IconExclamationTriangle: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}>
      <title>{title ? title : 'Warning'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      />
    </svg>
  );
};

export const IconUserPlus: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}>
      <title>{title ? title : 'Add User'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
      />
    </svg>
  );
};

export const IconUserCircle: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'User'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
};

export const IconUserCircleSolid: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24">
      <title>{title ? title : 'User'}</title>
      <path
        fillRule="evenodd"
        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const IconAlert: FC<IconProps> = ({ className, title, strokeWidth }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Alert'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
      />
    </svg>
  );
};

export const IconAlertSolid: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24">
      <title>{title ? title : 'Alert'}</title>
      <path d="M5.85 3.5a.75.75 0 00-1.117-1 9.719 9.719 0 00-2.348 4.876.75.75 0 001.479.248A8.219 8.219 0 015.85 3.5zM19.267 2.5a.75.75 0 10-1.118 1 8.22 8.22 0 011.987 4.124.75.75 0 001.48-.248A9.72 9.72 0 0019.266 2.5z" />
      <path
        fillRule="evenodd"
        d="M12 2.25A6.75 6.75 0 005.25 9v.75a8.217 8.217 0 01-2.119 5.52.75.75 0 00.298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 107.48 0 24.583 24.583 0 004.83-1.244.75.75 0 00.298-1.205 8.217 8.217 0 01-2.118-5.52V9A6.75 6.75 0 0012 2.25zM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 004.496 0l.002.1a2.25 2.25 0 11-4.5 0z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const IconImage: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor">
      <title>{title ? title : 'Image'}</title>
      <path
        fillRule="evenodd"
        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const IconFlag: FC<IconProps> = ({ className, title, strokeWidth }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}>
      <title>{title ? title : 'Flag'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
      />
    </svg>
  );
};

export const IconLink: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.5}
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg">
      <title>{title ? title : 'Link'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
      />
    </svg>
  );
};

export const IconExternalLink: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}>
      <title>{title ? title : 'External Link'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
};

export const IconChatBubble: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.5}
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg">
      <title>{title ? title : 'SMS'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
      />
    </svg>
  );
};

export const IconTelegram: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg">
      <title>{title ? title : 'Telegram'}</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.36937 11.1466C8.73698 8.81551 12.3103 7.26657 14.1046 6.51511C19.2115 4.3834 20.285 4.01534 20.9751 4C21.1285 4 21.4659 4.03067 21.6959 4.2147C21.8799 4.36806 21.926 4.56743 21.9566 4.72079C21.9873 4.87415 22.018 5.19621 21.9873 5.44159C21.7112 8.35543 20.515 15.4253 19.9016 18.6766C19.6409 20.0568 19.1348 20.5169 18.644 20.5629C17.5705 20.6549 16.7577 19.8574 15.7302 19.1827C14.1046 18.1245 13.1998 17.465 11.6201 16.4222C9.79516 15.226 10.976 14.5665 12.0189 13.493C12.2949 13.2169 17.0031 8.92286 17.0951 8.53946C17.1104 8.49345 17.1104 8.30942 17.0031 8.2174C16.8957 8.12539 16.7424 8.15606 16.6197 8.18673C16.451 8.2174 13.8745 9.93504 8.85967 13.3243C8.12354 13.8304 7.46409 14.0758 6.86598 14.0604C6.20654 14.0451 4.94898 13.6924 3.99815 13.3856C2.84795 13.0176 1.92779 12.8182 2.00447 12.1741C2.05048 11.8367 2.51056 11.4993 3.36937 11.1466Z"
      />
    </svg>
  );
};

export const IconTelegramAlt: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.5}
      stroke="currentColor"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg">
      <title>{title ? title : 'Telegram'}</title>
      <path d="M8 14L3.09674 11.957C2.68806 11.7867 2.68601 11.2084 3.09348 11.0353L21.1443 3.36369C21.511 3.20784 21.9037 3.52258 21.8316 3.91444L18.6584 21.1401C18.5883 21.5204 18.1315 21.6806 17.8392 21.4273L13 17.2333M8 14L19 6.5L11 15.5M8 14L10 20.5M11 15.5L10 20.5M11 15.5L13 17.2333M10 20.5L13 17.2333" />
    </svg>
  );
};

export const IconWhatsApp: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg">
      <title>{title ? title : 'WhatsApp'}</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.0039 4.90632C17.1331 3.03302 14.6449 2.00094 11.9938 2C6.53098 2 2.08503 6.44545 2.08315 11.9097C2.08221 13.6565 2.53885 15.3615 3.40611 16.8641L2 22L7.25378 20.6219C8.70119 21.4117 10.3311 21.8275 11.9896 21.828H11.9938C17.4557 21.828 21.9021 17.382 21.904 11.9178C21.905 9.26956 20.8752 6.78001 19.0039 4.90676V4.90632V4.90632ZM11.9938 20.1543H11.9905C10.5126 20.1539 9.06283 19.7566 7.79787 19.0063L7.4971 18.8276L4.3793 19.6454L5.2114 16.6056L5.01557 16.2938C4.1911 14.9823 3.75537 13.4664 3.75631 11.9102C3.75824 7.36878 7.45331 3.67365 11.9972 3.67365C14.1973 3.67459 16.2654 4.53229 17.8207 6.0895C19.376 7.64627 20.2318 9.71624 20.2309 11.9168C20.2289 16.4588 16.5339 20.1539 11.9938 20.1539V20.1543V20.1543ZM16.512 13.9854C16.2644 13.8614 15.047 13.2626 14.8198 13.1799C14.5927 13.0972 14.4278 13.0559 14.2629 13.3039C14.098 13.552 13.6233 14.1099 13.4788 14.2748C13.3343 14.4401 13.1899 14.4606 12.9423 14.3365C12.6948 14.2125 11.8969 13.9511 10.9508 13.1077C10.2147 12.4509 9.71762 11.6403 9.5732 11.3922C9.42873 11.1442 9.558 11.0102 9.68151 10.8871C9.7927 10.7759 9.9291 10.5977 10.0531 10.4532C10.1772 10.3088 10.218 10.2052 10.3007 10.0403C10.3834 9.87491 10.3421 9.7305 10.2803 9.60643C10.2185 9.48242 9.72337 8.26352 9.51664 7.76791C9.31561 7.28513 9.11132 7.3507 8.95972 7.34263C8.81525 7.33544 8.65037 7.33406 8.48501 7.33406C8.31964 7.33406 8.0516 7.39587 7.82447 7.6439C7.59734 7.89192 6.9577 8.49114 6.9577 9.70954C6.9577 10.9279 7.84493 12.106 7.96894 12.2714C8.09295 12.4367 9.71524 14.9377 12.1991 16.0107C12.7898 16.2658 13.2512 16.4184 13.6109 16.5324C14.204 16.7211 14.7438 16.6945 15.1705 16.6308C15.6462 16.5595 16.6355 16.0316 16.8418 15.4532C17.048 14.8749 17.048 14.3788 16.9862 14.2757C16.9245 14.1726 16.7591 14.1103 16.5115 13.9863L16.512 13.9854V13.9854Z"
      />
    </svg>
  );
};

export const IconLinkedInAlt: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg">
      <title>{title ? title : 'LinkedIn'}</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.4654 7.49948C5.82626 7.49948 6.92949 6.49339 6.92949 5.25095C6.92949 4.00741 5.82626 3 4.4654 3C3.10323 3 2 4.00741 2 5.25095C2 6.49339 3.10323 7.49948 4.4654 7.49948ZM2.56478 21.9639H6.98603V9.21254H2.56478V21.9639ZM13.1913 14.8718C13.1913 13.4095 13.8832 11.9795 15.5375 11.9795C17.1917 11.9795 17.5985 13.4095 17.5985 14.8369V21.801H22V14.5522C22 9.51599 19.0231 8.64776 17.1917 8.64776C15.362 8.64776 14.3527 9.26667 13.1913 10.7664V9.04967H8.77731V21.801H13.1913V14.8718V14.8718Z"
      />
    </svg>
  );
};

export const IconGithub: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true">
      <title>{title ? title : 'Github'}</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017C2 16.442 4.865 20.197 8.839 21.521C9.339 21.613 9.521 21.304 9.521 21.038C9.521 20.801 9.513 20.17 9.508 19.335C6.726 19.94 6.139 17.992 6.139 17.992C5.685 16.834 5.029 16.526 5.029 16.526C4.121 15.906 5.098 15.918 5.098 15.918C6.101 15.988 6.629 16.95 6.629 16.95C7.521 18.48 8.97 18.038 9.539 17.782C9.631 17.135 9.889 16.694 10.175 16.444C7.955 16.191 5.62 15.331 5.62 11.493C5.62 10.4 6.01 9.505 6.649 8.805C6.546 8.552 6.203 7.533 6.747 6.155C6.747 6.155 7.587 5.885 9.497 7.181C10.3128 6.95851 11.1544 6.84519 12 6.844C12.85 6.848 13.705 6.959 14.504 7.181C16.413 5.885 17.251 6.154 17.251 6.154C17.797 7.533 17.453 8.552 17.351 8.805C17.991 9.505 18.379 10.4 18.379 11.493C18.379 15.341 16.04 16.188 13.813 16.436C14.172 16.745 14.491 17.356 14.491 18.291C14.491 19.629 14.479 20.71 14.479 21.038C14.479 21.306 14.659 21.618 15.167 21.52C17.1583 20.8521 18.8893 19.5753 20.1155 17.87C21.3416 16.1648 22.0009 14.1173 22 12.017C22 6.484 17.522 2 12 2Z"
      />
    </svg>
  );
};

export const IconDiscord: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true">
      <title>{title ? title : 'Discord'}</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.55753 4.10244C7.48 4.33823 6.62354 4.60484 5.65016 5.00749C4.9656 5.29065 5.02213 5.23442 4.44245 6.20867C3.15242 8.37669 2.40117 10.5483 2.09028 13.0082C1.99929 13.7282 1.96677 16.0223 2.04111 16.4803C2.07721 16.7029 2.09183 16.7192 2.52308 17.0192C3.57472 17.7505 4.96246 18.4736 6.19698 18.9333C7.18294 19.3004 7.09849 19.305 7.39332 18.8681C7.53677 18.6556 7.62789 18.4738 7.60825 18.4396C7.58947 18.4069 7.5929 18.3973 7.61589 18.4182C7.661 18.4593 7.80057 18.2538 8.02938 17.8095L8.17375 17.5293L7.94217 17.4315C7.42294 17.2121 6.52501 16.7433 6.52665 16.6924C6.52878 16.6267 6.8554 16.3717 6.93739 16.3717C6.96933 16.3717 7.1346 16.4345 7.30466 16.5112C7.71539 16.6965 8.67547 17.0173 9.18667 17.1401C11.0022 17.5762 12.7366 17.5917 14.5984 17.1887C15.1345 17.0727 16.227 16.7177 16.6826 16.5116C16.8526 16.4347 17.0177 16.3717 17.0496 16.3717C17.0814 16.3717 17.1924 16.4452 17.2962 16.5349L17.485 16.6981L17.3164 16.8032C17.0853 16.9472 16.2205 17.3604 15.9983 17.433C15.8986 17.4656 15.8169 17.5132 15.8169 17.5387C15.8169 17.7066 16.7993 19.2271 16.9078 19.2271C17.0248 19.2271 18.1491 18.807 18.7608 18.5348C19.5678 18.1757 20.5614 17.6275 21.2744 17.1481C21.9973 16.662 21.9379 16.801 21.9886 15.4764C22.1052 12.4284 21.3272 9.29742 19.7878 6.6194C19.2708 5.71982 18.9564 5.25992 18.8217 5.20562C18.7528 5.17789 18.4242 5.045 18.0915 4.91036C17.7587 4.77572 17.2252 4.58611 16.9058 4.48893C16.0709 4.235 14.8918 3.97526 14.8251 4.03058C14.7951 4.0555 14.6644 4.29704 14.5348 4.56733L14.2991 5.05874L13.9812 5.02472C12.4494 4.86066 11.538 4.86056 10.0085 5.02443L9.69308 5.05826L9.42777 4.53389C9.28186 4.24545 9.14069 4.00541 9.11407 4.00038C9.08746 3.99534 8.83701 4.04127 8.55753 4.10244ZM9.18614 10.431C10.0983 10.7099 10.6629 11.7999 10.4385 12.8486C10.3179 13.412 10.0222 13.852 9.5658 14.1469C8.67692 14.7215 7.54325 14.3479 7.06704 13.3235C6.7846 12.716 6.79428 11.9628 7.09215 11.3685C7.49234 10.57 8.36423 10.1797 9.18614 10.431ZM16.0346 10.5149C16.9715 10.9384 17.3972 12.1424 16.9885 13.2124C16.6714 14.0425 15.8468 14.5424 15.0477 14.3891C14.043 14.1963 13.3667 13.1393 13.5429 12.0368C13.7496 10.7424 14.9356 10.018 16.0346 10.5149Z"
      />
    </svg>
  );
};

export const IconMedium: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true">
      <title>{title ? title : 'Medium'}</title>
      <path d="M7.19996 5.75977C5.54501 5.75977 3.95784 6.41719 2.78761 7.58742C1.61739 8.75765 0.959961 10.3448 0.959961 11.9998C0.959961 13.6547 1.61739 15.2419 2.78761 16.4121C3.95784 17.5823 5.54501 18.2398 7.19996 18.2398C8.85491 18.2398 10.4421 17.5823 11.6123 16.4121C12.7825 15.2419 13.44 13.6547 13.44 11.9998C13.44 10.3448 12.7825 8.75765 11.6123 7.58742C10.4421 6.41719 8.85491 5.75977 7.19996 5.75977ZM17.04 6.23977C15.3168 6.23977 13.92 8.81881 13.92 11.9998C13.92 12.5964 13.9689 13.1714 14.0601 13.7124C14.1816 14.4338 14.3779 15.0943 14.6323 15.6636C14.7595 15.9482 14.9011 16.2098 15.0552 16.4446C15.3633 16.914 15.7214 17.2764 16.1121 17.501C16.4054 17.669 16.7169 17.7598 17.04 17.7598C17.363 17.7598 17.6745 17.669 17.9678 17.501C18.3585 17.2764 18.7166 16.914 19.0248 16.4446C19.1788 16.2098 19.3204 15.9482 19.4476 15.6636C19.702 15.0948 19.8984 14.4338 20.0198 13.7124C20.111 13.1714 20.16 12.5964 20.16 11.9998C20.16 8.81881 18.7632 6.23977 17.04 6.23977ZM21.84 6.71977C21.7156 6.71977 21.5956 6.80281 21.4833 6.95737C21.408 7.06009 21.336 7.19449 21.2683 7.35721C21.2342 7.43833 21.2011 7.52665 21.1694 7.62169C21.1056 7.81129 21.046 8.02777 20.9918 8.26633C20.8833 8.74393 20.7955 9.31321 20.7345 9.94489C20.7043 10.2607 20.6808 10.5924 20.6644 10.9361C20.6481 11.2793 20.64 11.6354 20.64 11.9998C20.64 12.3641 20.6481 12.7202 20.6644 13.0639C20.6803 13.4076 20.7038 13.7393 20.7345 14.0551C20.7955 14.6868 20.8833 15.2556 20.9918 15.7337C21.046 15.9727 21.1056 16.1887 21.1694 16.3783C21.2011 16.4734 21.2342 16.5617 21.2683 16.6428C21.3364 16.8055 21.4084 16.9399 21.4833 17.0426C21.5956 17.1967 21.7156 17.2798 21.84 17.2798C22.5028 17.2798 23.04 14.9158 23.04 11.9998C23.04 9.08377 22.5028 6.71977 21.84 6.71977Z" />
    </svg>
  );
};

export const IconTwitter: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true">
      <title>{title ? title : 'Twitter'}</title>
      <path d="M8.29 20.2534C15.837 20.2534 19.965 14.0004 19.965 8.5784C19.965 8.4004 19.965 8.2234 19.953 8.0484C20.7562 7.46693 21.4493 6.74701 22 5.9224C21.2511 6.2544 20.4566 6.47216 19.643 6.5684C20.4996 6.05546 21.1408 5.24875 21.447 4.2984C20.6417 4.77628 19.7607 5.11313 18.842 5.2944C18.2234 4.63616 17.405 4.20023 16.5136 4.0541C15.6222 3.90797 14.7075 4.0598 13.9111 4.48607C13.1147 4.91234 12.4811 5.58927 12.1083 6.41206C11.7355 7.23485 11.6444 8.15758 11.849 9.0374C10.2176 8.95564 8.6216 8.53172 7.16465 7.79317C5.70769 7.05461 4.42233 6.01792 3.392 4.7504C2.86732 5.6536 2.70659 6.72282 2.94254 7.74036C3.17848 8.75791 3.79337 9.64728 4.662 10.2274C4.00926 10.2085 3.37065 10.0329 2.8 9.7154V9.7674C2.80039 10.7147 3.1284 11.6327 3.7284 12.3658C4.3284 13.0988 5.16347 13.6018 6.092 13.7894C5.48781 13.9541 4.85389 13.9781 4.239 13.8594C4.50116 14.6749 5.01168 15.388 5.69913 15.899C6.38658 16.41 7.21657 16.6934 8.073 16.7094C7.22212 17.378 6.24779 17.8722 5.20573 18.1639C4.16367 18.4556 3.07432 18.539 2 18.4094C3.8766 19.6137 6.06019 20.2525 8.29 20.2494" />
    </svg>
  );
};

export const IconTwitterX: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true">
      <title>{title ? title : 'X'}</title>
      <path d="M17.7508 3H20.8175L14.1175 10.6583L22 21.0775H15.8283L10.995 14.7575L5.46333 21.0775H2.395L9.56167 12.8858L2 3.00083H8.32833L12.6975 8.7775L17.7508 3ZM16.675 19.2425H18.3742L7.405 4.73917H5.58167L16.675 19.2425Z" />
    </svg>
  );
};

export const IconInstagram: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true">
      <title>{title ? title : 'Instagram'}</title>
      <path
        fillRule="evenodd"
        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
        clipRule="evenodd"></path>
    </svg>
  );
};

export const IconGlassdoor: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true">
      <title>{title ? title : 'Glassdoor'}</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.28525 0.0554922C2.14974 0.0820532 1.87861 0.180462 1.68277 0.27414C0.925415 0.636336 0.436474 1.16628 0.168499 1.91541L0.0186924 2.33427L0.00548576 8.47618C-0.00570044 13.6889 0.00267689 14.6221 0.0609239 14.6445C0.0986712 14.6589 0.714404 14.667 1.42919 14.6623L2.72876 14.6539L2.7397 8.7718C2.74778 4.42461 2.76542 2.8719 2.80736 2.82144C2.85506 2.76393 3.76459 2.75314 8.55642 2.75314H14.2488L14.2173 2.49443C14.172 2.12302 14.0072 1.63225 13.8412 1.37423C13.4034 0.694091 12.6834 0.195935 11.9438 0.0614548C11.5142 -0.0166514 2.68066 -0.0221212 2.28525 0.0554922ZM11.5774 5.38564C11.5442 5.42575 11.5268 7.38989 11.5255 11.2422C11.5246 14.4302 11.5068 17.0844 11.486 17.1406L11.4483 17.2426L5.7443 17.2414C0.70307 17.2403 0.0369746 17.2488 0.0117441 17.3146C-0.0574428 17.4949 0.187964 18.2333 0.513842 18.8251C0.600177 18.982 1.12189 19.4728 1.31181 19.5759C2.13081 20.0205 1.86047 20.0007 7.10542 19.9996C9.60393 19.999 11.7866 19.9786 11.9557 19.9541C12.2554 19.9108 12.5661 19.7828 12.9896 19.5283C13.2063 19.3982 13.7425 18.8868 13.7425 18.8103C13.7425 18.7863 13.7974 18.6835 13.8645 18.582C13.9959 18.3835 14.1435 17.9659 14.2304 17.5466C14.2911 17.2538 14.3006 5.67973 14.2404 5.46345L14.2061 5.34025L12.9168 5.33276C11.9518 5.32719 11.6149 5.34045 11.5774 5.38564Z"
        fill="#64748B"
      />
    </svg>
  );
};

export const IconFacebook: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true">
      <title>{title ? title : 'Facebook'}</title>
      <path
        fillRule="evenodd"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        clipRule="evenodd"></path>
    </svg>
  );
};

export const IconTicket: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      strokeLinecap="round"
      strokeLinejoin="round">
      <title>{title ? title : 'Ticket'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
      />
    </svg>
  );
};

export const IconBriefcase: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Briefcase'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
      />
    </svg>
  );
};

export const IconRole: FC<IconProps> = ({ className, title, strokeWidth }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      strokeLinecap="round"
      strokeLinejoin="round">
      <title>{title ? title : 'Role'}</title>
      <path d="M9.58333 6.25H4.16667C3.59203 6.25 3.04093 6.47827 2.6346 6.8846C2.22827 7.29093 2 7.84203 2 8.41667V18.1667C2 18.7413 2.22827 19.2924 2.6346 19.6987C3.04093 20.1051 3.59203 20.3333 4.16667 20.3333H19.3333C19.908 20.3333 20.4591 20.1051 20.8654 19.6987C21.2717 19.2924 21.5 18.7413 21.5 18.1667V8.41667C21.5 7.84203 21.2717 7.29093 20.8654 6.8846C20.4591 6.47827 19.908 6.25 19.3333 6.25H13.9167M9.58333 6.25V5.16667C9.58333 4.59203 9.81161 4.04093 10.2179 3.6346C10.6243 3.22827 11.1754 3 11.75 3C12.3246 3 12.8757 3.22827 13.2821 3.6346C13.6884 4.04093 13.9167 4.59203 13.9167 5.16667V6.25M9.58333 6.25C9.58333 6.82464 9.81161 7.37574 10.2179 7.78206C10.6243 8.18839 11.1754 8.41667 11.75 8.41667C12.3246 8.41667 12.8757 8.18839 13.2821 7.78206C13.6884 7.37574 13.9167 6.82464 13.9167 6.25M8.5 14.9167C9.91483 14.9167 11.1184 15.8213 11.5658 17.0833M8.5 14.9167C7.82766 14.9165 7.17181 15.1247 6.62274 15.5128C6.07368 15.9008 5.65843 16.4495 5.43417 17.0833M15 11.6667H18.25M15 16H17.1667M8.5 14.9167C9.07464 14.9167 9.62574 14.6884 10.0321 14.2821C10.4384 13.8757 10.6667 13.3246 10.6667 12.75C10.6667 12.1754 10.4384 11.6243 10.0321 11.2179C9.62574 10.8116 9.07464 10.5833 8.5 10.5833C7.92536 10.5833 7.37426 10.8116 6.96794 11.2179C6.56161 11.6243 6.33333 12.1754 6.33333 12.75C6.33333 13.3246 6.56161 13.8757 6.96794 14.2821C7.37426 14.6884 7.92536 14.9167 8.5 14.9167Z" />
    </svg>
  );
};

export const IconGlobe: FC<IconProps> = ({ className, title, strokeWidth }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Website'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
      />
    </svg>
  );
};

export const IconGlobeAmericas: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor">
      <title>{title ? title : 'Public'}</title>
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM6.262 6.072a8.25 8.25 0 1 0 10.562-.766 4.5 4.5 0 0 1-1.318 1.357L14.25 7.5l.165.33a.809.809 0 0 1-1.086 1.085l-.604-.302a1.125 1.125 0 0 0-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 0 1-2.288 4.04l-.723.724a1.125 1.125 0 0 1-1.298.21l-.153-.076a1.125 1.125 0 0 1-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 0 1-.21-1.298L9.75 12l-1.64-1.64a6 6 0 0 1-1.676-3.257l-.172-1.03Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const IconBell: FC<IconProps> = ({ className, title, strokeWidth }) => {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Notification'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
      />
    </svg>
  );
};

export const IconCopy: FC<IconProps> = ({ className, title, strokeWidth }) => {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Copy'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.5 17v3.375c0 .621-.504 1.125-1.125 1.125h-9.25A1.125 1.125 0 0 1 4 20.375V8.625C4 8.004 4.504 7.5 5.125 7.5H7.5a9.06 9.06 0 0 1 1.5.124M15.5 17h3.375c.621 0 1.125-.504 1.125-1.125V12m-4.5 5h-5.375A1.125 1.125 0 0 1 9 15.875V7.624m0 0V4.125C9 3.504 9.504 3 10.125 3M20 13.25V6.912a.995.995 0 0 0-.293-.705l-2.914-2.914A1 1 0 0 0 16.086 3H10.5"
      />
    </svg>
  );
};

export const IconEmail: FC<IconProps> = ({ className, title, strokeWidth }) => {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Email'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  );
};

export const IconCompanies: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      viewBox="0 0 24 24"
      aria-hidden="true">
      <title>{title ? title : 'Companies'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );
};

export const IconCalendarDays: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      viewBox="0 0 24 24"
      aria-hidden="true">
      <title>{title ? title : 'Calendar'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
      />
    </svg>
  );
};

export const IconCalendarAdd: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      viewBox="0 0 24 24"
      aria-hidden="true">
      <title>{title ? title : 'Add to Calendar'}</title>
      <path
        d="M6.75 3V5.25M17.25 3V5.25M3 18.75V7.5C3 6.90326 3.23705 6.33097 3.65901 5.90901C4.08097 5.48705 4.65326 5.25 5.25 5.25H18.75C19.3467 5.25 19.919 5.48705 20.341 5.90901C20.7629 6.33097 21 6.90326 21 7.5V18.75M3 18.75C3 19.3467 3.23705 19.919 3.65901 20.341C4.08097 20.7629 4.65326 21 5.25 21H18.75C19.3467 21 19.919 20.7629 20.341 20.341C20.7629 19.919 21 19.3467 21 18.75M3 18.75V11.25C3 10.6533 3.23705 10.081 3.65901 9.65901C4.08097 9.23705 4.65326 9 5.25 9H18.75C19.3467 9 19.919 9.23705 20.341 9.65901C20.7629 10.081 21 10.6533 21 11.25V18.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 12V18M15 15H9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const IconCalendar: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      viewBox="0 0 24 24"
      aria-hidden="true">
      <title>{title ? title : 'Add to Calendar'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
      />
    </svg>
  );
};

export const IconPlus: FC<IconProps> = ({ className, title, strokeWidth }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}>
      <title>{title ? title : 'Plus'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
};

export const IconPlusSmall: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}>
      <title>{title ? title : 'Add'}</title>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

export const IconChevronLeft: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}>
      <title>{title ? title : 'Left'}</title>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
};

export const IconChevronRight: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}>
      <title>{title ? title : 'Right'}</title>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
};

export const IconChevronDown: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}>
      <title>{title ? title : 'Down'}</title>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
};

export const IconChevronDownMini: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor">
      <title>{title ? title : 'Down'}</title>
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const IconPolygonDown: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor">
      <title>{title ? title : 'Down'}</title>
      <path d="M11.4816 16.0643C11.7594 16.3705 12.2406 16.3705 12.5184 16.0643L17.0004 11.1243C17.4085 10.6745 17.0893 9.95392 16.4819 9.95392H7.51807C6.9107 9.95392 6.59153 10.6745 6.99964 11.1243L11.4816 16.0643Z" />
    </svg>
  );
};

export const IconChevronUp: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}>
      <title>{title ? title : 'Down'}</title>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
  );
};

export const IconHome: FC<IconProps> = ({ className, title, strokeWidth }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}>
      <title>{title ? title : 'Home'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
};

export const IconDashboard: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg">
      <title>{title ? title : 'Dashboard'}</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.81818 14C3.81818 9.48364 7.48182 5.81818 12 5.81818C16.5182 5.81818 20.1818 9.48364 20.1818 14C20.1818 14.9573 19.8818 16.1636 19.3373 17.1091C18.7855 18.0673 18.1255 18.5364 17.4718 18.5455C17.0318 18.5236 16.7082 18.3336 16.1045 17.9818C15.9736 17.9055 15.83 17.8218 15.67 17.7309C14.8064 17.24 13.7 16.7273 12 16.7273C10.3 16.7273 9.19364 17.2391 8.33 17.7309C8.17 17.8218 8.02636 17.9055 7.89545 17.9818C7.29182 18.3336 6.96818 18.5236 6.52818 18.5455C5.87364 18.5364 5.21455 18.0673 4.66273 17.1091C4.11818 16.1636 3.81818 14.9573 3.81818 14ZM12 4C6.47727 4 2 8.48 2 14C2 15.2709 2.38182 16.7909 3.08727 18.0164C3.78091 19.2209 4.93182 20.3636 6.54545 20.3636H6.58182C7.52818 20.3255 8.30546 19.8609 8.92 19.4927C9.02818 19.4291 9.13091 19.3664 9.22909 19.3109C9.93455 18.91 10.7264 18.5455 12 18.5455C13.2736 18.5455 14.0655 18.9091 14.7709 19.3109C14.8691 19.3664 14.9709 19.4291 15.08 19.4927C15.6945 19.86 16.4709 20.3255 17.4182 20.3627L17.4364 20.3636H17.4545C19.0682 20.3636 20.2191 19.2209 20.9127 18.0164C21.6182 16.7918 22 15.2709 22 14C22 8.48 17.5227 4 12 4ZM16.5 10.7855C16.5868 10.7016 16.6561 10.6013 16.7037 10.4904C16.7514 10.3795 16.7765 10.2602 16.7775 10.1395C16.7786 10.0187 16.7555 9.89904 16.7098 9.78731C16.6641 9.67559 16.5966 9.57409 16.5113 9.48873C16.4259 9.40337 16.3244 9.33587 16.2127 9.29016C16.101 9.24445 15.9813 9.22145 15.8605 9.2225C15.7398 9.22355 15.6205 9.24863 15.5096 9.29627C15.3987 9.34392 15.2984 9.41317 15.2145 9.5L12.4709 12.2436C12.0843 12.14 11.6743 12.1669 11.3045 12.32C10.9347 12.4731 10.6258 12.744 10.4256 13.0907C10.2255 13.4373 10.1453 13.8403 10.1975 14.2371C10.2498 14.6339 10.4315 15.0024 10.7145 15.2855C10.9976 15.5685 11.3661 15.7502 11.7629 15.8025C12.1597 15.8547 12.5627 15.7745 12.9093 15.5744C13.256 15.3742 13.5269 15.0653 13.68 14.6955C13.8331 14.3257 13.86 13.9157 13.7564 13.5291L16.5 10.7855ZM5.63636 14.9091C5.87747 14.9091 6.1087 14.8133 6.27919 14.6428C6.44968 14.4723 6.54545 14.2411 6.54545 14C6.54545 13.7589 6.44968 13.5277 6.27919 13.3572C6.1087 13.1867 5.87747 13.0909 5.63636 13.0909C5.39526 13.0909 5.16403 13.1867 4.99354 13.3572C4.82305 13.5277 4.72727 13.7589 4.72727 14C4.72727 14.2411 4.82305 14.4723 4.99354 14.6428C5.16403 14.8133 5.39526 14.9091 5.63636 14.9091ZM19.2727 14C19.2727 14.2411 19.177 14.4723 19.0065 14.6428C18.836 14.8133 18.6047 14.9091 18.3636 14.9091C18.1225 14.9091 17.8913 14.8133 17.7208 14.6428C17.5503 14.4723 17.4545 14.2411 17.4545 14C17.4545 13.7589 17.5503 13.5277 17.7208 13.3572C17.8913 13.1867 18.1225 13.0909 18.3636 13.0909C18.6047 13.0909 18.836 13.1867 19.0065 13.3572C19.177 13.5277 19.2727 13.7589 19.2727 14ZM12 8.54545C12.2411 8.54545 12.4723 8.44968 12.6428 8.27919C12.8133 8.1087 12.9091 7.87747 12.9091 7.63636C12.9091 7.39526 12.8133 7.16403 12.6428 6.99354C12.4723 6.82305 12.2411 6.72727 12 6.72727C11.7589 6.72727 11.5277 6.82305 11.3572 6.99354C11.1867 7.16403 11.0909 7.39526 11.0909 7.63636C11.0909 7.87747 11.1867 8.1087 11.3572 8.27919C11.5277 8.44968 11.7589 8.54545 12 8.54545Z"
      />
    </svg>
  );
};

export const IconSettings: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg">
      <title>{title ? title : 'Settings'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
};

export const IconOrganization: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg">
      <title>{title ? title : 'Settings'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
      />
    </svg>
  );
};

export const IconSignOut: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg">
      <title>{title ? title : 'Sign out'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
      />
    </svg>
  );
};

export const IconX: FC<IconProps> = ({ className, title, strokeWidth }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={strokeWidth ? strokeWidth : 2}>
      <title>{title ? title : 'Close'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

export const IconBars3: FC<IconProps> = ({ className, title, strokeWidth }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={strokeWidth ? strokeWidth : 2}>
      <title>{title ? title : 'Menu'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
};

export const IconLocation: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Location'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  );
};

export const IconEditPencilOLD: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor">
      <title>{title ? title : 'Edit'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
      />
    </svg>
  );
};

export const IconEditPencil: FC<IconProps> = ({
  className,
  strokeWidth,
  title,
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Edit'}</title>
      <path
        d="M13.6765 5.62489L16.0706 3.22978C16.7928 2.50756 17.41 1.9173 19.4297 3.93689C21.4493 5.95648 20.859 6.57377 20.1368 7.296L7.8891 19.5437C7.36043 20.072 6.70847 20.4604 5.99211 20.6737L2.6 20.7666L2.69289 17.3745C2.90617 16.6581 3.29453 16.0061 3.82289 15.4775L13.6775 5.62489H13.6765ZM13.6765 5.62489L17.7287 9.6771"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const IconPencilSquare: FC<IconProps> = ({
  className,
  strokeWidth,
  title,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Edit'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
  );
};

export const IconSortDown: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor">
      <title>{title ? title : 'Sort'}</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.4917 5.90055C7.4917 5.66171 7.39682 5.43265 7.22793 5.26377C7.05905 5.09488 6.82999 5 6.59115 5C6.35231 5 6.12325 5.09488 5.95436 5.26377C5.78547 5.43265 5.69059 5.66171 5.69059 5.90055V16.3344L4.52618 15.1699C4.35633 15.0059 4.12885 14.9151 3.89273 14.9172C3.65661 14.9192 3.43074 15.0139 3.26377 15.1809C3.0968 15.3479 3.00209 15.5738 3.00003 15.8099C2.99798 16.046 3.08875 16.2735 3.2528 16.4433L5.95446 19.145C6.12333 19.3138 6.35235 19.4087 6.59115 19.4087C6.82994 19.4087 7.05896 19.3138 7.22784 19.145L9.9295 16.4433C10.0935 16.2735 10.1843 16.046 10.1823 15.8099C10.1802 15.5738 10.0855 15.3479 9.91853 15.1809C9.75156 15.0139 9.52569 14.9192 9.28957 14.9172C9.05344 14.9151 8.82596 15.0059 8.65612 15.1699L7.4917 16.3344V5.90055ZM12.895 6.80111C12.6562 6.80111 12.4271 6.89599 12.2582 7.06487C12.0893 7.23376 11.9945 7.46282 11.9945 7.70166C11.9945 7.9405 12.0893 8.16956 12.2582 8.33845C12.4271 8.50733 12.6562 8.60221 12.895 8.60221H20.0994C20.3383 8.60221 20.5673 8.50733 20.7362 8.33845C20.9051 8.16956 21 7.9405 21 7.70166C21 7.46282 20.9051 7.23376 20.7362 7.06487C20.5673 6.89599 20.3383 6.80111 20.0994 6.80111H12.895ZM12.895 11.3039C12.6562 11.3039 12.4271 11.3988 12.2582 11.5676C12.0893 11.7365 11.9945 11.9656 11.9945 12.2044C11.9945 12.4433 12.0893 12.6723 12.2582 12.8412C12.4271 13.0101 12.6562 13.105 12.895 13.105H16.4972C16.7361 13.105 16.9651 13.0101 17.134 12.8412C17.3029 12.6723 17.3978 12.4433 17.3978 12.2044C17.3978 11.9656 17.3029 11.7365 17.134 11.5676C16.9651 11.3988 16.7361 11.3039 16.4972 11.3039H12.895ZM12.895 15.8066C12.6562 15.8066 12.4271 15.9015 12.2582 16.0704C12.0893 16.2393 11.9945 16.4684 11.9945 16.7072C11.9945 16.946 12.0893 17.1751 12.2582 17.344C12.4271 17.5129 12.6562 17.6077 12.895 17.6077H13.7956C14.0344 17.6077 14.2635 17.5129 14.4324 17.344C14.6012 17.1751 14.6961 16.946 14.6961 16.7072C14.6961 16.4684 14.6012 16.2393 14.4324 16.0704C14.2635 15.9015 14.0344 15.8066 13.7956 15.8066H12.895Z"
      />
    </svg>
  );
};

export const IconSortUp: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor">
      <title>{title ? title : 'Sort'}</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.8951 6.80108C12.6562 6.80108 12.4272 6.89596 12.2583 7.06484C12.0894 7.23373 11.9945 7.46279 11.9945 7.70163C11.9945 7.94047 12.0894 8.16953 12.2583 8.33842C12.4272 8.5073 12.6562 8.60218 12.8951 8.60218H20.0995C20.3383 8.60218 20.5674 8.5073 20.7363 8.33842C20.9052 8.16953 21 7.94047 21 7.70163C21 7.46279 20.9052 7.23373 20.7363 7.06484C20.5674 6.89596 20.3383 6.80108 20.0995 6.80108H12.8951ZM12.8951 11.3038C12.6562 11.3038 12.4272 11.3987 12.2583 11.5676C12.0894 11.7365 11.9945 11.9656 11.9945 12.2044C11.9945 12.4432 12.0894 12.6723 12.2583 12.8412C12.4272 13.0101 12.6562 13.1049 12.8951 13.1049H16.4973C16.7361 13.1049 16.9652 13.0101 17.1341 12.8412C17.303 12.6723 17.3978 12.4432 17.3978 12.2044C17.3978 11.9656 17.303 11.7365 17.1341 11.5676C16.9652 11.3987 16.7361 11.3038 16.4973 11.3038H12.8951ZM12.8951 15.8066C12.6562 15.8066 12.4272 15.9015 12.2583 16.0704C12.0894 16.2393 11.9945 16.4683 11.9945 16.7072C11.9945 16.946 12.0894 17.1751 12.2583 17.344C12.4272 17.5128 12.6562 17.6077 12.8951 17.6077H13.7956C14.0345 17.6077 14.2635 17.5128 14.4324 17.344C14.6013 17.1751 14.6962 16.946 14.6962 16.7072C14.6962 16.4683 14.6013 16.2393 14.4324 16.0704C14.2635 15.9015 14.0345 15.8066 13.7956 15.8066H12.8951Z"
      />
      <path d="M5.95436 19.1449C5.78547 18.976 5.69059 18.7469 5.69059 18.5081L5.69059 8.0743L4.52618 9.23871C4.35633 9.40275 4.12885 9.49353 3.89273 9.49147C3.65661 9.48942 3.43074 9.39471 3.26377 9.22774C3.0968 9.06077 3.00209 8.8349 3.00003 8.59878C2.99798 8.36266 3.08875 8.13518 3.2528 7.96533L5.95446 5.26367C6.12333 5.09484 6.35235 5 6.59115 5C6.82994 5 7.05896 5.09484 7.22784 5.26367L9.9295 7.96533C10.0935 8.13518 10.1843 8.36266 10.1823 8.59878C10.1802 8.8349 10.0855 9.06077 9.91853 9.22774C9.75156 9.39471 9.52569 9.48942 9.28957 9.49147C9.05344 9.49353 8.82596 9.40275 8.65612 9.23871L7.4917 8.0743L7.4917 18.5081C7.4917 18.7469 7.39682 18.976 7.22793 19.1449C7.05905 19.3138 6.82999 19.4087 6.59115 19.4087C6.3523 19.4087 6.12325 19.3138 5.95436 19.1449Z" />
    </svg>
  );
};

export const IconSave: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24">
      <title>{title ? title : 'Save'}</title>
      <path
        d="M20.4258 6.5H16.4258V10.5H14.4258V6.5H10.4258V4.5H14.4258V0.5H16.4258V4.5H20.4258V6.5ZM12.4258 0.5H0.425781V1.5H12.4258V0.5ZM0.425781 5.5H8.42578V4.5H0.425781V5.5ZM0.425781 9.5H8.42578V8.5H0.425781V9.5Z"
        fill="#475569"
      />
    </svg>
  );
};

export const IconListPlus: FC<IconProps> = ({
  className,
  strokeWidth,
  title,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Save To List'}</title>
      <path d="M17.9255 8V17M13.4255 12.5H22.4255" />
      <line x1="2.42554" y1="16" x2="11.4255" y2="16" />
      <line x1="2.42554" y1="11" x2="11.4255" y2="11" />
      <line x1="2.42554" y1="6" x2="22.4255" y2="6" />
    </svg>
  );
};

export const IconListSaved: FC<IconProps> = ({
  className,
  strokeWidth,
  title,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Save To List'}</title>
      <path d="M13.2,13.9l3.1,2.5L21,10" />
      <line x1="2.42554" y1="16" x2="11.4255" y2="16" />
      <line x1="2.42554" y1="11" x2="11.4255" y2="11" />
      <line x1="2.42554" y1="6" x2="22.4255" y2="6" />
    </svg>
  );
};

export const IconColumns: FC<IconProps> = ({
  className,
  strokeWidth,
  title,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'columns'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z"
      />
    </svg>
  );
};

export const IconTable: FC<IconProps> = ({ className, strokeWidth, title }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Table'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
      />
    </svg>
  );
};

export const IconShare: FC<IconProps> = ({ className, strokeWidth, title }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Share'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
      />
    </svg>
  );
};

export const IconShareAlt: FC<IconProps> = ({
  className,
  strokeWidth,
  title,
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Share'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
      />
    </svg>
  );
};

export const IconShare3: FC<IconProps> = ({
  className,
  strokeWidth,
  title,
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Share'}</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.2168 4.04597C14.3539 4.10807 21.3188 10.8489 21.4265 11.0237C21.5126 11.1635 21.5243 11.3768 21.4549 11.544C21.3975 11.6827 14.4554 18.4446 14.2582 18.554C14.004 18.695 13.6881 18.6074 13.4908 18.3412C13.4127 18.2358 13.4107 18.192 13.4003 16.3989L13.3897 14.5644L12.2354 14.5833C10.8496 14.606 10.3708 14.6707 9.3053 14.9793C7.67964 15.4501 6.2276 16.297 4.99417 17.4937C4.28171 18.1849 3.76429 18.8378 3.27139 19.6677C3.05526 20.0315 2.99599 20.1033 2.8509 20.1771C2.75798 20.2244 2.63771 20.2631 2.5836 20.2631C2.42208 20.2631 2.15322 20.1035 2.06961 19.958C2.00213 19.8406 1.99426 19.7662 2.00282 19.3279C2.02092 18.3999 2.17625 17.3947 2.44687 16.4546C2.8517 15.0481 3.59353 13.616 4.52968 12.4338C4.93241 11.9252 5.8453 11.0129 6.35967 10.605C8.12171 9.20748 10.1596 8.37215 12.3797 8.13735C12.6738 8.10626 13.0213 8.08064 13.152 8.08041L13.3897 8.07999L13.4003 6.23045C13.4106 4.43056 13.413 4.37812 13.4896 4.2755C13.6733 4.02955 13.9722 3.93522 14.2168 4.04597Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const IconFindCompanies: FC<IconProps> = ({
  className,
  strokeWidth,
  title,
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={strokeWidth ? strokeWidth : 2}
      stroke="currentColor">
      <title>{title ? title : 'Find Companies'}</title>
      <path
        d="M19 21V5C19 4.46957 18.7893 3.96086 18.4142 3.58579C18.0391 3.21071 17.5304 3 17 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V21M19 21H5M19 21H21M19 21H14M5 21H3M5 21H10M14 21V16C14 15.7348 13.8946 15.4804 13.7071 15.2929C13.5196 15.1054 13.2652 15 13 15H11C10.7348 15 10.4804 15.1054 10.2929 15.2929C10.1054 15.4804 10 15.7348 10 16V21M14 21H10M9 7H10M9 11H10M14 7H15M14 11H15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const IconFindInvestors: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <title>{title ? title : 'Find Investors'}</title>
      <path d="M6 19V20V19ZM18 19V20V19ZM21 16H22H21ZM21 8H22H21ZM3 8H2H3ZM3 16H2H3ZM13 15.75C13 15.1977 12.5523 14.75 12 14.75C11.4477 14.75 11 15.1977 11 15.75H13ZM11 16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16H11ZM12.5 11.9998L12.7425 11.0296L12.7194 11.0239L12.6961 11.0192L12.5 11.9998ZM13 7.75C13 7.19772 12.5523 6.75 12 6.75C11.4477 6.75 11 7.19772 11 7.75H13ZM11 8C11 8.55228 11.4477 9 12 9C12.5523 9 13 8.55228 13 8H11ZM6 20H18V18H6V20ZM18 20C19.0609 20 20.0783 19.5786 20.8284 18.8284L19.4142 17.4142C19.0391 17.7893 18.5304 18 18 18V20ZM20.8284 18.8284C21.5786 18.0783 22 17.0609 22 16H20C20 16.5304 19.7893 17.0391 19.4142 17.4142L20.8284 18.8284ZM22 16V8H20V16H22ZM22 8C22 6.93913 21.5786 5.92172 20.8284 5.17157L19.4142 6.58579C19.7893 6.96086 20 7.46957 20 8H22ZM20.8284 5.17157C20.0783 4.42143 19.0609 4 18 4V6C18.5304 6 19.0391 6.21071 19.4142 6.58579L20.8284 5.17157ZM18 4H6V6H18V4ZM6 4C4.93913 4 3.92172 4.42143 3.17157 5.17157L4.58579 6.58579C4.96086 6.21071 5.46957 6 6 6V4ZM3.17157 5.17157C2.42143 5.92172 2 6.93913 2 8H4C4 7.46957 4.21071 6.96086 4.58579 6.58579L3.17157 5.17157ZM2 8V16H4V8H2ZM2 16C2 17.0609 2.42143 18.0783 3.17157 18.8284L4.58579 17.4142C4.21071 17.0391 4 16.5304 4 16H2ZM3.17157 18.8284C3.92172 19.5786 4.93913 20 6 20V18C5.46957 18 4.96086 17.7893 4.58579 17.4142L3.17157 18.8284ZM11 15.75V16H13V15.75H11ZM12.2575 12.97C13.0809 13.1757 13.3041 13.4994 13.3499 13.6099C13.3833 13.6902 13.3937 13.8167 13.2304 13.9801C12.9215 14.2889 11.6553 14.7982 9.61394 13.2104L8.38606 14.7892C10.8447 16.7014 13.3285 16.7105 14.6446 15.3943C15.2938 14.7451 15.5854 13.7779 15.1969 12.8426C14.8209 11.9375 13.9191 11.3237 12.7425 11.0296L12.2575 12.97ZM15.5548 8.66786C13.0967 7.02887 10.5557 7.1624 9.40115 8.63191C8.79577 9.40247 8.71799 10.4425 9.3222 11.3288C9.88137 12.1489 10.9259 12.7048 12.3039 12.9804L12.6961 11.0192C11.5741 10.7949 11.1186 10.4133 10.9747 10.2021C10.8758 10.057 10.8917 9.97201 10.9738 9.86749C11.1943 9.58684 12.4033 8.9703 14.4452 10.3319L15.5548 8.66786ZM11 7.75V8H13V7.75H11Z" />
    </svg>
  );
};

export const IconFollowing: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <title>{title ? title : 'Following'}</title>
      <path
        d="M9 12.75L11.25 15L15 9.75M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
        stroke="#64748B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const IconAcquired: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <title>{title ? title : 'Acquired'}</title>
      <path
        d="M21 7.42105H21.75V6.67105H21V7.42105ZM21 13.1053L21.206 13.8264L21.75 13.671V13.1053H21ZM7.26316 11.2105L6.79464 10.6249C6.58625 10.7916 6.48214 11.0565 6.52126 11.3205C6.56038 11.5845 6.73683 11.8078 6.98461 11.9069L7.26316 11.2105ZM12.4737 10.2632L13.0737 9.81316C12.9503 9.64869 12.7649 9.54207 12.5607 9.51822C12.3565 9.49437 12.1515 9.55538 11.9935 9.68699L12.4737 10.2632ZM10.5789 19.2632L10.1814 18.6272L10.1814 18.6272L10.5789 19.2632ZM4.42105 13.5789L4.9905 13.0909L4.92316 13.0123L4.83708 12.9549L4.42105 13.5789ZM3 12.6316H2.25V13.033L2.58397 13.2556L3 12.6316ZM3 7.42105L3.10607 6.67859L2.25 6.5563V7.42105H3ZM7.73684 6.47368L7.40143 5.80286L7.29257 5.85729L7.20651 5.94335L7.73684 6.47368ZM12 18.3825L12.3929 19.0214L12 18.3825ZM14.1355 17.0893L14.5174 17.7347L14.5174 17.7347L14.1355 17.0893ZM20.25 7.42105V13.1053H21.75V7.42105H20.25ZM20.794 12.3841C20.2243 12.5469 19.3049 12.8373 18.3797 13.1847C17.4711 13.5259 16.4928 13.9455 15.8471 14.376L16.6792 15.624C17.1704 15.2966 18.0078 14.9267 18.9071 14.589C19.7898 14.2575 20.6704 13.9794 21.206 13.8264L20.794 12.3841ZM21 6.67105C19.4782 6.67105 18.6325 6.35313 17.7851 6.01417C16.8894 5.65587 15.9446 5.25 14.3684 5.25V6.75C15.6344 6.75 16.3475 7.05465 17.228 7.40688C18.1569 7.77844 19.206 8.17105 21 8.17105V6.67105ZM6.98461 11.9069C7.2648 12.019 8.05459 12.4693 9.08125 12.4932C10.157 12.5182 11.433 12.1067 12.9538 10.8393L11.9935 9.68699C10.6723 10.788 9.73776 11.0081 9.11612 10.9936C8.44541 10.978 8.05099 10.7179 7.5417 10.5142L6.98461 11.9069ZM11.8737 10.7132C13.0155 12.2356 13.3045 12.6207 15.2038 14.9948L16.3751 14.0578C14.4849 11.6951 14.2055 11.3223 13.0737 9.81316L11.8737 10.7132ZM15.2038 14.9948C15.2994 15.1143 15.3539 15.2698 15.3457 15.3786C15.3425 15.4214 15.33 15.4648 15.2932 15.5152C15.2539 15.5691 15.1675 15.6566 14.9804 15.7502L15.6512 17.0919C16.3903 16.7223 16.792 16.1481 16.8415 15.4912C16.886 14.8992 16.6326 14.3797 16.3751 14.0578L15.2038 14.9948ZM10.1814 18.6272C10.0316 18.7208 10.0096 18.7135 10.047 18.7075C10.1328 18.6937 10.1976 18.7263 10.1906 18.7221C10.1513 18.6992 10.0679 18.6354 9.88959 18.4625C9.71433 18.2927 9.5127 18.0836 9.21454 17.7855L8.15388 18.8461C8.42414 19.1164 8.66157 19.3612 8.84566 19.5396C9.02665 19.7151 9.2229 19.8939 9.43324 20.0169C9.67575 20.1588 9.96011 20.2407 10.285 20.1885C10.5616 20.144 10.7983 20.0105 10.9764 19.8992L10.1814 18.6272ZM9.21454 17.7855C8.10149 16.6724 5.94109 14.1999 4.9905 13.0909L3.85161 14.067C4.79576 15.1685 6.99325 17.6855 8.15388 18.8461L9.21454 17.7855ZM4.83708 12.9549L3.41603 12.0075L2.58397 13.2556L4.00503 14.203L4.83708 12.9549ZM3.75 12.6316V7.42105H2.25V12.6316H3.75ZM2.89393 8.16351C3.50237 8.25043 4.47048 8.3011 5.4508 8.17695C6.40485 8.05613 7.51939 7.75179 8.26717 7.00401L7.20651 5.94335C6.81745 6.33242 6.11621 6.58071 5.26235 6.68884C4.43478 6.79364 3.6029 6.74957 3.10607 6.67859L2.89393 8.16351ZM14.3684 5.25C13.3742 5.25 12.408 5.73909 11.5591 6.33274L12.4187 7.562C13.1911 7.0219 13.8425 6.75 14.3684 6.75V5.25ZM11.5591 6.33274C10.6457 6.97148 9.74699 7.81944 8.94127 8.60617C8.11203 9.41587 7.40004 10.1405 6.79464 10.6249L7.73168 11.7962C8.41297 11.2511 9.20613 10.444 9.98922 9.6794C10.7958 8.89179 11.6167 8.12285 12.4187 7.562L11.5591 6.33274ZM8.07225 7.1445C8.83116 6.76505 9.58786 6.76107 10.2221 6.90822C10.8811 7.06114 11.3388 7.36074 11.4647 7.48381L12.513 6.41093C12.1542 6.06032 11.4332 5.64939 10.5611 5.44704C9.66419 5.23893 8.53727 5.23495 7.40143 5.80286L8.07225 7.1445ZM11.6071 17.7437C11.0633 18.0781 10.5582 18.3917 10.1814 18.6272L10.9764 19.8992C11.3502 19.6656 11.8522 19.3539 12.3929 19.0214L11.6071 17.7437ZM12.6037 17.9375L9.76163 14.0813L8.55416 14.9713L11.3963 18.8275L12.6037 17.9375ZM14.9804 15.7502C14.716 15.8824 14.2654 16.141 13.7536 16.4438L14.5174 17.7347C15.0362 17.4278 15.4419 17.1965 15.6512 17.0919L14.9804 15.7502ZM13.7536 16.4438C13.1047 16.8277 12.3211 17.3046 11.6071 17.7437L12.3929 19.0214C13.1039 18.5841 13.8793 18.1123 14.5174 17.7347L13.7536 16.4438ZM14.7287 16.6303L11.6458 12.6463L10.4595 13.5643L13.5424 17.5483L14.7287 16.6303Z"
        fill="#64748B"
      />
    </svg>
  );
};

export const IconTrending: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor"
      className={className}>
      <title>{title ? title : 'Trending'}</title>
      <path
        d="M2.25 18.0001L9 11.2501L13.306 15.5571C14.5507 13.1029 16.6044 11.1535 19.12 10.0381L21.86 8.81809M21.86 8.81809L15.92 6.53809M21.86 8.81809L19.58 14.7591"
        //	stroke="#64748B"
        //strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const IconSparkles: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor"
      className={className}>
      <title>{title ? title : 'Sparkles'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
      />
    </svg>
  );
};

export const IconContributor: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor"
      className={className}>
      <title>{title ? title : 'Contributor'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.25692 17.6041L8.42308 20.5231L7.58923 17.6041C7.37372 16.8501 6.96964 16.1634 6.41514 15.6089C5.86063 15.0544 5.17399 14.6504 4.42 14.4348L1.5 13.6L4.41897 12.7661C5.17296 12.5506 5.85961 12.1465 6.41411 11.592C6.96862 11.0375 7.37269 10.3509 7.58821 9.5969L8.42308 6.6769L9.25692 9.59587C9.47244 10.3499 9.87651 11.0365 10.431 11.591C10.9855 12.1455 11.6722 12.5496 12.4262 12.7651L15.3462 13.6L12.4272 14.4338C11.6732 14.6493 10.9865 15.0534 10.432 15.6079C9.87754 16.1624 9.47346 16.8491 9.25795 17.6031L9.25692 17.6041ZM17.9195 10.2307L17.6538 11.2923L17.3882 10.2307C17.2362 9.62212 16.9216 9.06625 16.4781 8.62257C16.0346 8.17889 15.4788 7.86407 14.8703 7.71177L13.8077 7.44613L14.8703 7.18049C15.4788 7.02819 16.0346 6.71337 16.4781 6.26969C16.9216 5.82601 17.2362 5.27014 17.3882 4.66151L17.6538 3.59998L17.9195 4.66151C18.0716 5.27027 18.3864 5.82622 18.8301 6.26991C19.2738 6.71361 19.8297 7.02835 20.4385 7.18049L21.5 7.44613L20.4385 7.71177C19.8297 7.86391 19.2738 8.17865 18.8301 8.62235C18.3864 9.06604 18.0716 9.62199 17.9195 10.2307Z"
      />
    </svg>
  );
};

export const IconContract: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor"
      className={className}>
      <title>{title ? title : 'Contract'}</title>
      <path
        d="M20 14.25V11.625C20 10.7299 19.6444 9.87145 19.0115 9.23851C18.3786 8.60558 17.5201 8.25 16.625 8.25H15.125C14.8266 8.25 14.5405 8.13147 14.3295 7.9205C14.1185 7.70952 14 7.42337 14 7.125V5.625C14 4.72989 13.6444 3.87145 13.0115 3.23851C12.3785 2.60558 11.5201 2.25 10.625 2.25H8.75M10 21C17.875 14 11 26.5 19.0115 18.5M5 6.5V3.375C5 2.754 5.504 2.25 6.125 2.25H11C13.3869 2.25 15.6761 3.19821 17.364 4.88604C19.0518 6.57387 20 8.86305 20 11.25V15.9375M5 10.625C5 10.625 5 9.125 6.25 9.125C7.5 9.125 7.5 10.625 7.5 10.625V18.625L6.25 21.3656L5 18.625V10.625Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const IconContributorSolid: FC<IconProps> = ({ className, title }) => {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <title>{title ? title : 'Contributor'}</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.49946 6C8.66242 6.00003 8.82094 6.05315 8.95103 6.1513C9.08112 6.24945 9.1757 6.3873 9.22046 6.544L10.0335 9.39C10.2085 10.0029 10.5369 10.5611 10.9876 11.0118C11.4384 11.4626 11.9965 11.791 12.6095 11.966L15.4555 12.779C15.6121 12.8239 15.7498 12.9185 15.8478 13.0486C15.9459 13.1786 15.9989 13.3371 15.9989 13.5C15.9989 13.6629 15.9459 13.8214 15.8478 13.9514C15.7498 14.0815 15.6121 14.1761 15.4555 14.221L12.6095 15.034C11.9965 15.209 11.4384 15.5374 10.9876 15.9882C10.5369 16.4389 10.2085 16.9971 10.0335 17.61L9.22046 20.456C9.1756 20.6126 9.08098 20.7503 8.9509 20.8484C8.82082 20.9464 8.66235 20.9995 8.49946 20.9995C8.33657 20.9995 8.1781 20.9464 8.04802 20.8484C7.91794 20.7503 7.82332 20.6126 7.77846 20.456L6.96546 17.61C6.79041 16.9971 6.46201 16.4389 6.01129 15.9882C5.56056 15.5374 5.00238 15.209 4.38946 15.034L1.54346 14.221C1.38686 14.1761 1.24913 14.0815 1.15108 13.9514C1.05303 13.8214 1 13.6629 1 13.5C1 13.3371 1.05303 13.1786 1.15108 13.0486C1.24913 12.9185 1.38686 12.8239 1.54346 12.779L4.38946 11.966C5.00238 11.791 5.56056 11.4626 6.01129 11.0118C6.46201 10.5611 6.79041 10.0029 6.96546 9.39L7.77846 6.544C7.82322 6.3873 7.9178 6.24945 8.04789 6.1513C8.17798 6.05315 8.3365 6.00003 8.49946 6ZM17.4995 3C17.6668 2.99991 17.8293 3.05576 17.9612 3.15869C18.0931 3.26161 18.1869 3.40569 18.2275 3.568L18.4855 4.604C18.7215 5.544 19.4555 6.278 20.3955 6.514L21.4315 6.772C21.5941 6.81228 21.7385 6.90586 21.8418 7.0378C21.945 7.16974 22.0011 7.33246 22.0011 7.5C22.0011 7.66754 21.945 7.83026 21.8418 7.9622C21.7385 8.09414 21.5941 8.18772 21.4315 8.228L20.3955 8.486C19.4555 8.722 18.7215 9.456 18.4855 10.396L18.2275 11.432C18.1872 11.5946 18.0936 11.7391 17.9617 11.8423C17.8297 11.9456 17.667 12.0017 17.4995 12.0017C17.3319 12.0017 17.1692 11.9456 17.0373 11.8423C16.9053 11.7391 16.8117 11.5946 16.7715 11.432L16.5135 10.396C16.3981 9.93443 16.1594 9.5129 15.823 9.17648C15.4866 8.84005 15.065 8.60139 14.6035 8.486L13.5675 8.228C13.4048 8.18772 13.2604 8.09414 13.1571 7.9622C13.0539 7.83026 12.9978 7.66754 12.9978 7.5C12.9978 7.33246 13.0539 7.16974 13.1571 7.0378C13.2604 6.90586 13.4048 6.81228 13.5675 6.772L14.6035 6.514C15.065 6.39861 15.4866 6.15995 15.823 5.82352C16.1594 5.4871 16.3981 5.06557 16.5135 4.604L16.7715 3.568C16.8121 3.40569 16.9058 3.26161 17.0377 3.15869C17.1696 3.05576 17.3321 2.99991 17.4995 3Z"
      />
    </svg>
  );
};

export const IconDead: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <title>{title ? title : 'Dead'}</title>
      <mask
        id="path-1-outside-1_5067_11599"
        maskUnits="userSpaceOnUse"
        x="2.69519"
        y="1.71924"
        width="18"
        height="21"
        fill="black">
        <rect fill="white" x="2.69519" y="1.71924" width="18" height="21" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.7926 3.78307C14.3625 4.02429 15.6316 4.673 16.7056 5.78321C17.8449 6.9609 18.4724 8.45019 18.5777 10.2262C18.6141 10.8393 18.5656 11.2806 18.3024 12.7304C18.1184 13.7438 18.1087 13.8418 18.1433 14.3373C18.2107 15.3007 18.1983 15.5084 18.0571 15.7816C17.9067 16.0724 17.4921 16.5394 17.2826 16.6539C17.161 16.7203 16.9515 16.7397 16.1396 16.7594C15.1973 16.7824 15.1401 16.7891 15.0405 16.8887C14.9432 16.9861 14.9275 17.0958 14.825 18.3997C14.7642 19.1729 14.7137 19.81 14.7129 19.8156C14.7099 19.8348 14.0969 20.0153 13.9249 20.0476L13.752 20.0801V19.5253C13.752 19.2152 13.7281 18.9182 13.6978 18.8517C13.5869 18.6083 13.2065 18.5867 13.0834 18.8167C13.0547 18.8703 13.0325 19.1941 13.0325 19.5574C13.0325 20.068 13.0184 20.2084 12.965 20.2289C12.9279 20.2431 12.6905 20.27 12.4374 20.2886L11.9772 20.3223V19.684C11.9772 18.9558 11.9428 18.8702 11.6498 18.8702C11.3375 18.8702 11.3057 18.9448 11.3057 19.6756V20.3223L10.8455 20.2886C10.5924 20.27 10.3549 20.2431 10.3179 20.2289C10.2645 20.2084 10.2504 20.0681 10.2504 19.5584C10.2504 18.938 10.246 18.9094 10.1326 18.7961C9.99145 18.6549 9.82213 18.6453 9.6681 18.7699C9.56162 18.856 9.55389 18.898 9.53883 19.47L9.52286 20.0785L9.36202 20.0484C9.1987 20.0177 8.60975 19.8338 8.57829 19.8036C8.56884 19.7946 8.51329 19.1589 8.45487 18.3911C8.35596 17.0911 8.34138 16.9878 8.243 16.8894C8.1426 16.7889 8.08753 16.7824 7.14325 16.7594C6.3314 16.7397 6.12188 16.7203 6.00028 16.6539C5.79081 16.5394 5.37618 16.0724 5.2258 15.7816C5.08459 15.5084 5.07216 15.3007 5.13956 14.3373C5.17419 13.8418 5.1645 13.7438 4.9805 12.7304C4.71346 11.2593 4.66876 10.8437 4.70713 10.1881C4.80902 8.44947 5.4407 6.95802 6.56937 5.79131C7.63741 4.6873 8.92058 4.02578 10.4662 3.78244C11.0031 3.69788 12.2404 3.69826 12.7926 3.78307Z"
        />
      </mask>
      <path
        d="M12.7926 3.78307L13.0205 2.30047L13.0203 2.30045L12.7926 3.78307ZM16.7056 5.78321L17.7838 4.7403L17.7837 4.74028L16.7056 5.78321ZM18.5777 10.2262L20.0751 10.1374L20.0751 10.1374L18.5777 10.2262ZM18.3024 12.7304L19.7782 12.9983L19.7782 12.9983L18.3024 12.7304ZM18.1433 14.3373L16.647 14.4419L16.647 14.4419L18.1433 14.3373ZM18.0571 15.7816L16.7246 15.0926L16.7246 15.0927L18.0571 15.7816ZM17.2826 16.6539L18.0018 17.9702L18.002 17.9701L17.2826 16.6539ZM16.1396 16.7594L16.1761 18.259L16.1761 18.259L16.1396 16.7594ZM15.0405 16.8887L16.1015 17.9491L16.1017 17.9488L15.0405 16.8887ZM14.825 18.3997L16.3204 18.5173L16.3204 18.5173L14.825 18.3997ZM14.7129 19.8156L16.1958 20.0412L16.197 20.0331L14.7129 19.8156ZM13.9249 20.0476L13.6486 18.5733L13.6481 18.5734L13.9249 20.0476ZM13.752 20.0801H12.252V21.888L14.0289 21.5543L13.752 20.0801ZM13.6978 18.8517L12.3327 19.4734L12.333 19.474L13.6978 18.8517ZM13.0834 18.8167L11.7609 18.1089L11.7607 18.1092L13.0834 18.8167ZM12.965 20.2289L12.4277 18.8284L12.427 18.8287L12.965 20.2289ZM12.4374 20.2886L12.3276 18.7926L12.3276 18.7926L12.4374 20.2886ZM11.9772 20.3223H10.4772V21.9364L12.087 21.8183L11.9772 20.3223ZM11.3057 20.3223L11.1959 21.8183L12.8057 21.9364V20.3223H11.3057ZM10.8455 20.2886L10.9553 18.7926L10.9552 18.7926L10.8455 20.2886ZM10.3179 20.2289L10.8559 18.8287L10.8552 18.8284L10.3179 20.2289ZM10.1326 18.7961L9.07178 19.8565L9.07218 19.857L10.1326 18.7961ZM9.6681 18.7699L10.6112 19.9363L10.6114 19.9362L9.6681 18.7699ZM9.53883 19.47L8.03935 19.4305L8.03935 19.4306L9.53883 19.47ZM9.52286 20.0785L9.2463 21.5528L10.9762 21.8773L11.0223 20.1179L9.52286 20.0785ZM9.36202 20.0484L9.08536 21.5226L9.08547 21.5226L9.36202 20.0484ZM8.57829 19.8036L7.53983 20.886L7.54014 20.8863L8.57829 19.8036ZM8.45487 18.3911L6.95919 18.5049L6.95919 18.5049L8.45487 18.3911ZM8.243 16.8894L9.30417 15.8292L9.30416 15.8292L8.243 16.8894ZM7.14325 16.7594L7.10675 18.259L7.10676 18.259L7.14325 16.7594ZM6.00028 16.6539L5.28084 17.9701L5.2811 17.9702L6.00028 16.6539ZM5.2258 15.7816L6.55827 15.0927L6.55824 15.0926L5.2258 15.7816ZM5.13956 14.3373L6.6359 14.4419L6.63591 14.4419L5.13956 14.3373ZM4.9805 12.7304L3.50462 12.9983L3.50463 12.9983L4.9805 12.7304ZM4.70713 10.1881L3.2097 10.1003L3.2097 10.1004L4.70713 10.1881ZM6.56937 5.79131L5.49129 4.74836L5.49128 4.74837L6.56937 5.79131ZM10.4662 3.78244L10.6995 5.26419L10.6996 5.26417L10.4662 3.78244ZM12.5648 5.26566C13.8207 5.45864 14.7882 5.95848 15.6275 6.82614L17.7837 4.74028C16.4751 3.38752 14.9043 2.58994 13.0205 2.30047L12.5648 5.26566ZM15.6275 6.82611C16.4953 7.72324 16.9943 8.86382 17.0804 10.315L20.0751 10.1374C19.9505 8.03655 19.1944 6.19856 17.7838 4.7403L15.6275 6.82611ZM17.0804 10.315C17.105 10.73 17.0897 11.0124 16.8265 12.4624L19.7782 12.9983C20.0414 11.5488 20.1232 10.9486 20.0751 10.1374L17.0804 10.315ZM16.8265 12.4624C16.7384 12.9477 16.6766 13.2933 16.6481 13.5803C16.6144 13.9211 16.6279 14.1699 16.647 14.4419L19.6397 14.2327C19.624 14.0092 19.6251 13.9613 19.6336 13.8758C19.6473 13.7366 19.6823 13.5265 19.7782 12.9983L16.8265 12.4624ZM16.647 14.4419C16.6635 14.679 16.674 14.8536 16.6792 14.9885C16.6845 15.1255 16.6831 15.1954 16.6811 15.2288C16.6795 15.2559 16.6789 15.2308 16.6928 15.18C16.7078 15.1255 16.726 15.0901 16.7246 15.0926L19.3895 16.4705C19.7588 15.7561 19.7001 15.0967 19.6396 14.2326L16.647 14.4419ZM16.7246 15.0927C16.735 15.0726 16.7287 15.088 16.6917 15.1385C16.6587 15.1836 16.6163 15.2362 16.5703 15.288C16.5235 15.3407 16.4844 15.3797 16.4603 15.4016C16.4486 15.4123 16.4476 15.4124 16.457 15.4052C16.4628 15.4007 16.4998 15.3723 16.5631 15.3377L18.002 17.9701C18.3542 17.7776 18.6574 17.4558 18.8137 17.2798C18.9997 17.0702 19.2325 16.7742 19.3895 16.4704L16.7246 15.0927ZM16.5634 15.3375C16.6755 15.2763 16.7728 15.2472 16.828 15.2344C16.8716 15.2243 16.8836 15.2258 16.832 15.2305C16.7839 15.235 16.7063 15.24 16.5814 15.2452C16.4584 15.2503 16.3031 15.255 16.1031 15.2599L16.1761 18.259C16.5741 18.2493 16.8799 18.2388 17.1078 18.2178C17.3194 18.1983 17.6594 18.1573 18.0018 17.9702L16.5634 15.3375ZM16.1031 15.2599C15.6714 15.2704 15.3311 15.2783 15.0989 15.3056C14.9726 15.3204 14.7538 15.3528 14.5177 15.4567C14.2373 15.5801 14.0608 15.7471 13.9794 15.8285L16.1017 17.9488C16.0947 17.9559 16.0499 18.001 15.9815 18.0526C15.9058 18.1098 15.8198 18.1613 15.7258 18.2027C15.6373 18.2416 15.5633 18.262 15.5177 18.2724C15.4948 18.2776 15.4772 18.2808 15.4664 18.2825C15.4556 18.2843 15.4494 18.285 15.4492 18.285C15.449 18.2851 15.4528 18.2846 15.4616 18.2839C15.4704 18.2831 15.4828 18.2822 15.4996 18.2811C15.5339 18.2789 15.58 18.2766 15.6425 18.2742C15.7693 18.2692 15.9388 18.2648 16.1761 18.259L16.1031 15.2599ZM13.9796 15.8283C13.8294 15.9786 13.6804 16.1789 13.577 16.4523C13.5001 16.6559 13.4679 16.8526 13.4497 16.9799C13.4124 17.2417 13.3789 17.6548 13.3296 18.282L16.3204 18.5173C16.346 18.1907 16.3657 17.9468 16.3823 17.7605C16.3993 17.5695 16.4111 17.4635 16.4197 17.4036C16.4237 17.3754 16.4248 17.3731 16.4218 17.3869C16.4189 17.4002 16.4081 17.4474 16.3834 17.5128C16.3565 17.5839 16.3155 17.6707 16.2543 17.7621C16.1935 17.853 16.1341 17.9165 16.1015 17.9491L13.9796 15.8283ZM13.3296 18.282C13.2992 18.6685 13.2714 19.0208 13.2511 19.2771C13.241 19.4053 13.2327 19.5093 13.2269 19.5814C13.2241 19.6175 13.2218 19.6452 13.2203 19.6638C13.2196 19.6732 13.2191 19.6794 13.2188 19.683C13.2186 19.685 13.2186 19.6847 13.2188 19.6831C13.2188 19.6827 13.2191 19.6795 13.2195 19.6751C13.2197 19.6731 13.2201 19.668 13.2208 19.6615C13.2212 19.6582 13.2218 19.6522 13.2226 19.6447C13.2232 19.6401 13.2253 19.6216 13.2287 19.5981L16.197 20.0331C16.2068 19.9666 16.2165 19.8316 16.2174 19.8201C16.2233 19.7471 16.2316 19.6423 16.2417 19.5139C16.2621 19.257 16.2899 18.9041 16.3204 18.5173L13.3296 18.282ZM13.2299 19.59C13.2644 19.3632 13.3441 19.188 13.4097 19.073C13.4759 18.957 13.5457 18.8707 13.5964 18.8143C13.694 18.7055 13.7861 18.6355 13.8306 18.6033C13.9229 18.5365 14.0015 18.4962 14.0255 18.484C14.0853 18.4536 14.1312 18.4359 14.1359 18.434C14.1567 18.4258 14.1622 18.4245 14.1396 18.432C14.1019 18.4445 14.0377 18.4645 13.9587 18.4878C13.8814 18.5105 13.8013 18.5331 13.7342 18.5509C13.6535 18.5724 13.6309 18.5766 13.6486 18.5733L14.2013 21.5219C14.3734 21.4896 14.6406 21.4143 14.8059 21.3657C14.902 21.3374 15.0024 21.3066 15.0858 21.2789C15.1238 21.2663 15.179 21.2474 15.2345 21.2256C15.2567 21.2169 15.3162 21.1933 15.3854 21.1581C15.4141 21.1435 15.4963 21.1011 15.591 21.0325C15.6368 20.9993 15.7299 20.9285 15.8282 20.819C15.9031 20.7356 16.1308 20.4688 16.1958 20.0412L13.2299 19.59ZM13.6481 18.5734L13.4751 18.6058L14.0289 21.5543L14.2018 21.5218L13.6481 18.5734ZM15.252 20.0801V19.5253H12.252V20.0801H15.252ZM15.252 19.5253C15.252 19.3358 15.2448 19.1435 15.2314 18.9769C15.2248 18.895 15.2154 18.8028 15.2014 18.7121C15.1961 18.678 15.1662 18.4565 15.0626 18.2294L12.333 19.474C12.3163 19.4374 12.3035 19.4053 12.2941 19.3798C12.2845 19.3541 12.2771 19.3315 12.2714 19.3132C12.2602 19.2775 12.253 19.2489 12.2488 19.2309C12.2406 19.1962 12.2371 19.1737 12.2367 19.1707C12.2359 19.1655 12.2362 19.1671 12.2373 19.1768C12.2383 19.186 12.2396 19.1995 12.2411 19.2174C12.244 19.2537 12.2468 19.3003 12.2488 19.3547C12.2509 19.4086 12.252 19.4666 12.252 19.5253H15.252ZM15.0629 18.23C14.7307 17.5007 14.0411 17.191 13.4804 17.1591C12.9216 17.1273 12.1619 17.3597 11.7609 18.1089L14.4059 19.5246C14.128 20.0437 13.6201 20.1719 13.31 20.1543C12.998 20.1365 12.554 19.9593 12.3327 19.4734L15.0629 18.23ZM11.7607 18.1092C11.6574 18.3024 11.619 18.4783 11.6105 18.5155C11.5943 18.5866 11.5842 18.6504 11.5779 18.6955C11.565 18.7878 11.5565 18.8833 11.5507 18.9681C11.5388 19.142 11.5325 19.3488 11.5325 19.5574H14.5325C14.5325 19.4027 14.5373 19.2659 14.5437 19.1737C14.5452 19.1517 14.5466 19.1349 14.5477 19.1231C14.5489 19.1105 14.5495 19.1076 14.5488 19.1124C14.5484 19.1151 14.5474 19.1221 14.5456 19.1324C14.5439 19.1423 14.5406 19.1597 14.5354 19.1825C14.5306 19.2038 14.5214 19.2415 14.5061 19.2889C14.4983 19.3133 14.4873 19.3452 14.4725 19.3821C14.458 19.4181 14.4364 19.4675 14.406 19.5243L11.7607 18.1092ZM11.5325 19.5574C11.5325 19.68 11.5316 19.7701 11.5299 19.8369C11.5281 19.9078 11.5259 19.9309 11.5263 19.927C11.5266 19.9236 11.529 19.9003 11.5358 19.8641C11.5421 19.8306 11.5571 19.7596 11.5901 19.6697C11.648 19.5124 11.8573 19.0473 12.4277 18.8284L13.5023 21.6294C14.0994 21.4003 14.3305 20.9099 14.406 20.7046C14.4817 20.4987 14.5028 20.3109 14.5112 20.2269C14.5302 20.0384 14.5325 19.8008 14.5325 19.5574H11.5325ZM12.427 18.8287C12.4679 18.813 12.5021 18.802 12.5249 18.795C12.5487 18.7878 12.5687 18.7824 12.5832 18.7787C12.6115 18.7715 12.6332 18.7669 12.6442 18.7647C12.666 18.7602 12.6785 18.7584 12.6755 18.7589C12.6711 18.7596 12.6514 18.7623 12.6136 18.7666C12.5406 18.7749 12.4379 18.7845 12.3276 18.7926L12.5471 21.7846C12.69 21.7741 12.8325 21.761 12.9508 21.7476C13.0087 21.7411 13.0711 21.7333 13.1295 21.7243C13.1579 21.72 13.197 21.7136 13.2399 21.7049C13.2563 21.7016 13.3714 21.6796 13.503 21.6291L12.427 18.8287ZM12.3276 18.7926L11.8674 18.8264L12.087 21.8183L12.5471 21.7845L12.3276 18.7926ZM13.4772 20.3223V19.684H10.4772V20.3223H13.4772ZM13.4772 19.684C13.4772 19.501 13.4754 19.3122 13.4635 19.1438C13.4533 18.999 13.4285 18.7264 13.315 18.4441C13.1699 18.0835 12.8852 17.7214 12.4249 17.5203C12.0739 17.367 11.7442 17.3702 11.6498 17.3702V20.3702C11.7019 20.3702 11.4863 20.384 11.2242 20.2695C11.0679 20.2013 10.9109 20.096 10.7761 19.949C10.6465 19.8074 10.5728 19.6658 10.5318 19.5639C10.4634 19.394 10.4656 19.2794 10.471 19.3554C10.4747 19.4079 10.4772 19.5029 10.4772 19.684H13.4772ZM11.6498 17.3702C11.5663 17.3702 11.2512 17.3654 10.9161 17.497C10.46 17.6761 10.147 18.0214 9.98122 18.4095C9.85515 18.7046 9.82964 18.9906 9.81935 19.1343C9.80722 19.3036 9.80566 19.494 9.80566 19.6756H12.8057C12.8057 19.4918 12.8081 19.3989 12.8117 19.3486C12.8171 19.2727 12.8191 19.403 12.74 19.5881C12.6922 19.7001 12.6088 19.8476 12.4675 19.9898C12.3226 20.1356 12.1609 20.2312 12.0124 20.2895C11.7711 20.3842 11.5771 20.3702 11.6498 20.3702V17.3702ZM9.80566 19.6756V20.3223H12.8057V19.6756H9.80566ZM11.4154 18.8264L10.9553 18.7926L10.7357 21.7845L11.1959 21.8183L11.4154 18.8264ZM10.9552 18.7926C10.845 18.7845 10.7423 18.7749 10.6693 18.7666C10.6315 18.7623 10.6118 18.7596 10.6074 18.7589C10.6044 18.7584 10.6168 18.7602 10.6386 18.7647C10.6496 18.7669 10.6714 18.7715 10.6996 18.7787C10.7142 18.7824 10.7342 18.7878 10.758 18.795C10.7808 18.802 10.8149 18.813 10.8559 18.8287L9.77989 21.6291C9.91141 21.6796 10.0266 21.7016 10.043 21.7049C10.0859 21.7136 10.1249 21.72 10.1534 21.7243C10.2118 21.7333 10.2742 21.7411 10.3321 21.7476C10.4503 21.761 10.5929 21.7741 10.7358 21.7846L10.9552 18.7926ZM10.8552 18.8284C11.425 19.0471 11.6345 19.5115 11.6925 19.6692C11.7257 19.7592 11.7407 19.8303 11.747 19.8638C11.7539 19.9001 11.7562 19.9235 11.7566 19.9269C11.757 19.931 11.7547 19.908 11.7529 19.8374C11.7512 19.7707 11.7504 19.6808 11.7504 19.5584H8.75038C8.75038 19.8014 8.75267 20.0388 8.77164 20.2273C8.7801 20.3113 8.80127 20.4991 8.87707 20.7051C8.95275 20.9108 9.184 21.4005 9.78058 21.6294L10.8552 18.8284ZM11.7504 19.5584C11.7504 19.3138 11.754 19.0013 11.7164 18.7581C11.6901 18.5879 11.6342 18.3618 11.4977 18.1254C11.3735 17.9104 11.2246 17.7667 11.1931 17.7352L9.07218 19.857C9.09731 19.8821 8.99149 19.7845 8.89999 19.6261C8.79614 19.4463 8.76261 19.2874 8.75159 19.216C8.74368 19.1649 8.74645 19.1497 8.74834 19.2292C8.75003 19.2998 8.75038 19.3994 8.75038 19.5584H11.7504ZM11.1935 17.7356C10.9213 17.4633 10.5127 17.2152 9.98962 17.1857C9.46487 17.1561 9.02837 17.3581 8.72483 17.6036L10.6114 19.9362C10.4619 20.0571 10.187 20.2016 9.82075 20.1809C9.45614 20.1604 9.20276 19.9876 9.07178 19.8565L11.1935 17.7356ZM8.72499 17.6035C8.66864 17.649 8.49147 17.7917 8.34045 18.0285C8.18569 18.2711 8.12363 18.5055 8.09411 18.6654C8.05016 18.9034 8.04529 19.205 8.03935 19.4305L11.0383 19.5095C11.0421 19.3641 11.045 19.2733 11.0483 19.2101C11.0521 19.1381 11.0541 19.1565 11.0443 19.21C11.0319 19.2772 10.9926 19.4491 10.8697 19.6418C10.7506 19.8286 10.6143 19.9338 10.6112 19.9363L8.72499 17.6035ZM8.03935 19.4306L8.02338 20.0392L11.0223 20.1179L11.0383 19.5094L8.03935 19.4306ZM9.79942 18.6042L9.63858 18.5741L9.08547 21.5226L9.2463 21.5528L9.79942 18.6042ZM9.63869 18.5741C9.64664 18.5756 9.65243 18.5768 9.6556 18.5774C9.65888 18.5781 9.6607 18.5786 9.66085 18.5786C9.66088 18.5786 9.65735 18.5778 9.64965 18.5758C9.6339 18.5719 9.61042 18.5656 9.57944 18.557C9.51755 18.5396 9.4421 18.5172 9.36781 18.494C9.29206 18.4703 9.22928 18.4496 9.19056 18.4359C9.169 18.4283 9.16958 18.428 9.18382 18.4339C9.18859 18.4358 9.19678 18.4392 9.20751 18.444C9.21767 18.4485 9.23471 18.4562 9.25614 18.4668C9.27527 18.4763 9.31259 18.4953 9.35849 18.523C9.38207 18.5373 9.41562 18.5584 9.45455 18.5864C9.49101 18.6125 9.55016 18.6574 9.61643 18.7209L7.54014 20.8863C7.6603 21.0015 7.77268 21.0699 7.80719 21.0908C7.85717 21.121 7.89961 21.1427 7.92482 21.1552C7.97568 21.1804 8.0199 21.199 8.04478 21.2092C8.09788 21.231 8.15092 21.2503 8.19155 21.2647C8.27721 21.2949 8.37776 21.3277 8.4736 21.3576C8.63237 21.4072 8.90326 21.4884 9.08536 21.5226L9.63869 18.5741ZM9.61674 18.7212C9.70389 18.8048 9.76546 18.8842 9.80529 18.9408C9.84633 18.9992 9.8767 19.0513 9.89787 19.0905C9.93897 19.1666 9.96513 19.231 9.97933 19.2682C10.0076 19.3424 10.0236 19.4024 10.0299 19.4271C10.0439 19.4813 10.0513 19.5236 10.0533 19.5346C10.0563 19.5518 10.0582 19.5645 10.0589 19.5698C10.0598 19.5759 10.0603 19.5798 10.0604 19.5807C10.0606 19.5821 10.0602 19.579 10.0592 19.5698C10.0582 19.5612 10.057 19.5495 10.0555 19.5345C10.0491 19.4726 10.0402 19.3768 10.0292 19.2513C10.0075 19.0024 9.97946 18.6574 9.95054 18.2773L6.95919 18.5049C6.9887 18.8927 7.01765 19.2494 7.04064 19.5125C7.05204 19.643 7.06244 19.7558 7.07101 19.8396C7.0751 19.8797 7.07984 19.9236 7.0849 19.963C7.08705 19.9797 7.09165 20.0147 7.0987 20.0548C7.10159 20.0712 7.10987 20.1176 7.12461 20.1748C7.13134 20.201 7.14766 20.2622 7.17629 20.3373C7.17661 20.3381 7.27332 20.6303 7.53983 20.886L9.61674 18.7212ZM9.95054 18.2773C9.90304 17.6529 9.87083 17.2409 9.83402 16.9801C9.81609 16.853 9.78381 16.6539 9.70493 16.4474C9.59901 16.1702 9.44736 15.9726 9.30417 15.8292L7.18182 17.9495C7.15283 17.9205 7.09451 17.8589 7.03405 17.7696C6.97258 17.6788 6.93053 17.5915 6.90246 17.518C6.87672 17.4507 6.86534 17.4015 6.86204 17.3865C6.85867 17.3711 6.85961 17.372 6.86344 17.3992C6.87163 17.4573 6.88301 17.5614 6.89947 17.7514C6.91551 17.9364 6.93441 18.1792 6.95919 18.5049L9.95054 18.2773ZM9.30416 15.8292C9.22593 15.7509 9.05007 15.5831 8.76983 15.4587C8.53245 15.3534 8.31247 15.3207 8.18555 15.3057C7.95295 15.2782 7.61178 15.2704 7.17974 15.2599L7.10676 18.259C7.34464 18.2648 7.51432 18.2692 7.64123 18.2742C7.70383 18.2766 7.74984 18.2789 7.78398 18.2811C7.80072 18.2822 7.81301 18.2831 7.82169 18.2838C7.83044 18.2846 7.83406 18.285 7.83361 18.285C7.83322 18.2849 7.82682 18.2842 7.81573 18.2823C7.80466 18.2805 7.78671 18.2773 7.76351 18.2719C7.71707 18.2613 7.64243 18.2406 7.55336 18.201C7.4589 18.1591 7.37326 18.1072 7.29854 18.0505C7.2314 17.9995 7.18743 17.9551 7.18183 17.9495L9.30416 15.8292ZM7.17975 15.2599C6.97979 15.255 6.82442 15.2503 6.70143 15.2452C6.57654 15.24 6.49898 15.235 6.45081 15.2305C6.39931 15.2258 6.41122 15.2243 6.4549 15.2344C6.51009 15.2472 6.60733 15.2763 6.71947 15.3375L5.2811 17.9702C5.62347 18.1573 5.96345 18.1983 6.17503 18.2178C6.40292 18.2388 6.70873 18.2493 7.10675 18.259L7.17975 15.2599ZM6.71972 15.3377C6.78303 15.3723 6.82003 15.4007 6.82586 15.4052C6.83527 15.4124 6.83422 15.4123 6.82252 15.4016C6.79847 15.3797 6.75939 15.3407 6.71257 15.288C6.66659 15.2362 6.62417 15.1836 6.59121 15.1385C6.55421 15.088 6.54788 15.0726 6.55827 15.0927L3.89334 16.4704C4.05036 16.7742 4.28316 17.0702 4.4692 17.2798C4.6255 17.4558 4.92868 17.7776 5.28084 17.9701L6.71972 15.3377ZM6.55824 15.0926C6.5569 15.0901 6.57509 15.1255 6.59003 15.18C6.60392 15.2308 6.6034 15.2559 6.60178 15.2288C6.59979 15.1954 6.59839 15.1255 6.60364 14.9885C6.60881 14.8536 6.61932 14.679 6.6359 14.4419L3.64321 14.2326C3.58277 15.0967 3.52403 15.7561 3.89336 16.4705L6.55824 15.0926ZM6.63591 14.4419C6.65492 14.1699 6.66845 13.9211 6.63472 13.5803C6.60631 13.2933 6.54448 12.9477 6.45637 12.4624L3.50463 12.9983C3.60052 13.5265 3.63553 13.7366 3.64931 13.8758C3.65777 13.9613 3.65883 14.0092 3.64321 14.2327L6.63591 14.4419ZM6.45638 12.4624C6.19062 10.9985 6.17757 10.737 6.20457 10.2757L3.2097 10.1004C3.15995 10.9503 3.23631 11.5202 3.50462 12.9983L6.45638 12.4624ZM6.20456 10.2758C6.28711 8.86727 6.78735 7.72334 7.64746 6.83425L5.49128 4.74837C4.09404 6.1927 3.33092 8.03167 3.2097 10.1003L6.20456 10.2758ZM7.64745 6.83426C8.48452 5.969 9.4692 5.45788 10.6995 5.26419L10.233 2.30069C8.37196 2.59368 6.7903 3.4056 5.49129 4.74836L7.64745 6.83426ZM10.6996 5.26417C10.8485 5.24072 11.1969 5.21912 11.6233 5.21924C12.0476 5.21936 12.4038 5.24093 12.5649 5.26568L13.0203 2.30045C12.6293 2.2404 12.0907 2.21937 11.6241 2.21924C11.1595 2.21911 10.6208 2.2396 10.2328 2.30071L10.6996 5.26417Z"
        fill="#64748B"
        mask="url(#path-1-outside-1_5067_11599)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.4727 10.1895C14.1871 10.1906 13.9464 10.2651 13.7088 10.3864C13.5243 10.4806 13.3602 10.5942 13.2162 10.7491C13.0738 10.9022 12.9686 11.0767 12.879 11.2706M14.4727 10.1895C14.7414 10.1884 15.0178 10.253 15.325 10.3501ZM15.325 10.3501C15.6345 10.4479 15.8659 10.5259 16.0518 10.6247ZM16.0518 10.6247C16.2619 10.7363 16.397 10.8645 16.5374 11.0168ZM16.5374 11.0168C16.7759 11.2756 16.9323 11.5788 16.9826 11.926ZM16.9826 11.926C17.0319 12.2672 16.9736 12.6142 16.8446 12.9587ZM13.2089 13.3967C12.9292 13.1171 12.7448 12.781 12.6886 12.3988C12.633 12.0202 12.7093 11.6379 12.879 11.2706M13.2089 13.3967C13.3309 13.5188 13.4482 13.629 13.6222 13.723C13.777 13.8066 13.9618 13.8687 14.196 13.9444C14.9119 14.1758 15.4197 14.2359 15.9636 13.9649C16.3896 13.7525 16.6752 13.4112 16.8446 12.9587"
        fill="#64748B"
      />
      <path
        d="M13.7088 10.3864C13.9464 10.2651 14.1871 10.1906 14.4727 10.1895C14.7414 10.1884 15.0178 10.253 15.325 10.3501L16.0518 10.6247L16.5374 11.0168C16.7759 11.2756 16.9323 11.5788 16.9826 11.926C17.0319 12.2672 16.9736 12.6142 16.8446 12.9587C16.6752 13.4112 16.3896 13.7525 15.9636 13.9649C15.4197 14.2359 14.9119 14.1758 14.196 13.9444C13.9618 13.8687 13.777 13.8066 13.6222 13.723C13.4482 13.629 13.3309 13.5188 13.2089 13.3967C12.9292 13.1171 12.7448 12.781 12.6886 12.3988C12.633 12.0202 12.7093 11.6379 12.879 11.2706C12.9686 11.0767 13.0738 10.9022 13.2162 10.7491C13.3602 10.5942 13.5243 10.4806 13.7088 10.3864Z"
        fill="#64748B"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.02733 10.1895C9.31292 10.1906 9.55357 10.2651 9.79122 10.3864C9.97564 10.4806 10.1398 10.5942 10.2838 10.7491C10.4262 10.9022 10.5314 11.0767 10.6209 11.2706M9.02733 10.1895C8.75856 10.1884 8.48222 10.253 8.17494 10.3501ZM8.17494 10.3501C7.86553 10.4479 7.63413 10.5259 7.4482 10.6247ZM7.4482 10.6247C7.23804 10.7363 7.10303 10.8645 6.9626 11.0168ZM6.9626 11.0168C6.72409 11.2756 6.56767 11.5788 6.51743 11.926ZM6.51743 11.926C6.46806 12.2672 6.5264 12.6142 6.65537 12.9587ZM10.2911 13.3967C10.5708 13.1171 10.7552 12.781 10.8113 12.3988C10.8669 12.0202 10.7907 11.6379 10.6209 11.2706M10.2911 13.3967C10.1691 13.5188 10.0517 13.629 9.8778 13.723C9.72296 13.8066 9.53816 13.8687 9.30395 13.9444C8.58805 14.1758 8.08027 14.2359 7.53639 13.9649C7.11034 13.7525 6.82475 13.4112 6.65537 12.9587"
        fill="#64748B"
      />
      <path
        d="M9.79122 10.3864C9.55357 10.2651 9.31292 10.1906 9.02733 10.1895C8.75856 10.1884 8.48222 10.253 8.17494 10.3501L7.4482 10.6247L6.9626 11.0168C6.72409 11.2756 6.56767 11.5788 6.51743 11.926C6.46806 12.2672 6.5264 12.6142 6.65537 12.9587C6.82475 13.4112 7.11034 13.7525 7.53639 13.9649C8.08027 14.2359 8.58805 14.1758 9.30395 13.9444C9.53816 13.8687 9.72296 13.8066 9.8778 13.723C10.0517 13.629 10.1691 13.5188 10.2911 13.3967C10.5708 13.1171 10.7552 12.781 10.8113 12.3988C10.8669 12.0202 10.7907 11.6379 10.6209 11.2706C10.5314 11.0767 10.4262 10.9022 10.2838 10.7491C10.1398 10.5942 9.97564 10.4806 9.79122 10.3864Z"
        fill="#64748B"
      />
      <rect
        width="1"
        height="2"
        rx="0.5"
        transform="matrix(-0.963691 0.26702 0.26702 0.963691 12.9637 14)"
        fill="#64748B"
      />
      <rect
        x="10.534"
        y="14"
        width="1"
        height="2"
        rx="0.5"
        transform="rotate(15.487 10.534 14)"
        fill="#64748B"
      />
    </svg>
  );
};

export const IconHide: FC<IconProps> = ({ className, strokeWidth, title }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 32 32"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Hide'}</title>
      <path d="M16,9.5c-3.443,0 -6.493,1.022 -8.386,2.57c-1.342,1.099 -2.114,2.465 -2.114,3.93c0,1.465 0.772,2.831 2.114,3.93c1.893,1.548 4.943,2.57 8.386,2.57c3.443,0 6.493,-1.022 8.386,-2.57c1.342,-1.099 2.114,-2.465 2.114,-3.93c0,-1.465 -0.772,-2.831 -2.114,-3.93c-1.893,-1.548 -4.943,-2.57 -8.386,-2.57Zm0,1c3.18,0 6.005,0.914 7.753,2.344c1.085,0.888 1.747,1.972 1.747,3.156c0,1.184 -0.662,2.268 -1.747,3.156c-1.748,1.43 -4.573,2.344 -7.753,2.344c-3.18,0 -6.005,-0.914 -7.753,-2.344c-1.085,-0.888 -1.747,-1.972 -1.747,-3.156c0,-1.184 0.662,-2.268 1.747,-3.156c1.748,-1.43 4.573,-2.344 7.753,-2.344Z" />
      <path d="M16,12.78c-1.777,0 -3.22,1.443 -3.22,3.22c0,1.777 1.443,3.22 3.22,3.22c1.777,-0 3.22,-1.443 3.22,-3.22c-0,-1.777 -1.443,-3.22 -3.22,-3.22Zm0,1c1.225,0 2.22,0.995 2.22,2.22c-0,1.225 -0.995,2.22 -2.22,2.22c-1.225,-0 -2.22,-0.995 -2.22,-2.22c0,-1.225 0.995,-2.22 2.22,-2.22Z" />
      <path d="M24.329,22.624l-16,-14c-0.207,-0.182 -0.524,-0.161 -0.705,0.047c-0.182,0.207 -0.161,0.524 0.047,0.705l16,14c0.207,0.182 0.524,0.161 0.705,-0.047c0.182,-0.207 0.161,-0.524 -0.047,-0.705Z" />
    </svg>
  );
};

export const IconApple: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg">
      <title>{title ? title : 'Apple'}</title>
      <path d="M12.2725 7.74663C11.4825 7.74663 10.26 6.8483 8.97248 6.87997C7.27249 6.90247 5.71417 7.86579 4.83834 9.39162C3.07418 12.4541 4.38334 16.9774 6.10416 19.4665C6.94832 20.6782 7.94415 22.0415 9.26414 21.999C10.5308 21.9449 11.0058 21.1765 12.5433 21.1765C14.0691 21.1765 14.5016 21.999 15.8433 21.9665C17.2074 21.9449 18.0732 20.7332 18.9066 19.5099C19.8699 18.1032 20.2699 16.7391 20.2916 16.6641C20.2591 16.6532 17.6399 15.6466 17.6083 12.6166C17.5866 10.0833 19.6749 8.87162 19.7724 8.81745C18.5816 7.0758 16.7533 6.8808 16.1141 6.83747C14.4474 6.70747 13.0516 7.74663 12.2725 7.74663ZM15.0874 5.19164C15.7899 4.34832 16.2541 3.16916 16.1249 2C15.1191 2.04333 13.9066 2.67083 13.1816 3.51499C12.5316 4.26165 11.97 5.46331 12.1208 6.60997C13.2358 6.69663 14.3833 6.03664 15.0866 5.19248" />
    </svg>
  );
};

export const IconAppleCalendar: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <title>{title ? title : 'Apple Calendar'}</title>

      <g filter="url(#filter0_dd_6767_24082)">
        <path
          fill="url(#paint0_linear_6767_24082)"
          d="M22 8.256V7.54a26.42 26.42 0 0 0-.01-.604 8.805 8.805 0 0 0-.116-1.314 4.42 4.42 0 0 0-.412-1.249 4.206 4.206 0 0 0-1.836-1.836 4.402 4.402 0 0 0-1.248-.411 8.812 8.812 0 0 0-1.314-.116c-.201-.005-.403-.007-.604-.01H7.54c-.201.002-.403.005-.604.01-.438.012-.88.038-1.314.116a4.43 4.43 0 0 0-1.248.411 4.207 4.207 0 0 0-1.836 1.836c-.204.4-.332.81-.412 1.25a8.69 8.69 0 0 0-.115 1.313c-.005.201-.008.403-.01.604L2 8.256v7.487c0 .24 0 .478.002.717 0 .201.004.403.01.604.011.438.037.88.115 1.314.079.44.208.85.412 1.249a4.203 4.203 0 0 0 1.836 1.836c.4.204.808.332 1.248.411.433.078.876.104 1.314.116.201.005.403.007.604.01h8.92c.201-.002.403-.005.604-.01.438-.012.88-.038 1.314-.116a4.43 4.43 0 0 0 1.248-.411 4.203 4.203 0 0 0 1.836-1.836c.204-.4.332-.81.412-1.25.078-.433.104-.874.116-1.313.005-.201.007-.403.009-.604V8.256Z"
        />
      </g>
      <path
        fill="#EC5E57"
        d="M22 8.256V7.54a26.42 26.42 0 0 0-.01-.604 8.805 8.805 0 0 0-.116-1.314 4.42 4.42 0 0 0-.412-1.249 4.206 4.206 0 0 0-1.836-1.836 4.402 4.402 0 0 0-1.248-.411 8.812 8.812 0 0 0-1.314-.116c-.201-.005-.403-.007-.604-.01H7.54c-.201.002-.403.005-.604.01-.438.012-.88.038-1.314.116a4.43 4.43 0 0 0-1.248.411 4.207 4.207 0 0 0-1.836 1.836c-.204.4-.332.81-.412 1.25a8.69 8.69 0 0 0-.115 1.313c-.005.201-.008.403-.01.604L2 8.256h20Z"
      />
      <path
        fill="#2C2C2C"
        d="M8.886 19v-7.916H8.86c-.195.122-2.105 1.428-2.362 1.587v-.849c.244-.152 2.112-1.47 2.375-1.63h.817V19h-.805Zm3.738 0 4.083-8.038v-.025h-4.9v-.744h5.737v.78L13.509 19h-.885Z"
      />
      <path
        fill="#F6F5F5"
        d="M8.441 5.87h.573c.004.228.152.379.375.379.246 0 .379-.153.379-.436V3.882h.59v1.935c0 .6-.36.94-.963.94-.577 0-.954-.348-.954-.887Zm2.999-1.988v1.763c0 .362.212.598.591.598.377 0 .59-.236.59-.598V3.882h.59v1.822c0 .621-.459 1.043-1.18 1.043-.722 0-1.181-.422-1.181-1.043V3.882h.59Zm4.064 2.33V6.7h-1.822V3.882h.59v2.33h1.232Z"
      />
      <defs>
        <linearGradient
          id="paint0_linear_6767_24082"
          x1="12.001"
          x2="12.001"
          y1="8.5"
          y2="22"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#FCFCFB" />
          <stop offset="1" stopColor="#F1EFEC" />
        </linearGradient>
        <filter
          id="filter0_dd_6767_24082"
          width="21.001"
          height="21"
          x="1.5"
          y="1.8"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy=".3" />
          <feGaussianBlur stdDeviation=".25" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_6767_24082"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy=".3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
          <feBlend
            in2="effect1_dropShadow_6767_24082"
            result="effect2_dropShadow_6767_24082"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect2_dropShadow_6767_24082"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export const IconGoogleCalendar: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg">
      <title>{title ? title : 'Google Calendar'}</title>
      <path
        fill="#fff"
        d="m17.263 6.737-4.737-.527-5.79.527L6.21 12l.527 5.263 5.263.658 5.263-.658.526-5.395-.526-5.131Z"
      />
      <path
        fill="#1A73E8"
        d="M8.896 14.903c-.393-.266-.666-.654-.814-1.168l.913-.376c.083.316.227.56.434.734.205.174.455.26.747.26.299 0 .556-.091.77-.273a.87.87 0 0 0 .322-.693.86.86 0 0 0-.34-.703c-.225-.181-.51-.272-.85-.272h-.527v-.904h.474c.292 0 .538-.079.738-.237.2-.158.3-.374.3-.649 0-.244-.09-.44-.268-.585a1.044 1.044 0 0 0-.68-.22c-.269 0-.482.071-.64.215-.158.143-.272.32-.345.527l-.904-.376c.12-.34.34-.64.662-.899.323-.259.734-.39 1.234-.39.37 0 .703.072.998.215.294.144.526.342.693.595.167.254.25.538.25.854 0 .322-.078.595-.233.818a1.606 1.606 0 0 1-.572.515v.054c.299.125.542.316.734.572a1.5 1.5 0 0 1 .287.921c0 .358-.091.678-.273.958-.181.28-.433.501-.75.662-.32.16-.68.242-1.079.242a2.23 2.23 0 0 1-1.281-.397Zm5.604-4.532-.998.725-.5-.76L14.8 9.038h.69v6.12h-.99V10.37Z"
      />
      <path
        fill="#EA4335"
        d="M17.263 22 22 17.263l-2.368-1.052-2.369 1.052-1.052 2.369L17.263 22Z"
      />
      <path
        fill="#34A853"
        d="M5.684 19.632 6.737 22h10.526v-4.737H6.737l-1.053 2.369Z"
      />
      <path
        fill="#4285F4"
        d="M3.579 2A1.58 1.58 0 0 0 2 3.579v13.684l2.368 1.053 2.369-1.053V6.737h10.526l1.053-2.369L17.263 2H3.58Z"
      />
      <path
        fill="#188038"
        d="M2 17.263v3.158C2 21.294 2.707 22 3.579 22h3.158v-4.737H2Z"
      />
      <path
        fill="#FBBC04"
        d="M17.263 6.737v10.526H22V6.737l-2.368-1.053-2.369 1.053Z"
      />
      <path
        fill="#1967D2"
        d="M22 6.737V3.579C22 2.706 21.293 2 20.421 2h-3.158v4.737H22Z"
      />
    </svg>
  );
};

export const IconMicrosoftOutlook: FC<IconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.0001 12.7675C22.0012 12.6111 21.9204 12.4656 21.7871 12.3838H21.7847L21.7764 12.3791L14.8461 8.2768C14.8162 8.25658 14.7851 8.2381 14.7531 8.22146C14.4855 8.08341 14.1677 8.08341 13.9001 8.22146C13.868 8.23811 13.837 8.25658 13.8071 8.2768L6.87683 12.3791L6.86847 12.3838C6.65666 12.5155 6.59172 12.794 6.72344 13.0058C6.76225 13.0682 6.8157 13.1202 6.87916 13.1573L13.8094 17.2596C13.8394 17.2796 13.8705 17.2981 13.9024 17.315C14.17 17.453 14.4879 17.453 14.7555 17.315C14.7874 17.2981 14.8184 17.2796 14.8485 17.2596L21.7787 13.1573C21.9172 13.0766 22.0017 12.9278 22.0001 12.7675Z"
        fill="#0A2767"
      />
      <path
        d="M7.68478 10.0284H12.2327V14.1972H7.68478V10.0284ZM21.0699 5.7907V3.88372C21.0808 3.40693 20.7034 3.01142 20.2267 3H8.42479C7.948 3.01142 7.57061 3.40693 7.58153 3.88372V5.7907L14.5583 7.65116L21.0699 5.7907Z"
        fill="#0364B8"
      />
      <path
        d="M7.58154 5.79077H12.2327V9.97682H7.58154V5.79077Z"
        fill="#0078D4"
      />
      <path
        d="M16.8838 5.79077H12.2327V9.97682L16.8838 14.1629H21.0699V9.97682L16.8838 5.79077Z"
        fill="#28A8EA"
      />
      <path
        d="M12.2327 9.97668H16.8838V14.1627H12.2327V9.97668Z"
        fill="#0078D4"
      />
      <path
        d="M12.2327 14.1628H16.8838V18.3489H12.2327V14.1628Z"
        fill="#0364B8"
      />
      <path
        d="M7.68457 14.1973H12.2325V17.987H7.68457V14.1973Z"
        fill="#14447D"
      />
      <path
        d="M16.8835 14.1628H21.0696V18.3489H16.8835V14.1628Z"
        fill="#0078D4"
      />
      <path
        d="M21.7869 13.1316L21.7781 13.1363L14.8479 17.034C14.8176 17.0526 14.7869 17.0702 14.7548 17.0861C14.6371 17.1421 14.5093 17.1738 14.379 17.1791L14.0004 16.9577C13.9684 16.9416 13.9374 16.9238 13.9074 16.9042L6.88414 12.8958H6.88089L6.65112 12.7675V20.6577C6.65471 21.1841 7.08423 21.608 7.61065 21.6047H21.0553C21.0632 21.6047 21.0702 21.601 21.0786 21.601C21.1898 21.5938 21.2994 21.571 21.4041 21.533C21.4494 21.5139 21.4931 21.4912 21.5348 21.4651C21.566 21.4475 21.6195 21.4089 21.6195 21.4089C21.8578 21.2326 21.9988 20.9541 22 20.6577V12.7675C21.9998 12.9184 21.9184 13.0575 21.7869 13.1316Z"
        fill="url(#paint0_linear_6766_24005)"
      />
      <path
        opacity="0.5"
        d="M21.6279 12.7363V13.22L14.3814 18.2093L6.87906 12.8991C6.87906 12.8965 6.87697 12.8944 6.8744 12.8944L6.18604 12.4804V12.1316L6.46976 12.127L7.06975 12.4711L7.0837 12.4758L7.13486 12.5084C7.13486 12.5084 14.186 16.5316 14.2046 16.5409L14.4744 16.699C14.4977 16.6897 14.5209 16.6804 14.5488 16.6711C14.5628 16.6618 21.5488 12.7316 21.5488 12.7316L21.6279 12.7363Z"
        fill="#0A2767"
      />
      <path
        d="M21.7869 13.1316L21.7781 13.1368L14.8479 17.0344C14.8176 17.053 14.7869 17.0707 14.7548 17.0865C14.4857 17.218 14.1709 17.218 13.9018 17.0865C13.8699 17.0707 13.8389 17.0533 13.8088 17.0344L6.87856 13.1368L6.8702 13.1316C6.73639 13.0591 6.65251 12.9197 6.65112 12.7675V20.6577C6.65445 21.184 7.08383 21.608 7.61015 21.6047C7.61015 21.6047 7.61017 21.6047 7.61019 21.6047H21.0409C21.5672 21.608 21.9966 21.1841 22 20.6577C22 20.6577 22 20.6577 22 20.6577V12.7675C21.9998 12.9184 21.9184 13.0575 21.7869 13.1316Z"
        fill="#1490DF"
      />
      <path
        opacity="0.1"
        d="M14.9488 16.9768L14.8451 17.0349C14.815 17.0541 14.784 17.0716 14.7521 17.0875C14.6378 17.1436 14.5135 17.1765 14.3865 17.1842L17.0232 20.3024L21.6228 21.4108C21.7488 21.3156 21.849 21.1904 21.9144 21.0466L14.9488 16.9768Z"
        fill="black"
      />
      <path
        opacity="0.05"
        d="M15.4186 16.7125L14.8451 17.0348C14.815 17.054 14.784 17.0715 14.7521 17.0874C14.6378 17.1435 14.5135 17.1764 14.3865 17.1841L15.6218 20.5902L21.6241 21.4093C21.8606 21.2317 21.9998 20.9533 22 20.6576V20.5558L15.4186 16.7125Z"
        fill="black"
      />
      <path
        d="M7.62321 21.6047H21.0395C21.2459 21.6057 21.4473 21.5405 21.6139 21.4186L14 16.9586C13.968 16.9426 13.9369 16.9247 13.9069 16.9051L6.88367 12.8968H6.88042L6.65112 12.7675V20.6307C6.6506 21.1681 7.08582 21.6042 7.62321 21.6047V21.6047Z"
        fill="#28A8EA"
      />
      <path
        opacity="0.1"
        d="M13.1628 7.5735V17.4944C13.1619 17.8423 12.9504 18.1549 12.6279 18.2851C12.528 18.3281 12.4203 18.3502 12.3116 18.3503H6.65112V7.18606H7.58136V6.72095H12.3116C12.7815 6.72273 13.1617 7.10362 13.1628 7.5735Z"
        fill="black"
      />
      <path
        opacity="0.2"
        d="M12.6976 8.03863V17.9596C12.6988 18.0719 12.675 18.1831 12.6279 18.2851C12.4987 18.6035 12.1901 18.8124 11.8465 18.814H6.65112V7.18607H11.8465C11.9814 7.18472 12.1144 7.21838 12.2325 7.28375C12.5176 7.4274 12.6975 7.71938 12.6976 8.03863Z"
        fill="black"
      />
      <path
        opacity="0.2"
        d="M12.6976 8.03863V17.0293C12.6954 17.499 12.3161 17.8797 11.8465 17.8837H6.65112V7.18607H11.8465C11.9814 7.18472 12.1144 7.21838 12.2325 7.28375C12.5176 7.4274 12.6975 7.71938 12.6976 8.03863Z"
        fill="black"
      />
      <path
        opacity="0.2"
        d="M12.2325 8.03859V17.0293C12.232 17.4997 11.8518 17.8814 11.3814 17.8837H6.65112V7.18604H11.3814C11.8517 7.18629 12.2328 7.56779 12.2325 8.03813C12.2325 8.03828 12.2325 8.03844 12.2325 8.03859Z"
        fill="black"
      />
      <path
        d="M2.85256 7.18604H11.38C11.8509 7.18604 12.2326 7.56774 12.2326 8.03859V16.566C12.2326 17.0369 11.8509 17.4186 11.38 17.4186H2.85256C2.3817 17.4186 2 17.0369 2 16.566V8.03859C2 7.56774 2.38171 7.18604 2.85256 7.18604Z"
        fill="url(#paint1_linear_6766_24005)"
      />
      <path
        d="M4.66475 10.7618C4.87487 10.3141 5.21404 9.93947 5.63871 9.686C6.109 9.41675 6.64446 9.28253 7.18615 9.29809C7.6882 9.2872 8.1836 9.41447 8.61824 9.66599C9.0269 9.9097 9.35603 10.2668 9.56568 10.6939C9.79401 11.1645 9.9078 11.6825 9.89778 12.2055C9.90885 12.7521 9.79177 13.2937 9.55592 13.7869C9.34127 14.2293 9.0017 14.5991 8.57917 14.8506C8.12778 15.1099 7.61398 15.2405 7.09359 15.2283C6.58081 15.2407 6.07449 15.112 5.62987 14.8562C5.21768 14.6122 4.88442 14.2547 4.66987 13.8264C4.44019 13.3626 4.32505 12.8505 4.33406 12.333C4.32449 11.791 4.43754 11.2539 4.66475 10.7618ZM5.70289 13.2874C5.81492 13.5704 6.0049 13.8159 6.25079 13.9953C6.50124 14.1703 6.80114 14.2607 7.1066 14.253C7.43191 14.2658 7.75256 14.1725 8.02009 13.9869C8.26287 13.8081 8.44786 13.5619 8.55218 13.279C8.6688 12.963 8.72635 12.6283 8.72195 12.2916C8.72556 11.9516 8.67146 11.6135 8.56195 11.2916C8.46523 11.001 8.2862 10.7447 8.0466 10.5539C7.78577 10.3596 7.46598 10.261 7.14102 10.2748C6.82894 10.2668 6.52232 10.3578 6.26521 10.5348C6.01516 10.715 5.82157 10.9626 5.70707 11.2488C5.45307 11.9047 5.45174 12.6315 5.70334 13.2883L5.70289 13.2874Z"
        fill="white"
      />
      <path
        d="M16.8835 5.79077H21.0696V9.97682H16.8835V5.79077Z"
        fill="#50D9FF"
      />
      <defs>
        <linearGradient
          id="paint0_linear_6766_24005"
          x1="14.3255"
          y1="12.7675"
          x2="14.3255"
          y2="21.6047"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#35B8F1" />
          <stop offset="1" stopColor="#28A8EA" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_6766_24005"
          x1="3.7776"
          y1="6.51986"
          x2="10.455"
          y2="18.0848"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#1784D9" />
          <stop offset="0.5" stopColor="#107AD5" />
          <stop offset="1" stopColor="#0A63C9" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const IconFilterDashboard: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor">
      <title>{title ? title : 'Filter'}</title>
      <path
        d="M7 1.75C8.60708 1.75 10.1821 1.88534 11.7151 2.1455C12.026 2.198 12.25 2.46984 12.25 2.78484V3.39383C12.25 3.5662 12.2161 3.73687 12.1501 3.89611C12.0841 4.05535 11.9875 4.20004 11.8656 4.32192L8.69692 7.49058C8.57504 7.61246 8.47836 7.75715 8.4124 7.91639C8.34645 8.07563 8.3125 8.24631 8.3125 8.41867V10.1261C8.31255 10.3699 8.24468 10.6089 8.1165 10.8163C7.98833 11.0237 7.80492 11.1913 7.58683 11.3003L5.6875 12.25V8.41867C5.6875 8.24631 5.65355 8.07563 5.5876 7.91639C5.52164 7.75715 5.42496 7.61246 5.30308 7.49058L2.13442 4.32192C2.01254 4.20004 1.91586 4.05535 1.8499 3.89611C1.78395 3.73687 1.75 3.5662 1.75 3.39383V2.78484C1.75 2.46984 1.974 2.198 2.28492 2.1455C3.84275 1.88175 5.42 1.74945 7 1.75Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const IconSortDashboard: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor">
      <title>{title ? title : 'Sort'}</title>
      <path
        d="M1.75 4.375L4.375 1.75M4.375 1.75L7 4.375M4.375 1.75V9.625M12.25 9.625L9.625 12.25M9.625 12.25L7 9.625M9.625 12.25V4.375"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const IconMarket: FC<IconProps> = ({ className, title }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor">
      <title>{title ? title : 'Market'}</title>
      <path
        d="M7.87501 12.25V7.875C7.87501 7.75897 7.92111 7.64769 8.00316 7.56564C8.0852 7.48359 8.19648 7.4375 8.31251 7.4375H10.0625C10.1785 7.4375 10.2898 7.48359 10.3719 7.56564C10.4539 7.64769 10.5 7.75897 10.5 7.875V12.25M7.87501 12.25H1.37668M7.87501 12.25H10.5M10.5 12.25H12.6233M11.8125 12.25V5.45358C12.045 5.31936 12.2435 5.13344 12.3927 4.91022C12.5419 4.68699 12.6376 4.43243 12.6727 4.16625C12.7077 3.90008 12.681 3.62941 12.5947 3.3752C12.5083 3.12098 12.3646 2.89004 12.1748 2.70025L11.4806 2.00667C11.3167 1.84253 11.0943 1.7502 10.8623 1.75H3.13718C2.9052 1.7502 2.68279 1.84253 2.51885 2.00667L1.82526 2.69967C1.63582 2.88968 1.49254 3.12066 1.40647 3.3748C1.3204 3.62894 1.29385 3.89945 1.32885 4.16548C1.36385 4.4315 1.45947 4.68594 1.60834 4.90917C1.75722 5.13239 1.95537 5.31845 2.18751 5.453M2.18751 12.2494V5.45417C2.53753 5.65599 2.94658 5.73053 3.34528 5.66514C3.74399 5.59975 4.1078 5.39846 4.37501 5.09542C4.53911 5.28176 4.74106 5.43096 4.96739 5.53306C5.19372 5.63516 5.43922 5.68781 5.68751 5.6875C6.21018 5.6875 6.67918 5.45825 7.00001 5.09483C7.16405 5.28128 7.36598 5.43059 7.59231 5.5328C7.81864 5.635 8.06418 5.68774 8.31251 5.6875C8.83518 5.6875 9.30418 5.45825 9.62501 5.09483C9.8923 5.39779 10.2562 5.59896 10.6549 5.66424C11.0536 5.72953 11.4626 5.65489 11.8125 5.453M3.93751 10.4994H6.12501C6.24105 10.4994 6.35233 10.4533 6.43437 10.3713C6.51642 10.2892 6.56251 10.1779 6.56251 10.0619V7.875C6.56251 7.75897 6.51642 7.64769 6.43437 7.56564C6.35233 7.48359 6.24105 7.4375 6.12501 7.4375H3.93751C3.82148 7.4375 3.7102 7.48359 3.62816 7.56564C3.54611 7.64769 3.50001 7.75897 3.50001 7.875V10.0625C3.50001 10.3046 3.69601 10.4994 3.93751 10.4994Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const IconSidebarList: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Lists'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  );
};

export const IconSidebarGroups: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Groups'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
      />
    </svg>
  );
};

export const IconSidebarNotes: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Notes'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
  );
};

export const IconUserGroup: FC<IconProps> = ({
  className,
  title,
  strokeWidth,
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'People'}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
      />
    </svg>
  );
};

export const IconGift: FC<IconProps> = ({ className, title, strokeWidth }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      stroke="currentColor">
      <title>{title ? title : 'Gift'}</title>

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
      />
    </svg>
  );
};
