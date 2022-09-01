export type IconProps = {
	className?: string;
	title?: string;
};

export const IconSpinner: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			fill="none"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<title>{title ? title : "Loading"}</title>
			<circle
				className="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="4"
			></circle>
			<path
				className="opacity-75 ring-4 ring-primary-500"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			></path>
		</svg>
	);
};

export const IconArrowUp: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={3}
		>
			<title>{title ? title : "Arrow Up"}</title>
			<path
				d="M12 3V21M4.5 10.5L12 3L4.5 10.5ZM12 3L19.5 10.5L12 3Z"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export const IconArrowDown: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={3}
		>
			<title>{title ? title : "Arrow Down"}</title>
			<path
				d="M12 21V3M4.5 13.5L12 21L4.5 13.5ZM12 21L19.5 13.5L12 21Z"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export const IconCurrencyDollar: React.FC<IconProps> = ({
	className,
	title,
}) => {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
		>
			<title>{title ? title : "Currency Dollar"}</title>
			<path
				d="M12 8C10.343 8 9 8.895 9 10C9 11.105 10.343 12 12 12C13.657 12 15 12.895 15 14C15 15.105 13.657 16 12 16V8ZM12 8C13.11 8 14.08 8.402 14.599 9L12 8ZM12 8V7V8ZM12 8V16V8ZM12 16V17V16ZM12 16C10.89 16 9.92 15.598 9.401 15L12 16ZM21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export const IconQuestionMarkCircle: React.FC<IconProps> = ({
	className,
	title,
}) => {
	return (
		<svg className={className} viewBox="0 0 20 20" fill="currentColor">
			<title>{title ? title : "Question Mark Circle"}</title>
			<path
				fillRule="evenodd"
				d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
				clipRule="evenodd"
			/>
		</svg>
	);
};

export const IconChartUp: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			fill="currentColor"
			viewBox="0 0 20 20"
			aria-hidden="true"
		>
			<title>{title ? title : "Chart Up"}</title>
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

export const IconBadgeCheck: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			fill="currentColor"
			viewBox="0 0 20 20"
			aria-hidden="true"
		>
			<title>{title ? title : "Badge Check"}</title>
			<path
				fillRule="evenodd"
				d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
				clipRule="evenodd"
			/>
		</svg>
	);
};

export const IconMinus: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={`${className}`}
			stroke="currentColor"
			strokeWidth="2"
		>
			<title>{title ? title : "Minus"}</title>
			<path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
		</svg>
	);
};
export const IconAnnotation: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={`${className}`}
			stroke="currentColor"
			strokeWidth="2"
		>
			<title>{title ? title : "Annotation"}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
			/>
		</svg>
	);
};

export const IconSelector: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={`${className}`}
			stroke="currentColor"
			strokeWidth="2"
		>
			<title>{title ? title : "Selector"}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M8 9l4-4 4 4m0 6l-4 4-4-4"
			/>
		</svg>
	);
};

export const IconCheck: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={`${className}`}
			stroke="currentColor"
			strokeWidth="2"
		>
			<title>{title ? title : "Check"}</title>
			<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
		</svg>
	);
};

export const IconSearch: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
		>
			<title>{title ? title : "Search"}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
			/>
		</svg>
	);
};

export const IconGrid: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			viewBox="0 0 20 20"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
			className={`${className}`}
		>
			<title>{title ? title : "Grid"}</title>
			<path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
		</svg>
	);
};

export const IconList: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			viewBox="0 0 20 20"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
			className={`${className}`}
		>
			<title>{title ? title : "List"}</title>
			<path
				fillRule="evenodd"
				d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
				clipRule="evenodd"
			/>
		</svg>
	);
};

