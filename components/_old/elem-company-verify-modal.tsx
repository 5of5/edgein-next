import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useCallback, useState } from 'react';
import { ElemButton } from '../elem-button';
import { ElemPhoto } from '../elem-photo';
import { IconX } from '../icons';
import { InputText } from '../input-text';
// import AsyncSelect from 'react-select/async';
// import { createFilter } from 'react-select';
import { validateCompanyEmail } from '@/utils';
import extractDomain from 'extract-domain';
import {
  Companies_Bool_Exp,
  Order_By,
  useGetCompaniesQuery,
  useGetVcFirmsQuery,
  Vc_Firms_Bool_Exp,
  Companies_Order_By,
  Vc_Firms_Order_By,
} from '@/graphql/types';

type Props = {
  isOpen: boolean;
  onClose: (e: any) => void;
  dropdown?: any[];
  personId?: number;
};

export const ElemCompanyVerifyModal: React.FC<Props> = ({
  isOpen,
  onClose,
  dropdown,
  personId,
}) => {
  const [isCompanySelected, setIsCompanySelected] = useState(false);
  const [isEmailEntered, setIsEmailEntered] = useState(false);
  const [finish, setFinish] = useState(false);

  const [selectedCompany, setSelectedCompany] = useState<any>();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');

  const onFinishOrCancel = () => {
    onClose(false);
    setIsCompanySelected(false);
    setIsEmailEntered(false);
    setFinish(false);
  };

  const gotoNext = (step: 'company' | 'email' | 'finish') => async () => {
    if (step === 'company') {
      if (!selectedCompany) setError('Please select company');
      else {
        setIsCompanySelected(true);
        setError('');
      }
      return;
    }

    if (step === 'email') {
      if (!email) setError('Please enter email');
      else if (
        !validateCompanyEmail([extractDomain(selectedCompany.website)], email)
      )
        setError('Please enter valid company email');
      else {
        await sendVerificationMail();
        setIsEmailEntered(true);
        setError('');
      }
      return;
    }

    if (step === 'finish') {
      if (!email) setError('Please enter email');
      else {
        setError('');
        onFinishOrCancel();
      }
      return;
    }
  };

  const sendVerificationMail = async () => {
    await fetch('/api/send-resource-verification-mail/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        resource: {
          companyName: selectedCompany.label,
          resourceId: selectedCompany.value,
          type: selectedCompany.type,
        },
        email,
        personId,
      }),
    });
  };

  const { data: companiesData } = useGetCompaniesQuery({
    limit: null,
    offset: null,
    orderBy: [{ name: Order_By.Asc } as Companies_Order_By],
    where: {
      slug: { _neq: '' },
      name: { _ilike: `%${search}%` },
    } as Companies_Bool_Exp,
  });

  const { data: vcFirmsData } = useGetVcFirmsQuery({
    limit: null,
    offset: null,
    orderBy: [{ name: Order_By.Asc } as Vc_Firms_Order_By],
    where: {
      slug: { _neq: '' },
      name: { _ilike: `%${search}%` },
    } as Vc_Firms_Bool_Exp,
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

    const vcFirmsDropdown =
      vcFirmsData?.vc_firms.map(vcfirm => ({
        label: vcfirm.name,
        value: vcfirm.id,
        type: 'vc_firms',
        logo: vcfirm.logo,
        website: vcfirm.website,
      })) || [];

    const compiledDropdown = companiesDropdown.concat(vcFirmsDropdown);

    return compiledDropdown.length ? compiledDropdown : (dropdown as any[]);
  }, [companiesData, vcFirmsData, dropdown]);

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
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-xl p-6 overflow-y-auto text-left align-middle transition-all transform bg-black rounded-lg shadow-xl">
                  {!isEmailEntered ? (
                    <>
                      <Dialog.Title as="h3" className="text-2xl font-bold">
                        Search for the company or investment firm you work for.
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-slate-600">
                          Find your company or investment firm to verify your
                          employment. Verifying will allow you to access
                          features for your business.
                        </p>
                      </div>
                    </>
                  ) : (
                    <Dialog.Title as="h3" className="text-2xl font-bold">
                      Verification email is on the way!
                    </Dialog.Title>
                  )}

                  <div className="mt-6">
                    {!isEmailEntered && (
                      <label className="font-bold cursor-text">
                        Search for your company
                      </label>
                    )}

                    {!isCompanySelected ? (
                      <>
                        {/* <AsyncSelect
                          isClearable
                          defaultOptions
                          cacheOptions
                          loadOptions={loadOptions}
                          onChange={(value: any) => setSelectedCompany(value)}
                          className="mt-1 transition-all border basic-multi-select rounded-t-md rounded-b-md border-slate-300 hover:border-slate-400 placeholder:text-slate-250 focus-visible:outline-none focus:outline-none focus-within::ring-2 focus-within::ring-primary-500"
                          classNamePrefix="select"
                          styles={customStyles}
                          placeholder="e.g Edgein"
                          filterOption={createFilter({
                            ignoreAccents: false,
                          })}
                        /> */}
                        <p className="text-red-500">{error}</p>
                        <ElemButton
                          className="float-right mt-28"
                          btn="primary"
                          onClick={gotoNext('company')}>
                          Next
                        </ElemButton>
                      </>
                    ) : (
                      isCompanySelected &&
                      !isEmailEntered && (
                        <div className="flex flex-row items-center justify-between">
                          <div className="flex items-center">
                            <ElemPhoto
                              wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 border border-black/10 rounded-lg overflow-hidden"
                              imgClass="object-fit max-w-full max-h-full"
                              photo={selectedCompany?.logo}
                              imgAlt="company logo"
                            />
                            <span className="ml-2 text-dark-500">
                              {selectedCompany?.label}
                            </span>
                          </div>

                          <button
                            onClick={() => {
                              setIsCompanySelected(false);
                              setIsEmailEntered(false);
                            }}
                            type="button"
                            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-black/10 focus:bg-black/20">
                            <IconX className="w-6 h-6 text-dark-500 justify-self-end" />
                          </button>
                        </div>
                      )
                    )}
                  </div>

                  {isCompanySelected && !isEmailEntered && (
                    <div className="mt-4">
                      <label className="font-bold">{`Please provide your ${selectedCompany?.label} email address`}</label>
                      <InputText
                        label=""
                        type="email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        name="email"
                        placeholder="e.g. name@yourcompany.com"
                        className="mt-1"
                      />
                      <p className="text-red-500">{error}</p>
                      <ElemButton
                        className="float-right mt-5"
                        btn="primary"
                        onClick={gotoNext('email')}>
                        Verify Email
                      </ElemButton>
                    </div>
                  )}

                  {isEmailEntered && isCompanySelected && !finish && (
                    <div className="clear-both">
                      <div className="mt-2">
                        <p className="text-slate-600">
                          Find your company or investment firm to verify your
                          employment. Verifying will allow you to access
                          features for your business.
                        </p>
                      </div>
                      <ElemButton
                        btn="primary"
                        className="float-right mt-5"
                        onClick={gotoNext('finish')}>
                        Finish
                      </ElemButton>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
