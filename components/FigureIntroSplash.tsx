import { FigurePerspectiveGrid } from "@/components/FigurePerspectiveGrid";
import { Transition } from "@headlessui/react";
import { FC } from "react";
type Props = {
	className?: string;
	isShowing?: boolean;
};

export const FigureIntroSplash: FC<Props> = ({
	className = "",
	isShowing = true,
}) => {
	return (
		<figure className={`${className} hidden lg:block relative`}>
			{/* <Transition
				appear={true}
				show={isShowing}
				enter="transition-all delay-1000 ease-in duration-300"
				enterFrom="opacity-0 translate-x-0"
				enterTo="opacity-100 translate-x-full"
				className="relative z-10"
			> */}
			<div className="relative z-10 grid grid-cols-2 gap-3 w-96 p-4 rounded-[40px] bg-white/75 box-border border border-white/50 -skew-x-6 transition duration-500 ease-in shadow-[0_30px_60px_-12px_rgba(50,50,93,0.25),_0_18px_36px_-18px_rgba(0,0,0,0.3)]">
				<div className="col-span-1 h-44 rounded-[26px] bg-dark-100"></div>
				<div className="col-span-1 h-44 rounded-[26px] bg-dark-100"></div>
				<div className="col-span-2 h-44 rounded-[26px] bg-dark-100"></div>
			</div>
			{/* </Transition> */}

			<div className="absolute z-10 -left-16 top-1/2 -translate-y-3/4 w-2/3 rounded-xl bg-[#f6f9fc] border border-white/50 -skew-x-6 p-1.5 transition delay-500 duration-300 ease-in shadow-[0_30px_60px_-12px_rgba(50,50,93,0.25),_0_18px_36px_-18px_rgba(0,0,0,0.3)]">
				<div className="flex h-full w-full bg-white rounded-lg p-1.5">
					<div className="mr-2 h-20 w-20 rounded-full overflow-hidden relative bg-dark-100"></div>
					<div className="flex flex-col justify-between">
						<div className="h-6 w-2/3 overflow-hidden relative bg-dark-100 rounded-lg"></div>
						<div className="mt-2 h-2 w-40 overflow-hidden relative bg-dark-100 rounded-xl"></div>
						<div
							data-placeholder
							className="mt-2 h-2 w-40 overflow-hidden relative bg-dark-100 rounded-xl"
						></div>
						<div
							data-placeholder
							className="mt-2 h-2 w-3/4 overflow-hidden relative bg-dark-100 rounded-xl"
						></div>
					</div>
				</div>
			</div>
			<Transition
				appear={true}
				show={isShowing}
				enter="transition ease-in-out delay-1000 duration-500"
				enterFrom="opacity-0 scale-0"
				enterTo="opacity-100 scale-100"
			>
				<FigurePerspectiveGrid className="block absolute z-0 w-full scale-[2.5] bottom-0 opacity-80 text-dark-500" />
			</Transition>
		</figure>
	);
};
