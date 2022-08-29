import { Companies, Follows_Companies, Lists, useGetListsByUserQuery, Vc_Firms } from "@/graphql/types";
import { useAuth } from "@/hooks/useAuth";
import { findIndex } from "lodash";
import { FC, useEffect, useState } from "react";
import { ElemButton } from "./ElemButton";
import { ElemCompanyListModal } from "./ElemCompanyListModal";
import { IconCrap } from "./reactions/IconCrap";
import { IconHot } from "./reactions/IconHot";
import { IconLike } from "./reactions/IconLike";

type Props = {
  data: any,
  handleReactionClick: (reaction: string) => (e: React.MouseEvent<HTMLButtonElement>) => void;
  blackText?: boolean
  btn?:
  | "danger"
  | "dark"
  | "primary"
  | "transparent"
  | "white"
  | "ol-white"
  | "ol-primary"
  | "";
  roundedFull?: boolean
}

export const ElemReactions: FC<Props> = ({
  data,
  handleReactionClick,
  blackText,
  btn,
  roundedFull,
}) => {

  const { user } = useAuth();

  const [hot, setHot] = useState(-1);
  const [like, setLike] = useState(-1);
  const [crap, setCrap] = useState(-1);
  const [list, setList] = useState<Lists[]>([]);

  useEffect(() => {
    setHot(() => findIndex(data.follows, (item: any) => {
      const fragments = item.list.name.split('-');
      return fragments[fragments.length - 1] === 'hot';
    }))

    setLike(findIndex(data.follows, (item: any) => {
      const fragments = item.list.name.split('-');
      return fragments[fragments.length - 1] === 'like';
    }))

    setCrap(findIndex(data.follows, (item: any) => {
      const fragments = item.list.name.split('-');
      return fragments[fragments.length - 1] === 'crap';
    }))
  }, [data]);

  const {
    data: listsData,
    error,
    isLoading,
  } = useGetListsByUserQuery({
    current_user: user?.id ?? 0
  });

  useEffect(() => {
    if (listsData)
      setList(() => {
        return listsData?.lists?.filter((item) => {
          const fragments = item.name.split('-');
          const sentiment = fragments[fragments.length - 1];
          return !['hot', 'like', 'crap'].includes(sentiment)
        }) as Lists[]
      })
  }, [listsData]);

  const disabled = (sentiment: number): boolean => {
    return sentiment !== -1;
  }

  const disabledClasses = (sentiment: number) => {
    return sentiment !== -1 ? 'shadow-gray-300 bg-gray-100 hover:bg-gray-100 opacity-100 shadow-xl shadow-inner ... ': '';
  }

  return (
    <>
      <ElemButton
        onClick={handleReactionClick('hot')}
        className={`${disabledClasses(hot)}px-1 mr-2${blackText ? " text-black" : ''}`}
        roundedFull={roundedFull}
        btn={btn}
        disabled={disabled(hot)}
      ><IconHot className="mr-1" /> {data?.sentiment?.hot || 0}
      </ElemButton>
      <ElemButton
        onClick={handleReactionClick('like')}
        className={`${disabledClasses(like)}px-1 mr-2${blackText ? " text-black" : ''}`}
        roundedFull={roundedFull}
        btn={btn}
        disabled={disabled(like)}
      ><IconLike className="mr-1" /> {data?.sentiment?.like || 0}
      </ElemButton>
      <ElemButton
        onClick={handleReactionClick('crap')}
        className={`${disabledClasses(crap)}px-1 mr-2${blackText ? " text-black" : ''}`}
        roundedFull={roundedFull}
        btn={btn}
        disabled={disabled(crap)}
      ><IconCrap className="mr-1" /> {data?.sentiment?.crap || 0}
      </ElemButton>
      {/* <ElemCompanyListModal
        show
        onClose={() => { }}
        lists={list}
        follows={data?.follows}
        onCreateNew={handleReactionClick}
        user={user}
      /> */}
    </>
  );
} 