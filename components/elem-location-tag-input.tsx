import { FC,useState } from "react";
import { Combobox } from "@headlessui/react";
import useAddressAutocomplete from "@/hooks/use-address-autocomplete";
import { IconX } from "./icons";

type Props = {
  label?: string;
  defaultTags?: string[];
  layers?: string[];
  onChange: (data: any[]) => void;
};

const ElemLocationTagInput: FC<Props> = ({
  label,
  defaultTags = [],
  layers = [],
  onChange,
}) => {
  const { isLoading, options, onInputChange } = useAddressAutocomplete(layers);

  const [tags, setTags] = useState<any[]>(defaultTags);

  const handleChange = (value: any) => {
    setTags([...tags, value]);
    onChange([...tags, value]);
  };

  const handleRemoveTag = (index: number) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
    onChange(updatedTags);
  };

  return (
    <div className="relative">
      <Combobox value="" onChange={handleChange}>
        {label && (
          <Combobox.Label className="font-bold cursor-text">
            {label}
          </Combobox.Label>
        )}
        <Combobox.Input
          className="relative w-full appearance-none border-none text-dark-500 bg-white rounded-md mt-2 pl-3 pr-10 py-2 text-left ring-1 ring-slate-300 hover:ring-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Type a location"
          onChange={onInputChange}
        />
        <Combobox.Options className=" absolute z-50 top-20 w-full bg-white border border-dark-500/10 divide-y divide-gray-100 shadow-xl max-h-60 rounded-md overflow-auto focus:outline-none">
          {isLoading ? (
            <p className="text-sm p-2 animate-pulse">Searching location...</p>
          ) : (
            options.map((item: any) => (
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
            ))
          )}
        </Combobox.Options>
      </Combobox>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, index) => {
          return (
            <div
              key={index}
              className="bg-primary-50 inline-flex items-center gap-1 text-sm px-2 py-1 rounded-full border border-primary-500"
            >
              <span className="truncate max-w-xs text-primary-500 font-bold">
                {tag?.formattedAddress}
              </span>
              <button
                onClick={() => {
                  handleRemoveTag(index);
                }}
                className="text-primary-500 hover:opacity-70 focus:outline-none"
              >
                <IconX className="w-4 h-4" strokeWidth={3} title="close" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ElemLocationTagInput;
