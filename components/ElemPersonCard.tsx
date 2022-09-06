import Link from "next/link";
import { ElemPhoto } from "../components/ElemPhoto";
import { IconEmail, IconLinkedIn } from "./Icons";

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
	work_email,
}) => {
	return (
		<div>
			<Link href={href}>
				<a className="flex items-center p-1 border border-black/10 rounded-lg transition-all hover:shadow hover:-translate-y-0.5">
					<ElemPhoto
						photo={photo}
						wrapClass="flex items-center justify-center shrink-0 w-20 h-20 rounded-lg overflow-hidden"
						imgClass="object-cover w-full h-full"
						imgAlt={heading}
						placeholder="user"
					/>
					<div className="overflow-hidden px-2">
						{heading && (
							<h3 className="font-bold text-lg truncate" title={heading}>
								{heading}
							</h3>
						)}

						{(founder || text) && (
							<p className="text-sm truncate">
								{founder && <span title="Founder">Founder</span>}
								{founder && text && `, `}
								{text && <span title={text}>{text}</span>}
							</p>
						)}
						<div className="inline-flex space-x-2 py-1">
							{linkedin && (
								<IconLinkedIn
									title="LinkedIn"
									className="h-6 w-6 text-[#0077B5]"
								/>
							)}
							{(work_email || personal_email) && (
								<div className="inline-flex items-center space-x-1 text-slate-600">
									<IconEmail title="Email" className="h-6 w-6" />
									<span className="text-sm">{`${
										work_email && personal_email ? 2 : 1
									} email`}</span>
								</div>
							)}
						</div>
					</div>
				</a>
			</Link>
		</div>
	);
};
