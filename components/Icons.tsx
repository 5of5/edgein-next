export type IconProps = {
	className?: string;
	strokeWidth?: number;
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

export const IconArrowUp: React.FC<IconProps> = ({
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
			stroke="currentColor"
		>
			<title>{title ? title : "Arrow Up"}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
			/>
		</svg>
	);
};

export const IconArrowDown: React.FC<IconProps> = ({
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
			stroke="currentColor"
		>
			<title>{title ? title : "Arrow Down"}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
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

export const IconQuestion: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="currentColor">
			<title>{title ? title : "Question"}</title>
			<path d="M11.7804 6.59981C11.4747 6.5995 11.1743 6.68253 10.9095 6.84053C10.6447 6.99853 10.4248 7.22593 10.272 7.49982C10.1616 7.712 10.0112 7.8991 9.82962 8.05002C9.64807 8.20094 9.43907 8.31261 9.21503 8.37842C8.99098 8.44422 8.75645 8.46282 8.52532 8.43311C8.2942 8.4034 8.0712 8.32598 7.86953 8.20545C7.66787 8.08492 7.49165 7.92373 7.35131 7.73143C7.21098 7.53913 7.10939 7.31964 7.05257 7.08597C6.99575 6.8523 6.98486 6.6092 7.02053 6.37109C7.05621 6.13298 7.13773 5.90471 7.26026 5.6998C7.8348 4.67039 8.72158 3.86587 9.7831 3.411C10.8446 2.95614 12.0215 2.87635 13.1314 3.18401C14.2412 3.49167 15.2219 4.16959 15.9213 5.11263C16.6208 6.05567 16.9999 7.21114 17 8.39983C17.0003 9.51696 16.6658 10.6067 16.0427 11.519C15.4195 12.4313 14.5382 13.1213 13.5203 13.4939V13.7999C13.5203 14.2773 13.337 14.7351 13.0107 15.0727C12.6844 15.4103 12.2419 15.5999 11.7804 15.5999C11.319 15.5999 10.8764 15.4103 10.5502 15.0727C10.2239 14.7351 10.0406 14.2773 10.0406 13.7999V11.9999C10.0406 11.5225 10.2239 11.0646 10.5502 10.7271C10.8764 10.3895 11.319 10.1999 11.7804 10.1999C12.2419 10.1999 12.6844 10.0102 13.0107 9.67264C13.337 9.33507 13.5203 8.87723 13.5203 8.39983C13.5203 7.92244 13.337 7.4646 13.0107 7.12703C12.6844 6.78946 12.2419 6.59981 11.7804 6.59981Z" />
			<path d="M11.7804 21C12.2419 21 12.6844 20.8104 13.0107 20.4728C13.337 20.1352 13.5203 19.6774 13.5203 19.2C13.5203 18.7226 13.337 18.2647 13.0107 17.9272C12.6844 17.5896 12.2419 17.4 11.7804 17.4C11.319 17.4 10.8764 17.5896 10.5502 17.9272C10.2239 18.2647 10.0406 18.7226 10.0406 19.2C10.0406 19.6774 10.2239 20.1352 10.5502 20.4728C10.8764 20.8104 11.319 21 11.7804 21Z" />
		</svg>
	);
};

<svg
	width="24"
	height="24"
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M11.7804 6.59981C11.4747 6.5995 11.1743 6.68253 10.9095 6.84053C10.6447 6.99853 10.4248 7.22593 10.272 7.49982C10.1616 7.712 10.0112 7.8991 9.82962 8.05002C9.64807 8.20094 9.43907 8.31261 9.21503 8.37842C8.99098 8.44422 8.75645 8.46282 8.52532 8.43311C8.2942 8.4034 8.0712 8.32598 7.86953 8.20545C7.66787 8.08492 7.49165 7.92373 7.35131 7.73143C7.21098 7.53913 7.10939 7.31964 7.05257 7.08597C6.99575 6.8523 6.98486 6.6092 7.02053 6.37109C7.05621 6.13298 7.13773 5.90471 7.26026 5.6998C7.8348 4.67039 8.72158 3.86587 9.7831 3.411C10.8446 2.95614 12.0215 2.87635 13.1314 3.18401C14.2412 3.49167 15.2219 4.16959 15.9213 5.11263C16.6208 6.05567 16.9999 7.21114 17 8.39983C17.0003 9.51696 16.6658 10.6067 16.0427 11.519C15.4195 12.4313 14.5382 13.1213 13.5203 13.4939V13.7999C13.5203 14.2773 13.337 14.7351 13.0107 15.0727C12.6844 15.4103 12.2419 15.5999 11.7804 15.5999C11.319 15.5999 10.8764 15.4103 10.5502 15.0727C10.2239 14.7351 10.0406 14.2773 10.0406 13.7999V11.9999C10.0406 11.5225 10.2239 11.0646 10.5502 10.7271C10.8764 10.3895 11.319 10.1999 11.7804 10.1999C12.2419 10.1999 12.6844 10.0102 13.0107 9.67264C13.337 9.33507 13.5203 8.87723 13.5203 8.39983C13.5203 7.92244 13.337 7.4646 13.0107 7.12703C12.6844 6.78946 12.2419 6.59981 11.7804 6.59981Z"
		fill="#0E0067"
	/>
	<path
		d="M11.7804 21C12.2419 21 12.6844 20.8104 13.0107 20.4728C13.337 20.1352 13.5203 19.6774 13.5203 19.2C13.5203 18.7226 13.337 18.2647 13.0107 17.9272C12.6844 17.5896 12.2419 17.4 11.7804 17.4C11.319 17.4 10.8764 17.5896 10.5502 17.9272C10.2239 18.2647 10.0406 18.7226 10.0406 19.2C10.0406 19.6774 10.2239 20.1352 10.5502 20.4728C10.8764 20.8104 11.319 21 11.7804 21Z"
		fill="#0E0067"
	/>
</svg>;

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
			strokeWidth={1.5}
		>
			<title>{title ? title : "Cash"}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
			/>

			{/* <path
				d="M15 5V3C15 2.46957 14.7893 1.96086 14.4142 1.58579C14.0391 1.21071 13.5304 1 13 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V9C1 9.53043 1.21071 10.0391 1.58579 10.4142C1.96086 10.7893 2.46957 11 3 11H5M7 15H17C17.5304 15 18.0391 14.7893 18.4142 14.4142C18.7893 14.0391 19 13.5304 19 13V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V13C5 13.5304 5.21071 14.0391 5.58579 14.4142C5.96086 14.7893 6.46957 15 7 15ZM14 10C14 10.5304 13.7893 11.0391 13.4142 11.4142C13.0391 11.7893 12.5304 12 12 12C11.4696 12 10.9609 11.7893 10.5858 11.4142C10.2107 11.0391 10 10.5304 10 10C10 9.46957 10.2107 8.96086 10.5858 8.58579C10.9609 8.21071 11.4696 8 12 8C12.5304 8 13.0391 8.21071 13.4142 8.58579C13.7893 8.96086 14 9.46957 14 10Z"
				stroke="#64748B"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/> */}
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
			strokeWidth="1.5"
			stroke="currentColor"
		>
			<title>{title ? title : "Document Download"}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
			/>
		</svg>
	);
};

