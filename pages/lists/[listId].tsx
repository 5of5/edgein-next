import { ElemCompanies } from "@/components/MyList/ElemCompanies";
import { ElemDeleteListModal } from "@/components/MyList/ElemDeleteListModal";
import { ElemInvestors } from "@/components/MyList/ElemInvestors";
import { ElemListEditModal } from "@/components/MyList/ElemListEditModal";
import { ElemListOptionMenu } from "@/components/MyList/ElemListOptionMenu";
import { ElemMyListsMenu } from "@/components/MyList/ElemMyListsMenu";
import { IconCompanyList } from "@/components/reactions/IconCompanyList";
import { IconCrap } from "@/components/reactions/IconCrap";
import { IconHot } from "@/components/reactions/IconHot";
import { IconLike } from "@/components/reactions/IconLike";
import {
  GetFollowsListsStaticPathsQuery,
  GetVcFirmsByListIdQuery,
  GetVcFirmsByListIdDocument,
  GetCompaniesByListIdQuery,
  GetCompaniesByListIdDocument,
  Follows_Companies,
  Follows_Vc_Firms,
  GetFollowsListsStaticPathsDocument
} from "@/graphql/types";
import { useAuth } from "@/hooks/useAuth";
import { runGraphQl } from "@/utils";
import { getName } from "@/utils/reaction";
import { has, kebabCase } from "lodash";
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
  const { user } = useAuth()
  const router = useRouter()
  const [selectedListName, setSelectedListName] = useState<null | string>('hot');
  const [totalFunding, setTotalFuncding] = useState(0)
  const [tagsCount, setTagsCount] = useState({})
  const [isCustomList, setIsCustomList] = useState(false)

  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [isUpdated, setIsUpdated] = useState(0);

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

  const onDeleteList = async (id: number) => {
    const deleteRes = await fetch(`/api/delete_list?listId=${id}`, {
      method: 'DELETE',
    })

    if (deleteRes.ok) router.push('/my-list')
  }

  const onSave = async (name: string) => {
    const updateNameRes = await fetch(`/api/update_list`, {
      method: 'PUT',
      body: JSON.stringify({ id: parseInt(router.query.listId as string), name }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })

    if (updateNameRes.ok) {
      setShowEditModal(false)
      setSelectedListName(name)
      setIsUpdated((new Date).getTime())
    }
  }

  return (
    <div className="max-w-6xl px-4 pt-4 mx-auto sm:px-6 lg:px-8 lg:pt-10 mt-10">
      <div className="grid grid-cols-4 gap-4">
        <ElemMyListsMenu
          user={user}
          setIsCustom={setIsCustomList}
          setSelectedListName={setSelectedListName}
          isUpdated={isUpdated}
        />
        <div className="col-span-3">

          <div className="w-full mb-7">
            <div className="inline-flex ">
              <h1 className="flex font-bold text-xl capitalize mb-1 items-center">
                {selectedListName === 'hot' && <IconHot className="mr-2" />}
                {selectedListName === 'like' && <IconLike className="mr-2" />}
                {selectedListName === 'crap' && <IconCrap className="mr-2" />}
                {isCustomList && <IconCompanyList className="mr-2" />}
                {selectedListName}
              </h1>

              {isCustomList &&
                <>
                  <ElemListOptionMenu onUpdateBtn={() => setShowEditModal(true)} onDeleteBtn={() => setShowDeleteModal(true)} />

                  <ElemListEditModal
                    onCloseModal={() => setShowEditModal(false)}
                    isOpen={showEditModal}
                    onSave={onSave}
                  />

                  <ElemDeleteListModal
                    onCloseModal={() => setShowDeleteModal(false)}
                    onDelete={onDeleteList}
                    isOpen={showDeleteModal}
                    listName={selectedListName}
                    deleteId={parseInt(router.query.listId as string)}
                  />
                </>
              }
            </div>
            <p className="first-letter:uppercase">{selectedListName} lists are generated from your {selectedListName?.toLowerCase()} reactions.</p>
          </div>

          <ElemCompanies
            handleNavigation={handleRowClick}
            companies={companies}
            selectedListName={selectedListName}
            totalFunding={totalFunding}
            getAlternateRowColor={getAlternateRowColor}
            tagsCount={tagsCount}
            isCustomList={isCustomList}
            setIsUpdated={setIsUpdated}
          />

          <ElemInvestors
            handleNavigation={handleRowClick}
            vcfirms={vcfirms}
            selectedListName={selectedListName}
            getAlternateRowColor={getAlternateRowColor}
            isCustomList={isCustomList}
            setIsUpdated={setIsUpdated}
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
    .map((follow) => ({ params: { listId: follow.list_id?.toString(), slug: kebabCase(getName(follow.list!)) } }))

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