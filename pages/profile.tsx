import { ElemButton } from "@/components/ElemButton";
import { ElemPhoto } from "@/components/ElemPhoto";
import { InputText } from "@/components/InputText";
import { InputTextarea } from "@/components/InputTextarea";
import { FC, useEffect, useState } from "react";
import { People, useGetPersonQuery } from "@/graphql/types";
import { ElemMyListsMenu } from "@/components/MyList/ElemMyListsMenu";
import { useAuth } from "@/hooks/useAuth";

type Props = {}

const Profile: FC<Props> = ({ }) => {
	const { user } = useAuth()
	const [person, setPerson] = useState<People>()
	const [editName, setEditName] = useState(false)
	const [editEmail, setEditEmail] = useState(false)
	const [editLocation, setEditLocation] = useState(false)
	const [editWebsite, setEditWebsite] = useState(false)
	const [editLinkedIn, setEditLinkedIn] = useState(false)
	const [editFacebook, setEditFacebook] = useState(false)
	const [editTwitter, setEditTwitter] = useState(false)
	const [editAbout, setEditAbout] = useState(false)
	const [editWorkspace, setEditWorkspace] = useState(false)

	const {
		data: people
	} = useGetPersonQuery({
		slug: 'sagar'
	})

	useEffect(() => {
		if (people)
			setPerson(people.people[0] as People)
	}, [people]);

	return (
		<div className="max-w-6xl px-4 pt-4 mx-auto sm:px-6 lg:px-8 lg:pt-10 mt-10">
			<div className="grid grid-cols-4 gap-4">
				<div className="col-span-1">
					<ElemMyListsMenu
						user={user}
					/>
				</div>

				<div className="col-span-3">
					<div className="max-w-6xl bg-white rounded-lg p-5">
						<div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
							<h2 className="text-dark-500 font-bold text-xl">Personal Profile</h2>
							<ElemButton btn="white" className="text-dark-500 font-bold  text-md" arrow>View Profile</ElemButton>
						</div>


						<div className="flex mt-3 mb-2 border-b border-gray-100 pb-3">
							<h2 className="text-dark-500 font-bold text-md w-40">Profile Image</h2>
							<div className="flex">
								<div className="ml-4">
									<ElemPhoto
										photo={person?.picture}
										wrapClass="flex items-center justify-center shrink-0 w-32 h-32 bg-white rounded-lg shadow-md mr-2 rounded-full"
										imgClass="object-fit max-w-full max-h-full rounded-full"
										imgAlt={'chia'}
									/>
								</div>
								<div className="ml-8 mt-5">
									<ul>
										<li className=" list-disc text-gray-400 font-Metropolis text-sm font-thin">Square images work best (at least 300 x 300 pixels) </li>
										<li className=" list-disc text-gray-400 font-metropolis text-sm font-thin">Crop your image before you upload</li>
										<li className=" list-disc text-gray-400 font-metropolis text-sm font-thin">Image upoloads are limited to 2MB</li>
										<li className=" list-disc text-gray-400 font-metropolis text-sm font-thin">Accepted image types JPG SVG AND PNG</li>
									</ul>
								</div>
							</div>
						</div>

						{
							!editName && <div className="flex  mt-3 mb-2 relative border-b border-gray-100 pb-3">
								<h2 className="text-dark-500 font-bold text-md w-40">Name</h2>
								<div>
									<h2 className="text-slate-600 text-md">{person?.name}</h2>
								</div>

								<button
									className="absolute right-0 text-md text-primary-500"
									onClick={() => setEditName(true)}
								>Edit</button>
							</div>
						}
						{/* hide content name */}
						{
							editName && <div className="flex  mt-3 mb-2 relative border-b border-gray-100 pb-3">
								<h2 className="text-dark-500 font-bold text-md w-40">Name</h2>
								<div>
									<div className="w-96">
										<InputText
											label="First Name"
											onChange={() => { }}
											value=""
											name=""
											placeholder="Bram"
											className="mb-4"
										/>
										<InputText
											label="Last Name"
											onChange={() => { }}
											value=""
											name=""
											placeholder="Cohen"
											className="mb-3" />

										<span className="text-slate-500 m font-thin text-md"><b className="font-bold text-slate-600">Note:</b> If you change your name on EdgeIn, you won’t be able to change it again for 60 days.</span>

										<div className="flex mt-3 mb-2">
											<ElemButton
												btn="primary"
												className="mr-2"
											>
												Change
											</ElemButton>
											<ElemButton
												btn="white"
											>
												Cancel
											</ElemButton>
										</div>
									</div>
								</div>
							</div>
						}

						{
							!editEmail && <div className="flex  mt-3 mb-2 relative border-b border-gray-100 pb-3">
								<h2 className="text-dark-500 font-bold text-md w-40">Email</h2>
								<div>
									<h2 className="text-slate-600 text-md">{person?.personal_email}</h2>
								</div>

								<button
									onClick={() => setEditEmail(true)}
									className="absolute right-0 text-md text-primary-500"
								>Edit</button>

							</div>
						}

						{/* hide content email */}
						{
							editEmail && <div className="flex  mt-3 mb-2 relative border-b border-gray-100 pb-3">
								<h2 className="text-dark-500 font-bold text-md w-40">Email</h2>
								<div>
									<div className="mt-8 w-96">
										<h2 className="text-md font-bold text-slate-600">Current Emails</h2>
										<div>
											<span className="block mt-1 text-sm font-semibold text-slate-600">Bram@gmail.com</span>
											<span className="mt-1 text-slate-500">primary</span>
										</div>

										<div className="mb-3">
											<span className="block mt-1 text-sm font-semibold text-slate-600">johndoe@gmail.com</span>
											<span className="mt-1 text-sm text-purple-800 cursor-pointer">Make Primary</span>.
											<span className="mt-1 text-sm ml-2 text-purple-800 cursor-pointer">Remove</span>
										</div>

										<InputText
											label="New Email"
											onChange={() => { }}
											value=""
											name=""
											placeholder="Cohen@gmail.com"
										/>

										<div className="flex mt-3 mb-2">
											<ElemButton
												btn="primary"
												className="mr-2"
											>
												Add
											</ElemButton>
											<ElemButton
												btn="white"
											>
												Cancel
											</ElemButton>
										</div>

									</div>
								</div>

							</div>
						}

						{
							!editLocation && <div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3">
								<h2 className="text-dark-500 font-bold text-md w-40">Location</h2>
								<div>
									<h2 className="text-slate-600 text-md">{person?.city}, {person?.country}</h2>
								</div>

								<button
									className="absolute right-0 text-md text-primary-500"
									onClick={() => setEditLocation(true)}
								>Edit</button>

							</div>
						}

						{/* hide content location */}
						{
							editLocation && <div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3">
								<h2 className="text-dark-500 font-bold text-md w-40">Location</h2>
								<div>
									<div className="w-96 ">
										<InputText
											label="City"
											onChange={() => { }}
											value=""
											name=""
											placeholder="San Francisco"
											className="mb-3"
										/>
										<InputText
											label="Country"
											onChange={() => { }}
											value=""
											name=""
											placeholder="United State"
											className="mb-3" />

										<div className="flex mt-3 mb-2">
											<ElemButton
												btn="primary"
												className="mr-2"
											>
												Save
											</ElemButton>
											<ElemButton
												btn="white"
											>
												Cancel
											</ElemButton>
										</div>

									</div>
								</div>

							</div>
						}

						{
							!editWebsite && <div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3">
								<h2 className="text-dark-500 font-bold text-md w-40">Website URl</h2>
								<div>
									<h2 className="text-slate-600 text-md">{person?.website_url}</h2>
								</div>

								<button
									className="absolute right-0 text-md text-primary-500"
									onClick={() => setEditWebsite(true)}
								>Edit</button>

							</div>
						}
						{/* hide content website */}
						{
							editWebsite && <div className="flex  mt-3 mb-2 relative border-b border-gray-100 pb-3">
								<h2 className="text-dark-500 font-bold text-md w-40">Website URL</h2>
								<div>
									<div className="w-96 ">
										<InputText
											onChange={() => { }}
											value=""
											name=""
											placeholder="www.brahm.com"
										/>

										<div className="flex mt-3 mb-2">
											<ElemButton
												btn="primary"
												className="mr-2"
											>
												Save
											</ElemButton>
											<ElemButton
												btn="white"
											>
												Cancel
											</ElemButton>
										</div>

									</div>
								</div>
							</div>
						}

						{
							!editLinkedIn && <div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3">
								<h2 className="text-dark-500 font-bold text-md w-40">LinkedIn URL</h2>
								<div>
									<h2 className="text-slate-600 text-md">{person?.linkedin}</h2>
								</div>

								<button
									className="absolute right-0 text-md text-primary-500"
									onClick={() => setEditLinkedIn(true)}
								>Edit</button>

							</div>
						}

						{/* hide content linkedin */}
						{
							editLinkedIn && <div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3">
								<h2 className="text-dark-500 font-bold text-md w-40">LinkedIn URL</h2>
								<div>
									<div className="w-96">
										<InputText

											onChange={() => { }}
											value=""
											name=""
											placeholder="https://linkedin.com"
										/>

										<div className="flex mt-3 mb-2">
											<ElemButton
												btn="primary"
												className="mr-2"
											>
												Save
											</ElemButton>
											<ElemButton
												btn="white"
											>
												Cancel
											</ElemButton>
										</div>

									</div>
								</div>
							</div>}

						{
							!editFacebook && <div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3">
								<h2 className="text-dark-500 font-bold text-md w-40">Facebook URL</h2>
								<div>
									<h2 className="text-slate-600 text-md">{person?.facebook_url}</h2>
								</div>

								<button
									className="absolute right-0 text-md text-primary-500"
									onClick={() => setEditFacebook(true)}
								>Edit</button>

							</div>
						}

						{/* hide content facebook*/}
						{
							editFacebook && <div className="flex  mt-3 mb-2 relative border-b border-gray-100 pb-3">
								<h2 className="text-dark-500 font-bold text-md w-40">Facebook URL</h2>
								<div>
									<div className="w-96">
										<InputText

											onChange={() => { }}
											value=""
											name=""
											placeholder="https://facebook.com"
										/>

										<div className="flex mt-3 mb-2">
											<ElemButton
												btn="primary"
												className="mr-2"
											>
												Save
											</ElemButton>
											<ElemButton
												btn="white"
											>
												Cancel
											</ElemButton>
										</div>

									</div>

								</div>
							</div>
						}

						{
							!editTwitter && < div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3">
								<h2 className="text-dark-500 font-bold text-md w-40">Twitter URL</h2>
								<div>
									<h2 className="text-slate-600 text-md">{person?.twitter_url}</h2>
								</div>

								<button
									onClick={() => setEditTwitter(true)}
									className="absolute right-0 text-md text-primary-500"
								>Edit</button>

							</div>
						}

						{/* hide content twitter*/}
						{
							editTwitter && <div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3">
								<h2 className="text-dark-500 font-bold text-md w-40">Twitter URL</h2>
								<div>
									<div className="w-96">
										<InputText

											onChange={() => { }}
											value=""
											name=""
											placeholder="https://twitter.com"
										/>

										<div className="flex mt-3 mb-2">
											<ElemButton
												btn="primary"
												className="mr-2"
											>
												Save
											</ElemButton>
											<ElemButton
												btn="white"
											>
												Cancel
											</ElemButton>
										</div>

									</div>

								</div>
							</div>
						}

						{
							!editAbout && <div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3">
								<h2 className="text-dark-500 font-bold text-md w-40">About You</h2>
								<div>
									<p className="text-slate-600 text-md">{person?.about}</p>
								</div>

								<button
									className="absolute right-0 text-md text-primary-500"
									onClick={() => setEditAbout(true)}
								>Edit</button>

							</div>
						}

						{/* hide content about*/}
						{
							editAbout && <div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3">
								<h2 className="text-dark-500 font-bold text-md w-40">About You</h2>
								<div>
									<div className="w-96 ">
										<InputTextarea
											rows={3}

										/>
										<div className="flex mt-3 mb-2">
											<ElemButton
												btn="primary"
												className="mr-2"
											>
												Save
											</ElemButton>
											<ElemButton
												btn="white"
											>
												Cancel
											</ElemButton>
										</div>

									</div>

								</div>
							</div>
						}

						{
							!editWorkspace && <div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3">
								<h2 className="text-dark-500 font-bold text-md w-40">Work</h2>
								<button className="absolute right-0 text-md text-primary-500">Add Workplace</button>

							</div>
						}
						{/* hide content work */}
						{
							editWorkspace && <div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3">
								<h2 className="text-dark-500 font-bold text-md w-40">Work</h2>

								<div className="w-96">
									<InputText
										label="Company"
										onChange={() => { }}
										value=""
										name=""
										placeholder="Chia"
										className="mb-3"
									/>
									<InputText
										label="position"
										onChange={() => { }}
										value=""
										name=""
										placeholder="Founder and CEO"
										className="mb-3"
									/>
									<InputText
										label="City"
										onChange={() => { }}
										value=""
										name=""
										placeholder="Sansfranciso bay USA"
										className="mb-3"
									/>
									<label className="text-slate-600 font-bold block ">Time Period</label>
									<div className="flex items-center gap-2">
										<input type="checkbox" /><span className="text-slate-500 text-md font-Metropolis"> I currently work here</span>
									</div>

									<div className="flex mt-3 mb-2">
										<ElemButton
											btn="primary"
											className="mr-2"
										>
											Save
										</ElemButton>
										<ElemButton
											btn="white"
										>
											Cancel
										</ElemButton>
									</div>
								</div>

								<button className="absolute right-0 text-md text-primary-500">Add Workplace</button>
							</div>
						}

						{
							person?.team_members.map((team_member) =>
								<div key={team_member.id} className="flex  mt-3 mb-2 relative border-b border-gray-100 pb-3">
									<span className="text-dark-500 font-bold text-md w-40"></span>
									<div className="flex">
										<ElemPhoto wrapClass="w-12 h-12 border p-1 rounded-md" photo={team_member.company?.logo} imgAlt="company logo" />

										<div className="ml-5">
											<h2 className="font-bold font-Metropolis text-md text-slate-600">{team_member.title}</h2>
											<span className="font-thin text-slate-500 ">{team_member.company?.name}</span>
											<p className="font-thin text-slate-500">August 2017 - Present . 5 yrs 1 mo <br /> San Francisco Cow Boy Area</p>
										</div>
									</div>

									<button className="absolute right-0 text-md text-primary-500">Edit</button>
								</div>
							)
						}

					</div>
				</div>

			</div>
		</div>
	);
}

export default Profile;
