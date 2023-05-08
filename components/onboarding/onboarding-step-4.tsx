import React, { useState, Fragment } from "react";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import { ElemButton } from "@/components/elem-button";
import { InputTextarea } from "../input-textarea";

type Props = {
  selectedOption: string;
  message: string;
  show: boolean;
  onClose: () => void;
  onBack: (message: string) => void;
  onNext: () => void;
};

export default function OnboardingStep4(props: Props) {
  const router = useRouter();

  const [message, setMessage] = useState(props.message);

  const onNext = () => {
    if (message.trim()) {
      fetch("/api/send-slack-onboarding-message/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
    }
    props.onNext();
    router.push(`/` + props.selectedOption);
  };

  const onBack = () => {
    props.onBack(message);
  };

  return (
    <>
      <Transition.Root show={props.show} as={Fragment}>
        <Dialog as="div" onClose={() => {}} className="relative z-[60]">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed z-10 inset-0 bg-black/20 transition-opacity backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 z-[50] m-6 min-h-0 flex flex-col items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="max-w-2xl w-full p-6 mx-auto rounded-lg shadow-2xl bg-white overflow-x-hidden overflow-y-auto overscroll-y-none lg:p-12">
                <h3 className="text-2xl font-bold">
                  Where did you hear about us?
                </h3>
                <p className="text-sm text-slate-500">Step 3 of 3</p>

                <div className="mt-8">
                  <InputTextarea
                    name="message"
                    value={message}
                    rows={4}
                    onChange={(e) => setMessage(e.target.value)}
                    className="ring-inset focus:ring-inset"
                  />
                </div>

                <div className="w-full flex justify-end mt-20">
                  <ElemButton
                    onClick={onBack}
                    btn="transparent"
                    className="text-slate-600"
                  >
                    Back
                  </ElemButton>
                  <ElemButton onClick={onNext} btn="primary">
                    Finish Setup
                  </ElemButton>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
