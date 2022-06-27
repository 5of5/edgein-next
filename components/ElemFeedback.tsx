import { FC, PropsWithChildren, useState } from "react";
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
				subject: "EdgeIn - Feedback",
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
				<div className="absolute right-4 bottom-6 z-30 w-96 max-w-xs bg-white shadow-xl rounded-xl overflow-hidden">
					<header className="relative py-2 text-center font-bold bg-primary-500 text-white">
						{heading ? heading : "Feedback"}
						<div className="absolute top-0 right-2 bottom-0">
							<ElemButton
								btn="ol-white"
								onClick={() => setToggleFeedbackForm(!toggleFeedbackForm)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 m-auto"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</ElemButton>
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
									<label htmlFor="name" className="font-bold">
										Name {"(optional)"}
									</label>
									<input
										className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 relative bg-white rounded-md border border-slate-300 outline-none focus:outline-none focus:border-primary-500 focus:ring focus:ring-primary-100"
										type="text"
										name="name"
										value={name}
										onChange={(e) => setName(e.target.value)}
										autoComplete="name"
									/>
								</div>
								<div className="group mb-2 sm:col-span-2">
									<label
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
				className="absolute right-4 bottom-4"
				btn="primary"
				onClick={() => setToggleFeedbackForm(!toggleFeedbackForm)}
			>
				Feedback
			</ElemButton>
		</div>
	);
};
