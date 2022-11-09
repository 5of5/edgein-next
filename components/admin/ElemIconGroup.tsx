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
};

const editTopPos = {
  blockchain: "160px",
  coin: "160px",
  company: "135px",
  person: "75px",
  vcFirm: "160px",
};

const ElemIconGroup = ({ category, action, keyword }: ElemIconGroupProps) => {
  const topPos = action === "create" ? "75px" : editTopPos[category];
  return (
    <>
      <RenderGoogleIcon
        topPos={topPos}
        leftPos={["blockchain", "coin"].includes(category) ? "2%" : "36%"}
        googleKeyWord={keyword}
      />
      <RenderLinkedinIcon
        topPos={topPos}
        leftPos={["blockchain", "coin"].includes(category) ? "5%" : "39%"}
        googleKeyWord={keyword}
      />
      <RenderGitHubIcon
        topPos={topPos}
        leftPos={["blockchain", "coin"].includes(category) ? "8%" : "42%"}
        googleKeyWord={keyword}
      />
      <RenderCBIcon
        topPos={topPos}
        leftPos={["blockchain", "coin"].includes(category) ? "11%" : "45%"}
        googleKeyWord={keyword}
      />
    </>
  );
};

export default ElemIconGroup;
