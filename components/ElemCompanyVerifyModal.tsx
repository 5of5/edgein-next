import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { ElemButton } from './ElemButton'
import { ElemPhoto } from './ElemPhoto'
import { IconX } from './Icons'
import { InputText } from './InputText'
import Select from 'react-select'
import { validateCompanyEmail } from '@/utils'
import extractDomain from "extract-domain"

type Props = {
  isOpen: boolean
  onClose: (e: any) => void
  dropdown?: any[]
  personId?: number
}

export const ElemCompanyVerifyModal: React.FC<Props> = ({ isOpen, onClose, dropdown, personId }) => {

  const [isCompanySelected, setIsCompanySelected] = useState(false)
  const [isEmailEntered, setIsEmailEntered] = useState(false)
  const [finish, setFinish] = useState(false)

  const [selectedCompany, setSelectedCompany] = useState<any>()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const onFinishOrCancel = () => {
    onClose(false)
    setIsCompanySelected(false)
    setIsEmailEntered(false)
    setFinish(false)
  }

  const gotoNext = (step: 'company' | 'email' | 'finish') => async () => {
    if (step === 'company') {
      if (!selectedCompany) setError('Please select company')
      else {
        setIsCompanySelected(true)
        setError('')
      }
      return
    }

    if (step === 'email') {
      if (!email) setError('Please enter email')
      else if (!validateCompanyEmail([extractDomain(selectedCompany.website)], email))
        setError('Please enter valid company email')
      else {
        await sendVerificationMail()
        setIsEmailEntered(true)
        setError('')
      }
      return
    }

    if (step === 'finish') {
      if (!email) setError('Please enter email')
      else {
        setError('')
        onFinishOrCancel()
      }
      return
    }
  }

  const sendVerificationMail = async () => {
    await fetch('/api/send_resource_verification_mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        resource: {
          companyName: selectedCompany.label,
          resourceId: selectedCompany.value,
          type: selectedCompany.type,
        },
        email,
        personId,
      })
    })
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {!isEmailEntered ?
                    <>
                      <Dialog.Title
                        as="h3"
                        className="text-2xl text-dark-500 font-Metropolis font-bold"
                      >
                        Search for the company or investment firm you work for.
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-md font-normal font-Metropolis text-slate-600">
                          Find your company or investment firm to verify your employment. Verifying will allow you to access features for your business.
                        </p>
                      </div>
                    </>
                    :
                    <Dialog.Title
                      as="h3"
                      className="text-2xl text-dark-500 font-Metropolis font-bold"
                    >
                      Verification email is on the way!
                    </Dialog.Title>
                  }



                  <div className="mt-6">
                    {!isEmailEntered && <label className='text-sm font-bold font-Metropolis text-slate-600'>Search for your company</label>}
                    {
                      !isCompanySelected ?
                        <>
                          <Select
                            isClearable
                            options={dropdown}
                            onChange={(value: any) => setSelectedCompany(value)}
                            name="colors"
                            className="basic-multi-select border-2 rounded-t-md rounded-b-md border-primary-500 placeholder:text-slate-250"
                            classNamePrefix="select"
                            placeholder="e.g Edgein"
                          />
                          <p className="text-red-500">{error}</p>
                          <ElemButton
                            className='float-right mt-5'
                            btn="primary"
                            onClick={gotoNext('company')}
                          >
                            Next
                          </ElemButton>
                        </> :
                        isCompanySelected && !isEmailEntered && <div className='flex flex-row items-center justify-between'>
                          <div className='flex items-center'>
                            <ElemPhoto
                              wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 border border-black/10 rounded-lg overflow-hidden"
                              imgClass="object-fit max-w-full max-h-full"
                              photo={selectedCompany?.logo}
                              imgAlt="company logo"
                            />
                            <span className='text-dark-500 ml-2'>{selectedCompany?.label}</span>
                          </div>
                          <button
                            onClick={() => {
                              setIsCompanySelected(false)
                              setIsEmailEntered(false)
                            }}
                            type="button"
                            className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-black/10 focus:bg-black/20"
                          >
                            <IconX className="h-6 w-6 text-dark-500 justify-self-end" />
                          </button>
                        </div>
                    }
                  </div>

                  {
                    isCompanySelected && !isEmailEntered &&
                    <div className='mt-4'>
                      <label className='text-sm font-bold font-Metropolis text-slate-600'>{`Please provide your <company name> email address`}</label>
                      <InputText
                        label=""
                        type='email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        name="email"
                        placeholder="e.g. name@yourcompany.com"
                      />
                      <p className="text-red-500">{error}</p>
                      <ElemButton
                        className='float-right mt-5'
                        btn="primary"
                        onClick={gotoNext('email')}
                      >
                        Next
                      </ElemButton>
                    </div>
                  }

                  {
                    isEmailEntered && isCompanySelected && !finish && (
                      <div className='clear-both'>
                        <div className="mt-2">
                          <p className="text-md font-normal font-Metropolis text-slate-600">
                            If you have any questions about this process, please contact us.
                          </p>
                        </div>
                        <ElemButton
                          btn="primary"
                          className='float-right mt-5'
                          onClick={gotoNext('finish')}>
                          Finish
                        </ElemButton>

                      </div>
                    )
                  }
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
