import { FC, ChangeEvent, useState, ReactNode } from 'react';
import { FilterOptionKeys, FilterOptionMetadata } from '@/models/Filter';
import { ElemFilterPopup } from './elem-filter-popup';
import InputSwitch from '../input-switch';
import { DEFAULT_FILTER_TAGS_OFFSET } from '@/utils/constants';

type Props = {
  open: boolean;
  option: Extract<
    FilterOptionKeys,
    'industry' | 'fundingType' | 'investmentType' | 'eventType'
  >;
  title: string | ReactNode;
  heading?: string;
  isSelectedAll: boolean;
  choices: FilterOptionMetadata['choices'];
  tags?: string[];
  onOpenFilterPopup: (name: FilterOptionKeys) => void;
  onCloseFilterPopup: (name: FilterOptionKeys) => void;
  onClearFilterOption: (name: FilterOptionKeys) => void;
  onApplyFilter: (name: FilterOptionKeys) => void;
  onToggleSelectAllTags: (
    option: FilterOptionKeys,
    checked: boolean,
    choices: FilterOptionMetadata['choices'],
  ) => void;
  onChangeCheckbox: (
    event: ChangeEvent<HTMLInputElement>,
    option: FilterOptionKeys,
  ) => void;
};

const ElemFilterCheckboxTags: FC<Props> = ({
  open,
  option,
  title,
  heading,
  isSelectedAll,
  choices = [],
  tags,
  onOpenFilterPopup,
  onCloseFilterPopup,
  onClearFilterOption,
  onApplyFilter,
  onToggleSelectAllTags,
  onChangeCheckbox,
}) => {
  const [showAll, setShowAll] = useState(false);

  // const displayedChoices = showAll
  //   ? choices
  //   : choices.slice(0, DEFAULT_FILTER_TAGS_OFFSET);

  return (
    <ElemFilterPopup
      key={option}
      open={open}
      name={option}
      title={title}
      onOpen={onOpenFilterPopup}
      onClose={onCloseFilterPopup}
      onClear={onClearFilterOption}
      onApply={onApplyFilter}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="mb-1 text-sm font-medium">{heading}</div>
        <InputSwitch
          label="Select all"
          checked={isSelectedAll}
          onChange={v => onToggleSelectAllTags(option, v, choices)}
        />
      </div>
      <ul className="overflow-y-auto scrollbar-hide h-56 lg:h-80 [mask-image:_linear-gradient(to_top,transparent,theme(colors.white)_20%,theme(colors.white))]">
        {choices.map(choice => (
          <li
            key={choice.id}
            className={`flex items-baseline w-full text-sm text-left ${
              tags?.some(item => item === choice.id)
                ? 'font-medium'
                : 'font-normal'
            }`}
          >
            <label className="relative flex items-baseline gap-2 cursor-pointer w-full px-2 py-1.5 rounded-md hover:text-primary-500 hover:bg-slate-100">
              <input
                id={choice.id}
                name={choice.id}
                type="checkbox"
                checked={tags?.some(item => item === choice.id)}
                onChange={e => onChangeCheckbox(e, option)}
                className="w-4 h-4 translate-y-1 border rounded appearance-none border-slate-300 hover:border-slate-400 checked:bg-primary-500 checked:border-primary-500 checked:hover:bg-primary-500 focus:ring-0 focus:ring-offset-0 focus:checked:bg-primary-500"
              />
              <div className="text-gray-600 break-words">{choice.name}</div>
            </label>
          </li>
        ))}
        {/* {!showAll && (
          <li
            className="px-2 py-1.5 text-sm text-gray-600 cursor-pointer hover:font-medium"
            onClick={() => setShowAll(true)}>
            See all
          </li>
        )} */}
      </ul>
    </ElemFilterPopup>
  );
};

export default ElemFilterCheckboxTags;
