import { FigurePerspectiveGrid } from "../components/FigurePerspectiveGrid";

export const FigureIntroSplash = (props: { className?: string }) => {
	return (
		<figure className={`${props.className} hidden lg:block relative`}>
			{/* <transition
        enter-active-class=""
        enter-class="translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100"
      > */}
			<div className="relative z-10 grid grid-cols-2 gap-3 w-96 p-4  rounded-[40px] bg-white/75 box-border border border-white/50 -skew-x-6 shadow-card-large transition duration-500 ease-in">
				<div className="col-span-1 h-44 rounded-[26px] bg-dark-100"></div>
				<div className="col-span-1 h-44 rounded-[26px] bg-dark-100"></div>
				<div className="col-span-2 h-44 rounded-[26px] bg-dark-100"></div>
			</div>
			{/* </transition>
      <transition
        enter-active-class=""
        enter-class="translate-x-36 scale-0"
        enter-to-class="translate-x-0 scale-100"
      > */}
			<div className="absolute z-10 -left-16 top-1/2 -translate-y-3/4 w-2/3 rounded-xl bg-[#f6f9fc] border border-white/50 -skew-x-6 shadow-card-large p-1.5 transition delay-500 duration-300 ease-in">
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
			{/* </transition> */}
			<FigurePerspectiveGrid className="w-full scale-[3.5] absolute -bottom-36 opacity-30 z-0 text-dark-500" />
		</figure>
	);
};
