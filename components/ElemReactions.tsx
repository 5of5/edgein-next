import { Companies, Follows_Companies, Lists, useGetListsByUserQuery, Vc_Firms } from "@/graphql/types";
import { useAuth } from "@/hooks/useAuth";
import { getName } from "@/utils/reaction";
import { findIndex } from "lodash";
import { FC, useEffect, useState } from "react";
import { ElemButton } from "./ElemButton";
import { ElemCompanyListModal } from "./ElemCompanyListModal";
import { IconCompanyList } from "./reactions/IconCompanyList";
import { IconCrap } from "./reactions/IconCrap";
import { IconHot } from "./reactions/IconHot";
import { IconLike } from "./reactions/IconLike";
import { IconSave } from "@/components/Icons"

type Props = {

  data: any;
  handleReactionClick: (
    reaction: string,
    isSelected: boolean,
  ) => (e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) => void;
  blackText?: boolean;
  btn?:
  | "danger"
  | "dark"
  | "primary"
  | "transparent"
  | "white"
  | "ol-white"
  | "ol-primary"
  | "";
  roundedFull?: boolean;
  isList?: boolean;
};

export const ElemReactions: FC<Props> = ({
  data,
  handleReactionClick,
  blackText,
  btn,
  roundedFull,
  isList,
}) => {

  const { user } = useAuth();

  const [hot, setHot] = useState(-1);
  const [like, setLike] = useState(-1);
  const [crap, setCrap] = useState(-1);
  const [list, setList] = useState<Lists[]>([]);

  const [showListModal, setShowListModal] = useState(false);

  useEffect(() => {
    setHot(() => findIndex(data.follows, (item: any) => {
      return getName(item.list) === 'hot';
    }))

    setLike(findIndex(data.follows, (item: any) => {
      return getName(item.list) === 'like';
    }))

    setCrap(findIndex(data.follows, (item: any) => {
      return getName(item.list) === 'crap';
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

  const alreadyReacted = (sentiment: number): boolean => {
    return sentiment !== -1;
  }

  const alreadyReactedClasses = (sentiment: number) => {
    return sentiment !== -1
      ? "shadow-gray-300 bg-gray-100 hover:bg-gray-100 opacity-100 shadow-xl shadow-inner ... "
      : "";
  };

  const onSaveButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setShowListModal(true);
  }

  return (
    <>
      <ElemButton
        onClick={handleReactionClick("hot", alreadyReacted(hot))}
        className={`${alreadyReactedClasses(hot)}px-1 mr-2${blackText ? " text-black" : ""
          }`}
        roundedFull={roundedFull}
        btn={btn}
      // disabled={disabled(hot)}
      >
        <IconHot className="mr-1" /> {data?.sentiment?.hot || 0}
      </ElemButton>
      <ElemButton
        onClick={handleReactionClick("like", alreadyReacted(like))}
        className={`${alreadyReactedClasses(like)}px-1 mr-2${blackText ? " text-black" : ""
          }`}
        roundedFull={roundedFull}
        btn={btn}
      // disabled={disabled(like)}
      >
        <IconLike className="mr-1" /> {data?.sentiment?.like || 0}
      </ElemButton>
      <ElemButton
        onClick={handleReactionClick("crap", alreadyReacted(crap))}
        className={`${alreadyReactedClasses(crap)}px-1 mr-2${blackText ? " text-black" : ""
          }`}
        roundedFull={roundedFull}
        btn={btn}
      // disabled={disabled(crap)}
      >
        <IconCrap className="mr-1" /> {data?.sentiment?.crap || 0}
      </ElemButton>

      {/* save button  */}
      <ElemButton
        onClick={onSaveButton}
        roundedFull={roundedFull}
        btn={btn}
        className={`mr-0 border-gray-500${isList ? ' col-end-6 col-span-2': ''} px-1 mr-2${blackText ? " text-black" : ""
      }`}
      >
        <IconCompanyList className="text-sm mr-1" /> 
        Save
      </ElemButton>

      <ElemCompanyListModal
        show={showListModal}
        onClose={() => setShowListModal(false)}
        lists={list}
        follows={data?.follows}
        onCreateNew={handleReactionClick}
        user={user}
      />
    </>
  );
} 