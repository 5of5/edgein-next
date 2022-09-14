import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { InputSearch } from './InputSearch';
import { InputSelect } from './InputSelect';
import { InputText } from './InputText';

type Props = {
    isOpen: boolean;
    onClose: any;
}


export const ElemTeamSideDrawer: React.FC<Props> = ({ isOpen, onClose }) => {

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

                                        <h2 className='font-Metropolis text-dark-500 font-bold'>Add Employee</h2>

                                        <div className="mt-4">
                                            <label className='font-Metropolis text-sm font-bold text-slate-300'>Person</label>
                                            <InputSearch className=' max-w-sm placeholder:text-slate-250'
                                                placeholder='find a person to add' />
                                        </div>

                                        <div className='mt-4'>
                                            <label className='font-Metropolis text-sm font-bold text-slate-300'>Position</label>
                                            <InputSelect
                                                options={[]}
                                                placeholder="Founder"
                                                className='max-w-sm placeholder:text-slate-250'
                                            />
                                        </div>
                                        <div className='mt-4'>
                                            <label className=' block  font-Metropolis text-sm font-bold text-slate-300'>Title</label>
                                            <InputText
                                                name=""
                                                value=""
                                                onChange={() => { }}
                                                className=" max-w-sm placeholder:text-slate-500"
                                                placeholder='Founder and CEO'
                                            />
                                        </div>

                                        <div className='mt-4'>
                                            <label className=' block  font-Metropolis text-sm font-bold text-slate-300'>Time Period</label>
                                            <input type="checkbox" checked /><span className='text-sm font-Metropolis font-normal text-slate-600 ml-2'>Current</span>
                                            <InputText
                                                name=""
                                                value=""
                                                onChange={() => { }}
                                                className=" mt-2 block max-w-sm placeholder:text-slate-500"
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