// <svg
// 			className={className}
// 			xmlns="http://www.w3.org/2000/svg"
// 			fill="none"
// 			viewBox="0 0 24 24"
// 			stroke="currentColor"
// 		>
// 			<title>{title ? title : "Document Download"}</title>
// 			<path
// 				d="M8 8V14V8ZM8 14L5 11L8 14ZM8 14L11 11L8 14ZM13 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H8.586C8.8512 1.00006 9.10551 1.10545 9.293 1.293L14.707 6.707C14.8946 6.89449 14.9999 7.1488 15 7.414V17C15 17.5304 14.7893 18.0391 14.4142 18.4142C14.0391 18.7893 13.5304 19 13 19Z"
// 				stroke="#64748B"
// 				strokeWidth="2"
// 				strokeLinecap="round"
// 				strokeLinejoin="round"
// 			/>
// 		</svg>

export const IconUsers: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={1.5}
		>
			<title>{title ? title : "Users"}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
			/>
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
			strokeWidth={1.5}
		>
			<title>{title ? title : "Flag"}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
			/>
		</svg>
	);
};

export const IconLinkedIn: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>{title ? title : "LinkedIn"}</title>
			<path d="M19.619 2H4.38095C3.06667 2 2 3.06667 2 4.38095V19.619C2 20.9333 3.06667 22 4.38095 22H19.619C20.9333 22 22 20.9333 22 19.619V4.38095C22 3.06667 20.9333 2 19.619 2ZM8.19048 9.61905V18.6667H5.33333V9.61905H8.19048ZM5.33333 6.98571C5.33333 6.31905 5.90476 5.80952 6.7619 5.80952C7.61905 5.80952 8.15714 6.31905 8.19048 6.98571C8.19048 7.65238 7.65714 8.19048 6.7619 8.19048C5.90476 8.19048 5.33333 7.65238 5.33333 6.98571ZM18.6667 18.6667H15.8095C15.8095 18.6667 15.8095 14.2571 15.8095 13.9048C15.8095 12.9524 15.3333 12 14.1429 11.981H14.1048C12.9524 11.981 12.4762 12.9619 12.4762 13.9048C12.4762 14.3381 12.4762 18.6667 12.4762 18.6667H9.61905V9.61905H12.4762V10.8381C12.4762 10.8381 13.3952 9.61905 15.2429 9.61905C17.1333 9.61905 18.6667 10.919 18.6667 13.5524V18.6667Z" />
		</svg>
	);
};

