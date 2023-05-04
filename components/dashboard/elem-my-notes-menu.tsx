import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import {
	IconPolygonDown,
	IconInformationCircle,
	IconDocumentDownload,
} from "@/components/icons";
import { useUser } from "@/context/user-context";
import { Disclosure } from "@headlessui/react";
import { ElemTooltip } from "@/components/elem-tooltip";
import useDisclosureState from "@/hooks/useDisclosureState";
import { MY_NOTES_MENU_OPEN_KEY } from "@/utils/constants";

type Props = {
	className?: string;
};

const ElemMyNotesMenu: FC<Props> = ({ className = "" }) => {
	const router = useRouter();
	const { user } = useUser();

	const { btnRef, isDefaultOpen, onDisclosureButtonClick } = useDisclosureState(
		MY_NOTES_MENU_OPEN_KEY
	);

	const getActiveClass = (path: string) => {
		return path === router.asPath ? "text-primary-500 bg-slate-200" : "";
	};

	return (
		<div className={className}>
			<Disclosure defaultOpen={isDefaultOpen}>
				{({ open }) => (
					<>
						<div className="w-full flex items-center justify-between">
							<div className="flex items-center">
								<Disclosure.Button
									className="flex focus:outline-none hover:opacity-75"
									data-expanded={open}
									ref={btnRef}
									onClick={onDisclosureButtonClick}
								>
									<IconPolygonDown
										className={`${
											open ? "rotate-0" : "-rotate-90 "
										} h-6 w-6 transform transition-all`}
									/>
									<span className="text-lg font-bold">Notes</span>
								</Disclosure.Button>
								<ElemTooltip
									content="Monitor your notes on EdgeIn."
									className="ml-1"
								>
									<IconInformationCircle className="h-5 w-5 text-slate-600" />
								</ElemTooltip>
							</div>
						</div>

						<Disclosure.Panel as="ul" className="mt-1 space-y-1 text-slate-600">
							<li role="button">
								<Link href="/notes/">
									<a
										className={`flex items-center space-x-2 py-1 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500 ${getActiveClass(
											"/notes/"
										)}`}
										title="notes"
									>
										<IconDocumentDownload
											className="h-6 w-6 shrink-0"
											title="notes"
										/>
										<span className="line-clamp-1 break-all flex-1">
											Your Notes
										</span>
										{/* <div className="bg-slate-200 inline-block rounded-full font-medium py-0.5 px-2 text-xs">
											{notes.total_no_of_resources} 
										</div>*/}
									</a>
								</Link>
							</li>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</div>
	);
};

export default ElemMyNotesMenu;
