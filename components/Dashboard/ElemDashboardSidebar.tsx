import { useAuth } from "@/hooks/useAuth";
import { truncate } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { ElemPhoto } from "../ElemPhoto";
import { ElemMyListsMenu } from "../MyList/ElemMyListsMenu";
import { Resource_Edit_Access, useGetUserProfileQuery } from "@/graphql/types";
import {
	IconCash,
	IconCompanies,
	IconSettings,
	IconOrganization,
} from "../Icons";

type Props = {};

export const ElemDashboardSidebar: FC<Props> = ({}) => {
	const { user } = useAuth();
	const router = useRouter();
	const [organizations, setOrganizations] = useState(
		[] as Resource_Edit_Access[]
	);

	const { data: users } = useGetUserProfileQuery({
		id: user?.id || 0,
	});

	useEffect(() => {
		if (users?.users_by_pk?.organization_companies) {
			setOrganizations((prev) => {
				const temp = [
					...prev,
					...(users?.users_by_pk
						?.organization_companies as Resource_Edit_Access[]),
				];
				return temp;
			});
		}

		if (users?.users_by_pk?.organization_vc_firms) {
			setOrganizations((prev) => {
				const temp = [
					...prev,
					...(users?.users_by_pk
						?.organization_vc_firms as Resource_Edit_Access[]),
				];
				return temp;
			});
		}
	}, [users]);

	const getActiveClass = (path: string) => {
		return path === router.asPath ? "" : "";
	};

	return (
		<>
			<div>
				<h3 className="text-xl font-bold">My EdgeIn</h3>
				<ul className="flex flex-col mt-1 space-y-2 text-slate-600">
					<li className={`${getActiveClass("/profile/")}`} role="button">
						<Link href={`/profile`}>
							<a className="flex space-x-2 py-1 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500">
								<ElemPhoto
									photo={user?.profilePicture}
									wrapClass="flex items-center justify-center shrink-0 w-6 h-6 bg-white rounded-lg rounded-full"
									imgClass="object-fit max-w-full max-h-full rounded-full"
									imgAlt={"profile"}
									placeholder="user"
									placeholderClass="text-slate-300"
								/>
								{user?.profileName ? (
									<span className="first-letter:uppercase">
										{truncate(user?.profileName, { length: 15 })}
									</span>
								) : (
									<span>Profile Settings</span>
								)}
							</a>
						</Link>
					</li>

					<li className={`${getActiveClass("/account/")}`}>
						<Link href={`/account`}>
							<a className="flex space-x-2 py-1 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500">
								<IconSettings className="h-6 w-6" />
								<span>Account Settings</span>
							</a>
						</Link>
					</li>
				</ul>
			</div>

			<ElemMyListsMenu user={user} className="mt-6" />

			<div className="mt-6">
				<h3 className="text-xl font-bold">My Organizations</h3>
				<ul className="flex flex-col mt-1 space-y-2 text-slate-600">
					{organizations?.map((teamMember) => {
						const type = teamMember.company ? "companies" : "investors";
						const data = teamMember.company || teamMember.vc_firm;
						return (
							<li key={teamMember.id} role="button" className="">
								<Link href={`/organizations/${type}/${data?.slug}`}>
									<a className="flex space-x-2 py-1 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500">
										<ElemPhoto
											photo={data?.logo}
											imgAlt="company logo"
											wrapClass="flex items-center justify-center shrink-0 w-6 h-6 bg-white rounded-lg shadow-md mr-2 rounded-full"
											imgClass="object-fit max-w-full max-h-full rounded-full"
										/>
										<span>{data?.name}</span>
									</a>
								</Link>
							</li>
						);
					})}
					<li className={``} role="button">
						<Link href="/organizations">
							<a className="flex space-x-2 py-1 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500">
								<IconOrganization className="w-6 h-6" />
								<span>Manage Organization</span>
							</a>
						</Link>
					</li>

					{/* {renderMyCustomList()} */}
				</ul>
			</div>

			<div className="mt-6">
				<h3 className="text-xl font-bold">Explore</h3>
				<ul className="flex flex-col mt-1 space-y-2 text-slate-600">
					<li className={`${getActiveClass("/companies/")}`} role="button">
						<Link href={`/companies`}>
							<a className="flex space-x-2 py-1 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500">
								<IconCompanies className="w-6 h-6" />
								<span>Companies</span>
							</a>
						</Link>
					</li>
					<li className={`${getActiveClass("/investors/")}`} role="button">
						<Link href={`/investors`}>
							<a className="flex space-x-2 py-1 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500">
								<IconCash className="w-6 h-6" />
								<span>Investors</span>
							</a>
						</Link>
					</li>
				</ul>
			</div>
		</>
	);
};
