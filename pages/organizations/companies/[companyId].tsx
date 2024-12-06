import { useAuth } from '../../../hooks/use-auth';
import { NextPage, GetServerSideProps } from 'next';
import { ElemButton } from '@/components/elem-button';
import { ElemPhoto } from '@/components/elem-photo';
import { InputText } from '@/components/input-text';
import { InputTextarea } from '@/components/input-textarea';
import { InputSelect } from '@/components/input-select';
import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { ElemCompanyVerifyModal } from '@/components/_old/elem-company-verify-modal';
import { ElemTeamSideDrawer } from '@/components/_old/elem-team-side-drawer';
import { ElemInvestmentSideDrawer } from '@/components/_old/elem-investment-side-drawer';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import {
  Investment_Rounds,
  Companies,
  useGetCompanyBySlugQuery,
  GetCompanyBySlugDocument,
  GetCompanyBySlugQuery,
  useGetAllCoinsQuery,
  Coins,
  Team_Members,
} from '@/graphql/types';
import { useRouter } from 'next/router';
import { runGraphQl } from '@/utils';
import { IconProfilePictureUpload } from '@/components/_old/icon-file-upload';
import { uploadFile } from '@/utils/file-functions';
import {
  companyLayerChoices,
  validateFieldsForEdit,
  validateTeamMember,
  validateInvestmentRounds,
} from '@/utils/constants';
import { TagInputText } from '@/components/_old/tag-input-text';
import { ElemEditInvestments } from '@/components/_old/elem-edit-investments';
import { ElemEditTeam } from '@/components/_old/elem-edit-team';
import { InputDate } from '@/components/input-date';
import { NextSeo } from 'next-seo';

type GridProps = {
  children: any;
  wrapperClass: string;
};

const GridTwelve: React.FC<GridProps> = ({ children, wrapperClass }) => {
  return (
    <div
      className={`grid grid-cols-12 gap-2${
        wrapperClass ? ` ${wrapperClass}` : ''
      }`}>
      {children}
    </div>
  );
};

type Props = {
  company: Companies;
  sortRounds: Investment_Rounds[];
};

