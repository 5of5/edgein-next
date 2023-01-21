import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useParams } from "react-router-dom";
import { ElemButton } from "@/components/ElemButton";
import { InputText } from "@/components/InputText";
import { IconLinkedIn, IconSparkles } from "@/components/Icons";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { ElemShareMenu } from "@/components/ElemShareMenu";
import { EditSection } from "@/components/Dashboard/EditSection";
import { useGetUserProfileQuery } from "@/graphql/types";
import { ElemSubscribedDialog } from "@/components/ElemSubscribedDialog";
import { loadStripe } from "@/utils/stripe";

const validator = require("validator");

export default function Account() {
	const { user } = useAuth();
	const { success } = useParams();

	const { data: userProfile } = useGetUserProfileQuery({
		id: user?.id || 0,
	});

	const [isEditPassword, setEditPassword] = useState(false);

	const [newPassword, setNewPassword] = useState("");
	const [reEnterPassword, setReEnterPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [reEnterErrorMessage, setReEnterErrorMessage] = useState("");

	const personSlug = userProfile?.users_by_pk?.person?.slug;

	const [isOpenSubscribedDialog, setIsOpenSubscribedDialog] = useState(false);

	const onCloseSubscribedDialog = () => {
		setIsOpenSubscribedDialog(false);
	};

	const validate = (value: string) => {
		setNewPassword(value);
		if (
			validator.isStrongPassword(value, {
				minLength: 8,
				minLowercase: 1,
				minUppercase: 1,
				minNumbers: 1,
				minSymbols: 1,
			})
		) {
			setErrorMessage("");
		} else {
			setErrorMessage(
				"Password should have least 8 characters including a lower-case letter, an upper-case letter, a number, a special character"
			);
		}
	};

	const validateReEnterPassword = (value: string) => {
		setReEnterPassword(value);
		if (newPassword !== value) {
			setReEnterErrorMessage("Password do not match!");
		} else {
			setReEnterErrorMessage("");
		}
	};

	const onLinkedInClick = () => {
		if (user && user.auth0_linkedin_id) {
			return;
		}
		const url = `${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}&connection=linkedin&redirect_uri=${process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL}&scope=openid%20profile%20email%20offline_access`;
		window.location.href = url;
	};

	const onBillingClick = async () => {
		loadStripe()
	};

	const callChangePassword = async () => {
		try {
			const response = await fetch("/api/set_password/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					password: newPassword,
				}),
			});
			setEditPassword(false);
			setNewPassword("");
			setReEnterPassword("");
		} catch (e) {
			console.log(e);
		}
	};

	const onChangePassword = () => {
		if (
			newPassword.length > 0 &&
			!errorMessage &&
			!reEnterErrorMessage &&
			newPassword === reEnterPassword
		) {
			//call api
			callChangePassword();
		}
	};

	return (
		<DashboardLayout>
			<div className="bg-white shadow rounded-lg p-5">
				<div className="sm:flex justify-between items-center mb-2">
					<h2 className="font-bold text-xl">Invite Code</h2>

					{user && user.reference_id && (
						<div className="mt-2 sm:mt-0">
							<ElemShareMenu user={user} personSlug={personSlug} />
						</div>
					)}
				</div>
				<p className="text-slate-600">{`Get rewarded for sharing EdgeIn with others. Share your code with friends and colleagues and you will be considered a partial data contributor with every future data contribution your invited network makes to EdgeIn!`}</p>
			</div>

			<div className="bg-white shadow rounded-lg mt-5 p-5">
				<div className="flex justify-between items-center mb-2">
					<h2 className="font-bold text-xl">Account Settings</h2>
				</div>

				<dl className="w-full divide-y divide-black/10 border-y border-black/10">
					<EditSection heading="Social authentication">
						<div>
							<p className="text-slate-600">
								Connect your LinkedIn account to validate your profile and
								contribute to EdgeIn. Our team will then review your account and
								enable it for contribution (this may take up to one business
								day).
							</p>
							{user && user.auth0_linkedin_id ? (
								<div className="inline-flex mt-2 gap-x-2 items-center font-bold px-3.5 py-1.5 text-sm justify-center text-[#0077B5]">
									<IconLinkedIn className="h-5 w-5" />
									<span>Connected</span>
								</div>
							) : (
								<>
									<ElemButton
										roundedFull={false}
										onClick={onLinkedInClick}
										btn="transparent"
										className="w-full mt-5 gap-x-2 text-center rounded-md text-[#0077B5] ring-1 ring-inset ring-black/10 hover:ring-2 hover:ring-[#0077B5] hover:text-[#0077B5] hover:bg-slate-50"
									>
										<IconLinkedIn
											title="LinkedIn"
											className="h-6 w-6 text-[#0077B5]"
										/>
										Login with LinkedIn
									</ElemButton>
									<ElemButton
										onClick={onLinkedInClick}
										//disabled={user && user.auth0_linkedin_id}
										className="mt-2 gap-x-2 rounded-md text-[#0077B5] ring-1 ring-slate-200  hover:bg-slate-200"
									>
										<IconLinkedIn className="h-5 w-5" />{" "}
										<span>Connect LinkedIn</span>
									</ElemButton>
								</>
							)}
						</div>
					</EditSection>

					{user && user.auth0_user_pass_id && (
						<EditSection
							heading="Password"
							right={
								!isEditPassword ? (
									<button
										onClick={() => setEditPassword(true)}
										className="text-primary-500 hover:text-dark-500"
									>
										Edit
									</button>
								) : (
									<></>
								)
							}
						>
							{!isEditPassword ? (
								<p className="text-slate-600">
									Use a strong password that you are not using elsewhere.
								</p>
							) : (
								<div className="max-w-sm text-sm">
									<div>
										<InputText
											type="password"
											label="New password"
											onChange={(event) => {
												validate(event.target.value);
											}}
											value={newPassword}
											name=""
										/>
										{errorMessage === "" ? null : (
											<div className="mt-2 text-sm">{errorMessage}</div>
										)}
									</div>

									<div className="mt-4">
										<InputText
											type="password"
											label="Re-type new password"
											onChange={(event) => {
												validateReEnterPassword(event.target.value);
											}}
											value={reEnterPassword}
											name=""
										/>
										{reEnterErrorMessage === "" ? null : (
											<div className="mt-2 text-sm">{reEnterErrorMessage}</div>
										)}
									</div>

									<div className="flex mt-4 mb-2 text-base">
										<ElemButton
											btn="primary"
											className="mr-2"
											onClick={onChangePassword}
										>
											Save Changes
										</ElemButton>
										<ElemButton
											onClick={() => setEditPassword(false)}
											btn="transparent"
										>
											Cancel
										</ElemButton>
									</div>
								</div>
							)}
						</EditSection>
					)}
					{false && user?.email.includes("@edgein.io") && (
						<EditSection heading="Billing">
							<div>
								<p className="text-slate-600">
									Manage your EdgeIn billing. (Currently: Only available for
									edgein team member)
								</p>
								<ElemButton
									onClick={onBillingClick}
									btn="primary-light"
									className="mt-2 text-primary-500"
								>
									{userProfile?.users_by_pk?.billing_org_id ? (
										<span>Go To Billing</span>
									) : (
										<span>Checkout</span>
									)}
								</ElemButton>
							</div>
						</EditSection>
					)}

					{user?.email.includes("@edgein.io") && (
						<EditSection heading="Subscription">
							{userProfile && userProfile.users_by_pk?.billing_org_id ? (
								<div>
									<div className="flex items-center space-x-1">
										<IconSparkles className="h-6 w-6 text-primary-500" />
										<p className="text-slate-600">EdgeIn Contributor</p>
									</div>
									<div className="flex items-center space-x-1">
									<ElemButton
									onClick={onBillingClick}
									btn="primary-light"
									className="mt-2 text-primary-500"
								>
										<span>Manage</span>

								</ElemButton>
</div></div>
							) : (
								<div>
									<h2 className="text-xl font-bold">
										Try EdgeIn Contributor Free for 7 days
									</h2>
									<p className="text-slate-600">
										Get real-time updates on the companies, people, deals and
										events you’re most interested in, giving you an
										unprecedented edge in web3.
									</p>
									<ElemButton
										onClick={onBillingClick}
										btn="primary"
										arrow
										className="mt-4 text-primary-500"
									>
										Start your free trial
									</ElemButton>
								</div>
							)}
						</EditSection>
					)}
				</dl>
				<ElemSubscribedDialog
					isOpen={isOpenSubscribedDialog}
					onClose={onCloseSubscribedDialog}
				/>
			</div>
		</DashboardLayout>
	);
}