export const IconCash: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth="2"
		>
			<title>{title ? title : "Cash"}</title>
			<path d="M15 5V3C15 2.46957 14.7893 1.96086 14.4142 1.58579C14.0391 1.21071 13.5304 1 13 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V9C1 9.53043 1.21071 10.0391 1.58579 10.4142C1.96086 10.7893 2.46957 11 3 11H5M7 15H17C17.5304 15 18.0391 14.7893 18.4142 14.4142C18.7893 14.0391 19 13.5304 19 13V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V13C5 13.5304 5.21071 14.0391 5.58579 14.4142C5.96086 14.7893 6.46957 15 7 15ZM14 10C14 10.5304 13.7893 11.0391 13.4142 11.4142C13.0391 11.7893 12.5304 12 12 12C11.4696 12 10.9609 11.7893 10.5858 11.4142C10.2107 11.0391 10 10.5304 10 10C10 9.46957 10.2107 8.96086 10.5858 8.58579C10.9609 8.21071 11.4696 8 12 8C12.5304 8 13.0391 8.21071 13.4142 8.58579C13.7893 8.96086 14 9.46957 14 10Z" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
};

export const IconDocumentDownload: React.FC<IconProps> = ({
	className,
	title,
}) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<title>{title ? title : "Document Download"}</title>
			<path d="M8 8V14V8ZM8 14L5 11L8 14ZM8 14L11 11L8 14ZM13 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H8.586C8.8512 1.00006 9.10551 1.10545 9.293 1.293L14.707 6.707C14.8946 6.89449 14.9999 7.1488 15 7.414V17C15 17.5304 14.7893 18.0391 14.4142 18.4142C14.0391 18.7893 13.5304 19 13 19Z" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
};

export const IconUsers: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth="2"
		>
			<title>{title ? title : "Users"}</title>
			<path d="M10 2.354C10.5374 1.7447 11.2477 1.31351 12.0362 1.11779C12.8247 0.922079 13.6542 0.971124 14.4142 1.2584C15.1741 1.54568 15.8286 2.05757 16.2905 2.72596C16.7524 3.39435 16.9998 4.18754 16.9998 5C16.9998 5.81246 16.7524 6.60565 16.2905 7.27404C15.8286 7.94243 15.1741 8.45432 14.4142 8.7416C13.6542 9.02888 12.8247 9.07792 12.0362 8.88221C11.2477 8.68649 10.5374 8.2553 10 7.646M13 19H1V18C1 16.4087 1.63214 14.8826 2.75736 13.7574C3.88258 12.6321 5.4087 12 7 12C8.5913 12 10.1174 12.6321 11.2426 13.7574C12.3679 14.8826 13 16.4087 13 18V19ZM13 19H19V18C19.0001 16.9467 18.723 15.9119 18.1965 14.9997C17.6699 14.0875 16.9125 13.3299 16.0004 12.8032C15.0882 12.2765 14.0535 11.9992 13.0002 11.9992C11.9469 11.9991 10.9122 12.2764 10 12.803M11 5C11 6.06087 10.5786 7.07828 9.82843 7.82843C9.07828 8.57857 8.06087 9 7 9C5.93913 9 4.92172 8.57857 4.17157 7.82843C3.42143 7.07828 3 6.06087 3 5C3 3.93913 3.42143 2.92172 4.17157 2.17157C4.92172 1.42143 5.93913 1 7 1C8.06087 1 9.07828 1.42143 9.82843 2.17157C10.5786 2.92172 11 3.93913 11 5Z" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
};

export const IconUserCircle: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			viewBox="0 0 24 24"
		>
			<title>{title ? title : "User"}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	);
};

export const IconUserCircleSolid: React.FC<IconProps> = ({
	className,
	title,
}) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			viewBox="0 0 20 20"
		>
			<title>{title ? title : "User"}</title>
			<path
				fillRule="evenodd"
				d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
				clipRule="evenodd"
			/>
		</svg>
	);
};

export const IconFlag: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth="2"
		>
			<title>{title ? title : "Flag"}</title>
			<path d="M10 1.5V7M1 19V15V19ZM1 15V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H9.5L10.5 2H19L16 8L19 14H10.5L9.5 13H3C2.46957 13 1.96086 13.2107 1.58579 13.5858C1.21071 13.9609 1 14.4696 1 15V15Z" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
};

