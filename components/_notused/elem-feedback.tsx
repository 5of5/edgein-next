import { FC, PropsWithChildren, useState, useEffect } from 'react';
import { InputTextarea } from '../input-textarea';
import { InputText } from '../input-text';
import { ElemButton } from '../elem-button';
import { IconMinus, IconAnnotation } from '../icons';
import { useFormspark } from '@formspark/use-formspark';

type Props = {
  className?: string;
  heading?: string;
  toggleFeedbackForm: boolean;
  setToggleFeedbackForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ElemFeedback: FC<PropsWithChildren<Props>> = ({
  className = '',
  heading,
  toggleFeedbackForm,
  setToggleFeedbackForm,
}) => {
  //const [toggleFeedbackForm, setToggleFeedbackForm] = useState(false); //set globally
  const [feedbackSent, setFeedbackSent] = useState(false);

  // On componentDidMount set the timer
  useEffect(() => {
    // const timeId = setTimeout(() => {
    // 	// Show form after 3 seconds
    // 	setToggleFeedbackForm(true);
    // }, 3000);

    setTimeout(function () {
      setFeedbackSent(false);
    }, 3000);

    // return () => {
    // 	clearTimeout(timeId);
    // };
  }, [setToggleFeedbackForm]);

  // Feedback Form
  const [submit, submitting] = useFormspark({
    formId: 'mZbXY8MV',
  });
  //const [name, setName] = useState("");
  const [message, setMessage] = useState('');

  const onSubmit = async (e: { preventDefault: () => void }) => {
    if (e) e.preventDefault();
    await submit({
      //name: name,
      message: message,
      page: window.location.href,
      _email: {
        //from: name,
        subject: 'Feedback - Mentibus',
        template: {
          title: false,
          footer: false,
        },
      },
    });

    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackSent(false);
      //setName("");
      setMessage('');
      setToggleFeedbackForm(false);
    }, 3000);
  };

  return (
    <div className={`${className} fixed z-20 left-4 bottom-4`}>
      {toggleFeedbackForm && (
        <div
          className={`${
            toggleFeedbackForm && 'animate-fade-in-up'
          } absolute z-10 left-0 bottom-0 w-96 max-w-xs bg-black shadow-xl rounded-xl overflow-hidden`}>
          <header className="relative py-2 font-bold text-center text-white bg-primary-500">
            {heading ? heading : 'Request Data'}
            <div
              className="absolute top-0 bottom-0 flex items-center right-2"
              onClick={() => setToggleFeedbackForm(!toggleFeedbackForm)}>
              <IconMinus className="w-6 h-6 rounded-md cursor-pointer hover:bg-black/20" />
            </div>
          </header>
          {feedbackSent ? (
            <div className="flex w-auto p-4 font-bold grow-1">
              Request sent! Thank you!
            </div>
          ) : (
            <>
              <form
                className="relative grid grid-cols-1 m-4 overflow-y-auto gap-y-4 sm:grid-cols-2 sm:gap-x-8"
                onSubmit={onSubmit}>
                {/* <div className="mb-2 group sm:col-span-2">
									<InputText
										label="Name (optional)"
										name="name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div> */}
                <div className="mb-2 group sm:col-span-2">
                  <InputTextarea
                    label="What missing data would you like to see?"
                    name="message"
                    value={message}
                    rows={3}
                    onChange={e => setMessage(e.target.value)}
                    required
                    className="ring-inset focus:ring-inset"
                  />
                </div>
                <div className="text-right sm:col-span-2">
                  <ElemButton btn="primary" loading={submitting}>
                    Send
                  </ElemButton>
                </div>
              </form>
            </>
          )}
        </div>
      )}

      {/* <ElemButton
				className="absolute shadow-lg"
				btn="default"
				onClick={() => setToggleFeedbackForm(!toggleFeedbackForm)}
			>
				<IconAnnotation className="w-6 h-6 mr-1" />
				Request Data
			</ElemButton> */}
    </div>
  );
};
