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

export const IconEllipsisVertical: React.FC<IconProps> = ({
	className,
	title,
}) => {
	return (
		<svg
			viewBox="0 0 20 20"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
			className={`${className}`}
		>
			<title>{title ? title : "Options"}</title>
			<path
				fillRule="evenodd"
				d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
				clipRule="evenodd"
			/>
		</svg>
	);
};

export const IconCustomList: React.FC<IconProps> = ({
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
			stroke="currentColor"
		>
			<title>{title ? title : "List"}</title>
			<rect x="14" y="10" width="7" height="7" />
			<line x1="2" y1="16" x2="11" y2="16" />
			<line x1="2" y1="11" x2="11" y2="11" />
			<line x1="2" y1="6" x2="22" y2="6" />
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
		</svg>
	);
};

export const IconDocumentDownload: React.FC<IconProps> = ({
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

export const IconUsers: React.FC<IconProps> = ({
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
			strokeWidth={strokeWidth ? strokeWidth : 1.5}
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

export const IconUser: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			stroke="none"
			viewBox="0 0 24 24"
		>
			<title>{title ? title : "User"}</title>
			<path
				fillRule="evenodd"
				d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
				clipRule="evenodd"
			/>
		</svg>
	);
};

export const IconUserCircle: React.FC<IconProps> = ({
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
			stroke="currentColor"
		>
			<title>{title ? title : "User"}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
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
			viewBox="0 0 24 24"
		>
			<title>{title ? title : "User"}</title>
			<path
				fillRule="evenodd"
				d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
				clipRule="evenodd"
			/>
		</svg>
	);
};

export const IconAlert: React.FC<IconProps> = ({
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
			stroke="currentColor"
		>
			<title>{title ? title : "Alert"}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
			/>
		</svg>
	);
};

export const IconAlertSolid: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<title>{title ? title : "Alert"}</title>
			<path d="M5.85 3.5a.75.75 0 00-1.117-1 9.719 9.719 0 00-2.348 4.876.75.75 0 001.479.248A8.219 8.219 0 015.85 3.5zM19.267 2.5a.75.75 0 10-1.118 1 8.22 8.22 0 011.987 4.124.75.75 0 001.48-.248A9.72 9.72 0 0019.266 2.5z" />
			<path
				fillRule="evenodd"
				d="M12 2.25A6.75 6.75 0 005.25 9v.75a8.217 8.217 0 01-2.119 5.52.75.75 0 00.298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 107.48 0 24.583 24.583 0 004.83-1.244.75.75 0 00.298-1.205 8.217 8.217 0 01-2.118-5.52V9A6.75 6.75 0 0012 2.25zM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 004.496 0l.002.1a2.25 2.25 0 11-4.5 0z"
				clipRule="evenodd"
			/>
		</svg>
	);
};

export const IconImage: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
		>
			<title>{title ? title : "Image"}</title>
			<path
				fillRule="evenodd"
				d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
				clipRule="evenodd"
			/>
		</svg>
	);
};

