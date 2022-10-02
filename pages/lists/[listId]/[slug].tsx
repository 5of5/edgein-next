import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { ElemCompaniesNew } from "@/components/MyList/ElemCompaniesNew";
import { ElemInvestorsNew } from "@/components/MyList/ElemInvestorsNew";
import { ElemDeleteListModal } from "@/components/MyList/ElemDeleteListModal";
import { ElemListEditModal } from "@/components/MyList/ElemListEditModal";
import { ElemListOptionMenu } from "@/components/MyList/ElemListOptionMenu";
import { ElemMyListsMenu } from "@/components/MyList/ElemMyListsMenu";
import { EmojiHot, EmojiLike, EmojiCrap } from "@/components/Emojis";
import {
	Follows_Companies,
	Follows_Vc_Firms,
	useGetVcFirmsByListIdQuery,
	useGetCompaniesByListIdQuery,
} from "@/graphql/types";
import { useAuth } from "@/hooks/useAuth";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type Props = {};

const MyList: NextPage<Props> = ({}) => {
	const { user } = useAuth();
	const router = useRouter();
	const [selectedListName, setSelectedListName] = useState<null | string>(
		"hot"
	);

	const [isCustomList, setIsCustomList] = useState(false);

	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const [isUpdated, setIsUpdated] = useState(0);

	const [companies, setCompanies] = useState<Follows_Companies[]>([]);
	const [vcfirms, setVcfirms] = useState<Follows_Vc_Firms[]>([]);

	const onDeleteList = async (id: number) => {
		const deleteRes = await fetch(`/api/delete_list?listId=${id}`, {
			method: "DELETE",
		});

		if (deleteRes.ok) router.push("/my-list");
	};

	const onSave = async (name: string) => {
		const updateNameRes = await fetch(`/api/update_list`, {
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
			setShowEditModal(false);
			setSelectedListName(name);
			setIsUpdated(new Date().getTime());
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
					position: "bottom-left",
				}
			);
		}
	};

	const [theListId, setTheListId] = useState(0);

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
			<ElemMyListsMenu
				user={user}
				setIsCustom={setIsCustomList}
				setSelectedListName={setSelectedListName}
				isUpdated={isUpdated}
				className="hidden"
			/>
			<div className="w-full mb-4">
				<div className="flex items-center">
					{selectedListName === "hot" && <EmojiHot className="w-6 h-6 mr-2" />}
					{selectedListName === "like" && (
						<EmojiLike className="w-6 h-6 mr-2" />
					)}
					{selectedListName === "crap" && (
						<EmojiCrap className="w-6 h-6 mr-2" />
					)}

					<h1 className="h-6 mr-2 font-bold text-xl capitalize">
						{listNameTitle}
					</h1>

					{isCustomList && (
						<>
							<ElemListOptionMenu
								onUpdateBtn={() => setShowEditModal(true)}
								onDeleteBtn={() => setShowDeleteModal(true)}
							/>

							<ElemListEditModal
								onCloseModal={() => setShowEditModal(false)}
								isOpen={showEditModal}
								currentName={selectedListName ? selectedListName : ""}
								onSave={onSave}
							/>

							<ElemDeleteListModal
								onCloseModal={() => setShowDeleteModal(false)}
								onDelete={onDeleteList}
								isOpen={showDeleteModal}
								listName={selectedListName}
								deleteId={parseInt(router.query.listId as string)}
							/>
						</>
					)}
				</div>
				{(selectedListName === "hot" ||
					selectedListName === "like" ||
					selectedListName === "crap") && (
					<p className="first-letter:uppercase text-slate-600">
						{listNameTitle} lists are generated from your {listNameTitle}{" "}
						reactions.
					</p>
				)}
			</div>

			<ElemCompaniesNew
				companies={companies}
				selectedListName={selectedListName}
				isCustomList={isCustomList}
				setIsUpdated={setIsUpdated}
			/>

			<ElemInvestorsNew
				vcfirms={vcfirms}
				selectedListName={selectedListName}
				isCustomList={isCustomList}
				setIsUpdated={setIsUpdated}
			/>

			<Toaster />
		</DashboardLayout>
	);
};

export default MyList;
