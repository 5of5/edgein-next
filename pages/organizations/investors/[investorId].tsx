import { useAuth } from "../../../hooks/useAuth";
import { NextPage, GetStaticProps, GetServerSideProps } from "next";
import { ElemButton } from "@/components/ElemButton";
import { ElemPhoto } from "@/components/ElemPhoto";
import { IconChevronRight } from "@/components/Icons";
import { InputText } from "@/components/InputText";
import { InputTextarea } from "@/components/InputTextarea";
import { InputSelect } from "@/components/InputSelect";
import { IconCamera } from "@/components/IconCamera";
import { ElemTeamSideDrawer } from "@/components/ElemTeamSideDrawer"
import { ElemInvestmentSideDrawer } from "@/components/ElemInvestmentSideDrawer"
import { useRef, useState, useEffect, ChangeEvent } from "react";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { useRouter } from "next/router";
import { uploadFile, deleteFile } from "@/utils/fileFunctions";
import {
	Follows_Vc_Firms,
	GetVcFirmDocument,
	GetVcFirmQuery,
	Investment_Rounds,
	useGetVcFirmQuery,
	Vc_Firms,
  Investors,
  Investments,
} from "@/graphql/types";
import {
	convertToInternationalCurrencySystem,
	formatDate,
	runGraphQl,
} from "@/utils";
import { IconProfilePictureUpload } from "@/components/Profile/IconFileUpload";
import { InputDate } from "@/components/InputDate";
import { validateFieldsForEdit, validateTeamMember, validateInvestmentRounds, investorTypeChoices, roundChoices } from "@/utils/constants";
import { ElemEditTeam } from "@/components/Company/ElemEditTeam";
import { InputMultiSelect } from "@/components/InputMultiSelect";
import { ElemEditInvestments } from "@/components/Company/ElemEditInvestments";

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
	vcfirm: Vc_Firms;
	sortByDateAscInvestments: Array<Investment_Rounds>;
};

