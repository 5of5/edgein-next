import React, { useState } from "react";
import { IconX } from "./icons";

type Props = {
	value: Array<string>;
	placeholder?: string;
	onChange: (tags: Array<string>) => void;
	subtext?: string;
};

export const ElemTagsInput: React.FC<Props> = ({
	value,
	placeholder = "",
	onChange,
	subtext = "",
}) => {
	const [tags, setTags] = useState<Array<string>>(value);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key !== "Enter") return;
		const target = event.target as HTMLInputElement;
		const data = target.value;
		if (!data.trim()) return;
		setTags([...tags, data]);
		onChange([...tags, data]);
		target.value = "";
	};

	const removeTag = (data: string) => {
		const newTags = tags.filter((item) => item !== data);
		setTags(newTags);
		onChange(newTags);
	};

	return (
		<div>
			<div className="p-2 border rounded-lg">
				{tags.length > 0 && (
					<div className="flex flex-wrap items-center gap-2 mb-2">
						{tags.map((tag) => (
							<div
								className="flex items-center gap-1 pl-3 pr-2 py-1 rounded-full text-sm bg-slate-200"
								key={tag}
							>
								<span>{tag}</span>
								<button
									onClick={() => {
										removeTag(tag);
									}}
									className="text-slate-500 hover:opacity-70 focus:outline-none"
								>
									<IconX className="w-3 h-3" title="close" />
								</button>
							</div>
						))}
					</div>
				)}
				<input
					onKeyDown={handleKeyDown}
					type="text"
					className="appearance-none p-0 border-none w-full placeholder:text-slate-400 focus:outline-none focus:ring-0"
					placeholder={placeholder}
				/>
			</div>
			{subtext && <p className="mt-0.5 text-xs text-slate-600">{subtext}</p>}
		</div>
	);
};
