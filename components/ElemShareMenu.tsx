import { Menu, Transition } from "@headlessui/react";
import { IconShare } from "@/components/Icons";
import { ElemButton } from "./ElemButton";
import { Fragment } from "react";

type Props = {
	onTelegram: () => void;
	onSMS: () => void;
	onEmail: () => void;
	onCopy: () => void;
};

export const ElemShareMenu = ({
	onTelegram,
	onSMS,
	onEmail,
	onCopy,
}: Props) => {
	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button as="div">
					<ElemButton btn="white">
						<IconShare className="h-5 w-5 mr-1.5" aria-hidden="true" />
						Share
					</ElemButton>
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items
					as="nav"
					className="z-10 absolute overflow-hidden right-0 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
				>
					<div>
						<Menu.Item>
							{({ active }) => (
								<button
									onClick={onCopy}
									className={`${
										active ? "bg-gray-50" : ""
									} hover:text-primary-500 flex w-full items-center p-2`}
								>
									Copy Invite Link
								</button>
							)}
						</Menu.Item>
					</div>
					<div>
						<Menu.Item>
							{({ active }) => (
								<button
									onClick={onTelegram}
									className={`${
										active ? "bg-gray-50" : ""
									} hover:text-primary-500 flex w-full items-center p-2`}
								>
									Invite by Telegram
								</button>
							)}
						</Menu.Item>
					</div>
					<div>
						<Menu.Item>
							{({ active }) => (
								<button
									onClick={onEmail}
									className={`${
										active ? "bg-gray-50" : ""
									} hover:text-primary-500 flex w-full items-center p-2`}
								>
									Invite by Email
								</button>
							)}
						</Menu.Item>
					</div>
					<div>
						<Menu.Item>
							{({ active }) => (
								//<a href="sms:(countrycode)(number)"> Text </a>
								<button
									onClick={onSMS}
									className={`${
										active ? "bg-gray-50" : ""
									} hover:text-primary-500 flex w-full items-center p-2`}
								>
									Invite by SMS
								</button>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};
