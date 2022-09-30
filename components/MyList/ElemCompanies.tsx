import { Follows_Companies } from "@/graphql/types";
import { FC, useCallback, useEffect, useState } from "react";
import { ElemPhoto } from "../ElemPhoto";
import { ElemDeleteListsModal } from "./ElemDeleteListsModal";
import { ElemListsOptionMenu } from "./ElemListsOptionMenu";
import { convertToInternationalCurrencySystem } from "@/utils";
import { ElemReactions } from "../ElemReactions";

type Props = {
	companies?: Follows_Companies[];
	isCustomList?: boolean;
	selectedListName: string | null;
	totalFunding: number;
	getAlternateRowColor: (index: number) => string;
	handleNavigation: (link: string) => void;
	tagsCount: any;
	setIsUpdated: Function;
};

export const ElemCompanies: FC<Props> = ({
	companies,
	isCustomList,
	selectedListName,
	totalFunding,
	getAlternateRowColor,
	handleNavigation,
	tagsCount,
	setIsUpdated,
}) => {
	const [selected, setSelected] = useState<number[]>([]);

	const [showDeleteItemsModal, setShowDeleteItemsModal] = useState(false);

	const [resourceList, setResourceList] = useState<Follows_Companies[]>();

	useEffect(() => {
		if (companies) setResourceList(companies);
	}, [companies]);

	const toggleCheckboxes =
		(clearAll: boolean = false) =>
		() => {
			if (clearAll) {
				setSelected([]);
				return;
			}

			if (selected.length > 0 && resourceList?.length === selected.length) {
				setSelected([]);
			} else if ((resourceList?.length || 0) > selected.length) {
				setSelected((prev) => {
					const items = [...prev];
					resourceList?.forEach(({ id }) => {
						if (!items.includes(id!)) items.push(id!);
					});
					return items;
				});
			}
		};

	const toggleCheckbox = (id: number) => () => {
		setSelected((prev) => {
			const items = [...prev];

			const index = items.indexOf(id);
			if (index === -1) items.push(id);
			else items.splice(index, 1);

			return items;
		});
	};

	const isChecked = useCallback(
		(id: number) => {
			return selected.includes(id);
		},
		[selected]
	);

	const isCheckedAll = () => {
		return (
			selected.length === resourceList?.length && Boolean(resourceList?.length)
		);
	};

	const onRemove = async () => {
		const deleteCompaniesRes = await fetch(`/api/delete_follows`, {
			method: "POST",
			body: JSON.stringify({ followIds: selected }),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		if (deleteCompaniesRes.ok) {
			setResourceList((prev) => {
				return prev?.filter(
					(resource) => !selected.includes(resource.id as number)
				);
			});
			setSelected([]);
			setIsUpdated(new Date().getTime());
		}
	};

	return (
		<div className="rounded-lg p-3 bg-white col-span-3">
			<div className="inline-flex">
				<h2 className="font-bold text-xl capitalize mr-2">
					{selectedListName}: Companies
				</h2>

				{isCustomList && selected.length > 0 && (
					<>
						<ElemListsOptionMenu
							onRemoveBtn={() => setShowDeleteItemsModal(true)}
							onClearSelection={toggleCheckboxes(true)}
						/>

						<ElemDeleteListsModal
							isOpen={showDeleteItemsModal}
							onCloseModal={() => setShowDeleteItemsModal(false)}
							listName={selectedListName}
							onDelete={onRemove}
						/>
					</>
				)}
			</div>

			<div className="w-full mt-1 flex justify-between">
				<div className="inline-flex items-start">
					<span className="font-bold text-sm mr-2">Tags:</span>
					<div className="inline-flex gap-2 flex-wrap">
						{tagsCount &&
							Object.keys(tagsCount).map((tag) => (
								<span
									key={tag}
									className="shrink-0 px-2 py-0.5 bg-slate-200 rounded-md text-sm"
								>
									{tag} ({tagsCount[tag]})
								</span>
							))}
					</div>
				</div>

				<div className="inline-flex items-start shrink-0">
					<span className="font-semibold text-sm mr-2">
						Total Funding: ${convertToInternationalCurrencySystem(totalFunding)}
					</span>
				</div>
			</div>

			<div className="mt-3 w-full rounded-lg border border-slate-200">
				<table className="w-full">
					<thead>
						<tr className="text-left text-sm border-b-slate-200">
							{isCustomList && (
								<th className="pl-2 px-1 border border-b-slate-200 border-r-0 border-l-0 border-t-0">
									<input
										type="checkbox"
										className="align-middle"
										onChange={toggleCheckboxes()}
										checked={isCheckedAll()}
									/>
								</th>
							)}
							<th className="px-1 border border-b-slate-200 border-r-0 border-l-0 border-t-0">
								Name
							</th>
							<th className="px-1 border border-b-slate-200 border-r-0 border-l-0 border-t-0">
								Token/Value
							</th>
							<th className="px-1 border border-b-slate-200 border-r-0 border-l-0 border-t-0">
								Team Size
							</th>
							<th className="px-1 border border-b-slate-200 border-r-0 border-l-0 border-t-0">
								Location
							</th>
							<th className="px-1 border border-b-slate-200 border-r-0 border-l-0 border-t-0">
								Reactions
							</th>
						</tr>
					</thead>

					<tbody>
						{resourceList?.map(({ company, id }, index) => (
							<tr
								key={company?.id}
								className={`text-left text-sm${getAlternateRowColor(
									index
								)} hover:bg-slate-100`}
								onClick={() => handleNavigation(`/companies/${company?.slug}`)}
								role="button"
							>
								{isCustomList && (
									<td className="pl-2 px-1 py-2">
										<input
											type="checkbox"
											onChange={toggleCheckbox(id as number)}
											onClick={(e) => e.stopPropagation()}
											checked={isChecked(id as number)}
										/>
									</td>
								)}
								<td className="px-1 inline-flex items-center py-2">
									<ElemPhoto
										photo={company?.logo}
										wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white rounded-lg shadow-md mr-2"
										imgClass="object-fit max-w-full max-h-full"
										imgAlt={"chia"}
									/>
									{company?.name}
								</td>
								<td className="px-1 py-2">
									{company?.coin?.ticker ? company?.coin?.ticker : "-"}
								</td>
								<td className="px-1 py-2">{company?.teamMembers.length}</td>
								<td className="px-1 py-2">{company?.location}</td>
								<td className="px-1 py-2">
                                    <ElemReactions data={company} isInteractive={false}/>
								</td>
							</tr>
						))}

						{(!resourceList || resourceList?.length === 0) && (
							<tr>
								<td colSpan={5} className="text-center px-1 py-2">
									No Companies
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};
