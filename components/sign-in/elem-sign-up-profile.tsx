import { FC } from 'react';
import { ElemButton } from '@/components/elem-button';
import { ElemPhoto } from '../elem-photo';
import {
  IconFacebook,
  IconGithub,
  IconGlobe,
  IconLinkedIn,
  IconTwitterX,
} from '../icons';
import { GetSignUpProfileQuery } from '@/graphql/types';
import { ElemLink } from '../elem-link';

type Props = {
  isSubmittingSignUp: boolean;
  person?: GetSignUpProfileQuery['people'][number];
  onNext: (personId?: number) => void;
};

export const ElemSignUpProfile: FC<Props> = ({
  isSubmittingSignUp,
  person,
  onNext,
}) => {
  return (
    <div className="w-full max-w-sm mx-auto">
      <h1 className="text-2xl font-medium text-center lg:text-3xl">
        Is this you?
      </h1>
      <p className="mt-4 text-xs font-normal text-center text-slate-500">
        We&apos;ve found a person on Mentibus that might be you. If you confirm,
        you&apos;ll claim this profile.
      </p>

      <div className="flex flex-col items-center px-3 py-8 mt-6 mb-8 bg-black border rounded-lg border-slate-300">
        <ElemPhoto
          photo={person?.picture}
          wrapClass="flex items-center justify-center shrink-0 w-48 h-48 rounded-full overflow-hidden"
          imgClass="object-cover w-full h-full"
          imgAlt={person?.name}
          placeholder="user"
          placeholderClass="text-gray-300 w-full h-full"
        />
        <p className="mt-6 text-base text-slate-900">{person?.name}</p>
        <ul className="flex items-center gap-2 mt-3">
          {person?.website_url && (
            <ElemLink href={person.website_url} target="_blank">
              <IconGlobe title="Website" className="w-6 h-6 text-gray-400" />
            </ElemLink>
          )}
          {person?.linkedin && (
            <ElemLink href={person.linkedin} target="_blank">
              <IconLinkedIn className="w-6 h-6 text-gray-400" />
            </ElemLink>
          )}
          {person?.twitter_url && (
            <li>
              <ElemLink href={person.twitter_url} target="_blank">
                <IconTwitterX className="w-6 h-6 text-gray-400" />
              </ElemLink>
            </li>
          )}

          {person?.github && (
            <ElemLink href={person.github} target="_blank">
              <IconGithub className="w-6 h-6 text-gray-400" />
            </ElemLink>
          )}
          {person?.facebook_url && (
            <ElemLink href={person.facebook_url} target="_blank">
              <IconFacebook className="w-6 h-6 text-gray-400" />
            </ElemLink>
          )}
        </ul>
      </div>

      <div className="flex flex-col items-center gap-5">
        <ElemButton
          className="w-full"
          size="md"
          btn="primary"
          loading={isSubmittingSignUp}
          onClick={() => onNext(person?.id)}>
          Yes, it&apos; me
        </ElemButton>
        <ElemButton
          size="sm"
          btn="default"
          loading={isSubmittingSignUp}
          onClick={() => onNext()}>
          It&apos; someone else
        </ElemButton>
      </div>
    </div>
  );
};
