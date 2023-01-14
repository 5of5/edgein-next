import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { CompaniesList } from "@/components/MyList/CompaniesList";
import { InvestorsList } from "@/components/MyList/InvestorsList";
import { ModalListDetails } from "@/components/MyList/ModalListDetails";
import { EmojiHot, EmojiLike, EmojiCrap } from "@/components/Emojis";

import {
	Follows_Companies,
	Follows_Vc_Firms,
	useGetVcFirmsByListIdQuery,
	useGetCompaniesByListIdQuery,
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
import { useUser } from "@/context/userContext";

type Props = {};

const MyList: NextPage<Props> = ({}) => {
	const { listAndFollows: lists, refreshProfile } = useUser();
	const router = useRouter();

	const [selectedListName, setSelectedListName] = useState<null | string>(
		router.query.slug as string
	);

	const [isCustomList, setIsCustomList] = useState(false);

	// const [listNameModal, setListNameModal] = useState(false);

	const [companies, setCompanies] = useState<Follows_Companies[]>([]);
	const [vcfirms, setVcfirms] = useState<Follows_Vc_Firms[]>([]);

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
			//setListNameModal(false);
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

	const [theListId, setTheListId] = useState(0);

	const [theListCreatorId, setTheListCreatorId] = useState<any>();

	useEffect(() => {
		if (lists) {
			const list = find(lists, {
				id: parseInt((router.query.listId as string) || "0"),
			});

			if (setSelectedListName)
				setSelectedListName(() => {
					return list ? getNameFromListName(list) : "";
				});

			if (setTheListCreatorId)
				setTheListCreatorId(() => {
					return list ? getUserIdFromListCreator(list) : "";
				});

			if (setIsCustomList)
				setIsCustomList(() => {
					return list
						? !["hot", "like", "crap"].includes(getNameFromListName(list))
						: false;
				});
		}
	}, [
		lists,
		router.query.listId,
		setSelectedListName,
		setTheListCreatorId,
		setIsCustomList,
	]);

	// const { data: users } = useGetUserProfileQuery({
	// 	id: theListCreatorId | 0,
	// });

	// console.log(users?.users_by_pk?.person);

	useEffect(() => {
		if (router.isReady) {
			setTheListId(parseInt(router.query?.listId as string));
		}
	}, [router]);

	const { data: companiesData } = useGetCompaniesByListIdQuery({
		list_id: theListId,
	});

	const { data: vcFirms } = useGetVcFirmsByListIdQuery({
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

					{isCustomList ? (
						<>
							<ModalListDetails
								theListName={selectedListName ? selectedListName : ""}
								// theListDescription={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}
								// theListCreator={"Raymond Aleman"}
								theListId={parseInt(router.query.listId as string)}
								onSaveListName={onSaveListName}
								onDeleteList={onDeleteList}
							/>
						</>
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

			<CompaniesList
				companies={companies}
				selectedListName={selectedListName}
				isCustomList={isCustomList}
			/>

			<InvestorsList
				vcfirms={vcfirms}
				selectedListName={selectedListName}
				isCustomList={isCustomList}
			/>

			<Toaster />
		</DashboardLayout>
	);
};

export default MyList;
