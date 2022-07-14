import { FC, useState, useRef, useEffect } from "react";
import { IconChevronLeft, IconChevronRight } from "@/components/Icons";

type Props = {
	className?: string;
	heading?: string;
	items: [];
};

export const CohortCarousel: FC<Props> = ({
	className = "",
	heading,
	items,
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

	return (
		<div className={`my-12 mx-auto ${className}`}>
			{heading && <h2 className="text-2xl font-bold">{heading}</h2>}

			<div className="relative z-0 mt-2 overflow-hidden bg-white border border-dark-500/10 rounded-lg">
				<div className="flex justify-between absolute top left w-full h-full">
					<button
						onClick={movePrev}
						className="bg-gradient-to-r from-white w-10 h-full group disabled:opacity-0 z-10 p-0 m-0"
						disabled={isDisabled("prev")}
					>
						<div className="flex items-center justify-center bg-white border border-dark-500/10 rounded-full w-10 h-10 ml-1 opacity-75 transition-all ease-in-out duration-300 group-hover:opacity-100 group-hover:bg-gray-50 group-hover:text-primary-500">
							<IconChevronLeft title="Prev" className="h-6 w-6" />
						</div>
						<span className="sr-only">Prev</span>
					</button>

					<button
						onClick={moveNext}
						className="bg-gradient-to-l from-white w-10 h-full group disabled:opacity-0 z-10 p-0 m-0 transition-all ease-in-out duration-300"
						disabled={isDisabled("next")}
					>
						<div className="flex items-center justify-center bg-white border border-dark-500/10 rounded-full w-10 h-10 -ml-1 opacity-75 transition-all ease-in-out duration-300 group-hover:opacity-100 group-hover:bg-gray-50 group-hover:text-primary-500">
							<IconChevronRight title="Next" className="h-6 w-6" />
						</div>
						<span className="sr-only">Next</span>
					</button>
				</div>

				<div className="relative">
					<div
						ref={carousel}
						className="flex overflow-hidden m-3 scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
					>
						{items.map((company: any, index) => {
							return (
								<div
									key={index}
									className="snap-start shrink-0 p-3 rounded-lg transition duration-300 ease-in-out basis-1/2 sm:basis-1/4 lg:basis-1/5 hover:bg-gray-50"
								>
									{/* <ElemTooltip
								 	key={index}
								 	className="block relative w-32 h-40 snap-start"
								 	content="Hedera is the most used enterprise-grade public network for you to make your digital world exactly as it should be – yours."
								 > */}
									<a
										href={company.link}
										className="h-full w-full block z-0 group"
									>
										<div className="flex items-center justify-center aspect-square shrink-0 p-2 bg-white rounded-lg border border-dark-500/10">
											<img
												src={company.logo || ""}
												alt={company.name}
												className="object-contain w-full h-full"
											/>
										</div>
										<div className="mt-3 text-gray-400 text-sm line-clamp-3">
											<h3 className="inline-block font-bold text-dark-500 group-hover:text-primary-500">
												{company.name}
											</h3>{" "}
											– Description lorem ipsum dolor sit amet, consectetur
											adipiscing elit, sed do eiusmod tempor incididunt ut
											labore et dolore magna aliqua.
										</div>
									</a>
									{/* </ElemTooltip> */}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};
