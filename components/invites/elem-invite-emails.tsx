import { FC, useState, useRef, ChangeEvent } from 'react';
import { useQuery } from 'react-query';
import { Combobox } from '@headlessui/react';
import validator from 'validator';
import { useDebounce } from '@/hooks/use-debounce';
import { ElemPhoto } from '@/components/elem-photo';
import { IconX } from '@/components/icons';
import { PlaceholderPerson } from '../placeholders';
import { DEBOUNCE_TIME } from '@/utils/constants';
import { SelectedPeople } from './elem-invite-user';

type Props = {
  label: string;
  description?: string;
  placeholder?: string;
  selectedPeople: SelectedPeople[];
  setSelectedPeople: (values: SelectedPeople[]) => void;
};

const ElemInviteEmails: FC<Props> = ({
  label,
  description,
  placeholder,
  selectedPeople,
  setSelectedPeople,
}) => {
  const [query, setQuery] = useState('');

  const [isDuplicatedEmail, setIsDuplicatedEmail] = useState(false);

  const [emailError, setEmailError] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(query, DEBOUNCE_TIME);

  const { data: searchedPeople, isLoading } = useQuery(
    ['find-people', debouncedQuery],
    async () =>
      await fetch(
        `/api/find-people-by-email/?searchText=${debouncedQuery}`,
      ).then(res => res.json()),
    { enabled: debouncedQuery.trim().length > 0 },
  );

  const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setIsDuplicatedEmail(false);
    if (!validator.isEmail(newQuery)) {
      setEmailError('Please enter a valid email.');
    } else {
      setEmailError('');
    }
    setQuery(newQuery);
  };

  const handleRemove = (id: number) => {
    setSelectedPeople(selectedPeople.filter((_, index) => index !== id));
  };

  const handleSelect = (values: SelectedPeople[]) => {
    if (
      selectedPeople.some(
        person => person.work_email === values[values.length - 1]?.work_email,
      )
    ) {
      setIsDuplicatedEmail(true);
    } else {
      setSelectedPeople(values);
      setQuery('');

      if (inputRef.current) {
        inputRef.current.value = '';
        inputRef.current.focus();
      }
    }
  };

  return (
    <Combobox value={selectedPeople} onChange={handleSelect} multiple>
      <div className="relative">
        <label className="font-medium">{label}</label>
        {description && <p className="text-sm text-gray-500">{description}</p>}
        <div className="mt-2 flex flex-wrap gap-2 px-3 py-2 rounded-lg ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-primary-500 focus-within:outline-none">
          {selectedPeople.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {selectedPeople.map((person, index) => (
                <li
                  key={index}
                  className="flex items-center gap-1 bg-gray-100 rounded-lg px-2 py-1"
                >
                  {person.name ? (
                    <div title={person.work_email}>{person?.name}</div>
                  ) : (
                    <div title={person.work_email}>{person?.work_email}</div>
                  )}
                  <button
                    onClick={() => handleRemove(index)}
                    className="focus:outline-none"
                    title="Remove"
                  >
                    <IconX
                      className="w-3 h-3 ml-1 cursor-pointer hover:text-primary-500"
                      title="Remove"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <Combobox.Input
            className="flex-1 p-0 relative bg-white rounded-md border-none outline-none ring-0 placeholder:text-gray-300 focus:outline-none focus:ring-0"
            placeholder={placeholder || 'e.g: Ashley or ashley@edgein.io'}
            autoComplete={'off'}
            ref={inputRef}
            onChange={handleChangeQuery}
          />
        </div>

        {isDuplicatedEmail && (
          <div className="text-center py-2 mt-2 bg-red-600 rounded-md font-semibold text-sm text-white">
            Email already added
          </div>
        )}

        {emailError && (
          <div className="text-center py-2 mt-2 bg-red-600 rounded-md font-semibold text-sm text-white">
            {emailError}
          </div>
        )}

        {query && !isDuplicatedEmail && !emailError && (
          <Combobox.Options className="absolute mt-1 shadow-md z-20 bg-white rounded-md border border-gray-200 w-full max-h-60 overflow-scroll scrollbar-hide">
            {isLoading && query !== '' ? (
              <div className="px-4 py-2">
                {Array.from({ length: 3 }, (_, i) => (
                  <PlaceholderPerson key={i} />
                ))}
              </div>
            ) : searchedPeople && searchedPeople?.length > 0 ? (
              searchedPeople.map((item: any) => (
                <Combobox.Option
                  key={item.id}
                  value={item}
                  className="flex items-center gap-x-2 px-4 py-2 cursor-pointer hover:bg-gray-50"
                >
                  {item?.picture ? (
                    <ElemPhoto
                      wrapClass="w-10 h-10 aspect-square shrink-0"
                      imgClass="object-cover rounded-full border border-gray-200"
                      photo={item.picture}
                      placeholder="user"
                      placeholderClass="text-gray-300"
                      imgAlt={item.name}
                    />
                  ) : (
                    <div className="flex flex-shrink-0 items-center justify-center aspect-square w-10 rounded-full bg-gray-100 text-xl capitalize">
                      {item?.name?.charAt(0)}
                    </div>
                  )}

                  <div className="flex-shrink-0 text-sm">{item?.name}</div>
                  {item?.work_email && (
                    <div
                      className="text-sm text-gray-500 truncate"
                      title={item.work_email}
                    >
                      {item.work_email}
                    </div>
                  )}
                </Combobox.Option>
              ))
            ) : (
              <div className="text-center">
                {validator.isEmail(query) &&
                  !emailError &&
                  !isDuplicatedEmail && (
                    <Combobox.Option
                      value={{
                        id: Date.now(),
                        name: query,
                        work_email: query,
                      }}
                      className="px-4 py-2 cursor-pointer underline hover:no-underline hover:bg-gray-50"
                    >
                      Add <span className="font-medium">{query}</span>
                    </Combobox.Option>
                  )}
              </div>
            )}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
};

export default ElemInviteEmails;
