import React, { useState, FC } from 'react';
import { IconCompanies, IconCash } from '@/components/icons';

type Props = {
  selectedOption: string;
  organization: any;
};

const ElemOrganizationItem: FC<Props> = ({ selectedOption, organization }) => {
  const [showIcon, setShowIcon] = useState<boolean>(false);

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center justify-center shrink-0 w-10 h-10 p-1 rounded shadow">
        {!organization?.logo?.url || showIcon ? (
          selectedOption === 'companies' ? (
            <IconCompanies className="w-6 h-6" />
          ) : (
            <IconCash className="w-6 h-6" />
          )
        ) : (
          <img
            className="object-contain max-w-full max-h-full"
            src={organization.logo.url}
            alt={organization.name}
            onError={e => {
              setShowIcon(true);
              (e.target as HTMLImageElement).onerror = null; // prevents looping
            }}
          />
        )}
      </div>
      <h1 className="font-bold truncate">{organization.name}</h1>
    </div>
  );
};

export default ElemOrganizationItem;
