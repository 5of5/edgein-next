import { Companies, Vc_Firms } from "@/graphql/types";
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

  return (
    <>
      <ElemButton
        onClick={handleReactionClick('hot')}
        className={`px-1 mr-2${blackText ? " text-black" : ''}`}
        roundedFull={roundedFull}
        btn={btn}
        disabled={hot !== -1}
      ><IconHot className="mr-1" /> {data?.sentiment?.hot || 0}
      </ElemButton>
      <ElemButton
        onClick={handleReactionClick('like')}
        className={`px-1 mr-2${blackText ? " text-black" : ''}`}
        roundedFull={roundedFull}
        btn={btn}
        disabled={like !== -1}
      ><IconLike className="mr-1" /> {data?.sentiment?.like || 0}
      </ElemButton>
      <ElemButton
        onClick={handleReactionClick('crap')}
        className={`px-1${blackText ? " text-black" : ''}`}
        roundedFull={roundedFull}
        btn={btn}
        disabled={crap !== -1}
      ><IconCrap className="mr-1" /> {data?.sentiment?.crap || 0}
      </ElemButton>
    </>
  );
} 