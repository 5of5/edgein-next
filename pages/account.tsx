import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { ElemButton } from "@/components/ElemButton";
import { InputText } from "@/components/InputText";
import { IconLinkedIn } from "@/components/Icons";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { EditSection } from "@/components/Dashboard/EditSection";

const validator = require("validator");

export default function Account() {
	const { user, error, loading } = useAuth();
	const [isEditPassword, setEditPassword] = useState(false);

	const [newPassword, setNewPassword] = useState("");
	const [reEnterPassword, setReEnterPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [reEnterErrorMessage, setReEnterErrorMessage] = useState("");

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

	const validateReEnterPasssword = (value: string) => {
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
				<div className="flex justify-between items-center mb-2">
					<h2 className="font-bold text-xl">Account Settings</h2>
				</div>

				<dl className="w-full divide-y divide-black/10 border-y border-black/10">
					{/* {user && !user.auth0_linkedin_id && ( */}
					<EditSection heading="Authentication">
						<div>
							<p className="text-slate-600">
								Connect your LinkedIn account to validate your profile and
								contribute to EdgeIn. Our team will then review your account and
								enable it for contribution (this may take up to one business
								day).
							</p>
							<ElemButton
								onClick={onLinkedInClick}
								size="sm"
								disabled={user && user.auth0_linkedin_id}
								className="mt-2 gap-x-2 rounded-md text-[#0077B5] border border-black/10 hover:border-[#0077B5] hover:bg-slate-50"
								roundedFull={false}
							>
								<IconLinkedIn className="h-6 w-6" />{" "}
								<span>Connect LinkedIn</span>
							</ElemButton>
						</div>
					</EditSection>
					{/* )} */}

					{user && user.auth0_user_pass_id && (
						<EditSection
							heading="Change Password"
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
											label="New"
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
											label="Re-type New"
											onChange={(event) => {
												validateReEnterPasssword(event.target.value);
											}}
											value={reEnterPassword}
											name=""
										/>
										{reEnterErrorMessage === "" ? null : (
											<div className="mt-2 text-sm">{reEnterErrorMessage}</div>
										)}
									</div>

									<div className="flex mt-3 mb-2">
										<ElemButton
											btn="primary"
											size="sm"
											className="mr-2"
											onClick={onChangePassword}
										>
											Save Changes
										</ElemButton>
										<ElemButton
											size="sm"
											onClick={() => setEditPassword(false)}
											className="border-none font-bold text-slate-600 bg-transparent rounded-lg p-2"
										>
											Cancel
										</ElemButton>
									</div>
								</div>
							)}
						</EditSection>
					)}
				</dl>
			</div>
		</DashboardLayout>
	);
}