export const IconGithub: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			fill="currentColor"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<title>{title ? title : "Github"}</title>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12 2C6.477 2 2 6.484 2 12.017C2 16.442 4.865 20.197 8.839 21.521C9.339 21.613 9.521 21.304 9.521 21.038C9.521 20.801 9.513 20.17 9.508 19.335C6.726 19.94 6.139 17.992 6.139 17.992C5.685 16.834 5.029 16.526 5.029 16.526C4.121 15.906 5.098 15.918 5.098 15.918C6.101 15.988 6.629 16.95 6.629 16.95C7.521 18.48 8.97 18.038 9.539 17.782C9.631 17.135 9.889 16.694 10.175 16.444C7.955 16.191 5.62 15.331 5.62 11.493C5.62 10.4 6.01 9.505 6.649 8.805C6.546 8.552 6.203 7.533 6.747 6.155C6.747 6.155 7.587 5.885 9.497 7.181C10.3128 6.95851 11.1544 6.84519 12 6.844C12.85 6.848 13.705 6.959 14.504 7.181C16.413 5.885 17.251 6.154 17.251 6.154C17.797 7.533 17.453 8.552 17.351 8.805C17.991 9.505 18.379 10.4 18.379 11.493C18.379 15.341 16.04 16.188 13.813 16.436C14.172 16.745 14.491 17.356 14.491 18.291C14.491 19.629 14.479 20.71 14.479 21.038C14.479 21.306 14.659 21.618 15.167 21.52C17.1583 20.8521 18.8893 19.5753 20.1155 17.87C21.3416 16.1648 22.0009 14.1173 22 12.017C22 6.484 17.522 2 12 2Z"
			/>
		</svg>
	);
};

export const IconDiscord: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			fill="currentColor"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<title>{title ? title : "Discord"}</title>
			<path
				fillRule="evenodd"
				clip-Rule="evenodd"
				d="M8.55753 4.10244C7.48 4.33823 6.62354 4.60484 5.65016 5.00749C4.9656 5.29065 5.02213 5.23442 4.44245 6.20867C3.15242 8.37669 2.40117 10.5483 2.09028 13.0082C1.99929 13.7282 1.96677 16.0223 2.04111 16.4803C2.07721 16.7029 2.09183 16.7192 2.52308 17.0192C3.57472 17.7505 4.96246 18.4736 6.19698 18.9333C7.18294 19.3004 7.09849 19.305 7.39332 18.8681C7.53677 18.6556 7.62789 18.4738 7.60825 18.4396C7.58947 18.4069 7.5929 18.3973 7.61589 18.4182C7.661 18.4593 7.80057 18.2538 8.02938 17.8095L8.17375 17.5293L7.94217 17.4315C7.42294 17.2121 6.52501 16.7433 6.52665 16.6924C6.52878 16.6267 6.8554 16.3717 6.93739 16.3717C6.96933 16.3717 7.1346 16.4345 7.30466 16.5112C7.71539 16.6965 8.67547 17.0173 9.18667 17.1401C11.0022 17.5762 12.7366 17.5917 14.5984 17.1887C15.1345 17.0727 16.227 16.7177 16.6826 16.5116C16.8526 16.4347 17.0177 16.3717 17.0496 16.3717C17.0814 16.3717 17.1924 16.4452 17.2962 16.5349L17.485 16.6981L17.3164 16.8032C17.0853 16.9472 16.2205 17.3604 15.9983 17.433C15.8986 17.4656 15.8169 17.5132 15.8169 17.5387C15.8169 17.7066 16.7993 19.2271 16.9078 19.2271C17.0248 19.2271 18.1491 18.807 18.7608 18.5348C19.5678 18.1757 20.5614 17.6275 21.2744 17.1481C21.9973 16.662 21.9379 16.801 21.9886 15.4764C22.1052 12.4284 21.3272 9.29742 19.7878 6.6194C19.2708 5.71982 18.9564 5.25992 18.8217 5.20562C18.7528 5.17789 18.4242 5.045 18.0915 4.91036C17.7587 4.77572 17.2252 4.58611 16.9058 4.48893C16.0709 4.235 14.8918 3.97526 14.8251 4.03058C14.7951 4.0555 14.6644 4.29704 14.5348 4.56733L14.2991 5.05874L13.9812 5.02472C12.4494 4.86066 11.538 4.86056 10.0085 5.02443L9.69308 5.05826L9.42777 4.53389C9.28186 4.24545 9.14069 4.00541 9.11407 4.00038C9.08746 3.99534 8.83701 4.04127 8.55753 4.10244ZM9.18614 10.431C10.0983 10.7099 10.6629 11.7999 10.4385 12.8486C10.3179 13.412 10.0222 13.852 9.5658 14.1469C8.67692 14.7215 7.54325 14.3479 7.06704 13.3235C6.7846 12.716 6.79428 11.9628 7.09215 11.3685C7.49234 10.57 8.36423 10.1797 9.18614 10.431ZM16.0346 10.5149C16.9715 10.9384 17.3972 12.1424 16.9885 13.2124C16.6714 14.0425 15.8468 14.5424 15.0477 14.3891C14.043 14.1963 13.3667 13.1393 13.5429 12.0368C13.7496 10.7424 14.9356 10.018 16.0346 10.5149Z"
			/>
		</svg>
	);
};

