import { Companies, Vc_Firms } from "@/graphql/types";
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
}

export const ElemReactions: FC<Props> = ({
  data,
  handleReactionClick,
  blackText,
  btn,
  roundedFull
}) => {
  return (
    <>
      <ElemButton
        onClick={(event) => handleReactionClick(event, 'hot')}
        className={`px-1 mr-2${blackText ? " text-black" : ''}`}
        roundedFull={roundedFull}
        btn={btn}
      ><IconHot className="mr-1" /> {data?.sentiment?.hot || 0}
      </ElemButton>
      <ElemButton
        onClick={(event) => handleReactionClick(event, 'like')}
        className={`px-1 mr-2${blackText ? " text-black" : ''}`}
        roundedFull={roundedFull}
        btn={btn}
      ><IconLike className="mr-1" /> {data?.sentiment?.like || 0}
      </ElemButton>
      <ElemButton
        onClick={(event) => handleReactionClick(event, 'crap')}
        className={`px-1${blackText ? " text-black" : ''}`}
        roundedFull={roundedFull}
        btn={btn}
      ><IconCrap className="mr-1" /> {data?.sentiment?.crap || 0}
      </ElemButton>
    </>
  );
} 