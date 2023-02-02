import { useAuth } from "@/hooks/useAuth";
import { truncate } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { ElemPhoto } from "@/components/ElemPhoto";
import { ElemMyListsMenu } from "@/components/MyList/ElemMyListsMenu";
import { Resource_Edit_Access, useGetUserProfileQuery } from "@/graphql/types";
import {
	IconPolygonDown,
	IconCash,
	IconCompanies,
	IconSettings,
	IconOrganization,
	IconUserCircle,
} from "@/components/Icons";
import { Disclosure } from "@headlessui/react";
import ElemMyGroupsMenu from "./ElemMyGroupsMenu";

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

	const getActiveClass = (path: string) => {
		return path === router.asPath ? "text-primary-500 bg-slate-200" : "";
	};

	return (
		<aside className={className}>
			<Disclosure defaultOpen={true} as="div">
				{({ open }) => (
					<>
						<div className="w-full flex items-center justify-between">
							<Disclosure.Button className="flex focus:outline-none hover:opacity-75">
								<IconPolygonDown
									className={`${
										open ? "rotate-0" : "-rotate-90 "
									} h-6 w-6 transform transition-all`}
								/>
								<span className="text-xl font-bold">My EdgeIn</span>
							</Disclosure.Button>
						</div>

						<Disclosure.Panel as="ul" className="mt-1 space-y-1 text-slate-600">
							<li>
								<Link href={`/profile`} passHref>
									<a
										className={`flex space-x-2 py-1 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500 ${getActiveClass(
											"/profile/"
										)}`}
									>
										{user?.person?.picture ? (
											<ElemPhoto
												photo={user?.person?.picture}
												wrapClass="flex items-center justify-center shrink-0 w-6 h-6 bg-white rounded-full"
												imgClass="object-fit max-w-full max-h-full rounded-full"
												imgAlt={"profile"}
												placeholder="user"
												placeholderClass="text-slate-400 hover:text-slate-400"
											/>
										) : (
											<div className="flex items-center justify-center shrink-0 w-6 h-6 ">
												<IconUserCircle className="h-6 w-6 " />
											</div>
										)}
										<span>Profile Settings</span>
									</a>
								</Link>
							</li>

							<li>
								<Link href="/account/" passHref>
									<a
										className={`flex space-x-2 py-1.5 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500 ${getActiveClass(
											"/account/"
										)}`}
									>
										<IconSettings className="h-6 w-6" />
										<span>Account Settings</span>
									</a>
								</Link>
							</li>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>

			<ElemMyListsMenu className="mt-6" />

			<ElemMyGroupsMenu className="mt-6" />

			<Disclosure defaultOpen={true} as="div" className="mt-6">
				{({ open }) => (
					<>
						<div className="w-full flex items-center justify-between">
							<Disclosure.Button className="flex focus:outline-none hover:opacity-75">
								<IconPolygonDown
									className={`${
										open ? "rotate-0" : "-rotate-90 "
									} h-6 w-6 transform transition-all`}
								/>
								<span className="text-xl font-bold">Explore</span>
							</Disclosure.Button>
						</div>

						<Disclosure.Panel as="ul" className="mt-1 space-y-1 text-slate-600">
							<li role="button">
								<Link href={`/companies`}>
									<a className="flex space-x-2 py-1.5 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500">
										<IconCompanies className="w-6 h-6" />
										<span>Companies</span>
									</a>
								</Link>
							</li>
							<li role="button">
								<Link href={`/investors`}>
									<a className="flex space-x-2 py-1.5 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500">
										<IconCash className="w-6 h-6" />
										<span>Investors</span>
									</a>
								</Link>
							</li>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</aside>
	);
};
