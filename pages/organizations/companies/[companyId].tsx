import { useAuth } from "../../../hooks/useAuth";
import { NextPage, GetStaticProps, GetServerSideProps } from "next";
import Link from "next/link"
import { ElemButton } from "@/components/ElemButton";
import { ElemPhoto } from "@/components/ElemPhoto";
import { IconChevronLeft, IconChevronRight } from "@/components/Icons";
import company from "../../../images/company.png"
import Image from "next/image";
import { InputText } from "@/components/InputText";
import { InputTextarea } from "@/components/InputTextarea";
import { InputSelect } from "@/components/InputSelect";
import { IconCamera } from "@/components/IconCamera";
import { InputSearch } from "@/components/InputSearch";
import { useState, useEffect, useRef } from "react";
import { ElemCompanyVerifyModal } from "@/components/ElemCompanyVerifyModal";
import { ElemTeamSideDrawer } from "@/components/ElemTeamSideDrawer";
import { ElemInvestmentSideDrawer } from "@/components/ElemInvestmentSideDrawer";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { Investment_Rounds, Companies, useGetCompanyQuery, GetCompanyDocument, GetCompanyQuery, useGetAllCoinsQuery, Coins, Team_Members } from "@/graphql/types";
import { useRouter } from "next/router";
import { runGraphQl, convertToInternationalCurrencySystem, formatDate } from "@/utils";
import { IconProfilePictureUpload } from "@/components/Profile/IconFileUpload";
import { uploadFile, deleteFile } from "@/utils/fileFunctions";
import { companyLayerChoices } from "@/utils/constants";
import { TagInputText } from "@/components/TagInputText";
import { ElemEditInvestments } from "@/components/Company/ElemEditInvestments";
import { ElemEditTeam } from "@/components/Company/ElemEditTeam";

type GridProps = {
    children: any
    wrapperClass: string
}

const GridTwelve: React.FC<GridProps> = ({ children, wrapperClass }) => {
    return (
        <div className={`grid grid-cols-12 gap-2${wrapperClass ? ` ${wrapperClass}` : ''}`}>
            {children}
        </div>
    )
}

type Props = {
	company: Companies;
    sortRounds: Investment_Rounds[];
};

