import React, { FC, useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { GetFollowsByUserQuery } from "@/graphql/types";
import { getNameFromListName } from "@/utils/reaction";
import { ElemButton } from "@/components/elem-button";
import { InputText } from "@/components/input-text";
import { IconX, IconListPlus, IconSpinner } from "@/components/icons-temp";
import { Dialog, Transition } from "@headlessui/react";
import { InputCheckbox } from "@/components/input-checkbox";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@/context/user-context";
import { find } from "lodash";

type Props = {
  text: string;
  personIds: number[];
};

type List = GetFollowsByUserQuery["list_members"][0]["list"];

export const ElemBulkSavePeople: FC<Props> = ({ text, personIds }) => {
  const router = useRouter();

  let [isOpen, setIsOpen] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const { user, listAndFollows, refreshProfile } = useUser();
  const [listName, setListName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const listData = listAndFollows
    .filter((item) => {
      const sentiment = getNameFromListName(item);
      return (
        !["hot", "like", "crap"].includes(sentiment) &&
        item.created_by_id === user?.id
      );
    })
    .sort((a, b) => (a.name < b.name ? -1 : 1));

  useEffect(() => {
    setListName(listName);
    if (listName && listName.length < 3) {
      setError("List name should have at least 3 characters.");
    } else {
      setError("");
    }
  }, [listName]);

  const { mutate: handleSaveToList, isLoading } = useMutation(
    ({ listName, action }: { listName: string; action: "add" | "remove" }) =>
      fetch("/api/bulk_save_people/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personIds,
          listName,
          action,
          pathname: router.pathname,
        }),
      }),
    {
      onSuccess: (_, { listName, action }) => {
        refreshProfile();
        toast.custom(
          (t) => (
            <div
              className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
                t.visible ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              {action === "add" ? " Added " : " Removed "}
              {action === "add" ? " to " : " from "}
              &ldquo;{getNameFromListName({ name: listName })}&rdquo; list
            </div>
          ),
          {
            duration: 3000,
            position: "top-center",
          }
        );
      },
    }
  );

  const toggleToList = async (listName: string, action: "add" | "remove") => {
    if (listName && user) {
      handleSaveToList({ listName, action });
    }
  };

  const handleCreate = async () => {
    if (error || !listName || !user) {
      return;
    } else {
      await toggleToList(`${user.id}-${listName}`, "add");
      // hide input
      setShowNew(false);
      setListName("");
    }
  };

  const isSelected = (list: List) => {
    let selected = true;
    personIds.every((personId) => {
      const personIsOnList = find(
        list?.follows_people,
        (follow) => follow?.resource_id === personId
      );
      if (!personIsOnList) {
        selected = false;
        return false;
      }
      return true;
    });

    return selected;
  };

  const onClickHandler = (
    event: React.MouseEvent<HTMLInputElement>,
    list: List,
    isSelected: boolean
  ) => {
    event.preventDefault();
    event.stopPropagation();
    toggleToList(list.name, isSelected ? "remove" : "add");
  };

  const onSaveButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpen(true);
  };

  return (
    <>
      <ElemButton
        onClick={onSaveButton}
        btn="white"
        roundedFull={true}
        className="px-2.5"
      >
        <IconListPlus className="w-5 h-5 mr-1" />
        {text}
      </ElemButton>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          onClose={() => {
            setIsOpen(false), setShowNew(false);
          }}
          className="relative z-[60]"
        >
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

          <div className="fixed inset-0 z-[50] my-0 min-h-0 flex flex-col items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative max-w-sm w-full mx-auto rounded-lg shadow-2xl my-7 bg-white overflow-x-hidden overflow-y-auto overscroll-y-none scrollbar-hide">
                <div className="absolute top-1 right-1">
                  <button
                    onClick={() => {
                      setIsOpen(false), setShowNew(false);
                    }}
                    type="button"
                    className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-black/10 focus:bg-black/20"
                  >
                    <span className="sr-only">Close</span>
                    <IconX className="h-6 w-6 text-white" />
                  </button>
                </div>
                <div className="flex items-center justify-between px-3 py-1.5 from-blue-800 via-primary-500 to-primary-400 bg-gradient-to-r">
                  <Dialog.Title className="text-lg font-bold text-white">
                    Save to List
                  </Dialog.Title>
                </div>

                {listData.length === 0 && (
                  <p className="p-3 text-slate-500 text-lg">
                    Group organizations that matter to you in a list so you can
                    compare, sort, and more.
                  </p>
                )}
                <ul className="max-h-96 overflow-y-auto scrollbar-hide divide-y divide-slate-100">
                  {listData?.map((list) => {
                    const selected = isSelected(list);

                    return (
                      <li key={list.id}>
                        <InputCheckbox
                          className="w-full hover:bg-slate-100"
                          inputClass="ml-3"
                          labelClass="grow py-3 pr-3"
                          label={getNameFromListName(list)}
                          checked={selected}
                          onClick={(e) => onClickHandler(e, list, selected)}
                        />
                      </li>
                    );
                  })}
                </ul>

                {!showNew && listData.length > 0 && (
                  <div className="flex border-t border-slate-300 p-3">
                    <div className="ml-auto">
                      <ElemButton
                        btn="primary"
                        onClick={() => setShowNew(true)}
                      >
                        <IconListPlus className="w-6 h-6 mr-1" />
                        Create new list
                      </ElemButton>
                    </div>
                  </div>
                )}

                {(showNew || listData.length === 0) && (
                  <div className="p-3 border-t border-slate-300 ease-in-out duration-300">
                    <label>
                      <InputText
                        label="Name"
                        type="text"
                        onChange={(e) => setListName(e.target.value)}
                        value={listName}
                        required={true}
                        name="name"
                        placeholder="Enter List Name..."
                        className={`${
                          error === ""
                            ? "ring-1 ring-slate-200"
                            : "ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400"
                        }`}
                      />
                      {error === "" ? null : (
                        <div className="mt-2 font-bold text-sm text-rose-400">
                          {error}
                        </div>
                      )}
                    </label>
                    <div className="flex">
                      <ElemButton
                        onClick={handleCreate}
                        className="mt-3 ml-auto"
                        disabled={listName === "" || error ? true : false}
                        roundedFull
                        btn="primary"
                      >
                        Create
                      </ElemButton>
                    </div>
                  </div>
                )}
                {isLoading && (
                  <div className="absolute top-0 left-0 w-full h-full bg-slate-200 bg-opacity-60 flex justify-center items-center">
                    <IconSpinner className="animate-spin h-8 w-8" />
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
          <Toaster />
        </Dialog>
      </Transition.Root>
    </>
  );
};
