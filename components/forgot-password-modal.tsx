import type { GetStaticProps } from "next";
import { useState, Fragment } from "react";
import { ElemButton } from "@/components/elem-button";
import { Dialog, Transition } from "@headlessui/react";
import { IconCheck } from "@/components/icons";

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
		setIsMailSent(false);
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
							<Dialog.Panel className="max-w-2xl w-full p-6 mx-auto rounded-lg shadow-2xl bg-white overflow-x-hidden overflow-y-auto overscroll-y-none lg:p-12">
								<div className="max-w-md mx-auto w-full">
									{isMailSent ? (
										<>
											<h1 className="text-2xl font-bold lg:text-3xl">
												Password reset email sent
											</h1>
											<p className="mt-2">
												Look for an email from{" "}
												<span className="font-bold">support@edgein.io</span>.
												Check your Spam or Bulk Mail folders.
											</p>
											<div className="sm:col-span-3 mt-4">
												<ElemButton
													onClick={onBack}
													btn="primary"
													loading={isLoading}
												>
													Return to login
												</ElemButton>
											</div>
										</>
									) : (
										<>
											<h1 className="text-2xl font-bold lg:text-3xl">
												Forgot Password?
											</h1>
											<p>
												No worries, we&rsquo;ll send you reset instructions.
											</p>

											<div className="mt-4 flex flex-col space-y-1">
												<label className="font-bold cursor-text">Email</label>
												<input
													name="email"
													type="email"
													value={email}
													disabled={isLoading}
													onChange={(event) => setEmail(event?.target.value)}
													placeholder="example@email.com"
													className="mt-2 appearance-none border-none rounded-md block w-full px-3 h-10 ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
												/>

												<div>
													<ElemButton
														className="mt-4"
														onClick={handleSubmit}
														btn="primary"
														loading={isLoading}
													>
														Reset Password
													</ElemButton>
													<ElemButton
														onClick={onBack}
														btn="transparent"
														loading={isLoading}
														className="px-0 ml-2 sm:ml-4"
													>
														Cancel
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
