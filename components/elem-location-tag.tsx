import { Place } from '@aws-sdk/client-location';
import { FC } from 'react';
import { IconX } from './icons';

type Props = {
  tags: (Place & { label?: string })[];
  isLoadingPlace?: boolean;
  handleRemoveTag?: (index: number) => void;
  styles?: string;
};

const ElemLocationTag: FC<Props> = ({
  isLoadingPlace,
  tags,
  handleRemoveTag,
  styles,
}) => {
  return (
    <ul
      className={`flex items-center justify-center flex-wrap gap-3 max-w-3xl ${
        styles ?? 'mt-5'
      }`}
    >
      {tags.map((tag, index) => (
        <li
          key={index}
          className="flex items-center gap-2 p-2 pl-3 rounded-md bg-gray-100"
        >
          <span className="truncate max-w-xs text-xs font-medium">
            {tag?.Label || tag?.label}
          </span>
          <button
            type="button"
            onClick={() => {
              handleRemoveTag?.(index);
            }}
            className="hover:opacity-70 focus:outline-none"
          >
            <IconX
              className="w-3 h-3 text-gray-600"
              strokeWidth={3}
              title="close"
            />
          </button>
        </li>
      ))}
      {isLoadingPlace && <li className="text-sm text-dark-400">Loading...</li>}
    </ul>
  );
};

export default ElemLocationTag;
