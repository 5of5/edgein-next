import { useAuth } from "../../../hooks/use-auth";
import { NextPage, GetStaticProps, GetServerSideProps } from "next";
import Link from "next/link";
import { ElemButton } from "@/components/elem-button";
import { ElemPhoto } from "@/components/elem-photo";
import { IconChevronLeft, IconChevronRight } from "@/components/icons";
import Image from "next/image";
import { InputText } from "@/components/input-text";
import { InputTextarea } from "@/components/input-textarea";
import { InputSelect } from "@/components/input-select";
import { InputSearch } from "@/components/input-search";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { ElemCompanyVerifyModal } from "@/components/elem-company-verify-modal";
import { ElemTeamSideDrawer } from "@/components/elem-team-side-drawer";
import { ElemInvestmentSideDrawer } from "@/components/elem-investment-side-drawer";
import { DashboardLayout } from "@/components/Dashboard2/dashboard-layout";
import {
	Investment_Rounds,
	Companies,
	useGetCompanyQuery,
	GetCompanyDocument,
	GetCompanyQuery,
	useGetAllCoinsQuery,
	Coins,
	Team_Members,
} from "@/graphql/types";
import { useRouter } from "next/router";
import {
	runGraphQl,
	convertToInternationalCurrencySystem,
	formatDate,
} from "@/utils";
import { IconProfilePictureUpload } from "@/components/Profile2/icon-file-upload";
import { uploadFile, deleteFile } from "@/utils/file-functions";
import {
	companyLayerChoices,
	validateFieldsForEdit,
	validateTeamMember,
	validateInvestmentRounds,
} from "@/utils/constants";
import { TagInputText } from "@/components/tag-input-text";
import { ElemEditInvestments } from "@/components/Company2/elem-edit-investments";
import { ElemEditTeam } from "@/components/Company2/elem-edit-team";
import { InputDate } from "@/components/input-date";

type GridProps = {
	children: any;
	wrapperClass: string;
};

