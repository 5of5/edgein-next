import {
  Companies_Bool_Exp,
  Companies_Order_By,
  Order_By,
  useGetCompaniesQuery,
} from '@/graphql/types';
import { FC, useCallback, useEffect, useState } from 'react';
// import { ActionMeta, createFilter } from 'react-select';
// import AsyncSelect from 'react-select/async';

type Props = {
  inputClassname?: string;
  // onChange: (newValue: any, actionMeta: ActionMeta<any>) => void;
  name: string;
  label?: string;
};

export const ElemCompaniesSearchInput: FC<Props> = ({
  inputClassname,
  // onChange,
  label,
  name,
}) => {
  const [search, setSearch] = useState('');

  const { data: companiesData } = useGetCompaniesQuery({
    limit: null,
    offset: null,
    orderBy: [{ name: Order_By.Asc } as Companies_Order_By],
    where: {
      slug: { _neq: '' },
      name: { _ilike: `%${search}%` },
    } as Companies_Bool_Exp,
  });

  const compileOptions = useCallback(() => {
    const companiesDropdown =
      companiesData?.companies.map(company => ({
        label: company.name,
        value: company.id,
        type: 'companies',
        logo: company.logo,
        website: company.website,
      })) || [];

    return companiesDropdown;
  }, [companiesData]);

  const loadOptions = useCallback(
    (search: string) => {
      setSearch(search);
      return new Promise<any[]>(resolve => resolve(compileOptions()));
    },
    [compileOptions],
  );

  const customStyles = {
    control: (provided: object, state: { isFocused: any }) => ({
      ...provided,
      boxShadow: state.isFocused ? 'none' : 'none',
      border: state.isFocused ? 'none' : 'none',
    }),
    option: (provided: object, state: { isFocused: any }) => ({
      ...provided,
      backgroundColor: state.isFocused && 'rgb(226 232 240)',
      color: state.isFocused && '#5E41FE',
    }),
    input: (provided: any) => ({
      ...provided,
      'input:focus': {
        boxShadow: 'none',
      },
    }),
  };

  return (
    <>
      {label && (
        <label htmlFor={name} className="font-bold text-gray-400 cursor-text">
          {label}
        </label>
      )}
      {/* <AsyncSelect
        isClearable
        defaultOptions
        cacheOptions
        loadOptions={loadOptions}
        onChange={onChange}
        defaultValue
        name="colors"
        className={`basic-multi-select border rounded-t-md rounded-b-md border-slate-300 hover:border-slate-400 transition-all placeholder:text-slate-250 focus-visible:outline-none focus:outline-none ${inputClassname}`}
        classNamePrefix="select"
        styles={customStyles}
        placeholder="e.g Mentibus"
        filterOption={createFilter({
          ignoreAccents: false,
        })}
      /> */}
    </>
  );
};
