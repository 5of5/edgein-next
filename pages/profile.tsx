import { ElemButton } from "@/components/ElemButton"
import { ElemPhoto } from "@/components/ElemPhoto"
import { InputText } from "@/components/InputText"
import { InputTextarea } from "@/components/InputTextarea"
import { ChangeEvent, FC, useEffect, useRef, useState } from "react"
import { GetCompaniesDocument, GetCompaniesQuery, People, Team_Members, useGetCompaniesQuery, useGetPersonQuery } from "@/graphql/types"
import { ElemMyListsMenu } from "@/components/MyList/ElemMyListsMenu"
import { useAuth } from "@/hooks/useAuth"
import { find, findIndex } from "lodash"
import validator from 'validator'
import { InputSelect } from "@/components/InputSelect"
import { getTimeOfWork, getWorkDurationFromAndTo, runGraphQl } from "@/utils"
import { IconProfilePictureUpload } from "@/components/Profile/IconFileUpload"
import { uploadFile, deleteFile } from '@/utils/fileFunctions';
import { InputDate } from "@/components/InputDate"
import { GetStaticProps } from "next"

const emptyTeamMember = {
	startDate: null,
	endDate: null,
	companyId: 0,
	position: null,
	positionType: null
}

type Props = {
	companiesDropdown: any
}

