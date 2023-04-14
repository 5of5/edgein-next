import { FC, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import { Resource_Edit_Access, useGetUserProfileQuery } from "@/graphql/types";
import Link from "next/link";
import {
	IconCustomList,
	IconPolygonDown,
	IconListPlus,
	IconInformationCircle,
	IconPlus,
	IconContributor,
} from "@/components/Icons";

const ElemMyEdgeInMenu = dynamic(() => import("./ElemMyEdgeInMenu"), {
	ssr: false,
});
const ElemMyListsMenu = dynamic(() => import("./ElemMyListsMenu"), {
	ssr: false,
});
const ElemMyGroupsMenu = dynamic(() => import("./ElemMyGroupsMenu"), {
	ssr: false,
});
const ElemExploreMenu = dynamic(() => import("./ElemExploreMenu"), {
	ssr: false,
});

type Props = {
	className?: string;
};

export const DashboardSidebar: FC<Props> = ({ className = "" }) => {
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

	const getActiveClass = () => {
		return `/notes/` === router.asPath ? "  text-primary-500 bg-slate-200" : "";
	};

	return (
		<nav className={`relative  ${className}`}>
			<div className="sticky top-0 -ml-0.5 pointer-events-none">
				<div className="h-8 bg-gradient-to-b from-white lg:from-gray-50"></div>
			</div>

			<div className="-mt-5">
				<ElemMyEdgeInMenu />
				<ElemMyListsMenu className="mt-6" />
				<div className="mt-6">
					<div className="flex items-center">
						<div className="flex focus:outline-none hover:opacity-75">
							<span className="text-lg font-bold">My Notes</span>
						</div>
						{/* <ElemTooltip
									content="Monitor organizations of your interest."
									className="ml-1"
								>
									<IconInformationCircle className="h-5 w-5 text-slate-600" />
								</ElemTooltip> */}
					</div>
					<ul className="mt-1 space-y-1 text-slate-600">
						<li role="button">
							<Link href="/notes/">
								<a
									className={`flex items-center space-x-2 py-1 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500 ${getActiveClass}`}
									title="notes"
								>
									<IconCustomList className="h-6 w-6 shrink-0" />
									<span className="line-clamp-1 break-all flex-1">Notes</span>
									{/* <div className="bg-slate-200 inline-block rounded-full font-medium py-0.5 px-2 text-xs">
												{notes.total_no_of_resources}
											</div> */}
								</a>
							</Link>
						</li>
					</ul>
				</div>
				<ElemMyGroupsMenu className="mt-6" />
				<ElemExploreMenu className="mt-6" />
			</div>
		</nav>
	);
};
