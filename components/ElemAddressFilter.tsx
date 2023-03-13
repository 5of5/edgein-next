import { useState, useEffect, FC } from "react";
import { Combobox } from "@headlessui/react";
import { useDebounce } from "@/hooks/useDebounce";

type Props = {
  value: any;
  onChange: (data: any) => void;
};

const ElemAddressFilter: FC<Props> = ({ value, onChange }) => {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<any>([]);

  const debouncedQuery = useDebounce(query, 700);

  const onSearchAddress = async (keyword: string) => {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_RADAR_URL
      }/v1/search/autocomplete?query=${encodeURIComponent(keyword)}`,
      {
        method: "GET",
        headers: {
          Authorization: process.env.NEXT_PUBLIC_RADAR_PUBLIC_KEY || "",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setOptions(data?.addresses || []);
  };

  useEffect(() => {
    if (debouncedQuery === "") {
      setOptions(query ? [query] : []);
      return undefined;
    }

    onSearchAddress(debouncedQuery);
  }, [debouncedQuery, query]);

  return (
    <div className="relative">
      <Combobox value={value} onChange={onChange}>
        <Combobox.Input
          className="relative w-full appearance-none border-none text-dark-500 bg-white rounded-md pl-3 pr-10 py-1.5 text-left ring-1 ring-slate-300 hover:ring-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          displayValue={(value: any) => value?.formattedAddress}
          placeholder="Enter an address"
          onChange={(event) => setQuery(event.target.value)}
        />
        <Combobox.Options className=" absolute z-50 top-10 w-full bg-white border border-dark-500/10 divide-y divide-gray-100 shadow-xl max-h-60 rounded-md overflow-auto focus:outline-none">
          {options.map((item: any) => (
            <Combobox.Option
              className={({ active }) =>
                `${
                  active ? "text-primary-500 bg-primary-100" : "text-dark-500"
                }  select-none relative py-2 pl-3 pr-4 cursor-pointer`
              }
              key={item.formattedAddress}
              value={item}
            >
              {item.formattedAddress}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

export default ElemAddressFilter;
