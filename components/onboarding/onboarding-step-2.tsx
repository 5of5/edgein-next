import React, { useState, Fragment } from 'react';
import { ElemButton } from '@/components/elem-button';
import { TagInputText } from '@/components/tag-input-text';
import { TagInputSelect } from '@/components/tag-input-select';
import { Dialog, Transition } from '@headlessui/react';
import { tags } from '@/utils/constants';
import ElemLocationTagInput from '../elem-location-tag-input';

type Props = {
  selectedOption: string;
  locationTags: any[];
  industryTags: string[];
  show: boolean;
  onClose: () => void;
  onNext: (locationTags: any[], industryTags: string[]) => void;
  onBack: (locationTags: any[], industryTags: string[]) => void;
};

export default function OnboardingStep2(props: Props) {
  const [locationTags, setLocationTags] = useState(props.locationTags);
  const [industryTags, setIndustryTags] = useState(props.industryTags);

  const onNext = () => {
    props.onNext(locationTags, industryTags);
  };

  const onBack = () => {
    props.onBack(locationTags, industryTags);
  };

  const getTags = tags.filter(
    tag =>
      tag.name !== 'Layer 0' &&
      tag.name !== 'Layer 1' &&
      tag.name !== 'Layer 2' &&
      tag.name !== 'Layer 3' &&
      tag.name !== 'Layer 4' &&
      tag.name !== 'Layer 5' &&
      tag.name !== 'Layer 6',
  );

  const interestsSuggestions: string[] = [];
  getTags.forEach(item => interestsSuggestions.push(item.name));

  // const interestsSuggestionsOLD = [
  // 	"Analytics",
  // 	"API",
  // 	"Asset",
  // 	"Bitcoin",
  // 	"Blockchain",
  // 	"Centralized",
  // 	"Chain Tools",
  // 	"Crypto",
  // 	"DAO",
  // 	"D-App",
  // 	"Database",
  // 	"DeFi",
  // 	"Dev Tools",
  // 	"Ethereum",
  // 	"Exchange",
  // 	"Gaming",
  // 	"Marketplace",
  // 	"Messaging",
  // 	"Metaverse",
  // 	"NFT",
  // 	"Oracle",
  // 	"Platform",
  // 	"Storage",
  // 	"Wallet",
  // 	"Native Code",
  // 	"Nodes",
  // ];

  return (
    <>
      <Transition.Root show={props.show} as={Fragment}>
        <Dialog as="div" onClose={() => {}} className="relative z-[60]">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed z-10 inset-0 bg-black/20 transition-opacity backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 z-[50] m-6 min-h-0 flex flex-col items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="max-w-2xl w-full p-6 mx-auto rounded-lg shadow-2xl bg-white overflow-x-hidden overflow-y-auto overscroll-y-none lg:p-12">
                <h3 className="text-2xl font-bold">
                  Let&rsquo;s set up your areas of interest
                </h3>
                <p className="text-sm text-slate-500">Step 2 of 4</p>
                <div className="mt-4 text-slate-600">
                  This will help you discover relevant companies and investors.
                </div>

                <div className="mt-8">
                  <ElemLocationTagInput
                    label="Locations"
                    defaultTags={locationTags}
                    layers={['coarse']}
                    onChange={tags => {
                      setLocationTags(tags);
                    }}
                  />
                </div>

                <TagInputSelect
                  defaultTags={industryTags}
                  suggestions={interestsSuggestions}
                  className="mt-5"
                  label="Interests"
                  sublabel="Type or select"
                  value=""
                  name="Interests"
                  placeholder="e.g. DeFi, D-App, NFT, Gaming..."
                  onChange={tags => {
                    setIndustryTags(tags);
                  }}
                />
                <div className="w-full flex justify-end mt-20">
                  <ElemButton
                    onClick={onBack}
                    btn="transparent"
                    className="text-slate-600"
                  >
                    Back
                  </ElemButton>
                  <ElemButton onClick={onNext} btn="primary">
                    Next
                  </ElemButton>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
