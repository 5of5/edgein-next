import React from "react";
import {
  RenderCBIcon,
  RenderGitHubIcon,
  RenderGoogleIcon,
  RenderLinkedinIcon,
} from "@/utils/other";

type CategoryTypes = "blockchain" | "coin" | "company" | "person" | "vcFirm";

type ElemIconGroupProps = {
  category: CategoryTypes;
  action: "create" | "edit";
  keyword: string;
  topPos?: string;
};

const ElemIconGroup = ({
  category,
  action,
  keyword,
  topPos,
}: ElemIconGroupProps) => {
  const topPosValue = action === "create" ? "75px" : topPos;
  return (
    <>
      <RenderGoogleIcon
        topPos={topPosValue}
        leftPos={["blockchain", "coin"].includes(category) ? "2%" : "36%"}
        googleKeyWord={keyword}
      />
      <RenderLinkedinIcon
        topPos={topPosValue}
        leftPos={["blockchain", "coin"].includes(category) ? "5%" : "39%"}
        googleKeyWord={keyword}
      />
      <RenderGitHubIcon
        topPos={topPosValue}
        leftPos={["blockchain", "coin"].includes(category) ? "8%" : "42%"}
        googleKeyWord={keyword}
      />
      <RenderCBIcon
        topPos={topPosValue}
        leftPos={["blockchain", "coin"].includes(category) ? "11%" : "45%"}
        googleKeyWord={keyword}
      />
    </>
  );
};

export default ElemIconGroup;
