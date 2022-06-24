import React, { useState } from "react";
import { useFormspark } from "@formspark/use-formspark";
import type { NextPage } from "next";
import { ElemButton } from "../components/ElemButton";

const Waitlist: NextPage = ({}) => {
	const [submit, submitting] = useFormspark({
		formId: "Kz4dKDvu",
	});
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [formSent, setFormSent] = useState(false);

	const onSubmit = async (e: { preventDefault: () => void }) => {
		if (e) e.preventDefault();
		await submit({
			name: name,
			email: email,
			_email: {
				from: name,
				subject: "EdgeIn - Waitlist",
				template: {
					title: false,
					footer: false,
				},
			},
		});

		setFormSent(true);
	};

	return (
		<div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8 lg:py-10 lg:min-h-[40vh]">
			<div className="max-w-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
				<div className="bg-white rounded-2xl border border-dark-500/10 p-6">
					<h1 className="text-3xl lg:text-4xl font-bold">
						{formSent
							? `You're on the list, ${name}!`
							: "Join the waiting list"}
					</h1>
					<p className="mt-2 text-xl text-dark-400">
						{formSent
							? "You will receive an email when it's your turn to explore and contribute."
							: "Explore Web3 data intelligence and contribute."}
					</p>

					{!formSent && (
						<>
							<form
								className="relative grid grid-cols-1 gap-y-4 mt-6 sm:grid-cols-2 sm:gap-x-8"
								onSubmit={onSubmit}
							>
								<div className="group mb-2 sm:col-span-2">
									<label htmlFor="name">Full Name</label>
									<input
										className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 relative bg-white rounded-md border border-slate-300 outline-none placeholder:text-gray-300  focus:outline-none focus:border-primary-500 focus:ring focus:ring-primary-100"
										type="text"
										name="name"
										value={name}
										onChange={(e) => setName(e.target.value)}
										placeholder="e.g. John Edge"
										autoComplete="name"
										required
									/>
								</div>
								<div className="group mb-2 sm:col-span-2">
									<label
										htmlFor="email"
										className="text-gray-400 cursor-text group-focus-within:text-primary-500"
									>
										Email
									</label>
									<input
										className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 relative bg-white rounded-md border border-slate-300 outline-none placeholder:text-gray-300  focus:outline-none focus:border-primary-500 focus:ring focus:ring-primary-100"
										type="email"
										name="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="example@email.com"
										autoComplete="email"
										required
									/>
								</div>
								<div className="text-right sm:col-span-2">
									<ElemButton btn="primary" loading={submitting}>
										Join waitlist
									</ElemButton>
								</div>
							</form>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Waitlist;
