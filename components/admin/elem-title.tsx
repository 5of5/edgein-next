import React from 'react';

type Props = {
  category: string;
  record?: Record<string, string>;
};

const ElemTitle = ({ category, record }: Props) => {
  return <span>{`${category} ${record ? record.name : ''}`}</span>;
};

export default ElemTitle;
