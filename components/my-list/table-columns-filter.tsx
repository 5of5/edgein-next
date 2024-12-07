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
      <Popover className={`${className} relative shrink-0 z-20`}>
        <Popover.Button as="div" className="relative inline-flex">
          <ElemButton btn="default" size="sm" roundedFull>
            <div className="text-left">Edit columns</div>
          </ElemButton>
        </Popover.Button>

        <Popover.Panel className="absolute z-10 w-[calc(100vw-4rem)] max-w-sm p-3 bg-black border rounded-lg shadow-lg border-black/5">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-b-gray-200">
            <div className="text-sm font-medium">Edit columns</div>
            <button onClick={resetColumns} className="text-sm">
              Reset
            </button>
          </div>

          <ul className="grid grid-cols-2 overflow-y-auto gap-x-5 scrollbar-hide">
            {columns?.map((column: any) => {
              return column.disableHiding ? (
                ''
              ) : (
                <li
                  key={column.id}
                  className="flex items-baseline w-full text-sm text-left">
                  <label className="relative flex items-start gap-2 cursor-pointer w-full px-2 py-1.5 rounded-md hover:bg-neutral-900">
                    <input
                      type="checkbox"
                      {...column.getToggleHiddenProps()}
                      className="mt-0.5 w-4 h-4 border border-gray-300 rounded appearance-none checked:bg-primary-500 checked:border-primary-500 checked:hover:bg-primary-500 focus:ring-0 focus:ring-offset-0 focus:checked:bg-primary-500"
                    />
                    <div>{column.render('Header')}</div>
                  </label>
                </li>
              );
            })}
          </ul>
          {/* <div className="flex items-center justify-between pt-2 mt-2 border-t gap-x-4 border-black/5">
            <button onClick={resetColumns} className="ml-auto text-sm">
              Show all
            </button>
          </div> */}
        </Popover.Panel>
      </Popover>
    </>
  );
};
