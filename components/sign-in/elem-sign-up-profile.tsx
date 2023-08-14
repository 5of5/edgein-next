import { FC } from 'react';
import { ElemButton } from '@/components/elem-button';
import { ElemPhoto } from '../elem-photo';
import Link from 'next/link';
import {
  IconFacebook,
  IconGithub,
  IconGlobe,
  IconLinkedIn,
  IconTwitter,
} from '../icons';
import { FindPeopleByEmailAndLinkedinQuery } from '@/graphql/types';

type Props = {
  isSubmittingSignUp: boolean;
  person?: FindPeopleByEmailAndLinkedinQuery['people'][number];
  onNext: (personId?: number) => void;
};

export const ElemSignUpProfile: FC<Props> = ({
  isSubmittingSignUp,
  person,
  onNext,
}) => {
  return (
    <div className="max-w-sm mx-auto w-full px-8 lg:px-0">
      <h1 className="mt-4 text-2xl text-center font-medium lg:text-3xl">
        Is this you?
      </h1>
      <p className="mt-4 text-xs text-center text-slate-500 font-normal">
        We&apos;ve found a person on EdgeIn that might be you. If you confirm,
        you&apos;ll claim this profile.
      </p>

      <div className="flex flex-col items-center mt-6 mb-8 px-3 py-8 bg-white border border-slate-300 rounded-lg">
        <ElemPhoto
          photo={person?.picture}
          wrapClass="flex items-center justify-center shrink-0 w-48 h-48 rounded-full overflow-hidden"
          imgClass="object-cover w-full h-full"
          imgAlt={person?.name}
          placeholder="user"
          placeholderClass="text-slate-300"
        />
        <p className="text-slate-900 text-base mt-6">{person?.name}</p>
        <ul className="flex items-center gap-2 mt-3">
          {person?.website_url && (
            <Link href={person.website_url}>
              <a target="_blank">
                <IconGlobe className="h-6 w-6 text-gray-400" />
              </a>
            </Link>
          )}
          {person?.linkedin && (
            <Link href={person.linkedin}>
              <a target="_blank">
                <IconLinkedIn className="h-6 w-6 text-gray-400" />
              </a>
            </Link>
          )}
          {person?.twitter_url && (
            <li>
              <Link href={person.twitter_url}>
                <a target="_blank">
                  <IconTwitter className="h-6 w-6 text-gray-400" />
                </a>
              </Link>
            </li>
          )}

          {person?.github && (
            <Link href={person.github}>
              <a target="_blank">
                <IconGithub className="h-6 w-6 text-gray-400" />
              </a>
            </Link>
          )}
          {person?.facebook_url && (
            <Link href={person.facebook_url}>
              <a target="_blank">
                <IconFacebook className="h-6 w-6 text-gray-400" />
              </a>
            </Link>
          )}
        </ul>
      </div>

      <div className="flex flex-col gap-5 items-center">
        <ElemButton
          className="w-full"
          size="md"
          btn="primary"
          loading={isSubmittingSignUp}
          onClick={() => onNext(person?.id)}
        >
          Yes, it&apos; me
        </ElemButton>
        <ElemButton
          size="sm"
          btn="default"
          loading={isSubmittingSignUp}
          onClick={() => onNext()}
        >
          It&apos; someone else
        </ElemButton>
      </div>
    </div>
  );
};
