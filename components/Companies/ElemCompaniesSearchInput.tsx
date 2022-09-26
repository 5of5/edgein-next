import { Companies_Bool_Exp, useGetCompaniesQuery } from "@/graphql/types";
import { FC, useCallback, useEffect, useState } from "react";
import { ActionMeta } from "react-select";
import AsyncSelect from 'react-select/async';

type Props = {
  inputClassname?: string
  onChange: (newValue: any, actionMeta: ActionMeta<any>) => void
  name: string
  label?: string
}

export const ElemCompaniesSearchInput: FC<Props> = ({ inputClassname, onChange, label, name }) => {
  const [search, setSearch] = useState('')

  const { data: companiesData } = useGetCompaniesQuery({
    limit: null,
    offset: null,
    where: {
      slug: { _neq: "" },
      status: { _eq: "published" },
      name: { _ilike: `%${search}%` }
    } as Companies_Bool_Exp,
  })

  const compileOptions = useCallback(() => {
    const companiesDropdown = companiesData?.companies.map((company) => ({
      label: company.name,
      value: company.id,
      type: 'companies',
      logo: company.logo,
      website: company.website,
    })) || []

    return companiesDropdown
  }, [companiesData])

  const loadOptions = useCallback((search: string) => {
    setSearch(search)
    return new Promise<any[]>((resolve) => resolve(compileOptions()))
  }, [compileOptions])

  return (
    <>
      {label && (
        <label htmlFor={name} className="font-bold text-gray-400 cursor-text">
          {label}
        </label>
      )}
      <AsyncSelect
        isClearable
        defaultOptions
        cacheOptions
        loadOptions={loadOptions}
        onChange={onChange}
        defaultValue
        name="colors"
        className={`basic-multi-select border-2 rounded-t-md rounded-b-md border-primary-500 placeholder:text-slate-250 ${inputClassname}`}
        classNamePrefix="select"
        placeholder="e.g Edgein"
      />
    </>
  )
}