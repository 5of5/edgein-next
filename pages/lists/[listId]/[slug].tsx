import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { CompaniesList } from "@/components/MyList/CompaniesList";
import { InvestorsList } from "@/components/MyList/InvestorsList";
import { ModalListDetails } from "@/components/MyList/ModalListDetails";
import { EmojiHot, EmojiLike, EmojiCrap } from "@/components/Emojis";
import { PlaceholderTable } from "@/components/Placeholders";
import moment from "moment-timezone";

import {
	Follows_Companies,
	Follows_Vc_Firms,
	useGetVcFirmsByListIdQuery,
	useGetCompaniesByListIdQuery,
	useGetListUserGroupsQuery,
	List_User_Groups_Bool_Exp,
} from "@/graphql/types";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { find, startCase } from "lodash";
import {
	getNameFromListName,
	getUserIdFromListCreator,
} from "@/utils/reaction";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@/context/userContext";

type Props = {};

const MyList: NextPage<Props> = ({}) => {
	const { listAndFollows: lists, refreshProfile, user } = useUser();
	const router = useRouter();

	const [selectedListName, setSelectedListName] = useState<null | string>(
		router.query.slug as string
	);

	const [isCustomList, setIsCustomList] = useState(false);
	const [isFollowing, setIsFollowing] = useState(true);

	const [companies, setCompanies] = useState<Follows_Companies[]>([]);
	const [vcfirms, setVcfirms] = useState<Follows_Vc_Firms[]>([]);

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
		const updateNameRes = await fetch(`/api/update_list/`, {
			method: "PUT",
			body: JSON.stringify({
				id: parseInt(router.query.listId as string),
				name,
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
		const deleteRes = await fetch(`/api/delete_list/?listId=${id}`, {
			method: "DELETE",
		});

		if (deleteRes.ok) {
			const hotId =
				find(lists, (list) => "hot" === getNameFromListName(list))?.id || 0;
			router.push(`/lists/${hotId}/hot`);
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
		const res = await fetch("/api/add_group_to_list/", {
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

	const [theListId, setTheListId] = useState(0);

	const [theListCreatorId, setTheListCreatorId] = useState<any>();

	const [theListCreatedDate, setTheListCreatedDate] = useState<string>();

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

				setTheListCreatorId(() => {
					return list ? getUserIdFromListCreator(list) : "";
				});

				setIsCustomList(() => {
					return list
						? !["hot", "like", "crap"].includes(getNameFromListName(list))
						: false;
				});
			} else {
				setSelectedListName(startCase(router.query.slug as string));
				setIsCustomList(true);
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

	useEffect(() => {
		if (companiesData)
			setCompanies(companiesData?.follows_companies as Follows_Companies[]);
		if (vcFirms) setVcfirms(vcFirms?.follows_vc_firms as Follows_Vc_Firms[]);
	}, [companiesData, vcFirms]);

	const listNameTitle = selectedListName === "crap" ? "sh**" : selectedListName;

	return (
		<DashboardLayout>
			<div className="w-full mb-2">
				<div className="flex items-center">
					{listNameTitle === "hot" && <EmojiHot className="w-6 h-6 mr-2" />}
					{listNameTitle === "like" && <EmojiLike className="w-6 h-6 mr-2" />}
					{listNameTitle === "sh**" && <EmojiCrap className="w-6 h-6 mr-2" />}

					{}

					{isCustomList ? (
						isFollowing || theListCreatorId === user?.id ? (
							<>
								<ModalListDetails
									theListName={selectedListName ? selectedListName : ""}
									// theListDescription={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}
									theListCreator={user?.display_name}
									theListDate={theListCreatedDate}
									theListId={parseInt(router.query.listId as string)}
									groups={
										groups?.list_user_groups?.map(
											(group) => group.user_group
										) || []
									}
									onSaveListName={onSaveListName}
									onDeleteList={onDeleteList}
									onAddGroups={onAddGroups}
								/>
							</>
						) : (
							<h1 className="h-6 mr-2 font-bold text-xl capitalize">
								Previewing: {listNameTitle}
							</h1>
						)
					) : (
						<h1 className="h-6 mr-2 font-bold text-xl capitalize">
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

			{companiesError ? (
				<h4>Error loading companies</h4>
			) : companiesLoading ? (
				<div className="rounded-lg p-5 bg-white shadow mb-8">
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
				<div className="rounded-lg p-5 bg-white shadow mb-8">
					<PlaceholderTable />
				</div>
			) : (
				<InvestorsList
					vcfirms={vcfirms}
					selectedListName={selectedListName}
					isCustomList={isCustomList}
				/>
			)}

			<Toaster />
		</DashboardLayout>
	);
};

export default MyList;
