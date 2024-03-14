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
            className={`rounded-lg shrink-0 !justify-start lg:justify-center ${
              selected
                ? 'border-primary-500 hover:border-primary-500 hover:bg-gray-200'
                : ''
            }`}
          >
            {category.icon && (
              <div className="w-4 h-4 shrink-0 mr-1.5">{category.icon}</div>
            )}
            {category.title}
          </ElemButton>
        );
      })}
    </div>
  );
};
