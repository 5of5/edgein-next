import Modal from "react-modal";
import React, {useState} from "react";
import { ElemButton } from "../ElemButton";
import { IconFindCompanies, IconFindInvestors } from "../Icons";
import { TagInputText } from "../TagInputText";

Modal.setAppElement("#modal-root");

type Props = {
    locationTags: string[],
    industryTags: string[],
    show: boolean,
    onClose: () => void,
    onNext: (locationTags: string[], industryTags: string[]) => void,
    onBack: (locationTags: string[], industryTags: string[]) => void,
}

export default function OnBoardingStep2Modal(props: Props) {

    const [locationTags, setLocationTags] = useState(props.locationTags)
    const [industryTags, setIndustryTags] = useState(props.industryTags)
    
    const onClose = () => {
        props.onClose();
    };

    const onNext = () => {
        props.onNext(locationTags, industryTags)
    }

    const onBack = () => {
        props.onBack(locationTags, industryTags)
    }

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
                    {`Let's set up your areas of interest`}
                </h3>
                <p className="text-sm text-slate-500">Step 2 of 3</p>
                <div className="mt-4 text-slate-600 grow line-clamp-3 text-base">
                    {`This will help you discover relevant companies and investors.`}
                </div>
                <TagInputText
                    defaultTags={locationTags}
                    className="mt-8"
                    label="Location"
                    value=""
                    name="Location"
                    placeholder="e.g. Germany, San Francisco"
                    onChange={(tags) => {setLocationTags(tags)}}
                />
                 <TagInputText
                    defaultTags={industryTags}
                    className="mt-5"
                    label="Industry"
                    value=""
                    name="Industry"
                    placeholder="e.g. Native Code, NFTs, Nodes"
                    onChange={(tags) => {setIndustryTags(tags)}}
                />
                
                <div className="w-full flex justify-end mt-8">
                    <ElemButton onClick={onBack} btn="transparent" className="text-slate-600" >
                        Back
                </ElemButton>
                    <ElemButton onClick={onNext} btn="primary" >
                        Next
                </ElemButton>
                </div>

            </div>
        </Modal>
    )
}