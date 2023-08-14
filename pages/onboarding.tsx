import { useState } from 'react';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import { Dialog } from '@headlessui/react';
import { ElemButton } from '@/components/elem-button';
import { ElemLogo } from '@/components/elem-logo';
import { ElemOnboardingSegmenting } from '@/components/onboarding/elem-onboarding-segmenting';
import { ElemOnboardingLocation } from '@/components/onboarding/elem-onboarding-location';
import { ElemOnboardingTags } from '@/components/onboarding/elem-onboarding-tags';
import { ElemOnboardingSurvey } from '@/components/onboarding/elem-onboarding-survey';
import { ElemOnboardingSaveList } from '@/components/onboarding/elem-onboarding-save-list';
import { Segment } from '@/types/onboarding';

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);

  const [segment, setSegment] = useState<Segment>();

  const [locations, setLocations] = useState<any[]>([]);

  const [tags, setTags] = useState<string[]>([]);

  const [companies, setCompanies] = useState<any[]>([]);
  const [investors, setInvestors] = useState<any[]>([]);
  const [people, setPeople] = useState<any[]>([]);

  const [surveyAnswers, setSurveyAnswers] = useState<string[]>([]);

  const handleSkip = () => {
    if (currentStep === 4) {
      setCurrentStep(5);
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
                answers={surveyAnswers}
                onChangeAnswers={setSurveyAnswers}
              />
            )}
          </div>
        </Dialog.Panel>
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
