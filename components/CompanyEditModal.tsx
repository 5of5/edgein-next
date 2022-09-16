import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { ElemButton } from './ElemButton';
import { ElemPhoto } from './ElemPhoto';
import { IconChevronLeft, IconChevronRight, IconX } from './Icons';
import { InputSearch } from './InputSearch';
import Select from 'react-select';

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
                                <Dialog.Panel className="w-full py-10 px-11 max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                                        {/* <InputSearch
                                        className='border-2 border-purple-50  rounded-lg placeholder:text-slate-250'
                                        placeholder='e.g Edgein'
                                        /> */}
                                        <Select
                                            defaultValue={""}
                                            isMulti
                                            options={[]}
                                            name="colors"
                                            className="basic-multi-select border-2 rounded-t-md rounded-b-md border-purple-50 placeholder:text-slate-250"
                                            classNamePrefix="select"
                                            placeholder="e.g Edgein"
                                        />
                                        <ElemButton
                                            className='float-right mt-5'
                                            btn="primary"
                                            onClick={() => setnext(true)}

                                        >Next</ElemButton>

                                    </div>

                                    {next && (
                                        <>
                                            <div className='clear-both mb-3'>
                                                <label className='text-sm font-bold font-Metropolis text-slate-300'>Search for your company</label>
                                                <div className='flex justify-between items-center'>
                                                    <div className='flex justify-start items-center'>
                                                        <ElemPhoto
                                                            photo={{ "id": "attAtWZ0GvZoH3Htr", "url": "https://dl.airtable.com/.attachments/7a766e52717adcc89b21cfde621ea132/abdfd0e7/SolriseFinance.jpg?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=af7a92ccf4154c59", "size": 4431, "type": "image/jpeg", "width": 200, "height": 200, "filename": "Solrise Finance.jpg", "thumbnails": { "full": { "url": "https://dl.airtable.com/.attachmentThumbnails/b74127d1260d940a4a8888ff0bc296de/08d24161?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=32e2c28bca27220e", "width": 3000, "height": 3000 }, "large": { "url": "https://dl.airtable.com/.attachmentThumbnails/94859f1f52eb3dc9bb537d82b3852419/d40a82c0?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=d96a486ded492ce5", "width": 200, "height": 200 }, "small": { "url": "https://dl.airtable.com/.attachmentThumbnails/dfa1bcf9842cefdae3d14bc01c58162e/d2c57666?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=2e1452e05d13f76d", "width": 36, "height": 36 } } }}
                                                            imgAlt="company-image"
                                                            wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white rounded-lg shadow-md mr-2"
                                                            imgClass="object-fit max-w-full max-h-full"

                                                        /><span className='ml-1 font-normal font-Metropolis text-lg text-dark-500'>Chia</span>
                                                    </div>
                                                    <div>
                                                        <span className='text-dark-500 h-3 w-3 cursor-pointer'>X</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='clear-both'>
                                                <label className='text-sm font-bold font-Metropolis text-slate-300'>Please provide your <IconChevronLeft className='w-3 h-3 inline-block font-bold' />company name<IconChevronRight className='w-3 h-3 inline-block font-bold' /> email address</label>
                                                <InputSearch
                                                    placeholder='e.g.name@your.company.com'
                                                    className='placeholder:text-slate-250 border rounded-lg font-normal '
                                                />
                                                <ElemButton
                                                    className='float-right mt-5'
                                                    btn="primary"
                                                    onClick={() => setfinishmodal(true)}


                                                >Next</ElemButton>
                                            </div>
                                        </>
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
