import { Fragment, useState, useEffect } from "react";
import validator from "validator";
import { Dialog, Transition, Combobox } from "@headlessui/react";
import useSWR from "swr";
import { useMutation } from "react-query";
import { IconX } from "@/components/Icons";
import { User_Groups } from "@/graphql/types";
import { useDebounce } from "@/hooks/useDebounce";
import { ElemPhoto } from "@/components/ElemPhoto";
import { ElemButton } from "../ElemButton";
import { PlaceholderPerson } from "../Placeholders";

type Props = {
	isOpen: boolean;
	group: User_Groups;
	onUpdateGroupData: (data: any) => void;
	onClose: () => void;
};

async function peopleFetcher(url: string, query: string) {
	const data = await fetch(`${url}?searchText=${query}`);
	return data.json();
}

const ElemInviteDialog: React.FC<Props> = ({
	isOpen,
	group,
	onUpdateGroupData,
	onClose,
}) => {
	const [query, setQuery] = useState("");
	const [selectedUser, setSelectedUser] = useState<any>(null);

	const debouncedQuery = useDebounce(query, 700);

	const { data: searchedPeople, error } = useSWR(
		() => (debouncedQuery ? ["/api/search_people/", query] : null),
		peopleFetcher
	);

	const isLoading = !error && !searchedPeople;

	const onSendInvitationMail = async (
		email: string,
		recipientName: string,
		groupName: string,
		groupId: number
	) => {
		await fetch("/api/send_invite_group_member_mail/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				isExistedUser: !!selectedUser?.id,
				email,
				resource: {
					recipientName,
					groupName,
					groupId,
				},
			}),
		});
	};

	const {
		mutate,
		isLoading: isSubmitting,
		isSuccess,
		error: inviteError,
		reset,
	} = useMutation(
		async () => {
			const res = await fetch("/api/invite_group_member/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: query,
					groupId: group.id,
					inviteUserId: selectedUser.id,
				}),
			});
			const apiResponse = await res.json();
			if (!res.ok) {
				throw apiResponse;
			} else {
				return apiResponse;
			}
		},
		{
			onSuccess: async (response) => {
				const { member, invite } = response;
				if (member) {
					onUpdateGroupData((prev: User_Groups) => ({
						...prev,
						user_group_members: [...prev.user_group_members, member],
					}));
				} else {
					onUpdateGroupData((prev: User_Groups) => ({
						...prev,
						user_group_invites: [...prev.user_group_invites, invite],
					}));
				}
				if (selectedUser?.id) {
					onSendInvitationMail(
						query,
						selectedUser?.person?.name || selectedUser?.display_name,
						group.name,
						group.id
					);
				}
			},
		}
	);

	useEffect(() => {
		if (!isOpen) {
			setTimeout(() => {
				reset();
				setSelectedUser(null);
			}, 300);
		}
	}, [isOpen, reset]);

	const handleInvite = () => {
		mutate();
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-40" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-lg transform rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title className="text-xl font-bold flex items-center justify-between">
									{isSuccess ? (
										<p className="text-2xl font-bold">Success</p>
									) : (
										<span>{`Invite people to ${group.name}`}</span>
									)}
									<button
										type="button"
										onClick={onClose}
										className="focus-visible:outline-none"
									>
										<IconX className="w-5 h-5" />
									</button>
								</Dialog.Title>

								{isSuccess ? (
									<p className="text-slate-500 mt-4">
										An invitation has been sent to {selectedUser?.person?.name || selectedUser?.display_name}
									</p>
								) : inviteError ? (
									<p className="text-red-500 mt-4">
										{(inviteError as any)?.message}
									</p>
								) : (
									<>
										<Combobox
											value={selectedUser}
											onChange={setSelectedUser}
										>
											<div className="relative">
												<div className="flex flex-col gap-1 mt-6">
													<label className="font-bold text-slate-600">
														Name or Email
													</label>
													<Combobox.Input
														className="w-full mt-1 px-3 py-1.5 text-dark-500 relative bg-white rounded-md border-none outline-none ring-1 ring-slate-300 hover:ring-slate-400 focus:ring-2 focus:ring-primary-500 focus:outline-none placeholder:text-slate-400"
														placeholder="e.g: Ashley or ashley@edgein.io"
														autoComplete={"off"}
														displayValue={(option: any) => option?.person?.name || option?.display_name}
														onChange={(event) => setQuery(event.target.value)}
													/>
												</div>

												<Combobox.Options className="absolute mt-1 shadow-md z-20 bg-white rounded-md border border-slate-200 w-full max-h-60 overflow-scroll scrollbar-hide">
													{isLoading && query != "" ? (
														<div className="px-4 py-2">
															{Array.from({ length: 3 }, (_, i) => (
																<PlaceholderPerson key={i} />
															))}
														</div>
													) : searchedPeople?.length > 0 ? (
														searchedPeople.map((item: any) => (
															<Combobox.Option
																key={item.id}
																value={item}
																className="flex items-center gap-x-2 px-4 py-2 cursor-pointer hover:bg-gray-50 hover:text-primary-500"
															>
																{item?.person?.picture ? (
																	<ElemPhoto
																		wrapClass="w-10 h-10 aspect-square shrink-0"
																		imgClass="object-cover rounded-full border border-slate-100"
																		photo={item.person.picture}
																		placeholder="user2"
																		placeholderClass="text-slate-300"
																		imgAlt={item.person.name}
																	/>
																) : (
																	<div className="flex items-center justify-center aspect-square w-10 rounded-full bg-slate-200 text-dark-500 text-xl capitalize">
																		{item?.display_name?.charAt(0)}
																	</div>
																)}

																<span>{item?.person?.name || item?.display_name}</span>
															</Combobox.Option>
														))
													) : (
														<div className="text-center">
															{query != "" && (
																<div className="px-6 py-4 text-lg font-bold">
																	Not Found
																</div>
															)}

															{validator.isEmail(query) && (
																<Combobox.Option
																	value={{
																		id: null,
																		display_name: query,
																	}}
																	className="py-2 cursor-pointer hover:bg-gray-50 hover:text-primary-500"
																>
																	Send an invitation to email address{" "}
																	<span className="font-bold">{query}</span>
																</Combobox.Option>
															)}
														</div>
													)}
												</Combobox.Options>
											</div>
										</Combobox>

										<div className="mt-6 float-right">
											<ElemButton
												btn="primary"
												disabled={!selectedUser}
												loading={isSubmitting}
												onClick={handleInvite}
											>
												Invite
											</ElemButton>
										</div>
									</>
								)}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default ElemInviteDialog;
