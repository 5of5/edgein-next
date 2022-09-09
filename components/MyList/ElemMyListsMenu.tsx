import { Lists, useGetListsByUserQuery } from "@/graphql/types";
import { User } from "@/models/User";
import { getName } from "@/utils/reaction";
import { find, kebabCase } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { IconCompanyList } from "../reactions/IconCompanyList";
import { IconCrap } from "../reactions/IconCrap";
import { IconHot } from "../reactions/IconHot";
import { IconLike } from "../reactions/IconLike";

type Props = {
  user: User
  setIsCustom?: Function
  setSelectedListName?: Function
  isUpdated?: number
}

export const ElemMyListsMenu: FC<Props> = ({ user, setIsCustom, setSelectedListName, isUpdated }) => {

  const router = useRouter();
  const [hotId, setHotId] = useState(0);
  const [crapId, setCrapId] = useState(0);
  const [likeId, setLikeId] = useState(0);
  const [userLists, setUserLists] = useState<Lists[]>();

  const {
    data: lists,
    refetch
  } = useGetListsByUserQuery({
    current_user: user?.id ?? 0,
  })

  useEffect(() => {
    if (isUpdated)
      refetch()
  }, [isUpdated, refetch])

  useEffect(() => {
    if (lists) {
      setUserLists(lists.lists as Lists[])
      setHotId(() => find(lists.lists, (list) => getName(list as Lists) === 'hot')?.id ?? 0)
      setLikeId(() => find(lists.lists, (list) => getName(list as Lists) === 'like')?.id ?? 0)
      setCrapId(() => find(lists.lists, (list) => getName(list as Lists) === 'crap')?.id ?? 0)

      const list = find(lists.lists, { id: parseInt(router.query.listId as string || '0') })


      if (setIsCustom) setIsCustom(() => {
        return list ? !['hot', 'like', 'crap'].includes(getName(list as Lists)) : false;
      })

      if (setSelectedListName) setSelectedListName(() => {
        return list ? getName(list as Lists) : '';
      })
    }
  }, [lists, router.query.listId, setIsCustom, setSelectedListName])

  const getCountForList = (listName: string) => {
    if (userLists) {
      const list = find(userLists, (item) => getName(item) === listName)
      return list?.total_no_of_resources ?? 0
    }
    return 0
  }

  const getActiveClass = (id: number) => {
    return `/lists/${id}/` === router.asPath ? '  bg-slate-200 rounded-xl -ml-2 pl-2' : ''
  }

  const renderMyCustomList = () => {
    return (
      userLists?.filter((list => !['hot', 'crap', 'like'].includes(getName(list))))
        .map(list => (
          <li
            key={list.id}
            className={`py-1 text-slate-600 inline-flex items-center${getActiveClass(list.id)}`}
            role="button"
          >
            <Link href={`/lists/${list.id}/${kebabCase(getName(list))}`}>
              <a className="inline-flex items-center">
                <IconCompanyList className="mr-1 w-7" /> {getName(list)} ({getCountForList(getName(list))})
              </a>
            </Link>
          </li>
        ))
    )
  }

  return (
    <div>
      <h3 className="text-xl font-bold py-1 text-dark-500">My List</h3>
      <ul className="flex flex-col">
        <li
          className={`py-2 text-slate-600 inline-flex items-center${getActiveClass(hotId)}`}
          role="button"
        >
          <Link href={`/lists/${hotId}/hot`}>
            <a className="inline-flex items-center">
              <IconHot className="mr-1 w-7" /> Hot ({getCountForList('hot')})
            </a>
          </Link>
        </li>
        <li
          className={`py-2 text-slate-600 inline-flex items-center${getActiveClass(likeId)}`}
          role="button">
          <Link href={`/lists/${likeId}/like`}>
            <a className="inline-flex items-center">
              <IconLike className="mr-1 w-7" /> Like ({getCountForList('like')})
            </a>
          </Link>
        </li>
        <li
          className={`py-2 text-slate-600 inline-flex items-center${getActiveClass(crapId)}`}
          role="button"
        >
          <Link href={`/lists/${crapId}/crap`}>
            <a className="inline-flex items-center">
              <IconCrap className="mr-1 w-7" /> Crap ({getCountForList('crap')})
            </a>
          </Link>
        </li>

        {renderMyCustomList()}
      </ul>
    </div>
  )
}