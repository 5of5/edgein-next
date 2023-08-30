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
    <nav className="flex flex-wrap gap-2 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory touch-pan-x">
      {categories.map((category, index) => {
        const selected = selectedCategory?.value === category.value;

        if (category.disabled === true) return null;

        return (
          <ElemButton
            key={index}
            onClick={() => onChangeCategory(selected ? null : category)}
            btn="gray"
            roundedFull={false}
            className={`py-2 rounded-lg ${
              selected
                ? 'border-primary-500 hover:border-primary-500 hover:bg-gray-200'
                : ''
            }`}
          >
            {category.icon && <div className="w-5 h-5">{category.icon}</div>}
            {category.title}
          </ElemButton>
        );
      })}
    </nav>
  );
};
