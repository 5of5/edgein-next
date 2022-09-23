import React, { useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import { InputText } from "@/components/InputText";
import { InputTextarea } from "@/components/InputTextarea";
import { ElemButton } from "@/components/ElemButton";
import { IconPaperAirplane } from "@/components/Icons";
import { FigurePerspectiveGrid } from "@/components/Figures";
import { useFormspark } from "@formspark/use-formspark";

const Contact: NextPage = () => {
	const [submit, submitting] = useFormspark({
		formId: "AHfFBM4l",
	});

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [formSent, setFormSent] = useState(false);

	const onSubmit = async (e: { preventDefault: () => void }) => {
		if (e) e.preventDefault();
		await submit({
			name: name,
			email: email,
			message: message,
			_email: {
				from: name,
				subject: "Contact - EdgeIn",
				template: {
					title: false,
					footer: false,
				},
			},
		});

		setFormSent(true);
	};

	return (
		<div className="lg:py-10 lg:min-h-[40vh] -mb-24 pb-36 bg-[url('/images/bg-shapes1.svg')] bg-cover bg-no-repeat bg-center overflow-hidden">
			<div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
				<h1 className="relative max-w-3xl text-4xl lg:text-6xl font-bold">
					Contact
				</h1>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="16"
					viewBox="0 0 18 16"
					fill="none"
				>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M4.4917 1.69645C4.4917 1.45761 4.39682 1.22855 4.22793 1.05966C4.05905 0.890778 3.82999 0.795898 3.59115 0.795898C3.35231 0.795898 3.12325 0.890778 2.95436 1.05966C2.78547 1.22855 2.69059 1.45761 2.69059 1.69645V12.1303L1.52618 10.9658C1.35633 10.8018 1.12885 10.711 0.892728 10.7131C0.656606 10.7151 0.430736 10.8098 0.263766 10.9768C0.0967961 11.1438 0.00208588 11.3697 3.40433e-05 11.6058C-0.00201779 11.8419 0.0887529 12.0694 0.252796 12.2392L2.95446 14.9409C3.12333 15.1097 3.35235 15.2046 3.59115 15.2046C3.82994 15.2046 4.05896 15.1097 4.22784 14.9409L6.9295 12.2392C7.09354 12.0694 7.18431 11.8419 7.18226 11.6058C7.18021 11.3697 7.0855 11.1438 6.91853 10.9768C6.75156 10.8098 6.52569 10.7151 6.28957 10.7131C6.05344 10.711 5.82596 10.8018 5.65612 10.9658L4.4917 12.1303V1.69645ZM9.89502 2.59701C9.65618 2.59701 9.42712 2.69188 9.25823 2.86077C9.08935 3.02966 8.99447 3.25872 8.99447 3.49756C8.99447 3.7364 9.08935 3.96546 9.25823 4.13435C9.42712 4.30323 9.65618 4.39811 9.89502 4.39811H17.0994C17.3383 4.39811 17.5673 4.30323 17.7362 4.13435C17.9051 3.96546 18 3.7364 18 3.49756C18 3.25872 17.9051 3.02966 17.7362 2.86077C17.5673 2.69188 17.3383 2.59701 17.0994 2.59701H9.89502ZM9.89502 7.09977C9.65618 7.09977 9.42712 7.19465 9.25823 7.36354C9.08935 7.53242 8.99447 7.76148 8.99447 8.00033C8.99447 8.23917 9.08935 8.46823 9.25823 8.63711C9.42712 8.806 9.65618 8.90088 9.89502 8.90088H13.4972C13.7361 8.90088 13.9651 8.806 14.134 8.63711C14.3029 8.46823 14.3978 8.23917 14.3978 8.00033C14.3978 7.76148 14.3029 7.53242 14.134 7.36354C13.9651 7.19465 13.7361 7.09977 13.4972 7.09977H9.89502ZM9.89502 11.6025C9.65618 11.6025 9.42712 11.6974 9.25823 11.8663C9.08935 12.0352 8.99447 12.2643 8.99447 12.5031C8.99447 12.7419 9.08935 12.971 9.25823 13.1399C9.42712 13.3088 9.65618 13.4036 9.89502 13.4036H10.7956C11.0344 13.4036 11.2635 13.3088 11.4324 13.1399C11.6012 12.971 11.6961 12.7419 11.6961 12.5031C11.6961 12.2643 11.6012 12.0352 11.4324 11.8663C11.2635 11.6974 11.0344 11.6025 10.7956 11.6025H9.89502Z"
						fill="#0E0067"
					/>
				</svg>
				<div className="mt-2 text-xl text-slate-600">
					Partner with EdgeIn, submit a profile, or simply get in touch.
					<div>Our team would love to hear from you!</div>
				</div>
				<div className="mt-16 relative">
					<FigurePerspectiveGrid className="block absolute z-0 w-full scale-[2.5] bottom-0 opacity-30 text-dark-500" />
					<div className="absolute -top-8 left-0 right-0 aspect-video w-10/12 mx-auto rounded-2xl bg-gradient-to-tr from-white/80 to-white/20 border-2 border-white/60 opacity-80 backdrop-blur-3xl"></div>
					<div className="absolute -top-4 left-0 right-0 aspect-video w-11/12 mx-auto rounded-2xl bg-gradient-to-tr from-white/80 to-white/20 border-2 border-white/60 opacity-80 backdrop-blur-3xl"></div>

					<div className="rounded-2xl bg-white p-6 relative z-10">
						{formSent ? (
							<div className="flex flex-col items-center justify-center sm:h-full">
								<IconPaperAirplane className="mx-auto h-12 w-12 text-slate-300" />
								<h2 className="text-2xl font-bold text-center mt-5 lg:text-3xl ">
									Message Sent!
								</h2>
							</div>
						) : (
							<>
								<form
									className="relative grid grid-cols-1 gap-y-4 mt-6 sm:grid-cols-2 sm:gap-x-8"
									onSubmit={onSubmit}
								>
									<div className="group mb-2 sm:col-span-2">
										<InputText
											label="Full Name"
											type="text"
											name="name"
											value={name}
											onChange={(e) => setName(e.target.value)}
											placeholder="e.g. John Edge"
											required
										/>
									</div>
									<div className="group mb-2 sm:col-span-2">
										<InputText
											label="Work Email"
											type="email"
											name="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											placeholder="example@email.com"
											required
										/>
									</div>
									<div className="group mb-2 sm:col-span-2">
										<InputTextarea
											label="Message"
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
				</div>
			</div>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {
			metaTitle: "Contact - EdgeIn.io",
			metaDescription:
				"Request a company profile, tell us about you, or simply get in touch. Our team would love to hear from you!",
		},
	};
};

export default Contact;
