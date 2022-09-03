import { Follows_Companies, GetCompaniesByListIdQuery } from "@/graphql/types";
import { FC } from "react";
import { ElemPhoto } from "../ElemPhoto";
import { IconCrap } from "../reactions/IconCrap";
import { IconHot } from "../reactions/IconHot";
import { IconLike } from "../reactions/IconLike";

type Props = {
  companies?: Follows_Companies[]
  isCustomList?: boolean
  selectedListName: string | null
  totalFunding: number
  getAlternateRowColor: (index: number) => string
  handleNavigation: (link: string) => void
  tagsCount: any
}

export const ElemCompanies: FC<Props> = ({
  companies,
  isCustomList,
  selectedListName,
  totalFunding,
  getAlternateRowColor,
  handleNavigation,
  tagsCount,
}) => {
  return (
    <div className="rounded-lg p-3 bg-white col-span-3">
      <h2 className="font-bold text-dark-500 text-xl capitalize">{selectedListName}: Companies</h2>

      <div className="w-full mt-1 flex justify-between">
        <div className="inline-flex items-center">
          <span className="font-semibold text-sm mr-2">Tags: </span>
          <span>
            {tagsCount && Object.keys(tagsCount).map((tag) => <span key={tag} className="px-2 py-1 bg-slate-200 rounded-md text-sm mr-2">{tag} ({tagsCount[tag]})</span>)}
          </span>
        </div>

        <div className="inline-flex items-center">
          <span className="font-semibold text-sm mr-2">Total Funding: {totalFunding}</span>
        </div>
      </div>

      <div className="mt-3 w-full rounded-lg border border-slate-200 max-h-80 overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm border-b-slate-200">
              <th className="px-1 border border-b-slate-200 border-r-0 border-l-0 border-t-0">Name</th>
              <th className="px-1 border border-b-slate-200 border-r-0 border-l-0 border-t-0">Token/Value</th>
              <th className="px-1 border border-b-slate-200 border-r-0 border-l-0 border-t-0">Team Size</th>
              <th className="px-1 border border-b-slate-200 border-r-0 border-l-0 border-t-0">Location</th>
              <th className="px-1 border border-b-slate-200 border-r-0 border-l-0 border-t-0">Reactions</th>
            </tr>
          </thead>

          <tbody>
            {
              companies?.map(({ company }, index) => (
                <tr 
                key={company?.id} 
                className={`text-left text-sm${getAlternateRowColor(index)} hover:bg-slate-100`}
                onClick={() => handleNavigation(`/companies/${company?.slug}`)}
                role="button"
                >
                  <td className="px-1 inline-flex items-center py-2">
                    <ElemPhoto
                      photo={company?.logo}
                      wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white rounded-lg shadow-md mr-2"
                      imgClass="object-fit max-w-full max-h-full"
                      imgAlt={'chia'}
                    />
                    {company?.name}
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
              (!companies || companies?.length === 0) &&
              <tr>
                <td colSpan={5} className="text-center px-1 py-2">No Companies</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}