export const IconLinkedIn: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			fill="none"
			viewBox="0 0 20 20"
			aria-hidden="true"
		>
			<title>{title ? title : "LinkedIn"}</title>
			<path d="M17.4628 0H2.2247C0.910417 0 -0.15625 1.06667 -0.15625 2.38095V17.619C-0.15625 18.9333 0.910417 20 2.2247 20H17.4628C18.7771 20 19.8438 18.9333 19.8438 17.619V2.38095C19.8438 1.06667 18.7771 0 17.4628 0ZM6.03423 7.61905V16.6667H3.17708V7.61905H6.03423ZM3.17708 4.98571C3.17708 4.31905 3.74851 3.80952 4.60565 3.80952C5.4628 3.80952 6.00089 4.31905 6.03423 4.98571C6.03423 5.65238 5.50089 6.19048 4.60565 6.19048C3.74851 6.19048 3.17708 5.65238 3.17708 4.98571ZM16.5104 16.6667H13.6533C13.6533 16.6667 13.6533 12.2571 13.6533 11.9048C13.6533 10.9524 13.1771 10 11.9866 9.98095H11.9485C10.7961 9.98095 10.3199 10.9619 10.3199 11.9048C10.3199 12.3381 10.3199 16.6667 10.3199 16.6667H7.4628V7.61905H10.3199V8.83809C10.3199 8.83809 11.239 7.61905 13.0866 7.61905C14.9771 7.61905 16.5104 8.91905 16.5104 11.5524V16.6667Z" fill="#64748B" />
		</svg>
	);
};

export const IconLinkedInColored: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			fill="none"
			viewBox="0 0 20 20"
			aria-hidden="true"
		>
			<title>{title ? title : "LinkedIn"}</title>
			<path fillRule="evenodd" clipRule="evenodd" d="M16.6963 0.5H1.35686C0.623143 0.5 0 1.08029 0 1.79514V17.204C0 17.9197 0.408857 18.5 1.14257 18.5H16.482C17.2166 18.5 18 17.9197 18 17.204V1.79514C18 1.08029 17.4309 0.5 16.6963 0.5ZM6.85714 7.35714H9.28029V8.59229H9.30686C9.67629 7.92629 10.7674 7.25 12.1166 7.25C14.706 7.25 15.4286 8.62486 15.4286 11.1714V15.9286H12.8571V11.6403C12.8571 10.5003 12.402 9.5 11.3374 9.5C10.0449 9.5 9.42857 10.3751 9.42857 11.8117V15.9286H6.85714V7.35714ZM2.57143 15.9286H5.14286V7.35714H2.57143V15.9286ZM5.46429 4.35714C5.46429 5.24514 4.74514 5.96429 3.85714 5.96429C2.96914 5.96429 2.25 5.24514 2.25 4.35714C2.25 3.46914 2.96914 2.75 3.85714 2.75C4.74514 2.75 5.46429 3.46914 5.46429 4.35714Z" fill="#0077B5" />
		</svg>
	);
};

