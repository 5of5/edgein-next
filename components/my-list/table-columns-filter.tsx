import { FC } from 'react';
import { Popover } from '@headlessui/react';
import { IconColumns } from '../icons';
import { ElemButton } from '../elem-button';

type Props = {
  className?: string;
  columns: Array<Object>;
  resetColumns?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const TableColumnsFilter: FC<Props> = ({
  className = '',
  columns,
  resetColumns,
}) => {
  return (
    <>
      <Popover className={`${className} relative shrink-0`}>
        <Popover.Button as="div" className="relative inline-flex ">
          <ElemButton
            btn="default"
            size="sm"
            roundedFull={false}
            className="rounded-lg"
          >
            <div className="text-left">Edit columns</div>
          </ElemButton>
        </Popover.Button>

        <Popover.Panel className="absolute z-10 bg-white shadow-lg p-3 border border-black/5 rounded-lg w-screen max-w-sm">
          <div className="font-medium text-sm mb-1">Edit columns</div>
          <ul className="grid grid-cols-2 gap-x-5 overflow-y-auto scrollbar-hide">
            {columns?.map((column: any) => {
              return column.disableHiding ? (
                ''
              ) : (
                <li
                  key={column.id}
                  className="flex items-baseline w-full text-sm text-left"
                >
                  <label className="relative flex items-center gap-2 cursor-pointer w-full px-2 py-1.5 rounded-md hover:bg-gray-100">
                    <input
                      type="checkbox"
                      {...column.getToggleHiddenProps()}
                      className="appearance-none w-4 h-4 border rounded border-gray-300 checked:bg-primary-500 checked:border-primary-500 checked:hover:bg-primary-500 focus:ring-0 focus:ring-offset-0 focus:checked:bg-primary-500"
                    />
                    <div>{column.render('Header')}</div>
                  </label>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center justify-between gap-x-4 mt-2 pt-2 border-t border-black/5">
            <button onClick={resetColumns} className="ml-auto text-sm">
              Show all
            </button>
          </div>
        </Popover.Panel>
      </Popover>
    </>
  );
};
