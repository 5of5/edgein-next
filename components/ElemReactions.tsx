import { Companies, Vc_Firms } from "@/graphql/types";
import { findIndex } from "lodash";
import { FC } from "react";
import { ElemButton } from "./ElemButton";
import { IconCrap } from "./reactions/IconCrap";
import { IconHot } from "./reactions/IconHot";
import { IconLike } from "./reactions/IconLike";

type Props = {
  data: any,
  handleReactionClick: Function
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
  follows?: any[]
}

export const ElemReactions: FC<Props> = ({
  data,
  handleReactionClick,
  blackText,
  btn,
  roundedFull,
  follows
}) => {

  const hot = findIndex(follows, (item) => {
    const fragments = item.list.name.split('-');
    return fragments[fragments.length - 1] === 'hot';
  })

  const like = findIndex(follows, (item) => {
    const fragments = item.list.name.split('-');
    return fragments[fragments.length - 1] === 'like';
  })

  const crap = findIndex(follows, (item) => {
    const fragments = item.list.name.split('-');
    return fragments[fragments.length - 1] === 'crap';
  })

  return (
    <>
      <ElemButton
        onClick={(event) => handleReactionClick(event, 'hot')}
        className={`px-1 mr-2${blackText ? " text-black" : ''}`}
        roundedFull={roundedFull}
        btn={btn}
        disabled={hot !== -1}
      ><IconHot className="mr-1" /> {data?.sentiment?.hot || 0}
      </ElemButton>
      <ElemButton
        onClick={(event) => handleReactionClick(event, 'like')}
        className={`px-1 mr-2${blackText ? " text-black" : ''}`}
        roundedFull={roundedFull}
        btn={btn}
        disabled={like !== -1}
      ><IconLike className="mr-1" /> {data?.sentiment?.like || 0}
      </ElemButton>
      <ElemButton
        onClick={(event) => handleReactionClick(event, 'crap')}
        className={`px-1${blackText ? " text-black" : ''}`}
        roundedFull={roundedFull}
        btn={btn}
        disabled={crap !== -1}
      ><IconCrap className="mr-1" /> {data?.sentiment?.crap || 0}
      </ElemButton>
    </>
  );
} 