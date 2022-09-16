import { useAuth } from "@/hooks/useAuth";
import { truncate } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { ElemPhoto } from "../ElemPhoto";
import { ElemMyListsMenu } from "../MyList/ElemMyListsMenu";
import { IconSetting } from "../IconSetting";
import { IconOrganization } from "@/components/IconOrganization";

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
          <li
            className="py-1 text-slate-600 inline-flex items-center"
            role="button"
          >
            <Link href="">
              <a className="inline-flex items-center">
                <ElemPhoto
                  photo={{ "id": "attqlQW9sa7EHXA0F", "url": "https://dl.airtable.com/.attachments/4c5dbf062c363e1963f91bcf0237f470/5c238f9c/0fe61c9db8d613fdd505f74ef07b76ba.jpeg-resized?ts=1658363793&userId=usr7CWMWLCRhTmk83&cs=1ec1ef208dd22ddc", "size": 2572, "type": "image/jpeg", "width": 128, "height": 128, "filename": "0fe61c9db8d613fdd505f74ef07b76ba.jpeg-resized", "thumbnails": { "full": { "url": "https://dl.airtable.com/.attachmentThumbnails/380a0dbb32426fa1c4dfd594e215c73a/dba9fc7a?ts=1658363793&userId=usr7CWMWLCRhTmk83&cs=76de77a37734da7c", "width": 3000, "height": 3000 }, "large": { "url": "https://dl.airtable.com/.attachmentThumbnails/10d7f0be666f8de9bcdddd2b9d05fc66/b0fdd585?ts=1658363793&userId=usr7CWMWLCRhTmk83&cs=56a8b542efc86201", "width": 128, "height": 128 }, "small": { "url": "https://dl.airtable.com/.attachmentThumbnails/8a11fb7e4e2bca2ead2c79b69b02d5fa/9e676d41?ts=1658363793&userId=usr7CWMWLCRhTmk83&cs=fcc239f5fe6fb124", "width": 36, "height": 36 } } }}
                  imgAlt="company logo"
                  wrapClass="flex items-center justify-center shrink-0 w-6 h-6 bg-white rounded-lg shadow-md mr-2 rounded-full"
                  imgClass="object-fit max-w-full max-h-full rounded-full"
                /><span>Chia</span>
              </a>
            </Link>
          </li>
          <li
            className="py-1 text-slate-600 inline-flex items-center"
            role="button">
            <Link href="">
              <a className="inline-flex items-center">
                <ElemPhoto
                  photo={{ "id": "attqlQW9sa7EHXA0F", "url": "https://dl.airtable.com/.attachments/4c5dbf062c363e1963f91bcf0237f470/5c238f9c/0fe61c9db8d613fdd505f74ef07b76ba.jpeg-resized?ts=1658363793&userId=usr7CWMWLCRhTmk83&cs=1ec1ef208dd22ddc", "size": 2572, "type": "image/jpeg", "width": 128, "height": 128, "filename": "0fe61c9db8d613fdd505f74ef07b76ba.jpeg-resized", "thumbnails": { "full": { "url": "https://dl.airtable.com/.attachmentThumbnails/380a0dbb32426fa1c4dfd594e215c73a/dba9fc7a?ts=1658363793&userId=usr7CWMWLCRhTmk83&cs=76de77a37734da7c", "width": 3000, "height": 3000 }, "large": { "url": "https://dl.airtable.com/.attachmentThumbnails/10d7f0be666f8de9bcdddd2b9d05fc66/b0fdd585?ts=1658363793&userId=usr7CWMWLCRhTmk83&cs=56a8b542efc86201", "width": 128, "height": 128 }, "small": { "url": "https://dl.airtable.com/.attachmentThumbnails/8a11fb7e4e2bca2ead2c79b69b02d5fa/9e676d41?ts=1658363793&userId=usr7CWMWLCRhTmk83&cs=fcc239f5fe6fb124", "width": 36, "height": 36 } } }}
                  imgAlt="company logo"
                  wrapClass="flex items-center justify-center shrink-0 w-6 h-6 bg-white rounded-lg shadow-md mr-2 rounded-full"
                  imgClass="object-fit max-w-full max-h-full rounded-full"
                />
                <span>IDEO Colab Ventures</span>
              </a>
            </Link>
          </li>
          <li
            className={`py-1 mt-1 px-2 text-slate-600 inline-flex items-center relative right-2 w-60 bg-slate-200 rounded-lg`}
            role="button"
          >
            <Link href="">
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