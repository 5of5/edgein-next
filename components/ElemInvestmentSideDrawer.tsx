import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { InputSearch } from './InputSearch';
import { InputSelect } from './InputSelect';
import { InputText } from './InputText';
import { InputDate } from './InputDate';
import { People, useGetAllPersonsQuery, Investment_Rounds, useGetAllVcFirmsQuery, Vc_Firms } from '@/graphql/types';
import { roundChoices } from '@/utils/constants';
import { ElemButton } from './ElemButton';

type Props = {
    isOpen: boolean;
    onClose: any;
    investmentRoundToEdit: Investment_Rounds | undefined;
    onSaveInvestmentRound: (round : Investment_Rounds) => void;
}


export const ElemInvestmentSideDrawer: React.FC<Props> = ({ isOpen, onClose, investmentRoundToEdit, onSaveInvestmentRound }) => {

    const [investorType, setInvestorType] = useState('investor')
    const [persons, setPersons] = useState<People[]>();
    const [vcFirms, setVCFirms] = useState<Vc_Firms[]>()
    const [personFilterValues, setPersonFilterValues] = useState([]);
    const [firmFilterValues, setFirmFilterValues] = useState([]);
    const [investmentRound, setInvestmentRound] = useState<Investment_Rounds>({})

    const roundFilterValues = roundChoices.map((option) => {
        return {
            title: option.name,
            value: option.id,
        };
    });

    useEffect(() => {
        if(investmentRoundToEdit){
            setInvestmentRound(investmentRoundToEdit)
        }
    }, [investmentRoundToEdit])

    const {
        data: personsData
    } = useGetAllPersonsQuery()

    const {
        data: vcFirmData
    } = useGetAllVcFirmsQuery()

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

    useEffect(() => {
        setVCFirms(vcFirmData?.vc_firms);
        setFirmFilterValues(
            vcFirmData?.vc_firms ? vcFirmData?.vc_firms.map(x =>  {
                return {
                    title: x.name,
                    value: x.id
                }
            }) : []
        )
    }, [vcFirmData])

    const setValues = (key: string, value: any) => {
        const tempData = {
            ...investmentRound,
            [key]: value
        }
        setInvestmentRound(tempData)
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


                                        <div className="mt-4">
                                            <label className='font-Metropolis text-sm font-bold text-slate-600'>Announced Date</label>
                                            <InputDate
                                                name=""
                                                value={(investmentRound.round_date) ? investmentRound.round_date : ''}
                                                onChange={(e) => { setValues('round_date', e.target.value) }}
                                                className=" mt-2 block max-w-sm placeholder:text-slate-500"
                                            />
                                        </div>

                                        <div className='mt-4'>
                                            <label className='font-Metropolis text-sm font-bold text-slate-600'>Investor Type</label>
                                            <div className='flex justify-start items-center'>
                                                <div className='flex items-center'>
                                                    <input type="radio" checked={investorType === 'investor'} onClick={() => {setInvestorType('investor')}}/>
                                                    <label className='ml-2 text-sm font-Metropolis font-normal text-slate-600'>Angel Investor</label>
                                                </div>
                                                <div className='ml-4 flex items-center'>
                                                    <input type="radio" checked={investorType === 'firm'} onClick={() => {setInvestorType('firm')}} />
                                                    <label className='ml-2 text-sm font-Metropolis font-normal text-slate-600'>Investment Firm</label>
                                                </div>

                                            </div>
                                        </div>

                                        <div className='mt-4'>
                                            <label className=' block  font-Metropolis text-sm font-bold text-slate-600'>Angel Investor</label>
                                            {/* <InputSearch
                                                placeholder='find angel investor'
                                                className='mt-1 max-w-sm'
                                            /> */}
                                            {
                                                (investorType === "investor") ? 
                                                <InputSelect
                                                options={personFilterValues}
                                                value={personFilterValues && (investmentRound && investmentRound.investments && investmentRound.investments.person && investmentRound.investments.person.id) ? personFilterValues.find(x => x.value === investmentRound.investments.person.id) : {}}
                                                onChange={(e) =>  setValues('person',  (persons) ? persons.find(x => x.id === e.value): {})}
                                                placeholder='find angel investor'
                                                className="w-80 text-slate-600 text-base"
                                            />
                                            :
                                            <InputSelect
                                                options={firmFilterValues}
                                                value={firmFilterValues && (investmentRound && investmentRound.person && employee.person.id) ? personFilterValues.find(x => x.value === employee.person.id) : {}}
                                                onChange={(e) =>  setValues('person',  (persons) ? persons.find(x => x.id === e.value): {})}
                                                placeholder='find investment firm'
                                                className="w-80 text-slate-600 text-base"
                                            />
                                            }
                                            
                                        </div>

                                        <div className='mt-4'>
                                            <label className=' block font-Metropolis text-sm font-bold text-slate-600'>Round Type</label>
                                            <InputSelect
                                                options={roundFilterValues}
                                                onChange={(e) =>  setValues('round', e.value)}
                                                value={roundFilterValues && investmentRound.round ? roundFilterValues.find(x=> x.value === investmentRound.round):{}}
                                                placeholder="Seed"
                                                className='max-w-sm placeholder:text-slate-300'
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <label className='block font-Metropolis text-sm font-bold text-slate-600'>Money Raised</label>
                                            <InputText
                                                type='number'
                                                name=""
                                                disabled={true}
                                                value={(investmentRound.amount) ? investmentRound.amount : 0}
                                                onChange={(e) => { setValues('amount', e.target.value)}}
                                                className=" max-w-sm placeholder:text-slate-500"
                                                placeholder='$'
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <label className='block font-Metropolis text-sm font-bold text-slate-600'>Valuation</label>
                                            <InputText
                                                type='number'
                                                name=""
                                                value={(investmentRound.valuation) ? investmentRound.valuation : 0}
                                                onChange={(e) => { setValues('valuation', e.target.value)}}
                                                className=" max-w-sm placeholder:text-slate-500"
                                                placeholder='$'
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <label className='font-Metropolis text-sm font-bold text-slate-600'>Amount Invested</label>
                                            <InputText
                                                type='number'
                                                name=""
                                                value=""//{(investmentRound.amount) ? investmentRound.amount : 0}
                                                onChange={(e) => { }}
                                                className=" max-w-sm placeholder:text-slate-500"
                                                placeholder='$'
                                            />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-5 left-5">
                                        <ElemButton onClick={() => onSaveInvestmentRound(investmentRound)} btn="ol-primary" className="">Add Investment Round</ElemButton> 
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