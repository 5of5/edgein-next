import Modal from "react-modal";
import React, { FC, useEffect } from "react";
import { useState } from "react";
import { Follows_Companies, Follows_Vc_Firms, Lists } from "@/graphql/types";
import { findIndex } from "lodash";
import { User } from "@/models/User";

type Props = {
  show: boolean
  onClose: Function
  follows: any
  lists: Lists[],
  onCreateNew: (reaction: string) => (e: React.MouseEvent<HTMLButtonElement>) => void;
  user: User,
}

export const ElemCompanyListModal: FC<Props> = ({
  show,
  onClose,
  follows,
  lists,
  onCreateNew,
  user,
}) => {
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState<string>();
  const [listsData, setListsData] = useState([] as Lists[]);

  const onModalClose = () => {
    onClose();
  };

  useEffect(() => {
    if (lists)
      setListsData(lists);
  }, [lists]);

  const getName = (list: Lists) => {
    const fragments = list.name.split('-');
    return fragments[fragments.length - 1];
  };

  const isSelected = (list: any) => {
    const name = getName(list);

    return findIndex(follows, (item: any) => {
      return getName(item.list) === name;
    }) !== -1
  }

  const onCreate = (event) => {
    if (newName) {
      onCreateNew(newName)(event);
      setListsData((prev: Lists[]) => {
        return [...prev, {name: `sentiment-${user.id}-${newName}`} as Lists];
      });
    }
  }

  const onChangeHandler = () => {
    // TODO: handle uncheck
  }
 
  return (
    <Modal isOpen={show}
      contentLabel="List Modal"
      style={customStyles}
    >
      <div className="z-50 -mt-5 -ml-10 -mr-5 h-12 flex justify-between from-blue-800 via-primary-500 to-primary-400 bg-gradient-to-r">
        <h2 className="ml-10 mt-2.5 text-lg text-white font-normal">
          Save to List
        </h2>
        <button
          className="text-2xl mr-3 text-white font-thin"
          onClick={onModalClose}
        >
          x
        </button>
      </div>

      <div className="mt-2">
        <ul>
          {
            listsData?.map((item) => (
              <>
                <li className="flex flex-start h-10">
                  <input type="checkbox" defaultChecked checked={isSelected(item)} onChange={onChangeHandler}></input>
                  <h1 className="ml-2 mt-2">{getName(item)}</h1>
                </li>
                <hr className="w-78 -ml-10 -mr-5"></hr>
              </>
            ))
          }
        </ul>
      </div>

      {/* add new list */}
      {
        !showNew && <div className="mt-3">
          <button
            onClick={() => setShowNew(true)}
            className={`text-lg font-thin`}
          >
            Create New List
          </button>
        </div>
      }

      {
        showNew && (
          <div className="mt-3 ease-in duration-300 ...">
            <label className="block font-bold text-gray-500">Name</label>
            <input
              onChange={(e) => setNewName(e.target.value)}
              className="pl-4 mt-1 h-10 w-full text-dark-500 relative bg-white rounded-md border border-dark-500/10 outline-none placeholder:text-dark-400 focus:bg-white focus:outline-none`"
              type="text"
              placeholder="Enter List Name..."
              value={newName}
            ></input>
            <button
              onClick={(e) => onCreate(e)}
              className=" mt-3 float-right from-blue-800 via-primary-500 to-primary-400 bg-gradient-to-r py-2 px-5 text-white font-bold border rounded-full"
            >
              Create
            </button>
          </div>
        )}
    </Modal>
  );
};

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    opacity: 1,
    borderRadius: 20,
    minWidth: "320px",
    height: "auto",
  },
  overlay: {
    zIndex: 99,
    backgroundColor: "rgba(255, 255, 255, 0.2)"
  }
};
