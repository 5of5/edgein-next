import React from 'react';
import useAdminTransform from '@/hooks/use-admin-transform';
import ElemFormBase from '../elem-form-base';
import ElemTitle from '../elem-title';
import PersonForm from './person-form';
import { withImageTransformData, withoutImageTransformData } from './services';
import { TeamMemberEdit } from './team-member-edit';
import { InvestorEdit } from './investor-edit';

export const PersonEdit = () => {
  const { isImageUpdated, logo, transform, onSelect, onDropRejected } =
    useAdminTransform({
      withImageTransformData,
      withoutImageTransformData,
    });

  return (
    <>
      <ElemFormBase
        title={<ElemTitle category="Person" />}
        action="edit"
        transform={transform}>
        <PersonForm
          action="edit"
          isImageUpdated={isImageUpdated}
          logo={logo}
          onSelect={onSelect}
          onDropRejected={onDropRejected}
        />
      </ElemFormBase>
      <TeamMemberEdit />
      <InvestorEdit />
    </>
  );
};
