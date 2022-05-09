import { PropsWithChildren } from "react"
import { ElemLearnMore } from "./ElemLearnMore"

type Props = {
  title: string
}

export const ElemCta: React.FC<PropsWithChildren<Props>> = (props) => {
  return <div className="bg-white text-dark-500 rounded-xl p-16 py-12 lg:py-16">
  <div className="max-w-lg mx-auto text-center">
    <h2 className="mb-4 text-3xl font-lb font-bold sm:text-4xl">
      { props.title }
    </h2>
    <p className="mb-4 text-md text-dark-400 sm:text-sm lg:text-lg">
      { props.children }
    </p>
    <ElemLearnMore btn="primary" btn-text="Access" />
  </div>
</div>

}