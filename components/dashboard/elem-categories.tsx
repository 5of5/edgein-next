import { FC } from 'react';
import { DashboardCategory } from '@/types/common';
import { ElemButton } from '../elem-button';

type Props = {
  categories: DashboardCategory[];
  selectedCategory: DashboardCategory | null;
  onChangeCategory: (category: DashboardCategory | null) => void;
};

export const ElemCategories: FC<Props> = ({
  categories,
  selectedCategory,
  onChangeCategory,
}) => {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap">
      {categories.map((category, index) => {
        const selected = selectedCategory?.value === category.value;

        if (category.disabled === true) return null;

        return (
          <ElemButton
            key={index}
            onClick={() => onChangeCategory(selected ? null : category)}
            btn="gray"
            roundedFull={false}
            className={`
    relative px-5 py-3 rounded-full 
    ${
      selected
        ? 'border-none bg-gradient-to-r from-red-500 via-blue-500 to-red-500'
        : 'border border-gray-600'
    }
  `}>
            {selected && (
              <div
                className="absolute inset-0 rounded-full p-[1px] bg-gradient-to-r from-blue-500 via-red-500 to-blue-500"
                aria-hidden="true">
                <div className="w-full h-full bg-gray-900 rounded-full"></div>
              </div>
            )}
            <div className="relative flex items-center">
              {category.icon && (
                <div className="w-4 h-4 shrink-0 mr-1.5">{category.icon}</div>
              )}
              {category.title}
            </div>
          </ElemButton>
        );
      })}
    </div>
  );
};