const InvestorsEdit: NextPage<Props> = (props: Props) => {
  const { user } = useAuth();
  const router = useRouter();
  const [teamDrawer, setTeamDrawer] = useState(false)
  const [investmentDrawer, setInvestmentDrawer] = useState(false)
  const [vcfirm, setVcfirm] = useState(props.vcfirm);
  const [vcfirmEditable, setVcfirmEditable] = useState<any>(props.vcfirm);
  const { investorId } = router.query;
  const [errors, setErrors] = useState({} as any)
  const [memberToEdit, setMemberToEdit] = useState<Investors>()
  const [errorsTeamMembers, setErrorsTeamMembers] = useState({} as any)
  const [errorsRounds, setErrorsRounds] = useState({} as any)
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [investmenntToEdit, setInvestmentToEdit] = useState<Investments>()

  const {
		data: vcFirmData,
		error,
		isLoading,
	} = useGetVcFirmQuery({
		slug: investorId as string,
		current_user: user?.id ?? 0,
	});

  useEffect(() => {
		if (vcFirmData) {
      setVcfirm(vcFirmData?.vc_firms[0] as Vc_Firms);
      setVcfirmEditable(vcFirmData?.vc_firms[0] as any);
    }
  }, [vcFirmData]);

  console.log("vcfirm ==", vcfirm)

  const updateCall = async (vcfirmData: Vc_Firms) => {
    const resp = await fetch("/api/update_vc_firm", {
      method: "POST",
      body: JSON.stringify({
        vcFirmId: vcfirmData?.id,
        vcFirm: vcfirmData,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return resp.json();
};

const onSaveEmployee = async(employee : any) => {
 
  const updatedEmployee = {
      ...employee,
      vc_firm_id: vcfirm.id,
      person_id: (employee.person)? employee.person.id : null
  }
  delete updatedEmployee.person;
  const error = await validateTeamMember(true, updatedEmployee)
  setErrorsTeamMembers(error)
  console.log("employee ==",updatedEmployee)
  console.log("employee error ==",error)
  if (Object.keys(error).length == 0) {
      setTeamDrawer(false)
      await fetch("/api/upsert_investor", {
          method: "POST",
          body: JSON.stringify({
            investor: updatedEmployee,
            vcFirmId: vcfirm.id,
          }),
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
          },
      });
      // window.location.reload()
  }
}

const onSaveInvestmentRound = async(round : any) => {

  console.log('updated  rounf =', round)
       
  // const updatedInvestments = round.investments.filter((item: any) => (item.person || item.vc_firm)).map((item:  any) => {
  //     const tempInvestment = {
  //         ...item,
  //         person_id: (item.person) ? item.person.id : null,
  //         vc_firm_id: (item.vc_firm) ? item.vc_firm.id : null
  //     };
  //     delete tempInvestment.person;
  //     delete tempInvestment.vc_firm;
  //     return tempInvestment;
  // })
  // const tempRound = {
  //     ...round,
  //     investments: updatedInvestments,
  //     company_id: company.id
  // }
  // const error = await validateInvestmentRounds(true, tempRound)
  // setErrorsRounds(error)
  // if (Object.keys(error).length == 0) {
  //     setInvestmentDrawer(false)
  //     await fetch("/api/upsert_investment_round", {
  //         method: "POST",
  //         body: JSON.stringify({
  //             investmentRound: tempRound
  //         }),
  //         headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //         },
  //     });
  //     window.location.reload()
  // }
}

  const onSaveVcFirm = async () => {
    const tempData = {
        ...vcfirmEditable
    }
    delete tempData.follows;
    delete tempData.investments;
    delete tempData.investors;
   
    setVcfirmEditable(tempData);
    const error = await validateFieldsForEdit(true, tempData, vcfirm)
    setErrors(error)
    console.log('error', error)
    if (Object.keys(error).length == 0) {
      console.log('final data  ==', tempData)
        const resp = await updateCall(tempData  as Vc_Firms)
       // window.location.reload()
    }
}

const setValues = (key: string, value: any) => {
  const tempVcFirm = {
      ...vcfirmEditable,
      [key]: value
  }
  setVcfirmEditable(tempVcFirm)
}

const handleLogoEditClick = () => {
  // 👇️ open file input box on click of other element
  fileInputRef ?.current ?.click();
  };
 
const onFileUpload = () => async (event: ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files ? event.target.files[0] : null;
      if (!file) return;
      if(!file) {
          setErrors({file: "Please choose a file"})
      }else if(file.size && (file.size/1024) > 2048){
          setErrors({file: "File size is greater than 2MB"})
      }else if(['image/png', 'image/jpg', 'image/jpeg','image/svg+xml'].indexOf(file.type) === -1){
          setErrors({file: "Invalid file type"})
      }else{
          setErrors({})
          const res = await uploadFile(file);
          setVcfirmEditable({
              ...vcfirmEditable,
              logo: res.file
          });
      }
  };

  const onCancelVCFimsEdits = () => {
    setVcfirmEditable(vcfirm)
    window.history.back()
}

  return (
    <DashboardLayout>
    <div className="max-w-6xl mx-auto">
     
        <div className="col-span-3">
          <div className="flex pl-6 justify-between items-center border-b-4 border-primary-500 sticky top-0 pt-3 pb-3 z-10 bg-primary-50">
              <h2 className="text-xl font-bold font-Metropolis text-dark-950">
                  {`Edit  ${vcfirm.name}`}
              </h2>
              <div>
                  <ElemButton onClick={onCancelVCFimsEdits} btn="transparent" className="text-slate-300">Cancel</ElemButton>
                  <ElemButton onClick={onSaveVcFirm} btn="primary">Save Edits</ElemButton>
              </div>
          </div>

          {/* <div className=" shadow-md max-w-6xl flex justify-between items-center mt-16 bg-white rounded-lg p-5">
            <div>
              <p className="text-xl font-bold font-Metropolis text-dark-950">Do you work at IDEO CoLab Ventures?</p>
              <p className="text-sm font-normal font-Metropolis">By verifying that you work here, you will be able to edit all fields on the Investor profile. </p>
            </div>
            <div>
              <ElemButton btn="ol-primary">Verify Now <IconChevronRight className="w-4 h-4" /></ElemButton>
            </div>
          </div> */}

          <div className=" shadow-md max-w-6xl mt-7 bg-white rounded-lg p-5">

            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-xl font-bold font-Metropolis text-dark-950">
                Overview
              </h2>
            </div>

            {/* profile image */}

            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
              <div className="col-span-3">
                <h2 className="text-dark-500 font-bold  ">Profile Image*</h2>

              </div>
              <div className="col-span-8">
                <div className="flex">
                <div className=" relative">
                    <ElemPhoto
                        photo={vcfirmEditable.logo}
                        wrapClass="flex items-center justify-center aspect-square shrink-0 p-5 bg-white rounded-lg shadow"
                        imgClass="object-contain w-16 h-16"
                        imgAlt={vcfirmEditable.name}
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
                {(errors.file) && <p className="text-red-500 text-xs italic mt-2">{errors.file}</p>}
                {(errors.logo) && <p className="text-red-500 text-xs italic mt-2">{errors.logo}</p>}
              </div>
            </GridTwelve>

            {/* name section */}

            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
              <div className="col-span-3">
                <h2 className="text-dark-500 font-bold ">Name*</h2>

              </div>
              <div className="col-span-8">
                <InputText
                  onChange={(e) => { setValues('name', e.target.value) }}
                  value={(vcfirmEditable.name)? vcfirmEditable.name : ''}
                  name=""
                  placeholder="IDEO CoLab Ventures"
                  className="placeholder:text-slate-300 w-80 text-slate-600 text-base"

                />
                 {(errors.name) && <p className="text-red-500 text-xs italic mt-2">{errors.name}</p>}
              </div>
            </GridTwelve>

            {/* description section */}

            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
              <div className="col-span-3">
                <h2 className="text-dark-500 font-bold  ">Description*</h2>

              </div>
              <div className="col-span-8">
                  <InputTextarea
                      placeholder="CoLab is IDEO's platform for collaborative impact. We connect organizations to shape technology's impact on the world. Together, we design the future."
                      onChange={(e) => { setValues('overview', e.target.value) }}
                      value={(vcfirmEditable.overview)? vcfirmEditable.overview : ''}
                      name="Overview"
                      className="placeholder:text-slate-300 w-100 text-slate-600 text-base"
                  />
                  {(errors.overview) && <p className="text-red-500 text-xs italic mt-2">{errors.overview}</p>}
              </div>
            </GridTwelve>


            {/* investors Type */}

            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
              <div className="col-span-3">
                <h2 className="text-dark-500 font-bold ">Investor Type*</h2>

              </div>
              <div className="col-span-8">
                <InputSelect
                  options={investorTypeFilterValues}
                  value={investorTypeFilterValues.find(x => x.value === vcfirmEditable.investor_type) }
                  onChange={(e:any) =>  setValues('investor_type',e.value)}
                  placeholder=""
                  className="w-100 text-slate-600 text-base"
              />
              {(errors.investor_type) && <p className="text-red-500 text-xs italic mt-2">{errors.investor_type}</p>}
              </div>
            </GridTwelve>


            {/* investor stage */}

            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
              <div className="col-span-3">
                <h2 className="text-dark-500 font-bold  ">Investors Stage*</h2>

              </div>
              <div className="col-span-8">
                <InputMultiSelect
                  options={investorRoundFilterrValues}
                  value={(vcfirmEditable.investment_stage) ? vcfirmEditable.investment_stage : [] }
                  onChange={(e:any) =>  {
                    const val = (vcfirmEditable.investment_stage && vcfirmEditable.investment_stage.find((item:any) => item === e.value)) 
                    ? vcfirmEditable.investment_stage.filter((item: any) => item !== e.value)
                    : ((vcfirmEditable.investment_stage) ? [...vcfirmEditable.investment_stage, e.value] : [e.value])
                    setValues('investment_stage',val)
                  }}
                  placeholder=""
                  className="w-100 text-slate-600 text-base"
              />
              {(errors.investment_stage) && <p className="text-red-500 text-xs italic mt-2">{errors.investment_stage}</p>}
             
              </div>
            </GridTwelve>


            {/* found date */}

            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
                <div className="col-span-3">
                    <h2 className="text-dark-500 font-bold  w-40 text-base">Founded Date*</h2>
                </div>
                <div className="col-span-8">
                    <InputDate
                        name=""
                        value={(vcfirmEditable.year_founded)? vcfirmEditable.year_founded : ''}
                        onChange={(e) => { setValues('year_founded', e.target.value)}}
                        className=" mt-2 block max-w-sm placeholder-slate-500"
                    />
                    {(errors.year_founded) && <p className="text-red-500 text-xs italic mt-2">{errors.year_founded}</p>}
                </div>
            </GridTwelve>



            {/* Location  */}

            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
                <div className="col-span-3">
                    <h2 className="text-dark-500 font-bold w-40 text-base">Location</h2>
                </div>
                <div className="col-span-8 w-80">
                    <InputText
                        onChange={(e) => { setValues('location', `${e.target.value},${(vcfirmEditable.location && vcfirmEditable.location.indexOf(',') != -1) ? vcfirmEditable.location.split(',')[1] : ''}`)}}
                        value={(vcfirmEditable.location && vcfirmEditable.location.indexOf(',') != -1) ? vcfirmEditable.location.split(',')[0] : (vcfirmEditable.location ? vcfirmEditable.location : '')}
                        name=""
                        placeholder="San Francisco"
                        label="City"
                        className="placeholder:text-slate-300 mb-5 text-slate-600 text-base"
                    />
                    <InputText
                        onChange={(e) => { setValues('location', `${(vcfirmEditable.location && vcfirmEditable.location.indexOf(',') != -1) ? vcfirmEditable.location.split(',')[0] : vcfirmEditable.location},${e.target.value}`)}}
                        value={(vcfirmEditable.location && vcfirmEditable.location.indexOf(',') != -1) ? vcfirmEditable.location.split(',')[1] : ''}
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
                <h2 className="text-dark-500 font-bold  w-40">Number of Employees</h2>

              </div>
              <div className="col-span-8">
                  <InputText
                      onChange={(e) => { setValues('total_employees', e.target.value)}}
                      value={(vcfirmEditable.total_employees) ? vcfirmEditable.total_employees: 0}
                      name=""
                      type='number'
                      placeholder="745"
                      className="placeholder:text-slate-300 w-80 text-slate-600 text-base"
                  />
              </div>
            </GridTwelve>


            {/* website section */}

            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
              <div className="col-span-3">
                <h2 className="text-dark-500 font-bold ">Website URL*</h2>

              </div>
              <div className="col-span-8">
                  <InputText
                      onChange={(e) => { setValues('website', e.target.value)}}
                      value={(vcfirmEditable.website) ? vcfirmEditable.website : ''}
                      name=""
                      placeholder="https://www.website.com"
                      className="placeholder:text-slate-300 w-80 text-slate-600 text-base"

                  />
                    {(errors.website) && <p className="text-red-500 text-xs italic mt-2">{errors.website}</p>}
              </div>
            </GridTwelve>

            {/* LinkedIn section */}

            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
              <div className="col-span-3">
                <h2 className="text-dark-500 font-bold  ">LinkedIn URL</h2>

              </div>
              <div className="col-span-8">
                  <InputText
                      onChange={(e) => { setValues('linkedin', e.target.value)}}
                      value={(vcfirmEditable.linkedin) ? vcfirmEditable.linkedin : ''}
                      name=""
                      placeholder="https://linkedin.com"
                      className="placeholder:text-slate-300 w-80 text-slate-600 text-base"

                  />
                  {(errors.linkedin) && <p className="text-red-500 text-xs italic mt-2">{errors.linkedin}</p>}
              </div>
            </GridTwelve>

            {/* tWitter section */}

            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
              <div className="col-span-3">
                <h2 className="text-dark-500 font-bold ">Twitter URL</h2>

              </div>
              <div className="col-span-8">
                  <InputText
                      onChange={(e) => { setValues('twitter', e.target.value)}}
                      value={(vcfirmEditable.twitter) ? vcfirmEditable.twitter : ''}
                      name=""
                      placeholder="https://www.twitter.com"
                      className="placeholder:text-slate-300 w-80 text-slate-600 text-base"

                  />
                  {(errors.twitter) && <p className="text-red-500 text-xs italic mt-2">{errors.twitter}</p>}
              </div>
            </GridTwelve>

            {/* discord section */}

            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
              <div className="col-span-3">
                <h2 className="text-dark-500 font-bold  ">Discord URL</h2>

              </div>
              <div className="col-span-8">
                  <InputText
                      onChange={(e) => { setValues('discord', e.target.value)}}
                      value={(vcfirmEditable.discord) ? vcfirmEditable.discord : ''}
                      name=""
                      placeholder="https://www.discord.com"
                      className="placeholder:text-slate-300 w-80 text-slate-600 text-base"

                  />
                  {(errors.discord) && <p className="text-red-500 text-xs italic mt-2">{errors.discord}</p>}
              </div>
            </GridTwelve>


            {/* glassdoor section */}

            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
              <div className="col-span-3">
                <h2 className="text-dark-500 font-bold  ">Glassdoor URL</h2>

              </div>
              <div className="col-span-8">
                  <InputText
                      onChange={(e) => { setValues('glassdoor', e.target.value)}}
                      value={(vcfirmEditable.glassdoor) ? vcfirmEditable.glassdoor : ''}
                      name=""
                      placeholder="https://www.glassdoor.com"
                      className="placeholder:text-slate-300 w-80 text-slate-600 text-base"

                  />
                    {(errors.glassdoor) && <p className="text-red-500 text-xs italic mt-2">{errors.glassdoor}</p>}
              </div>
            </GridTwelve>


            {/* career section */}

            <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
              <div className="col-span-3">
                <h2 className="text-dark-500 font-bold ">Careers URL</h2>

              </div>
              <div className="col-span-8">
                  <InputText
                      onChange={(e) => { setValues('careers_page', e.target.value)}}
                      value={(vcfirmEditable.careers_page) ? vcfirmEditable.careers_page : ''}
                      name=""
                      placeholder="https://www.careers.com"
                      className="placeholder:text-slate-300 w-80 text-slate-600 text-base"

                  />
                  {(errors.careers_page) && <p className="text-red-500 text-xs italic mt-2">{errors.careers_page}</p>}
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
              <span className="text-md cursor-pointer font-normal text-primary-500 font-Metropolis" onClick={() => {setMemberToEdit({} as Investors) ; setTeamDrawer(true)}}>Add Employee</span>
          </div>

          {vcfirm.investors.length > 0 && (
            
                  <ElemEditTeam
                      className=""
                      onEdit={(member) => {setMemberToEdit(member); setErrorsTeamMembers({}); setTeamDrawer(true)}}
                      // showEdit={true}
                      heading="Team"
                      teamMembers={vcfirm.investors}
                  />
          )}

          {teamDrawer && <ElemTeamSideDrawer type={'Investors'} errorsTeamMembers={errorsTeamMembers} onSaveEmployee={onSaveEmployee} memberToEdit={memberToEdit as Investors} isOpen={teamDrawer} onClose={() => setTeamDrawer(false)} />}
          </div>
         
          {/* Investments round */}
          {/* Funding Investments section */}
          <div className="max-w-6xl mt-7 bg-white rounded-lg p-5 shadow-md">

          <div className="border-b border-gray-100 pb-3">
              <h2 className="text-xl font-bold font-Metropolis text-dark-950">
                  Investments Rounds
              </h2>
          </div>

          <div className="flex justify-between items-center mt-2 mb-5">
              <h2 className="text-dark-500 font-bold font-Metropolis text-md">All Investments</h2>
              <span className="text-md font-normal cursor-pointer text-primary-500 font-Metropolis" onClick={() => {setInvestmentToEdit({} as Investments); setInvestmentDrawer(true)}}>Add Investments Round</span>
          </div>

          <ElemEditInvestments
              type='Investors'
              onEdit={(investment) => {
                console.log("investment edit ==", investment);
                  setInvestmentToEdit([...vcfirmEditable.investments].find((item: any) => item.id===investment.id)); 
                  setErrorsRounds({})
                  setInvestmentDrawer(true)
              }}
              investments={vcfirm.investments}
          />
          {investmentDrawer && <ElemInvestmentSideDrawer type={'Investors'} errorsRounds={errorsRounds} onSaveInvestmentRound={(round) => onSaveInvestmentRound(round)} investmentRoundToEdit={investmenntToEdit} isOpen={investmentDrawer} onClose={() => setInvestmentDrawer(false)} />}
          </div>
        </div>
    
    </div>
    </DashboardLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { data: vc_firms } = await runGraphQl<GetVcFirmQuery>(
		GetVcFirmDocument,
		{ slug: context.params?.investorId, current_user: 0 }
	);

	if (!vc_firms?.vc_firms[0]) {
		return {
			notFound: true,
		};
	}

	const getInvestments = vc_firms.vc_firms[0].investments.map((round) => {
		if (typeof round.investment_round === "object" && round.investment_round) {
			return round.investment_round;
		} else {
			return null;
		}
	});

	const sortByDateAscInvestments = getInvestments
		.slice()
		.sort((a, b) => {
			const distantPast = new Date("April 2, 1900 00:00:00");
			let dateA = a?.round_date ? new Date(a.round_date) : distantPast;
			let dateB = b?.round_date ? new Date(b.round_date) : distantPast;
			return dateA.getTime() - dateB.getTime();
		})
		.reverse();

	let metaTitle = null;
	if (vc_firms.vc_firms[0].name) {
		metaTitle =
			vc_firms.vc_firms[0].name + " Investor Profile & Funding - EdgeIn.io";
	}

	return {
		props: {
			metaTitle,
			vcfirm: vc_firms.vc_firms[0],
			sortByDateAscInvestments,
		},
	};
};

const investorTypeFilterValues = investorTypeChoices.map((option) => {
	return {
		title: option.id,
		value: option.id,
	//	description: option.name,
	};
});

const investorRoundFilterrValues = roundChoices.map((option) => {
	return {
		title: option.id,
		value: option.name,
	//	description: option.name,
	};
});

export default InvestorsEdit;