export const IconGlassdoor: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			fill="none"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<title>{title ? title : "Glassdoor"}</title>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M2.28525 0.0554922C2.14974 0.0820532 1.87861 0.180462 1.68277 0.27414C0.925415 0.636336 0.436474 1.16628 0.168499 1.91541L0.0186924 2.33427L0.00548576 8.47618C-0.00570044 13.6889 0.00267689 14.6221 0.0609239 14.6445C0.0986712 14.6589 0.714404 14.667 1.42919 14.6623L2.72876 14.6539L2.7397 8.7718C2.74778 4.42461 2.76542 2.8719 2.80736 2.82144C2.85506 2.76393 3.76459 2.75314 8.55642 2.75314H14.2488L14.2173 2.49443C14.172 2.12302 14.0072 1.63225 13.8412 1.37423C13.4034 0.694091 12.6834 0.195935 11.9438 0.0614548C11.5142 -0.0166514 2.68066 -0.0221212 2.28525 0.0554922ZM11.5774 5.38564C11.5442 5.42575 11.5268 7.38989 11.5255 11.2422C11.5246 14.4302 11.5068 17.0844 11.486 17.1406L11.4483 17.2426L5.7443 17.2414C0.70307 17.2403 0.0369746 17.2488 0.0117441 17.3146C-0.0574428 17.4949 0.187964 18.2333 0.513842 18.8251C0.600177 18.982 1.12189 19.4728 1.31181 19.5759C2.13081 20.0205 1.86047 20.0007 7.10542 19.9996C9.60393 19.999 11.7866 19.9786 11.9557 19.9541C12.2554 19.9108 12.5661 19.7828 12.9896 19.5283C13.2063 19.3982 13.7425 18.8868 13.7425 18.8103C13.7425 18.7863 13.7974 18.6835 13.8645 18.582C13.9959 18.3835 14.1435 17.9659 14.2304 17.5466C14.2911 17.2538 14.3006 5.67973 14.2404 5.46345L14.2061 5.34025L12.9168 5.33276C11.9518 5.32719 11.6149 5.34045 11.5774 5.38564Z"
				fill="#64748B"
			/>
		</svg>
	);
};

