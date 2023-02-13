import React from "react";
import ElemTitle from "../ElemTitle";
import ElemFormBase from "../ElemFormBase";
import NewsForm from "./news-form";
import { NewsOrganizations } from "./news-organizations";

export const NewsEdit = () => {
  return (
    <div style={{ paddingBottom: "20px" }}>
      <ElemFormBase title={<ElemTitle category="News" />} action="edit">
        <NewsForm action="edit" />
      </ElemFormBase>
      <NewsOrganizations />
    </div>
  );
};
