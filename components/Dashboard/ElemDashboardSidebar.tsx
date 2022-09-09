import { useAuth } from "@/hooks/useAuth";
import { truncate } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { ElemPhoto } from "../ElemPhoto";
import { ElemMyListsMenu } from "../MyList/ElemMyListsMenu";

type Props = {}

export const ElemDashboardSidebar: FC<Props> = ({ }) => {
  const { user } = useAuth()
  const router = useRouter()

  const getActiveClass = (path: string) => {
    return path === router.asPath ? ' bg-slate-200 rounded-xl pl-2' : ''
  }

  return (
    <>
      <div className="mb-6">
        <h3 className="text-xl font-bold py-1 text-dark-500">My EdgeIn</h3>
        <ul className="flex flex-col">
          {user?.profileName && <li
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
                {truncate(user?.profileName, {length: 15})}
              </a>
            </Link>
          </li>}

        </ul>
      </div>

      <ElemMyListsMenu
        user={user}
      />
    </>
  )
} 