export const IconTwitter: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			fill="currentColor"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<title>{title ? title : "Twitter"}</title>
			<path d="M8.29 20.2534C15.837 20.2534 19.965 14.0004 19.965 8.5784C19.965 8.4004 19.965 8.2234 19.953 8.0484C20.7562 7.46693 21.4493 6.74701 22 5.9224C21.2511 6.2544 20.4566 6.47216 19.643 6.5684C20.4996 6.05546 21.1408 5.24875 21.447 4.2984C20.6417 4.77628 19.7607 5.11313 18.842 5.2944C18.2234 4.63616 17.405 4.20023 16.5136 4.0541C15.6222 3.90797 14.7075 4.0598 13.9111 4.48607C13.1147 4.91234 12.4811 5.58927 12.1083 6.41206C11.7355 7.23485 11.6444 8.15758 11.849 9.0374C10.2176 8.95564 8.6216 8.53172 7.16465 7.79317C5.70769 7.05461 4.42233 6.01792 3.392 4.7504C2.86732 5.6536 2.70659 6.72282 2.94254 7.74036C3.17848 8.75791 3.79337 9.64728 4.662 10.2274C4.00926 10.2085 3.37065 10.0329 2.8 9.7154V9.7674C2.80039 10.7147 3.1284 11.6327 3.7284 12.3658C4.3284 13.0988 5.16347 13.6018 6.092 13.7894C5.48781 13.9541 4.85389 13.9781 4.239 13.8594C4.50116 14.6749 5.01168 15.388 5.69913 15.899C6.38658 16.41 7.21657 16.6934 8.073 16.7094C7.22212 17.378 6.24779 17.8722 5.20573 18.1639C4.16367 18.4556 3.07432 18.539 2 18.4094C3.8766 19.6137 6.06019 20.2525 8.29 20.2494" />
		</svg>
	);
};

export const IconBriefcase: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
		>
			<title>{title ? title : "Briefcase"}</title>
			{/* <path
				d="M19 12.255C16.1405 13.4112 13.0844 14.0038 10 14C6.817 14 3.78 13.38 1 12.255M10 11H10.01M14 5V3C14 2.46957 13.7893 1.96086 13.4142 1.58579C13.0391 1.21071 12.5304 1 12 1H8C7.46957 1 6.96086 1.21071 6.58579 1.58579C6.21071 1.96086 6 2.46957 6 3V5H14ZM3 19H17C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H3C2.46957 5 1.96086 5.21071 1.58579 5.58579C1.21071 5.96086 1 6.46957 1 7V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19Z"
				strokeLinecap="round"
				strokeLinejoin="round"
			/> */}
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
			/>
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

export const IconGlobe: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			strokeWidth={1.5}
			stroke="currentColor"
		>
			<title>{title ? title : "Globe"}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
			/>
		</svg>
	);
};

export const IconEmail: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			fill="none"
			viewBox="0 0 24 24"
			aria-hidden="true"
			strokeWidth={1.5}
			stroke="currentColor"
		>
			<title>{title ? title : "Email"}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
			/>
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
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			strokeWidth={1.5}
			stroke="currentColor"
		>
			<title>{title ? title : "Location"}</title>
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

export const IconEditPencil: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={2}
			stroke="currentColor"
		>
			<title>{title ? title : "Edit"}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
			/>
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
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4.4917 1.69645C4.4917 1.45761 4.39682 1.22855 4.22793 1.05966C4.05905 0.890778 3.82999 0.795898 3.59115 0.795898C3.35231 0.795898 3.12325 0.890778 2.95436 1.05966C2.78547 1.22855 2.69059 1.45761 2.69059 1.69645V12.1303L1.52618 10.9658C1.35633 10.8018 1.12885 10.711 0.892728 10.7131C0.656606 10.7151 0.430736 10.8098 0.263766 10.9768C0.0967961 11.1438 0.00208588 11.3697 3.40433e-05 11.6058C-0.00201779 11.8419 0.0887529 12.0694 0.252796 12.2392L2.95446 14.9409C3.12333 15.1097 3.35235 15.2046 3.59115 15.2046C3.82994 15.2046 4.05896 15.1097 4.22784 14.9409L6.9295 12.2392C7.09354 12.0694 7.18431 11.8419 7.18226 11.6058C7.18021 11.3697 7.0855 11.1438 6.91853 10.9768C6.75156 10.8098 6.52569 10.7151 6.28957 10.7131C6.05344 10.711 5.82596 10.8018 5.65612 10.9658L4.4917 12.1303V1.69645ZM9.89502 2.59701C9.65618 2.59701 9.42712 2.69188 9.25823 2.86077C9.08935 3.02966 8.99447 3.25872 8.99447 3.49756C8.99447 3.7364 9.08935 3.96546 9.25823 4.13435C9.42712 4.30323 9.65618 4.39811 9.89502 4.39811H17.0994C17.3383 4.39811 17.5673 4.30323 17.7362 4.13435C17.9051 3.96546 18 3.7364 18 3.49756C18 3.25872 17.9051 3.02966 17.7362 2.86077C17.5673 2.69188 17.3383 2.59701 17.0994 2.59701H9.89502ZM9.89502 7.09977C9.65618 7.09977 9.42712 7.19465 9.25823 7.36354C9.08935 7.53242 8.99447 7.76148 8.99447 8.00033C8.99447 8.23917 9.08935 8.46823 9.25823 8.63711C9.42712 8.806 9.65618 8.90088 9.89502 8.90088H13.4972C13.7361 8.90088 13.9651 8.806 14.134 8.63711C14.3029 8.46823 14.3978 8.23917 14.3978 8.00033C14.3978 7.76148 14.3029 7.53242 14.134 7.36354C13.9651 7.19465 13.7361 7.09977 13.4972 7.09977H9.89502ZM9.89502 11.6025C9.65618 11.6025 9.42712 11.6974 9.25823 11.8663C9.08935 12.0352 8.99447 12.2643 8.99447 12.5031C8.99447 12.7419 9.08935 12.971 9.25823 13.1399C9.42712 13.3088 9.65618 13.4036 9.89502 13.4036H10.7956C11.0344 13.4036 11.2635 13.3088 11.4324 13.1399C11.6012 12.971 11.6961 12.7419 11.6961 12.5031C11.6961 12.2643 11.6012 12.0352 11.4324 11.8663C11.2635 11.6974 11.0344 11.6025 10.7956 11.6025H9.89502Z"
				fill="#0E0067"
			/>
		</svg>
	);
};

