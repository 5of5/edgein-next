import { FC, useEffect, useState, useRef } from "react";
import { IconChevronLeft, IconChevronRight } from "@/components/Icons";
import { tags } from "@/utils/constants";

type Props = {
	onClick: (e: React.MouseEvent<HTMLDivElement>, name: string) => void;
	selectedTags: any;
};

export const ElemTagsCarousel: FC<Props> = ({ onClick, selectedTags }) => {
	const maxScrollWidth = useRef(0);
	const [currentIndex, setCurrentIndex] = useState<any>(0);
	const carousel: any = useRef(null);

	const allTags = tags.filter(
		(tag) =>
			tag.name !== "Layer 0" &&
			tag.name !== "Layer 1" &&
			tag.name !== "Layer 2" &&
			tag.name !== "Layer 3" &&
			tag.name !== "Layer 4" &&
			tag.name !== "Layer 5" &&
			tag.name !== "Layer 6"
	);

	const movePrev = () => {
		if (currentIndex > 0) {
			setCurrentIndex((prevState: number) => prevState - 1);
		}
	};

	const moveNext = () => {
		if (
			carousel.current !== null &&
			carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
		) {
			setCurrentIndex((prevState: number) => prevState + 1);
		}
	};

	useEffect(() => {
		if (carousel !== null && carousel.current !== null) {
			carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
		}
	}, [currentIndex]);

	useEffect(() => {
		maxScrollWidth.current = carousel.current
			? carousel.current.scrollWidth - carousel.current.offsetWidth
			: 0;
	}, []);

	const isDisabled = (direction: string) => {
		if (direction === "prev") {
			return currentIndex <= 0;
		}

		if (direction === "next" && carousel.current !== null) {
			return (
				carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
			);
		}

		return false;
	};

	return (
		<div className="relative w-full">
			<div className="absolute top left flex justify-between w-full h-full">
				<button
					onClick={movePrev}
					className="cursor-pointer bg-gradient-to-r from-white via white to-transparent group z-10 p-0 m-0 disabled:opacity-0 active:bg-transparent focus:bg-transparent"
					disabled={isDisabled("prev")}
				>
					<div className="flex items-center justify-center w-9 h-9 opacity-75 transition-all ease-in-out duration-150 group-hover:opacity-100 group-hover:text-primary-500 sm:-ml-1">
						<IconChevronLeft title="Prev" className="h-6 w-6" />
					</div>
					<span className="sr-only">Prev</span>
				</button>
				<button
					onClick={moveNext}
					className="cursor-pointer bg-gradient-to-l from-white via-white to-transparent group z-10 p-0 m-0 transition-all ease-in-out duration-300 disabled:opacity-0"
					disabled={isDisabled("next")}
				>
					<div className="flex items-center justify-center w-9 h-9 opacity-75 transition-all ease-in-out duration-150 group-hover:opacity-100 group-hover:text-primary-500 sm:-mr-1">
						<IconChevronRight title="Next" className="h-6 w-6" />
					</div>
					<span className="sr-only">Next</span>
				</button>
			</div>
			<div
				ref={carousel}
				className="relative flex flex-row py-4 space-x-3 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-mandatory touch-pan-x mt-1.5 border-t border-t-slate-200 sm:py-1.5 lg:mt-0 lg:border-0"
			>
				{allTags.map(
					(
						{
							name,
						}: {
							name: string;
						},
						index: number
					) => (
						<div
							key={index}
							onClick={(e) => onClick(e, name)}
							className={`snap-start shrink-0 p-3 basis-auto group cursor-pointer  text-xs font-bold leading-sm uppercase px-3 py-1 rounded-full transition ease-in-out duration-150 ${
								selectedTags.includes(name)
									? "text-white bg-dark-500 hover:bg-dark-500"
									: "bg-slate-200 hover:bg-slate-300"
							}`}
						>
							{name}
						</div>
					)
				)}
			</div>
		</div>
	);
};
