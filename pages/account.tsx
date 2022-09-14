import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Link from "next/link";
import { EmojiHot, EmojiLike, EmojiCrap } from "@/components/Emojis";
import { IconLinkedIn } from "@/components/reactions/IconLinkedIn";
import { ElemButton } from "@/components/ElemButton";
import { ElemPhoto } from "@/components/ElemPhoto";
import { IconChevronLeft } from "@/components/Icons";
import Image from "next/image";
import { InputText } from "@/components/InputText";
import { InputTextarea } from "@/components/InputTextarea";
import { InputSelect } from "@/components/InputSelect";
import person from "../images/person.png";
import { IconSetting } from "@/components/IconSetting";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
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
		const url = `${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}&connection=linkedin&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}&scope=openid%20profile%20email%20offline_access`;
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
		<div className="max-w-6xl px-4 pt-4 mx-auto sm:px-6 lg:px-8 lg:pt-10 mt-10">
			<div className="grid grid-cols-4 gap-4">
				<DashboardLayout />
				<div className="col-span-3">
					<div className="bg-white rounded-lg p-5">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-dark-500 font-bold text-xl">
								Account Setting
							</h2>
						</div>
						{
							// (user && !user.auth0_linkedin_id) && (
							<div className="flex mb-4  border-b border-gray-100 pb-3">
								<h2 className="font-bold w-40  font-Metropolis">
									Authentication
								</h2>
								<div className="ml-12">
									<p className="font-Metropolis font-normal  text-gray-10 tracking-wide">
										Connect your LinkedIn account to validate your profile and
										contribute to EdgeIn. Our team will then review your account
										and enable it for contribution (this may take up to one
										business day).
									</p>
									{/* <button className=" border border-slate-200 mt-2  px-4 py-2 rounded-md"><IconLinkedIn className="inline-block" /> <span className="text-darkblue-600 ml-2 font-bold">Connect LinkedIn</span></button> */}
									<ElemButton
										onClick={onLinkedInClick}
										disabled={user && user.auth0_linkedin_id}
										className="mt-2 border border-gray-100 rounded-t-lg rounded-b-lg"
										btn="transparent"
									>
										<IconLinkedIn />{" "}
										<span className="text-darkblue-600 ml-2">
											Connect LinkedIn
										</span>
									</ElemButton>
								</div>
							</div>
							// )
						}

						{user && user.auth0_user_pass_id && (
							<>
								{!isEditPassword ? (
									<div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3">
										<h2 className="text-dark-500 font-bold  w-40">
											Change Password
										</h2>
										<div>
											<h2 className="text-gray-10 ">
												Use a strong password that you are not using elsewhere.
											</h2>
										</div>
										<button
											onClick={() => setEditPassword(true)}
											className="absolute right-0  text-primary-500"
										>
											Edit
										</button>
									</div>
								) : (
									<div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3">
										<h2 className="text-dark-500 font-bold  w-40">
											Change Password
										</h2>
										<div>
											<div className="w-96 ">
												<div>
													<InputText
														type="password"
														label="New"
														onChange={(event) => {
															validate(event.target.value);
														}}
														value={newPassword}
														name=""
														className="mb-3 border border-gray-5"
													/>
													{errorMessage === "" ? null : (
														<span className="w-full  text-sm">
															{errorMessage}
														</span>
													)}
												</div>

												<InputText
													type="password"
													label="Re-type New"
													onChange={(event) => {
														validateReEnterPasssword(event.target.value);
													}}
													value={reEnterPassword}
													name=""
													className="mb-3 border border-gray-5"
												/>
												{reEnterErrorMessage === "" ? null : (
													<span className="w-full  text-sm">
														{reEnterErrorMessage}
													</span>
												)}

												<div className="flex mt-3 mb-2">
													<ElemButton
														btn="primary"
														className="mr-2"
														onClick={onChangePassword}
													>
														Save Changes
													</ElemButton>
													<ElemButton
														onClick={() => setEditPassword(false)}
														className="border-none font-bold text-slate-600 bg-transparent rounded-lg p-2"
													>
														Cancel
													</ElemButton>
												</div>
											</div>
										</div>
									</div>
								)}
							</>
						)}
						{/* hide content */}
						{/* <hr></hr> */}
					</div>
				</div>
			</div>
		</div>
	);
}
