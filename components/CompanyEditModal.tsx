import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { ElemButton } from './ElemButton';
import { IconChevronLeft, IconChevronRight } from './Icons';
import { InputSearch } from './InputSearch';

type Props = {
    isOpen: boolean;
    onClose: any;
}


export const CompanyEditModal: React.FC<Props> = ({ isOpen, onClose }) => {

    const [next, setnext] = useState(false)
    const [finishmodal, setfinishmodal] = useState(false)


    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={onClose}>
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
                                    <Dialog.Title
                                        as="h3"
                                        className="text-2xl text-dark-500 font-Metropolis font-bold"
                                    >
                                        Search for the company or investment firm you work for.
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className=" font-normal font-Metropolis text-slate-300">
                                            Find your company or investment firm to verify your employment. Verifying will allow you to access features for your business.
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <label className='text-sm font-bold font-Metropolis text-slate-300'>Search for your company</label>
                                        <InputSearch
                                        />
                                        <ElemButton
                                            className='float-right mt-5'
                                            btn="primary"
                                            onClick={() => setnext(true)}

                                        >Next</ElemButton>

                                    </div>

                                    {next && (
                                        <div className='clear-both'>
                                            <label className='text-sm font-bold font-Metropolis text-slate-300'>Please provide your <IconChevronLeft className='w-3 h-3 inline-block' />company name<IconChevronRight className='w-3 h-3 inline-block' /> email address</label>
                                            <InputSearch
                                            />
                                            <ElemButton
                                                className='float-right mt-5'
                                                btn="primary"
                                                onClick={() => setfinishmodal(true)}


                                            >Next</ElemButton>
                                        </div>
                                    )}

                                    {finishmodal && (
                                        <div className='clear-both'>

                                            <Dialog.Title
                                                as="h3"
                                                className="text-2xl text-dark-500 font-Metropolis font-bold"
                                            >
                                                Verification email is on the way!
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className=" font-normal font-Metropolis text-slate-300">
                                                    If you have any questions about this process, please contact us.
                                                </p>
                                            </div>
                                            <ElemButton
                                                btn="primary"
                                                className='float-right mt-5'
                                                onClick={onClose}>
                                                Finish
                                            </ElemButton>

                                        </div>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
