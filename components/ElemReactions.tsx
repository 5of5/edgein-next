import { findIndex } from "lodash";
import { FC, useEffect, useState } from "react";
import { ElemButton } from "./ElemButton";
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
  roundedFull
}) => {

  const [hot, setHot] = useState(-1);
  const [like, setLike] = useState(-1);
  const [crap, setCrap] = useState(-1);

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
      >
        <IconCrap className="mr-1" /> {data?.sentiment?.crap || 0}
      </ElemButton>

      {/* save button  */}
      <ElemButton      
        roundedFull={roundedFull}
        btn={btn}
        className={`w-20 ml-4  border rounded-lg border-gray-100 text-slate-600`}
      >
        {/* <IconCompanyList className="text-base w-10" />  */}
        Save
      </ElemButton>
    </>
  );
} 