import { Fragment, useState, FC, PropsWithChildren } from "react";

type Props = {
	className?: string;
	heading: string;
	right?: JSX.Element;
};

export const EditSection: FC<PropsWithChildren<Props>> = ({
	className = "",
	heading,
	right,
	children,
}) => {
	return (
		<>
			<section
				className={`py-4 lg:grid lg:grid-cols-5 lg:gap-6 lg:py-5 ${className}`}
			>
				{heading && <dt className="font-bold">{heading}</dt>}
				<dd className="mt-1 lg:flex lg:col-span-4 lg:mt-0">
					<div className="flex-grow">{children}</div>
					{right && (
						<div className="mt-4 flex-shrink-0 lg:mt-0 lg:ml-4">{right}</div>
					)}
				</dd>
			</section>
		</>
	);
};
