import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { InputSearch } from './InputSearch';
import { InputSelect } from './InputSelect';
import { InputText } from './InputText';

type Props = {
    isOpen: boolean;
    onClose: any;
}


export const ElemInvestmentSideDrawer: React.FC<Props> = ({ isOpen, onClose }) => {

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

                    <div className="fixed right-0 top-0 w-full max-w-lg">
                        <div className="text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="p-4 bg-white min-h-screen text-left" >
                                    <div>


                                        <div className="mt-4">
                                            <label className='font-Metropolis text-sm font-bold text-slate-300'>Announced Date</label>
                                            <InputText
                                                type='text'
                                                name=""
                                                value=""
                                                onChange={() => { }}
                                                className=" max-w-sm placeholder:text-slate-500"
                                                placeholder='Year Month Day'
                                            />
                                        </div>

                                        <div className='mt-4'>
                                            <label className='font-Metropolis text-sm font-bold text-slate-300'>Investor Type</label>
                                            <div className='flex justify-start items-center'>
                                                <div className='flex items-center'>
                                                    <input type="radio" />
                                                    <label className='ml-2 text-sm font-Metropolis font-normal text-slate-300'>Angel Investor</label>
                                                </div>
                                                <div className='ml-4 flex items-center'>
                                                    <input type="radio" />
                                                    <label className='ml-2 text-sm font-Metropolis font-normal text-slate-300'>Investment Firm</label>
                                                </div>

                                            </div>
                                        </div>

                                        <div className='mt-4'>
                                            <label className=' block  font-Metropolis text-sm font-bold text-slate-300'>Angel Investor</label>
                                            <InputSearch
                                                placeholder='find angel investor'
                                                className='mt-1 max-w-sm'
                                            />
                                        </div>

                                        <div className='mt-4'>
                                            <label className=' block  font-Metropolis text-sm font-bold text-slate-300'>Round Type</label>
                                            <InputSelect
                                                options={[]}
                                                placeholder="seed"
                                                className='max-w-sm'
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <label className='block font-Metropolis text-sm font-bold text-slate-300'>Money Raised</label>
                                            <InputText
                                                type='text'
                                                name=""
                                                value=""
                                                onChange={() => { }}
                                                className=" max-w-sm placeholder:text-slate-500"
                                                placeholder='$'
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <label className='block font-Metropolis text-sm font-bold text-slate-300'>Valuation</label>
                                            <InputText
                                                type='text'
                                                name=""
                                                value=""
                                                onChange={() => { }}
                                                className=" max-w-sm placeholder:text-slate-500"
                                                placeholder='$'
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <label className='font-Metropolis text-sm font-bold text-slate-300'>Amount Invested</label>
                                            <InputText
                                                type='text'
                                                name=""
                                                value=""
                                                onChange={() => { }}
                                                className=" max-w-sm placeholder:text-slate-500"
                                                placeholder='$'
                                            />
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}