import React from 'react';
import { ElemTooltip } from '../elem-tooltip';
import { CheckCircle, TrendingUp, Github, Linkedin } from 'lucide-react';
import { LucideIconWrapper } from '@/components/icons-wrapper';
import { IconProps } from '@/components/icons';

// Wrap Lucide icons to match our IconProps interface
const WrappedCheckCircle = LucideIconWrapper(CheckCircle);
const WrappedTrendingUp = LucideIconWrapper(TrendingUp);
const WrappedGithub = LucideIconWrapper(Github);
const WrappedLinkedin = LucideIconWrapper(Linkedin);

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
    credibilityItems.push({ text: 'Market Verified', icon: WrappedTrendingUp });
  }

  if (githubVerified) {
    credibilityItems.push({ text: 'Github Verified', icon: WrappedGithub });
  }

  if (linkedInVerified) {
    credibilityItems.push({ text: 'LinkedIn Verified', icon: WrappedLinkedin });
  }

  return (
    <section className={`rounded-lg border border-gray-700 ${className}`}>
      {heading && (
        <h2 className="text-lg font-medium px-4 pt-2 text-white">{heading}</h2>
      )}
      <div className="p-4">
        <div className="flex flex-wrap gap-4">
          {credibilityItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="relative">
                <div className="p-2 rounded-lg border border-neutral-800">
                  <item.icon
                    className="h-6 w-6 text-neutral-300"
                    title={item.text}
                    strokeWidth={1.5}
                  />
                </div>
                <WrappedCheckCircle
                  className="absolute -top-2 -right-2 h-5 w-5 text-green-400 fill-green-400 stroke-black"
                  strokeWidth={1.5}
                />
              </div>
              {!mini && (
                <span className="text-sm font-medium text-neutral-300">
                  {item.text}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