export const IconGithub: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			fill="none"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<title>{title ? title : "Github"}</title>
			<path fillRule="evenodd" clipRule="evenodd" d="M19 2.95825C19.009 3.56525 18.933 4.32625 18.866 4.88125C18.8448 5.0646 18.8114 5.24634 18.766 5.42525C19.622 7.01025 20 8.91725 20 11.0003C20 13.4683 18.813 15.5013 16.964 16.8873C15.132 18.2603 12.66 19.0003 10 19.0003C7.34 19.0003 4.868 18.2603 3.036 16.8873C1.187 15.5013 0 13.4683 0 11.0003C0 8.91725 0.377 7.01025 1.235 5.42525C1.18965 5.24634 1.15625 5.0646 1.135 4.88125C1.066 4.32625 0.99 3.56525 1 2.95825C1.01 2.27525 1.1 1.59225 1.199 0.914254C1.245 0.600254 1.317 0.305254 1.658 0.119254C2.006 -0.0707462 2.372 -0.000746153 2.733 0.102254C3.951 0.447254 5.093 0.932254 6.167 1.51225C7.3 1.17325 8.578 1.00025 10 1.00025C11.422 1.00025 12.7 1.17325 13.832 1.51325C14.9211 0.917858 16.0728 0.444973 17.266 0.103254C17.627 0.000253774 17.994 -0.0707462 18.341 0.119254C18.681 0.305254 18.754 0.600254 18.801 0.914254C18.899 1.59225 18.989 2.27525 18.999 2.95825H19ZM18 11.0003C18 9.31325 17.612 7.00025 15.5 7.00025C14.548 7.00025 13.647 7.25025 12.747 7.50025C11.848 7.75025 10.95 8.00025 10 8.00025C9.05 8.00025 8.152 7.75025 7.253 7.50025C6.353 7.25025 5.453 7.00025 4.5 7.00025C2.394 7.00025 2 9.32025 2 11.0003C2 12.7643 2.827 14.2313 4.236 15.2873C5.66 16.3563 7.69 17.0003 10 17.0003C12.31 17.0003 14.339 16.3553 15.764 15.2873C17.173 14.2303 18 12.7643 18 11.0003ZM8 11.5003C8 12.8803 7.328 14.0003 6.5 14.0003C5.672 14.0003 5 12.8803 5 11.5003C5 10.1203 5.672 9.00025 6.5 9.00025C7.328 9.00025 8 10.1203 8 11.5003ZM13.5 14.0003C14.328 14.0003 15 12.8803 15 11.5003C15 10.1203 14.328 9.00025 13.5 9.00025C12.672 9.00025 12 10.1203 12 11.5003C12 12.8803 12.672 14.0003 13.5 14.0003Z" fill="#64748B" />
		</svg>
	);
};

export const IconTwitter: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			fill="none"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<title>{title ? title : "Twitter"}</title>
			<path d="M6.29 16.2534C13.837 16.2534 17.965 10.0004 17.965 4.5784C17.965 4.4004 17.965 4.2234 17.953 4.0484C18.7562 3.46693 19.4493 2.74701 20 1.9224C19.2511 2.2544 18.4566 2.47216 17.643 2.5684C18.4996 2.05546 19.1408 1.24875 19.447 0.298398C18.6417 0.776285 17.7607 1.11313 16.842 1.2944C16.2234 0.636164 15.405 0.200233 14.5136 0.054103C13.6222 -0.0920265 12.7075 0.0597976 11.9111 0.486067C11.1147 0.912337 10.4811 1.58927 10.1083 2.41206C9.7355 3.23485 9.64437 4.15758 9.849 5.0374C8.21759 4.95564 6.6216 4.53172 5.16465 3.79317C3.70769 3.05461 2.42233 2.01792 1.392 0.750398C0.867318 1.6536 0.706589 2.72282 0.942536 3.74036C1.17848 4.75791 1.79337 5.64728 2.662 6.2274C2.00926 6.20846 1.37065 6.03286 0.8 5.7154V5.7674C0.800389 6.71469 1.1284 7.6327 1.7284 8.36576C2.3284 9.09881 3.16347 9.60179 4.092 9.7894C3.48781 9.95411 2.85389 9.97806 2.239 9.8594C2.50116 10.6749 3.01168 11.388 3.69913 11.899C4.38658 12.41 5.21657 12.6934 6.073 12.7094C5.22212 13.378 4.24779 13.8722 3.20573 14.1639C2.16367 14.4556 1.07432 14.539 0 14.4094C1.8766 15.6137 4.06019 16.2525 6.29 16.2494" fill="#64748B" />
		</svg>
	);
};

