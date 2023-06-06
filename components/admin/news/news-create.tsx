import React from 'react';
import { useCreate, useRedirect } from 'react-admin';
import ElemToolbar from '../elem-toolbar';
import ElemFormBase from '../elem-form-base';
import NewsForm from './news-form';
import { transformFormData } from './services';

export const NewsCreate = () => {
  const [create] = useCreate();
  const redirect = useRedirect();

  const handleSaveDraft = (data: any) => {
    data.status = 'draft';
    create('news', { data });
    redirect('/news');
  };

  return (
    <ElemFormBase
      title="Create a news"
      action="create"
      transform={transformFormData}
    >
      <NewsForm
        action="create"
        toolbar={<ElemToolbar onSaveDraft={handleSaveDraft} />}
      />
    </ElemFormBase>
  );
};