export const IconSortDown: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			viewBox="0 0 24 24"
			fill="currentColor"
		>
			<title>{title ? title : "Sort"}</title>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M7.4917 5.90055C7.4917 5.66171 7.39682 5.43265 7.22793 5.26377C7.05905 5.09488 6.82999 5 6.59115 5C6.35231 5 6.12325 5.09488 5.95436 5.26377C5.78547 5.43265 5.69059 5.66171 5.69059 5.90055V16.3344L4.52618 15.1699C4.35633 15.0059 4.12885 14.9151 3.89273 14.9172C3.65661 14.9192 3.43074 15.0139 3.26377 15.1809C3.0968 15.3479 3.00209 15.5738 3.00003 15.8099C2.99798 16.046 3.08875 16.2735 3.2528 16.4433L5.95446 19.145C6.12333 19.3138 6.35235 19.4087 6.59115 19.4087C6.82994 19.4087 7.05896 19.3138 7.22784 19.145L9.9295 16.4433C10.0935 16.2735 10.1843 16.046 10.1823 15.8099C10.1802 15.5738 10.0855 15.3479 9.91853 15.1809C9.75156 15.0139 9.52569 14.9192 9.28957 14.9172C9.05344 14.9151 8.82596 15.0059 8.65612 15.1699L7.4917 16.3344V5.90055ZM12.895 6.80111C12.6562 6.80111 12.4271 6.89599 12.2582 7.06487C12.0893 7.23376 11.9945 7.46282 11.9945 7.70166C11.9945 7.9405 12.0893 8.16956 12.2582 8.33845C12.4271 8.50733 12.6562 8.60221 12.895 8.60221H20.0994C20.3383 8.60221 20.5673 8.50733 20.7362 8.33845C20.9051 8.16956 21 7.9405 21 7.70166C21 7.46282 20.9051 7.23376 20.7362 7.06487C20.5673 6.89599 20.3383 6.80111 20.0994 6.80111H12.895ZM12.895 11.3039C12.6562 11.3039 12.4271 11.3988 12.2582 11.5676C12.0893 11.7365 11.9945 11.9656 11.9945 12.2044C11.9945 12.4433 12.0893 12.6723 12.2582 12.8412C12.4271 13.0101 12.6562 13.105 12.895 13.105H16.4972C16.7361 13.105 16.9651 13.0101 17.134 12.8412C17.3029 12.6723 17.3978 12.4433 17.3978 12.2044C17.3978 11.9656 17.3029 11.7365 17.134 11.5676C16.9651 11.3988 16.7361 11.3039 16.4972 11.3039H12.895ZM12.895 15.8066C12.6562 15.8066 12.4271 15.9015 12.2582 16.0704C12.0893 16.2393 11.9945 16.4684 11.9945 16.7072C11.9945 16.946 12.0893 17.1751 12.2582 17.344C12.4271 17.5129 12.6562 17.6077 12.895 17.6077H13.7956C14.0344 17.6077 14.2635 17.5129 14.4324 17.344C14.6012 17.1751 14.6961 16.946 14.6961 16.7072C14.6961 16.4684 14.6012 16.2393 14.4324 16.0704C14.2635 15.9015 14.0344 15.8066 13.7956 15.8066H12.895Z"
			/>
		</svg>
	);
};

