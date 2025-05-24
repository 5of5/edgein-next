import { useAuth } from '../../../hooks/use-auth';
import { NextPage, GetServerSideProps } from 'next';
import { ElemButton } from '@/components/elem-button';
import { ElemPhoto } from '@/components/elem-photo';
import { InputText } from '@/components/input-text';
import { InputTextarea } from '@/components/input-textarea';
import { InputSelect } from '@/components/input-select';
import { InputYear } from '@/components/input-year';
import { InputNumber } from '@/components/input-number';
import { SearchableInputSelect } from '@/components/searchable-input-select';
import { useState, useEffect, useRef, ChangeEvent, useMemo } from 'react';
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
  validateFieldsForPartialEdit,
  validateTeamMember,
  validateInvestmentRounds,
} from '@/utils/constants';
import { TagInputText } from '@/components/_old/tag-input-text';
import { TagInputSelect } from '@/components/_old/tag-input-select';
import { ElemEditInvestments } from '@/components/_old/elem-edit-investments';
import { ElemEditTeam } from '@/components/_old/elem-edit-team';
import { InputDate } from '@/components/input-date';
import { NextSeo } from 'next-seo';
import { getAllTags } from '@/utils/helpers';

type GridProps = {
  children: any;
  wrapperClass: string;
};

