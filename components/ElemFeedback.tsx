import { FC, PropsWithChildren, useState, useEffect } from "react";
import { InputTextarea } from "./InputTextarea";
import { InputText } from "./InputText";
import { ElemButton } from "./ElemButton";
import { useFormspark } from "@formspark/use-formspark";

type Props = {
	className?: string;
	heading?: string;
};

export const ElemFeedback: FC<PropsWithChildren<Props>> = ({
	className = "",
	heading,
}) => {
	// Show/Hide Feedback Form
	const [toggleFeedbackForm, setToggleFeedbackForm] = useState(false);

	// On componentDidMount set the timer
	useEffect(() => {
		const timeId = setTimeout(() => {
			// Show form after 3 seconds
			setToggleFeedbackForm(true);
		}, 3000);

		return () => {
			clearTimeout(timeId);
		};
	}, []);

	// Feedback Form
	const [submit, submitting] = useFormspark({
		formId: "mZbXY8MV",
	});
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [feedbackSent, setFeedbackSent] = useState(false);

	const onSubmit = async (e: { preventDefault: () => void }) => {
		if (e) e.preventDefault();
		await submit({
			name: name,
			email: message,
			_email: {
				from: name,
				subject: "Feedback - EdgeIn",
				template: {
					title: false,
					footer: false,
				},
			},
		});

		setFeedbackSent(true);
	};

	return (
		<div className={`${className} fixed z-50 right-4 bottom-4`}>
			{toggleFeedbackForm && (
				<div
					className={`${
						toggleFeedbackForm && "animate-fade-in-up"
					} absolute right-4 bottom-6 z-30 w-96 max-w-xs bg-white shadow-xl rounded-xl overflow-hidden`}
				>
					<header className="relative py-2 text-center font-bold bg-primary-500 text-white">
						{heading ? heading : "Feedback"}
						<div className="absolute top-0 right-2 bottom-0 flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="cursor-pointer rounded-md hover:bg-white/20 h-6 w-6"
								onClick={() => setToggleFeedbackForm(!toggleFeedbackForm)}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth="2"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M18 12H6"
								/>
							</svg>
						</div>
					</header>
					{feedbackSent ? (
						<div className="flex grow-1 p-4 font-bold w-auto">
							Feedback sent! Thank you!
						</div>
					) : (
						<>
							<form
								className="relative grid grid-cols-1 gap-y-4 m-4 overflow-y-scroll sm:grid-cols-2 sm:gap-x-8"
								onSubmit={onSubmit}
							>
								<div className="group mb-2 sm:col-span-2">
									{/* <label htmlFor="name" className="font-bold">
										Name {"(optional)"}
									</label> */}
									<InputText
										label="Name (optional)"
										name="name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div className="group mb-2 sm:col-span-2">
									{/* <label
										htmlFor="message"
										className="font-bold text-gray-400 cursor-text"
									>
										What missing data would you like to see?
									</label>

									<textarea
										className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 relative bg-white rounded-md border border-slate-300 outline-none resize-none hover:ring-primary-100 focus:outline-none focus:border-primary-500 hover:ring focus:ring focus:ring-primary-100"
										name="message"
										value={message}
										rows={4}
										onChange={(e) => setMessage(e.target.value)}
										required
									/> */}
									<InputTextarea
										label="What missing data would you like to see?"
										name="message"
										value={message}
										rows={3}
										onChange={(e) => setMessage(e.target.value)}
										required
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

			<ElemButton
				className="absolute right-4 bottom-4 shadow-lg"
				btn="white"
				onClick={() => setToggleFeedbackForm(!toggleFeedbackForm)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6 mr-1"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth="2"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
					/>
				</svg>
				Feedback
			</ElemButton>
		</div>
	);
};
