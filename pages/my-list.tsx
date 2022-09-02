import { ElemPhoto } from "@/components/ElemPhoto";
import { IconCompanyList } from "@/components/reactions/IconCompanyList";
import { IconCrap } from "@/components/reactions/IconCrap";
import { IconHot } from "@/components/reactions/IconHot";
import { IconLike } from "@/components/reactions/IconLike";
import { Lists, useGetListsByUserQuery, useGetCompaniesByListIdQuery, useGetVcFirmsByListIdQuery } from "@/graphql/types";
import { useAuth } from "@/hooks/useAuth";
import { getName } from "@/utils/reaction";
import { find } from "lodash";
import { NextPage } from "next";
import { useEffect, useState } from "react";

type Props = {}

const MyList: NextPage<Props> = ({ }) => {
  const { user } = useAuth();
  const [userLists, setUserLists] = useState<Lists[]>();
  const [selectedList, setSelectedList] = useState<number | null>(null);
  const [selectedListName, setSelectedListName] = useState<null | string>('hot');
  const [hotId, setHotId] = useState(0);
  const [crapId, setCrapId] = useState(0);
  const [likeId, setLikeId] = useState(0);
  const [totalFunding, setTotalFuncding] = useState(0);
  // @TODO: implement tags count on final structure for tags in admin
  const [tagsCount, setTagsCount] = useState();

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
      companies.follows_companies.forEach((company) => {
        company.company?.investment_rounds.forEach((round) => { funding += round.amount })
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
    setSelectedList(listId)
    setSelectedListName(listName)
  }

  const getActiveClass = (listName: string) => {
    return selectedListName === listName ? '  bg-slate-200 rounded-xl -ml-2 pl-2' : ''
  }

  const getAlternateRowColor = (index: number) => {
    if (index % 2 === 0) return ' bg-slate-50'
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

          <div className="w-full">
            <h1 className="flex font-bold text-xl capitalize">
              <IconHot className="mr-2 mb-10" /> {selectedListName}
            </h1>
          </div>

          <div className="rounded-lg p-3 bg-white col-span-3">
            <h2 className="font-bold text-dark-500 text-xl capitalize">{selectedListName}: Companies</h2>

            <div className="w-full mt-1 flex justify-between">
              <div className="inline-flex items-center">
                <span className="font-semibold text-sm mr-2">Tags: </span>
                <span>
                  <span className="px-2 py-1 bg-slate-200 rounded-md text-sm mr-2">Layer-1 (2)</span>
                  <span className="px-2 py-1 bg-slate-200 rounded-md text-sm mr-2">Identity (4)</span>
                  <span className="px-2 py-1 bg-slate-200 rounded-md text-sm mr-2">d-Apps (3)</span>
                </span>
              </div>

              <div className="inline-flex items-center">
                <span className="font-semibold text-sm mr-2">Total Funding: {totalFunding}</span>
              </div>
            </div>

            <div className="mt-3 w-full">
              <table className="w-full rounded border border-slate-200">
                <thead>
                  <tr className="text-left text-sm border-b-slate-200">
                    <th className="px-1">Name</th>
                    <th className="px-1">Token/Value</th>
                    <th className="px-1">Team Size</th>
                    <th className="px-1">Location</th>
                    <th className="px-1">Reactions</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    companies?.follows_companies.map(({ company }, index) => (
                      <tr key={company?.id} className={`text-left text-sm${getAlternateRowColor(index)}`}>
                        <td className="px-1 inline-flex items-center py-2">
                          <ElemPhoto
                            photo={company?.logo}
                            wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white rounded-lg shadow-md mr-2"
                            imgClass="object-fit max-w-full max-h-full"
                            imgAlt={'chia'}
                          />
                          Chia
                        </td>
                        <td className="px-1 py-2">{company?.coin?.ticker ? company?.coin?.ticker : '-'}</td>
                        <td className="px-1 py-2">{company?.teamMembers.length}</td>
                        <td className="px-1 py-2">{company?.location}</td>
                        <td className="px-1 py-2">
                          <div>
                            <span className="text-slate-600 font-bold items-center inline-flex mr-2"><IconHot className="mr-1" />{company?.sentiment.hot || 0}</span>
                            <span className="text-slate-600 font-bold items-center inline-flex mr-2"><IconLike className="mr-1" />{company?.sentiment.like || 0}</span>
                            <span className="text-slate-600 font-bold items-center inline-flex"><IconCrap className="mr-1" />{company?.sentiment.crap || 0}</span>
                          </div>
                        </td>
                      </tr>
                    ))
                  }

                  {
                    (!companies?.follows_companies || companies?.follows_companies.length === 0) &&
                    <tr>
                      <td colSpan={5} className="text-center">No Companies</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-lg p-3 bg-white col-span-3 mt-10 mb-10">
            <h2 className="font-bold text-dark-500 text-xl capitalize">{selectedListName}: Investors</h2>

            <div className="mt-3 w-full">
              <table className="w-full rounded border border-slate-100">
                <thead className="">
                  <tr className="text-left text-sm">
                    <th className="px-1">Name</th>
                    <th className="px-1"># of Investments</th>
                    <th className="px-1">Latest Investment Date</th>
                    <th className="px-1">Reactions</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    vcfirms?.follows_vc_firms.map(({ vc_firm }) => (
                      <tr key={vc_firm?.id} className="text-left text-sm">
                        <td className="px-1 inline-flex items-center py-2">
                          <ElemPhoto
                            photo={vc_firm?.logo}
                            wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white rounded-lg shadow-md mr-2"
                            imgClass="object-fit max-w-full max-h-full"
                            imgAlt={'chia'}
                          />
                          {vc_firm?.name}
                        </td>
                        <td className="px-1 py-2">{vc_firm?.num_of_investments}</td>
                        <td className="px-1 py-2">May 12, 2022 {vc_firm?.latest_investments}</td>
                        <td className="px-1 py-2">
                          <div>
                            <span className="text-slate-600 font-bold items-center inline-flex mr-2"><IconHot className="mr-1" />{vc_firm?.sentiment.hot || 0}</span>
                            <span className="text-slate-600 font-bold items-center inline-flex mr-2"><IconLike className="mr-1" />{vc_firm?.sentiment.like || 0}</span>
                            <span className="text-slate-600 font-bold items-center inline-flex"><IconCrap className="mr-1" />{vc_firm?.sentiment.crap || 0}</span>
                          </div>
                        </td>
                      </tr>
                    ))
                  }

                  {
                    (!vcfirms?.follows_vc_firms || vcfirms?.follows_vc_firms.length === 0) &&
                    <tr>
                      <td colSpan={4} className="text-center">No Investors</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div >
  );
};

export default MyList;