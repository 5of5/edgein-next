import { useState, useEffect } from 'react';
import type { GetStaticProps } from 'next';
import { Dialog } from '@headlessui/react';
import { Place } from '@aws-sdk/client-location';
import { useMutation } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { ElemOnboardingSegmenting } from '@/components/onboarding/elem-onboarding-segmenting';
import { ElemOnboardingLocation } from '@/components/onboarding/elem-onboarding-location';
import { ElemOnboardingTags } from '@/components/onboarding/elem-onboarding-tags';
import { Segment } from '@/types/onboarding';
import { GENERAL_ERROR_MESSAGE } from '@/utils/constants';
import useToast from '@/hooks/use-toast';
import { ElemSignInHeader } from '@/components/sign-in/elem-sign-in-header';
import { getGeometryPlace } from '@/utils/helpers';
import { useStateParams } from '@/hooks/use-state-params';

export default function Onboarding() {
  const router = useRouter();

  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useStateParams(
    1,
    'step',
    step => step.toString(),
    step => Number(step),
  );

  const [segment, setSegment] = useState<Segment>();

  const [exploreChoices, setExploreChoices] = useState<string[]>([]);

  const [locations, setLocations] = useState<Place[]>([]);

  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    setCurrentStep(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            exploreChoices,
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
          }),
        }),
      {
        onSuccess: async response => {
          if (response.status === 200) {
            generateFirstList();
          } else {
            const error = await response.json();
            toast(error.error || GENERAL_ERROR_MESSAGE, 'error');
          }
        },
      },
    );

  const { mutate: generateFirstList, isLoading: isGenerateFirstListLoading } =
    useMutation(
      () =>
        fetch('/api/generate-first-list/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
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

  return (
    <Dialog as="div" open onClose={() => null} className="relative z-[60]">
      <div className="fixed inset-0 z-[50] min-h-0 flex flex-col items-center justify-center">
        <Dialog.Panel className="w-full h-full flex flex-col items-center mx-auto py-20 bg-white overflow-x-hidden overflow-y-auto overscroll-y-none scrollbar-hide">
          <ElemSignInHeader />

          <h3 className="text-lg font-medium text-gray-900">
            Let&apos;s personalize your EdgeIn
          </h3>

          <div className="flex items-center gap-2 mt-3">
            <p className="text-slate-500 text-[10px]">{`Step ${currentStep} of 3`}</p>
            <ul className="flex gap-1.5">
              {Array.from({ length: 3 }, (_, i) => (
                <li
                  key={i}
                  className={`${
                    i + 1 === currentStep ? 'bg-primary-100' : 'bg-transparent'
                  } relative w-5 h-5 rounded-full `}
                >
                  <span
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full ${
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
                exploreChoices={exploreChoices}
                onChangeExploreChoices={setExploreChoices}
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
                isSubmittingOnboarding={
                  isSubmittingOnboarding || isGenerateFirstListLoading
                }
                tags={tags}
                onChangeTags={setTags}
                onNext={() => {
                  submitOnboarding();
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
