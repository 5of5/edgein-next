import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { InputText } from "@/components/InputText";
import { InputTextarea } from "@/components/InputTextarea";
import { ElemButton } from "@/components/ElemButton";
import { useFormspark } from "@formspark/use-formspark";

import backgroundImage from "@/images/background-shapes1.jpg";

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
		<div>
			<Head>
				<title>Contact - EdgeIn.io</title>
				<meta
					name="description"
					content="Request a company profile, tell us about you, or simply get in touch. Our team would love to hear from you!"
				/>
			</Head>
			<div>
				<div className="relative overflow-hidden min-h-[70vh] bg-gray-50 py-20 sm:py-32">
					<div className="absolute top-0 left-1/2 -translate-x-[30%] -translate-y-[5%]">
						<Image
							src={backgroundImage}
							alt=""
							width={1558}
							height={946}
							layout="fixed"
							unoptimized
						/>
					</div>
					<div className="relative z-10 max-w-6xl mx-auto sm:px-6 lg:px-8">
						<div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-16 ">
							<div>
								<h1 className="relative max-w-3xl text-4xl lg:text-6xl font-bold">
									Contact
								</h1>
								<p className="mt-4 text-xl text-slate-600">
									Partner with EdgeIn, submit a profile, or simply get in touch.
									Our team would love to hear from you!
								</p>
							</div>
							<div className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
								{formSent ? (
									<div className="flex items-center justify-center sm:h-full">
										<h2 className="text-2xl lg:text-3xl font-bold text-center">
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
			</div>
		</div>
	);
};

export default Contact;
