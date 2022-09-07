import React, { PropsWithChildren, useState } from "react";
import { IconSearch } from "./Icons";

type Props = {
	className?: string;
	label?: string;
	type?: "text" | "email" | "search" | "";
	name: string;
	value: string;
	onChange: (tags: string[]) => void;
	placeholder?: string;
	required?: boolean;
	autoComplete?: string;
	defaultTags?: string[]
};

export const TagInputText: React.FC<PropsWithChildren<Props>> = ({
	className = "",
	label,
	type = "",
	name,
	value,
	onChange,
	placeholder = "",
	required = false,
	autoComplete = "on",
	defaultTags = []
}) => {

	const [tags, setTags] = useState(defaultTags)
	const [inputValue, setInputValue] = useState('')

	function onEnterTag(event) {
		if (event.key == "Enter") {
			if (event.target.value) {
				setTags([...tags, event.target.value])
				onChange([...tags, event.target.value])
			}
			setInputValue('')
		}
	
	}

	function onRmoveTag(index: number) {
		let updatedTags = [...tags]
		updatedTags.splice(index, 1)
		setTags(updatedTags)
		onChange(updatedTags)
	}

	return (
		<div className={className}>
			{label && (
				<label htmlFor={name} className={`font-bold text-gray-400 cursor-text`}>
					{label}
				</label>
			)}
			<div>
				<div className="border rounded-md w-full flex items-center px-2">
					<IconSearch className="flex-none h-5 w-5" />
					<input value={inputValue} onChange={(event) => setInputValue(event.target.value)} type="text" onKeyDown={(event) => onEnterTag(event)} className="w-full appearance-none  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-slate-400" placeholder={placeholder}>
					</input>
				</div>

				{
					tags.map((tag, index) => {
						return (
							<div className="bg-primary-50 inline-flex items-center text-sm rounded-full border border-purple-50 mt-2 mr-1">
								<span className="ml-2 mr-1 leading-relaxed truncate max-w-xs text-purple-50 font-bold">{tag}</span>
								<button onClick={() => { onRmoveTag(index) }} className="w-6 h-8 inline-block align-middle text-purple-50 hover:text-purple-50 focus:outline-none">
									<svg className="w-6 h-6 fill-current mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z" /></svg>
								</button>
							</div>
						)
					})
				}
			</div>
		</div>
	);
};