export const IconSortUp: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			viewBox="0 0 24 24"
			fill="currentColor"
		>
			<title>{title ? title : "Sort"}</title>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12.8951 6.80108C12.6562 6.80108 12.4272 6.89596 12.2583 7.06484C12.0894 7.23373 11.9945 7.46279 11.9945 7.70163C11.9945 7.94047 12.0894 8.16953 12.2583 8.33842C12.4272 8.5073 12.6562 8.60218 12.8951 8.60218H20.0995C20.3383 8.60218 20.5674 8.5073 20.7363 8.33842C20.9052 8.16953 21 7.94047 21 7.70163C21 7.46279 20.9052 7.23373 20.7363 7.06484C20.5674 6.89596 20.3383 6.80108 20.0995 6.80108H12.8951ZM12.8951 11.3038C12.6562 11.3038 12.4272 11.3987 12.2583 11.5676C12.0894 11.7365 11.9945 11.9656 11.9945 12.2044C11.9945 12.4432 12.0894 12.6723 12.2583 12.8412C12.4272 13.0101 12.6562 13.1049 12.8951 13.1049H16.4973C16.7361 13.1049 16.9652 13.0101 17.1341 12.8412C17.303 12.6723 17.3978 12.4432 17.3978 12.2044C17.3978 11.9656 17.303 11.7365 17.1341 11.5676C16.9652 11.3987 16.7361 11.3038 16.4973 11.3038H12.8951ZM12.8951 15.8066C12.6562 15.8066 12.4272 15.9015 12.2583 16.0704C12.0894 16.2393 11.9945 16.4683 11.9945 16.7072C11.9945 16.946 12.0894 17.1751 12.2583 17.344C12.4272 17.5128 12.6562 17.6077 12.8951 17.6077H13.7956C14.0345 17.6077 14.2635 17.5128 14.4324 17.344C14.6013 17.1751 14.6962 16.946 14.6962 16.7072C14.6962 16.4683 14.6013 16.2393 14.4324 16.0704C14.2635 15.9015 14.0345 15.8066 13.7956 15.8066H12.8951Z"
			/>
			<path d="M5.95436 19.1449C5.78547 18.976 5.69059 18.7469 5.69059 18.5081L5.69059 8.0743L4.52618 9.23871C4.35633 9.40275 4.12885 9.49353 3.89273 9.49147C3.65661 9.48942 3.43074 9.39471 3.26377 9.22774C3.0968 9.06077 3.00209 8.8349 3.00003 8.59878C2.99798 8.36266 3.08875 8.13518 3.2528 7.96533L5.95446 5.26367C6.12333 5.09484 6.35235 5 6.59115 5C6.82994 5 7.05896 5.09484 7.22784 5.26367L9.9295 7.96533C10.0935 8.13518 10.1843 8.36266 10.1823 8.59878C10.1802 8.8349 10.0855 9.06077 9.91853 9.22774C9.75156 9.39471 9.52569 9.48942 9.28957 9.49147C9.05344 9.49353 8.82596 9.40275 8.65612 9.23871L7.4917 8.0743L7.4917 18.5081C7.4917 18.7469 7.39682 18.976 7.22793 19.1449C7.05905 19.3138 6.82999 19.4087 6.59115 19.4087C6.3523 19.4087 6.12325 19.3138 5.95436 19.1449Z" />
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
			<path
				d="M20.4258 6.5H16.4258V10.5H14.4258V6.5H10.4258V4.5H14.4258V0.5H16.4258V4.5H20.4258V6.5ZM12.4258 0.5H0.425781V1.5H12.4258V0.5ZM0.425781 5.5H8.42578V4.5H0.425781V5.5ZM0.425781 9.5H8.42578V8.5H0.425781V9.5Z"
				fill="#475569"
			/>
		</svg>
	);
};

export const IconSaveToList: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			viewBox="0 0 24 24"
			fill="currentColor"
		>
			<title>{title ? title : "Save To List"}</title>
			<path
				d="M22 13H18V17H16V13H12V11H16V7H18V11H22V13ZM14 7H2V8H14V7ZM2 12H10V11H2V12ZM2 16H10V15H2V16Z"
				fill="currentColor"
			/>
		</svg>
	);
};

