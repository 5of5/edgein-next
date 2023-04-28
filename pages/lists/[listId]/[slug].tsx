import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { CompaniesList } from "@/components/my-list/companies-list";
import { InvestorsList } from "@/components/my-list/investors-list";
import { ModalListDetails } from "@/components/my-list/modal-list-details";
import { EmojiHot, EmojiLike, EmojiCrap } from "@/components/emojis";
import { PlaceholderTable } from "@/components/placeholders";
import moment from "moment-timezone";
import Link from "next/link";

import {
	Follows_Companies,
	Follows_Vc_Firms,
	Follows_People,
	useGetVcFirmsByListIdQuery,
	useGetCompaniesByListIdQuery,
	useGetListUserGroupsQuery,
	List_User_Groups_Bool_Exp,
	useGetPeopleByListIdQuery,
	Users,
} from "@/graphql/types";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { find } from "lodash";
import {
	getNameFromListName,
	getUserIdFromListCreator,
} from "@/utils/reaction";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@/context/user-context";
import { ElemButton } from "@/components/elem-button";
import { PeopleList } from "@/components/my-list/people-list";

type Props = {};

const MyList: NextPage<Props> = () => {
	const { listAndFollows: lists, refreshProfile, user } = useUser();
	const router = useRouter();

	const [selectedListName, setSelectedListName] = useState<null | string>(
		router.query.slug as string
	);

	const [isCustomList, setIsCustomList] = useState(false);
	const [isFollowing, setIsFollowing] = useState(false);

	const [companies, setCompanies] = useState<Follows_Companies[]>([]);
	const [vcfirms, setVcfirms] = useState<Follows_Vc_Firms[]>([]);
	const [people, setPeople] = useState<Follows_People[]>([]);

	const { data: groups, refetch: refetchGroups } = useGetListUserGroupsQuery(
		{
			where: {
				list_id: { _eq: parseInt(router.query.listId as string) },
			} as List_User_Groups_Bool_Exp,
		},
		{
			enabled: Boolean(router.query.listId),
		}
	);

	const onSaveListName = async (name: string) => {
		const updateNameRes = await fetch(`/api/update-list/`, {
			method: "PUT",
			body: JSON.stringify({
				id: parseInt(router.query.listId as string),
				payload: { name },
			}),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		if (updateNameRes.ok) {
			setSelectedListName(name);
			refreshProfile();
			toast.custom(
				(t) => (
					<div
						className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
							t.visible ? "animate-fade-in-up" : "opacity-0"
						}`}
					>
						List updated
					</div>
				),
				{
					duration: 3000,
					position: "top-center",
				}
			);
		}
	};

	const onDeleteList = async (id: number) => {
		const deleteRes = await fetch(`/api/delete-list/?listId=${id}`, {
			method: "DELETE",
		});

		if (deleteRes.ok) {
			const hotId =
				find(lists, (list) => "hot" === getNameFromListName(list))?.id || 0;

			router.push(`/lists/${hotId}/hot`);
			//router.reload();
			refreshProfile();
			toast.custom(
				(t) => (
					<div
						className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
							t.visible ? "animate-fade-in-up" : "opacity-0"
						}`}
					>
						List Deleted
					</div>
				),
				{
					duration: 3000,
					position: "top-center",
				}
			);
		}
	};

	const onAddGroups = async (groupIds: Array<number>) => {
		const res = await fetch("/api/add-group-to-list/", {
			method: "POST",
			body: JSON.stringify({
				listId: parseInt(router.query.listId as string),
				groupIds,
			}),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		if (res.ok) {
			refetchGroups();
			refreshProfile();
			toast.custom(
				(t) => (
					<div
						className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
							t.visible ? "animate-fade-in-up" : "opacity-0"
						}`}
					>
						Groups Changed
					</div>
				),
				{
					duration: 3000,
					position: "top-center",
				}
			);
		}
	};

	const onChangePublic = async (value: boolean) => {
		const res = await fetch(`/api/update_list/`, {
			method: "PUT",
			body: JSON.stringify({
				id: parseInt(router.query.listId as string),
				payload: { public: value },
			}),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		if (res.ok) {
			setTheListPublic(value);
			refreshProfile();
			toast.custom(
				(t) => (
					<div
						className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
							t.visible ? "animate-fade-in-up" : "opacity-0"
						}`}
					>
						List updated
					</div>
				),
				{
					duration: 3000,
					position: "top-center",
				}
			);
		}
	};

	const onFollowList = async () => {
		const response = await fetch("/api/toggle_follow_list/", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				listId: theListId,
				userId: user?.id,
			}),
		});

		if (response.status === 200) {
			refreshProfile();
		}
	};

	const [theListId, setTheListId] = useState(0);

	const [theListCreatorId, setTheListCreatorId] = useState<any>();

	const [theListCreator, setTheListCreator] = useState<Users>();

	const [theListCreatedDate, setTheListCreatedDate] = useState<string>();

	const [theListPublic, setTheListPublic] = useState<boolean>(false);

	useEffect(() => {
		if (lists) {
			const list = find(lists, {
				id: parseInt((router.query.listId as string) || "0"),
			});

			if (list) {
				setTheListCreatedDate(() => {
					return list ? moment(list.created_at).format("LL") : "";
				});

				setSelectedListName(() => {
					return list ? getNameFromListName(list) : "";
				});

				setTheListPublic(!!list?.public);

				setTheListCreatorId(() => {
					return list ? getUserIdFromListCreator(list) : "";
				});

				setIsCustomList(() => {
					return list
						? !["hot", "like", "crap"].includes(getNameFromListName(list))
						: false;
				});

				setTheListCreator(list.created_by as Users);
				setIsFollowing(true);
			} else {
				setSelectedListName(router.query.slug as string);
				setIsCustomList(
					!["like", "hot", "sh**"].includes(router.query.slug as string)
				);
				setIsFollowing(false);
			}
		}
	}, [
		lists,
		router.query.listId,
		router.query.slug,
		setSelectedListName,
		setTheListCreatorId,
		setIsCustomList,
		setTheListPublic,
	]);
	useEffect(() => {
		if (router.isReady) {
			setTheListId(parseInt(router.query?.listId as string));
		}
	}, [router]);

	const {
		data: companiesData,
		error: companiesError,
		isLoading: companiesLoading,
	} = useGetCompaniesByListIdQuery({
		list_id: theListId,
	});

	const {
		data: vcFirms,
		error: vcFirmsError,
		isLoading: vcFirmsLoading,
	} = useGetVcFirmsByListIdQuery({
		list_id: theListId,
	});

	const {
		data: listPeople,
		error: listPeopleError,
		isLoading: listPeopleLoading,
	} = useGetPeopleByListIdQuery({
		list_id: theListId,
	});

	useEffect(() => {
		if (companiesData)
			setCompanies(companiesData?.follows_companies as Follows_Companies[]);
		if (vcFirms) setVcfirms(vcFirms?.follows_vc_firms as Follows_Vc_Firms[]);
		if (listPeople) setPeople(listPeople?.follows_people as Follows_People[]);
	}, [companiesData, vcFirms, listPeople]);

	const listNameTitle = selectedListName === "crap" ? "sh**" : selectedListName;
	return (
		<DashboardLayout>
			<div className="w-full mb-2">
				<div className="flex items-center">
					{listNameTitle === "hot" && <EmojiHot className="w-6 h-6 mr-2" />}
					{listNameTitle === "like" && <EmojiLike className="w-6 h-6 mr-2" />}
					{listNameTitle === "sh**" && <EmojiCrap className="w-6 h-6 mr-2" />}

					{isCustomList ? (
						<div>
							{theListCreatorId === user?.id ? (
								<>
									<ModalListDetails
										theListName={selectedListName ? selectedListName : ""}
										// theListDescription={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}
										theListCreator={
											theListCreator?.person?.name ||
											theListCreator?.display_name ||
											""
										}
										theListDate={theListCreatedDate}
										theListPublic={theListPublic}
										theListId={parseInt(router.query.listId as string)}
										groups={
											groups?.list_user_groups?.map(
												(group) => group.user_group
											) || []
										}
										onSaveListName={onSaveListName}
										onDeleteList={onDeleteList}
										onAddGroups={onAddGroups}
										onChangePublic={onChangePublic}
									/>
								</>
							) : (
								<div className="flex items-center gap-x-2">
									<h1 className="mr-2 font-bold text-xl capitalize leading-tight">
										Previewing: {listNameTitle}
									</h1>
									{isCustomList && !isFollowing && (
										<ElemButton btn="primary" onClick={onFollowList}>
											Follow
										</ElemButton>
									)}
								</div>
							)}
							{theListCreator && (
								<p className="pt-1 text-slate-600">
									by{" "}
									{theListCreator?.person ? (
										<Link
											href={`/people/${theListCreator?.person?.slug}`}
											passHref
										>
											<a className="hover:text-primary-500">
												{theListCreator?.person?.name}
											</a>
										</Link>
									) : (
										<span>{theListCreator?.display_name}</span>
									)}
									<span aria-hidden="true"> · </span>
									{theListCreatedDate}
								</p>
							)}
						</div>
					) : (
						<h1 className="mr-2 font-bold text-xl capitalize leading-tight">
							{listNameTitle}
						</h1>
					)}
				</div>

				{(listNameTitle === "hot" ||
					listNameTitle === "like" ||
					listNameTitle === "sh**") && (
					<p className="mt-1 first-letter:uppercase text-slate-600">
						{listNameTitle} lists are generated from your {listNameTitle}{" "}
						reactions.
					</p>
				)}
			</div>

			{(!isCustomList || isFollowing || theListCreatorId === user?.id) && (
				<>
					{companiesError ? (
						<h4>Error loading companies</h4>
					) : companiesLoading ? (
						<div className="rounded-lg p-5 bg-white shadow mb-8 overflow-auto">
							<PlaceholderTable />
						</div>
					) : (
						<CompaniesList
							companies={companies}
							selectedListName={selectedListName}
							isCustomList={isCustomList}
						/>
					)}

					{vcFirmsError ? (
						<h4>Error loading Investors</h4>
					) : vcFirmsLoading ? (
						<div className="rounded-lg p-5 bg-white shadow mb-8 overflow-auto">
							<PlaceholderTable />
						</div>
					) : (
						<InvestorsList
							vcfirms={vcfirms}
							selectedListName={selectedListName}
							isCustomList={isCustomList}
						/>
					)}

					{listPeopleError ? (
						<h4>Error loading people</h4>
					) : listPeopleLoading ? (
						<div className="rounded-lg p-5 bg-white shadow mb-8 overflow-auto">
							<PlaceholderTable />
						</div>
					) : (
						<PeopleList people={people} selectedListName={selectedListName} />
					)}
				</>
			)}

			{theListCreatorId != user?.id && !isFollowing && (
				<div className=" w-full mt-7 p-5 bg-white shadow rounded-lg">
					<p className="text-lg">
						Follow list to access the list and view updates.
					</p>
				</div>
			)}

			<Toaster />
		</DashboardLayout>
	);
};

export default MyList;
