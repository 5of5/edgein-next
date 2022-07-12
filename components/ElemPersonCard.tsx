import Link from "next/link";
import { ElemPhoto } from "../components/ElemPhoto";

type Props = {
	href?: string;
	photo: Record<string, any>;
	heading?: string | null;
	text?: string | null;
	founder?: boolean | null;
};

export const ElemPersonCard: React.FC<Props> = ({
	href = "",
	photo,
	heading,
	text,
	founder,
}) => {
	return (
		<div>
			<Link href={href}>
				<a className="flex items-center border border-dark-500/10 bg-white p-1 rounded-full transition-all group hover:shadow-md hover:-translate-y-0.5">
					<ElemPhoto
						photo={photo}
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

						{(founder || text) && (
							<p className="text-sm truncate">
								{founder && (
									<span title="Founder" className="font-bold text-primary-500">
										Founder
									</span>
								)}
								{founder && text && `, `}
								{text && <span title={text}>{text}</span>}
							</p>
						)}
					</div>
				</a>
			</Link>
		</div>
	);
};
