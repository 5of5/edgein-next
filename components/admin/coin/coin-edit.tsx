import React from 'react';
import { useGetOne } from 'react-admin';
import { useParams } from 'react-router-dom';
import ElemTitle from '../elem-title';
import ElemFormBase from '../elem-form-base';
import CoinForm from './coin-form';
2;
export const CoinEdit = () => {
  const { id } = useParams();
  const { data: currentData } = useGetOne('coins', { id });

  return (
    <ElemFormBase title={<ElemTitle category="Coin" />} action="edit">
      <CoinForm action="edit" currentData={currentData} />
    </ElemFormBase>
  );
};