const GridTwelve: React.FC<GridProps> = ({ children, wrapperClass }) => {
	return (
		<div
			className={`grid grid-cols-12 gap-2${
				wrapperClass ? ` ${wrapperClass}` : ""
			}`}
		>
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
	} = useGetCompanyQuery({
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
				? coinData?.coins.map((x) => {
						return {
							title: x.ticker,
							value: x.id,
						};
				  })
				: []
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
			setErrors({ file: "Please choose a file" });
		} else if (file.size && file.size / 1024 > 2048) {
			setErrors({ file: "File size is greater than 2MB" });
		} else if (
			["image/png", "image/jpg", "image/jpeg", "image/svg+xml"].indexOf(
				file.type
			) === -1
		) {
			setErrors({ file: "Invalid file type" });
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
		const resp = await fetch("/api/update-company/", {
			method: "POST",
			body: JSON.stringify({
				companyId: companyData?.id,
				company: companyData,
			}),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
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
			await fetch("/api/team-member/", {
				method: "POST",
				body: JSON.stringify({
					teammember: updatedEmployee,
				}),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
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
			await fetch("/api/upsert-investment-round/", {
				method: "POST",
				body: JSON.stringify({
					investmentRound: tempRound,
				}),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
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
		<DashboardLayout>
			<div className="max-w-6xl mx-auto">
				<div className="col-span-3">
					<div className="flex pl-6 justify-between items-center border-b-4 border-primary-500 sticky top-0 pt-3 pb-3 z-10 bg-primary-50">
						<h2 className="text-xl font-bold font-Metropolis text-dark-950">
							{`Edit  ${company.name}`}
						</h2>
						<div>
							<ElemButton
								onClick={onCancelCompanyEdits}
								btn="transparent"
								className="text-slate-300"
							>
								Cancel
							</ElemButton>
							<ElemButton onClick={onSaveCompany} btn="primary">
								Save Edits
							</ElemButton>
						</div>
					</div>

					{/* <div className="max-w-6xl flex justify-between items-center mt-16 bg-white rounded-lg p-5 shadow-md">
                            <div>
                                <p className="text-xl font-bold font-Metropolis text-dark-950">{`Do you work at ${company.name}?`}</p>
                                <p className="text-sm font-normal font-Metropolis">By verifying that you work here, you will be able to edit all fields on the company profile. </p>
                            </div>
                            <div>
                                <ElemButton btn="ol-primary" onClick={() => setModal(true)}>Verify Now <IconChevronRight className="w-4 h-4" /></ElemButton>
                            </div>
                        </div> */}

					{modal && (
						<ElemCompanyVerifyModal
							isOpen={modal}
							onClose={() => setModal(false)}
						/>
					)}

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
											photo={companyEditable.logo}
											wrapClass="flex items-center justify-center aspect-square shrink-0 p-5 bg-white rounded-lg shadow"
											imgClass="object-contain w-16 h-16"
											imgAlt={companyEditable.name}
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
											<li className=" list-disc text-gray-400 font-Metropolis text-sm font-thin">
												Square images work best (at least 300 x 300 pixels){" "}
											</li>
											<li className=" list-disc text-gray-400 font-metropolis text-sm font-thin">
												Crop your image before you upload
											</li>
											<li className=" list-disc text-gray-400 font-metropolis text-sm font-thin">
												Image upoloads are limited to 2MB
											</li>
											<li className=" list-disc text-gray-400 font-metropolis text-sm font-thin">
												Accepted image types JPG SVG AND PNG
											</li>
										</ul>
									</div>
								</div>
								{errors.file && (
									<p className="text-red-500 text-xs italic mt-2">
										{errors.file}
									</p>
								)}
								{errors.logo && (
									<p className="text-red-500 text-xs italic mt-2">
										{errors.logo}
									</p>
								)}
							</div>
						</GridTwelve>

						{/* name section */}
						<GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
							<div className="col-span-3">
								<h2 className="text-dark-500 font-bold w-40 text-base">
									Name*
								</h2>
							</div>
							<div className="col-span-8">
								<InputText
									onChange={(e) => {
										setValues("name", e.target.value);
									}}
									value={companyEditable.name ? companyEditable.name : ""}
									name="Name"
									placeholder="Chia"
									className="placeholder:text-slate-300 w-80 text-slate-600 text-base"
								/>
								{errors.name && (
									<p className="text-red-500 text-xs italic mt-2">
										{errors.name}
									</p>
								)}
							</div>
						</GridTwelve>

						{/* description section */}

						<GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
							<div className="col-span-3">
								<h2 className="text-dark-500 font-bold text-md w-40 text-base">
									Description*
								</h2>
							</div>
							<div className="col-span-8">
								<InputTextarea
									placeholder="Chia Network is building a better blockchain and smart transaction."
									onChange={(e) => {
										setValues("overview", e.target.value);
									}}
									value={
										companyEditable.overview ? companyEditable.overview : ""
									}
									name="Overview"
									className="placeholder:text-slate-300 w-100 text-slate-600 text-base"
								/>
								{errors.overview && (
									<p className="text-red-500 text-xs italic mt-2">
										{errors.overview}
									</p>
								)}
							</div>
						</GridTwelve>

						{/* company Type */}

						<GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
							<div className="col-span-3">
								<h2 className="text-dark-500 font-bold  w-40 text-base">
									Company Type*
								</h2>
							</div>
							<div className="col-span-8">
								<InputSelect
									options={layerFilterValues}
									value={layerFilterValues.find(
										(x) => x.value === companyEditable.layer
									)}
									onChange={(e: any) => setValues("layer", e.value)}
									placeholder="Layer 1 programmable/Blockchain/Netw..."
									className="w-100 text-slate-600 text-base"
								/>
								{errors.layer && (
									<p className="text-red-500 text-xs italic mt-2">
										{errors.layer}
									</p>
								)}
							</div>
						</GridTwelve>

						{/* industry */}

						<GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
							<div className="col-span-3">
								<h2 className="text-dark-500 font-bold  w-40 text-base">
									Industry*
								</h2>
							</div>
							<div className="col-span-8">
								<TagInputText
									defaultTags={companyEditable.tags ? companyEditable.tags : []}
									className="mt-0 text-slate-600 text-base"
									// label="Industry"
									value=""
									name="Industry"
									placeholder="e.g. Native Code, NFTs, Nodes"
									onChange={(tags) => {
										setValues("tags", tags);
									}}
								/>
								{errors.tags && (
									<p className="text-red-500 text-xs italic mt-2">
										{errors.tags}
									</p>
								)}
							</div>
						</GridTwelve>

						{/* crypto token  */}

						<GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
							<div className="col-span-3">
								<h2 className="text-dark-500 font-bold  w-40 text-base">
									Crypto Token Ticker
								</h2>
							</div>
							<div className="col-span-8">
								<InputSelect
									options={coinFilterValues}
									value={
										coinFilterValues
											? coinFilterValues.find(
													(x: any) => x.value === companyEditable.coin?.id
											  )
											: {}
									}
									onChange={(e: any) =>
										setValues("coin", { id: e.value, ticker: e.title })
									}
									// placeholder="Layer 1 programmable/Blockchain/Netw..."
									className="w-80 text-slate-600 text-base"
								/>
							</div>
						</GridTwelve>

						{/* found date */}

						<GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
							<div className="col-span-3">
								<h2 className="text-dark-500 font-bold  w-40 text-base">
									Founded Date*
								</h2>
							</div>
							<div className="col-span-8">
								<InputDate
									name=""
									value={
										companyEditable.year_founded
											? companyEditable.year_founded
											: ""
									}
									onChange={(e) => {
										setValues("year_founded", e.target.value);
									}}
									className=" mt-2 block max-w-sm placeholder-slate-500"
								/>
								{errors.year_founded && (
									<p className="text-red-500 text-xs italic mt-2">
										{errors.year_founded}
									</p>
								)}
							</div>
						</GridTwelve>

						{/* Location  */}

						<GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
							<div className="col-span-3">
								<h2 className="text-dark-500 font-bold w-40 text-base">
									Location
								</h2>
							</div>
							<div className="col-span-8 w-80">
								<InputText
									onChange={(e) => {
										setValues(
											"location",
											`${e.target.value},${
												companyEditable.location &&
												companyEditable.location.indexOf(",") != -1
													? companyEditable.location.split(",")[1]
													: ""
											}`
										);
									}}
									value={
										companyEditable.location &&
										companyEditable.location.indexOf(",") != -1
											? companyEditable.location.split(",")[0]
											: companyEditable.location
											? companyEditable.location
											: ""
									}
									name=""
									placeholder="San Francisco"
									label="City"
									className="placeholder:text-slate-300 mb-5 text-slate-600 text-base"
								/>
								<InputText
									onChange={(e) => {
										setValues(
											"location",
											`${
												companyEditable.location &&
												companyEditable.location.indexOf(",") != -1
													? companyEditable.location.split(",")[0]
													: companyEditable.location
											},${e.target.value}`
										);
									}}
									value={
										companyEditable.location &&
										companyEditable.location.indexOf(",") != -1
											? companyEditable.location.split(",")[1]
											: ""
									}
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
								<h2 className="text-dark-500 font-bold  w-40 text-base">
									Number of Employees
								</h2>
							</div>
							<div className="col-span-8">
								<InputText
									onChange={(e) => {
										setValues("total_employees", e.target.value);
									}}
									value={
										companyEditable.total_employees
											? companyEditable.total_employees
											: 0
									}
									name=""
									type="number"
									placeholder="745"
									className="placeholder:text-slate-300 w-80 text-slate-600 text-base"
								/>
							</div>
						</GridTwelve>
						{/* whitepaper section */}

						<GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
							<div className="col-span-3">
								<h2 className="text-dark-500 font-bold  w-40 text-base">
									White Paper
								</h2>
							</div>
							<div className="col-span-8">
								<InputText
									onChange={(e) => {
										setValues("white_paper", e.target.value);
									}}
									value={
										companyEditable.white_paper
											? companyEditable.white_paper
											: ""
									}
									name=""
									placeholder="https://www.white-paper.com"
									className="placeholder:text-slate-300 w-80 text-slate-600 text-base"
								/>
								{errors.white_paper && (
									<p className="text-red-500 text-xs italic mt-2">
										{errors.white_paper}
									</p>
								)}
							</div>
						</GridTwelve>

						{/* website section */}

						<GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
							<div className="col-span-3">
								<h2 className="text-dark-500 font-bold  w-40 text-base">
									Website URL*
								</h2>
							</div>
							<div className="col-span-8">
								<InputText
									onChange={(e) => {
										setValues("website", e.target.value);
									}}
									value={companyEditable.website ? companyEditable.website : ""}
									name=""
									placeholder="https://www.website.com"
									className="placeholder:text-slate-300 w-80 text-slate-600 text-base"
								/>
								{errors.website && (
									<p className="text-red-500 text-xs italic mt-2">
										{errors.website}
									</p>
								)}
							</div>
						</GridTwelve>

						{/* LinkedIn section */}

						<GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
							<div className="col-span-3">
								<h2 className="text-dark-500 font-bold  w-40 text-base">
									LinkedIn URL
								</h2>
							</div>
							<div className="col-span-8">
								<InputText
									onChange={(e) => {
										setValues("company_linkedin", e.target.value);
									}}
									value={
										companyEditable.company_linkedin
											? companyEditable.company_linkedin
											: ""
									}
									name=""
									placeholder="https://linkedin.com"
									className="placeholder:text-slate-300 w-80 text-slate-600 text-base"
								/>
								{errors.company_linkedin && (
									<p className="text-red-500 text-xs italic mt-2">
										{errors.company_linkedin}
									</p>
								)}
							</div>
						</GridTwelve>

						{/* Github section */}

						<GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
							<div className="col-span-3">
								<h2 className="text-dark-500 font-bold  w-40 text-base">
									Github URL
								</h2>
							</div>
							<div className="col-span-8">
								<InputText
									onChange={(e) => {
										setValues("github", e.target.value);
									}}
									value={companyEditable.github ? companyEditable.github : ""}
									name=""
									placeholder="https://github.com"
									className="placeholder:text-slate-300 w-80 text-slate-600 text-base"
								/>
								{errors.github && (
									<p className="text-red-500 text-xs italic mt-2">
										{errors.github}
									</p>
								)}
							</div>
						</GridTwelve>

						{/* tWitter section */}

						<GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
							<div className="col-span-3">
								<h2 className="text-dark-500 font-bold w-40 text-base">
									Twitter URL
								</h2>
							</div>
							<div className="col-span-8">
								<InputText
									onChange={(e) => {
										setValues("twitter", e.target.value);
									}}
									value={companyEditable.twitter ? companyEditable.twitter : ""}
									name=""
									placeholder="https://www.twitter.com"
									className="placeholder:text-slate-300 w-80 text-slate-600 text-base"
								/>
								{errors.twitter && (
									<p className="text-red-500 text-xs italic mt-2">
										{errors.twitter}
									</p>
								)}
							</div>
						</GridTwelve>

						{/* discord section */}

						<GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
							<div className="col-span-3">
								<h2 className="text-dark-500 font-bold w-40 text-base">
									Discord URL
								</h2>
							</div>
							<div className="col-span-8">
								<InputText
									onChange={(e) => {
										setValues("discord", e.target.value);
									}}
									value={companyEditable.discord ? companyEditable.discord : ""}
									name=""
									placeholder="https://www.discord.com"
									className="placeholder:text-slate-300 w-80 text-slate-600 text-base"
								/>
								{errors.discord && (
									<p className="text-red-500 text-xs italic mt-2">
										{errors.discord}
									</p>
								)}
							</div>
						</GridTwelve>

						{/* glassdoor section */}

						<GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
							<div className="col-span-3">
								<h2 className="text-dark-500 font-bold  w-40 text-base">
									Glassdoor URL
								</h2>
							</div>
							<div className="col-span-8">
								<InputText
									onChange={(e) => {
										setValues("glassdoor", e.target.value);
									}}
									value={
										companyEditable.glassdoor ? companyEditable.glassdoor : ""
									}
									name=""
									placeholder="https://www.glassdoor.com"
									className="placeholder:text-slate-300 w-80 text-slate-600 text-base"
								/>
								{errors.glassdoor && (
									<p className="text-red-500 text-xs italic mt-2">
										{errors.glassdoor}
									</p>
								)}
							</div>
						</GridTwelve>

						{/* career section */}

						<GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
							<div className="col-span-3">
								<h2 className="text-dark-500 font-bold w-40 text-base">
									Careers URL
								</h2>
							</div>
							<div className="col-span-8">
								<InputText
									onChange={(e) => {
										setValues("careers_page", e.target.value);
									}}
									value={
										companyEditable.careers_page
											? companyEditable.careers_page
											: ""
									}
									name=""
									placeholder="htpps://www.careers.com"
									className="placeholder:text-slate-300 w-80 text-slate-600 text-base"
								/>
								{errors.careers_page && (
									<p className="text-red-500 text-xs italic mt-2">
										{errors.careers_page}
									</p>
								)}
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
							<h2 className="text-dark-500 font-bold font-Metropolis text-md">
								Employees
							</h2>
							<span
								className="text-md cursor-pointer font-normal text-primary-500 font-Metropolis"
								onClick={() => {
									setMemberToEdit({} as Team_Members);
									setTeamDrawer(true);
								}}
							>
								Add Employee
							</span>
						</div>

						{company.teamMembers.length > 0 && (
							<ElemEditTeam
								className=""
								onEdit={(member) => {
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
					<div className="max-w-6xl mt-7 bg-white rounded-lg p-5 shadow-md">
						<div className="border-b border-gray-100 pb-3">
							<h2 className="text-xl font-bold font-Metropolis text-dark-950">
								Funding Investments
							</h2>
						</div>

						<div className="flex justify-between items-center mt-2 mb-5">
							<h2 className="text-dark-500 font-bold font-Metropolis text-md">
								All Investments
							</h2>
							<span
								className="text-md font-normal cursor-pointer text-primary-500 font-Metropolis"
								onClick={() => {
									setRoundToEdit({} as Investment_Rounds);
									setInvestmentDrawer(true);
								}}
							>
								Add Investments Round
							</span>
						</div>

						<ElemEditInvestments
							onEdit={(round) => {
								setRoundToEdit(
									[...companyEditable.investment_rounds].find(
										(item: any) => item.id === round.id
									)
								);
								setErrorsRounds({});
								setInvestmentDrawer(true);
							}}
							investments={company.investment_rounds}
						/>
						{investmentDrawer && (
							<ElemInvestmentSideDrawer
								errorsRounds={errorsRounds}
								onSaveInvestmentRound={(round) => onSaveInvestmentRound(round)}
								investmentRoundToEdit={roundToEdit}
								isOpen={investmentDrawer}
								onClose={() => setInvestmentDrawer(false)}
							/>
						)}
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { data: companies } = await runGraphQl<GetCompanyQuery>(
		GetCompanyDocument,
		{ slug: context.params?.companyId }
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

const layerFilterValues = companyLayerChoices.map((option) => {
	return {
		title: option.id,
		value: option.id,
		description: option.name,
	};
});

export default CompanyEdit;