export const IconBriefcase: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			fill="none"
			viewBox="0 0 24 24"
			aria-hidden="true"
			stroke="currentColor"
			strokeWidth="2"
		>
			<title>{title ? title : "Briefcase"}</title>
			<path d="M19 12.255C16.1405 13.4112 13.0844 14.0038 10 14C6.817 14 3.78 13.38 1 12.255M10 11H10.01M14 5V3C14 2.46957 13.7893 1.96086 13.4142 1.58579C13.0391 1.21071 12.5304 1 12 1H8C7.46957 1 6.96086 1.21071 6.58579 1.58579C6.21071 1.96086 6 2.46957 6 3V5H14ZM3 19H17C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H3C2.46957 5 1.96086 5.21071 1.58579 5.58579C1.21071 5.96086 1 6.46957 1 7V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19Z" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
};

export const IconRole: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<title>{title ? title : "Role"}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
			/>
		</svg>
	);
};

export const IconLink: React.FC<IconProps> = ({ className, title }) => {
	return (

		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			viewBox="0 0 20 20"
			fill="none"
		>
			<title>{title ? title : "Link"}</title>
			<path
				d="M19 10C19 12.3869 18.0518 14.6761 16.364 16.364C14.6761 18.0518 12.3869 19 10 19M19 10C19 7.61305 18.0518 5.32387 16.364 3.63604C14.6761 1.94821 12.3869 1 10 1M19 10H1M10 19C7.61305 19 5.32387 18.0518 3.63604 16.364C1.94821 14.6761 1 12.3869 1 10M10 19C11.657 19 13 14.97 13 10C13 5.03 11.657 1 10 1M10 19C8.343 19 7 14.97 7 10C7 5.03 8.343 1 10 1M10 1C7.61305 1 5.32387 1.94821 3.63604 3.63604C1.94821 5.32387 1 7.61305 1 10" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
			/>
		</svg>
	);
};

export const IconEmail: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<title>{title ? title : "Email"}</title>
			<path d="M1 3.82353L8.01333 8.77412C8.30548 8.9805 8.6488 9.09063 9 9.09063C9.3512 9.09063 9.69452 8.9805 9.98667 8.77412L17 3.82353M2.77778 14.1765H15.2222C15.6937 14.1765 16.1459 13.9782 16.4793 13.6251C16.8127 13.2721 17 12.7933 17 12.2941V2.88235C17 2.38312 16.8127 1.90434 16.4793 1.55133C16.1459 1.19832 15.6937 1 15.2222 1H2.77778C2.30628 1 1.8541 1.19832 1.5207 1.55133C1.1873 1.90434 1 2.38312 1 2.88235V12.2941C1 12.7933 1.1873 13.2721 1.5207 13.6251C1.8541 13.9782 2.30628 14.1765 2.77778 14.1765Z" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
};

export const IconCompanies: React.FC<IconProps> = ({
	className,
	title = "Companies",
}) => {
	return (
		<svg
			className={className}
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<title>{title ? title : "Companies"}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
			/>
		</svg>
	);
};

export const IconPaperAirplane: React.FC<IconProps> = ({
	className,
	title,
}) => {
	return (
		<svg
			className={className}
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<title>{title ? title : "Paper Plane"}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
			/>
		</svg>
	);
};

export const IconChevronLeft: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={2}
		>
			<title>{title ? title : "Left"}</title>
			<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
		</svg>
	);
};

export const IconChevronRight: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={2}
		>
			<title>{title ? title : "Right"}</title>
			<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
		</svg>
	);
};

export const IconChevronDown: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={2}
		>
			<title>{title ? title : "Down"}</title>
			<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
		</svg>
	);
};

export const IconChevronUp: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={2}
		>
			<title>{title ? title : "Down"}</title>
			<path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
		</svg>
	);
};

export const IconHome: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={2}
		>
			<title>{title ? title : "Home"}</title>

			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
			/>
		</svg>
	);
};

export const IconSignOut: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={2}
		>
			<title>{title ? title : "Sign out"}</title>

			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
			/>
		</svg>
	);
};

export const IconX: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={2}
		>
			<title>{title ? title : "Sign out"}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M6 18L18 6M6 6l12 12"
			/>
		</svg>
	);
};

