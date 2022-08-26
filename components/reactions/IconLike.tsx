import React from "react";

type IconProps = {
  className?: string
}

export const IconLike: React.FC<IconProps> = ({ className }) => {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10.4828 0.566491L6.07422 8.71957V22.7885C10.7891 23.6667 17.1218 25.0072 19.7565 22.7885C21.7904 20.8008 23.1019 18.3972 23.5469 14.1446C23.9629 9.9844 23.4083 7.44208 20.3112 7.44208H12.9616C13.581 5.58398 15.5553 2.15924 11.3874 0.247725C11.0519 0.0938274 10.6583 0.241759 10.4828 0.566491Z" fill="url(#paint0_radial_2575_577)" />
      <g opacity="0.4" filter="url(#filter0_f_2575_577)">
        <path d="M22.1143 13.9111C22.1143 10.398 22.1605 8.4104 19.0635 8.4104C20.404 13.4488 19.7568 17.7477 14.7646 22.971C16.0589 22.971 17.0296 22.8323 18.0003 22.6012C20.7276 19.8278 22.1143 16.6383 22.1143 13.9111Z" fill="white" />
      </g>
      <path d="M1 9.05187C1 8.78996 1.21232 8.57764 1.47423 8.57764H5.932C6.19391 8.57764 6.40624 8.78996 6.40624 9.05187V21.951C6.40624 22.8938 5.64188 23.6582 4.699 23.6582H1.47423C1.21232 23.6582 1 23.4459 1 23.184V9.05187Z" fill="url(#paint1_linear_2575_577)" />
      <defs>
        <filter id="filter0_f_2575_577" x="13.4704" y="7.11613" width="9.93816" height="17.1491" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="0.647137" result="effect1_foregroundBlur_2575_577" />
        </filter>
        <radialGradient id="paint0_radial_2575_577" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(17.1218 11.0938) rotate(138.879) scale(15.4629 16.6974)">
          <stop stopColor="#FADF4B" />
          <stop offset="0.489583" stopColor="#F8DC4B" />
          <stop offset="0.833333" stopColor="#FCA237" />
        </radialGradient>
        <linearGradient id="paint1_linear_2575_577" x1="3.75054" y1="23.6582" x2="3.75054" y2="8.57764" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1A22FF" />
          <stop offset="0.510417" stopColor="#5E41FE" />
          <stop offset="1" stopColor="#A05FFE" />
        </linearGradient>
      </defs>
    </svg>
  );
};