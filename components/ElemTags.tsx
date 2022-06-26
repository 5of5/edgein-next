import React from "react";

type Props = {
	className?: string;
	heading?: string;
	tags: (string | null)[];
};

export const ElemTags: React.FC<Props> = ({ className, heading, tags }) => {
	return (
		<section className={className}>
			{heading && <h2 className="text-2xl font-bold">{heading}</h2>}
			<ul className="flex space-x-2 mt-4">
				{tags.map((tag, index: number) => {
					return (
						<li
							key={index}
							className="bg-primary-100 text-primary-500 self-start text-xs font-bold leading-sm uppercase px-3 py-1 rounded-full"
						>
							{tag}
						</li>
					);
				})}
			</ul>
		</section>
	);
};
