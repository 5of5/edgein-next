import React, { useId } from 'react';

export type EmojiProps = {
  className?: string;
  title?: string;
};

export const EmojiHot: React.FC<EmojiProps> = ({ className, title }) => {
  const id = 'hot-' + useId();
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <title>{title ? title : 'Hot'}</title>
      <path
        fill={`url(#a-${id})`}
        d="M22.042 13.98c0 5.534-4.487 10.02-10.021 10.02C6.486 24 2 19.514 2 13.98c0-2.71.968-6.73 5.083-10.7C4.566 9.38 12.99 7.25 8.487.037c7.407-.678 7.746 8.181 10.118 7.794.629-.145.726-.823.387-1.936 1.791 2.033 3.05 5.78 3.05 8.084Z"
      />
      <path
        fill={`url(#b-${id})`}
        d="M7.703 23.025a5.922 5.922 0 0 1-1.637-4.096c0-1.607.575-3.99 3.015-6.345-1.493 3.618 3.502 2.354.832-1.923 2.787-.255 3.886 1.766 4.677 3.22.456.837.809 1.486 1.323 1.402.374-.086.431-.488.23-1.148 1.062 1.205 1.809 3.427 1.809 4.794 0 1.598-.631 3.049-1.657 4.117A9.982 9.982 0 0 1 12.02 24a9.98 9.98 0 0 1-4.318-.975Z"
      />
      <path
        fill="#FADF4B"
        d="M9.676 23.724a3.28 3.28 0 0 1-.9-2.26c0-.758.414-1.988 1.003-2.656-.112.366-.08.588.127.636.285.046.48-.313.733-.777.438-.805 1.047-1.925 2.59-1.784-1.478 2.37 1.289 3.07.462 1.066 1.352 1.304 1.67 2.624 1.67 3.514 0 .86-.33 1.644-.87 2.23-.79.2-1.618.307-2.47.307a10.05 10.05 0 0 1-2.345-.276Z"
      />
      <g fill={`url(#c-${id})`} opacity=".3">
        <path
          fill="#fff"
          d="M21.004 14.45c0 1.97-.89 4.912-4.328 7.238 3.036-5.384.982-10.133 0-13.36 2.167 2.304 2.551-.19 3.036.893.803 1.794 1.292 3.791 1.292 5.229Z"
        />
      </g>
      <defs>
        <linearGradient
          id={`a-${id}`}
          x1="12.021"
          x2="12.021"
          y1="0"
          y2="24"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#C6381B" />
          <stop offset="1" stopColor="#E04221" />
        </linearGradient>
        <linearGradient
          id={`b-${id}`}
          x1="12.009"
          x2="12.009"
          y1="10.639"
          y2="24.872"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#F8DC4B" />
          <stop offset="1" stopColor="#E77B36" />
        </linearGradient>
        <filter
          id={`c-${id}`}
          width="6.963"
          height="15.996"
          x="15.358"
          y="7.01"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_5318_11443"
            stdDeviation=".659"
          />
        </filter>
      </defs>
    </svg>
  );
};