const CompanyEdit: NextPage<Props> = (props: Props) => {
  const { user } = useAuth();
  const router = useRouter();
  const { companyId } = router.query;

  const [modal, setModal] = useState(false);
  const [teamDrawer, setTeamDrawer] = useState(false);
  const [investmentDrawer, setInvestmentDrawer] = useState(false);
  const [company, setCompany] = useState<Companies>(props.company);
  const [companyEditable, setCompanyEditable] = useState<any>(props.company);
  const [coins, setCoins] = useState<Coins[]>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [coinFilterValues, setCoinFilterValues] = useState([{}]);
  const [memberToEdit, setMemberToEdit] = useState<Team_Members>();
  const [roundToEdit, setRoundToEdit] = useState<Investment_Rounds>();
  const [errors, setErrors] = useState({} as any);
  const [errorsTeamMembers, setErrorsTeamMembers] = useState({} as any);
  const [errorsRounds, setErrorsRounds] = useState({} as any);

  const {
    data: companyData,
    error,
    isLoading,
  } = useGetCompanyBySlugQuery({
    slug: companyId as string,
  });

  const { data: coinData } = useGetAllCoinsQuery();

  useEffect(() => {
    if (companyData) {
      setCompany(companyData?.companies[0] as any);
      setCompanyEditable(companyData?.companies[0] as any);
    }
  }, [companyData]);

  useEffect(() => {
    setCoins(coinData?.coins as Coins[]);
    setCoinFilterValues(
      coinData?.coins
        ? coinData?.coins.map(x => {
            return {
              title: x.ticker,
              value: x.id,
            };
          })
        : [],
    );
  }, [coinData]);

  const handleLogoEditClick = () => {
    // 👇️ open file input box on click of other element
    fileInputRef?.current?.click();
  };

  const onFileUpload = () => async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;
    if (!file) {
      setErrors({ file: 'Please choose a file' });
    } else if (file.size && file.size / 1024 > 2048) {
      setErrors({ file: 'File size is greater than 2MB' });
    } else if (
      ['image/png', 'image/jpg', 'image/jpeg', 'image/svg+xml'].indexOf(
        file.type,
      ) === -1
    ) {
      setErrors({ file: 'Invalid file type' });
    } else {
      setErrors({});
      const res = await uploadFile(file);
      setCompanyEditable({
        ...companyEditable,
        logo: res.file,
      });
    }
  };

  const updateCall = async (companyData: Companies) => {
    const resp = await fetch('/api/update-company/', {
      method: 'POST',
      body: JSON.stringify({
        companyId: companyData?.id,
        company: companyData,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return resp.json();
  };

  const setValues = (key: string, value: any) => {
    const tempComapny = {
      ...companyEditable,
      [key]: value,
    };
    setCompanyEditable(tempComapny);
  };

  const onSaveEmployee = async (employee: any) => {
    const updatedEmployee = {
      ...employee,
      company_id: company.id,
      person_id: employee.person ? employee.person.id : null,
    };
    delete updatedEmployee.person;
    const error = await validateTeamMember(true, updatedEmployee);
    setErrorsTeamMembers(error);
    if (Object.keys(error).length == 0) {
      setTeamDrawer(false);
      await fetch('/api/team-member/', {
        method: 'POST',
        body: JSON.stringify({
          teammember: updatedEmployee,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      window.location.reload();
    }
  };

  const onSaveInvestmentRound = async (round: any) => {
    const updatedInvestments = round.investments
      .filter((item: any) => item.person || item.vc_firm)
      .map((item: any) => {
        const tempInvestment = {
          ...item,
          person_id: item.person ? item.person.id : null,
          vc_firm_id: item.vc_firm ? item.vc_firm.id : null,
        };
        delete tempInvestment.person;
        delete tempInvestment.vc_firm;
        return tempInvestment;
      });
    const tempRound = {
      ...round,
      investments: updatedInvestments,
      company_id: company.id,
    };
    const error = await validateInvestmentRounds(true, tempRound);
    setErrorsRounds(error);
    if (Object.keys(error).length == 0) {
      setInvestmentDrawer(false);
      await fetch('/api/upsert-investment-round/', {
        method: 'POST',
        body: JSON.stringify({
          investmentRound: tempRound,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      window.location.reload();
    }
  };

  const onSaveCompany = async () => {
    const tempData = {
      ...companyEditable,
      coin_id: companyEditable.coin ? companyEditable.coin.id : null,
    };
    delete tempData.teamMembers;
    delete tempData.investment_rounds;
    delete tempData.coin;
    delete tempData.follows;
    setCompanyEditable(tempData);
    const error = await validateFieldsForEdit(true, tempData, company);
    setErrors(error);

    if (Object.keys(error).length == 0) {
      const resp = await updateCall(tempData as Companies);
      window.location.reload();
    }
  };

  const onCancelCompanyEdits = () => {
    setCompanyEditable(company);
    window.history.back();
  };

  return (
    <>
      <NextSeo
        title={`${company.name} Company Profile: Investments, Contact Information, News, Activity, and Team`}
        description={company.overview ? company.overview : ''}
      />
      <DashboardLayout>
        <div className="max-w-6xl mx-auto">
          <div className="col-span-3">
            <div className="sticky top-0 z-10 flex items-center justify-between pt-3 pb-3 pl-6 border-b-4 border-primary-500 bg-primary-50">
              <h2 className="text-xl font-bold text-dark-950">
                {`Edit  ${company.name}`}
              </h2>
              <div>
                <ElemButton
                  onClick={onCancelCompanyEdits}
                  btn="transparent"
                  className="text-gray-300">
                  Cancel
                </ElemButton>
                <ElemButton onClick={onSaveCompany} btn="primary">
                  Save Edits
                </ElemButton>
              </div>
            </div>

            {modal && (
              <ElemCompanyVerifyModal
                isOpen={modal}
                onClose={() => setModal(false)}
              />
            )}

            <div className="max-w-6xl p-5 bg-black rounded-lg shadow-md mt-7">
              <div className="pb-3 border-b border-gray-100">
                <h2 className="text-xl font-bold text-dark-950">Overview</h2>
              </div>

              {/* profile image */}
              <GridTwelve wrapperClass="mt-4 mb-2 border-b border-gray-100 pb-3">
                <div className="col-span-3">
                  <h2 className="w-40 font-bold text-dark-500">
                    Profile Image*
                  </h2>
                </div>
                <div className="col-span-8">
                  <div className="flex">
                    <div className="relative ">
                      <ElemPhoto
                        photo={companyEditable.logo}
                        wrapClass="flex items-center justify-center aspect-square shrink-0 p-5 bg-black rounded-lg shadow"
                        imgClass="object-contain w-16 h-16"
                        imgAlt={companyEditable.name}
                      />
                      <span
                        className="absolute bottom-0 right-0 flex items-center justify-center bg-gray-200 rounded-full w-9 h-9"
                        role="button"
                        onClick={handleLogoEditClick}>
                        <IconProfilePictureUpload />
                      </span>
                      <input
                        type="file"
                        hidden={true}
                        className="hidden"
                        onChange={onFileUpload()}
                        ref={fileInputRef}
                      />
                    </div>
                    <div className="mt-5 ml-8">
                      <ul>
                        <li className="text-sm font-thin text-gray-400 list-disc ">
                          Square images work best (at least 300 x 300 pixels){' '}
                        </li>
                        <li className="text-sm font-thin text-gray-400 list-disc ">
                          Crop your image before you upload
                        </li>
                        <li className="text-sm font-thin text-gray-400 list-disc ">
                          Image upoloads are limited to 2MB
                        </li>
                        <li className="text-sm font-thin text-gray-400 list-disc ">
                          Accepted image types JPG SVG AND PNG
                        </li>
                      </ul>
                    </div>
                  </div>
                  {errors.file && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.file}
                    </p>
                  )}
                  {errors.logo && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.logo}
                    </p>
                  )}
                </div>
              </GridTwelve>

              {/* name section */}
              <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
                <div className="col-span-3">
                  <h2 className="w-40 text-base font-bold text-dark-500">
                    Name*
                  </h2>
                </div>
                <div className="col-span-8">
                  <InputText
                    onChange={e => {
                      setValues('name', e.target.value);
                    }}
                    value={companyEditable.name ? companyEditable.name : ''}
                    name="Name"
                    placeholder="Chia"
                    className="text-base placeholder:text-gray-300 w-80 text-slate-600"
                  />
                  {errors.name && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>
              </GridTwelve>

              {/* description section */}

              <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
                <div className="col-span-3">
                  <h2 className="w-40 text-base font-bold text-dark-500 text-md">
                    Description*
                  </h2>
                </div>
                <div className="col-span-8">
                  <InputTextarea
                    placeholder="Chia Network is building a better blockchain and smart transaction."
                    onChange={e => {
                      setValues('overview', e.target.value);
                    }}
                    value={
                      companyEditable.overview ? companyEditable.overview : ''
                    }
                    name="Overview"
                    className="text-base placeholder:text-gray-300 w-100 text-slate-600"
                  />
                  {errors.overview && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.overview}
                    </p>
                  )}
                </div>
              </GridTwelve>

              {/* company Type */}

              <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
                <div className="col-span-3">
                  <h2 className="w-40 text-base font-bold text-dark-500">
                    Company Type*
                  </h2>
                </div>
                <div className="col-span-8">
                  <InputSelect
                    options={layerFilterValues}
                    value={layerFilterValues.find(
                      x => x.value === companyEditable.layer,
                    )}
                    onChange={(e: any) => setValues('layer', e.value)}
                    placeholder="Layer 1 programmable/Blockchain/Netw..."
                    className="text-base w-100 text-slate-600"
                  />
                  {errors.layer && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.layer}
                    </p>
                  )}
                </div>
              </GridTwelve>

              {/* industry */}

              <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
                <div className="col-span-3">
                  <h2 className="w-40 text-base font-bold text-dark-500">
                    Industry*
                  </h2>
                </div>
                <div className="col-span-8">
                  <TagInputText
                    defaultTags={
                      companyEditable.tags ? companyEditable.tags : []
                    }
                    className="mt-0 text-base text-slate-600"
                    // label="Industry"
                    value=""
                    name="Industry"
                    placeholder="e.g. Native Code, NFTs, Nodes"
                    onChange={tags => {
                      setValues('tags', tags);
                    }}
                  />
                  {errors.tags && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.tags}
                    </p>
                  )}
                </div>
              </GridTwelve>

              {/* crypto token  */}

              <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
                <div className="col-span-3">
                  <h2 className="w-40 text-base font-bold text-dark-500">
                    Crypto Token Ticker
                  </h2>
                </div>
                <div className="col-span-8">
                  <InputSelect
                    options={coinFilterValues}
                    value={
                      coinFilterValues
                        ? coinFilterValues.find(
                            (x: any) => x.value === companyEditable.coin?.id,
                          )
                        : {}
                    }
                    onChange={(e: any) =>
                      setValues('coin', { id: e.value, ticker: e.title })
                    }
                    // placeholder="Layer 1 programmable/Blockchain/Netw..."
                    className="text-base w-80 text-slate-600"
                  />
                </div>
              </GridTwelve>

              {/* found date */}

              <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
                <div className="col-span-3">
                  <h2 className="w-40 text-base font-bold text-dark-500">
                    Founded Date*
                  </h2>
                </div>
                <div className="col-span-8">
                  <InputDate
                    name=""
                    value={
                      companyEditable.year_founded
                        ? companyEditable.year_founded
                        : ''
                    }
                    onChange={e => {
                      setValues('year_founded', e.target.value);
                    }}
                    className="block max-w-sm mt-2 placeholder-slate-500"
                  />
                  {errors.year_founded && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.year_founded}
                    </p>
                  )}
                </div>
              </GridTwelve>

              {/* Location  */}

              <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
                <div className="col-span-3">
                  <h2 className="w-40 text-base font-bold text-dark-500">
                    Location
                  </h2>
                </div>
                <div className="col-span-8 w-80">
                  <InputText
                    onChange={e => {
                      setValues(
                        'location',
                        `${e.target.value},${
                          companyEditable.location &&
                          companyEditable.location.indexOf(',') != -1
                            ? companyEditable.location.split(',')[1]
                            : ''
                        }`,
                      );
                    }}
                    value={
                      companyEditable.location &&
                      companyEditable.location.indexOf(',') != -1
                        ? companyEditable.location.split(',')[0]
                        : companyEditable.location
                        ? companyEditable.location
                        : ''
                    }
                    name=""
                    placeholder="San Francisco"
                    label="City"
                    className="mb-5 text-base placeholder:text-gray-300 text-slate-600"
                  />
                  <InputText
                    onChange={e => {
                      setValues(
                        'location',
                        `${
                          companyEditable.location &&
                          companyEditable.location.indexOf(',') != -1
                            ? companyEditable.location.split(',')[0]
                            : companyEditable.location
                        },${e.target.value}`,
                      );
                    }}
                    value={
                      companyEditable.location &&
                      companyEditable.location.indexOf(',') != -1
                        ? companyEditable.location.split(',')[1]
                        : ''
                    }
                    name=""
                    placeholder="United State USA"
                    label="Country"
                    className="text-base placeholder:text-gray-300 text-slate-600"
                  />
                </div>
              </GridTwelve>

              {/* employee  */}

              <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
                <div className="col-span-3">
                  <h2 className="w-40 text-base font-bold text-dark-500">
                    Number of Employees
                  </h2>
                </div>
                <div className="col-span-8">
                  <InputText
                    onChange={e => {
                      setValues('total_employees', e.target.value);
                    }}
                    value={
                      companyEditable.total_employees
                        ? companyEditable.total_employees
                        : 0
                    }
                    name=""
                    type="number"
                    placeholder="745"
                    className="text-base placeholder:text-gray-300 w-80 text-slate-600"
                  />
                </div>
              </GridTwelve>
              {/* whitepaper section */}

              <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
                <div className="col-span-3">
                  <h2 className="w-40 text-base font-bold text-dark-500">
                    White Paper
                  </h2>
                </div>
                <div className="col-span-8">
                  <InputText
                    onChange={e => {
                      setValues('white_paper', e.target.value);
                    }}
                    value={
                      companyEditable.white_paper
                        ? companyEditable.white_paper
                        : ''
                    }
                    name=""
                    placeholder="https://www.white-paper.com"
                    className="text-base placeholder:text-gray-300 w-80 text-slate-600"
                  />
                  {errors.white_paper && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.white_paper}
                    </p>
                  )}
                </div>
              </GridTwelve>

              {/* website section */}

              <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
                <div className="col-span-3">
                  <h2 className="w-40 text-base font-bold text-dark-500">
                    Website URL*
                  </h2>
                </div>
                <div className="col-span-8">
                  <InputText
                    onChange={e => {
                      setValues('website', e.target.value);
                    }}
                    value={
                      companyEditable.website ? companyEditable.website : ''
                    }
                    name=""
                    placeholder="https://www.website.com"
                    className="text-base placeholder:text-gray-300 w-80 text-slate-600"
                  />
                  {errors.website && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.website}
                    </p>
                  )}
                </div>
              </GridTwelve>

              {/* LinkedIn section */}

              <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
                <div className="col-span-3">
                  <h2 className="w-40 text-base font-bold text-dark-500">
                    LinkedIn URL
                  </h2>
                </div>
                <div className="col-span-8">
                  <InputText
                    onChange={e => {
                      setValues('company_linkedin', e.target.value);
                    }}
                    value={
                      companyEditable.company_linkedin
                        ? companyEditable.company_linkedin
                        : ''
                    }
                    name=""
                    placeholder="https://linkedin.com"
                    className="text-base placeholder:text-gray-300 w-80 text-slate-600"
                  />
                  {errors.company_linkedin && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.company_linkedin}
                    </p>
                  )}
                </div>
              </GridTwelve>

              {/* Github section */}

              <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
                <div className="col-span-3">
                  <h2 className="w-40 text-base font-bold text-dark-500">
                    Github URL
                  </h2>
                </div>
                <div className="col-span-8">
                  <InputText
                    onChange={e => {
                      setValues('github', e.target.value);
                    }}
                    value={companyEditable.github ? companyEditable.github : ''}
                    name=""
                    placeholder="https://github.com"
                    className="text-base placeholder:text-gray-300 w-80 text-slate-600"
                  />
                  {errors.github && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.github}
                    </p>
                  )}
                </div>
              </GridTwelve>

              {/* tWitter section */}

              <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
                <div className="col-span-3">
                  <h2 className="w-40 text-base font-bold text-dark-500">
                    Twitter URL
                  </h2>
                </div>
                <div className="col-span-8">
                  <InputText
                    onChange={e => {
                      setValues('twitter', e.target.value);
                    }}
                    value={
                      companyEditable.twitter ? companyEditable.twitter : ''
                    }
                    name=""
                    placeholder="https://www.twitter.com"
                    className="text-base placeholder:text-gray-300 w-80 text-slate-600"
                  />
                  {errors.twitter && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.twitter}
                    </p>
                  )}
                </div>
              </GridTwelve>

              {/* discord section */}

              <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
                <div className="col-span-3">
                  <h2 className="w-40 text-base font-bold text-dark-500">
                    Discord URL
                  </h2>
                </div>
                <div className="col-span-8">
                  <InputText
                    onChange={e => {
                      setValues('discord', e.target.value);
                    }}
                    value={
                      companyEditable.discord ? companyEditable.discord : ''
                    }
                    name=""
                    placeholder="https://www.discord.com"
                    className="text-base placeholder:text-gray-300 w-80 text-slate-600"
                  />
                  {errors.discord && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.discord}
                    </p>
                  )}
                </div>
              </GridTwelve>

              {/* glassdoor section */}

              <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
                <div className="col-span-3">
                  <h2 className="w-40 text-base font-bold text-dark-500">
                    Glassdoor URL
                  </h2>
                </div>
                <div className="col-span-8">
                  <InputText
                    onChange={e => {
                      setValues('glassdoor', e.target.value);
                    }}
                    value={
                      companyEditable.glassdoor ? companyEditable.glassdoor : ''
                    }
                    name=""
                    placeholder="https://www.glassdoor.com"
                    className="text-base placeholder:text-gray-300 w-80 text-slate-600"
                  />
                  {errors.glassdoor && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.glassdoor}
                    </p>
                  )}
                </div>
              </GridTwelve>

              {/* career section */}

              <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
                <div className="col-span-3">
                  <h2 className="w-40 text-base font-bold text-dark-500">
                    Careers URL
                  </h2>
                </div>
                <div className="col-span-8">
                  <InputText
                    onChange={e => {
                      setValues('careers_page', e.target.value);
                    }}
                    value={
                      companyEditable.careers_page
                        ? companyEditable.careers_page
                        : ''
                    }
                    name=""
                    placeholder="htpps://www.careers.com"
                    className="text-base placeholder:text-gray-300 w-80 text-slate-600"
                  />
                  {errors.careers_page && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.careers_page}
                    </p>
                  )}
                </div>
              </GridTwelve>
            </div>

            {/* Team section starts here.. */}
            <div className="max-w-6xl p-5 bg-black rounded-lg shadow-md mt-7">
              <div className="pb-3 border-b border-gray-100">
                <h2 className="text-xl font-bold text-dark-950">Team</h2>
              </div>

              <div className="flex items-center justify-between mt-2 mb-5">
                <h2 className="font-bold text-dark-500 text-md">Employees</h2>
                <span
                  className="font-normal cursor-pointer text-md text-primary-500 "
                  onClick={() => {
                    setMemberToEdit({} as Team_Members);
                    setTeamDrawer(true);
                  }}>
                  Add Employee
                </span>
              </div>

              {company.teamMembers.length > 0 && (
                <ElemEditTeam
                  className=""
                  onEdit={member => {
                    setMemberToEdit(member);
                    setErrorsTeamMembers({});
                    setTeamDrawer(true);
                  }}
                  // showEdit={true}
                  heading="Team"
                  teamMembers={company.teamMembers}
                />
              )}

              {teamDrawer && (
                <ElemTeamSideDrawer
                  errorsTeamMembers={errorsTeamMembers}
                  onSaveEmployee={onSaveEmployee}
                  memberToEdit={memberToEdit}
                  isOpen={teamDrawer}
                  onClose={() => setTeamDrawer(false)}
                />
              )}
            </div>

            {/* Funding Investments section */}
            <div className="max-w-6xl p-5 bg-black rounded-lg shadow-md mt-7">
              <div className="pb-3 border-b border-gray-100">
                <h2 className="text-xl font-bold text-dark-950">
                  Funding Investments
                </h2>
              </div>

              <div className="flex items-center justify-between mt-2 mb-5">
                <h2 className="font-bold text-dark-500 text-md">
                  All Investments
                </h2>
                <span
                  className="font-normal cursor-pointer text-md text-primary-500 "
                  onClick={() => {
                    setRoundToEdit({} as Investment_Rounds);
                    setInvestmentDrawer(true);
                  }}>
                  Add Investments Round
                </span>
              </div>

              <ElemEditInvestments
                onEdit={round => {
                  setRoundToEdit(
                    [...companyEditable.investment_rounds].find(
                      (item: any) => item.id === round.id,
                    ),
                  );
                  setErrorsRounds({});
                  setInvestmentDrawer(true);
                }}
                investments={company.investment_rounds}
              />
              {investmentDrawer && (
                <ElemInvestmentSideDrawer
                  errorsRounds={errorsRounds}
                  onSaveInvestmentRound={round => onSaveInvestmentRound(round)}
                  investmentRoundToEdit={roundToEdit}
                  isOpen={investmentDrawer}
                  onClose={() => setInvestmentDrawer(false)}
                />
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { data: companies } = await runGraphQl<GetCompanyBySlugQuery>(
    GetCompanyBySlugDocument,
    { slug: context.params?.companyId },
    context.req.cookies,
  );

  if (!companies?.companies[0]) {
    return {
      notFound: true,
    };
  }

  const sortRounds =
    companies.companies[0].investment_rounds
      ?.slice()
      .sort((a, b) => {
        return (
          new Date(a.round_date ?? '').getTime() -
          new Date(b.round_date ?? '').getTime()
        );
      })
      .reverse() || [];

  return {
    props: {
      company: companies.companies[0],
      sortRounds,
    },
  };
};

const layerFilterValues = companyLayerChoices.map(option => {
  return {
    title: option.id,
    value: option.id,
    description: option.name,
  };
});

export default CompanyEdit;
