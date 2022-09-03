import { ElemCompanies } from "@/components/MyList/ElemCompanies";
import { ElemInvestors } from "@/components/MyList/ElemInvestors";
import { MyLists } from "@/components/MyList/MyLists";
import { IconCompanyList } from "@/components/reactions/IconCompanyList";
import { IconCrap } from "@/components/reactions/IconCrap";
import { IconHot } from "@/components/reactions/IconHot";
import { IconLike } from "@/components/reactions/IconLike";
import { Lists, useGetListsByUserQuery, useGetCompaniesByListIdQuery, useGetVcFirmsByListIdQuery, GetFollowsListsStaticPathsQuery, GetVcFirmsByListIdQuery, GetVcFirmsByListIdDocument, GetCompaniesByListIdQuery, GetCompaniesByListIdDocument, Follows_Companies, Follows_Vc_Firms, GetFollowsListsStaticPathsDocument } from "@/graphql/types";
import { useAuth } from "@/hooks/useAuth";
import { runGraphQl } from "@/utils";
import { getName } from "@/utils/reaction";
import { find, has } from "lodash";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = {
  companies?: Follows_Companies[]
  vcfirms?: Follows_Vc_Firms[]
}

const MyList: NextPage<Props> = ({
  companies,
  vcfirms,
}) => {
  const { user } = useAuth();
  const router = useRouter()
  const [selectedList, setSelectedList] = useState<number | null>(null);
  const [selectedListName, setSelectedListName] = useState<null | string>('hot');
  const [totalFunding, setTotalFuncding] = useState(0);
  // @TODO: implement tags count on final structure for tags in admin
  const [tagsCount, setTagsCount] = useState({});
  const [isCustomList, setIsCustomList] = useState(false);

  useEffect(() => {
    if (companies) {
      let funding = 0;
      companies.forEach(({ company }) => {
        setTagsCount(() => {
          let prev: any = {}
          company?.tags?.forEach((tag: string) => {
            if (!has(prev, tag)) prev = { ...prev, [tag]: 1 }
            else prev[tag] += 1
          })
          return prev
        })
        company?.investment_rounds.forEach((round) => { funding += round.amount })
      })

      setTotalFuncding(funding)
    }
  }, [companies]);

  const handleRowClick = (link: string) => {
    router.push(link);
  }

  const getAlternateRowColor = (index: number) => {
    if ((index + 1) % 2 === 0) return ' bg-slate-100'
    return ''
  }

  return (
    <div className="max-w-6xl px-4 pt-4 mx-auto sm:px-6 lg:px-8 lg:pt-10 mt-10">
      <div className="grid grid-cols-4 gap-4">
        <MyLists
          user={user}
          setIsCustom={setIsCustomList}
          setSelectedListName={setSelectedListName}
        />
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

export async function getStaticPaths() {
  const { data: follows } = await runGraphQl<GetFollowsListsStaticPathsQuery>(
    GetFollowsListsStaticPathsDocument
  );

  const paths = follows?.follows
    ?.filter((follow) => follow.list_id)
    .map((follow) => ({ params: { listId: follow.list_id?.toString() } }))
  console.log("paths", paths);
  return {
    paths,
    fallback: true, // false or 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { data: vcFirms } = await runGraphQl<GetVcFirmsByListIdQuery>(
    GetVcFirmsByListIdDocument,
    { list_id: context.params?.listId }
  );

  const { data: companies } = await runGraphQl<GetCompaniesByListIdQuery>(
    GetCompaniesByListIdDocument,
    { list_id: context.params?.listId }
  );

  return {
    props: {
      companies: companies?.follows_companies,
      vcfirms: vcFirms?.follows_vc_firms,
    },
  };
};

export default MyList;