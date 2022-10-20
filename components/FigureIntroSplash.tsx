import { FigurePerspectiveGrid, FigureDash } from "@/components/Figures";

import { Transition } from "@headlessui/react";
import { FC } from "react";
type Props = {
	className?: string;
};

export const FigureIntroSplash: FC<Props> = ({ className = "" }) => {
	return (
		<figure className={`relative mt-4 ${className}`}>
			{/* Grid */}
			<FigurePerspectiveGrid className="absolute scale-[1.5] -bottom-12 left-0 right-0 mx-auto opacity-80 text-dark-500" />

			{/* Spheres */}
			<div className="absolute w-28 h-28 sm:w-36 sm:h-36 left-0 right-0 mx-auto -top-16 bg-gradient-to-br from-[#ADD3FF] to-blue-800 rounded-full animate-blob"></div>
			<div className="absolute w-28 h-28 sm:w-36 sm:h-36 top-4 -right-12 bg-gradient-to-br from-[#CDAAFF] to-[#954DFF] rounded-full animate-blob animation-delay-3000"></div>
			<div className="absolute w-20 h-20 sm:w-28 sm:h-28 bottom-4 -right-16 bg-gradient-to-br from-[#FFC1F1] to-[#D018A7] rounded-full animate-blob animation-delay-5000"></div>
			<div className="absolute w-20 h-20 sm:w-28 sm:h-28 top-28 -left-10 bg-gradient-to-br from-[#FFFBEB] to-[#F8DA4B] rounded-full animate-blob animation-delay-2000"></div>

			{/* Cards */}
			<Transition
				appear={true}
				show={true}
				enter="transition ease-in-out duration-500 delay-200"
				enterFrom="opacity-0 -translate-y-10"
				enterTo="opacity-100 translate-y-0"
			>
				<div className="absolute -top-8 left-0 right-0 aspect-video w-10/12 mx-auto rounded-2xl bg-gradient-to-tr from-white/80 to-white/20 border-2 border-white/60 opacity-80 backdrop-blur-3xl"></div>
			</Transition>
			<Transition
				appear={true}
				show={true}
				enter="transition ease-in-out duration-500 delay-500"
				enterFrom="opacity-0 -translate-y-10"
				enterTo="opacity-100 translate-y-0"
			>
				<div className="absolute -top-4 left-0 right-0 aspect-video w-11/12 mx-auto rounded-2xl bg-gradient-to-tr from-white/80 to-white/20 border-2 border-white/60 opacity-80 backdrop-blur-3xl"></div>
			</Transition>
			<Transition
				appear={true}
				show={true}
				enter="transition ease-in-out duration-1000 delay-700"
				enterFrom="opacity-0 -translate-y-10"
				enterTo="opacity-100 translate-y-0"
			>
				<div className="aspect-video w-full min-h-[1px] rounded-2xl bg-gradient-to-tr from-gray-50/80 to-gray-50/20 border-2 border-white/60 opacity-100 backdrop-blur-3xl shadow-[10px_14px_25px_rgba(0,0,0,0.10)]">
					<FigureDash className="mx-3 my-1 aspect-video max-w-full" />
				</div>
			</Transition>
		</figure>
	);
};
