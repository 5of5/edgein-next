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
  placeholder = 'e.g: Redg or redg@edgein.io',
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

        <div>
          <Combobox.Input
            className={`relative w-full px-3 py-2 mt-2 text-sm bg-dark-100 border-none rounded-full outline-none hover:bg-gray-50 focus:ring-gray-300 focus:outline-none placeholder:text-gray-400 ${
              query.length > 1 && (emailError || isDuplicatedEmail)
                ? 'ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400'
                : 'ring-1 ring-gray-300'
            }`}
            placeholder={placeholder}
            autoComplete={'off'}
            ref={inputRef}
            onChange={handleChangeQuery}
          />
          {query && !isDuplicatedEmail && !emailError && (
            <Combobox.Options className="absolute z-20 w-full mt-1 overflow-scroll bg-dark-100 border border-gray-200 rounded-md shadow-md max-h-60 scrollbar-hide">
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
                    className="flex items-center px-4 py-2 cursor-pointer gap-x-2 hover:bg-gray-50">
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
                      <div className="flex items-center justify-center flex-shrink-0 w-10 text-xl capitalize bg-neutral-900 rounded-full aspect-square">
                        {item?.name?.charAt(0)}
                      </div>
                    )}

                    <div className="flex-shrink-0 text-sm">{item?.name}</div>
                    {item?.work_email && (
                      <div
                        className="text-sm text-gray-500 truncate"
                        title={item.work_email}>
                        {item.work_email}
                      </div>
                    )}
                  </Combobox.Option>
                ))
              ) : (
                <div className="">
                  {validator.isEmail(query) &&
                    !emailError &&
                    !isDuplicatedEmail && (
                      <Combobox.Option
                        value={{
                          id: Date.now(),
                          name: query,
                          work_email: query,
                        }}
                        className="px-4 py-2 cursor-pointer text-primary-500 hover:no-underline hover:bg-gray-50">
                        Add{' '}
                        <span className="font-medium underline">{query}</span>
                      </Combobox.Option>
                    )}
                </div>
              )}
            </Combobox.Options>
          )}

          {query.length > 1 && (emailError || isDuplicatedEmail) && (
            <div className="py-2 text-sm font-medium text-rose-400">
              {emailError && emailError}
              {isDuplicatedEmail && 'Email already added'}
            </div>
          )}
          {selectedPeople.length > 0 && (
            <ul className="flex flex-wrap gap-2 mt-2">
              {selectedPeople.map((person, index) => (
                <li
                  key={index}
                  className="flex items-center gap-1 px-2 py-1 bg-neutral-900 rounded-full">
                  {person.name ? (
                    <div title={person.work_email}>{person?.name}</div>
                  ) : (
                    <div title={person.work_email}>{person?.work_email}</div>
                  )}
                  <button
                    onClick={() => handleRemove(index)}
                    className="focus:outline-none"
                    title="Remove">
                    <IconX
                      className="w-3 h-3 ml-1 cursor-pointer hover:text-primary-500"
                      title="Remove"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Combobox>
  );
};

export default ElemInviteEmails;
