import React from "react";

type Props = {
	className?: string;
	heading?: string;
	tags: (string | null)[];
	onClick: (tag: string|null, index: number) => void;
	selectedTag?: string | null;
};

export const ElemFilterTags: React.FC<Props> = ({ className, heading, tags, onClick, selectedTag = "All Members" }) => {
	return (
		<section className={className}>
			{heading && <h2 className="text-2xl font-bold">{heading}</h2>}
			<ul className="flex space-x-2 mt-4">
				{tags.map((tag, index: number) => {
					return (
						<li onClick={() => onClick(tag, index)}
							key={index}
							className={`${selectedTag === tag ? 'bg-slate-200' : ''} self-start text-xs cursor-pointer font-bold leading-sm uppercase px-3 py-1 rounded-full`}
						>
							{tag}
						</li>
					);
				})}
			</ul>
		</section>
	);
};