export const IconFlag: React.FC<IconProps> = ({
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
			strokeWidth={strokeWidth ? strokeWidth : 1.5}
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
				clipRule="evenodd"
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

export const IconBriefcase: React.FC<IconProps> = ({
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
			stroke="currentColor"
		>
			<title>{title ? title : "Briefcase"}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
			/>
		</svg>
	);
};

export const IconRole: React.FC<IconProps> = ({
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
			strokeLinejoin="round"
		>
			<title>{title ? title : "Role"}</title>
			<path d="M9.58333 6.25H4.16667C3.59203 6.25 3.04093 6.47827 2.6346 6.8846C2.22827 7.29093 2 7.84203 2 8.41667V18.1667C2 18.7413 2.22827 19.2924 2.6346 19.6987C3.04093 20.1051 3.59203 20.3333 4.16667 20.3333H19.3333C19.908 20.3333 20.4591 20.1051 20.8654 19.6987C21.2717 19.2924 21.5 18.7413 21.5 18.1667V8.41667C21.5 7.84203 21.2717 7.29093 20.8654 6.8846C20.4591 6.47827 19.908 6.25 19.3333 6.25H13.9167M9.58333 6.25V5.16667C9.58333 4.59203 9.81161 4.04093 10.2179 3.6346C10.6243 3.22827 11.1754 3 11.75 3C12.3246 3 12.8757 3.22827 13.2821 3.6346C13.6884 4.04093 13.9167 4.59203 13.9167 5.16667V6.25M9.58333 6.25C9.58333 6.82464 9.81161 7.37574 10.2179 7.78206C10.6243 8.18839 11.1754 8.41667 11.75 8.41667C12.3246 8.41667 12.8757 8.18839 13.2821 7.78206C13.6884 7.37574 13.9167 6.82464 13.9167 6.25M8.5 14.9167C9.91483 14.9167 11.1184 15.8213 11.5658 17.0833M8.5 14.9167C7.82766 14.9165 7.17181 15.1247 6.62274 15.5128C6.07368 15.9008 5.65843 16.4495 5.43417 17.0833M15 11.6667H18.25M15 16H17.1667M8.5 14.9167C9.07464 14.9167 9.62574 14.6884 10.0321 14.2821C10.4384 13.8757 10.6667 13.3246 10.6667 12.75C10.6667 12.1754 10.4384 11.6243 10.0321 11.2179C9.62574 10.8116 9.07464 10.5833 8.5 10.5833C7.92536 10.5833 7.37426 10.8116 6.96794 11.2179C6.56161 11.6243 6.33333 12.1754 6.33333 12.75C6.33333 13.3246 6.56161 13.8757 6.96794 14.2821C7.37426 14.6884 7.92536 14.9167 8.5 14.9167Z" />
		</svg>
	);
};

export const IconGlobe: React.FC<IconProps> = ({
	className,
	title,
	strokeWidth,
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			strokeWidth={strokeWidth ? strokeWidth : 1.5}
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

export const IconEmail: React.FC<IconProps> = ({
	className,
	title,
	strokeWidth,
}) => {
	return (
		<svg
			className={className}
			fill="none"
			viewBox="0 0 24 24"
			aria-hidden="true"
			strokeWidth={strokeWidth ? strokeWidth : 1.5}
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
	strokeWidth,
}) => {
	return (
		<svg
			className={className}
			fill="none"
			stroke="currentColor"
			strokeWidth={strokeWidth ? strokeWidth : 1.5}
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

export const IconChevronLeft: React.FC<IconProps> = ({
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
			strokeWidth={strokeWidth ? strokeWidth : 1.5}
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

export const IconChevronDownMini: React.FC<IconProps> = ({
	className,
	title,
}) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<title>{title ? title : "Down"}</title>
			<path
				fillRule="evenodd"
				d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
				clipRule="evenodd"
			/>
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

export const IconDashboard: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>{title ? title : "Dashboard"}</title>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M3.81818 14C3.81818 9.48364 7.48182 5.81818 12 5.81818C16.5182 5.81818 20.1818 9.48364 20.1818 14C20.1818 14.9573 19.8818 16.1636 19.3373 17.1091C18.7855 18.0673 18.1255 18.5364 17.4718 18.5455C17.0318 18.5236 16.7082 18.3336 16.1045 17.9818C15.9736 17.9055 15.83 17.8218 15.67 17.7309C14.8064 17.24 13.7 16.7273 12 16.7273C10.3 16.7273 9.19364 17.2391 8.33 17.7309C8.17 17.8218 8.02636 17.9055 7.89545 17.9818C7.29182 18.3336 6.96818 18.5236 6.52818 18.5455C5.87364 18.5364 5.21455 18.0673 4.66273 17.1091C4.11818 16.1636 3.81818 14.9573 3.81818 14ZM12 4C6.47727 4 2 8.48 2 14C2 15.2709 2.38182 16.7909 3.08727 18.0164C3.78091 19.2209 4.93182 20.3636 6.54545 20.3636H6.58182C7.52818 20.3255 8.30546 19.8609 8.92 19.4927C9.02818 19.4291 9.13091 19.3664 9.22909 19.3109C9.93455 18.91 10.7264 18.5455 12 18.5455C13.2736 18.5455 14.0655 18.9091 14.7709 19.3109C14.8691 19.3664 14.9709 19.4291 15.08 19.4927C15.6945 19.86 16.4709 20.3255 17.4182 20.3627L17.4364 20.3636H17.4545C19.0682 20.3636 20.2191 19.2209 20.9127 18.0164C21.6182 16.7918 22 15.2709 22 14C22 8.48 17.5227 4 12 4ZM16.5 10.7855C16.5868 10.7016 16.6561 10.6013 16.7037 10.4904C16.7514 10.3795 16.7765 10.2602 16.7775 10.1395C16.7786 10.0187 16.7555 9.89904 16.7098 9.78731C16.6641 9.67559 16.5966 9.57409 16.5113 9.48873C16.4259 9.40337 16.3244 9.33587 16.2127 9.29016C16.101 9.24445 15.9813 9.22145 15.8605 9.2225C15.7398 9.22355 15.6205 9.24863 15.5096 9.29627C15.3987 9.34392 15.2984 9.41317 15.2145 9.5L12.4709 12.2436C12.0843 12.14 11.6743 12.1669 11.3045 12.32C10.9347 12.4731 10.6258 12.744 10.4256 13.0907C10.2255 13.4373 10.1453 13.8403 10.1975 14.2371C10.2498 14.6339 10.4315 15.0024 10.7145 15.2855C10.9976 15.5685 11.3661 15.7502 11.7629 15.8025C12.1597 15.8547 12.5627 15.7745 12.9093 15.5744C13.256 15.3742 13.5269 15.0653 13.68 14.6955C13.8331 14.3257 13.86 13.9157 13.7564 13.5291L16.5 10.7855ZM5.63636 14.9091C5.87747 14.9091 6.1087 14.8133 6.27919 14.6428C6.44968 14.4723 6.54545 14.2411 6.54545 14C6.54545 13.7589 6.44968 13.5277 6.27919 13.3572C6.1087 13.1867 5.87747 13.0909 5.63636 13.0909C5.39526 13.0909 5.16403 13.1867 4.99354 13.3572C4.82305 13.5277 4.72727 13.7589 4.72727 14C4.72727 14.2411 4.82305 14.4723 4.99354 14.6428C5.16403 14.8133 5.39526 14.9091 5.63636 14.9091ZM19.2727 14C19.2727 14.2411 19.177 14.4723 19.0065 14.6428C18.836 14.8133 18.6047 14.9091 18.3636 14.9091C18.1225 14.9091 17.8913 14.8133 17.7208 14.6428C17.5503 14.4723 17.4545 14.2411 17.4545 14C17.4545 13.7589 17.5503 13.5277 17.7208 13.3572C17.8913 13.1867 18.1225 13.0909 18.3636 13.0909C18.6047 13.0909 18.836 13.1867 19.0065 13.3572C19.177 13.5277 19.2727 13.7589 19.2727 14ZM12 8.54545C12.2411 8.54545 12.4723 8.44968 12.6428 8.27919C12.8133 8.1087 12.9091 7.87747 12.9091 7.63636C12.9091 7.39526 12.8133 7.16403 12.6428 6.99354C12.4723 6.82305 12.2411 6.72727 12 6.72727C11.7589 6.72727 11.5277 6.82305 11.3572 6.99354C11.1867 7.16403 11.0909 7.39526 11.0909 7.63636C11.0909 7.87747 11.1867 8.1087 11.3572 8.27919C11.5277 8.44968 11.7589 8.54545 12 8.54545Z"
			/>
		</svg>
	);
};

export const IconSettings: React.FC<IconProps> = ({
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
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>{title ? title : "Settings"}</title>
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

export const IconOrganization: React.FC<IconProps> = ({
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
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>{title ? title : "Settings"}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
			/>
		</svg>
	);
};

export const IconSignOut: React.FC<IconProps> = ({
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
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>{title ? title : "Sign out"}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
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

export const IconLocation: React.FC<IconProps> = ({
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

export const IconShare: React.FC<IconProps> = ({
	className,
	strokeWidth,
	title,
}) => {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			strokeWidth={strokeWidth ? strokeWidth : 1.5}
			stroke="currentColor"
		>
			<title>{title ? title : "Share"}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
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

export const IconFollowing: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<title>{title ? title : "Following"}</title>
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

export const IconAcquired: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<title>{title ? title : "Acquired"}</title>
			<path
				d="M21 7.42105H21.75V6.67105H21V7.42105ZM21 13.1053L21.206 13.8264L21.75 13.671V13.1053H21ZM7.26316 11.2105L6.79464 10.6249C6.58625 10.7916 6.48214 11.0565 6.52126 11.3205C6.56038 11.5845 6.73683 11.8078 6.98461 11.9069L7.26316 11.2105ZM12.4737 10.2632L13.0737 9.81316C12.9503 9.64869 12.7649 9.54207 12.5607 9.51822C12.3565 9.49437 12.1515 9.55538 11.9935 9.68699L12.4737 10.2632ZM10.5789 19.2632L10.1814 18.6272L10.1814 18.6272L10.5789 19.2632ZM4.42105 13.5789L4.9905 13.0909L4.92316 13.0123L4.83708 12.9549L4.42105 13.5789ZM3 12.6316H2.25V13.033L2.58397 13.2556L3 12.6316ZM3 7.42105L3.10607 6.67859L2.25 6.5563V7.42105H3ZM7.73684 6.47368L7.40143 5.80286L7.29257 5.85729L7.20651 5.94335L7.73684 6.47368ZM12 18.3825L12.3929 19.0214L12 18.3825ZM14.1355 17.0893L14.5174 17.7347L14.5174 17.7347L14.1355 17.0893ZM20.25 7.42105V13.1053H21.75V7.42105H20.25ZM20.794 12.3841C20.2243 12.5469 19.3049 12.8373 18.3797 13.1847C17.4711 13.5259 16.4928 13.9455 15.8471 14.376L16.6792 15.624C17.1704 15.2966 18.0078 14.9267 18.9071 14.589C19.7898 14.2575 20.6704 13.9794 21.206 13.8264L20.794 12.3841ZM21 6.67105C19.4782 6.67105 18.6325 6.35313 17.7851 6.01417C16.8894 5.65587 15.9446 5.25 14.3684 5.25V6.75C15.6344 6.75 16.3475 7.05465 17.228 7.40688C18.1569 7.77844 19.206 8.17105 21 8.17105V6.67105ZM6.98461 11.9069C7.2648 12.019 8.05459 12.4693 9.08125 12.4932C10.157 12.5182 11.433 12.1067 12.9538 10.8393L11.9935 9.68699C10.6723 10.788 9.73776 11.0081 9.11612 10.9936C8.44541 10.978 8.05099 10.7179 7.5417 10.5142L6.98461 11.9069ZM11.8737 10.7132C13.0155 12.2356 13.3045 12.6207 15.2038 14.9948L16.3751 14.0578C14.4849 11.6951 14.2055 11.3223 13.0737 9.81316L11.8737 10.7132ZM15.2038 14.9948C15.2994 15.1143 15.3539 15.2698 15.3457 15.3786C15.3425 15.4214 15.33 15.4648 15.2932 15.5152C15.2539 15.5691 15.1675 15.6566 14.9804 15.7502L15.6512 17.0919C16.3903 16.7223 16.792 16.1481 16.8415 15.4912C16.886 14.8992 16.6326 14.3797 16.3751 14.0578L15.2038 14.9948ZM10.1814 18.6272C10.0316 18.7208 10.0096 18.7135 10.047 18.7075C10.1328 18.6937 10.1976 18.7263 10.1906 18.7221C10.1513 18.6992 10.0679 18.6354 9.88959 18.4625C9.71433 18.2927 9.5127 18.0836 9.21454 17.7855L8.15388 18.8461C8.42414 19.1164 8.66157 19.3612 8.84566 19.5396C9.02665 19.7151 9.2229 19.8939 9.43324 20.0169C9.67575 20.1588 9.96011 20.2407 10.285 20.1885C10.5616 20.144 10.7983 20.0105 10.9764 19.8992L10.1814 18.6272ZM9.21454 17.7855C8.10149 16.6724 5.94109 14.1999 4.9905 13.0909L3.85161 14.067C4.79576 15.1685 6.99325 17.6855 8.15388 18.8461L9.21454 17.7855ZM4.83708 12.9549L3.41603 12.0075L2.58397 13.2556L4.00503 14.203L4.83708 12.9549ZM3.75 12.6316V7.42105H2.25V12.6316H3.75ZM2.89393 8.16351C3.50237 8.25043 4.47048 8.3011 5.4508 8.17695C6.40485 8.05613 7.51939 7.75179 8.26717 7.00401L7.20651 5.94335C6.81745 6.33242 6.11621 6.58071 5.26235 6.68884C4.43478 6.79364 3.6029 6.74957 3.10607 6.67859L2.89393 8.16351ZM14.3684 5.25C13.3742 5.25 12.408 5.73909 11.5591 6.33274L12.4187 7.562C13.1911 7.0219 13.8425 6.75 14.3684 6.75V5.25ZM11.5591 6.33274C10.6457 6.97148 9.74699 7.81944 8.94127 8.60617C8.11203 9.41587 7.40004 10.1405 6.79464 10.6249L7.73168 11.7962C8.41297 11.2511 9.20613 10.444 9.98922 9.6794C10.7958 8.89179 11.6167 8.12285 12.4187 7.562L11.5591 6.33274ZM8.07225 7.1445C8.83116 6.76505 9.58786 6.76107 10.2221 6.90822C10.8811 7.06114 11.3388 7.36074 11.4647 7.48381L12.513 6.41093C12.1542 6.06032 11.4332 5.64939 10.5611 5.44704C9.66419 5.23893 8.53727 5.23495 7.40143 5.80286L8.07225 7.1445ZM11.6071 17.7437C11.0633 18.0781 10.5582 18.3917 10.1814 18.6272L10.9764 19.8992C11.3502 19.6656 11.8522 19.3539 12.3929 19.0214L11.6071 17.7437ZM12.6037 17.9375L9.76163 14.0813L8.55416 14.9713L11.3963 18.8275L12.6037 17.9375ZM14.9804 15.7502C14.716 15.8824 14.2654 16.141 13.7536 16.4438L14.5174 17.7347C15.0362 17.4278 15.4419 17.1965 15.6512 17.0919L14.9804 15.7502ZM13.7536 16.4438C13.1047 16.8277 12.3211 17.3046 11.6071 17.7437L12.3929 19.0214C13.1039 18.5841 13.8793 18.1123 14.5174 17.7347L13.7536 16.4438ZM14.7287 16.6303L11.6458 12.6463L10.4595 13.5643L13.5424 17.5483L14.7287 16.6303Z"
				fill="#64748B"
			/>
		</svg>
	);
};

export const IconTrending: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<title>{title ? title : "Trending"}</title>
			<path
				d="M2.25 18.0001L9 11.2501L13.306 15.5571C14.5507 13.1029 16.6044 11.1535 19.12 10.0381L21.86 8.81809M21.86 8.81809L15.92 6.53809M21.86 8.81809L19.58 14.7591"
				stroke="#64748B"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export const IconDead: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<title>{title ? title : "Dead"}</title>
			<mask
				id="path-1-outside-1_5067_11599"
				maskUnits="userSpaceOnUse"
				x="2.69519"
				y="1.71924"
				width="18"
				height="21"
				fill="black"
			>
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
