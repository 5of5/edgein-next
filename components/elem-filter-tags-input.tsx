import { FC, ChangeEvent, useState } from 'react';
import { FilterOptionKeys } from '@/models/Filter';
import { ElemFilterPopup } from './elem-filter-popup';
import { ElemTagsInput } from './elem-tags-input';
import { InputRadio } from './input-radio';

type Props = {
  open: boolean;
  option: FilterOptionKeys;
  title: string;
  heading?: string;
  subtext?: string;
  checkedAny?: boolean;
  checkedNone?: boolean;
  tags: string[];
  placeholder?: string;
  onOpenFilterPopup: (name: FilterOptionKeys) => void;
  onCloseFilterPopup: (name: FilterOptionKeys) => void;
  onClearFilterOption: (name: FilterOptionKeys) => void;
  onApplyFilter: (name: FilterOptionKeys, tags: string[]) => void;
  onChangeCondition?: (
    event: ChangeEvent<HTMLInputElement>,
    name: string,
  ) => void;
  onChangeTags: (selectedTags: string[], name: string) => void;
};

const ElemFilterTagsInput: FC<Props> = ({
  open,
  option,
  title,
  heading,
  subtext,
  checkedAny = false,
  checkedNone = false,
  tags,
  placeholder,
  onOpenFilterPopup,
  onCloseFilterPopup,
  onClearFilterOption,
  onApplyFilter,
  onChangeCondition,
  onChangeTags,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleChangeTags = (selectedTags: string[]) => {
    onChangeTags(selectedTags, option);
    setInputValue('');
  };

  const handleApplyFilter = (name: FilterOptionKeys) => {
    const selectedTags = [...tags];
    if (inputValue) {
      selectedTags.push(inputValue);
      setInputValue('');
    }
    onApplyFilter(name, selectedTags);
  };

  return (
    <ElemFilterPopup
      key={option}
      open={open}
      name={option}
      title={title}
      onOpen={onOpenFilterPopup}
      onClose={onCloseFilterPopup}
      onClear={onClearFilterOption}
      onApply={handleApplyFilter}
    >
      <div className="font-bold text-sm">{heading}</div>
      <div className="flex flex-col gap-4 mt-2">
        <div>
          {onChangeCondition && (
            <InputRadio
              name={option}
              value="any"
              checked={checkedAny}
              label="is"
              onChange={event => onChangeCondition(event, option)}
            />
          )}

          <ElemTagsInput
            inputValue={inputValue}
            onChangeInput={handleChangeInput}
            value={tags}
            placeholder={placeholder}
            subtext={subtext}
            onChange={handleChangeTags}
          />
        </div>
        {onChangeCondition && (
          <div>
            <InputRadio
              name={option}
              value="none"
              checked={checkedNone}
              label="is not"
              onChange={event => onChangeCondition(event, option)}
              labelClass="mb-0.5"
            />
          </div>
        )}
      </div>
    </ElemFilterPopup>
  );
};

export default ElemFilterTagsInput;
