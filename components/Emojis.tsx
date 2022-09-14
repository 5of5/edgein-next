export type EmojiProps = {
	className?: string;
	title?: string;
};

export const EmojiHot: React.FC<EmojiProps> = ({ className, title }) => {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<title>{title ? title : "Hot"}</title>
			<path
				d="M22.0418 13.9791C22.0418 19.5135 17.5553 24 12.0209 24C6.4865 24 2 19.5135 2 13.9791C2 11.2698 2.9682 7.25012 7.08306 3.28049C4.56573 9.38016 12.9891 7.25012 8.48695 0.0370132C15.8937 -0.640725 16.2326 8.21832 18.6047 7.83104C19.234 7.6858 19.3308 7.00806 18.9919 5.89463C20.7831 7.92786 22.0418 11.6748 22.0418 13.9791Z"
				fill="url(#paint0_linear_2575_570)"
			/>
			<g opacity="0.3" filter="url(#filter0_f_2575_570)">
				<path
					d="M21.0041 14.4495C21.0041 16.4191 20.1131 19.3618 16.6758 21.6883C19.7117 16.3038 17.6581 11.5548 16.6758 8.32715C18.8429 10.6324 19.2272 8.13843 19.7117 9.22102C20.5146 11.0146 21.0041 13.0125 21.0041 14.4495Z"
					fill="white"
				/>
			</g>
			<mask
				id="mask0_2575_570"
				style={{ maskType: "alpha" }}
				maskUnits="userSpaceOnUse"
				x="2"
				y="0"
				width="21"
				height="24"
			>
				<path
					d="M22.0418 13.9791C22.0418 19.5135 17.5553 24 12.0209 24C6.4865 24 2 19.5135 2 13.9791C2 11.2698 2.9682 7.25012 7.08306 3.28049C4.56573 9.38016 12.9891 7.25012 8.48695 0.0370132C15.8937 -0.640725 16.2326 8.21832 18.6047 7.83104C19.234 7.6858 19.3308 7.00806 18.9919 5.89463C20.7831 7.92786 22.0418 11.6748 22.0418 13.9791Z"
					fill="#CE4225"
				/>
			</mask>
			<g mask="url(#mask0_2575_570)">
				<path
					d="M17.9517 18.9289C17.9517 22.2109 15.291 24.8715 12.009 24.8715C8.72701 24.8715 6.06641 22.2109 6.06641 18.9289C6.06641 17.3222 6.64057 14.9384 9.08078 12.5843C7.58795 16.2016 12.5832 14.9384 9.91332 10.6609C14.3057 10.259 14.5067 15.5126 15.9134 15.2829C16.2866 15.1968 16.344 14.7949 16.143 14.1346C17.2052 15.3403 17.9517 17.5623 17.9517 18.9289Z"
					fill="#EB9C3B"
				/>
				<path
					d="M17.9517 18.9289C17.9517 22.2109 15.291 24.8715 12.009 24.8715C8.72701 24.8715 6.06641 22.2109 6.06641 18.9289C6.06641 17.3222 6.64057 14.9384 9.08078 12.5843C7.58795 16.2016 12.5832 14.9384 9.91332 10.6609C14.3057 10.259 14.5067 15.5126 15.9134 15.2829C16.2866 15.1968 16.344 14.7949 16.143 14.1346C17.2052 15.3403 17.9517 17.5623 17.9517 18.9289Z"
					fill="url(#paint1_linear_2575_570)"
				/>
				<path
					d="M8.77707 21.4635C8.77707 23.2816 10.2509 24.7554 12.069 24.7554C13.887 24.7554 15.3608 23.2816 15.3608 21.4635C15.3608 20.5735 15.0428 19.253 13.691 17.949C14.518 19.9527 11.7509 19.253 13.2299 16.8835C10.7967 16.6609 10.6854 19.5711 9.90617 19.4439C9.69943 19.3961 9.66763 19.1735 9.77895 18.8077C9.19054 19.4757 8.77707 20.7065 8.77707 21.4635Z"
					fill="#FADF4B"
				/>
			</g>
			<defs>
				<filter
					id="filter0_f_2575_570"
					x="15.3585"
					y="7.00985"
					width="6.96272"
					height="15.9957"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="BackgroundImageFix"
						result="shape"
					/>
					<feGaussianBlur
						stdDeviation="0.65865"
						result="effect1_foregroundBlur_2575_570"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_2575_570"
					x1="12.0209"
					y1="0"
					x2="12.0209"
					y2="24"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#C6381B" />
					<stop offset="1" stopColor="#E04221" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_2575_570"
					x1="12.009"
					y1="10.6389"
					x2="12.009"
					y2="24.8715"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#F8DC4B" />
					<stop offset="1" stopColor="#E77B36" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export const EmojiLike: React.FC<EmojiProps> = ({ className, title }) => {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<title>{title ? title : "Like"}</title>
			<path
				d="M10.4828 0.566491L6.07422 8.71957V22.7885C10.7891 23.6667 17.1218 25.0072 19.7565 22.7885C21.7904 20.8008 23.1019 18.3972 23.5469 14.1446C23.9629 9.9844 23.4083 7.44208 20.3112 7.44208H12.9616C13.581 5.58398 15.5553 2.15924 11.3874 0.247725C11.0519 0.0938274 10.6583 0.241759 10.4828 0.566491Z"
				fill="url(#paint0_radial_2575_577)"
			/>
			<g opacity="0.4" filter="url(#filter0_f_2575_577)">
				<path
					d="M22.1143 13.9111C22.1143 10.398 22.1605 8.4104 19.0635 8.4104C20.404 13.4488 19.7568 17.7477 14.7646 22.971C16.0589 22.971 17.0296 22.8323 18.0003 22.6012C20.7276 19.8278 22.1143 16.6383 22.1143 13.9111Z"
					fill="white"
				/>
			</g>
			<path
				d="M1 9.05187C1 8.78996 1.21232 8.57764 1.47423 8.57764H5.932C6.19391 8.57764 6.40624 8.78996 6.40624 9.05187V21.951C6.40624 22.8938 5.64188 23.6582 4.699 23.6582H1.47423C1.21232 23.6582 1 23.4459 1 23.184V9.05187Z"
				fill="url(#paint1_linear_2575_577)"
			/>
			<defs>
				<filter
					id="filter0_f_2575_577"
					x="13.4704"
					y="7.11613"
					width="9.93816"
					height="17.1491"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
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
					id="paint0_radial_2575_577"
					cx="0"
					cy="0"
					r="1"
					gradientUnits="userSpaceOnUse"
					gradientTransform="translate(17.1218 11.0938) rotate(138.879) scale(15.4629 16.6974)"
				>
					<stop stopColor="#FADF4B" />
					<stop offset="0.489583" stopColor="#F8DC4B" />
					<stop offset="0.833333" stopColor="#FCA237" />
				</radialGradient>
				<linearGradient
					id="paint1_linear_2575_577"
					x1="3.75054"
					y1="23.6582"
					x2="3.75054"
					y2="8.57764"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#1A22FF" />
					<stop offset="0.510417" stopColor="#5E41FE" />
					<stop offset="1" stopColor="#A05FFE" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export const EmojiCrap: React.FC<EmojiProps> = ({ className, title }) => {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<title>{title ? title : "Sh**"}</title>
			<path
				d="M20.7182 17.0826C24.3332 16.708 25.3761 21.5435 21.7258 22.8709C14.8993 24.9568 14.0459 22.9657 8.12012 23.0605C15.3259 22.065 18.4074 19.8843 20.7182 17.0826Z"
				fill="url(#paint0_linear_2575_601)"
			/>
			<path
				d="M0.155768 21.3065C-0.389019 19.6115 0.487619 17.0399 2.90534 17.0399C12.197 17.0399 15.5629 14.3851 18.1229 12.0148C19.7821 11.92 20.3672 12.4055 21.0621 13.4844C21.4285 14.0533 21.9154 16.0918 20.0192 17.988C14.8518 23.582 7.07714 22.6813 4.28015 23.7716C2.5261 24.3375 0.700555 23.0015 0.155768 21.3065Z"
				fill="url(#paint1_linear_2575_601)"
			/>
			<path
				d="M2.66797 14.954C2.66796 13.9585 3.71091 11.92 5.70199 11.7303C10.1108 11.1141 13.1448 9.9763 15.4678 8.12744C16.89 8.31707 17.364 8.83854 17.9803 9.50223C18.407 10.0711 18.7388 11.1141 18.1699 12.0622C13.4767 17.0873 7.07679 16.9925 3.5213 17.0873C3.04723 17.0999 2.66797 15.9495 2.66797 14.954Z"
				fill="url(#paint2_linear_2575_601)"
			/>
			<path
				d="M8.54676 6.42077C10.3008 5.85189 12.5289 5.04598 13.8089 3.62378C15.2311 4.80894 16.2266 6.6578 15.5155 8.17481C11.2963 11.2088 8.64157 11.2088 5.56014 11.7777C4.99126 10.877 4.51719 7.51112 8.54676 6.42077Z"
				fill="url(#paint3_linear_2575_601)"
			/>
			<path
				d="M9.13933 1.37105C9.06445 1.13916 9.20502 0.943396 9.43795 1.01499C10.2976 1.27921 12.1403 2.10342 13.809 3.62377C12.529 5.18818 9.49496 6.18373 8.54682 6.46817C7.46487 3.94361 10.0269 4.11988 9.13933 1.37105Z"
				fill="url(#paint4_linear_2575_601)"
			/>
			<ellipse
				cx="15.0418"
				cy="13.911"
				rx="2.51255"
				ry="3.08143"
				fill="url(#paint5_linear_2575_601)"
			/>
			<ellipse
				cx="15.0412"
				cy="13.911"
				rx="1.27998"
				ry="1.75405"
				fill="black"
			/>
			<path
				d="M14.9937 12.9155C14.0322 12.9155 13.0975 13.1999 12.543 13.5792C12.6779 12.0334 13.7449 10.8296 15.0411 10.8296C16.3415 10.8296 17.4112 12.0412 17.5405 13.5941C16.7478 13.1525 15.9428 12.9155 14.9937 12.9155Z"
				fill="#764523"
			/>
			<ellipse
				cx="8.5941"
				cy="13.911"
				rx="2.51255"
				ry="3.08143"
				fill="url(#paint6_linear_2575_601)"
			/>
			<ellipse
				cx="8.59394"
				cy="13.911"
				rx="1.27998"
				ry="1.75405"
				fill="black"
			/>
			<path
				d="M8.54645 12.9155C7.5849 12.9155 6.65018 13.1999 6.0957 13.5792C6.23066 12.0334 7.29763 10.8296 8.59386 10.8296C9.89425 10.8296 10.9639 12.0412 11.0933 13.5941C10.3005 13.1525 9.49557 12.9155 8.54645 12.9155Z"
				fill="#764523"
			/>
			<path
				d="M15.7527 20.1214C15.4208 20.548 13.9486 19.5999 11.7231 19.5999C9.49765 19.5999 7.97799 20.548 7.69355 20.1214C7.40911 19.6947 9.49765 18.2251 11.7231 18.2251C13.9486 18.2251 16.0845 19.6947 15.7527 20.1214Z"
				fill="white"
			/>
			<defs>
				<linearGradient
					id="paint0_linear_2575_601"
					x1="20.3984"
					y1="22.4443"
					x2="18.0755"
					y2="19.8843"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#7A4921" />
					<stop offset="1" stopColor="#9C6531" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_2575_601"
					x1="12.6711"
					y1="21.6857"
					x2="10.5408"
					y2="16.3941"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#7A4921" />
					<stop offset="1" stopColor="#9C6531" />
				</linearGradient>
				<linearGradient
					id="paint2_linear_2575_601"
					x1="11.847"
					y1="15.5757"
					x2="10.1417"
					y2="11.3971"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#7A4921" />
					<stop offset="1" stopColor="#9C6531" />
				</linearGradient>
				<linearGradient
					id="paint3_linear_2575_601"
					x1="11.2593"
					y1="10.1309"
					x2="9.6267"
					y2="6.39654"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#7A4921" />
					<stop offset="1" stopColor="#9C6531" />
				</linearGradient>
				<linearGradient
					id="paint4_linear_2575_601"
					x1="11.012"
					y1="5.1882"
					x2="9.51355"
					y2="1.98495"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#804F26" />
					<stop offset="1" stopColor="#9C6531" />
				</linearGradient>
				<linearGradient
					id="paint5_linear_2575_601"
					x1="15.0893"
					y1="12.9155"
					x2="15.0418"
					y2="16.9925"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#FBD5B3" />
					<stop offset="1" stopColor="#FEFEFE" />
				</linearGradient>
				<linearGradient
					id="paint6_linear_2575_601"
					x1="8.6415"
					y1="12.9155"
					x2="8.5941"
					y2="16.9925"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#FBD5B3" />
					<stop offset="1" stopColor="#FEFEFE" />
				</linearGradient>
			</defs>
		</svg>
	);
};
