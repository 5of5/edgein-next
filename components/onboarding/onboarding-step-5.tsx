import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ElemButton } from "@/components/elem-button";
import {
  FindPeopleByNameAndEmailQuery,
  useFindPeopleByNameAndEmailQuery,
} from "@/graphql/types";
import { useUser } from "@/context/user-context";
import { ElemPhoto } from "../elem-photo";
import { IconCheck } from "../icons";
import { InputText } from "../input-text";
import { ONBOARDING_QUESTION, urlPattern } from "@/utils/constants";
import { createListWithMultipleResources } from "@/utils/reaction";
import { useMutation } from "react-query";
import { useRouter } from "next/router";

type Props = {
  selectedOption: string;
  locationTags: any[];
  industryTags: string[];
  message: string;
  show: boolean;
  list: any[];
  onBack: () => void;
  onNext: () => void;
};

export default function OnboardingStep5(props: Props) {
  const { user, refreshProfile } = useUser();

  const router = useRouter();

  const [selectedPerson, setSelectedPerson] =
    useState<FindPeopleByNameAndEmailQuery["people"][0]>();

  const [linkedin, setLinkedin] = useState<string>("");

  const [linkedinError, setLinkedinError] = useState<string>("");

  const { data: people, isLoading: isLoadingPeople } =
    useFindPeopleByNameAndEmailQuery(
      { name: `%${user?.display_name}%`, email: `%${user?.email || ""}%` },
      { enabled: !!user }
    );

  const peopleList = people?.people;

  const handleChangeLinkedin = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLinkedin(value);
    if (!value || (value && urlPattern.test(value))) {
      setLinkedinError("");
    } else {
      setLinkedinError("Invalid URL");
    }
  };

  const onCreateList = async () => {
    const path =
      props.selectedOption === "companies" ? "companies" : "investors";
    const payload = {
      sentiment: "My First List",
      [props.selectedOption === "companies" ? "companies" : "vcfirms"]:
        props.list.map((item) => ({
          [props.selectedOption === "companies" ? "company" : "vcfirm"]:
            item.id,
          pathname: `/${path}/${item.slug}`,
        })),
    };
    await createListWithMultipleResources(payload);
    refreshProfile();
  };

  const { mutate: onSave, isLoading: isSubmitting } = useMutation(
    () => {
      return fetch("/api/add-onboarding-information/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedResourceType: props.selectedOption,
          locationTags: props.locationTags.map(
            (item) => item?.formattedAddress
          ),
          industryTags: props.industryTags,
          questions: [
            {
              name: ONBOARDING_QUESTION,
              answer: props.message,
            },
          ],
          selectedPerson,
          linkedin,
        }),
      });
    },
    {
      onSuccess: () => {
        props.onNext();
        router.push(`/` + props.selectedOption);
      },
    }
  );

  const onNext = () => {
    if (props.list.length > 0) {
      onCreateList();
    }
    onSave();
  };

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
                <h3 className="text-2xl font-bold">Claim your profile</h3>
                <p className="text-sm text-slate-500">Step 4 of 4</p>

                <div className="mt-8">
                  {isLoadingPeople ? (
                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
                      {Array.from({ length: 3 }, (_, i) => (
                        <div
                          key={i}
                          className="rounded-lg bg-slate-200 w-full h-20 animate-pulse"
                        />
                      ))}
                    </div>
                  ) : peopleList && peopleList.length > 0 ? (
                    <Fragment>
                      <p className="font-bold">Are you any of these people?</p>
                      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 py-4 max-h-[40vh] overflow-y-auto">
                        {peopleList.map((item) => (
                          <div
                            key={item.id}
                            className={`relative flex items-start p-1 rounded-lg transition-all hover:shadow hover:-translate-y-0.5 cursor-pointer
                        ${
                          selectedPerson?.id === item.id
                            ? " border-primary-500 border-2"
                            : "border-black/10 border"
                        }`}
                            onClick={() => setSelectedPerson(item)}
                          >
                            {selectedPerson?.id === item.id && (
                              <IconCheck className="w-5 h-5 rounded-full text-white bg-primary-500 absolute top-1/2 right-2 -translate-y-1/2" />
                            )}
                            <ElemPhoto
                              photo={item.picture}
                              wrapClass="flex items-center justify-center shrink-0 w-16 h-16 rounded-lg overflow-hidden"
                              imgClass="object-cover w-full h-full"
                              imgAlt={item.name}
                              placeholder="user"
                              placeholderClass="text-slate-300"
                            />
                            <div className="overflow-hidden px-2">
                              <h3
                                className="font-bold text-lg truncate"
                                title={item.name || ""}
                              >
                                {item.name}
                              </h3>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Fragment>
                  ) : null}

                  {!isLoadingPeople && (
                    <Fragment>
                      {peopleList && peopleList?.length > 0 ? (
                        <p className="font-bold mt-8">
                          If none, please enter your Linkedin profile URL
                        </p>
                      ) : (
                        <p className="font-bold mt-8">
                          Please enter your Linkedin profile URL
                        </p>
                      )}
                      <InputText
                        name="linkedin"
                        type="text"
                        value={linkedin}
                        onChange={handleChangeLinkedin}
                        className={
                          linkedinError === ""
                            ? "ring-1 ring-slate-200"
                            : "ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400"
                        }
                      />
                      {linkedinError === "" ? null : (
                        <div className="mt-2 font-bold text-sm text-rose-400">
                          {linkedinError}
                        </div>
                      )}
                    </Fragment>
                  )}
                </div>

                <div className="w-full flex justify-end mt-20">
                  <ElemButton
                    onClick={props.onBack}
                    btn="transparent"
                    className="text-slate-600"
                  >
                    Back
                  </ElemButton>
                  <ElemButton
                    onClick={onNext}
                    btn="primary"
                    loading={isSubmitting}
                    disabled={isSubmitting || (!selectedPerson && !linkedin)}
                  >
                    Finish Setup
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
