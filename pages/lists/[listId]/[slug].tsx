import { ElemCompanies } from "@/components/MyList/ElemCompanies";
import { ElemDeleteListModal } from "@/components/MyList/ElemDeleteListModal";
import { ElemInvestors } from "@/components/MyList/ElemInvestors";
import { ElemListEditModal } from "@/components/MyList/ElemListEditModal";
import { ElemListOptionMenu } from "@/components/MyList/ElemListOptionMenu";
import { ElemMyListsMenu } from "@/components/MyList/ElemMyListsMenu";
import { IconCustomList } from "@/components/Icons";
import { EmojiHot, EmojiLike, EmojiCrap } from "@/components/Emojis";
import {
	Follows_Companies,
	Follows_Vc_Firms,
	useGetVcFirmsByListIdQuery,
	useGetCompaniesByListIdQuery,
} from "@/graphql/types";
import { useAuth } from "@/hooks/useAuth";
import { has } from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";

type Props = {};

const MyList: NextPage<Props> = ({}) => {
	const { user } = useAuth();
	const router = useRouter();
	const [selectedListName, setSelectedListName] = useState<null | string>(
		"hot"
	);
	const [totalFunding, setTotalFunding] = useState(0);
	const [tagsCount, setTagsCount] = useState({});
	const [isCustomList, setIsCustomList] = useState(false);

	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const [isUpdated, setIsUpdated] = useState(0);

	const [companies, setCompanies] = useState<Follows_Companies[]>([]);
	const [vcfirms, setVcfirms] = useState<Follows_Vc_Firms[]>([]);

	useEffect(() => {
		if (companies) {
			let funding = 0;
			companies.forEach(({ company }) => {
				setTagsCount(() => {
					let prev: any = {};
					company?.tags?.forEach((tag: string) => {
						if (!has(prev, tag)) prev = { ...prev, [tag]: 1 };
						else prev[tag] += 1;
					});
					return prev;
				});
				company?.investment_rounds.forEach((round) => {
					funding += round.amount;
				});
			});

			setTotalFunding(funding);
		}
	}, [companies]);

	const handleRowClick = (link: string) => {
		router.push(link);
	};

	const getAlternateRowColor = (index: number) => {
		if ((index + 1) % 2 === 0) return " bg-slate-100";
		return "";
	};

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
		}
	};

	const { data: companiesData } = useGetCompaniesByListIdQuery({
		list_id: parseInt(router.query?.listId as string),
	});

	const { data: vcFirms } = useGetVcFirmsByListIdQuery({
		list_id: parseInt(router.query?.listId as string),
	});

	useEffect(() => {
		if (companiesData)
			setCompanies(companiesData?.follows_companies as Follows_Companies[]);
		if (vcFirms) setVcfirms(vcFirms?.follows_vc_firms as Follows_Vc_Firms[]);
	}, [companiesData, vcFirms]);

	return (
		<DashboardLayout>
			<div className="col-span-3">
				<div className="w-full mb-7">
					<div className="inline-flex ">
						<h1 className="flex font-bold text-xl capitalize mb-1 items-center">
							{selectedListName === "hot" && (
								<EmojiHot className="w-6 h-6 mr-2" />
							)}
							{selectedListName === "like" && (
								<EmojiLike className="w-6 h-6 mr-2" />
							)}
							{selectedListName === "crap" && (
								<EmojiCrap className="w-6 h-6 mr-2" />
							)}
							{isCustomList && (
								<IconCustomList className="h-6 w-6 text-slate-600 mr-2" />
							)}
							{selectedListName}
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
					<p className="first-letter:uppercase text-slate-600">
						{selectedListName} lists are generated from your{" "}
						{selectedListName?.toLowerCase()} reactions.
					</p>
				</div>

				<ElemCompanies
					handleNavigation={handleRowClick}
					companies={companies}
					selectedListName={selectedListName}
					totalFunding={totalFunding}
					getAlternateRowColor={getAlternateRowColor}
					tagsCount={tagsCount}
					isCustomList={isCustomList}
					setIsUpdated={setIsUpdated}
				/>

				<ElemInvestors
					handleNavigation={handleRowClick}
					vcfirms={vcfirms}
					selectedListName={selectedListName}
					getAlternateRowColor={getAlternateRowColor}
					isCustomList={isCustomList}
					setIsUpdated={setIsUpdated}
				/>
			</div>
		</DashboardLayout>
	);
};

export default MyList;
