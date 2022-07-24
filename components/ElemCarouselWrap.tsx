import React, {
	FC,
	PropsWithChildren,
	useState,
	useRef,
	useEffect,
} from "react";
import { IconChevronLeft, IconChevronRight } from "@/components/Icons";

type Props = {
	className?: string;
	itemsToShow?: number;
};

export const ElemCarouselWrap: FC<PropsWithChildren<Props>> = ({
	className = "",
	itemsToShow,
	children,
}) => {
	const maxScrollWidth = useRef(0);
	const [currentIndex, setCurrentIndex] = useState<any>(0);
	const carousel: any = useRef(null);

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

	let itemsToShowClass = "";
	// button styles
	if (itemsToShow === 2) {
		itemsToShowClass = "basis-1/2 sm:basis-1/2 lg:basis-1/2";
	} else if (itemsToShow === 3) {
		itemsToShowClass = "basis-full sm:basis-1/2 lg:basis-1/3";
	} else if (itemsToShow === 4) {
		itemsToShowClass = "basis-1/2 sm:basis-1/4 lg:basis-1/4";
	} else {
		itemsToShowClass = "basis-1/2 sm:basis-1/4 lg:basis-1/5";
	}

	return (
		<div className={`${className}`}>
			<div className="relative overflow-hidden">
				<div className="absolute top left flex justify-between w-full h-full">
					<button
						onClick={movePrev}
						className="bg-gradient-to-r from-white w-10 h-full rounded-lg group z-10 p-0 m-0 disabled:opacity-0"
						disabled={isDisabled("prev")}
					>
						<div className="flex items-center justify-center bg-white border border-dark-500/10 rounded-full w-10 h-10 ml-1 opacity-75 transition-all ease-in-out duration-300 group-hover:opacity-100 group-hover:border-primary-500 group-hover:text-primary-500">
							<IconChevronLeft title="Prev" className="h-6 w-6" />
						</div>
						<span className="sr-only">Prev</span>
					</button>

					<button
						onClick={moveNext}
						className="bg-gradient-to-l from-white w-10 h-full rounded-lg group z-10 p-0 m-0 transition-all ease-in-out duration-300 disabled:opacity-0"
						disabled={isDisabled("next")}
					>
						<div className="flex items-center justify-center bg-white border border-dark-500/10 rounded-full w-10 h-10 -ml-1 opacity-75 transition-all ease-in-out duration-300 group-hover:opacity-100 group-hover:border-primary-500 group-hover:text-primary-500">
							<IconChevronRight title="Next" className="h-6 w-6" />
						</div>
						<span className="sr-only">Next</span>
					</button>
				</div>

				<div className="relative z-0">
					<div
						ref={carousel}
						className="flex overflow-hidden m-3 scroll-smooth snap-x snap-mandatory touch-pan-x"
					>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};
