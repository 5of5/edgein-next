import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { InputSearch } from './InputSearch';
import { InputSelect } from './InputSelect';
import { InputText } from './InputText';
import { InputDate } from './InputDate';
import { People, useGetAllPersonsQuery, Investment_Rounds, useGetAllVcFirmsQuery, Vc_Firms, Investments } from '@/graphql/types';
import { roundChoices } from '@/utils/constants';
import { ElemButton } from './ElemButton';

type Props = {
    isOpen: boolean;
    onClose: any;
    investmentRoundToEdit: Investment_Rounds | undefined;
    onSaveInvestmentRound: (round: Investment_Rounds) => void;
}


export const ElemInvestmentSideDrawer: React.FC<Props> = ({ isOpen, onClose, investmentRoundToEdit, onSaveInvestmentRound }) => {

   
    const [persons, setPersons] = useState<People[]>();
    const [vcFirms, setVCFirms] = useState<Vc_Firms[]>()
    const [personFilterValues, setPersonFilterValues] = useState([{}]);
    const [firmFilterValues, setFirmFilterValues] = useState([{}]);
    const [investmentRound, setInvestmentRound] = useState<Investment_Rounds>({} as Investment_Rounds)

    const emptyInvestment = {
        id:null,
        person:null,
        vc_firm: null,
        amount:0
    }

    const roundFilterValues = roundChoices.map((option) => {
        return {
            title: option.name,
            value: option.id,
        };
    });

    useEffect(() => {
        if (investmentRoundToEdit) {
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
            setPersons(personsData?.people as People[]);
            setPersonFilterValues(
                personsData?.people ? personsData?.people.map(x => {
                    return {
                        title: x.name,
                        value: x.id
                    }
                }) : []
            )
        }
    }, [personsData]);

    useEffect(() => {
        setVCFirms(vcFirmData ?.vc_firms as Vc_Firms[]);
        setFirmFilterValues(
            vcFirmData ?.vc_firms ? vcFirmData ?.vc_firms.map(x => {
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

    const onAddNew = () => {
        const tempData = {
            ...investmentRound,
            investments : (investmentRound.investments)  ? [...investmentRound.investments, emptyInvestment] : [emptyInvestment]
        }
        setInvestmentRound(tempData as Investment_Rounds)
    }

    const onUpdateInvestment = (investment: any, position: number) => {
        const tempData = {
            ...investmentRound,
            investments : investmentRound.investments.map((item: any, index: number) => {
                return (index == position) ? investment : item
            })
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
                                <Dialog.Panel className="p-4 bg-white min-h-screen max-h-screen text-left" >
                                    <div className="overflow-y-scroll max-h-screen">
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
                                            <label className=' block font-Metropolis text-sm font-bold text-slate-600'>Round Type</label>
                                            <InputSelect
                                                options={roundFilterValues}
                                                onChange={(e: any) => setValues('round', e.value)}
                                                value={roundFilterValues && investmentRound.round ? roundFilterValues.find(x => x.value === investmentRound.round) : {}}
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
                                                onChange={(e) => { setValues('amount', e.target.value) }}
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
                                                onChange={(e) => { setValues('valuation', e.target.value) }}
                                                className=" max-w-sm placeholder:text-slate-500"
                                                placeholder='$'
                                            />
                                        </div>
                                        {
                                            (investmentRound.investments) && investmentRound.investments.map((investment, index) =>  
                                                <InvestmentSection key={index} vcFirms={vcFirms} persons={persons} onUpdateInvestment={(investment: any) => onUpdateInvestment(investment, index)} investment={investment} personFilterValues={personFilterValues} firmFilterValues={firmFilterValues}/>
                                            )
                                        }
                                        <ElemButton onClick={onAddNew} btn="ol-primary" className="mt-5 mb-28">Add Investment</ElemButton>
                                   
                                    </div>
                                    <div className="absolute bottom-5">
                                        <ElemButton onClick={() => onSaveInvestmentRound(investmentRound)} btn="white" className="bg-white">Add Investment Round</ElemButton>
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

type InvestmentProps = {
	investment: any;
	personFilterValues?: any;
    firmFilterValues?: any;
    onUpdateInvestment: (investment: any) => void;
    persons: People[] | undefined;
    vcFirms: Vc_Firms[] | undefined;
};


const InvestmentSection: React.FC<InvestmentProps> = ({
    investment={},
    personFilterValues= [], 
    firmFilterValues= [], 
    onUpdateInvestment= (investment: any) => {}, 
    persons= [], 
    vcFirms= []
}) => {

    const [investorType, setInvestorType] = useState('investor')
    const [currentInvestment, setCurrentInnvestment] = useState(investment)

    const setValues = (key: string, value: any) => {
        const temp = {
            ...currentInvestment,
            [key]: value
        }
        setCurrentInnvestment(temp)
        onUpdateInvestment(temp)
    }

    return (
        <div>
            <div className='mt-4'>
                <label className='font-Metropolis text-sm font-bold text-slate-600'>Investor Type</label>
                <div className='flex justify-start items-center'>
                    <div className='flex items-center'>
                        <input type="radio" checked={investorType === 'investor'} onClick={() => { setInvestorType('investor') }} />
                        <label className='ml-2 text-sm font-Metropolis font-normal text-slate-600'>Angel Investor</label>
                    </div>
                    <div className='ml-4 flex items-center'>
                        <input type="radio" checked={investorType === 'firm'} onClick={() => { setInvestorType('firm') }} />
                        <label className='ml-2 text-sm font-Metropolis font-normal text-slate-600'>Investment Firm</label>
                    </div>

                </div>
            </div>

            <div className='mt-4'>
                <label className=' block  font-Metropolis text-sm font-bold text-slate-600'>Angel Investor</label>
                {
                    (investorType === "investor") ?
                        <InputSelect
                            options={personFilterValues}
                            value={personFilterValues && (currentInvestment.person && currentInvestment.person.id) ? personFilterValues.find((item: any) => item.value === currentInvestment.person.id) : {}}
                            onChange= {(e: any) => setValues('person', (persons) ? persons.find(x => x.id === e.value) : {})}
                            placeholder='find angel investor'
                            className="w-80 text-slate-600 text-base"
                        />
                        :
                        <InputSelect
                            options={firmFilterValues}
                            value={firmFilterValues && (currentInvestment.vc_firm && currentInvestment.vc_firm.id) ? firmFilterValues.find((item: any) => item.value === currentInvestment.vc_firm.id) : {}}
                            onChange={(e: any) => setValues('vc_firm', (vcFirms) ? vcFirms.find(x => x.id === e.value) : {})}
                            placeholder='find investment firm'
                            className="w-80 text-slate-600 text-base"
                        />
                }

            </div>
            <div className="mt-4">
                <label className='font-Metropolis text-sm font-bold text-slate-600'>Amount Invested</label>
                <InputText
                    type='number'
                    name=""
                    value={(currentInvestment.amount) ? currentInvestment.amount : 0}
                    onChange={(e) => { setValues('amount', e.target.value)}}
                    className=" max-w-sm placeholder:text-slate-500"
                    placeholder='$'
                />
            </div>

        </div>
    )
}