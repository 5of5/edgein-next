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
				className={`py-4 sm:grid sm:grid-cols-5 sm:gap-6 sm:py-5 ${className}`}
			>
				{heading && <dt className="font-bold">{heading}</dt>}
				<dd className="mt-1 sm:flex sm:col-span-4 sm:mt-0">
					<div className="flex-grow">{children}</div>
					{right && (
						<div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-4">{right}</div>
					)}
				</dd>
			</section>
		</>
	);
};
