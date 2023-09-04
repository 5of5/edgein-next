import React, { ChangeEvent } from 'react';
import {
  ImageField,
  TextField,
  EditButton,
  TextInput,
  FunctionField,
  DateField,
  NumberField,
  useNotify,
} from 'react-admin';
import ElemList from '../elem-list';
import { useAuth } from '@/hooks/use-auth';
import { IngestPeopleReqBody } from '@/pages/api/ingest/people';
import { z } from 'zod';
import axios from 'axios';

const filters = [
  <TextInput
    key="search"
    className="w-[500px]"
    source="name,github,personal_email,work_email,linkedin"
    label="Name,Github,Personal Email,Work Email,Linkedin"
    resettable
    alwaysOn
  />,
];

const PeopleToIngest = z.preprocess(
  val => String(val).trim().split('\n'),
  z.array(z.string()),
);

export const PersonList = () => {
  const { user } = useAuth();
  const notify = useNotify();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filereader = new FileReader();

      filereader.onload = async () => {
        const parsed = PeopleToIngest.safeParse(filereader.result);

        if (parsed.success) {
          const body: IngestPeopleReqBody = {
            people: parsed.data,
            enrichmentPriority: 1,
          };

          const { status, data } = await axios.post('/api/ingest/people', body);

          if (status !== 200) {
            console.error(data);
            notify('Ingestion unsuccessful', { type: 'error' });
          }

          notify('Ingestion successful', { type: 'success' });
        } else {
          console.log(parsed.error);

          notify('File in an incorrect format', { type: 'error' });
        }
      };
      filereader.readAsText(e.target.files[0]);
    }
  };

  return (
    <ElemList filters={filters} enableIngest onFileChange={handleFileChange}>
      {user?.role !== 'cms-readonly' && <EditButton />}
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="slug" />
      <ImageField className="logoFile" source="picture.url" label="Picture" />
      <TextField source="github" />
      <TextField source="type" />
      <TextField source="personal_email" />
      <TextField source="work_email" />
      <TextField source="linkedin" />
      <FunctionField
        source="library"
        render={(record: any) =>
          Array.isArray(record.library)
            ? record.library.join()
            : record.library ?? ''
        }
      />
      <TextField source="status" />
      {/* <TextField source="counter" /> */}
      <DateField source="data_enriched_at" />
      <NumberField source="enrichment_priority" />
    </ElemList>
  );
};
