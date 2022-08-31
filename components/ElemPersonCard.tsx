import Link from "next/link";
import { ElemPhoto } from "../components/ElemPhoto";
import {
	IconEmail,
	IconLinkedInColored
} from "./Icons";

type Props = {
	href?: string;
	photo: Record<string, any>;
	heading?: string | null;
	text?: string | null;
	founder?: boolean | null;
	linkedin?: string | null;
	personal_email?: string | null;
	work_email?: string | null;
};

export const ElemPersonCard: React.FC<Props> = ({
	href = "",
	photo,
	heading,
	text,
	founder,
	linkedin,
	personal_email,
	work_email
}) => {
	return (
		<div>
			<Link href={href}>
				<a className="flex items-center border border-dark-500/10 bg-white p-1 rounded-md transition-all group hover:shadow-md hover:-translate-y-0.5">
					<ElemPhoto
						photo={photo}
						wrapClass="shrink-0 flex items-center justify-center w-20 h-20 rounded-md overflow-hidden"
						imgClass="object-cover w-20 h-20"
						imgAlt={heading}
						placeholder="user"
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
						<div class="inline-flex">
							{(linkedin) && (
								<IconLinkedInColored
									title="LinkedIn"
									className="h-6 w-6 mr-1 text-primary-500"
								/>
							)
							}
							{
								(work_email || personal_email) && (
									<>
									<IconEmail
										title="Email"
										className="h-6 w-6 mt-1 mr-1 text-primary-500"
									/>
									<span className="text-slate-600 text-sm">{`${work_email && personal_email ? 2 : 1} email`}</span>
									</>
								)
							}
						</div>

					</div>
				</a>
			</Link>
		</div>
	);
};
