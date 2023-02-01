import { ElemButton } from "@/components/ElemButton";
import { ElemPhoto } from "@/components/ElemPhoto";
import { InputText } from "@/components/InputText";
import { InputTextarea } from "@/components/InputTextarea";
import { ChangeEvent, FC, useEffect, useRef, useState, Fragment } from "react";
import {
	GetCompaniesDocument,
	GetCompaniesQuery,
	People,
	Team_Members,
	useGetPersonQuery,
	useGetUserProfileQuery,
} from "@/graphql/types";
import { ElemMyListsMenu } from "@/components/MyList/ElemMyListsMenu";
import { useAuth } from "@/hooks/useAuth";
import { divide, find, findIndex } from "lodash";
import validator from "validator";
import { InputSelect } from "@/components/InputSelect";
import { getTimeOfWork, getWorkDurationFromAndTo, runGraphQl } from "@/utils";
import { IconProfilePictureUpload } from "@/components/Profile/IconFileUpload";
import { uploadFile, deleteFile } from "@/utils/fileFunctions";
import { InputDate } from "@/components/InputDate";
import { GetStaticProps } from "next";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { EditSection } from "@/components/Dashboard/EditSection";
import { ElemShareMenu } from "@/components/ElemShareMenu";
import { functionChoicesTM } from "@/utils/constants";
import { ElemCompaniesSearchInput } from "@/components/Companies/ElemCompaniesSearchInput";

const emptyTeamMember = {
	start_date: null,
	end_date: null,
	company_id: 0,
	title: null,
	function: null,
	founder: false,
};

type Props = {
	companiesDropdown: any;
};

