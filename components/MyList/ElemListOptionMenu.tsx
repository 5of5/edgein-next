import { Menu, Transition } from "@headlessui/react";
import { FC, Fragment, MouseEvent } from "react";
import { ElemButton } from "../ElemButton";
import { IconThreeDots } from "./IconThreeDots";

type Props = {
  onUpdateBtn: (event: MouseEvent<HTMLButtonElement>) => void
  onDeleteBtn: (event: MouseEvent<HTMLButtonElement>) => void
}

export const ElemListOptionMenu: FC<Props> = ({
  onUpdateBtn,
  onDeleteBtn,
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button as="div">
          <ElemButton btn="transparent" className="px-2 font-medium group">
            <IconThreeDots />
          </ElemButton>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="nav"
          className="absolute overflow-hidden right-0 mt-2 w-56 origin-top-right divide-y divide-slate-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={onUpdateBtn}
                className={`${active ? "bg-gray-50" : ""
                  } hover:text-primary-500 flex w-full items-center font-medium px-2 py-2`}
              >
                Update Name
              </button>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                onClick={onDeleteBtn}
                className={`${active ? "bg-gray-50" : ""
                  } hover:text-primary-500 flex w-full items-center font-medium px-2 py-2`}
              >
               Delete List
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}