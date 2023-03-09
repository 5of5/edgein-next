import React from "react";

type Props = {
	className?: string;
	heading?: string;
	resourceType: "companies" | "investors";
	tags?: (string | null)[];
};

export const ElemTags: React.FC<Props> = ({
	className,
	heading,
	resourceType,
	tags,
}) => {
	if (!tags) {
		return <span></span>;
	}
	return (
		<section className={className}>
			{heading && <h2 className="text-2xl font-bold">{heading}</h2>}
			<ul className="flex flex-wrap gap-2 mt-4">
				{tags.map((tag, index: number) => {
					return (
						<li
							key={index}
							className="bg-slate-200 self-start text-xs font-bold leading-sm uppercase px-3 py-1 rounded-full transition-all cursor-pointer hover:bg-slate-300"
						>
							<a
                href={`/${resourceType}/?filters=${encodeURIComponent(
                  `{"industry":{"tags":["${tag}"]}}`
                )}`}
              >
								{tag}
							</a>
						</li>
					);
				})}
			</ul>
		</section>
	);
};
