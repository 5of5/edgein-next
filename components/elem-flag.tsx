import React, { FC } from 'react';
import { Flag } from 'lucide-react';
import { ElemButton } from './elem-button';
import { ElemTooltip } from './elem-tooltip';

export const ElemFlag: FC = () => {
  return (
    <>
      <ElemTooltip
        content="Report an Error"
        direction="top"
        mode="dark"
        size="md">
        <button className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-500 hover:border-gray-300">
          <Flag fill="red" />
        </button>
      </ElemTooltip>
    </>
  );
};
