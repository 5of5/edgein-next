import { useAuth } from "@/hooks/useAuth";
import { truncate } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { ElemPhoto } from "../ElemPhoto";
import { ElemMyListsMenu } from "../MyList/ElemMyListsMenu";
import { IconOrganization } from "@/components/IconOrganization";
import { Resource_Edit_Access, useGetUserProfileQuery } from "@/graphql/types";
import { IconSetting } from "../IconSetting";

type Props = {}

export const ElemDashboardSidebar: FC<Props> = ({ }) => {
  const { user } = useAuth()
  const router = useRouter()
  const [organizations, setOrganizations] = useState([] as Resource_Edit_Access[])

  const {
    data: users
  } = useGetUserProfileQuery({
    id: user?.id || 0
  })

  useEffect(() => {
    if (users?.users_by_pk?.organization_companies) {
			setOrganizations((prev) => {
				const temp = [...prev, ...users?.users_by_pk?.organization_companies as Resource_Edit_Access[]]
				return temp
			})
		}

		if (users?.users_by_pk?.organization_vc_firms) {
			setOrganizations((prev) => {
				const temp = [...prev, ...users?.users_by_pk?.organization_vc_firms as Resource_Edit_Access[]]
				return temp
			})
		}
  }, [users])

  const getActiveClass = (path: string) => {
    return path === router.asPath ? ' bg-slate-200 rounded-xl pl-2' : ''
  }

  return (
    <>
      <div className="mb-6">
        <h3 className="text-xl font-bold py-1 text-dark-500">My EdgeIn</h3>
        <ul className="flex flex-col">
          {user?.profileName && 
          <li
            className={`py-2 text-slate-600 inline-flex items-center${getActiveClass('/profile/')}`}
            role="button"
          >
            <ElemPhoto
              photo={user?.profilePicture}
              wrapClass="flex items-center justify-center shrink-0 w-6 h-6 bg-white rounded-lg shadow-md mr-2 rounded-full"
              imgClass="object-fit max-w-full max-h-full rounded-full"
              imgAlt={'profile'}
            />
            <Link href={`/profile`}>
              <a className="inline-flex items-center">
                {truncate(user?.profileName, { length: 15 })}
              </a>
            </Link>
          </li>}
          <li className='py-2 text-slate-600 inline-flex items-center gap-x-2'>
            <IconSetting />
            <Link href={`/account`}>
              <a className="inline-flex items-center">
                Account Settings
              </a>
            </Link>
          </li>
        </ul>
      </div>

      <ElemMyListsMenu
        user={user}
      />

      <div className="mt-3">
        <h3 className="text-xl font-bold font-Metropolis py-1 text-dark-500">My Organizations</h3>
        <ul className="flex flex-col">
          {organizations?.map((teamMember) => {
            const type = teamMember.company ? 'companies' : 'investors'
            const data = teamMember.company || teamMember.vc_firm
            return (
              <li
                key={teamMember.id}
                className="py-1 text-slate-600 inline-flex items-center"
                role="button"
              >
                <Link href={`/organizations/${type}/${data?.slug}`}>
                  <a className="inline-flex items-center">
                    <ElemPhoto
                      photo={data?.logo}
                      imgAlt="company logo"
                      wrapClass="flex items-center justify-center shrink-0 w-6 h-6 bg-white rounded-lg shadow-md mr-2 rounded-full"
                      imgClass="object-fit max-w-full max-h-full rounded-full"
                    /><span>{data?.name}</span>
                  </a>
                </Link>
              </li>
            )
          }
          )}
          <li
            className={`py-1 mt-1 px-2 text-slate-600 inline-flex items-center relative right-2 bg-slate-200 rounded-lg`}
            role="button"
          >
            <Link href="/organizations">
              <a className="inline-flex items-center">

                <IconOrganization className="mr-2" /><span>Manage Organization</span>
              </a>
            </Link>
          </li>

          {/* {renderMyCustomList()} */}
        </ul>
      </div>
    </>
  )
} 