const Profile: FC<Props> = ({ companiesDropdown }) => {
	const { user } = useAuth()

	const fileInputRef = useRef<HTMLInputElement>(null)
	// const [companiesDropdown, setCompaniesDropdown] = useState<any[]>([])

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
	const [activeWorkspace, setActiveWorkspace] = useState(0)
	const [tmData, setTmData] = useState<any>(emptyTeamMember);

	// const {
	// 	data: companiesData,
	// } = useGetCompaniesQuery({
	// 	offset: 0,
	// 	where: { slug: { _neq: "" }, status: { _eq: "published" } },
	// 	limit: null
	// })

	// useEffect(() => {
	// 	if (companiesData)
	// 		setCompaniesDropdown(() => companiesData.companies.map((company) => ({ title: company.name, value: company.id })))
	// }, [companiesData])

	const {
		data: people
	} = useGetPersonQuery({
		slug: 'sagar'
	})

	// set person
	useEffect(() => {
		if (people)
			setPerson(people.people[0] as People)
	}, [people]);

	// set workspace data in edit mode
	useEffect(() => {
		if (activeWorkspace)
			setTmData((prev: any) => {
				const findTM = find(person?.team_members, { id: activeWorkspace })
				if (!findTM) return prev

				const selectedCompany = find(companiesDropdown, { value: findTM?.company?.id })
				const selectedPositionType = findTM?.function ? { title: `${findTM?.function?.charAt(0).toUpperCase()}${findTM?.function?.slice(1)}`, value: findTM?.function } : null
				const currentlyWorking = findTM.end_date ? false : true

				const temp = {
					...prev,
					companyId: selectedCompany,
					position: findTM?.title,
					positionType: selectedPositionType,
					startDate: findTM.start_date,
					endDate: findTM.end_date,
					currentlyWorking
				}
				return temp
			})
	}, [activeWorkspace, companiesDropdown, person?.team_members])

	const renderWorkspaceForm = (id?: number) => {
		return (
			<div className="grid grid-cols-12 gap-2 mt-3 mb-2 relative pb-3">
				<h2 className="text-dark-500 font-bold text-md col-span-3">Work</h2>

				<div className="col-span-7 flex flex-col">
					<label className="text-slate-600 font-bold block ">Company</label>
					<InputSelect
						placeholder="Company"
						onChange={setTMField('company')}
						value={tmData.companyId}
						className="mb-3 max-w-xs"
						options={companiesDropdown}
					/>
					<label className="text-slate-600 font-bold block ">Position Type (founder, investor, team member)</label>
					<InputSelect
						options={[
							{ title: 'Founder', value: 'founder' },
							{ title: 'Investor', value: 'investor' },
							{ title: 'Team member', value: 'team member' }
						]}
						placeholder="Position"
						className="mb-3 max-w-xs"
						value={tmData.positionType}
						onChange={setTMField('positionType')}
					/>
					<InputText
						label="Position"
						onChange={setTMField('position')}
						value={tmData.position}
						name="position"
						placeholder="Founder and CEO"
						className="mb-3 max-w-xs"
					/>
					<label className="text-slate-600 font-bold block ">Time Period</label>
					<div className="flex items-center gap-2">
						<input type="checkbox" onChange={setTMField('currentlyWorking')} checked={tmData.currentlyWorking} /><span className="text-slate-500 text-md font-Metropolis"> I currently work here</span>
					</div>

					<div className="grid grid-cols-3 gap-2 items-center w-full max-w-xs">
						<InputDate
							name="startDate"
							value={tmData.startDate}
							onChange={setTMField('startDate')}
							className="rounded-full col-span-3"
						/>
						<span className="text-center col-span-3">To</span>
						<InputDate
							className="rounded-full col-span-3"
							value={tmData.endDate}
							name="endDate"
							onChange={setTMField('endDate')}
							disabled={tmData.currentlyWorking}
						/>
					</div>

					<div className="flex mt-3 mb-2">
						<ElemButton
							btn="primary"
							className="mr-2"
							onClick={onSave('teamMember')}
						>
							Save
						</ElemButton>
						<ElemButton
							btn="white"
							onClick={() => {
								if (id) setActiveWorkspace(0)
								else setEditWorkspace(false)
							}}
						>
							Cancel
						</ElemButton>
					</div>
				</div>
			</div>
		)
	}

	const renderWorkspaceEditForm = (teamMember: Team_Members) => {
		return (
			<div key={teamMember.id} className="flex flex-col border-b border-gray-100">
				{
					activeWorkspace === teamMember.id || <div className="grid grid-cols-12 gap-2">
						<div className="flex mt-3 mb-2 pb-3 col-start-4 col-span-8">
							<span className="text-dark-500 font-bold text-md col-span-3"></span>
							<div className="flex">
								<ElemPhoto wrapClass="w-12 h-12 border p-1 rounded-md" photo={teamMember.company?.logo} imgAlt="company logo" />

								<div className="ml-5">
									<h2 className="font-bold font-Metropolis text-md text-slate-600">{teamMember.title}</h2>
									<span className="font-thin text-slate-500 ">{teamMember.company?.name}</span>
									<p className="font-thin text-slate-500"> {getWorkDurationFromAndTo(teamMember.start_date, teamMember.end_date)} . {getTimeOfWork(teamMember.start_date, teamMember.end_date)} <br /> {teamMember.company?.location}</p>
								</div>
							</div>
						</div>
						<button
							className="text-primary-500 col-span-1"
							onClick={() => setActiveWorkspace(teamMember.id)}
						>Edit</button>
					</div>
				}
				{
					activeWorkspace === teamMember.id &&
					renderWorkspaceForm(teamMember.id)
				}
			</div>
		)
	}

	// set profile data
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

	const updateCall = async (payload: any, type = 'profile') => {
		if (type === 'profile') {
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

		const resp = await fetch('/api/team_member', {
			method: 'POST',
			body: JSON.stringify({
				teammember: payload,
				personId: person?.id
			}),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			}
		})

		return resp.json()

	}

	const setTMField = (field: string) => (event: ChangeEvent<HTMLInputElement> | any) => {
		if (field === 'company') {
			setTmData((prev: any) => {
				const temp = { ...prev }

				temp['companyId'] = event

				return temp
			})
		}

		if (field === 'positionType') {
			setTmData((prev: any) => {
				const temp = { ...prev }
				temp['positionType'] = event

				if (event.value === 'founder') temp['founder'] = true
				else temp['founder'] = false

				return temp
			})
		}

		if (field === 'position') {
			setTmData((prev: any) => {
				const temp = { ...prev }

				temp['position'] = event.target.value

				return temp
			})
		}

		if (field === 'currentlyWorking') {
			setTmData((prev: any) => {
				const temp = { ...prev }
				if (event.target.checked) {
					temp['currentlyWorking'] = true
					temp['endDate'] = null
				} else {
					temp['currentlyWorking'] = false
				}

				return temp
			})
		}

		if (field === 'startDate') {
			setTmData((prev: any) => {
				const temp = { ...prev }

				temp['startDate'] = event.target.value

				return temp
			})
		}

		if (field === 'endDate') {
			setTmData((prev: any) => {
				const temp = { ...prev }

				temp['endDate'] = event.target.value

				return temp
			})
		}
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

		if (entity === 'teamMember') {
			const temp = { ...tmData }

			temp.companyId = temp.companyId.value
			temp.positionType = temp.positionType.value
			delete temp.currentlyWorking

			updateCall(temp, 'teammember')

			setActiveWorkspace(0)
			setEditWorkspace(false)
			setTmData(emptyTeamMember)
		}

	}

	const handleProfileEditClick = () => {
		// 👇️ open file input box on click of other element
		fileInputRef?.current?.click();
	};

	const onFileUpload = () => async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files ? event.target.files[0] : null
		if (!file) return

		const res = await uploadFile(file)

		deleteFile(person?.picture)

		const resp = await updateCall({ picture: res.file })

		setPerson(resp.result)

	}

	const makePrimary = (email: string) => async () => {
		const tempEmail = [...person?.email]

		const tempEmailIndex = findIndex(tempEmail, { email })

		tempEmail.splice(tempEmailIndex, 1)

		tempEmail.push({ email: person?.work_email })

		const resp = await updateCall({
			email: tempEmail,
			work_email: email,
		})

		setPerson(resp.result)
	}

	const removeEmail = (email: string) => async () => {
		const tempEmail = [...person?.email]

		const tempEmailIndex = findIndex(tempEmail, { email })

		tempEmail.splice(tempEmailIndex, 1)

		const resp = await updateCall({
			email: tempEmail,
		})

		setPerson(resp.result)
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
								<div className=" block relative">
									<ElemPhoto
										photo={person?.picture}
										wrapClass="flex items-center justify-center shrink-0 w-32 h-32 bg-white rounded-lg shadow-md mr-2 rounded-full"
										imgClass="object-fit max-w-full max-h-full rounded-full"
										imgAlt={person?.name}
									/>
									<span
										className="bg-gray-200 w-9 h-9 absolute flex items-center justify-center rounded-full bottom-0 right-0"
										role="button"
										onClick={handleProfileEditClick}
									>
										<IconProfilePictureUpload />
									</span>
									<input type="file" hidden={true} className="hidden" onChange={onFileUpload()} ref={fileInputRef} />
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
												onClick={() => setEditName(false)}
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
									<p
										className="text-slate-600 mb-2"
									>
										{person?.work_email}
										<b className="text-sm text-primary-500"> - Primary</b>
									</p>
									{
										person?.email.map((email: any) => (
											<p
												key={email.email}
												className="text-slate-600 mb-2"
											>
												{email.email}
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
										<div className="mb-2">
											<span className="block mt-1 text-sm font-semibold text-slate-600">{person?.work_email}</span>
											<span className="mt-1 text-slate-500 text-sm">Primary</span>
										</div>
										{
											email?.map((mail: any) => (
												<div key={mail.email} className="mb-2">
													<span className="block mt-1 text-sm font-semibold text-slate-600">{mail.email}</span>
													<span
														className="mt-1 text-sm text-purple-800 cursor-pointer"
														onClick={makePrimary(mail.email)}
													>
														Make Primary
													</span>
													<span
														className="mt-1 text-sm ml-2 text-purple-800 cursor-pointer"
														onClick={removeEmail(mail.email)}
													>
														Remove
													</span>
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
												onClick={() => setEditEmail(false)}
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
												onClick={() => setEditLocation(false)}
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
												onClick={() => setEditWebsite(false)}
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
												onClick={() => setEditLinkedIn(false)}
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
												onClick={() => setEditFacebook(false)}
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

									<InputText
										onChange={(e) => setTwitter(e.target.value)}
										value={twitter}
										name="twitter"
										placeholder="https://twitter.com"
										className="max-w-xs"
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
											onClick={() => setEditTwitter(false)}
										>
											Cancel
										</ElemButton>
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
									<InputTextarea
										rows={3}
										value={about}
										onChange={(e) => setAbout(e.target.value)}
										className="max-w-xs"
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
											onClick={() => setEditAbout(false)}
										>
											Cancel
										</ElemButton>
									</div>
								</div>
							</div>
						}

						{
							!editWorkspace && <div className="mt-3 mb-2 relative border-b border-gray-100 pb-3 grid grid-cols-12 gap-2">
								<h2 className="text-dark-500 font-bold text-md col-span-3">Work</h2>
								<button
									onClick={() => setEditWorkspace(true)}
									className="absolute right-0 text-md text-primary-500"
								>Add Workplace</button>

							</div>
						}
						{/* hide content work */}
						{
							editWorkspace &&
							renderWorkspaceForm()
						}

						{
							person?.team_members.map((teamMember) => renderWorkspaceEditForm(teamMember))
						}

					</div>
				</div>

			</div>
		</div>
	);
}

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
			companiesDropdown: companiesData?.companies.map((company) => ({ title: company.name, value: company.id })) || []
		},
	};
};

export default Profile;
