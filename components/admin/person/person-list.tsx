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
import axios, { AxiosError } from 'axios';
import { InsertPeopleMutation } from '@/graphql/types';

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

          try {
            const { status, data } = await axios.post<InsertPeopleMutation>(
              '/api/ingest/people',
              body,
            );
            if (status === 201) {
              if (parsed.data.length !== data.insert_people?.returning.length) {
                console.warn({
                  ingestedCompanies: data.insert_people?.returning,
                });

                notify(
                  `Ingested ${data.insert_people?.returning.length}/${parsed.data.length} people, check console for details`,
                  { type: 'warning', autoHideDuration: 10 * 1000 },
                );
              } else {
                notify(
                  `Ingested ${data.insert_people?.returning.length}/${parsed.data.length} people`,
                  { type: 'success' },
                );
              }
            }
          } catch (error) {
            console.error(error);

            if (error instanceof AxiosError) {
              notify(
                `Ingestion unsuccessful, check console for error\n${error.message}`,
                {
                  type: 'error',
                  multiLine: true,
                  autoHideDuration: 15 * 1000,
                },
              );
            }
          }
        } else {
          console.error(parsed.error);

          notify(parsed.error.toString(), {
            type: 'error',
            multiLine: true,
            autoHideDuration: 15 * 1000,
          });
        }

        // Reset input so the file can be uploaded again
        e.target.value = '';
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
