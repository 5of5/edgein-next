import React from "react";
import ElemTitle from "../elem-title";
import ElemFormBase from "../elem-form-base";
import NewsForm from "./news-form";
import { NewsOrganizations } from "./news-organizations";
import { NewsPerson } from "./news-person";
import { transformFormData } from "./services";

export const NewsEdit = () => {
  return (
    <div style={{ paddingBottom: "20px" }}>
      <ElemFormBase
        title={<ElemTitle category="News" />}
        action="edit"
        transform={transformFormData}
      >
        <NewsForm action="edit" />
      </ElemFormBase>
      <NewsOrganizations />
      <NewsPerson />
    </div>
  );
};
