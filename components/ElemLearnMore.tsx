

import { PropsWithChildren } from 'react'
import { ElemButton } from './ElemButton'


type Props = {
  value?: boolean
  btn?: 'danger' | 'dark' | 'primary' | 'transparent' | 'ol-white' | 'ol-primary' | ''
  btnText?: string
}

export const ElemLearnMore: React.FC<PropsWithChildren<Props>> = ({value = false, btn = 'transparent', btnText = 'Learn more'}) => {
  return <div>
      <ElemButton btn={btn} arrow>
        { btnText }
      </ElemButton>
  
      {/* <ElemModal v-model="vis">
        <div class="bg-primary-500 text-white -mt-6 -mx-6 p-4">
          <h3 class="flex font-lb font-bold text-2xl mr-10 h-16">
            Sign Up for Access to Alpha
          </h3>
        </div>
        <div
          v-if="formSent"
          class="
            bg-primary-500
            text-white text-xl text-center
            rounded-md
            p-3
            mt-6
          "
        >
          Thank you, one step closer to a more transparent community.
        </div>
        <form
          v-else
          class="relative grid grid-cols-1 gap-y-6 mt-9 sm:grid-cols-2 sm:gap-x-8"
          @submit.prevent="onSubmit"
        >
          <input type="hidden" name="_redirect" value="false" />
          <div
            v-if="submitting"
            class="
              absolute
              z-10
              flex
              justify-center
              items-center
              w-full
              h-full
              bg-[#F3F6FF] bg-opacity-50
            "
          >
            <div
              style="border-top-color: transparent"
              class="
                w-8
                h-8
                border-4 border-primary-500 border-solid
                rounded-full
                animate-spin
              "
            ></div>
          </div>
          <div class="sm:col-span-2 relative group mb-6">
            <input
              id="name"
              v-model="name"
              type="text"
              name="name"
              autocomplete="given-name"
              required
              class="
                w-full
                py-2
                text-xl
                peer
                bg-transparent
                outline-none
                border-b border-gray-400
                focus:border-primary-500 focus:ring-opacity-0 focus:outline-none
              "
            />
            <label
              for="name"
              class="
                transform
                transition-all
                absolute
                top-0
                left-0
                h-full
                flex
                items-center
                text-xl text-gray-400
                cursor-text
                group-focus-within:text-base
                peer-valid:text-base
                group-focus-within:h-8
                peer-valid:h-8
                group-focus-within:-translate-y-8
                peer-valid:-translate-y-full
                group-focus-within:pl-0 group-focus-within:text-primary-500
              "
              >Your name</label
            >
          </div>
  
          <div class="sm:col-span-2 relative group mb-6">
            <input
              id="title"
              v-model="title"
              type="text"
              name="title"
              required
              class="
                w-full
                py-2
                text-xl
                peer
                bg-transparent
                outline-none
                border-b border-gray-400
                focus:border-primary-500 focus:ring-opacity-0 focus:outline-none
              "
            />
            <label
              for="title"
              class="
                transform
                transition-all
                absolute
                top-0
                left-0
                h-full
                flex
                items-center
                text-xl text-gray-400
                cursor-text
                group-focus-within:text-base
                peer-valid:text-base
                group-focus-within:h-8
                peer-valid:h-8
                group-focus-within:-translate-y-8
                peer-valid:-translate-y-full
                group-focus-within:pl-0 group-focus-within:text-primary-500
              "
              >Your title</label
            >
          </div>
  
          <div class="sm:col-span-2 relative group mb-6">
            <input
              id="email"
              v-model="email"
              type="email"
              name="email"
              autocomplete="email"
              required
              class="
                w-full
                py-2
                text-xl
                peer
                bg-transparent
                outline-none
                border-b border-gray-400
                focus:border-primary-500 focus:ring-opacity-0 focus:outline-none
              "
            />
            <label
              for="email"
              class="
                transform
                transition-all
                absolute
                top-0
                left-0
                h-full
                flex
                items-center
                text-xl text-gray-400
                cursor-text
                group-focus-within:text-base
                peer-valid:text-base
                group-focus-within:h-8
                peer-valid:h-8
                group-focus-within:-translate-y-8
                peer-valid:-translate-y-full
                group-focus-within:pl-0 group-focus-within:text-primary-500
              "
              >Your email</label
            >
          </div>
  
          <div class="text-right sm:col-span-2">
            <ElemButton type="submit" btn="primary" :disabled="submitting"
              >Submit</ElemButton
            >
          </div>
        </form>
      </ElemModal> */}
    </div>
  
}