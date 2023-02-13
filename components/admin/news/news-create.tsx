import React from "react";
import { useCreate, useRedirect } from "react-admin";
import ElemToolbar from "../ElemToolbar";
import ElemFormBase from "../ElemFormBase";
import NewsForm from "./news-form";

export const NewsCreate = () => {
  const [create] = useCreate();
  const redirect = useRedirect();

  const handleSaveDraft = (data: any) => {
    data.status = "draft";
    create("news", { data });
    redirect("/news");
  };

  return (
    <ElemFormBase title="Create a news" action="create">
      <NewsForm
        action="create"
        toolbar={<ElemToolbar onSaveDraft={handleSaveDraft} />}
      />
    </ElemFormBase>
  );
};