export const IconLocation: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			width={24}
			height={24}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			stroke="currentColor"
			strokeWidth="2"
		>
			<title>{title ? title : "Cash"}</title>
			<path d="M14.2982 14.298L10.1667 18.4295C9.98602 18.6104 9.77146 18.7538 9.53529 18.8517C9.29913 18.9496 9.04598 19 8.79033 19C8.53468 19 8.28154 18.9496 8.04537 18.8517C7.80921 18.7538 7.59465 18.6104 7.41397 18.4295L3.28145 14.298C2.19206 13.2085 1.45019 11.8205 1.14965 10.3094C0.849114 8.79835 1.0034 7.23209 1.59301 5.80871C2.18261 4.38532 3.18106 3.16874 4.46208 2.3128C5.74311 1.45686 7.24918 1 8.78985 1C10.3305 1 11.8366 1.45686 13.1176 2.3128C14.3986 3.16874 15.3971 4.38532 15.9867 5.80871C16.5763 7.23209 16.7306 8.79835 16.43 10.3094C16.1295 11.8205 15.3876 13.2085 14.2982 14.298V14.298Z" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M11.711 8.7896C11.711 9.56435 11.4033 10.3074 10.8554 10.8552C10.3076 11.403 9.56459 11.7108 8.78984 11.7108C8.0151 11.7108 7.27208 11.403 6.72425 10.8552C6.17642 10.3074 5.86865 9.56435 5.86865 8.7896C5.86865 8.01485 6.17642 7.27183 6.72425 6.724C7.27208 6.17618 8.0151 5.86841 8.78984 5.86841C9.56459 5.86841 10.3076 6.17618 10.8554 6.724C11.4033 7.27183 11.711 8.01485 11.711 8.7896V8.7896Z" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
};

export const IconEditPencil: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="2"
		>
			<title>{title ? title : "Edit"}</title>
			<path fillRule="evenodd" clipRule="evenodd" d="M12.7573 0.87003C13.3146 0.31295 14.0703 0 14.8582 0C15.6462 0 16.4019 0.31295 16.9591 0.87003L17.1295 1.0404C17.6865 1.59765 17.9995 2.35334 17.9995 3.14129C17.9995 3.92923 17.6865 4.68492 17.1295 5.24217L15.4089 6.96468L5.65334 16.7193C5.52654 16.8461 5.36769 16.9362 5.19374 16.9798L1.23167 17.9703C1.06567 18.0119 0.891738 18.0098 0.726814 17.9641C0.561891 17.9185 0.411606 17.8309 0.290604 17.7099C0.169602 17.5889 0.0820125 17.4386 0.0363708 17.2737C-0.00927096 17.1087 -0.0114076 16.9348 0.0301691 16.7688L1.02069 12.8068C1.06431 12.6328 1.15435 12.4739 1.28119 12.3472L11.0933 2.53509L12.7573 0.87102V0.87003ZM15.5585 2.27062C15.3728 2.08493 15.1209 1.98061 14.8582 1.98061C14.5956 1.98061 14.3437 2.08493 14.1579 2.27062L13.1813 3.24727L14.7215 4.84894L15.7289 3.84158C15.9146 3.65583 16.0189 3.40394 16.0189 3.14129C16.0189 2.87864 15.9146 2.62674 15.7289 2.44099L15.5585 2.27062ZM13.3199 6.24953L11.7797 4.64885L2.87592 13.5536L2.35194 15.6476L4.44689 15.1236L13.3209 6.24953H13.3199Z" fill="#475569" />
		</svg>
	);
};

export const IconEventDot: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			width="8"
			height="8"
			viewBox="0 0 8 8"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<circle cx="4" cy="4" r="4" fill="#C6C8FF" />
		</svg>
	);
};

export const IconEventLine: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="2"
			height="460"
		>
			<title>{title ? title : "Line"}</title>
			<path d="M0.5 0L0.5 460" stroke="#C6C8FF" strokeDasharray="6 6" />
		</svg>
	);
};

