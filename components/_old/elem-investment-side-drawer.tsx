import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect, useMemo } from 'react';
import { InputSearch } from './input-search';
import { InputSelect } from '../input-select';
import { InputText } from '../input-text';
import { InputDate } from '../input-date';
import {
  People,
  useGetAllPersonsQuery,
  Investment_Rounds,
  useGetAllVcFirmsQuery,
  Vc_Firms,
  Investments,
} from '@/graphql/types';
import { roundChoices } from '@/utils/constants';
import { ElemButton } from '../elem-button';

type Props = {
  isOpen: boolean;
  onClose: any;
  investmentRoundToEdit: Investment_Rounds | undefined;
  onSaveInvestmentRound: (round: Investment_Rounds) => void;
  errorsRounds: any;
};

export const ElemInvestmentSideDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  investmentRoundToEdit,
  onSaveInvestmentRound,
  errorsRounds,
}) => {
  const getEmptyInvestment = () => {
    return {
      person: null,
      vc_firm: null,
      amount: 0,
    };
  };

  const emptyInvestment = useMemo(() => getEmptyInvestment(), []);

  const [persons, setPersons] = useState<People[]>();
  const [vcFirms, setVCFirms] = useState<Vc_Firms[]>();
  const [personFilterValues, setPersonFilterValues] = useState([{}]);
  const [firmFilterValues, setFirmFilterValues] = useState([{}]);
  const [investmentRound, setInvestmentRound] = useState<Investment_Rounds>(
    {} as Investment_Rounds,
  );
  const [deletedInvestments, setDeletedInvestments] = useState<Investments>(
    {} as Investments,
  );
  const [showConfirmation, setShowConfirmation] = useState(false);

  const roundFilterValues = roundChoices.map(option => {
    return {
      title: option.name,
      value: option.id,
    };
  });

  useEffect(() => {
    if (investmentRoundToEdit) {
      setInvestmentRound({
        ...investmentRoundToEdit,
        investments:
          investmentRoundToEdit && investmentRoundToEdit.investments
            ? (investmentRoundToEdit.investments as Investments[])
            : ([emptyInvestment] as any[]),
      });
    }
  }, [investmentRoundToEdit, emptyInvestment]);

  const { data: personsData } = useGetAllPersonsQuery();

  const { data: vcFirmData } = useGetAllVcFirmsQuery();

  useEffect(() => {
    if (personsData) {
      setPersons(personsData?.people as People[]);
      setPersonFilterValues(
        personsData?.people
          ? personsData?.people.map(x => {
              return {
                title: x.name,
                value: x.id,
              };
            })
          : [],
      );
    }
  }, [personsData]);

  useEffect(() => {
    setVCFirms(vcFirmData?.vc_firms as Vc_Firms[]);
    setFirmFilterValues(
      vcFirmData?.vc_firms
        ? vcFirmData?.vc_firms.map(x => {
            return {
              title: x.name,
              value: x.id,
            };
          })
        : [],
    );
  }, [vcFirmData]);

  const setValues = (key: string, value: any) => {
    const tempData = {
      ...investmentRound,
      [key]: value,
    };
    setInvestmentRound(tempData);
  };

  const onAddNew = () => {
    const tempData = {
      ...investmentRound,
      investments: investmentRound.investments
        ? [...investmentRound.investments, emptyInvestment]
        : [emptyInvestment],
    };
    setInvestmentRound(tempData as Investment_Rounds);
  };

  const onUpdateInvestment = (investment: any, position: number) => {
    const tempData = {
      ...investmentRound,
      investments: investmentRound.investments.map(
        (item: any, index: number) => {
          return index == position ? investment : item;
        },
      ),
    };

    setInvestmentRound(tempData);
  };

  const onRemove = (position: number) => {
    const tempData = {
      ...investmentRound,
    };
    if (
      tempData.investments[position].id &&
      tempData.investments[position].id !== null
    ) {
      setDeletedInvestments(tempData.investments[position] as Investments);
      setShowConfirmation(true);
    } else {
      tempData.investments.splice(position, 1);
      setInvestmentRound(tempData as Investment_Rounds);
    }
  };

  const onConfirm = async () => {
    const tempData = {
      ...investmentRound,
    };
    const position = (tempData.investments as any[]).indexOf(
      (item: any) => item.id === deletedInvestments.id,
    );
    // call delete api
    await fetch('/api/delete-investments/', {
      method: 'POST',
      body: JSON.stringify({
        investmentId: deletedInvestments.id,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    tempData.investments.splice(position, 1);
    setInvestmentRound(tempData as Investment_Rounds);
    setShowConfirmation(false);
    setDeletedInvestments({} as Investments);
  };

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
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed top-0 right-0 w-full max-w-lg">
            <div className="text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="max-h-screen min-h-screen p-4 text-left bg-dark-100">
                  <div className="max-h-screen overflow-y-auto">
                    <div className="mt-4">
                      <label className="text-sm font-bold text-slate-600">
                        Announced Date
                      </label>
                      <InputDate
                        name=""
                        value={
                          investmentRound.round_date
                            ? investmentRound.round_date
                            : ''
                        }
                        onChange={e => {
                          setValues('round_date', e.target.value);
                        }}
                        className="block max-w-sm mt-2 placeholder:text-slate-500"
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-bold text-slate-600">
                        Round Type
                      </label>
                      <InputSelect
                        options={roundFilterValues}
                        onChange={(e: any) => setValues('round', e.value)}
                        value={
                          roundFilterValues && investmentRound.round
                            ? roundFilterValues.find(
                                x => x.value === investmentRound.round,
                              )
                            : {}
                        }
                        placeholder=""
                        className="max-w-sm placeholder:text-gray-300"
                      />
                      {errorsRounds.round && (
                        <p className="mt-2 text-xs italic text-red-500">
                          {errorsRounds.round}
                        </p>
                      )}
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-bold text-slate-600">
                        Money Raised
                      </label>
                      <InputText
                        type="number"
                        name=""
                        value={
                          investmentRound.amount ? investmentRound.amount : 0
                        }
                        onChange={e => {
                          setValues('amount', e.target.value);
                        }}
                        className="max-w-sm placeholder:text-slate-500"
                        placeholder="$"
                      />
                      {errorsRounds.amount && (
                        <p className="mt-2 text-xs italic text-red-500">
                          {errorsRounds.amount}
                        </p>
                      )}
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-bold text-slate-600">
                        Valuation
                      </label>
                      <InputText
                        type="number"
                        name=""
                        value={
                          investmentRound.valuation
                            ? investmentRound.valuation
                            : 0
                        }
                        onChange={e => {
                          setValues('valuation', e.target.value);
                        }}
                        className="max-w-sm placeholder:text-slate-500"
                        placeholder="$"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="text-sm font-bold text-slate-600">
                        Investments
                      </label>
                      {investmentRound.investments &&
                        [...investmentRound.investments].map(
                          (investment, index) => (
                            <InvestmentSection
                              key={index}
                              onRemove={() => onRemove(index)}
                              vcFirms={vcFirms}
                              persons={persons}
                              onUpdateInvestment={(investment: any) =>
                                onUpdateInvestment(investment, index)
                              }
                              investment={investment}
                              personFilterValues={personFilterValues}
                              firmFilterValues={firmFilterValues}
                            />
                          ),
                        )}
                      <ElemButton
                        onClick={onAddNew}
                        btn="ol-primary"
                        className="mt-5 mb-28">
                        Add Investment
                      </ElemButton>
                    </div>
                  </div>
                  <div className="absolute bottom-5">
                    <ElemButton
                      onClick={() => onSaveInvestmentRound(investmentRound)}
                      btn="default">{`${
                      investmentRoundToEdit && investmentRoundToEdit.id
                        ? 'Edit Investment Round'
                        : 'Add Investment Round'
                    }`}</ElemButton>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
          {/* <ElemConfirmModal
            isOpen={showConfirmation}
            title="Delete investment?"
            content="Are you sure you want to delete this investment?"
            onClose={() => {
              setShowConfirmation(false);
            }}
            onDelete={onConfirm}
          /> */}
        </Dialog>
      </Transition>
    </>
  );
};

type InvestmentProps = {
  investment: any;
  personFilterValues?: any;
  firmFilterValues?: any;
  onUpdateInvestment: (investment: any) => void;
  persons: People[] | undefined;
  vcFirms: Vc_Firms[] | undefined;
  onRemove: () => void;
};

const InvestmentSection: React.FC<InvestmentProps> = ({
  investment = {},
  personFilterValues = [],
  firmFilterValues = [],
  onUpdateInvestment = (investment: any) => {},
  persons = [],
  vcFirms = [],
  onRemove = () => {},
}) => {
  const [investorType, setInvestorType] = useState('investor');
  const [currentInvestment, setCurrentInvestment] = useState(investment);

  const setValues = (key: string, value: any) => {
    const temp = {
      ...currentInvestment,
      [key]: value,
    };
    setCurrentInvestment(temp);
    onUpdateInvestment(temp);
  };

  useEffect(() => {
    setCurrentInvestment(investment);
  }, [investment]);

  return (
    <div className="p-5 pt-0 my-4 border rounded-md">
      <div className="flex justify-end w-full">
        <button onClick={onRemove}>x</button>
      </div>
      <div className="mt-0">
        <label className="text-sm font-bold text-slate-600">
          Investor Type
        </label>
        <div className="flex items-center justify-start">
          <div className="flex items-center">
            <input
              type="radio"
              checked={investorType === 'investor'}
              onClick={() => {
                setInvestorType('investor');
              }}
            />
            <label className="ml-2 text-sm font-normal text-slate-600">
              Angel Investor
            </label>
          </div>
          <div className="flex items-center ml-4">
            <input
              type="radio"
              checked={investorType === 'firm'}
              onClick={() => {
                setInvestorType('firm');
              }}
            />
            <label className="ml-2 text-sm font-normal text-slate-600">
              Investment Firm
            </label>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-bold text-slate-600">
          Angel Investor
        </label>
        {investorType === 'investor' ? (
          <InputSelect
            options={personFilterValues}
            value={
              personFilterValues &&
              currentInvestment.person &&
              currentInvestment.person.id
                ? personFilterValues.find(
                    (item: any) => item.value === currentInvestment.person.id,
                  )
                : {}
            }
            onChange={(e: any) =>
              setValues(
                'person',
                persons ? persons.find(x => x.id === e.value) : {},
              )
            }
            placeholder="find angel investor"
            className="text-base w-80 text-slate-600"
          />
        ) : (
          <InputSelect
            options={firmFilterValues}
            value={
              firmFilterValues &&
              currentInvestment.vc_firm &&
              currentInvestment.vc_firm.id
                ? firmFilterValues.find(
                    (item: any) => item.value === currentInvestment.vc_firm.id,
                  )
                : {}
            }
            onChange={(e: any) =>
              setValues(
                'vc_firm',
                vcFirms ? vcFirms.find(x => x.id === e.value) : {},
              )
            }
            placeholder="find investment firm"
            className="text-base w-80 text-slate-600"
          />
        )}
      </div>
      <div className="mt-4">
        <label className="text-sm font-bold text-slate-600">
          Amount Invested
        </label>
        <InputText
          type="number"
          name=""
          value={currentInvestment.amount ? currentInvestment.amount : 0}
          onChange={e => {
            setValues('amount', e.target.value);
          }}
          className="max-w-sm placeholder:text-slate-500"
          placeholder="$"
        />
      </div>
    </div>
  );
};
