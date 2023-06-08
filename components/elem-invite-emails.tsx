import { useState, useRef } from 'react';
import { useQuery } from 'react-query';
import { Combobox } from '@headlessui/react';
import validator from 'validator';
import { useDebounce } from '@/hooks/use-debounce';
import { ElemPhoto } from '@/components/elem-photo';
import { IconX } from '@/components/icons';
import { PlaceholderPerson } from './placeholders';

type Props = {
  label: string;
  description?: string;
  placeholder?: string;
};

const ElemInviteEmails: React.FC<Props> = ({
  label,
  description,
  placeholder,
}) => {
  const [query, setQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<Record<string, any>[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(query, 700);

  const { data: searchedPeople, isLoading } = useQuery(
    ['search-people', debouncedQuery],
    async () =>
      await fetch(`/api/search-people/?searchText=${debouncedQuery}`).then(
        res => res.json(),
      ),
  );

  const handleRemove = (id: number) => {
    setSelectedUsers(selectedUsers.filter((item: any) => item.id !== id));
  };

  const handleSelect = (values: Record<string, any>[]) => {
    setSelectedUsers(values);
    setQuery('');
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  const emailHasBeenAdded = selectedUsers.some(el => el.email === query);

  return (
    <Combobox value={selectedUsers} onChange={handleSelect} multiple>
      <div className="relative">
        <div className="flex flex-col gap-1">
          <label className="font-bold text-slate-600">{label}</label>
          {description && (
            <p className="text-sm text-slate-600">{description}</p>
          )}
          <div className="flex flex-wrap p-2 rounded-md ring-1 ring-slate-300 focus-within:ring-2 focus-within:ring-primary-500 focus-within:outline-none">
            {selectedUsers.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {selectedUsers.map(item => (
                  <li
                    key={item.id}
                    className="flex items-center gap-1 bg-slate-200 rounded-md px-2 py-1">
                    <div title={item.email && item.email}>
                      {item?.person?.name || item?.display_name}
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
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
            <Combobox.Input
              className="flex-1 px-3 py-1 text-dark-500 relative bg-white rounded-md border-none outline-none ring-0 placeholder:text-slate-400 focus:outline-none focus:ring-0"
              placeholder={placeholder || 'e.g: Ashley or ashley@edgein.io'}
              autoComplete={'off'}
              ref={inputRef}
              onChange={event => setQuery(event.target.value)}
            />
          </div>
        </div>

        {query && (
          <Combobox.Options className="absolute mt-1 shadow-md z-20 bg-white rounded-md border border-slate-200 w-full max-h-60 overflow-scroll scrollbar-hide">
            {isLoading && query != '' ? (
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
                  className="flex items-center gap-x-2 px-4 py-2 cursor-pointer hover:bg-gray-50 hover:text-primary-500">
                  {item?.person?.picture ? (
                    <ElemPhoto
                      wrapClass="w-10 h-10 aspect-square shrink-0"
                      imgClass="object-cover rounded-full border border-slate-100"
                      photo={item.person.picture}
                      placeholder="user2"
                      placeholderClass="text-slate-300"
                      imgAlt={item.person.name}
                    />
                  ) : (
                    <div className="flex flex-shrink-0 items-center justify-center aspect-square w-10 rounded-full bg-slate-200 text-dark-500 text-xl capitalize">
                      {item?.display_name?.charAt(0)}
                    </div>
                  )}

                  <div className="flex-shrink-0">
                    {item?.person?.name || item?.display_name}
                  </div>
                  {item?.email && (
                    <div
                      className="text-sm text-slate-600 truncate"
                      title={item.email}>
                      {item.email}
                    </div>
                  )}
                </Combobox.Option>
              ))
            ) : (
              <div className="text-center">
                {query != '' && (
                  <div className="px-6 py-4 text-lg font-bold">Not Found</div>
                )}

                {emailHasBeenAdded && (
                  <div className="py-2 text-red-600">Email already added</div>
                )}

                {validator.isEmail(query) && !emailHasBeenAdded && (
                  <Combobox.Option
                    value={{
                      id: null,
                      display_name: query,
                      email: query,
                    }}
                    className="py-2 cursor-pointer text-primary-500 underline hover:bg-gray-50 hover:text-dark-500">
                    Send an invitation to email address{' '}
                    <span className="font-bold">{query}</span>
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
