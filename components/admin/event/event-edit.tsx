import React from 'react';
import ElemTitle from '../elem-title';
import ElemFormBase from '../elem-form-base';
import EventForm from './event-form';
import { EventPersonTable } from './event-person-table';
import { EventOrganizationTable } from './event-organization-table';
import { useParams } from 'react-router-dom';
import { useGetOne } from 'react-admin';
import useAdminTransform from '@/hooks/use-admin-transform';
import { withImageTransformData, withoutImageTransformData } from './services';

export const EventEdit = () => {
  const { id } = useParams();
  const { data: currentData } = useGetOne('events', { id });

  const {
    isImageUpdated,
    logo,
    transform,
    onSelect,
    onDropRejected,
    onSelectAttachment,
  } = useAdminTransform({
    withImageTransformData,
    withoutImageTransformData,
  });

  return (
    <div style={{ paddingBottom: '20px' }}>
      <ElemFormBase
        title={<ElemTitle category="Event" />}
        action="edit"
        transform={transform}>
        <EventForm
          action="edit"
          currentData={currentData}
          isImageUpdated={isImageUpdated}
          banner={logo}
          onSelect={onSelect}
          onDropRejected={onDropRejected}
          onSelectAttachment={onSelectAttachment}
        />
      </ElemFormBase>
      <EventPersonTable />
      <EventOrganizationTable />
    </div>
  );
};
