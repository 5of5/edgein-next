import React from 'react';
import { useGetOne } from 'react-admin';
import { useParams } from 'react-router-dom';
import ElemTitle from '../elem-title';
import ElemFormBase from '../elem-form-base';
import BlockchainForm from './blockchain-form';

export const BlockchainEdit = () => {
  const { id } = useParams();
  const { data: currentData } = useGetOne('blockchains', { id });

  return (
    <ElemFormBase title={<ElemTitle category="Blockchain" />} action="edit">
      <BlockchainForm action="edit" currentData={currentData} />
    </ElemFormBase>
  );
};
