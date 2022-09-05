import { FigurePerspectiveGrid } from "@/components/Figures";
import { Transition } from "@headlessui/react";
import { FC } from "react";
type Props = {
	className?: string;
	isShowing?: boolean;
};

export const FigureIntroSplashNew: FC<Props> = ({
	className = "",
	isShowing = true,
}) => {
	return (
		<figure className={`relative ${className}`}>
			{/* Grid */}
			<Transition
				appear={true}
				show={isShowing}
				enter="transition ease-in-out delay-500 duration-500"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				className="absolute scale-[1.5] -bottom-12 left-0 right-0 mx-auto opacity-80 text-dark-500"
			>
				<FigurePerspectiveGrid />
			</Transition>

			{/* Spheres */}
			<div className="absolute w-28 h-28 sm:w-36 sm:h-36 left-0 right-0 mx-auto -top-16 bg-gradient-to-br from-[#ADD3FF] to-blue-800 rounded-full"></div>
			<div className="absolute w-28 h-28 sm:w-36 sm:h-36 top-4 -right-12 bg-gradient-to-br from-[#CDAAFF] to-[#954DFF] rounded-full"></div>
			<div className="absolute w-20 h-20 sm:w-28 sm:h-28 bottom-4 -right-16 bg-gradient-to-br from-[#FFC1F1] to-[#D018A7] rounded-full"></div>
			<div className="absolute w-20 h-20 sm:w-28 sm:h-28 top-28 -left-10 bg-gradient-to-br from-[#FFFBEB] to-[#F8DA4B] rounded-full"></div>

			{/* Cards */}
			<div className="absolute -top-8 left-0 right-0 aspect-video w-10/12 mx-auto rounded-2xl bg-gradient-to-tr from-white/80 to-white/20 border-2 border-white/60 opacity-80 backdrop-blur-3xl"></div>
			<div className="absolute -top-4 left-0 right-0 aspect-video w-11/12 mx-auto rounded-2xl bg-gradient-to-tr from-white/80 to-white/20 border-2 border-white/60 opacity-80 backdrop-blur-3xl"></div>
			<div className="aspect-video w-full min-h-[1px] rounded-2xl bg-gradient-to-tr from-white/80 to-white/20 border-2 border-white/60 opacity-80 backdrop-blur-3xl shadow-[10px_14px_25px_rgba(0,0,0,0.10)]"></div>
		</figure>
	);
};
