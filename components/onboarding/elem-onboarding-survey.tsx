import { FC } from 'react';
import { onboardingSurveyChoices } from '@/utils/constants';
import { ElemButton } from '../elem-button';
import { InputCheckbox } from '../input-checkbox';

type Props = {
  answers: string[];
  onChangeAnswers: (answers: string[]) => void;
};

export const ElemOnboardingSurvey: FC<Props> = ({
  answers,
  onChangeAnswers,
}) => {
  return (
    <>
      <div className="max-w-sm">
        <h1 className="mt-4 text-2xl text-center font-medium lg:text-3xl">
          How did you hear about EdgeIn?
        </h1>
      </div>

      <ul className="grid grid-cols-2 gap-3 mt-8">
        {onboardingSurveyChoices.map(choiceItem => (
          <li key={choiceItem} className="">
            <InputCheckbox
              className="text-sm mx-6"
              label={choiceItem}
              checked={answers.includes(choiceItem)}
              onChange={event => {
                if (event.target.checked) {
                  onChangeAnswers([
                    ...answers.filter(item => item !== choiceItem),
                  ]);
                } else {
                  onChangeAnswers([...answers, choiceItem]);
                }
              }}
            />
          </li>
        ))}
      </ul>

      <ElemButton btn="primary" size="md" className="max-w-sm w-full mt-16">
        Finish
      </ElemButton>
    </>
  );
};
