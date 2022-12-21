import { Fragment, ChangeEvent, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IconX } from "@/components/Icons";
import { InputText } from "@/components/InputText";
import { ElemButton } from "../ElemButton";

type Props = {
  isOpen: boolean;
  groupName: string;
  onClose: () => void;
};

const ElemInviteDialog: React.FC<Props> = ({ isOpen, groupName, onClose }) => {
  const [email, setEmail] = useState("");

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleInvite = () => {};

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-xl font-bold flex items-center justify-between">
                  <span>{`Invite people to ${groupName}`}</span>
                  <button type="button" onClick={onClose}>
                    <IconX className="w-5 h-5" />
                  </button>
                </Dialog.Title>

                <label className="mt-8 block">
                  <InputText
                    name="name"
                    type="text"
                    label="Name or Email"
                    value={email}
                    onChange={handleChangeEmail}
                    placeholder="e.g: Ashley or ashley@edgein.io"
                    className="ring-1 ring-slate-200"
                  />
                </label>

                <div className="mt-6 float-right">
                  <ElemButton
                    btn="primary"
                    disabled={!email}
                    onClick={handleInvite}
                  >
                    Invite
                  </ElemButton>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ElemInviteDialog;