const GridTwelve: React.FC<GridProps> = ({ children, wrapperClass }) => {
  return (
    <div
      className={`grid grid-cols-12 gap-4${
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

// Custom shared input styles
const inputBaseStyles =
  'rounded-md border border-neutral-700 bg-neutral-900 text-gray-300 placeholder:text-gray-500 focus:border-primary-500 focus:ring focus:ring-primary-500/20 focus:outline-none transition-colors';
const inputWrapperStyles = 'w-full max-w-md';

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
  const [coinFilterValues, setCoinFilterValues] = useState<
    { title: string; value: number }[]
  >([]);
  const [memberToEdit, setMemberToEdit] = useState<Team_Members>();
  const [roundToEdit, setRoundToEdit] = useState<Investment_Rounds>();
  const [errors, setErrors] = useState({} as any);
  const [errorsTeamMembers, setErrorsTeamMembers] = useState({} as any);
  const [errorsRounds, setErrorsRounds] = useState({} as any);
  const [industryTags, setIndustryTags] = useState<string[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coins[]>([]);

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
      console.log(
        'Company Data Object:',
        JSON.stringify(companyData?.companies[0], null, 2),
      );
      setCompany(companyData?.companies[0] as any);
      setCompanyEditable(companyData?.companies[0] as any);

      // Initialize location_json from location string if needed
      const companyObj = companyData?.companies[0] as any;
      if (
        companyObj &&
        companyObj.location &&
        (!companyObj.location_json ||
          Object.keys(companyObj.location_json || {}).length === 0)
      ) {
        const locationParts = companyObj.location
          .split(',')
          .map((part: string) => part.trim());
        const city = locationParts[0] || '';
        const country = locationParts[1] || '';

        // Create location_json if it doesn't exist
        setCompanyEditable((prev: any) => ({
          ...prev,
          location_json: {
            ...(prev.location_json || {}),
            city,
            country,
          },
        }));
      }
    }
  }, [companyData]);

  useEffect(() => {
    setCoins(coinData?.coins as Coins[]);
    // Only load first 100 coins initially for better performance
    const initialCoins = coinData?.coins?.slice(0, 100) || [];
    setFilteredCoins(initialCoins as Coins[]);

    // Create options array for dropdown
    const coinOptions = coinData?.coins
      ? coinData?.coins.map(x => ({
          title: x.ticker,
          value: x.id,
        }))
      : [];

    setCoinFilterValues(coinOptions);
  }, [coinData]);

  // Get industry tags from utils
  useEffect(() => {
    try {
      const tags = getAllTags();
      const tagNames = tags.map(tag => tag.name);
      setIndustryTags(tagNames);
      console.log(`Loaded ${tagNames.length} industry tag suggestions`);
    } catch (error) {
      console.error('Error loading industry tags:', error);
      // Fallback to some basic tags in case of error
      setIndustryTags([
        'DeFi',
        'NFT',
        'Layer 1',
        'Layer 2',
        'Gaming',
        'Metaverse',
        'AI',
      ]);
    }
  }, []);

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
    try {
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

      const data = await resp.json();

      console.log('API Response:', data);

      if (!resp.ok) {
        console.error('Error updating company:', data.message, data.errors);

        // If we have validation errors from the API, display them
        if (data.errors) {
          setErrors(data.errors);
          return { success: false, errors: data.errors };
        }

        // Generic error handling
        setErrors({ api: data.message || 'Failed to update company' });
        return { success: false, message: data.message };
      }

      return { success: true, ...data };
    } catch (error) {
      console.error('Exception while updating company:', error);
      setErrors({ api: 'Network error while updating company' });
      return {
        success: false,
        message: 'Network error while updating company',
      };
    }
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
      router.push(`/companies/${company.slug}`);
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
      router.push(`/companies/${company.slug}`);
    }
  };

  const onSaveCompany = async () => {
    // Create a clean copy of the data for updating
    const tempData = {
      ...companyEditable,
      // Handle relationships
      coin_id: companyEditable.coin ? companyEditable.coin.id : null,
      // Ensure year_founded is in the correct format (numeric)
      year_founded: companyEditable.year_founded
        ? companyEditable.year_founded
        : null,
      // Convert total_employees to numeric or null
      total_employees: companyEditable.total_employees
        ? parseFloat(companyEditable.total_employees as string)
        : null,
      // Ensure location_json is properly structured
      location_json: companyEditable.location_json || {},
    };

    // Remove fields that shouldn't be part of the update
    delete tempData.teamMembers;
    delete tempData.investment_rounds;
    delete tempData.coin;
    delete tempData.follows;
    delete tempData.to_links;
    delete tempData.from_links;
    delete tempData.__typename;

    console.log(
      'Company Object Before Save:',
      JSON.stringify(tempData, null, 2),
    );

    setCompanyEditable(tempData);
    const error = await validateFieldsForPartialEdit(true, tempData, company);
    setErrors(error);

    if (Object.keys(error).length == 0) {
      const resp = await updateCall(tempData as Companies);

      if (resp.success) {
        // Redirect to company page instead of reloading
        router.push(`/companies/${company.slug}`);
      } else {
        // Error is already set in updateCall function
        console.error('Failed to save company:', resp.message);
      }
    }
  };

  const onCancelCompanyEdits = () => {
    setCompanyEditable(company);
    window.history.back();
  };

  // Generate coin options from filtered coins with proper typing
  const coinOptions = useMemo<{ title: string; value: number }[]>(() => {
    return filteredCoins.map(coin => ({
      title: coin.ticker,
      value: coin.id,
    }));
  }, [filteredCoins]);

  return (
    <>
      <NextSeo
        title={`${company.name} Company Profile: Investments, Contact Information, News, Activity, and Team`}
        description={company.overview ? company.overview : ''}
      />
      <DashboardLayout>
        <div className="max-w-6xl mx-auto">
          <div className="col-span-3">
            <div className="sticky top-0 z-10 flex items-center justify-between py-4 px-6 border-b border-neutral-700 bg-black/80 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white">
                {`Edit ${company.name}`}
              </h2>
              <div className="flex space-x-3">
                <ElemButton
                  onClick={onCancelCompanyEdits}
                  btn="transparent"
                  className="text-gray-300 hover:text-white transition-colors">
                  Cancel
                </ElemButton>
                <ElemButton
                  onClick={onSaveCompany}
                  btn="primary"
                  className="px-6">
                  Save Changes
                </ElemButton>
              </div>
            </div>

            {modal && (
              <ElemCompanyVerifyModal
                isOpen={modal}
                onClose={() => setModal(false)}
              />
            )}

            <div className="max-w-6xl p-8 bg-black rounded-lg shadow-md mt-7 border border-neutral-800">
              {errors.api && (
                <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-md">
                  <p className="text-red-400">{errors.api}</p>
                </div>
              )}

              <div className="pb-4 mb-6 border-b border-neutral-700">
                <h2 className="text-xl font-bold text-white">
                  Company Overview
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  All fields are optional. You can save the form with partial
                  information. Only URL formats will be validated.
                </p>
              </div>

              {/* profile image */}
              <GridTwelve wrapperClass="mt-6 mb-8 pb-8 border-b border-neutral-700/50">
                <div className="col-span-4 lg:col-span-3">
                  <h2 className="text-base font-medium text-gray-300">
                    Profile Image
                  </h2>
                </div>
                <div className="col-span-8 lg:col-span-9">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative mb-4 md:mb-0">
                      <ElemPhoto
                        photo={companyEditable.logo}
                        wrapClass="flex items-center justify-center aspect-square shrink-0 p-6 bg-black rounded-lg shadow border border-neutral-700 hover:border-neutral-500 transition-colors"
                        imgClass="object-contain w-20 h-20"
                        imgAlt={companyEditable.name}
                      />
                      <span
                        className="absolute bottom-0 right-0 flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-full w-10 h-10 cursor-pointer shadow-lg"
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
                    <div className="mt-2 md:mt-0 md:ml-8">
                      <ul className="space-y-1">
                        <li className="text-sm text-gray-400">
                          • Square images work best (300 × 300 pixels or larger)
                        </li>
                        <li className="text-sm text-gray-400">
                          • Crop your image before uploading
                        </li>
                        <li className="text-sm text-gray-400">
                          • Maximum file size: 2MB
                        </li>
                        <li className="text-sm text-gray-400">
                          • Accepted formats: JPG, PNG, SVG
                        </li>
                      </ul>
                    </div>
                  </div>
                  {errors.file && (
                    <p className="mt-3 text-sm text-red-500">{errors.file}</p>
                  )}
                  {errors.logo && (
                    <p className="mt-3 text-sm text-red-500">{errors.logo}</p>
                  )}
                </div>
              </GridTwelve>

              {/* name section */}
              <GridTwelve wrapperClass="mb-6 pb-6 border-b border-neutral-700/50 items-center">
                <div className="col-span-4 lg:col-span-3">
                  <h2 className="text-base font-medium text-gray-300">Name</h2>
                </div>
                <div className="col-span-8 lg:col-span-9">
                  <InputText
                    onChange={e => {
                      setValues('name', e.target.value);
                    }}
                    value={companyEditable.name ? companyEditable.name : ''}
                    name="Name"
                    placeholder="Company Name"
                    className="w-full max-w-md"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
              </GridTwelve>

              {/* description section */}
              <GridTwelve wrapperClass="mb-6 pb-6 border-b border-neutral-700/50">
                <div className="col-span-4 lg:col-span-3">
                  <h2 className="text-base font-medium text-gray-300">
                    Description
                  </h2>
                </div>
                <div className="col-span-8 lg:col-span-9">
                  <InputTextarea
                    placeholder="Provide a brief description of the company"
                    onChange={e => {
                      setValues('overview', e.target.value);
                    }}
                    value={
                      companyEditable.overview ? companyEditable.overview : ''
                    }
                    name="Overview"
                    className="w-full"
                  />
                  {errors.overview && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.overview}
                    </p>
                  )}
                </div>
              </GridTwelve>

              {/* company Type */}
              <GridTwelve wrapperClass="mb-6 pb-6 border-b border-neutral-700/50 items-center">
                <div className="col-span-4 lg:col-span-3">
                  <h2 className="text-base font-medium text-gray-300">
                    Company Type
                  </h2>
                </div>
                <div className="col-span-8 lg:col-span-9">
                  <InputSelect
                    options={layerFilterValues}
                    value={layerFilterValues.find(
                      x => x.value === companyEditable.layer,
                    )}
                    onChange={(e: any) => setValues('layer', e.value)}
                    placeholder="Select company type..."
                    className="w-full"
                    dropdownClasses="company-type-dropdown"
                    buttonClasses="py-3"
                  />
                  {errors.layer && (
                    <p className="mt-2 text-sm text-red-500">{errors.layer}</p>
                  )}
                </div>
              </GridTwelve>

              {/* industry */}
              <GridTwelve wrapperClass="mb-6 pb-6 border-b border-neutral-700/50">
                <div className="col-span-4 lg:col-span-3">
                  <h2 className="text-base font-medium text-gray-300">
                    Industry
                  </h2>
                </div>
                <div className="col-span-8 lg:col-span-9">
                  <TagInputSelect
                    defaultTags={
                      companyEditable.tags ? companyEditable.tags : []
                    }
                    className="mt-0"
                    value=""
                    name="Industry"
                    placeholder="e.g. Native Code, NFTs, Nodes"
                    onChange={tags => {
                      setValues('tags', tags);
                    }}
                    suggestions={industryTags}
                    allowCreate={true}
                  />
                  {errors.tags && (
                    <p className="mt-2 text-sm text-red-500">{errors.tags}</p>
                  )}
                </div>
              </GridTwelve>

              {/* crypto token  */}
              <GridTwelve wrapperClass="mb-6 pb-6 border-b border-neutral-700/50">
                <div className="col-span-4 lg:col-span-3">
                  <h2 className="text-base font-medium text-gray-300">
                    Crypto Token Ticker
                  </h2>
                </div>
                <div className="col-span-8 lg:col-span-9">
                  <SearchableInputSelect
                    options={coinOptions}
                    allOptions={coinFilterValues}
                    value={
                      companyEditable.coin?.id
                        ? {
                            title: companyEditable.coin.ticker,
                            value: companyEditable.coin.id,
                          }
                        : undefined
                    }
                    onChange={option =>
                      setValues('coin', {
                        id: option.value,
                        ticker: option.title,
                      })
                    }
                    className="w-full"
                    dropdownClasses="crypto-token-dropdown"
                    buttonClasses="py-3"
                    placeholder="Select token ticker..."
                  />
                </div>
              </GridTwelve>

              {/* founded year */}
              <GridTwelve wrapperClass="mb-6 pb-6 border-b border-neutral-700/50">
                <div className="col-span-4 lg:col-span-3">
                  <h2 className="text-base font-medium text-gray-300">
                    Founded Year
                  </h2>
                </div>
                <div className="col-span-8 lg:col-span-9">
                  <InputYear
                    name="year_founded"
                    value={
                      companyEditable.year_founded
                        ? companyEditable.year_founded
                        : ''
                    }
                    onChange={value => {
                      setValues('year_founded', value);
                    }}
                    className="block max-w-lg"
                    placeholder="YYYY"
                    min={1800}
                    max={new Date().getFullYear()}
                    showCurrentYearButton={true}
                    showPresets={true}
                    presetYears={[
                      new Date().getFullYear(),
                      new Date().getFullYear() - 1,
                      new Date().getFullYear() - 2,
                      2020,
                      2018,
                      2017, // Peak crypto year
                      2015, // Ethereum launch
                      2013,
                      2009, // Bitcoin
                    ]}
                  />
                  {errors.year_founded && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.year_founded}
                    </p>
                  )}
                </div>
              </GridTwelve>

              {/* Location  */}
              <GridTwelve wrapperClass="mb-6 pb-6 border-b border-neutral-700/50">
                <div className="col-span-4 lg:col-span-3">
                  <h2 className="text-base font-medium text-gray-300">
                    Location
                  </h2>
                </div>
                <div className="col-span-8 lg:col-span-9">
                  <div className="space-y-4">
                    <InputText
                      onChange={e => {
                        setValues('location_json', {
                          ...(companyEditable.location_json || {}),
                          address: e.target.value,
                        });
                      }}
                      value={companyEditable.location_json?.address || ''}
                      name="address"
                      placeholder="123 Main St"
                      label="Street Address"
                      className="w-full max-w-md"
                    />

                    <InputText
                      onChange={e => {
                        setValues('location_json', {
                          ...(companyEditable.location_json || {}),
                          city: e.target.value,
                        });
                      }}
                      value={companyEditable.location_json?.city || ''}
                      name="city"
                      placeholder="San Francisco"
                      label="City"
                      className="w-full max-w-md"
                    />

                    <InputText
                      onChange={e => {
                        setValues('location_json', {
                          ...(companyEditable.location_json || {}),
                          state: e.target.value,
                        });
                      }}
                      value={companyEditable.location_json?.state || ''}
                      name="state"
                      placeholder="California"
                      label="State/Province"
                      className="w-full max-w-md"
                    />

                    <InputText
                      onChange={e => {
                        setValues('location_json', {
                          ...(companyEditable.location_json || {}),
                          country: e.target.value,
                        });

                        // Also update the legacy location field for backward compatibility
                        const city = companyEditable.location_json?.city || '';
                        setValues('location', `${city},${e.target.value}`);
                      }}
                      value={companyEditable.location_json?.country || ''}
                      name="country"
                      placeholder="United States"
                      label="Country"
                      className="w-full max-w-md"
                    />
                  </div>

                  {errors.location_json && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.location_json}
                    </p>
                  )}
                </div>
              </GridTwelve>

              {/* employee  */}
              <GridTwelve wrapperClass="mb-6 pb-6 border-b border-neutral-700/50">
                <div className="col-span-4 lg:col-span-3">
                  <h2 className="text-base font-medium text-gray-300">
                    Number of Employees
                  </h2>
                </div>
                <div className="col-span-8 lg:col-span-9">
                  <InputNumber
                    onChange={value => {
                      setValues('total_employees', value);
                    }}
                    value={
                      companyEditable.total_employees
                        ? companyEditable.total_employees
                        : null
                    }
                    name="total_employees"
                    placeholder="50"
                    className="w-full max-w-md"
                  />
                </div>
              </GridTwelve>

              {/* whitepaper section */}
              <GridTwelve wrapperClass="mb-6 pb-6 border-b border-neutral-700/50">
                <div className="col-span-4 lg:col-span-3">
                  <h2 className="text-base font-medium text-gray-300">
                    White Paper
                  </h2>
                </div>
                <div className="col-span-8 lg:col-span-9">
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
                    className="w-full max-w-md"
                  />
                  {errors.white_paper && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.white_paper}
                    </p>
                  )}
                </div>
              </GridTwelve>

              {/* website section */}
              <GridTwelve wrapperClass="mb-6 pb-6 border-b border-neutral-700/50 items-center">
                <div className="col-span-4 lg:col-span-3">
                  <h2 className="text-base font-medium text-gray-300">
                    Website URL
                  </h2>
                </div>
                <div className="col-span-8 lg:col-span-9">
                  <InputText
                    onChange={e => {
                      setValues('website', e.target.value);
                    }}
                    value={
                      companyEditable.website ? companyEditable.website : ''
                    }
                    name=""
                    placeholder="https://www.website.com"
                    className="w-full max-w-md"
                  />
                  {errors.website && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.website}
                    </p>
                  )}
                </div>
              </GridTwelve>

              {/* LinkedIn section */}
              <GridTwelve wrapperClass="mb-6 pb-6 border-b border-neutral-700/50 items-center">
                <div className="col-span-4 lg:col-span-3">
                  <h2 className="text-base font-medium text-gray-300">
                    LinkedIn URL
                  </h2>
                </div>
                <div className="col-span-8 lg:col-span-9">
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
                    placeholder="https://linkedin.com/company/name"
                    className="w-full max-w-md"
                  />
                  {errors.company_linkedin && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.company_linkedin}
                    </p>
                  )}
                </div>
              </GridTwelve>

              {/* Github section */}
              <GridTwelve wrapperClass="mb-6 pb-6 border-b border-neutral-700/50 items-center">
                <div className="col-span-4 lg:col-span-3">
                  <h2 className="text-base font-medium text-gray-300">
                    Github URL
                  </h2>
                </div>
                <div className="col-span-8 lg:col-span-9">
                  <InputText
                    onChange={e => {
                      setValues('github', e.target.value);
                    }}
                    value={companyEditable.github ? companyEditable.github : ''}
                    name=""
                    placeholder="https://github.com/organization"
                    className="w-full max-w-md"
                  />
                  {errors.github && (
                    <p className="mt-2 text-sm text-red-500">{errors.github}</p>
                  )}
                </div>
              </GridTwelve>

              {/* Twitter section */}
              <GridTwelve wrapperClass="mb-6 pb-6 border-b border-neutral-700/50 items-center">
                <div className="col-span-4 lg:col-span-3">
                  <h2 className="text-base font-medium text-gray-300">
                    Twitter URL
                  </h2>
                </div>
                <div className="col-span-8 lg:col-span-9">
                  <InputText
                    onChange={e => {
                      setValues('twitter', e.target.value);
                    }}
                    value={
                      companyEditable.twitter ? companyEditable.twitter : ''
                    }
                    name=""
                    placeholder="https://twitter.com/username"
                    className="w-full max-w-md"
                  />
                  {errors.twitter && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.twitter}
                    </p>
                  )}
                </div>
              </GridTwelve>

              {/* discord section */}
              <GridTwelve wrapperClass="mb-6 pb-6 border-b border-neutral-700/50 items-center">
                <div className="col-span-4 lg:col-span-3">
                  <h2 className="text-base font-medium text-gray-300">
                    Discord URL
                  </h2>
                </div>
                <div className="col-span-8 lg:col-span-9">
                  <InputText
                    onChange={e => {
                      setValues('discord', e.target.value);
                    }}
                    value={
                      companyEditable.discord ? companyEditable.discord : ''
                    }
                    name=""
                    placeholder="https://discord.gg/invite"
                    className="w-full max-w-md"
                  />
                  {errors.discord && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.discord}
                    </p>
                  )}
                </div>
              </GridTwelve>

              {/* glassdoor section */}
              <GridTwelve wrapperClass="mb-6 pb-6 border-b border-neutral-700/50 items-center">
                <div className="col-span-4 lg:col-span-3">
                  <h2 className="text-base font-medium text-gray-300">
                    Glassdoor URL
                  </h2>
                </div>
                <div className="col-span-8 lg:col-span-9">
                  <InputText
                    onChange={e => {
                      setValues('glassdoor', e.target.value);
                    }}
                    value={
                      companyEditable.glassdoor ? companyEditable.glassdoor : ''
                    }
                    name=""
                    placeholder="https://www.glassdoor.com/company"
                    className="w-full max-w-md"
                  />
                  {errors.glassdoor && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.glassdoor}
                    </p>
                  )}
                </div>
              </GridTwelve>

              {/* career section */}
              <GridTwelve wrapperClass="mb-6 pb-6 border-b border-neutral-700/50 items-center">
                <div className="col-span-4 lg:col-span-3">
                  <h2 className="text-base font-medium text-gray-300">
                    Careers URL
                  </h2>
                </div>
                <div className="col-span-8 lg:col-span-9">
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
                    placeholder="https://company.com/careers"
                    className="w-full max-w-md"
                  />
                  {errors.careers_page && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.careers_page}
                    </p>
                  )}
                </div>
              </GridTwelve>
            </div>

            {/* Team section */}
            <div className="max-w-6xl p-8 bg-black rounded-lg shadow-md mt-7 border border-neutral-800">
              <div className="pb-4 mb-6 border-b border-neutral-700">
                <h2 className="text-xl font-bold text-white">Team</h2>
              </div>

              <div className="flex items-center justify-between mt-2 mb-6">
                <h3 className="font-medium text-gray-300">Employees</h3>
                <button
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-primary-500 hover:text-primary-400 rounded-md transition-colors text-sm font-medium flex items-center space-x-1"
                  onClick={() => {
                    setMemberToEdit({} as Team_Members);
                    setTeamDrawer(true);
                  }}>
                  <span>Add Employee</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {company.teamMembers.length > 0 && (
                <ElemEditTeam
                  className=""
                  onEdit={member => {
                    setMemberToEdit(member);
                    setErrorsTeamMembers({});
                    setTeamDrawer(true);
                  }}
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
            <div className="max-w-6xl p-8 bg-black rounded-lg shadow-md mt-7 mb-10 border border-neutral-800">
              <div className="pb-4 mb-6 border-b border-neutral-700">
                <h2 className="text-xl font-bold text-white">
                  Funding & Investments
                </h2>
              </div>

              <div className="flex items-center justify-between mt-2 mb-6">
                <h3 className="font-medium text-gray-300">Investment Rounds</h3>
                <button
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-primary-500 hover:text-primary-400 rounded-md transition-colors text-sm font-medium flex items-center space-x-1"
                  onClick={() => {
                    setRoundToEdit({} as Investment_Rounds);
                    setInvestmentDrawer(true);
                  }}>
                  <span>Add Investment Round</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
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
    title: `${option.id} - ${option.name}`,
    value: option.id,
    description: option.name,
  };
});

export default CompanyEdit;
