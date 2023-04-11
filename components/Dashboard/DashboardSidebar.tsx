import { FC, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import { Resource_Edit_Access, useGetUserProfileQuery } from "@/graphql/types";
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

	return (
		<nav className={`relative  ${className}`}>
			<div className="sticky top-0 -ml-0.5 pointer-events-none">
				<div className="h-8 bg-gradient-to-b from-white lg:from-gray-50"></div>
			</div>

			<div className="-mt-5">
				<ElemMyEdgeInMenu />
				<ElemMyListsMenu className="mt-6" />
				<ElemMyGroupsMenu className="mt-6" />
				<ElemExploreMenu className="mt-6" />
			</div>
		</nav>
	);
};
