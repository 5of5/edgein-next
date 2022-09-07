import { Dialog, Transition } from '@headlessui/react'
import { FC, Fragment, useState } from 'react'
import { ElemButton } from '../ElemButton'

type Props = {
  isOpen: boolean
  onCloseModal: () => void
  onDelete: (id: number) => void 
  listName: string | null
  deleteId: number
}

export const ElemDeleteListModal: FC<Props> = ({ isOpen, onCloseModal, onDelete, listName, deleteId }) => {

  const onDeleteBtn = () => {
      onDelete(deleteId)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onCloseModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white px-6 pb-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="from-blue-800 via-primary-500 to-primary-400 bg-gradient-to-r -mx-6 p-3 text-white font-bold px-4"
                >
                  Delete List
                </Dialog.Title>
                <div className="mt-2">
                  <p className='text-sm text-slate-600'>Are you sure you want to delete {listName}</p>

                  <p className='text-sm text-slate-600 mt-6'>Note: Deleting list is a permanaent action and cannot be undone.</p>
                </div>

                <div className="mt-4">
                  <ElemButton
                    onClick={onDeleteBtn}
                    roundedFull
                    btn="primary"
                    className="float-right"
                  >
                    Delete
                  </ElemButton>
                  <ElemButton
                    onClick={onCloseModal}
                    roundedFull
                    btn="white"
                    className="float-right mr-3"
                  >
                    Cancel
                  </ElemButton>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
