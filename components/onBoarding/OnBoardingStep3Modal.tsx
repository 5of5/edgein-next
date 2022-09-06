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

export default function OnBoardingStep3Modal(props) {

    const [selectedOption, setSelectedOption] = useState('companies')

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
                {`We started your first list`}
                </h3>
                <p className="text-sm text-slate-500">Step 3 of 3</p>
                <div className="mt-4 text-slate-600 grow line-clamp-3 text-base">
                {`Based on your area of interest here is a list of organizations we think you might like. You can add or remove organizations by going to "My Edge List".`}
                </div>
                <div className="w-full flex justify-end mt-8">
                    <ElemButton onClick={props.onBack} btn="transparent" className="text-slate-600" >
                        Back
                    </ElemButton>
                    <ElemButton onClick={onNext} btn="primary" >
                        Finish Setup
                </ElemButton>
                </div>

            </div>
        </Modal>
    )
}