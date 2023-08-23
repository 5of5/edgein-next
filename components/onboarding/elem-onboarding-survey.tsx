import { FC } from 'react';
import { ElemButton } from '../elem-button';
import { InputTextarea } from '../input-textarea';

type Props = {
  isLoading: boolean;
  answer: string;
  onChangeAnswer: (answer: string) => void;
  onNext: () => void;
};

export const ElemOnboardingSurvey: FC<Props> = ({
  isLoading,
  answer,
  onChangeAnswer,
  onNext,
}) => {
  return (
    <>
      <div className="max-w-sm">
        <h1 className="mt-4 text-2xl text-center font-medium lg:text-3xl">
          How did you hear about EdgeIn?
        </h1>
        <p className="mt-5 text-xs text-center text-slate-500 font-normal">
          We&apos;re working hard to make sure we get EdgeIn to the right
          people. You can help us out with that.
        </p>

        <div className="mt-8">
          <InputTextarea
            name="survey"
            value={answer}
            placeholder="For example, email campaigns or articles..."
            rows={8}
            onChange={e => onChangeAnswer(e.target.value)}
            required
            className="text-sm placeholder:text-slate-400 ring-1 ring-slate-300 hover:ring-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      <ElemButton
        btn="primary"
        size="md"
        className="max-w-sm w-full mt-16"
        loading={isLoading}
        onClick={onNext}
      >
        Finish
      </ElemButton>
    </>
  );
};
