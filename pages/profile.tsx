import { ElemButton } from "@/components/ElemButton"
import { ElemPhoto } from "@/components/ElemPhoto"
import { InputText } from "@/components/InputText"
import { InputTextarea } from "@/components/InputTextarea"
import { FC, useEffect, useState } from "react"
import { People, useGetPersonQuery } from "@/graphql/types"
import { ElemMyListsMenu } from "@/components/MyList/ElemMyListsMenu"
import { useAuth } from "@/hooks/useAuth"
import { find } from "lodash"
import validator from 'validator'

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

	// fields
	const [firstName, setFirstName] = useState('')
	const [lasttName, setLastName] = useState('')
	const [email, setEmail] = useState<any[]>([])
	const [newEmail, setNewEmail] = useState('')
	const [city, setCity] = useState('')
	const [country, setCountry] = useState('')
	const [website, setWebsite] = useState('')
	const [linkedIn, setLinkedIn] = useState('')
	const [facebook, setFacebook] = useState('')
	const [twitter, setTwitter] = useState('')
	const [about, setAbout] = useState('')
	const [workspace, setWorkspace] = useState('')

	const {
		data: people
	} = useGetPersonQuery({
		slug: 'sagar'
	})

	useEffect(() => {
		if (people)
			setPerson(people.people[0] as People)
	}, [people]);

	useEffect(() => {
		if (person) {
			const nameFragments = person?.name?.split(' ')
			const firstName = nameFragments?.shift() || ''
			const lastName = nameFragments?.join(' ') || ''

			setFirstName(firstName)
			setLastName(lastName)
			setEmail(person?.email || [])
			setCity(person?.city || '')
			setCountry(person?.country || '')
			setWebsite(person?.website_url || '')
			setLinkedIn(person?.linkedin || '')
			setFacebook(person?.facebook_url || '')
			setTwitter(person?.twitter_url || '')
			setAbout(person?.about || '')
		}
	}, [person])

	const updateCall = async (payload: any) => {
		const resp = await fetch('/api/update_profile', {
			method: 'POST',
			body: JSON.stringify({
				id: person?.id,
				payload
			}),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			}
		})

		return resp.json()
	}

	const onSave = (entity: string) => async () => {

		if (entity === 'name') {
			const resp = await updateCall({
				name: `${firstName} ${lasttName}`,
			})
			setPerson(resp.result)
		}

		if (entity === 'email') {
			const exists = find(email, { email: newEmail })
			setEmail((prev: any) => {
				if (newEmail === '' || !validator.isEmail(newEmail)) return prev
				const temp = [...prev]

				if (!email) temp.push({ email: newEmail, isPrimary: false })
				setNewEmail('')
				return temp
			})

			const resp = await updateCall({
				email: exists ? email : [...email, { email: newEmail, isPrimary: false }]
			})

			setPerson(resp.result)
		}

		if (entity === 'website') {
			const resp = await updateCall({
				website_url: website
			})
			setPerson(resp.result)
		}

		if (entity === 'facebook') {
			const resp = await updateCall({
				facebook_url: facebook
			})
			setPerson(resp.result)
		}

		if (entity === 'twitter') {
			const resp = await updateCall({
				twitter_url: twitter
			})
			setPerson(resp.result)
		}

		if (entity === 'about') {
			const resp = await updateCall({
				about: about
			})
			setPerson(resp.result)
		}

		if (entity === 'linkedin') {
			const resp = await updateCall({
				linkedin: linkedIn
			})
			setPerson(resp.result)
		}

		if (entity === 'location') {
			const resp = await updateCall({
				city,
				country
			})
			setPerson(resp.result)
		}

	}

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


						<div className="mt-3 mb-2 border-b border-gray-100 pb-3 grid grid-cols-12 gap-2">
							<h2 className="text-dark-500 font-bold text-md col-span-3">Profile Image</h2>
							<div className="flex col-span-9">
								<div className="">
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
							!editName && <div className="mt-3 mb-2 relative border-b border-gray-100 pb-3 grid grid-cols-12 gap-2">
								<h2 className="text-dark-500 font-bold text-md col-span-3">Name</h2>

								<div className="col-span-8">
									<h2 className="text-slate-600 text-md">{person?.name}</h2>
								</div>

								<button
									className="text-md text-primary-500 col-span-1 text-right w-auto"
									onClick={() => setEditName(true)}
								>Edit</button>
							</div>
						}
						{/* hide content name */}
						{
							editName && <div className="mt-3 mb-2 relative border-b border-gray-100 pb-3 grid grid-cols-12">
								<h2 className="text-dark-500 font-bold text-md col-span-3">Name</h2>
								<div className="col-span-8">
									<div className="w-96">
										<InputText
											label="First Name"
											onChange={(e) => setFirstName(e.target.value)}
											value={firstName}
											name="first_name"
											placeholder="Bram"
											className="mb-4"
										/>
										<InputText
											label="Last Name"
											onChange={(e) => setLastName(e.target.value)}
											value={lasttName}
											name="last_name"
											placeholder="Cohen"
											className="mb-3"
										/>

										<span className="text-slate-500 m font-thin text-md"><b className="font-bold text-slate-600">Note:</b> If you change your name on EdgeIn, you won’t be able to change it again for 60 days.</span>

										<div className="flex mt-3 mb-2">
											<ElemButton
												btn="primary"
												className="mr-2"
												onClick={onSave('name')}
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
							!editEmail && <div className="mt-3 mb-2 relative border-b border-gray-100 pb-3 grid grid-cols-12 gap-2">
								<h2 className="text-dark-500 font-bold text-md col-span-3">Email</h2>
								<div className="col-span-8">
									{
										person?.email.map((email: any) => (
											<p
												key={email.email}
												className="text-slate-600 mb-2"
											>
												{email.email}
												{email.isPrimary && <b className="text-sm text-primary-500"> - Primary</b>}
											</p>
										))
									}
								</div>

								<button
									onClick={() => setEditEmail(true)}
									className="absolute right-0 text-md text-primary-500"
								>Edit</button>

							</div>
						}

						{/* hide content email */}
						{
							editEmail &&
							<div className="grid grid-cols-12 mt-3 mb-2 relative border-b border-gray-100 pb-3">
								<h2 className="text-dark-500 font-bold text-md col-span-3">Email</h2>
								<div className="col-span-8">
									<div className="w-96">
										<h2 className="text-md font-bold text-slate-600">Current Emails</h2>
										{
											email?.map((mail: any) => (
												<div key={mail.email} className="mb-2">
													<span className="block mt-1 text-sm font-semibold text-slate-600">{mail.email}</span>
													<span className="mt-1 text-slate-500 text-sm">{mail.isPrimary ? 'Primary' : ''}</span>
													{mail.isPrimary || <span className="mt-1 text-sm text-purple-800 cursor-pointer">Make Primary</span>}
													{mail.isPrimary || <span className="mt-1 text-sm ml-2 text-purple-800 cursor-pointer">Remove</span>}
												</div>
											))

										}

										<InputText
											label="New Email"
											onChange={(e) => {
												setNewEmail(e.target.value)
											}}
											value={newEmail}
											name="new-email"
											placeholder="Cohen@gmail.com"
										/>

										<div className="flex mt-3 mb-2">
											<ElemButton
												btn="primary"
												className="mr-2"
												onClick={onSave('email')}
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
							!editLocation && <div className="mt-3 mb-2 relative border-b border-gray-100 pb-3 grid grid-cols-12 gap-2">
								<h2 className="text-dark-500 font-bold text-md col-span-3">Location</h2>
								<div className="col-span-8">
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
							editLocation && <div className="grid grid-cols-12 mt-3 mb-2 relative border-b border-gray-100 pb-3">
								<h2 className="text-dark-500 font-bold text-md col-span-3">Location</h2>
								<div className="col-span-8">
									<div className="w-96 ">
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
											placeholder="United State"
											className="mb-3" />

										<div className="flex mt-3 mb-2">
											<ElemButton
												btn="primary"
												className="mr-2"
												onClick={onSave('location')}
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
							!editWebsite && <div className="mt-3 mb-2 relative border-b border-gray-100 pb-3 grid grid-cols-12 gap-2">
								<h2 className="text-dark-500 font-bold text-md col-span-3">Website URl</h2>
								<div className="col-span-8">
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
							editWebsite && <div className="grid grid-cols-12 mt-3 mb-2 relative border-b border-gray-100 pb-3">
								<h2 className="text-dark-500 font-bold text-md col-span-3">Website URL</h2>
								<div className="col-span-8">
									<div className="w-96 ">
										<InputText
											onChange={(e) => setWebsite(e.target.value)}
											value={website}
											name="website"
											placeholder="www.brahm.com"
										/>

										<div className="flex mt-3 mb-2">
											<ElemButton
												btn="primary"
												className="mr-2"
												onClick={onSave('website')}
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
							!editLinkedIn && <div className="mt-3 mb-2 relative border-b border-gray-100 pb-3 grid grid-cols-12 gap-2">
								<h2 className="text-dark-500 font-bold text-md col-span-3">LinkedIn URL</h2>
								<div className="col-span-8">
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
							editLinkedIn && <div className="grid grid-cols-12 mt-3 mb-2 relative border-b border-gray-100 pb-3">
								<h2 className="text-dark-500 font-bold text-md col-span-3">LinkedIn URL</h2>
								<div className="col-span-8">
									<div className="w-96">
										<InputText
											onChange={(e) => setLinkedIn(e.target.value)}
											value={linkedIn}
											name="linkedIn"
											placeholder="https://linkedin.com"
										/>

										<div className="flex mt-3 mb-2">
											<ElemButton
												btn="primary"
												className="mr-2"
												onClick={onSave('linkedin')}
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
							!editFacebook && <div className="mt-3 mb-2 relative border-b border-gray-100 pb-3 grid grid-cols-12 gap-2">
								<h2 className="text-dark-500 font-bold text-md col-span-3">Facebook URL</h2>
								<div className="col-span-8">
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
							editFacebook && <div className="grid grid-cols-12 mt-3 mb-2 relative border-b border-gray-100 pb-3">
								<h2 className="text-dark-500 font-bold text-md col-span-3">Facebook URL</h2>
								<div className="col-span-8">
									<div className="w-96">
										<InputText
											onChange={(e) => setFacebook(e.target.value)}
											value={facebook}
											name="facebook"
											placeholder="https://facebook.com"
										/>

										<div className="flex mt-3 mb-2">
											<ElemButton
												btn="primary"
												className="mr-2"
												onClick={onSave('facebook')}
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
							!editTwitter && < div className="mt-3 mb-2 relative border-b border-gray-100 pb-3 grid grid-cols-12 gap-2">
								<h2 className="text-dark-500 font-bold text-md col-span-3">Twitter URL</h2>
								<div className="col-span-8">
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
							editTwitter && <div className="grid grid-cols-12 mt-3 mb-2 relative border-b border-gray-100 pb-3">
								<h2 className="text-dark-500 font-bold text-md col-span-3">Twitter URL</h2>
								<div className="col-span-8">
									<div className="w-96">
										<InputText
											onChange={(e) => setTwitter(e.target.value)}
											value={twitter}
											name="twitter"
											placeholder="https://twitter.com"
										/>

										<div className="flex mt-3 mb-2">
											<ElemButton
												btn="primary"
												className="mr-2"
												onClick={onSave('twitter')}
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
							!editAbout && <div className="mt-3 mb-2 relative border-b border-gray-100 pb-3 grid grid-cols-12 gap-2">
								<h2 className="text-dark-500 font-bold text-md col-span-3">About You</h2>
								<div className="col-span-8">
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
							editAbout && <div className="grid grid-cols-12 mt-3 mb-2 relative border-b border-gray-100 pb-3">
								<h2 className="text-dark-500 font-bold text-md col-span-3">About You</h2>
								<div className="col-span-8">
									<div className="w-96 ">
										<InputTextarea
											rows={3}
											value={about}
											onChange={(e) => setAbout(e.target.value)}
										/>
										<div className="flex mt-3 mb-2">
											<ElemButton
												btn="primary"
												className="mr-2"
												onClick={onSave('about')}
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
							!editWorkspace && <div className="mt-3 mb-2 relative border-b border-gray-100 pb-3 grid grid-cols-12 gap-2">
								<h2 className="text-dark-500 font-bold text-md col-span-3">Work</h2>
								<button className="absolute right-0 text-md text-primary-500">Add Workplace</button>

							</div>
						}
						{/* hide content work */}
						{
							editWorkspace && <div className="grid grid-cols-12 gap-2 mt-3 mb-2 relative border-b border-gray-100 pb-3">
								<h2 className="text-dark-500 font-bold text-md col-span-3">Work</h2>

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
								<div key={team_member.id} className="grid grid-cols-12 gap-2">
									<div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3 col-span-8">
										<span className="text-dark-500 font-bold text-md col-span-3"></span>
										<div className="flex">
											<ElemPhoto wrapClass="w-12 h-12 border p-1 rounded-md" photo={team_member.company?.logo} imgAlt="company logo" />

											<div className="ml-5">
												<h2 className="font-bold font-Metropolis text-md text-slate-600">{team_member.title}</h2>
												<span className="font-thin text-slate-500 ">{team_member.company?.name}</span>
												<p className="font-thin text-slate-500">August 2017 - Present . 5 yrs 1 mo <br /> San Francisco Cow Boy Area</p>
											</div>
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
