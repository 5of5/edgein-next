import { ElemPhoto } from "@/components/ElemPhoto";
import { ElemCompanies } from "@/components/MyList/ElemCompanies";
import { ElemInvestors } from "@/components/MyList/ElemInvestors";
import { IconCompanyList } from "@/components/reactions/IconCompanyList";
import { IconCrap } from "@/components/reactions/IconCrap";
import { IconHot } from "@/components/reactions/IconHot";
import { IconLike } from "@/components/reactions/IconLike";
import { Lists, useGetListsByUserQuery, useGetCompaniesByListIdQuery, useGetVcFirmsByListIdQuery } from "@/graphql/types";
import { useAuth } from "@/hooks/useAuth";
import { getName } from "@/utils/reaction";
import { find, has } from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = {}

const MyList: NextPage<Props> = ({ }) => {
  const { user } = useAuth();
  const router = useRouter()
  const [userLists, setUserLists] = useState<Lists[]>();
  const [selectedList, setSelectedList] = useState<number | null>(null);
  const [selectedListName, setSelectedListName] = useState<null | string>('hot');
  const [hotId, setHotId] = useState(0);
  const [crapId, setCrapId] = useState(0);
  const [likeId, setLikeId] = useState(0);
  const [totalFunding, setTotalFuncding] = useState(0);
  // @TODO: implement tags count on final structure for tags in admin
  const [tagsCount, setTagsCount] = useState({});
  const [isCustomList, setIsCustomList] = useState(false);

  const {
    data: lists,
  } = useGetListsByUserQuery({
    current_user: user?.id ?? 0,
  })

  const {
    data: companies
  } = useGetCompaniesByListIdQuery({
    list_id: selectedList ?? 0
  })

  const {
    data: vcfirms,
  } = useGetVcFirmsByListIdQuery({
    list_id: selectedList ?? 0
  })

  useEffect(() => {
    if (companies) {
      let funding = 0;
      companies.follows_companies.forEach(({ company }) => {
        setTagsCount((prev: any) => {
          console.log(company?.tags)
          company?.tags?.forEach((tag: string) => {
            if (!has(prev, tag)) prev = {...prev, [tag]: 1}
            else prev[tag] += 1
          })
          return prev
        })
        company?.investment_rounds.forEach((round) => { funding += round.amount })
      })

      setTotalFuncding(funding)
    }
  }, [companies]);

  useEffect(() => {
    if (lists) {
      setUserLists(lists.lists as Lists[])
      setHotId(() => find(lists.lists, (list) => getName(list as Lists) === 'hot')?.id ?? 0)
      setLikeId(() => find(lists.lists, (list) => getName(list as Lists) === 'like')?.id ?? 0)
      setCrapId(() => find(lists.lists, (list) => getName(list as Lists) === 'crap')?.id ?? 0)

      if (selectedList === null) setSelectedList(find(lists.lists, (list) => getName(list as Lists) === 'hot')?.id || null)
    }
  }, [lists])

  const getCountForList = (listName: string) => {
    if (userLists) {
      const list = find(userLists, (item) => getName(item) === listName)
      return list?.total_no_of_resources ?? 0
    }
    return 0
  }

  const renderMyCustomList = () => {
    return (
      userLists?.filter((list => !['hot', 'crap', 'like'].includes(getName(list))))
        .map(list => (
          <li
            key={list.id}
            className={`py-1 text-slate-600 inline-flex items-center${getActiveClass(getName(list))}`}
            role="button"
            onClick={() => onSelect(list.id, getName(list))}
          >
            <IconCompanyList className="mr-1 w-7" /> {getName(list)} ({getCountForList(getName(list))})
          </li>
        ))
    )
  }

  const onSelect = (listId: number, listName: string) => {
    setTagsCount({})
    setSelectedList(listId)
    setSelectedListName(listName)
    // set isCustomList to true if list is created by user and check 
    // isCustomList to enable dropdown options on custom list
    if (!['hot', 'like', 'crap'].includes(listName)) setIsCustomList(true)
    else setIsCustomList(false)
  }

  const handleRowClick = (link: string) => {
    router.push(link);
  }

  const getActiveClass = (listName: string) => {
    return selectedListName === listName ? '  bg-slate-200 rounded-xl -ml-2 pl-2' : ''
  }

  const getAlternateRowColor = (index: number) => {
    if ((index + 1) % 2 === 0) return ' bg-slate-100'
    return ''
  }

  return (
    <div className="max-w-6xl px-4 pt-4 mx-auto sm:px-6 lg:px-8 lg:pt-10 mt-10">
      <div className="grid grid-cols-4 gap-4">
        <div className="...">

          {/* List */}
          <div>
            <h3 className="text-xl font-bold py-1 text-dark-500">My List</h3>
            <ul className="flex flex-col">
              <li
                className={`py-2 text-slate-600 inline-flex items-center${getActiveClass('hot')}`}
                role="button"
                onClick={() => onSelect(hotId, 'hot')}>
                <IconHot className="mr-1 w-7" /> Hot ({getCountForList('hot')})
              </li>
              <li
                className={`py-2 text-slate-600 inline-flex items-center${getActiveClass('like')}`}
                role="button"
                onClick={() => onSelect(likeId, 'like')}>
                <IconLike className="mr-1 w-7" /> Like ({getCountForList('like')})
              </li>
              <li
                className={`py-2 text-slate-600 inline-flex items-center${getActiveClass('crap')}`}
                role="button"
                onClick={() => onSelect(crapId, 'crap')}>
                <IconCrap className="mr-1 w-7" /> Crap ({getCountForList('crap')})
              </li>

              {renderMyCustomList()}
            </ul>
          </div>

        </div>
        <div className="col-span-3">

          <div className="w-full mb-7">
            <h1 className="flex font-bold text-xl capitalize mb-1 items-center">
              {selectedListName === 'hot' && <IconHot className="mr-2" />}
              {selectedListName === 'like' && <IconLike className="mr-2" />}
              {selectedListName === 'crap' && <IconCrap className="mr-2" />}
              {isCustomList && <IconCompanyList className="mr-2" />}
              {selectedListName}
            </h1>
            <p className="first-letter:uppercase">{selectedListName} lists are generated from your {selectedListName?.toLowerCase()} reactions.</p>
          </div>

          <ElemCompanies
            handleNavigation={handleRowClick}
            companies={companies}
            selectedListName={selectedListName}
            totalFunding={totalFunding}
            getAlternateRowColor={getAlternateRowColor}
            tagsCount={tagsCount}
          />

          <ElemInvestors
            handleNavigation={handleRowClick}
            vcfirms={vcfirms}
            selectedListName={selectedListName}
            getAlternateRowColor={getAlternateRowColor}
          />

        </div>
      </div>
    </div >
  );
};

export default MyList;