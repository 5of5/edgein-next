import type { GetStaticProps } from "next";
import { useState, Fragment } from "react";
import { ElemButton } from "./ElemButton";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
	show: boolean;
	onClose: () => void;
	onBack: () => void;
};

export default function ForgotPasswordModal(props: Props) {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isMailSent, setIsMailSent] = useState(false);

	const handleSubmit = async () => {
		if (!email) {
			alert("Enter email!");
			return;
		}
		try {
			const response = await fetch("/api/change_password/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			}).then((res) => res.json());
			if (response.success === true) {
				setIsMailSent(true);
			}
		} catch (e) {
			// setIsMailSent(true)

			setIsLoading(false);
		}
	};

	const onClose = () => {
		props.onClose();
	};

	const onBack = () => {
		props.onBack();
	};

	return (
		<>
			<Transition.Root show={props.show} as={Fragment}>
				<Dialog as="div" onClose={onClose} className="relative z-[60]">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed z-10 inset-0 bg-black/20 transition-opacity backdrop-blur-sm" />
					</Transition.Child>

					<div className="fixed inset-0 z-[50] m-6 min-h-0 flex flex-col items-center justify-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-300"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="max-w-2xl w-full p-6 mx-auto rounded-lg shadow-2xl bg-white overflow-x-hidden overflow-y-scroll overscroll-y-none lg:p-12">
								<div className="max-w-xs mx-auto w-full">
									{isMailSent ? (
										<>
											<h1 className="text-2xl text-center font-bold lg:text-3xl">
												Email Sent
											</h1>
											<p className="mt-2">
												{`We sent an email to ${email}! if this email is connected to an EdgeIn account, you'll be able to reset your password.`}
											</p>
											<p className="mt-2 text-center text-slate-600">
												We sent an email to{" "}
												<span className="font-bold">{email}</span> if this email
												is connected to an EdgeIn account, you&rsquo;ll be able
												to reset your password.
											</p>
											<div className="text-center sm:col-span-3 mt-10">
												<ElemButton
													className="w-full"
													onClick={onBack}
													btn="primary"
													loading={isLoading}
												>
													Back to login
												</ElemButton>
											</div>
										</>
									) : (
										<>
											<h1 className="text-2xl text-center font-bold lg:text-3xl">
												Reset Password
											</h1>

											<div className="flex flex-col space-y-2">
												<label>
													<input
														name="email"
														type="email"
														value={email}
														disabled={isLoading}
														onChange={(event) => setEmail(event?.target.value)}
														placeholder="example@email.com"
														className="mt-2 appearance-none border-none rounded-md block w-full px-3 h-10 ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
													/>
												</label>

												<div>
													<ElemButton
														className="w-full mt-2"
														onClick={handleSubmit}
														btn="primary"
														loading={isLoading}
													>
														Send a password reset email
													</ElemButton>
												</div>
											</div>
										</>
									)}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
}
