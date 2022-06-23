import Link from "next/link";
import { ElemPhoto } from "../components/ElemPhoto";

type Props = {
	href?: string;
	photos: Record<string, any>[];
	heading?: string;
	text?: string;
};

export const ElemPersonCard: React.FC<Props> = ({
	href = "",
	photos,
	heading,
	text,
}) => {
	return (
		<div>
			{/* <Link href={href}>
				<a className="block bg-white p-6 rounded-lg transition-all group hover:shadow-md hover:-translate-y-1 ">
					<ElemPhoto
						photos={photos}
						wrapClass="flex items-center justify-center w-32 h-32 mx-auto rounded-full overflow-hidden"
						imgClass="object-fit"
						imgAlt={heading}
					/>
					{heading && (
						<h3 className="font-bold text-center text-xl mt-2 group-hover:opacity-60">
							{heading}
						</h3>
					)}
					{text && <div className="text-center text-xs">{text}</div>}
				</a>
			</Link> */}
			<Link href={href}>
				<a className="flex items-center border border-dark-500/10 bg-white p-1 rounded-full transition-all group hover:shadow-md hover:-translate-y-0.5">
					<ElemPhoto
						photos={photos}
						wrapClass="shrink-0 flex items-center justify-center w-20 h-20 rounded-full overflow-hidden"
						imgClass="object-cover w-20 h-20"
						imgAlt={heading}
					/>
					<div className="overflow-hidden px-2">
						{heading && (
							<h3
								className="font-bold text-lg truncate group-hover:opacity-60"
								title={heading}
							>
								{heading}
							</h3>
						)}
						{text && (
							<p className="text-sm truncate" title={text}>
								{text}
							</p>
						)}
					</div>
				</a>
			</Link>
		</div>
	);
};
