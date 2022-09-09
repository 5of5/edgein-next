import Modal from "react-modal";
import React, { useState, useEffect } from "react";
import { ElemButton } from "../ElemButton";
import { IconFindCompanies, IconFindInvestors } from "../Icons";
import { DeepPartial } from "../Company/ElemCohort";
import { Companies_Bool_Exp, Vc_Firms_Bool_Exp, useGetRelevantCompaniesQuery, useGetRelevantVcFirmsQuery } from "@/graphql/types";
import {
    createListWithMultipleResourses,
} from "@/utils/reaction";

Modal.setAppElement("#modal-root");

type Props = {
    selectedOption: string,
    locationTags: string[],
    industryTags: string[],
    show: boolean,
    onClose: () => void,
    onNext: () => void,
    onBack: () => void,
    user: {
        display_name?:string,
        email?: string,
        id:number,
        role:string
    } | null
}

export default function OnBoardingStep3Modal(props: Props) {

    const [list, setList] = useState<any[]>([])
    const [locationTags, setLocationTags] = useState<string[]>([])
    const [industryTags, setIndustryTags] =  useState<string[]>([])

    const onClose = () => {
        props.onClose();
    };

    const handleCreateList = async() => {
            const path = props.selectedOption === "companies"? "companies" : "investors"
            const payload = {
                sentiment : "My Edge List",
                [props.selectedOption === "companies"? "companies" : "vcfirms"] : list.map((item) => ({
                    [props.selectedOption === "companies"? "company" : "vcfirm"] : item.id,
                    pathname : `/${path}/${item.slug}`
                }))
            }
            const newSentiment = await createListWithMultipleResourses(payload);
            props.onClose();
		};

    const onFinishSetup = () => {
       // props.onClose();
       handleCreateList()
    }

    const filtersCompanies: DeepPartial<Companies_Bool_Exp> = {
        _or: [
            ...locationTags.map(tag => ({
                location: { _ilike: tag }
            })),
            ...industryTags.map(tag => ({
                tags: { _contains: tag }
            }))
        ]
    }

    const filterVCFirms: DeepPartial<Vc_Firms_Bool_Exp> = {
        _or: [
            ...locationTags.map(tag => ({
                location: { _ilike: tag }
            })),
            ...industryTags.map(tag => ({
                tags: { _contains: tag }
            }))
        ]
    }

    const {
        data: companiesData,
        // error,
        isLoading: loadingCompany,
    } = useGetRelevantCompaniesQuery({
        where: filtersCompanies as Companies_Bool_Exp,
        current_user: props.user?.id ?? 0,
    });

    const {
        data: vcFirmsData,
        // error,
        isLoading: loadingVCFirm,
    } = useGetRelevantVcFirmsQuery({
        where: filterVCFirms as Vc_Firms_Bool_Exp,
       current_user: props.user?.id ?? 0,
    });

    useEffect(() => {
        setLocationTags(props.locationTags)
        setIndustryTags(props.industryTags)
    }, [props])

    useEffect(() => {

        if (props.selectedOption === "companies") {
            setList(companiesData ? companiesData.companies : [])
        } else {
            setList(vcFirmsData ? vcFirmsData.vc_firms : [])
        }
    }, [companiesData, vcFirmsData, props.selectedOption])

    return (
        <Modal
            isOpen={props.show}
            //onAfterOpen={onAfterOpen}
            onRequestClose={onClose}
            shouldCloseOnOverlayClick={true}
            overlayClassName="fixed top-0 left-0 z-[50] flex flex-col h-screen w-screen p-6 cursor-auto bg-black/20 backdrop-blur-sm"
            className={`${
                props.show && "animate-fade-in-up"
                } max-w-3xl w-full mx-auto my-0 min-h-0 flex flex-col rounded-lg shadow-2xl bg-white overflow-y-scroll overflow-x-hidden focus:outline-none focus:ring-0`}
            contentLabel="Search EdgeIn"
        >
            <div className="p-10">
                <h3 className="inline min-w-0 text-2xl font-bold break-words align-middle line-clamp-2 sm:text-lg md:text-xl xl:text-2xl">
                    {`We started your first list`}
                </h3>
                <p className="text-sm text-slate-500">Step 3 of 3</p>
                <div className="mt-4 text-slate-600 grow line-clamp-3 text-base">
                    {`Based on your area of interest here is a list of organizations we think you might like. You can add or remove organizations by going to "My Edge List".`}
                </div>
                <div className="w-full flex flex-wrap my-5 grid grid-cols-3 gap-5">
                    {
                        list.length > 0 && list.map((item, index) => {
                            return (
                                <div key={index} className="flex flex-wrap items-center gap-x-2">
                                    <div className="flex items-center justify-center shrink-0 w-12 h-12 p-1 bg-white rounded border-slate-200 shadow-lg">
                                        <img
                                            className="object-contain max-w-full max-h-full"
                                            src={(item.logo) ? item.logo.url : ''}
                                            alt={""}
                                        />
                                    </div>
                                    <h1 className="text-lg text-dark-500 font-bold">
                                        {item.name}
                                    </h1>
                                </div>

                            )
                        })
                    }
                </div>


                <div className="w-full flex justify-end mt-8">
                    <ElemButton onClick={props.onBack} btn="transparent" className="text-slate-600" >
                        Back
                    </ElemButton>
                    <ElemButton onClick={onFinishSetup} btn="primary" >
                        Finish Setup
                </ElemButton>
                </div>

            </div>
        </Modal>
    )
}