export const IconFindCompanies: React.FC<IconProps> = ({
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
			stroke="currentColor"
		>
			<title>{title ? title : "Find Companies"}</title>
			<path
				d="M19 21V5C19 4.46957 18.7893 3.96086 18.4142 3.58579C18.0391 3.21071 17.5304 3 17 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V21M19 21H5M19 21H21M19 21H14M5 21H3M5 21H10M14 21V16C14 15.7348 13.8946 15.4804 13.7071 15.2929C13.5196 15.1054 13.2652 15 13 15H11C10.7348 15 10.4804 15.1054 10.2929 15.2929C10.1054 15.4804 10 15.7348 10 16V21M14 21H10M9 7H10M9 11H10M14 7H15M14 11H15"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export const IconFindInvestors: React.FC<IconProps> = ({
	className,
	title,
}) => {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<title>{title ? title : "Find Investors"}</title>
			<path d="M6 19V20V19ZM18 19V20V19ZM21 16H22H21ZM21 8H22H21ZM3 8H2H3ZM3 16H2H3ZM13 15.75C13 15.1977 12.5523 14.75 12 14.75C11.4477 14.75 11 15.1977 11 15.75H13ZM11 16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16H11ZM12.5 11.9998L12.7425 11.0296L12.7194 11.0239L12.6961 11.0192L12.5 11.9998ZM13 7.75C13 7.19772 12.5523 6.75 12 6.75C11.4477 6.75 11 7.19772 11 7.75H13ZM11 8C11 8.55228 11.4477 9 12 9C12.5523 9 13 8.55228 13 8H11ZM6 20H18V18H6V20ZM18 20C19.0609 20 20.0783 19.5786 20.8284 18.8284L19.4142 17.4142C19.0391 17.7893 18.5304 18 18 18V20ZM20.8284 18.8284C21.5786 18.0783 22 17.0609 22 16H20C20 16.5304 19.7893 17.0391 19.4142 17.4142L20.8284 18.8284ZM22 16V8H20V16H22ZM22 8C22 6.93913 21.5786 5.92172 20.8284 5.17157L19.4142 6.58579C19.7893 6.96086 20 7.46957 20 8H22ZM20.8284 5.17157C20.0783 4.42143 19.0609 4 18 4V6C18.5304 6 19.0391 6.21071 19.4142 6.58579L20.8284 5.17157ZM18 4H6V6H18V4ZM6 4C4.93913 4 3.92172 4.42143 3.17157 5.17157L4.58579 6.58579C4.96086 6.21071 5.46957 6 6 6V4ZM3.17157 5.17157C2.42143 5.92172 2 6.93913 2 8H4C4 7.46957 4.21071 6.96086 4.58579 6.58579L3.17157 5.17157ZM2 8V16H4V8H2ZM2 16C2 17.0609 2.42143 18.0783 3.17157 18.8284L4.58579 17.4142C4.21071 17.0391 4 16.5304 4 16H2ZM3.17157 18.8284C3.92172 19.5786 4.93913 20 6 20V18C5.46957 18 4.96086 17.7893 4.58579 17.4142L3.17157 18.8284ZM11 15.75V16H13V15.75H11ZM12.2575 12.97C13.0809 13.1757 13.3041 13.4994 13.3499 13.6099C13.3833 13.6902 13.3937 13.8167 13.2304 13.9801C12.9215 14.2889 11.6553 14.7982 9.61394 13.2104L8.38606 14.7892C10.8447 16.7014 13.3285 16.7105 14.6446 15.3943C15.2938 14.7451 15.5854 13.7779 15.1969 12.8426C14.8209 11.9375 13.9191 11.3237 12.7425 11.0296L12.2575 12.97ZM15.5548 8.66786C13.0967 7.02887 10.5557 7.1624 9.40115 8.63191C8.79577 9.40247 8.71799 10.4425 9.3222 11.3288C9.88137 12.1489 10.9259 12.7048 12.3039 12.9804L12.6961 11.0192C11.5741 10.7949 11.1186 10.4133 10.9747 10.2021C10.8758 10.057 10.8917 9.97201 10.9738 9.86749C11.1943 9.58684 12.4033 8.9703 14.4452 10.3319L15.5548 8.66786ZM11 7.75V8H13V7.75H11Z" />
		</svg>
	);
};
