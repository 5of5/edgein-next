import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { InputSearch } from './InputSearch';
import { InputSelect } from './InputSelect';
import { InputText } from './InputText';
import { useGetAllPersonsQuery, People, Team_Members } from "@/graphql/types";
import { functionChoicesTM } from '@/utils/constants';

type Props = {
    isOpen: boolean;
    onClose: any;
}


export const ElemTeamSideDrawer: React.FC<Props> = ({ isOpen, onClose }) => {

    const [persons, setPersons] = useState<People[]>();
    const [personFilterValues, setPersonFilterValues] = useState([]);
    const [employee, setEmployee] = useState<Team_Members>({})

    const titleFilterValues = functionChoicesTM.map((option) => {
        return {
            title: option.name,
            value: option.id,
        };
    });

    const {
        data: personsData
    } = useGetAllPersonsQuery()

    useEffect(() => {
		if (personsData) {
            setPersons(personsData?.people);
            setPersonFilterValues(
                personsData?.people ? personsData?.people.map(x =>  {
                    return {
                        title: x.name,
                        value: x.id
                    }
                }) : []
            )
        }
    }, [personsData]);

    const setValues = (key: string, value: any) => {
        const tempData = {
            ...employee,
            [key]: value
        }
        setEmployee(tempData)
    }

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
                                            <InputSelect
                                                options={personFilterValues}
                                                value={personFilterValues && employee.person_id ? personFilterValues.find(x => x.value === employee.person_id) : {}}
                                                onChange={(e) =>  setValues('person_id', e.value)}
                                            // placeholder="Layer 1 programmable/Blockchain/Netw..."
                                                className="w-80 text-slate-600 text-base"
                                            />
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
                                            <InputSelect
                                                options={titleFilterValues}
                                                onChange={(e) =>  setValues('function', e.value)}
                                                value={titleFilterValues && employee.function ? titleFilterValues.find(x=> x.value === employee.function):{}}
                                                placeholder="Founder"
                                                className='max-w-sm placeholder:text-slate-250'
                                            />
                                        </div>

                                        <div className='mt-4'>
                                            <label className=' block  font-Metropolis text-sm font-bold text-slate-300'>Time Period</label>
                                            <input type="checkbox" checked /><span className='text-sm font-Metropolis font-normal text-slate-600 ml-2'>Current</span>
                                            <InputText
                                                name=""
                                                value={(employee.start_date) ? employee.start_date : ''}
                                                onChange={(e) => { setValues('start_date', e.target.value) }}
                                                className=" mt-2 block max-w-sm placeholder:text-slate-500"
                                            />
                                            to
                                            <InputText
                                                name=""
                                                value={(employee.end_date) ? employee.end_date : ''}
                                                onChange={(e) => { setValues('end_date', e.target.value)}}
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