const Profile: FC<Props> = ({ companiesDropdown }) => {
	const { user } = useAuth();

	const fileInputRef = useRef<HTMLInputElement>(null);

	const [person, setPerson] = useState<People>();
	const [editName, setEditName] = useState(false);
	const [editEmail, setEditEmail] = useState(false);
	const [editLocation, setEditLocation] = useState(false);
	const [editWebsite, setEditWebsite] = useState(false);
	const [editLinkedIn, setEditLinkedIn] = useState(false);
	const [editFacebook, setEditFacebook] = useState(false);
	const [editTwitter, setEditTwitter] = useState(false);
	const [editAbout, setEditAbout] = useState(false);
	const [editWorkspace, setEditWorkspace] = useState(false);

	// fields
	const [firstName, setFirstName] = useState("");
	const [lasttName, setLastName] = useState("");
	const [email, setEmail] = useState<any[]>([]);
	const [newEmail, setNewEmail] = useState("");
	const [city, setCity] = useState("");
	const [country, setCountry] = useState("");
	const [website, setWebsite] = useState("");
	const [linkedIn, setLinkedIn] = useState("");
	const [facebook, setFacebook] = useState("");
	const [twitter, setTwitter] = useState("");
	const [about, setAbout] = useState("");
	const [activeWorkspace, setActiveWorkspace] = useState(0);
	const [tmData, setTmData] = useState<any>(emptyTeamMember);

	const titles = functionChoicesTM.map((option) => {
		return {
			title: option.name,
			value: option.id,
		};
	});

	const { data: users, refetch } = useGetUserProfileQuery({
		id: user?.id ?? 0,
	});

	// set person
	useEffect(() => {
		if (users) setPerson(users.users_by_pk?.person as People);
	}, [users]);

	// set workspace data in edit mode
	// useEffect(() => {
	// 	if (activeWorkspace)
	// 		setTmData((prev: any) => {
	// 			const findTM = find(person?.team_members, { id: activeWorkspace });
	// 			if (!findTM) return prev;

	// 			const selectedCompany = find(companiesDropdown, {
	// 				value: findTM?.company?.id,
	// 			});
	// 			const selectedPositionType = findTM?.function
	// 				? {
	// 						title: `${findTM?.function
	// 							?.charAt(0)
	// 							.toUpperCase()}${findTM?.function?.slice(1)}`,
	// 						value: findTM?.function,
	// 				  }
	// 				: null;
	// 			const currentlyWorking = findTM.end_date ? false : true;

	// 			const temp = {
	// 				...prev,
	// 				company_id: selectedCompany,
	// 				person_id: findTM?.person_id,
	// 				title: findTM?.title,
	// 				function: selectedPositionType,
	// 				start_date: findTM.start_date,
	// 				end_date: findTM.end_date,
	// 				currentlyWorking,
	// 				founder: findTM?.founder,
	// 			};
	// 			return temp;
	// 		});
	// }, [activeWorkspace, companiesDropdown, person?.team_members]);

	// const renderWorkspaceForm = (teamMember?: Team_Members) => {
	// 	return (
	// 		<div className="">
	// 			{teamMember?.id ? (
	// 				<InputText
	// 					disabled={true}
	// 					name="Company"
	// 					label="Company"
	// 					onChange={() => {}}
	// 					value={teamMember?.company?.name!}
	// 					className="mb-3"
	// 				/>
	// 			) : (
	// 				<ElemCompaniesSearchInput
	// 					label="Company"
	// 					onChange={setTMField("company")}
	// 					name="company"
	// 					inputClassname="mb-3"
	// 				/>
	// 			)}
	// 			<div className="mb-3">
	// 				<label className="text-slate-600 font-bold block">Position</label>
	// 				<InputSelect
	// 					options={titles || []}
	// 					placeholder="Position"
	// 					value={tmData.function}
	// 					onChange={setTMField("function")}
	// 				/>
	// 			</div>
	// 			<div className="flex items-center gap-2 mb-3">
	// 				<input
	// 					type="checkbox"
	// 					onChange={setTMField("founder")}
	// 					checked={tmData.founder}
	// 				/>
	// 				<span className="text-slate-500">Founder</span>
	// 			</div>
	// 			<InputText
	// 				label="Title"
	// 				onChange={setTMField("title")}
	// 				value={tmData.title}
	// 				name="title"
	// 				placeholder="Founder and CEO"
	// 				className="mb-3"
	// 			/>
	// 			<label className="text-slate-600 font-bold block">Time Period</label>
	// 			<div className="flex items-center gap-2">
	// 				<input
	// 					type="checkbox"
	// 					onChange={setTMField("currentlyWorking")}
	// 					checked={tmData.currentlyWorking}
	// 				/>
	// 				<span className="text-slate-600"> I currently work here</span>
	// 			</div>
	// 			<div className="sm:flex items-center">
	// 				<InputDate
	// 					name="start_date"
	// 					value={tmData.start_date}
	// 					onChange={setTMField("start_date")}
	// 					className="rounded-full"
	// 				/>
	// 				<div className="my-1 text-center font-bold sm:my-0 sm:mx-2">to</div>
	// 				<InputDate
	// 					className="rounded-full"
	// 					value={tmData.end_date}
	// 					name="end_date"
	// 					onChange={setTMField("end_date")}
	// 					disabled={tmData.currentlyWorking}
	// 				/>
	// 			</div>
	// 			<div className="flex mt-4">
	// 				<ElemButton
	// 					btn="primary"
	// 					className="mr-2"
	// 					onClick={onSave("teamMember")}
	// 				>
	// 					Save
	// 				</ElemButton>
	// 				<ElemButton
	// 					btn="white"
	// 					onClick={() => {
	// 						if (teamMember?.id) setActiveWorkspace(0);
	// 						else setEditWorkspace(false);

	// 						setTmData(emptyTeamMember);
	// 					}}
	// 				>
	// 					Cancel
	// 				</ElemButton>
	// 			</div>
	// 		</div>
	// 	);
	// };

	// const renderWorkspaceEditForm = (teamMember: Team_Members) => {
	// 	return (
	// 		<div key={teamMember.id}>
	// 			{activeWorkspace === teamMember.id || (
	// 				<div className="grid grid-cols-12 gap-2">
	// 					<div className="flex mt-3 mb-2 pb-3 col-start-4 col-span-8">
	// 						<span className="text-dark-500 font-bold  col-span-3"></span>
	// 						<div className="flex">
	// 							<ElemPhoto
	// 								wrapClass="w-12 h-12 border p-1 rounded-md"
	// 								photo={teamMember.company?.logo}
	// 								imgAlt="company logo"
	// 							/>

	// 							<div className="ml-5">
	// 								<h2 className="font-bold font-Metropolis  text-slate-600">
	// 									{teamMember.title}
	// 								</h2>
	// 								<span className="font-thin text-slate-500 ">
	// 									{teamMember.company?.name}
	// 								</span>
	// 								<p className="font-thin text-slate-500">
	// 									{" "}
	// 									{getWorkDurationFromAndTo(
	// 										teamMember.start_date,
	// 										teamMember.end_date
	// 									)}{" "}
	// 									.{" "}
	// 									{getTimeOfWork(teamMember.start_date, teamMember.end_date)}{" "}
	// 									<br /> {teamMember.company?.location}
	// 								</p>
	// 							</div>
	// 						</div>
	// 					</div>
	// 					<button
	// 						className="text-primary-500 col-span-1"
	// 						onClick={() => setActiveWorkspace(teamMember.id)}
	// 					>
	// 						Edit
	// 					</button>
	// 				</div>
	// 			)}
	// 			{activeWorkspace === teamMember.id && renderWorkspaceForm(teamMember)}
	// 		</div>
	// 	);
	// };

	// set profile data
	useEffect(() => {
		if (person) {
			const nameFragments = person?.name?.split(" ");
			const firstName = nameFragments?.shift() || "";
			const lastName = nameFragments?.join(" ") || "";

			setFirstName(firstName);
			setLastName(lastName);
			setEmail(person?.email || []);
			setCity(person?.city || "");
			setCountry(person?.country || "");
			setWebsite(person?.website_url || "");
			setLinkedIn(person?.linkedin || "");
			setFacebook(person?.facebook_url || "");
			setTwitter(person?.twitter_url || "");
			setAbout(person?.about || "");
		}
	}, [person]);

	const updateCall = async (payload: any, type = "profile") => {
		if (type === "profile") {
			const resp = await fetch("/api/update_profile/", {
				method: "POST",
				body: JSON.stringify({
					id: person?.id,
					payload,
				}),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});

			return resp.json();
		}

		const resp = await fetch("/api/team_member/", {
			method: "POST",
			body: JSON.stringify({
				teammember: payload,
				personId: person?.id,
			}),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		return resp.json();
	};

	const setTMField =
		(field: string) => (event: ChangeEvent<HTMLInputElement> | any) => {
			if (field === "company") {
				setTmData((prev: any) => {
					const temp = { ...prev };

					temp["company_id"] = event;

					return temp;
				});
			}

			if (field === "function") {
				setTmData((prev: any) => {
					const temp = { ...prev };
					temp["function"] = event;

					return temp;
				});
			}

			if (field === "founder") {
				setTmData((prev: any) => {
					const temp = { ...prev };

					if (event.target.checked) temp["founder"] = true;
					else temp["founder"] = false;

					return temp;
				});
			}

			if (field === "title") {
				setTmData((prev: any) => {
					const temp = { ...prev };

					temp["title"] = event.target.value;

					return temp;
				});
			}

			if (field === "currentlyWorking") {
				setTmData((prev: any) => {
					const temp = { ...prev };
					if (event.target.checked) {
						temp["currentlyWorking"] = true;
						temp["end_date"] = null;
					} else {
						temp["currentlyWorking"] = false;
					}

					return temp;
				});
			}

			if (field === "start_date") {
				setTmData((prev: any) => {
					const temp = { ...prev };

					temp["start_date"] = event.target.value;

					return temp;
				});
			}

			if (field === "end_date") {
				setTmData((prev: any) => {
					const temp = { ...prev };

					temp["end_date"] = event.target.value;

					return temp;
				});
			}
		};

	const onSave = (entity: string) => async () => {
		if (entity === "name") {
			const resp = await updateCall({
				name: `${firstName} ${lasttName}`,
			});
			setPerson(resp.result);
		}

		if (entity === "email") {
			const exists = find(email, { email: newEmail });
			setEmail((prev: any) => {
				if (newEmail === "" || !validator.isEmail(newEmail)) return prev;
				const temp = [...prev];

				if (!email) temp.push({ email: newEmail, isPrimary: false });
				setNewEmail("");
				return temp;
			});

			const resp = await updateCall({
				email: exists
					? email
					: [...email, { email: newEmail, isPrimary: false }],
			});

			setPerson(resp.result);
		}

		if (entity === "website") {
			const resp = await updateCall({
				website_url: website,
			});
			setPerson(resp.result);
		}

		if (entity === "facebook") {
			const resp = await updateCall({
				facebook_url: facebook,
			});
			setPerson(resp.result);
		}

		if (entity === "twitter") {
			const resp = await updateCall({
				twitter_url: twitter,
			});
			setPerson(resp.result);
		}

		if (entity === "about") {
			const resp = await updateCall({
				about: about,
			});
			setPerson(resp.result);
		}

		if (entity === "linkedin") {
			const resp = await updateCall({
				linkedin: linkedIn,
			});
			setPerson(resp.result);
		}

		if (entity === "location") {
			const resp = await updateCall({
				city,
				country,
			});
			setPerson(resp.result);
		}

		if (entity === "teamMember") {
			const temp = { ...tmData };

			temp.company_id = temp.company_id.value;
			temp.function = temp.function.value;
			temp.person_id = person?.id;
			delete temp.currentlyWorking;

			await updateCall(temp, "teammember");

			setActiveWorkspace(0);
			setEditWorkspace(false);
			setTmData(emptyTeamMember);
			refetch();
		}
	};

	const handleProfileEditClick = () => {
		// 👇️ open file input box on click of other element
		fileInputRef?.current?.click();
	};

	const onFileUpload = () => async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files ? event.target.files[0] : null;
		if (!file) return;

		const res = await uploadFile(file);

		deleteFile(person?.picture);

		const resp = await updateCall({ picture: res.file });

		setPerson(resp.result);
	};

	const makePrimary = (email: string) => async () => {
		const tempEmail = [...person?.email];

		const tempEmailIndex = findIndex(tempEmail, { email });

		tempEmail.splice(tempEmailIndex, 1);

		tempEmail.push({ email: person?.work_email });

		const resp = await updateCall({
			email: tempEmail,
			work_email: email,
		});

		setPerson(resp.result);
	};

	const removeEmail = (email: string) => async () => {
		const tempEmail = [...person?.email];

		const tempEmailIndex = findIndex(tempEmail, { email });

		tempEmail.splice(tempEmailIndex, 1);

		const resp = await updateCall({
			email: tempEmail,
		});

		setPerson(resp.result);
	};

	const getInviteLink = (invitecode: string) => {
		const inviteLink = `${process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL}/?invite=${invitecode}`;
		return inviteLink;
	};

	const reference_id = user?.reference_id || "";
	const display_name = user?.display_name;

	const onTelegram = () => {
		window.open(
			`https://telegram.me/share/url?url=${getInviteLink(
				reference_id
			)}&text=${display_name} has invited you to join Edge In! Use the invite link to get started`,
			"_blank"
		);
	};

	const onSMS = () => {
		window.open(
			`sms:?&body=${display_name} has invited you to join Edge In! Use the invite link to get started : ${getInviteLink(
				reference_id
			)}`,
			""
		);
	};

	const onEmail = () => {
		window.open(
			`mailto:?subject=${display_name} has invited you to join Edge In!&body=Hey there! %0D%0A %0D%0A
	        ${display_name} has invited you to join Edge In! EdgeIn combines highly refined automated processes, the personalization of human intelligence, and the meaningful utility of blockchain technologies, to give you an unparalleled edge in Web3. Use the invite link to get started: ${getInviteLink(
				reference_id
			)}`,
			""
		);
	};

	const onCopy = () => {
		navigator.clipboard.writeText(getInviteLink(reference_id));
	};

	return (
		<DashboardLayout>
			<div className="bg-white shadow rounded-lg p-5">
				<div className="sm:flex justify-between items-center mb-2">
					<h2 className="font-bold text-xl">Invite Code</h2>

					{user && user.reference_id && (
						<div className="mt-2 sm:mt-0">
							<ElemShareMenu user={user} />
						</div>
					)}
				</div>
				<div className="max-w-3xl">
					<p className="text-slate-600">
						Get rewarded for sharing EdgeIn. Share your code with friends and
						colleagues and you will be considered a partial data contributor
						with every future data contribution your invited network makes to
						EdgeIn!
					</p>
				</div>
			</div>
			<div className="bg-white shadow rounded-lg p-5 mt-5">
				<div className="sm:flex justify-between items-center mb-2">
					<h2 className="font-bold text-xl">Personal Profile</h2>
					{/* <ElemButton btn="white" arrow className="mt-2 sm:mt-0">
						View Profile
					</ElemButton> */}
				</div>

				<div className="w-full divide-y divide-black/10 border-y border-black/10">
					{/* <EditSection heading="Profile Image">
						<div className="sm:flex items-center">
							<div className="relative w-32 h-32 mx-auto sm:mx-0">
								<ElemPhoto
									photo={person?.picture}
									wrapClass="flex items-center justify-center shrink-0 w-32 h-32 bg-white border border-slate-100 rounded-full"
									imgClass="object-fit max-w-full max-h-full rounded-full"
									imgAlt={person?.name}
									placeholder="user"
									placeholderClass="text-slate-300"
								/>
								<span
									className="w-9 h-9 absolute flex items-center justify-center rounded-full bottom-0 right-0 bg-slate-200 hover:bg-slate-300"
									role="button"
									onClick={handleProfileEditClick}
								>
									<IconProfilePictureUpload />
								</span>
								<input
									type="file"
									hidden={true}
									className="hidden"
									onChange={onFileUpload()}
									ref={fileInputRef}
								/>
							</div>
							<ul
								role="list"
								className="mt-4 list-disc list-inside text-sm text-slate-600 sm:ml-8"
							>
								<li>Square images work best (at least 300 x 300 pixels)</li>
								<li>Crop your image before you upload</li>
								<li>Image uploads are limited to 2MB</li>
								<li>Accepted image types JPG SVG AND PNG</li>
							</ul>
						</div>
					</EditSection> */}

					<EditSection
						heading="Full Name"
						right={
							!editName ? (
								<button
									onClick={() => setEditName(true)}
									className="text-primary-500 hover:text-dark-500"
								>
									Edit
								</button>
							) : (
								<></>
							)
						}
					>
						{!editName ? (
							<p className="text-slate-600">{person?.name}</p>
						) : (
							<div className="max-w-sm">
								<div>
									<InputText
										label="First Name"
										onChange={(e) => setFirstName(e.target.value)}
										value={firstName}
										name="first_name"
										placeholder="First Name"
									/>
								</div>
								<div className="mt-4">
									<InputText
										label="Last Name"
										onChange={(e) => setLastName(e.target.value)}
										value={lasttName}
										name="last_name"
										placeholder="Last Name"
									/>
								</div>
								<div className="mt-2 text-sm text-slate-600">
									<span className="font-bold">Note:</span> If you change your
									name on EdgeIn, you won’t be able to change it again for 60
									days.
								</div>

								<div className="flex mt-4">
									<ElemButton
										btn="primary"
										className="mr-2"
										onClick={onSave("name")}
									>
										Change
									</ElemButton>
									<ElemButton btn="white" onClick={() => setEditName(false)}>
										Cancel
									</ElemButton>
								</div>
							</div>
						)}
					</EditSection>

					<EditSection
						heading="Email"
						right={
							!editEmail ? (
								<button
									onClick={() => setEditEmail(true)}
									className="text-primary-500 hover:text-dark-500"
								>
									Edit
								</button>
							) : (
								<></>
							)
						}
					>
						{!editEmail ? (
							<div>
								<p className="text-slate-600">
									{person?.work_email}
									{person?.work_email != null && (
										<span className="font-bold text-sm text-primary-500">
											{" "}
											- Primary
										</span>
									)}
								</p>
								{person?.email &&
									person?.email.map((email: any) => (
										<p key={email.email} className="text-slate-600 mb-2">
											{email.email}
										</p>
									))}
							</div>
						) : (
							<div className="max-w-sm">
								<h2 className=" font-bold text-slate-600">Current Emails</h2>
								<div className="mb-2">
									<span className="block mt-1 text-sm font-semibold text-slate-600">
										{person?.work_email}
									</span>
									<span className="mt-1 text-slate-500 text-sm">Primary</span>
								</div>
								{email?.map((mail: any) => (
									<div key={mail.email} className="mb-2">
										<span className="block mt-1 text-sm text-slate-600">
											{mail.email}
										</span>
										<span
											className="mt-1 text-sm text-primary-500 cursor-pointer"
											onClick={makePrimary(mail.email)}
										>
											Make Primary
										</span>
										<span
											className="mt-1 text-sm ml-2 text-primary-500 cursor-pointer"
											onClick={removeEmail(mail.email)}
										>
											Remove
										</span>
									</div>
								))}

								<InputText
									label="New Email"
									onChange={(e) => {
										setNewEmail(e.target.value);
									}}
									value={newEmail}
									name="new-email"
									placeholder="name@email.com"
								/>

								<div className="flex mt-4">
									<ElemButton
										btn="primary"
										className="mr-2"
										onClick={onSave("email")}
									>
										Add
									</ElemButton>
									<ElemButton btn="white" onClick={() => setEditEmail(false)}>
										Cancel
									</ElemButton>
								</div>
							</div>
						)}
					</EditSection>

					{/* <EditSection
						heading="Location"
						right={
							!editLocation ? (
								<button
									onClick={() => setEditLocation(true)}
									className="text-primary-500 hover:text-dark-500"
								>
									Edit Location
								</button>
							) : (
								<></>
							)
						}
					>
						{!editLocation ? (
							<p className="text-slate-600">
								{person?.city}
								{person?.city && person?.country && <>,</>}
								{person?.country}
							</p>
						) : (
							<div className="max-w-sm">
								<InputText
									label="City"
									onChange={(e) => setCity(e.target.value)}
									value={city}
									name="city"
									placeholder="San Francisco"
									className="mb-3"
								/>
								<InputText
									label="Country"
									onChange={(e) => setCountry(e.target.value)}
									value={country}
									name="country"
									placeholder="United States"
									className="mb-3"
								/>

								<div className="flex mt-4">
									<ElemButton
										btn="primary"
										className="mr-2"
										onClick={onSave("location")}
									>
										Save
									</ElemButton>
									<ElemButton
										btn="white"
										onClick={() => setEditLocation(false)}
									>
										Cancel
									</ElemButton>
								</div>
							</div>
						)}
					</EditSection> */}

					{/* <EditSection
						heading="Website URL"
						right={
							!editWebsite ? (
								<button
									onClick={() => setEditWebsite(true)}
									className="text-primary-500 hover:text-dark-500"
								>
									Edit Website
								</button>
							) : (
								<></>
							)
						}
					>
						{!editWebsite ? (
							<p className="text-slate-600">{person?.website_url}</p>
						) : (
							<div className="max-w-sm">
								<InputText
									onChange={(e) => setWebsite(e.target.value)}
									value={website}
									name="website"
									placeholder="https://example.io"
								/>

								<div className="flex mt-4">
									<ElemButton
										btn="primary"
										className="mr-2"
										onClick={onSave("website")}
									>
										Save
									</ElemButton>
									<ElemButton btn="white" onClick={() => setEditWebsite(false)}>
										Cancel
									</ElemButton>
								</div>
							</div>
						)}
					</EditSection> */}

					{/* <EditSection
						heading="LinkedIn URL"
						right={
							!editLinkedIn ? (
								<button
									onClick={() => setEditLinkedIn(true)}
									className="text-primary-500 hover:text-dark-500"
								>
									Edit LinkedIn
								</button>
							) : (
								<></>
							)
						}
					>
						{!editLinkedIn ? (
							<p className="text-slate-600">{person?.linkedin}</p>
						) : (
							<div className="max-w-sm">
								<InputText
									onChange={(e) => setLinkedIn(e.target.value)}
									value={linkedIn}
									name="linkedIn"
									placeholder="https://linkedin.com"
								/>

								<div className="flex mt-4">
									<ElemButton
										btn="primary"
										className="mr-2"
										onClick={onSave("linkedin")}
									>
										Save
									</ElemButton>
									<ElemButton
										btn="white"
										onClick={() => setEditLinkedIn(false)}
									>
										Cancel
									</ElemButton>
								</div>
							</div>
						)}
					</EditSection> */}

					{/* <EditSection
						heading="Facebook URL"
						right={
							!editFacebook ? (
								<button
									onClick={() => setEditFacebook(true)}
									className="text-primary-500 hover:text-dark-500"
								>
									Edit Facebook
								</button>
							) : (
								<></>
							)
						}
					>
						{!editFacebook ? (
							<p className="text-slate-600">{person?.facebook_url}</p>
						) : (
							<div className="max-w-sm">
								<InputText
									onChange={(e) => setFacebook(e.target.value)}
									value={facebook}
									name="facebook"
									placeholder="https://facebook.com"
								/>

								<div className="flex mt-4">
									<ElemButton
										btn="primary"
										className="mr-2"
										onClick={onSave("facebook")}
									>
										Save
									</ElemButton>
									<ElemButton
										btn="white"
										onClick={() => setEditFacebook(false)}
									>
										Cancel
									</ElemButton>
								</div>
							</div>
						)}
					</EditSection> */}

					{/* <EditSection
						heading="Twitter URL"
						right={
							!editTwitter ? (
								<button
									onClick={() => setEditTwitter(true)}
									className="text-primary-500 hover:text-dark-500"
								>
									Edit Twitter
								</button>
							) : (
								<></>
							)
						}
					>
						{!editTwitter ? (
							<p className="text-slate-600">{person?.twitter_url}</p>
						) : (
							<div className="max-w-sm">
								<InputText
									onChange={(e) => setTwitter(e.target.value)}
									value={twitter}
									name="twitter"
									placeholder="https://twitter.com"
								/>

								<div className="flex mt-4">
									<ElemButton
										btn="primary"
										className="mr-2"
										onClick={onSave("twitter")}
									>
										Save
									</ElemButton>
									<ElemButton btn="white" onClick={() => setEditTwitter(false)}>
										Cancel
									</ElemButton>
								</div>
							</div>
						)}
					</EditSection> */}

					{/* <EditSection
						heading="About You"
						right={
							!editAbout ? (
								<button
									onClick={() => setEditAbout(true)}
									className="text-primary-500 hover:text-dark-500"
								>
									Edit About
								</button>
							) : (
								<></>
							)
						}
					>
						{!editAbout ? (
							<p className="text-slate-600">{person?.about}</p>
						) : (
							<div className="max-w-lg">
								<InputTextarea
									rows={5}
									value={about}
									onChange={(e) => setAbout(e.target.value)}
								/>
								<div className="flex mt-4">
									<ElemButton
										btn="primary"
										className="mr-2"
										onClick={onSave("about")}
									>
										Save
									</ElemButton>
									<ElemButton btn="white" onClick={() => setEditAbout(false)}>
										Cancel
									</ElemButton>
								</div>
							</div>
						)}
					</EditSection> */}

					{/* <EditSection
						heading="Work"
						right={
							!editWorkspace ? (
								<button
									onClick={() => setEditWorkspace(true)}
									className="text-primary-500 hover:text-dark-500"
								>
									Add Workplace
								</button>
							) : (
								<></>
							)
						}
					>
						{ {editWorkspace && renderWorkspaceForm()} }

						{!editWorkspace ? (
							<></>
						) : (
							<div className="max-w-sm">{renderWorkspaceForm()}</div>
						)}

						<div className="max-w-sm">
							{person?.team_members.map((teamMember) =>
								renderWorkspaceEditForm(teamMember)
							)}
						</div>
					</EditSection> */}
				</div>
			</div>
		</DashboardLayout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const { data: companiesData } = await runGraphQl<GetCompaniesQuery>(
		GetCompaniesDocument,
		{
			limit: 50,
			offset: 0,
			where: { slug: { _neq: "" }, status: { _eq: "published" } },
		}
	);

	return {
		props: {
			companiesDropdown:
				companiesData?.companies.map((company) => ({
					title: company.name,
					value: company.id,
				})) || [],
		},
	};
};

export default Profile;
