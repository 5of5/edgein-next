import { useAuth } from "../hooks/useAuth"
import { ElemPhoto } from "@/components/ElemPhoto"
import { ElemCompanyVerifyModal } from "@/components/ElemCompanyVerifyModal"
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout"
import { GetCompaniesDocument, GetCompaniesQuery, GetVcFirmsDocument, GetVcFirmsQuery, People, Resource_Edit_Access, useGetUserProfileQuery } from "@/graphql/types"
import { runGraphQl } from "@/utils"
import { GetStaticProps } from "next"
import { FC, useEffect, useState } from "react"
import Link from "next/link"

type Props = {
	dropdown: any[]
}

const Organizations: FC<Props> = ({ dropdown }) => {
	const { user } = useAuth();

	const [profile, setProfile] = useState({} as People)
	const [organizations, setOrganization] = useState([] as Resource_Edit_Access[])

	const [showVerifyModal, setShowVerifyModal] = useState(false)

	const {
		data: users
	} = useGetUserProfileQuery({
		id: user?.id || 0
	})

	useEffect(() => {
		if (users?.users_by_pk && users.users_by_pk.person) {
			setProfile(users.users_by_pk.person as People)
		}
		if (users?.users_by_pk?.organization_companies) {
			setOrganization((prev) => {
				const temp = [...prev, ...users?.users_by_pk?.organization_companies as Resource_Edit_Access[]]
				return temp
			})
		}

		if (users?.users_by_pk?.organization_vc_firms) {
			setOrganization((prev) => {
				const temp = [...prev, ...users?.users_by_pk?.organization_vc_firms as Resource_Edit_Access[]]
				return temp
			})
		}
	}, [users])

	return (
		<div className="max-w-6xl px-4 pt-4 mx-auto sm:px-6 lg:px-8 lg:pt-10 mt-10">
			<DashboardLayout>
				<div className="col-span-3">
					<div className="max-w-6xl bg-white rounded-lg p-5">
						<div className="flex">
							<h2 className="text-dark-500 font-Metropolis font-bold text-xl">My Organization(s)</h2>
						</div>

						<div className="flex mt-6 mb-2 relative border-b border-gray-100 pb-3">
							<h2 className="text-dark-500 font-Metropolis font-bold text-md w-40">Verified Organization(s)</h2>
							<div>
								<p className="text-slate-600 w-96 text-md">Verify your company or investment firm to access features specifically for your business.</p>
							</div>

							<button className="absolute right-0 text-md text-primary-500" onClick={() => setShowVerifyModal(true)}>Manage Oraganization</button>

						</div>

						{organizations?.map((teamMember) => {
							const type = teamMember.company ? 'Company' : 'Investment Firm'
							const data = teamMember.company || teamMember.vc_firm
							return (
								<div key={teamMember.id} className=" mt-3 mb-2 relative border-b border-gray-100 pb-3">
									<div className="grid grid-cols-10 gap-3">
										<div className="col-start-3 col-span-6 flex">
											<ElemPhoto
												wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 border border-black/10 rounded-lg overflow-hidden"
												imgClass="object-fit max-w-full max-h-full"
												photo={data?.logo}
												imgAlt="company logo"
											/>

											<div className="ml-3">
												<h2 className="font-bold font-Metropolis text-sm text-slate-600">{data?.name}</h2>
												<span className="font-thin text-slate-500 text-sm">{type}</span>
											</div>
										</div>
										<Link href={`/organizations/${type === 'Company' ? 'companies' : 'investors'}/${data?.slug}`}>
											<a
												className="col-end-11 col-span-1 flex justify-end items-center text-md text-primary-500"
											>
												Edit
											</a>
										</Link>
									</div>
								</div>
							)
						})}
					</div>
					<ElemCompanyVerifyModal
						isOpen={showVerifyModal}
						onClose={() => setShowVerifyModal(false)}
						dropdown={dropdown}
						personId={profile.id}
					/>
				</div>
			</DashboardLayout>
		</div>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const { data: companiesData } = await runGraphQl<GetCompaniesQuery>(
		GetCompaniesDocument,
		{
			limit: 20,
			where: { slug: { _neq: "" }, status: { _eq: "published" } },
		}
	)

	const { data: vcFirmsData } = await runGraphQl<GetVcFirmsQuery>(
		GetVcFirmsDocument,
		{
			limit: 20,
			where: { slug: { _neq: "" }, status: { _eq: "published" } },
		}
	)

	const companiesDropdown = companiesData?.companies.map((company) => ({
		label: company.name,
		value: company.id,
		type: 'companies',
		logo: company.logo,
		website: company.website,
	})) || []

	const vcFirmsDropdown = vcFirmsData?.vc_firms.map((vcfirm) => ({
		label: vcfirm.name,
		value: vcfirm.id,
		type: 'vc_firms',
		logo: vcfirm.logo,
		website: vcfirm.website,
	})) || []

	return {
		props: {
			dropdown: companiesDropdown.concat(vcFirmsDropdown),
		},
	}
}

export default Organizations
