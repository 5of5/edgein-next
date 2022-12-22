import { Fragment, useState } from "react";
import { Dialog, Transition, Combobox } from "@headlessui/react";
import { IconX } from "@/components/Icons";
import { ElemButton } from "../ElemButton";
import useSWR from "swr";
import { useDebounce } from "@/hooks/useDebounce";

type Props = {
  isOpen: boolean;
  groupName: string;
  onClose: () => void;
};

async function peopleFetcher(url: string, query: string) {
  const data = await fetch(`${url}?searchText=${query}`);
  return data.json();
}

const ElemInviteDialog: React.FC<Props> = ({ isOpen, groupName, onClose }) => {
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState<any>(null);

  const debouncedQuery = useDebounce(query, 700);

  const { data: searchedPeople, error } = useSWR(
    () => (debouncedQuery ? ["/api/search_people", query] : null),
    peopleFetcher
  );

  const isLoading = !error && !searchedPeople;

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
              <Dialog.Panel className="w-full max-w-xl transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-xl font-bold flex items-center justify-between">
                  <span>{`Invite people to ${groupName}`}</span>
                  <button type="button" onClick={onClose}>
                    <IconX className="w-5 h-5" />
                  </button>
                </Dialog.Title>

                <Combobox value={selectedPerson} onChange={setSelectedPerson}>
                  <div className="relative">
                    <div className="flex flex-col gap-1 mt-6">
                      <label className="font-bold text-slate-600">
                        Name or Email
                      </label>
                      <Combobox.Input
                        className="w-full mt-1 px-3 py-1.5 text-dark-500 relative bg-white rounded-md border-none outline-none ring-1 ring-slate-300 hover:ring-slate-400 focus:ring-2 focus:ring-primary-500 focus:outline-none placeholder:text-slate-400"
                        placeholder="e.g: Ashley or ashley@edgein.io"
                        autoComplete={"off"}
                        displayValue={(person: any) => person?.name ?? ""}
                        onChange={(event) => setQuery(event.target.value)}
                      />
                    </div>

                    <Combobox.Options className="absolute shadow-md z-50 bg-white border border-slate-200 w-full max-h-60 overflow-scroll">
                      {isLoading && <p>Searching...</p>}
                      {searchedPeople?.length > 0 ? (
                        searchedPeople.map((person: any) => (
                          <Combobox.Option
                            key={person.id}
                            value={person}
                            className="flex items-center gap-x-2 px-4 py-2 cursor-pointer hover:bg-gray-50"
                          >
                            <div className="w-8 h-8 aspect-square shrink-0 bg-white overflow-hidden rounded-full ">
                              <img
                                src={person.picture?.url}
                                alt={person.name}
                                className="object-contain w-full h-full rounded-full border border-gray-50"
                              />
                            </div>
                            <span>{person.name}</span>
                          </Combobox.Option>
                        ))
                      ) : (
                        <p className="text-sm text-center italic py-2">
                          Not found
                        </p>
                      )}
                    </Combobox.Options>
                  </div>
                </Combobox>

                <div className="mt-6 float-right">
                  <ElemButton
                    btn="primary"
                    disabled={!selectedPerson}
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