export const IconSort: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			width="18" 
			height="16" 
			viewBox="0 0 18 16" 
			fill="none" 
		>
			<title>{title ? title : "Sort"}</title>
			<path fillRule="evenodd" clipRule="evenodd" d="M4.4917 1.69645C4.4917 1.45761 4.39682 1.22855 4.22793 1.05966C4.05905 0.890778 3.82999 0.795898 3.59115 0.795898C3.35231 0.795898 3.12325 0.890778 2.95436 1.05966C2.78547 1.22855 2.69059 1.45761 2.69059 1.69645V12.1303L1.52618 10.9658C1.35633 10.8018 1.12885 10.711 0.892728 10.7131C0.656606 10.7151 0.430736 10.8098 0.263766 10.9768C0.0967961 11.1438 0.00208588 11.3697 3.40433e-05 11.6058C-0.00201779 11.8419 0.0887529 12.0694 0.252796 12.2392L2.95446 14.9409C3.12333 15.1097 3.35235 15.2046 3.59115 15.2046C3.82994 15.2046 4.05896 15.1097 4.22784 14.9409L6.9295 12.2392C7.09354 12.0694 7.18431 11.8419 7.18226 11.6058C7.18021 11.3697 7.0855 11.1438 6.91853 10.9768C6.75156 10.8098 6.52569 10.7151 6.28957 10.7131C6.05344 10.711 5.82596 10.8018 5.65612 10.9658L4.4917 12.1303V1.69645ZM9.89502 2.59701C9.65618 2.59701 9.42712 2.69188 9.25823 2.86077C9.08935 3.02966 8.99447 3.25872 8.99447 3.49756C8.99447 3.7364 9.08935 3.96546 9.25823 4.13435C9.42712 4.30323 9.65618 4.39811 9.89502 4.39811H17.0994C17.3383 4.39811 17.5673 4.30323 17.7362 4.13435C17.9051 3.96546 18 3.7364 18 3.49756C18 3.25872 17.9051 3.02966 17.7362 2.86077C17.5673 2.69188 17.3383 2.59701 17.0994 2.59701H9.89502ZM9.89502 7.09977C9.65618 7.09977 9.42712 7.19465 9.25823 7.36354C9.08935 7.53242 8.99447 7.76148 8.99447 8.00033C8.99447 8.23917 9.08935 8.46823 9.25823 8.63711C9.42712 8.806 9.65618 8.90088 9.89502 8.90088H13.4972C13.7361 8.90088 13.9651 8.806 14.134 8.63711C14.3029 8.46823 14.3978 8.23917 14.3978 8.00033C14.3978 7.76148 14.3029 7.53242 14.134 7.36354C13.9651 7.19465 13.7361 7.09977 13.4972 7.09977H9.89502ZM9.89502 11.6025C9.65618 11.6025 9.42712 11.6974 9.25823 11.8663C9.08935 12.0352 8.99447 12.2643 8.99447 12.5031C8.99447 12.7419 9.08935 12.971 9.25823 13.1399C9.42712 13.3088 9.65618 13.4036 9.89502 13.4036H10.7956C11.0344 13.4036 11.2635 13.3088 11.4324 13.1399C11.6012 12.971 11.6961 12.7419 11.6961 12.5031C11.6961 12.2643 11.6012 12.0352 11.4324 11.8663C11.2635 11.6974 11.0344 11.6025 10.7956 11.6025H9.89502Z" fill="#0E0067"/>
		</svg>
	);
};

export const IconSave: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<title>{title ? title : "Save"}</title>
			<path d="M20.4258 6.5H16.4258V10.5H14.4258V6.5H10.4258V4.5H14.4258V0.5H16.4258V4.5H20.4258V6.5ZM12.4258 0.5H0.425781V1.5H12.4258V0.5ZM0.425781 5.5H8.42578V4.5H0.425781V5.5ZM0.425781 9.5H8.42578V8.5H0.425781V9.5Z" fill="#475569"/>
		</svg>
	);
};
