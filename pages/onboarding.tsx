import { useState } from 'react';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import { Dialog } from '@headlessui/react';
import { Place } from '@aws-sdk/client-location';
import { useMutation } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { ElemButton } from '@/components/elem-button';
import { ElemLogo } from '@/components/elem-logo';
import { ElemOnboardingSegmenting } from '@/components/onboarding/elem-onboarding-segmenting';
import { ElemOnboardingLocation } from '@/components/onboarding/elem-onboarding-location';
import { ElemOnboardingTags } from '@/components/onboarding/elem-onboarding-tags';
import { ElemOnboardingSurvey } from '@/components/onboarding/elem-onboarding-survey';
import { ElemOnboardingSaveList } from '@/components/onboarding/elem-onboarding-save-list';
import { Segment } from '@/types/onboarding';
import {
  HitCompaniesProps,
  HitInvestorsProps,
  HitPeopleProps,
} from '@/components/search-modal';
import { useUser } from '@/context/user-context';
import { GENERAL_ERROR_MESSAGE, ONBOARDING_QUESTION } from '@/utils/constants';
import useToast from '@/hooks/use-toast';
import { getGeometryPlace } from '@/utils/helpers';

export default function Onboarding() {
  const router = useRouter();

  const { refreshProfile } = useUser();

  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);

  const [segment, setSegment] = useState<Segment>();

  const [exploreChoice, setExploreChoice] = useState('');

  const [locations, setLocations] = useState<Place[]>([]);

  const [tags, setTags] = useState<string[]>([]);

  const [companies, setCompanies] = useState<HitCompaniesProps['hit'][]>([]);
  const [investors, setInvestors] = useState<HitInvestorsProps['hit'][]>([]);
  const [people, setPeople] = useState<HitPeopleProps['hit'][]>([]);

  const [surveyAnswer, setSurveyAnswer] = useState<string>('');

  const { mutate: saveToList, isLoading: isLoadingSaveToList } = useMutation(
    () =>
      fetch('/api/multiple-resources-to-list/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sentiment: 'My first list',
          companyIds: [...companies.map(item => item.objectID)],
          vcFirmIds: [...investors.map(item => item.objectID)],
          peopleIds: [...people.map(item => item.objectID)],
        }),
      }),
    {
      onSuccess: async response => {
        if (response.status === 200) {
          refreshProfile();
          submitOnboarding();
        } else {
          const error = await response.json();
          toast(error.error || GENERAL_ERROR_MESSAGE, 'error');
        }
      },
    },
  );

  const { mutate: submitOnboarding, isLoading: isSubmittingOnboarding } =
    useMutation(
      () =>
        fetch('/api/add-onboarding-information/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            segment,
            exploreChoice,
            locationTags: locations.map(item => item.Label),
            locationDetails: locations.map(item => ({
              label: item.Label,
              city: item.Municipality,
              state: item.Region,
              county: item.SubRegion,
              country: item.Country,
              geometry: getGeometryPlace(item),
              categories: item.Categories,
            })),
            industryTags: tags,
            questions: [
              {
                name: ONBOARDING_QUESTION,
                answer: surveyAnswer,
              },
            ],
          }),
        }),
      {
        onSuccess: async response => {
          if (response.status === 200) {
            router.reload();
          } else {
            const error = await response.json();
            toast(error.error || GENERAL_ERROR_MESSAGE, 'error');
          }
        },
      },
    );

  const handleSkip = () => {
    if (currentStep === 4) {
      setCurrentStep(5);
    }

    if (currentStep === 5) {
      submitOnboarding();
    }
  };

  return (
    <Dialog as="div" open onClose={() => null} className="relative z-[60]">
      <div className="fixed inset-0 z-[50] min-h-0 flex flex-col items-center justify-center">
        <Dialog.Panel className="w-full h-full flex flex-col items-center mx-auto py-32 bg-white overflow-x-hidden overflow-y-auto overscroll-y-none scrollbar-hide">
          <nav
            className="fixed top-0 left-0 right-0 bg-white z-50 px-5 py-4 flex items-center justify-center border-b border-slate-200"
            aria-label="Global"
          >
            <Link href="/" passHref>
              <a className="w-auto">
                <ElemLogo mode="logo" className="h-6 w-auto" />
              </a>
            </Link>

            {currentStep >= 4 && (
              <ElemButton
                btn="white"
                className="!absolute right-5"
                loading={isLoadingSaveToList || isSubmittingOnboarding}
                onClick={handleSkip}
              >
                Skip
              </ElemButton>
            )}
          </nav>

          <h3 className="text-lg font-medium text-slate-900">
            {currentStep !== 5
              ? "Let's personalize your EdgeIn"
              : 'One last step...'}
          </h3>

          <div className="flex items-center gap-3 mt-3">
            <p className="text-slate-500 text-xs">{`Step ${currentStep} of 5`}</p>
            <ul className="flex gap-2">
              {Array.from({ length: 5 }, (_, i) => (
                <li
                  key={i}
                  className={`${
                    i + 1 === currentStep ? 'bg-primary-100' : 'bg-transparent'
                  } relative w-8 h-8 rounded-full `}
                >
                  <span
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${
                      i + 1 <= currentStep ? 'bg-primary-500' : 'bg-slate-200'
                    }`}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16 flex flex-col items-center">
            {currentStep === 1 && (
              <ElemOnboardingSegmenting
                selectedSegment={segment}
                exploreChoice={exploreChoice}
                onChangeExploreChoice={setExploreChoice}
                onChangeSegment={setSegment}
                onNext={() => {
                  setCurrentStep(2);
                }}
              />
            )}
            {currentStep === 2 && (
              <ElemOnboardingLocation
                segment={segment}
                locations={locations}
                onChangeLocations={setLocations}
                onNext={() => {
                  setCurrentStep(3);
                }}
              />
            )}
            {currentStep === 3 && (
              <ElemOnboardingTags
                tags={tags}
                onChangeTags={setTags}
                onNext={() => {
                  setCurrentStep(4);
                }}
              />
            )}
            {currentStep === 4 && (
              <ElemOnboardingSaveList
                segment={segment}
                companies={companies}
                investors={investors}
                people={people}
                onChangeCompanies={setCompanies}
                onChangeInvestors={setInvestors}
                onChangePeople={setPeople}
                onNext={() => {
                  setCurrentStep(5);
                }}
              />
            )}
            {currentStep === 5 && (
              <ElemOnboardingSurvey
                isLoading={isLoadingSaveToList || isSubmittingOnboarding}
                answer={surveyAnswer}
                onChangeAnswer={setSurveyAnswer}
                onNext={() => {
                  saveToList();
                }}
              />
            )}
          </div>
        </Dialog.Panel>
        <Toaster />
      </div>
    </Dialog>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      metaTitle: 'Onboarding - EdgeIn.io',
    },
  };
};