const CompanyEdit: NextPage<Props> = (props: Props) => {

    const { user } = useAuth();
	const router = useRouter();
	const { companyId } = router.query;

    const [modal, setModal] = useState(false)
    const [teamDrawer, setTeamDrawer] = useState(false)
    const [investmentDrawer, setInvestmentDrawer] = useState(false)
    const [company, setCompany] = useState(props.company);
    const [companyEditable, setCompanyEditable] = useState(props.company);
    const [coins, setCoins] = useState<Coins[]>()
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [coinFilterValues, setCoinFilterValues] = useState([])
    const [memberToEdit, setMemberToEdit] = useState<Team_Members>()
    const [roundToEdit, setRoundToEdit] = useState<Investment_Rounds>()
    const [selectedFile, setSelectedFile] = useState(null)

    const {
		data: companyData,
		error,
		isLoading,
	} = useGetCompanyQuery({
		slug: companyId as string,
		current_user: user?.id ?? 0,
    });

    const {
        data: coinData
    } = useGetAllCoinsQuery()

    // console.log("companyData ==", companyData)
    
    useEffect(() => {
		if (companyData) {
            setCompany(companyData?.companies[0] as Companies);
            setCompanyEditable(companyData?.companies[0] as Companies);
        }
    }, [companyData]);
    
    useEffect(() => {
        setCoins(coinData?.coins as Coins[])
        setCoinFilterValues(
            coinData?.coins ? coinData?.coins.map(x =>  {
                return {
                    title: x.ticker,
                    value: x.id
                }
            }) : []
        )
    },[coinData])

    const handleLogoEditClick = () => {
		// 👇️ open file input box on click of other element
		fileInputRef ?.current ?.click();
    };
    
    const onFileUpload = () => async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files ? event.target.files[0] : null;
		if (!file) return;
        setSelectedFile(file)
		// const res = await uploadFile(file);

		// deleteFile(person ?.picture);

		// const resp = await updateCall({ picture: res.file });

		// setPerson(resp.result);
    };

    const updateCall = async () => {
			const resp = await fetch("/api/update_company", {
				method: "POST",
				body: JSON.stringify({
					companyId: companyEditable?.id,
					company: companyEditable,
				}),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});

			return resp.json();
	};
    
    const setValues = (key: string, value: any) => {
        console.log("value ==", value)
        const tempComapny = {
            ...companyEditable,
            [key]: value
        }
        setCompanyEditable(tempComapny)
    }

    const onSaveEmployee = (employee : Team_Members) => {
        setTeamDrawer(false)
    }

    const onSaveInvestmentRound = (round : Investment_Rounds) => {
        setInvestmentDrawer(false)
    }

    const onSaveCompany = async () => {
        //check logo and upload
        if(selectedFile){
            const res = await uploadFile(selectedFile);
            console.log("file uploadedd=", res)
            deleteFile(companyEditable?.logo);
            console.log("file ddeleted=")
            setCompanyEditable({
                ...companyEditable,
                logo: res
            });
        }
        delete companyEditable.teamMembers;
        delete companyEditable.investment_rounds;
        const resp = await updateCall()
        console.log("after upddate=", resp)
        //save company data
    }

    const onCancelCompanyEdits = () => {
        setCompanyEditable(company)
    }

    return (
        <>
            <div className="max-w-6xl px-4 pt-4 mx-auto sm:px-6 lg:px-8 lg:pt-10 mt-10">
                <div className="grid grid-cols-4 gap-4">
                <DashboardLayout />

                    <div className="col-span-3">
                        <div className="flex pl-6 justify-between items-center border-b-4 border-primary-500 sticky top-3 pb-3 z-10">
                            <h2 className="text-xl font-bold font-Metropolis text-dark-950">
                                {`Edit  ${company.name}`}
                            </h2>
                            <div>
                                <ElemButton onClick={onCancelCompanyEdits} btn="transparent" className="text-slate-300">Cancel</ElemButton>
                                <ElemButton onClick={onSaveCompany} btn="primary">Save Edits</ElemButton>
                            </div>
                        </div>

                        <div className="max-w-6xl flex justify-between items-center mt-16 bg-white rounded-lg p-5 shadow-md">
                            <div>
                                <p className="text-xl font-bold font-Metropolis text-dark-950">{`Do you work at ${company.name}?`}</p>
                                <p className="text-sm font-normal font-Metropolis">By verifying that you work here, you will be able to edit all fields on the company profile. </p>
                            </div>
                            <div>
                                <ElemButton btn="ol-primary" onClick={() => setModal(true)}>Verify Now <IconChevronRight className="w-4 h-4" /></ElemButton>
                            </div>
                        </div>

                        {modal && <ElemCompanyVerifyModal isOpen={modal} onClose={() => setModal(false)} />}

                        <div className="max-w-6xl mt-7 bg-white rounded-lg p-5 shadow-md">

                            <div className="border-b border-gray-100 pb-3">
                                <h2 className="text-xl font-bold font-Metropolis text-dark-950">
                                    Overview
                                </h2>
                            </div>

                            {/* profile image */}
                            <GridTwelve wrapperClass="mt-4 mb-2 border-b border-gray-100 pb-3">
                                <div className="col-span-3">
                                    <h2 className="text-dark-500 font-bold w-40">Profile Image*</h2>
                                </div>
                                <div className="col-span-8">
                                    <div className="flex">
                                        <div className=" relative">
                                        <ElemPhoto
                                            photo={company.logo}
                                            wrapClass="flex items-center justify-center aspect-square shrink-0 p-5 bg-white rounded-lg shadow"
                                            imgClass="object-contain w-16 h-16"
                                            imgAlt={company.name}
                                        />
                                           <span
                                                className="bg-gray-200 w-9 h-9 absolute flex items-center justify-center rounded-full bottom-0 right-0"
                                                role="button"
                                                onClick={handleLogoEditClick}
                                            >
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
                                        <div className="ml-8 mt-5">
                                            <ul>
                                                <li className=" list-disc text-gray-400 font-Metropolis text-sm font-thin">Square images work best (at least 300 x 300 pixels) </li>
                                                <li className=" list-disc text-gray-400 font-metropolis text-sm font-thin">Crop your image before you upload</li>
                                                <li className=" list-disc text-gray-400 font-metropolis text-sm font-thin">Image upoloads are limited to 2MB</li>
                                                <li className=" list-disc text-gray-400 font-metropolis text-sm font-thin">Accepted image types JPG SVG AND PNG</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </GridTwelve>

                            {/* name section */}
                            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
                                <div className="col-span-3">
                                    <h2 className="text-dark-500 font-bold w-40 text-base">Name*</h2>
                                </div>
                                <div className="col-span-8">
                                    <InputText
                                        onChange={(e) => { setValues('name', e.target.value) }}
                                        value={(companyEditable.name)? companyEditable.name : ''}
                                        name="Name"
                                        placeholder="Chia"
                                        className="placeholder:text-slate-300 w-80 text-slate-600 text-base"

                                    />
                                </div>
                            </GridTwelve>

                            {/* description section */}

                            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
                                <div className="col-span-3">
                                    <h2 className="text-dark-500 font-bold text-md w-40 text-base">Description*</h2>
                                </div>
                                <div className="col-span-8">
                                    <InputTextarea
                                        placeholder="Chia Network is building a better blockchain and smart transaction."
                                        onChange={(e) => { setValues('overview', e.target.value) }}
                                        value={(companyEditable.overview)? companyEditable.overview : ''}
                                        name="Overview"
                                        placeholder=""
                                        className="placeholder:text-slate-300 w-100 text-slate-600 text-base"
                                    />
                                </div>
                            </GridTwelve>


                            {/* company Type */}

                            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
                                <div className="col-span-3">
                                    <h2 className="text-dark-500 font-bold  w-40 text-base">Company Type*</h2>
                                </div>
                                <div className="col-span-8">
                                    <InputSelect
                                        options={layerFilterValues}
                                        value={layerFilterValues.find(x => x.value === companyEditable.layer) }
                                        onChange={(e) =>  setValues('layer',e.value)}
                                        placeholder="Layer 1 programmable/Blockchain/Netw..."
                                        className="w-100 text-slate-600 text-base"
                                    />
                                </div>
                            </GridTwelve>

                            {/* industry */}

                            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
                                <div className="col-span-3">
                                    <h2 className="text-dark-500 font-bold  w-40 text-base">Industry*</h2>
                                </div>
                                <div className="col-span-8">
                                    <TagInputText
                                        defaultTags={(companyEditable.tags) ? companyEditable.tags : []}
                                        className="mt-0 text-slate-600 text-base"
                                        // label="Industry"
                                        value=""
                                        name="Industry"
                                        placeholder="e.g. Native Code, NFTs, Nodes"
                                        onChange={(tags) => {
                                            setValues('tags', tags);
                                        }}
                                    />
                                </div>
                            </GridTwelve>

                            {/* crypto token  */}

                            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
                                <div className="col-span-3">
                                    <h2 className="text-dark-500 font-bold  w-40 text-base">Crypto Token Ticker</h2>
                                </div>
                                <div className="col-span-8">
                                    <InputSelect
                                        options={coinFilterValues}
                                        value={coinFilterValues ? coinFilterValues.find(x => x.value === companyEditable.coin?.id) : {}}
                                        onChange={(e) =>  setValues('coin', {id: e.value, ticker: e.title})}
                                       // placeholder="Layer 1 programmable/Blockchain/Netw..."
                                        className="w-80 text-slate-600 text-base"
                                    />
                                </div>
                            </GridTwelve>

                            {/* found date */}

                            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
                                <div className="col-span-3">
                                    <h2 className="text-dark-500 font-bold  w-40 text-base">Founded Date*</h2>
                                </div>
                                <div className="col-span-8">
                                    <InputText
                                        onChange={(e) => { setValues('year_founded', e.target.value)}}
                                        value=""
                                        name=""
                                        placeholder="2017-Aug-15"
                                        className="placeholder:text-slate-300 w-80 text-slate-600 text-base"

                                    />
                                </div>
                            </GridTwelve>

                            {/* Location  */}

                            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
                                <div className="col-span-3">
                                    <h2 className="text-dark-500 font-bold w-40 text-base">Location</h2>
                                </div>
                                <div className="col-span-8 w-80">
                                    <InputText
                                        onChange={(e) => { setValues('location', e.target.value)}}
                                        value={(companyEditable.location && companyEditable.location.indexOf(',') != -1) ? companyEditable.location.split(',')[0] : (companyEditable.location ? companyEditable.location : '')}
                                        name=""
                                        placeholder="San Francisco"
                                        label="City"
                                        className="placeholder:text-slate-300 mb-5 text-slate-600 text-base"
                                    />
                                    <InputText
                                        onChange={(e) => { setValues('location', e.target.value)}}
                                        value={(companyEditable.location && companyEditable.location.indexOf(',') != -1) ? companyEditable.location.split(',')[1] : ''}
                                        name=""
                                        placeholder="United State USA"
                                        label="Country"
                                        className="placeholder:text-slate-300 text-slate-600 text-base"
                                    />
                                </div>
                            </GridTwelve>

                            {/* employee  */}

                            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
                                <div className="col-span-3">
                                    <h2 className="text-dark-500 font-bold  w-40 text-base">Number of Employees</h2>
                                </div>
                                <div className="col-span-8">
                                    <InputText
                                        onChange={(e) => { setValues('total_employees', e.target.value)}}
                                        value={(companyEditable.total_employees) ? companyEditable.total_employees: 0}
                                        name=""
                                        type='number'
                                        placeholder="745"
                                        className="placeholder:text-slate-300 w-80 text-slate-600 text-base"

                                    />
                                </div>
                            </GridTwelve>
                            {/* whitepaper section */}

                            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
                                <div className="col-span-3">
                                    <h2 className="text-dark-500 font-bold  w-40 text-base">White Paper</h2>
                                </div>
                                <div className="col-span-8">
                                    <InputText
                                        onChange={(e) => { setValues('white_paper', e.target.value)}}
                                        value={(companyEditable.white_paper) ? companyEditable.white_paper : ''}
                                        name=""
                                        placeholder="www.website.com"
                                        className="placeholder:text-slate-300 w-80 text-slate-600 text-base"

                                    />
                                </div>
                            </GridTwelve>

                            {/* website section */}

                            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
                                <div className="col-span-3">
                                    <h2 className="text-dark-500 font-bold  w-40 text-base">Website URL*</h2>
                                </div>
                                <div className="col-span-8">
                                    <InputText
                                        onChange={(e) => { setValues('website', e.target.value)}}
                                        value={(companyEditable.website) ? companyEditable.website : ''}
                                        name=""
                                        placeholder="www.website.com"
                                        className="placeholder:text-slate-300 w-80 text-slate-600 text-base"

                                    />
                                </div>
                            </GridTwelve>

                            {/* LinkedIn section */}

                            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
                                <div className="col-span-3">
                                    <h2 className="text-dark-500 font-bold  w-40 text-base">LinkedIn URL</h2>
                                </div>
                                <div className="col-span-8">
                                    <InputText
                                        onChange={(e) => { setValues('company_linkedin', e.target.value)}}
                                        value={(companyEditable.company_linkedin) ? companyEditable.company_linkedin : ''}
                                        name=""
                                        placeholder="https://linkedin.com"
                                        className="placeholder:text-slate-300 w-80 text-slate-600 text-base"

                                    />
                                </div>
                            </GridTwelve>

                            {/* Github section */}

                            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
                                <div className="col-span-3">
                                    <h2 className="text-dark-500 font-bold  w-40 text-base">Github URL</h2>
                                </div>
                                <div className="col-span-8">
                                    <InputText
                                       onChange={(e) => { setValues('github', e.target.value)}}
                                       value={(companyEditable.github) ? companyEditable.github : ''}
                                        name=""
                                        placeholder="https://github.com"
                                        className="placeholder:text-slate-300 w-80 text-slate-600 text-base"

                                    />
                                </div>
                            </GridTwelve>

                            {/* tWitter section */}

                            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
                                <div className="col-span-3">
                                    <h2 className="text-dark-500 font-bold w-40 text-base">Twitter URL</h2>
                                </div>
                                <div className="col-span-8">
                                    <InputText
                                        onChange={(e) => { setValues('twitter', e.target.value)}}
                                        value={(companyEditable.twitter) ? companyEditable.twitter : ''}
                                        name=""
                                        placeholder="https://www.twitter.com"
                                        className="placeholder:text-slate-300 w-80 text-slate-600 text-base"

                                    />
                                </div>
                            </GridTwelve>

                            {/* discord section */}

                            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
                                <div className="col-span-3">
                                    <h2 className="text-dark-500 font-bold w-40 text-base">Discord URL</h2>
                                </div>
                                <div className="col-span-8">
                                    <InputText
                                        onChange={(e) => { setValues('discord', e.target.value)}}
                                        value={(companyEditable.discord) ? companyEditable.discord : ''}
                                        name=""
                                        placeholder="https://www.discord.com"
                                        className="placeholder:text-slate-300 w-80 text-slate-600 text-base"

                                    />
                                </div>
                            </GridTwelve>


                            {/* glassdoor section */}

                            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
                                <div className="col-span-3">
                                    <h2 className="text-dark-500 font-bold  w-40 text-base">Glassdoor URL</h2>
                                </div>
                                <div className="col-span-8">
                                    <InputText
                                        onChange={(e) => { setValues('glassdoor', e.target.value)}}
                                        value={(companyEditable.glassdoor) ? companyEditable.glassdoor : ''}
                                        name=""
                                        placeholder="https://www.glassdoor.com"
                                        className="placeholder:text-slate-300 w-80 text-slate-600 text-base"

                                    />
                                </div>
                            </GridTwelve>


                            {/* career section */}

                            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
                                <div className="col-span-3">
                                    <h2 className="text-dark-500 font-bold w-40 text-base">Careers URL</h2>
                                </div>
                                <div className="col-span-8">
                                    <InputText
                                        onChange={(e) => { setValues('careers_page', e.target.value)}}
                                        value={(companyEditable.careers_page) ? companyEditable.careers_page : ''}
                                        name=""
                                        placeholder="htpps://www.careers.coom"
                                        className="placeholder:text-slate-300 w-80 text-slate-600 text-base"

                                    />
                                </div>
                            </GridTwelve>


                        </div>

                        {/* Team section starts here.. */}
                        <div className="max-w-6xl mt-7 bg-white rounded-lg p-5 shadow-md">

                            <div className="border-b border-gray-100 pb-3">
                                <h2 className="text-xl font-bold font-Metropolis text-dark-950">
                                    Team
                                </h2>
                            </div>

                            <div className="flex justify-between items-center mt-2 mb-5">
                                <h2 className="text-dark-500 font-bold font-Metropolis text-md">Employees</h2>
                                <span className="text-md cursor-pointer font-normal text-primary-500 font-Metropolis" onClick={() => {setMemberToEdit({}) ; setTeamDrawer(true)}}>Add Employee</span>
                            </div>

                            {company.teamMembers.length > 0 && (
                               
                                    <ElemEditTeam
                                        className=""
                                        onEdit={(member) => {console.log("member ==", member);setMemberToEdit(member); setTeamDrawer(true)}}
                                        // showEdit={true}
                                        heading="Team"
                                        teamMembers={company.teamMembers}
                                    />
                            )}

                            {teamDrawer && <ElemTeamSideDrawer onSaveEmployee={onSaveEmployee} memberToEdit={memberToEdit} isOpen={teamDrawer} onClose={() => setTeamDrawer(false)} />}
                        </div>

                        {/* Funding Investments section */}
                        <div className="max-w-6xl mt-7 bg-white rounded-lg p-5 shadow-md">

                            <div className="border-b border-gray-100 pb-3">
                                <h2 className="text-xl font-bold font-Metropolis text-dark-950">
                                    Funding Investments
                                </h2>
                            </div>

                            <div className="flex justify-between items-center mt-2 mb-5">
                                <h2 className="text-dark-500 font-bold font-Metropolis text-md">All Investments</h2>
                                <span className="text-md font-normal cursor-pointer text-primary-500 font-Metropolis" onClick={() => setInvestmentDrawer(true)}>Add Investmesnts Round</span>
                            </div>

                            <ElemEditInvestments
                                onEdit={(round) => {console.log("round ==", round); setRoundToEdit(round); setInvestmentDrawer(true)}}
                                investments={company.investment_rounds}
                            />
                            {investmentDrawer && <ElemInvestmentSideDrawer onSaveInvestmentRound={onSaveInvestmentRound} investmentRoundToEdit={roundToEdit} isOpen={investmentDrawer} onClose={() => setInvestmentDrawer(false)} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { data: companies } = await runGraphQl<GetCompanyQuery>(
		GetCompanyDocument,
		{ slug: context.params?.companyId, current_user: 0 }
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
					new Date(a.round_date ?? "").getTime() -
					new Date(b.round_date ?? "").getTime()
				);
			})
			.reverse() || [];

	let metaTitle = null;
	if (companies.companies[0].name) {
		metaTitle =
			companies.companies[0].name +
			" Company Profile: Credibility, Velocity & Investors - EdgeIn.io";
	}
	let metaDescription = null;
	if (companies.companies[0].overview) {
		metaDescription = companies.companies[0].overview;
	}

	return {
		props: {
			metaTitle,
			metaDescription,
			company: companies.companies[0],
			sortRounds,
		},
	};
};
const convertAmountRaised = (theAmount: number) => {
	return convertToInternationalCurrencySystem(theAmount);
};

const layerFilterValues = companyLayerChoices.map((option) => {
	return {
		title: option.id,
		value: option.id,
		description: option.name,
	};
});

export default CompanyEdit;