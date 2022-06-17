import Link from "next/link";
import { ElemPhoto } from "../components/ElemPhoto";
import { truncateWords } from "../utils";

type Props = {
	href?: string;
	photos: Record<string, any>[];
	heading?: string;
	text?: string;
};

export const ElemOrganizationCard: React.FC<Props> = ({
	href = "",
	photos,
	heading,
	text = "",
}) => {
	return (
		<Link href={href}>
			<a className="bg-white rounded-lg cursor-pointer p-7 flex flex-col md:h-full mx-auto w-full max-w-md transition duration-300 ease-in-out transform group hover:scale-102 hover:shadow-lg focus:ring focus:ring-primary-300">
				<div className="flex w-full">
					<ElemPhoto
						photo={photos}
						wrapClass="flex items-center justify-center shrink-0 w-16 h-16 p-2 bg-white rounded-lg shadow-md"
						imgClass="object-fit max-w-full max-h-full"
						imgAlt={heading}
					/>

					<div className="flex items-center justify-center pl-2">
						<h3 className="text-2xl line-clamp-2 font-bold text-dark-500 sm:text-lg lg:text-2xl group-hover:opacity-60">
							{heading}
						</h3>
					</div>
				</div>

				{text?.length > 0 && (
					<div className="mt-4 text-gray-400 grow">{truncateWords(text)}</div>
				)}
			</a>
		</Link>
	);
};
