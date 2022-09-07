import Modal from "react-modal";
import React, {useState} from "react";
import { ElemButton } from "../ElemButton";
import { IconFindCompanies, IconFindInvestors } from "../Icons";

Modal.setAppElement("#modal-root");

// type Props = {
//     show: boolean,
//     onClose: () => void,
//     onNext: (selectedOption: string) => void,
//     user: object | null
// }

export default function OnBoardingStep1Modal(props) {

    const [selectedOption, setSelectedOption] = useState(props.selectedOption)

    const onClose = () => {
        props.onClose();
    };

    const onNext = () => {
        props.onNext(selectedOption)
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
                    {`Hi ${props.user && props.user.name ? props.user.name : (props.user) ? props.user.email: ''}, How will you use EdgeIn?`}
                </h3>
                <p className="text-sm text-slate-500">Step 1 of 3</p>
                <div className="mt-4 text-slate-600 grow line-clamp-3 text-base">
                    {`We'll get you set so you can start exploring`}
                </div>
                <div onClick={() => {setSelectedOption('companies')}} className={`${selectedOption==="companies" ? 'border-2 border-dark-500' : 'border border-slate-300'} flex rounded-lg my-5 p-6 font-bold text-base gap-x-3`}>
                    <IconFindCompanies className="w-8 h-8" />
                    <h2 className="self-center">Find companies</h2>
                </div>
                <div onClick={() => {setSelectedOption('investors')}} className={`${selectedOption==="investors" ? 'border-2 border-dark-500' : 'border border-slate-300'} flex rounded-lg my-5 p-6 font-bold text-base gap-x-3`}>
                    <IconFindInvestors className="w-8 h-8 mt-2"/>
                    <h2 className="self-center">Find investors</h2>
                </div>
                <div className="w-full flex justify-end">
                    <ElemButton onClick={onNext} btn="primary" >
                        Next
                </ElemButton>
                </div>

            </div>
        </Modal>
    )
}