export const EmojiLike: React.FC<EmojiProps> = ({ className, title }) => {
  const id = 'like-' + useId();
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <title>{title ? title : 'Like'}</title>
      <path
        d="M10.4828 0.566491L6.07422 8.71957V22.7885C10.7891 23.6667 17.1218 25.0072 19.7565 22.7885C21.7904 20.8008 23.1019 18.3972 23.5469 14.1446C23.9629 9.9844 23.4083 7.44208 20.3112 7.44208H12.9616C13.581 5.58398 15.5553 2.15924 11.3874 0.247725C11.0519 0.0938274 10.6583 0.241759 10.4828 0.566491Z"
        fill={`url(#a-${id})`}
      />
      <g opacity="0.4" filter={`url(#c-${id})`}>
        <path
          d="M22.1143 13.9111C22.1143 10.398 22.1605 8.4104 19.0635 8.4104C20.404 13.4488 19.7568 17.7477 14.7646 22.971C16.0589 22.971 17.0296 22.8323 18.0003 22.6012C20.7276 19.8278 22.1143 16.6383 22.1143 13.9111Z"
          fill="white"
        />
      </g>
      <path
        d="M1 9.05187C1 8.78996 1.21232 8.57764 1.47423 8.57764H5.932C6.19391 8.57764 6.40624 8.78996 6.40624 9.05187V21.951C6.40624 22.8938 5.64188 23.6582 4.699 23.6582H1.47423C1.21232 23.6582 1 23.4459 1 23.184V9.05187Z"
        fill={`url(#b-${id})`}
      />
      <defs>
        <filter
          id={`c-${id}`}
          x="13.4704"
          y="7.11613"
          width="9.93816"
          height="17.1491"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.647137"
            result="effect1_foregroundBlur_2575_577"
          />
        </filter>
        <radialGradient
          id={`a-${id}`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(17.1218 11.0938) rotate(138.879) scale(15.4629 16.6974)">
          <stop stopColor="#FADF4B" />
          <stop offset="0.489583" stopColor="#F8DC4B" />
          <stop offset="0.833333" stopColor="#FCA237" />
        </radialGradient>
        <linearGradient
          id={`b-${id}`}
          x1="3.75054"
          y1="23.6582"
          x2="3.75054"
          y2="8.57764"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#1A22FF" />
          <stop offset="0.510417" stopColor="#5E41FE" />
          <stop offset="1" stopColor="#A05FFE" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const EmojiCrap: React.FC<EmojiProps> = ({ className, title }) => {
  const id = 'crap-' + useId();
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <title>{title ? title : 'Sh**'}</title>

      <path
        fill={`url(#a-${id})`}
        d="M20.718 17.083c3.615-.375 4.658 4.46 1.008 5.788-6.827 2.086-7.68.095-13.606.19 7.206-.996 10.287-3.177 12.598-5.978Z"
      />
      <path
        fill={`url(#b-${id})`}
        d="M.156 21.306c-.545-1.695.332-4.266 2.75-4.266 9.291 0 12.657-2.655 15.217-5.025 1.66-.095 2.244.39 2.94 1.47.366.568.852 2.607-1.044 4.503-5.167 5.594-12.942 4.693-15.739 5.784-1.754.566-3.58-.77-4.124-2.465Z"
      />
      <path
        fill={`url(#c-${id})`}
        d="M2.668 14.954c0-.995 1.043-3.034 3.034-3.224 4.409-.616 7.443-1.754 9.766-3.603 1.422.19 1.896.712 2.512 1.375.427.57.759 1.612.19 2.56-4.693 5.025-11.093 4.93-14.649 5.025-.474.013-.853-1.137-.853-2.133Z"
      />
      <path
        fill={`url(#d-${id})`}
        d="M8.547 6.42c1.754-.568 3.982-1.374 5.262-2.796 1.422 1.185 2.418 3.034 1.707 4.55-4.22 3.035-6.874 3.035-9.956 3.604-.569-.901-1.043-4.267 2.987-5.357Z"
      />
      <path
        fill={`url(#e-${id})`}
        d="M9.14 1.371c-.076-.232.065-.428.298-.356.86.264 2.702 1.088 4.371 2.609-1.28 1.564-4.314 2.56-5.262 2.844-1.082-2.524 1.48-2.348.592-5.097Z"
      />
      <ellipse
        cx="15.041"
        cy="13.911"
        fill={`url(#f-${id})`}
        rx="2.513"
        ry="3.081"
      />
      <ellipse cx="15.041" cy="13.911" fill="#000" rx="1.28" ry="1.754" />
      <path
        fill="#764523"
        d="M14.993 12.915c-.961 0-1.896.285-2.45.664.134-1.546 1.201-2.75 2.498-2.75 1.3 0 2.37 1.212 2.5 2.765-.794-.442-1.599-.679-2.548-.679Z"
      />
      <ellipse
        cx="8.594"
        cy="13.911"
        fill={`url(#g-${id})`}
        rx="2.513"
        ry="3.081"
      />
      <ellipse cx="8.593" cy="13.911" fill="#000" rx="1.28" ry="1.754" />
      <path
        fill="#764523"
        d="M8.546 12.915c-.961 0-1.896.285-2.45.664.135-1.546 1.202-2.75 2.498-2.75 1.3 0 2.37 1.212 2.5 2.765-.793-.441-1.598-.678-2.548-.678Z"
      />
      <path
        fill="#fff"
        d="M15.753 20.121c-.332.427-1.804-.521-4.03-.521-2.225 0-3.745.948-4.03.521-.284-.426 1.805-1.896 4.03-1.896 2.226 0 4.361 1.47 4.03 1.896Z"
      />
      <defs>
        <linearGradient
          id={`a-${id}`}
          x1="20.398"
          x2="18.076"
          y1="22.444"
          y2="19.884"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#7A4921" />
          <stop offset="1" stopColor="#9C6531" />
        </linearGradient>
        <linearGradient
          id={`b-${id}`}
          x1="12.671"
          x2="10.541"
          y1="21.686"
          y2="16.394"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#7A4921" />
          <stop offset="1" stopColor="#9C6531" />
        </linearGradient>
        <linearGradient
          id={`c-${id}`}
          x1="11.847"
          x2="10.142"
          y1="15.576"
          y2="11.397"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#7A4921" />
          <stop offset="1" stopColor="#9C6531" />
        </linearGradient>
        <linearGradient
          id={`d-${id}`}
          x1="11.259"
          x2="9.627"
          y1="10.131"
          y2="6.397"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#7A4921" />
          <stop offset="1" stopColor="#9C6531" />
        </linearGradient>
        <linearGradient
          id={`e-${id}`}
          x1="11.012"
          x2="9.514"
          y1="5.188"
          y2="1.985"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#804F26" />
          <stop offset="1" stopColor="#9C6531" />
        </linearGradient>
        <linearGradient
          id={`f-${id}`}
          x1="15.089"
          x2="15.041"
          y1="12.915"
          y2="16.992"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBD5B3" />
          <stop offset="1" stopColor="#FEFEFE" />
        </linearGradient>
        <linearGradient
          id={`g-${id}`}
          x1="8.642"
          x2="8.594"
          y1="12.915"
          y2="16.992"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBD5B3" />
          <stop offset="1" stopColor="#FEFEFE" />
        </linearGradient>
      </defs>
    </svg>
  );
};
