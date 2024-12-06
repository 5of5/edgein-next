import React from 'react';
import { ElemTooltip } from '../elem-tooltip';
import {
  IconProps,
  IconBadgeCheckSolid,
  IconGithub,
  IconLinkedIn,
  IconChartUp,
} from '../icons';

type Props = {
  className?: string;
  mini?: boolean;
  heading?: string;
  marketVerified?: string | null;
  githubVerified?: string | null;
  linkedInVerified?: string | null;
};

export const ElemCredibility: React.FC<Props> = ({
  className,
  mini = false,
  heading,
  marketVerified = null,
  githubVerified = null,
  linkedInVerified = null,
}) => {
  if (!marketVerified && !githubVerified && !linkedInVerified) {
    return null;
  }

  const credibilityItems: { text: string; icon: React.FC<IconProps> }[] = [];

  if (marketVerified) {
    credibilityItems.push({ text: 'Market Verified', icon: IconChartUp });
  }

  if (githubVerified) {
    credibilityItems.push({ text: 'Github Verified', icon: IconGithub });
  }

  if (linkedInVerified) {
    credibilityItems.push({ text: 'LinkedIn Verified', icon: IconLinkedIn });
  }

  return (
    <section className={`rounded-lg border border-gray-300 ${className}`}>
      {heading && <h2 className="text-lg font-medium px-4 pt-2">{heading}</h2>}
      <div
        className={`grid gap-2 overflow-visible p-4 ${
          mini ? `grid-cols-${credibilityItems.length}` : 'grid-cols-3'
        }`}>
        {credibilityItems.map((item, index: number) => {
          const credibilityItem = (
            <div
              className={`${
                mini ? 'w-8 h-8' : 'w-12 h-12'
              } relative flex items-center justify-center bg-black rounded-lg border border-black/10`}>
              <IconBadgeCheckSolid
                title="Verified"
                className={`${
                  mini ? '-top-2 -right-2 h-5 w-5' : '-top-3 -right-3 h-7 w-7'
                } absolute text-green-600`}
              />
              <item.icon
                className={`${mini ? 'w-6 h-6' : 'h-8 w-8'}  text-slate-600`}
                title={item.text}
              />
            </div>
          );

          return (
            <div
              key={index}
              className={`${
                mini
                  ? ''
                  : 'pt-2 flex flex-col items-center justify-center h-full bg-black rounded-lg'
              } text-slate-600`}>
              {mini ? (
                <>
                  <ElemTooltip content={item.text}>
                    <div className="inline-block">{credibilityItem}</div>
                  </ElemTooltip>
                </>
              ) : (
                <>
                  {credibilityItem}
                  <div className="mt-2 text-center text-xs font-bold uppercase tracking-wider text-slate-600">
                    {item.text}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
