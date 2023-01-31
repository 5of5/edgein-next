import { useState } from "react";
import {
	GetUserProfileQuery,
} from "@/graphql/types";
import { EditSection } from "@/components/Dashboard/EditSection";

type Props = {
  user: GetUserProfileQuery['users_by_pk']
};

export const ProfileEdit: React.FC<Props> = ({user}) => {
  const [editLocation, setEditLocation] = useState(false);
	const [editWebsite, setEditWebsite] = useState(false);
	const [editLinkedIn, setEditLinkedIn] = useState(false);
	const [editFacebook, setEditFacebook] = useState(false);
	const [editTwitter, setEditTwitter] = useState(false);
	const [editAbout, setEditAbout] = useState(false);

	return <>
    <EditSection
						heading="Location"
						right={
							!editLocation ? (
								// <button
								// 	onClick={() => setEditLocation(true)}
								// 	className="text-primary-500 hover:text-dark-500"
								// >
								// 	Edit Location
								// </button>
                <></>
							) : (
								<></>
							)
						}
					>
						{!editLocation ? (
							<p className="text-slate-600">
								{user?.person?.city}
								{user?.person?.city && user?.person?.country && <>,</>}
								{user?.person?.country}
							</p>
						) : (
							<div className="max-w-sm">
								{/* <InputText
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
								</div> */}
							</div>
						)}
					</EditSection>

					<EditSection
						heading="Website URL"
						right={
							!editWebsite ? (
								// <button
								// 	onClick={() => setEditWebsite(true)}
								// 	className="text-primary-500 hover:text-dark-500"
								// >
								// 	Edit Website
								// </button>
                <></>
							) : (
								<></>
							)
						}
					>
						{!editWebsite ? (
							<p className="text-slate-600">{user?.person?.website_url}</p>
						) : (
							<div className="max-w-sm">
								{/* <InputText
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
								</div> */}
							</div>
						)}
					</EditSection>

					<EditSection
						heading="LinkedIn URL"
						right={
							!editLinkedIn ? (
								// <button
								// 	onClick={() => setEditLinkedIn(true)}
								// 	className="text-primary-500 hover:text-dark-500"
								// >
								// 	Edit LinkedIn
								// </button>
                <></>
							) : (
								<></>
							)
						}
					>
						{!editLinkedIn ? (
							<p className="text-slate-600">{user?.person?.linkedin}</p>
						) : (
							<div className="max-w-sm">
								{/* <InputText
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
								</div> */}
							</div>
						)}
					</EditSection>

					<EditSection
						heading="Facebook URL"
						right={
							!editFacebook ? (
								// <button
								// 	onClick={() => setEditFacebook(true)}
								// 	className="text-primary-500 hover:text-dark-500"
								// >
								// 	Edit Facebook
								// </button>
                <></>
							) : (
								<></>
							)
						}
					>
						{!editFacebook ? (
							<p className="text-slate-600">{user?.person?.facebook_url}</p>
						) : (
							<div className="max-w-sm">
								{/* <InputText
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
								</div> */}
							</div>
						)}
					</EditSection>

					<EditSection
						heading="Twitter URL"
						right={
							!editTwitter ? (
								// <button
								// 	onClick={() => setEditTwitter(true)}
								// 	className="text-primary-500 hover:text-dark-500"
								// >
								// 	Edit Twitter
								// </button>
                <></>
							) : (
								<></>
							)
						}
					>
						{!editTwitter ? (
							<p className="text-slate-600">{user?.person?.twitter_url}</p>
						) : (
							<div className="max-w-sm">
								{/* <InputText
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
								</div> */}
							</div>
						)}
					</EditSection>

					<EditSection
						heading="About You"
						right={
							!editAbout ? (
								// <button
								// 	onClick={() => setEditAbout(true)}
								// 	className="text-primary-500 hover:text-dark-500"
								// >
								// 	Edit About
								// </button>
                <></>
							) : (
								<></>
							)
						}
					>
						{!editAbout ? (
							<p className="text-slate-600">{user?.person?.about}</p>
						) : (
							<div className="max-w-lg">
								{/* <InputTextarea
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
								</div> */}
							</div>
						)}
					</EditSection>

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
        </>
}
