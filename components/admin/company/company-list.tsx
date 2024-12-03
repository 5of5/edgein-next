import React, { ChangeEvent, FC } from 'react';
import {
  Button,
  FunctionField,
  AutocompleteInput,
  ImageField,
  TextField,
  EditButton,
  TextInput,
  SelectField,
  ReferenceField,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
  NumberField,
  ReferenceInput,
  SelectInput,
  SelectArrayInput,
  DateField,
  useNotify,
} from 'react-admin';
import { Chip } from '@mui/material';
import { companyLayerChoices } from '../../../utils/constants';
import ElemList from '../elem-list';
import { useAuth } from '@/hooks/use-auth';
import { getAllTags, getFullAddress } from '@/utils/helpers';
import { z } from 'zod';
import { IngestCompaniesReqBody } from '@/pages/api/ingest/companies';
import axios, { AxiosError } from 'axios';
import { InsertCompaniesMutation } from '@/graphql/types';

type QuickFilterProps = {
  label: string;
  source: string;
  defaultValue: any;
};

const QuickFilter: FC<QuickFilterProps> = ({ label }) => {
  return <Chip label={label} />;
};

const filters = [
  <TextInput
    key="search"
    className="w-[500px]"
    source="name,github,website,velocity_linkedin,twitter,discord,glassdoor,year_founded"
    label="Name,Year Founded,Github,Website,Linkedin,Twitter,Discord,Glassdoor"
    resettable
    alwaysOn
  />,
  <ReferenceInput key="searchCoins" source="coin_id" reference="coins">
    <AutocompleteInput
      style={{ padding: 0, border: 'none' }}
      optionText="name"
      filterToQuery={search => ({ name: search })}
    />
  </ReferenceInput>,
  <SelectInput
    key="layer"
    source="layer"
    label="Layer"
    choices={companyLayerChoices}
  />,
  <SelectArrayInput
    key="tags"
    source="tags@_contains"
    label="Tags"
    choices={getAllTags()}
  />,
  <QuickFilter
    key="status_tags"
    source="status_tags@_contains"
    label="Trending"
    defaultValue="Trending"
  />,
];

const CompaniesToIngest = z.preprocess(
  val => String(val).trim().split('\n'),
  z.array(z.string()),
);

export const CompanyList = () => {
  const { user } = useAuth();
  const notify = useNotify();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filereader = new FileReader();

      filereader.onload = async () => {
        const parsed = CompaniesToIngest.safeParse(filereader.result);

        if (parsed.success) {
          const body: IngestCompaniesReqBody = {
            companies: parsed.data,
            enrichmentPriority: 1,
          };

          try {
            const { status, data } = await axios.post<InsertCompaniesMutation>(
              '/api/ingest/companies',
              body,
            );

            if (status === 201) {
              if (
                parsed.data.length !== data.insert_companies?.returning.length
              ) {
                console.warn({
                  ingestedCompanies: data.insert_companies?.returning,
                });

                notify(
                  `Ingested ${data.insert_companies?.returning.length}/${parsed.data.length} companies, check console for details`,
                  { type: 'warning', autoHideDuration: 10 * 1000 },
                );
              } else {
                notify(
                  `Ingested ${data.insert_companies?.returning.length}/${parsed.data.length} companies`,
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

          notify('File in an incorrect format', { type: 'error' });
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
  // console.log(handleFileChange);
  return (
    <ElemList filters={filters} enableIngest onFileChange={handleFileChange}>
      {user?.role !== 'cms-readonly' && <EditButton />}
      <FunctionField
        render={(record: any) => (
          <a
            target={'_blank'}
            rel="noreferrer"
            href={`/companies/${record.slug}`}>
            <Button label="Preview" />
          </a>
        )}
      />
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="slug" />
      <ImageField className="logoFile" source="logo.url" label="Logo" />

      <ReferenceArrayField
        label="Child companies"
        source="child_companies"
        reference="companies">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <ReferenceArrayField
        label="Child vc firms"
        source="child_vc_firms"
        reference="vc_firms">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <ReferenceField
        label="Parent company"
        source="parent_company"
        reference="companies">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField
        label="Parent vc firm"
        source="parent_vc_firm"
        reference="vc_firms">
        <TextField source="name" />
      </ReferenceField>
      <SelectField source="layer" choices={companyLayerChoices} />
      <TextField source="layer_detail" />
      <ReferenceField label="Coin" source="coin_id" reference="coins">
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="total_employees" />
      <TextField source="github" />
      {/* <TextField cellClassName=" truncate h-5%" source="notes" /> */}
      <FunctionField
        cellClassName="truncate"
        source="notes"
        render={(record: any) =>
          record.notes && record.notes.length > 25
            ? `${record.notes.substring(0, 20)}...`
            : record.notes
        }
      />
      {/* <TextField cellClassName=" truncate h-5%" source="overview" /> */}
      <FunctionField
        cellClassName="truncate"
        source="overview"
        render={(record: any) =>
          record.overview && record.overview.length > 25
            ? `${record.overview.substring(0, 20)}...`
            : record.overview
        }
      />
      <TextField source="website" />
      <TextField source="careers_page" />
      <TextField source="company_linkedin" />
      <TextField source="year_founded" />
      <TextField source="date_added" />
      <TextField source="investor_amount" />
      <TextField source="total_valuation" />
      <TextField source="white_paper" />
      <TextField source="market_verified" />
      <TextField source="velocity_linkedin" />
      <TextField source="velocity_token" />
      <TextField source="status" />
      <TextField source="aliases" />
      <TextField source="twitter" />
      <FunctionField
        cellClassName="truncate"
        source="location_json"
        render={(record: any) => getFullAddress(record.location_json)}
      />
      <TextField source="discord" />
      <TextField source="glassdoor" />
      <FunctionField
        source="library"
        render={(record: any) =>
          Array.isArray(record.library)
            ? record.library.join()
            : record.library ?? ''
        }
      />
      <FunctionField
        source="tags"
        render={(record: any) => {
          return Array.isArray(record.tags)
            ? record.tags.join()
            : record.tags ?? '';
        }}
      />
      <FunctionField
        cellClassName="truncate"
        source="web3_address"
        render={(record: any) => {
          const web3AddressisEmpty = record.web3_address?.every(
            (x: any) =>
              (x.network === '' || x.network === null) &&
              (x.address === '' || x.address === null),
          );

          if (record.web3_address?.length > 0 && web3AddressisEmpty) {
            return 'Web3 address field is empty';
          } else {
            return record.web3_address && record.web3_address.length > 0
              ? record.web3_address.length
              : record.web3_address ?? '';
          }
        }}
      />
      {/* <FunctionField
        source="web3_address"
        render={(record: any) => {
          return Array.isArray(record.web3_address) ? (
            <>
              {record.web3_address.slice(0, 3).map((r: any, index: number) => (
                <div key={r.network + r.address} style={{ display: 'inline' }}>
                  {r.network ? `${r.network}:` : ''}
                  {r.address},{' '}
                </div>
              ))}
              <div style={{ color: '#333', marginTop: '10px' }}>
                {record.web3_address.length} Web3 address
              </div>
            </>
          ) : (
            record.web3_address ?? ''
          );
        }}
      /> */}
      {/* <TextField source="counter" /> */}
      <DateField source="data_enriched_at" />
      <DateField source="domain_enriched_at" />
      <NumberField source="enrichment_priority" />
    </ElemList>
  );
};
