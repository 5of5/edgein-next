import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
//import { ProfileEdit } from '@/components/profile/profile-edit';
import { ProfileEditEmail } from '@/components/profile/profile-edit-email';
import { ProfileEditName } from '@/components/profile/profile-edit-name';
import { ElemButton } from '@/components/elem-button';
import { IconSearch } from '@/components/icons';
// import { ElemPhoto } from "@/components/elem-photo";
// import { InputText } from "@/components/InputText";
// import { InputTextarea } from "@/components/InputTextarea";

import {
  // GetCompaniesDocument,
  // GetCompaniesQuery,
  // People,
  // Team_Members,
  // useGetPersonQuery,
  useGetUserProfileQuery,
} from '@/graphql/types';
import { useAuth } from '@/hooks/use-auth';
import { usePopup } from '@/context/popup-context';
// import { divide, find, findIndex } from "lodash";
// import validator from "validator";
// import { InputSelect } from "@/components/InputSelect";
// import { getTimeOfWork, getWorkDurationFromAndTo, runGraphQl } from "@/utils";
// import { IconProfilePictureUpload } from "@/components/Profile/IconFileUpload";
// import { uploadFile, deleteFile } from "@/utils/file-functions";
// import { InputDate } from "@/components/InputDate";
// import { GetStaticProps } from "next";
import { EditSection } from '@/components/dashboard/edit-section';
import { ROUTES } from '@/routes';
// import { functionChoicesTM } from "@/utils/constants";
// import { ElemCompaniesSearchInput } from "@/components/Companies/ElemCompaniesSearchInput";

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

  const { setShowPopup } = usePopup();

  //const fileInputRef = useRef<HTMLInputElement>(null);

  // fields
  // const [email, setEmail] = useState<any[]>([]);
  // const [newEmail, setNewEmail] = useState("");
  // const [city, setCity] = useState("");
  // const [country, setCountry] = useState("");
  // const [website, setWebsite] = useState("");
  // const [linkedIn, setLinkedIn] = useState("");
  // const [facebook, setFacebook] = useState("");
  // const [twitter, setTwitter] = useState("");
  // const [about, setAbout] = useState("");
  // const [activeWorkspace, setActiveWorkspace] = useState(0);
  // const [tmData, setTmData] = useState<any>(emptyTeamMember);

  // const titles = functionChoicesTM.map((option) => {
  // 	return {
  // 		title: option.name,
  // 		value: option.id,
  // 	};
  // });

  const {
    data: users,
    refetch,
    isLoading,
  } = useGetUserProfileQuery({
    id: user?.id ?? 0,
  });

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
  // 				<label className="block font-bold text-slate-600">Position</label>
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
  // 			<label className="block font-bold text-slate-600">Time Period</label>
  // 			<div className="flex items-center gap-2">
  // 				<input
  // 					type="checkbox"
  // 					onChange={setTMField("currentlyWorking")}
  // 					checked={tmData.currentlyWorking}
  // 				/>
  // 				<span className="text-slate-600"> I currently work here</span>
  // 			</div>
  // 			<div className="items-center sm:flex">
  // 				<InputDate
  // 					name="start_date"
  // 					value={tmData.start_date}
  // 					onChange={setTMField("start_date")}
  // 					className="rounded-full"
  // 				/>
  // 				<div className="my-1 font-bold text-center sm:my-0 sm:mx-2">to</div>
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
  // 					btn="default"
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
  // 					<div className="flex col-span-8 col-start-4 pb-3 mt-3 mb-2">
  // 						<span className="col-span-3 font-bold text-dark-500"></span>
  // 						<div className="flex">
  // 							<ElemPhoto
  // 								wrapClass="w-12 h-12 border p-1 rounded-md"
  // 								photo={teamMember.company?.logo}
  // 								imgAlt="company logo"
  // 							/>

  // 							<div className="ml-5">
  // 								<h2 className="font-bold text-slate-600">
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
  // 						className="col-span-1 text-primary-500"
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
  // useEffect(() => {
  // 	if (person) {

  // 		setCity(person?.city || "");
  // 		setCountry(person?.country || "");
  // 		setWebsite(person?.website_url || "");
  // 		setLinkedIn(person?.linkedin || "");
  // 		setFacebook(person?.facebook_url || "");
  // 		setTwitter(person?.twitter_url || "");
  // 		setAbout(person?.about || "");
  // 	}
  // }, [person]);

  // const updateCall = async (payload: any, type = "profile") => {
  // 	if (type === "profile") {
  // 		const resp = await fetch("/api/update-profile/", {
  // 			method: "POST",
  // 			body: JSON.stringify({
  // 				id: person?.id,
  // 				payload,
  // 			}),
  // 			headers: {
  // 				Accept: "application/json",
  // 				"Content-Type": "application/json",
  // 			},
  // 		});

  // 		return resp.json();
  // 	}

  // 	const resp = await fetch("/api/team-member/", {
  // 		method: "POST",
  // 		body: JSON.stringify({
  // 			teammember: payload,
  // 			personId: person?.id,
  // 		}),
  // 		headers: {
  // 			Accept: "application/json",
  // 			"Content-Type": "application/json",
  // 		},
  // 	});

  // 	return resp.json();
  // };

  // const setTMField =
  // 	(field: string) => (event: ChangeEvent<HTMLInputElement> | any) => {
  // 		if (field === "company") {
  // 			setTmData((prev: any) => {
  // 				const temp = { ...prev };

  // 				temp["company_id"] = event;

  // 				return temp;
  // 			});
  // 		}

  // 		if (field === "function") {
  // 			setTmData((prev: any) => {
  // 				const temp = { ...prev };
  // 				temp["function"] = event;

  // 				return temp;
  // 			});
  // 		}

  // 		if (field === "founder") {
  // 			setTmData((prev: any) => {
  // 				const temp = { ...prev };

  // 				if (event.target.checked) temp["founder"] = true;
  // 				else temp["founder"] = false;

  // 				return temp;
  // 			});
  // 		}

  // 		if (field === "title") {
  // 			setTmData((prev: any) => {
  // 				const temp = { ...prev };

  // 				temp["title"] = event.target.value;

  // 				return temp;
  // 			});
  // 		}

  // 		if (field === "currentlyWorking") {
  // 			setTmData((prev: any) => {
  // 				const temp = { ...prev };
  // 				if (event.target.checked) {
  // 					temp["currentlyWorking"] = true;
  // 					temp["end_date"] = null;
  // 				} else {
  // 					temp["currentlyWorking"] = false;
  // 				}

  // 				return temp;
  // 			});
  // 		}

  // 		if (field === "start_date") {
  // 			setTmData((prev: any) => {
  // 				const temp = { ...prev };

  // 				temp["start_date"] = event.target.value;

  // 				return temp;
  // 			});
  // 		}

  // 		if (field === "end_date") {
  // 			setTmData((prev: any) => {
  // 				const temp = { ...prev };

  // 				temp["end_date"] = event.target.value;

  // 				return temp;
  // 			});
  // 		}
  // 	};

  // const onSave = (entity: string) => async () => {
  // 	if (entity === "name") {
  // 		// const resp = await updateCall({
  // 		// 	name: `${firstName} ${lasttName}`,
  // 		// });
  // 		// setPerson(resp.result);
  // 	}

  // 	if (entity === "email") {
  // 		const exists = find(email, { email: newEmail });
  // 		setEmail((prev: any) => {
  // 			if (newEmail === "" || !validator.isEmail(newEmail)) return prev;
  // 			const temp = [...prev];

  // 			if (!email) temp.push({ email: newEmail, isPrimary: false });
  // 			setNewEmail("");
  // 			return temp;
  // 		});

  // 		const resp = await updateCall({
  // 			email: exists
  // 				? email
  // 				: [...email, { email: newEmail, isPrimary: false }],
  // 		});

  // 		setPerson(resp.result);
  // 	}

  // 	if (entity === "website") {
  // 		const resp = await updateCall({
  // 			website_url: website,
  // 		});
  // 		setPerson(resp.result);
  // 	}

  // 	if (entity === "facebook") {
  // 		const resp = await updateCall({
  // 			facebook_url: facebook,
  // 		});
  // 		setPerson(resp.result);
  // 	}

  // 	if (entity === "twitter") {
  // 		const resp = await updateCall({
  // 			twitter_url: twitter,
  // 		});
  // 		setPerson(resp.result);
  // 	}

  // 	if (entity === "about") {
  // 		const resp = await updateCall({
  // 			about: about,
  // 		});
  // 		setPerson(resp.result);
  // 	}

  // 	if (entity === "linkedin") {
  // 		const resp = await updateCall({
  // 			linkedin: linkedIn,
  // 		});
  // 		setPerson(resp.result);
  // 	}

  // 	if (entity === "location") {
  // 		const resp = await updateCall({
  // 			city,
  // 			country,
  // 		});
  // 		setPerson(resp.result);
  // 	}

  // 	if (entity === "teamMember") {
  // 		const temp = { ...tmData };

  // 		temp.company_id = temp.company_id.value;
  // 		temp.function = temp.function.value;
  // 		temp.person_id = person?.id;
  // 		delete temp.currentlyWorking;

  // 		await updateCall(temp, "teammember");

  // 		setActiveWorkspace(0);
  // 		// setEditWorkspace(false);
  // 		setTmData(emptyTeamMember);
  // 		refetch();
  // 	}
  // };

  // const handleProfileEditClick = () => {
  // 	// 👇️ open file input box on click of other element
  // 	fileInputRef?.current?.click();
  // };

  // const onFileUpload = () => async (event: ChangeEvent<HTMLInputElement>) => {
  // 	const file = event.target.files ? event.target.files[0] : null;
  // 	if (!file) return;

  // 	const res = await uploadFile(file);

  // 	deleteFile(person?.picture);

  // 	const resp = await updateCall({ picture: res.file });

  // 	setPerson(resp.result);
  // };

  // const makePrimary = (email: string) => async () => {
  // 	const tempEmail = [...person?.email];

  // 	const tempEmailIndex = findIndex(tempEmail, { email });

  // 	tempEmail.splice(tempEmailIndex, 1);

  // 	tempEmail.push({ email: person?.work_email });

  // 	const resp = await updateCall({
  // 		email: tempEmail,
  // 		work_email: email,
  // 	});

  // 	setPerson(resp.result);
  // };

  // const removeEmail = (email: string) => async () => {
  // 	const tempEmail = [...person?.email];

  // 	const tempEmailIndex = findIndex(tempEmail, { email });

  // 	tempEmail.splice(tempEmailIndex, 1);

  // 	const resp = await updateCall({
  // 		email: tempEmail,
  // 	});

  // 	setPerson(resp.result);
  // };

  return (
    <DashboardLayout>
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-medium">Profile Settings</h2>
          {users?.users_by_pk?.person && (
            <ElemButton
              href={`${ROUTES.PEOPLE}/${users?.users_by_pk?.person?.slug}/`}
              btn="primary"
              arrow
              className="mt-2 sm:mt-0">
              View Profile
            </ElemButton>
          )}
        </div>

        {!users?.users_by_pk?.person && (
          <EditSection heading="Claim Profile">
            <div className="p-5 rounded-lg shadow bg-primary-500">
              <div className="items-center justify-between mb-2 sm:flex">
                <h2 className="text-xl font-medium text-white">
                  Claim your Profile to unlock some features.
                </h2>
              </div>
              <div className="max-w-lg">
                <p className="text-sm text-white opacity-80">
                  You have not linked your account to a profile on EdgeIn.
                  Search your name on the site and claim profile.
                </p>
                <ElemButton
                  btn="default"
                  onClick={() => setShowPopup('search')}
                  className="mt-4 text-primary-500">
                  <IconSearch className="h-5 w-5 mr-1.5" aria-hidden="true" />
                  Search your name
                </ElemButton>
              </div>
            </div>
          </EditSection>
        )}

        {/* <EditSection heading="Profile Image">
						<div className="items-center sm:flex">
							<div className="relative w-32 h-32 mx-auto sm:mx-0">
								<ElemPhoto
									photo={person?.picture}
									wrapClass="flex items-center justify-center shrink-0 w-32 h-32 bg-black border border-slate-100 rounded-full"
									imgClass="object-fit max-w-full max-h-full rounded-full"
									imgAlt={person?.name}
									placeholder="user"
									placeholderClass="text-gray-300"
								/>
								<span
									className="absolute bottom-0 right-0 flex items-center justify-center rounded-full w-9 h-9 bg-slate-200 hover:bg-slate-300"
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
								className="mt-4 text-sm list-disc list-inside text-slate-600 sm:ml-8"
							>
								<li>Square images work best (at least 300 x 300 pixels)</li>
								<li>Crop your image before you upload</li>
								<li>Image uploads are limited to 2MB</li>
								<li>Accepted image types JPG SVG AND PNG</li>
							</ul>
						</div>
					</EditSection> */}

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <ProfileEditName />
            <ProfileEditEmail />

            {/* {users?.users_by_pk?.person && (
              <ProfileEdit user={users?.users_by_pk} />
            )} */}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Profile;
