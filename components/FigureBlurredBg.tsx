import { FC, PropsWithChildren } from "react";

type Props = {
	className?: string;
};

export const FigureBlurredBg: FC<PropsWithChildren<Props>> = ({
	className = "",
}) => {
	return (
		<figure
			className={`${className} overflow-hidden absolute z-0 grid grid-cols-5 w-full`}
		>
			<div className="opacity-15 filter mix-blend-multiply transform-gpu animate-blob">
				<div className="w-[150%] aspect-square -mx-[25%] bg-[#F8DA4B] rounded-full blur-3xl"></div>
			</div>
			<div className="opacity-15 filter mix-blend-multiply transform-gpu animate-blob">
				<div className="w-[150%] aspect-square -ml-[25%] bg-[#F72784] rounded-full blur-3xl"></div>
			</div>
			<div className="opacity-15  filter mix-blend-multiply transform-gpu animate-blob">
				<div className="w-[150%] aspect-square -ml-[50%] mt-24 bg-[#7209B8] rounded-full blur-3xl"></div>
			</div>
			<div className="opacity-15  filter mix-blend-multiply transform-gpu animate-blob">
				<div className="w-[150%] aspect-square -mx-[25%] bg-[#0815EC] rounded-full blur-3xl"></div>
			</div>
			<div className="opacity-15 filter mix-blend-multiply transform-gpu animate-blob">
				<div className="block w-[150%] aspect-square -mx-[25%] mt-24  bg-[#1BE6FF] rounded-full blur-3xl"></div>
			</div>
		</figure>
	);
};
