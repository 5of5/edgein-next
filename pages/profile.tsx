import { useAuth } from "../hooks/useAuth";
import Link from "next/link"
import { IconCrap } from "../components/reactions/IconCrap"
import { IconHot } from "../components/reactions/IconHot"
import { IconLike } from "../components/reactions/IconLike"
import { ElemButton } from "@/components/ElemButton";
import { ElemPhoto } from "@/components/ElemPhoto";
import person from "../images/person.png"
import company from "../images/company.png"
import Image from "next/image";
import { InputText } from "@/components/InputText";
import { InputTextarea } from "@/components/InputTextarea";
export default function Profile() {
	const { user, error, loading } = useAuth();

	return (
		<div className="max-w-6xl px-4 pt-4 mx-auto sm:px-6 lg:px-8 lg:pt-10 mt-10">
			<div className="grid grid-cols-4 gap-4">
				<div className="col-span-1">
					<h3 className="text-xl font-bold py-1 text-dark-500">My List</h3>
					<ul className="flex flex-col">
						<li
							className="py-2 text-slate-600 inline-flex items-center"
							role="button"
						>
							<Link href="" //href={`/lists/${hotId}`}
							>
								<a className="inline-flex items-center">
									<IconHot className="mr-1 w-7" /> Hot
								</a>
							</Link>
						</li>
						<li
							className="py-2 text-slate-600 inline-flex items-center"
							role="button">
							<Link href="" //href={`/lists/${likeId}`}
							>
								<a className="inline-flex items-center">
									<IconLike className="mr-1 w-7" /> Like
								</a>
							</Link>
						</li>
						<li
							className={`py-2 text-slate-600 inline-flex items-center`}
							role="button"
						>
							<Link href="" //href={`/lists/${crapId}`}
							>
								<a className="inline-flex items-center">
									<IconCrap className="mr-1 w-7" /> Crap

								</a>
							</Link>
						</li>

						{/* {renderMyCustomList()} */}
					</ul>
				</div>

				<div className="col-span-3">
					<div className="max-w-6xl bg-white rounded-lg p-5">
						<div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
							<h2 className="text-dark-500 font-bold text-xl">Personal Profile</h2>
							<ElemButton btn="white" className="text-dark-500 font-bold  text-md">View Profile</ElemButton>
						</div>
						{/* <hr></hr> */}

						<div className="flex mt-3 mb-2 border-b border-gray-100 pb-3">
							<h2 className="text-dark-500 font-bold text-md w-40">Profile Image</h2>
							<div className="flex">
								<div className="ml-4">
									<Image src={person} alt="person image">
									</Image>
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


						<div className="flex  mt-3 mb-2 relative border-b border-gray-100 pb-3">
							<h2 className="text-dark-500 font-bold text-md w-40">Name</h2>
							<div>
								<h2 className="text-slate-600 text-md">Bram Cohen</h2>
							</div>

							<button className="absolute right-0 text-md text-primary-500">Edit</button>
						</div>
						{/* hide content name */}
						<div className="flex  mt-3 mb-2 relative border-b border-gray-100 pb-3">
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
											btn="transparent"
										>
											Cancel
										</ElemButton>
									</div>
								</div>
							</div>
						</div>

						<div className="flex  mt-3 mb-2 relative border-b border-gray-100 pb-3">
							<h2 className="text-dark-500 font-bold text-md w-40">Email</h2>
							<div>
								<h2 className="text-slate-600 text-md">Bram@chai.net</h2>
							</div>

							<button className="absolute right-0 text-md text-primary-500">Edit</button>

						</div>

						{/* hide content email */}
						<div className="flex  mt-3 mb-2 relative border-b border-gray-100 pb-3">
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
											btn="transparent"
										>
											Cancel
										</ElemButton>
									</div>

								</div>
							</div>

						</div>

						<div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3">
							<h2 className="text-dark-500 font-bold text-md w-40">Location</h2>
							<div>
								<h2 className="text-slate-600 text-md">San Francisco, USA</h2>
							</div>

							<button className="absolute right-0 text-md text-primary-500">Edit</button>

						</div>

						{/* hide content location */}
						<div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3">
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
											btn="transparent"
										>
											Cancel
										</ElemButton>
									</div>

								</div>
							</div>

						</div>

						<div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3">
							<h2 className="text-dark-500 font-bold text-md w-40">Website URl</h2>
							<div>
								<h2 className="text-slate-600 text-md">www.bram.com</h2>
							</div>

							<button className="absolute right-0 text-md text-primary-500">Edit</button>

						</div>
						{/* hide content website */}
						<div className="flex  mt-3 mb-2 relative border-b border-gray-100 pb-3">
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
											btn="transparent"
										>
											Cancel
										</ElemButton>
									</div>

								</div>
							</div>
						</div>

						<div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3">
							<h2 className="text-dark-500 font-bold text-md w-40">LinkedIn URL</h2>
							<div>
								<h2 className="text-slate-600 text-md">https://linkedin.com</h2>
							</div>

							<button className="absolute right-0 text-md text-primary-500">Edit</button>

						</div>

						{/* hide content linkedin */}
						<div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3">
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
											btn="transparent"
										>
											Cancel
										</ElemButton>
									</div>

								</div>
							</div>
						</div>

						<div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3">
							<h2 className="text-dark-500 font-bold text-md w-40">Facebook URL</h2>
							<div>
								<h2 className="text-slate-600 text-md">https://facebook.com</h2>
							</div>

							<button className="absolute right-0 text-md text-primary-500">Edit</button>

						</div>

						{/* hide content facebook*/}
						<div className="flex  mt-3 mb-2 relative border-b border-gray-100 pb-3">
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
											btn="transparent"
										>
											Cancel
										</ElemButton>
									</div>

								</div>

							</div>
						</div>

						<div className="flex  mt-3 mb-2 relative">
							<h2 className="text-dark-500 font-bold text-md w-40">Twitter URL</h2>
							<div>
								<h2 className="text-slate-600 text-md">https://twitter.com</h2>
							</div>

							<button className="absolute right-0 text-md text-primary-500">Edit</button>

						</div>

						{/* hide content twitter*/}
						<div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3">
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
											btn="transparent"
										>
											Cancel
										</ElemButton>
									</div>

								</div>

							</div>
						</div>

						<div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3">
							<h2 className="text-dark-500 font-bold text-md w-40">About You</h2>
							<div>
								<h2 className="text-slate-600 text-md">brahm from usa working as a software enigneer</h2>
							</div>

							<button className="absolute right-0 text-md text-primary-500">Edit</button>

						</div>

						{/* hide content about*/}
						<div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3">
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
											btn="transparent"
										>
											Cancel
										</ElemButton>
									</div>

								</div>

							</div>
						</div>

						<div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3">
							<h2 className="text-dark-500 font-bold text-md w-40">Work</h2>
							<button className="absolute right-0 text-md text-primary-500">Add Workplace</button>

						</div>
						{/* hide content work */}
						<div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3">
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
								{/* <InputSelect
									options={[]}
								/> */}
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
										btn="transparent"
									>
										Cancel
									</ElemButton>
								</div>
							</div>

							<button className="absolute right-0 text-md text-primary-500">Add Workplace</button>
						</div>

						<div className="flex  mt-3 mb-2 relative border-b border-gray-100 pb-3">
							<span className="text-dark-500 font-bold text-md w-40"></span>
							<div className="flex">
								<ElemPhoto wrapClass="w-12 h-12 border p-1 rounded-md" photo={{"id":"attAtWZ0GvZoH3Htr","url":"https://dl.airtable.com/.attachments/7a766e52717adcc89b21cfde621ea132/abdfd0e7/SolriseFinance.jpg?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=af7a92ccf4154c59","size":4431,"type":"image/jpeg","width":200,"height":200,"filename":"Solrise Finance.jpg","thumbnails":{"full":{"url":"https://dl.airtable.com/.attachmentThumbnails/b74127d1260d940a4a8888ff0bc296de/08d24161?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=32e2c28bca27220e","width":3000,"height":3000},"large":{"url":"https://dl.airtable.com/.attachmentThumbnails/94859f1f52eb3dc9bb537d82b3852419/d40a82c0?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=d96a486ded492ce5","width":200,"height":200},"small":{"url":"https://dl.airtable.com/.attachmentThumbnails/dfa1bcf9842cefdae3d14bc01c58162e/d2c57666?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=2e1452e05d13f76d","width":36,"height":36}}}} imgAlt="company logo" />

								<div className="ml-5">
									<h2 className="font-bold font-Metropolis text-md text-slate-600">Chief Executive</h2>
									<span className="font-thin text-slate-500 ">Chai Project</span>
									<p className="font-thin text-slate-500">August 2017 - Present . 5 yrs 1 mo <br /> San Francisco Cow Boy Area</p>
								</div>
							</div>

							<button className="absolute right-0 text-md text-primary-500">Edit</button>
						</div>

						<div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3">
							<span className="text-dark-500 font-bold text-md w-40"></span>
							<div className="flex">
								<ElemPhoto wrapClass="w-12 h-12 border p-1 rounded-md" photo={{"id":"attAtWZ0GvZoH3Htr","url":"https://dl.airtable.com/.attachments/7a766e52717adcc89b21cfde621ea132/abdfd0e7/SolriseFinance.jpg?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=af7a92ccf4154c59","size":4431,"type":"image/jpeg","width":200,"height":200,"filename":"Solrise Finance.jpg","thumbnails":{"full":{"url":"https://dl.airtable.com/.attachmentThumbnails/b74127d1260d940a4a8888ff0bc296de/08d24161?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=32e2c28bca27220e","width":3000,"height":3000},"large":{"url":"https://dl.airtable.com/.attachmentThumbnails/94859f1f52eb3dc9bb537d82b3852419/d40a82c0?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=d96a486ded492ce5","width":200,"height":200},"small":{"url":"https://dl.airtable.com/.attachmentThumbnails/dfa1bcf9842cefdae3d14bc01c58162e/d2c57666?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=2e1452e05d13f76d","width":36,"height":36}}}} imgAlt="company logo" />
								<div className="ml-5">
									<h2 className="font-bold font-Metropolis text-md text-slate-600">Chief Executive</h2>
									<span className="font-thin text-slate-500 ">Chai Project</span>
									<p className="font-thin text-slate-500">August 2017 - Present . 5 yrs 1 mo <br /> San Francisco Cow Boy Area</p>
								</div>
							</div>

							<button className="absolute right-0 text-md text-primary-500">Edit</button>
						</div>

						<div className="flex  mt-3 mb-2 relative border-b border-gray-100 pb-3">
							<span className="text-dark-500 font-bold text-md w-40"></span>
							<div className="flex">
								<ElemPhoto wrapClass="w-12 h-12 border p-1 rounded-md" photo={{"id":"attAtWZ0GvZoH3Htr","url":"https://dl.airtable.com/.attachments/7a766e52717adcc89b21cfde621ea132/abdfd0e7/SolriseFinance.jpg?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=af7a92ccf4154c59","size":4431,"type":"image/jpeg","width":200,"height":200,"filename":"Solrise Finance.jpg","thumbnails":{"full":{"url":"https://dl.airtable.com/.attachmentThumbnails/b74127d1260d940a4a8888ff0bc296de/08d24161?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=32e2c28bca27220e","width":3000,"height":3000},"large":{"url":"https://dl.airtable.com/.attachmentThumbnails/94859f1f52eb3dc9bb537d82b3852419/d40a82c0?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=d96a486ded492ce5","width":200,"height":200},"small":{"url":"https://dl.airtable.com/.attachmentThumbnails/dfa1bcf9842cefdae3d14bc01c58162e/d2c57666?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=2e1452e05d13f76d","width":36,"height":36}}}} imgAlt="company logo" />

								<div className="ml-5">
									<h2 className="font-bold font-Metropolis text-md text-slate-600">Chief Executive</h2>
									<span className="font-thin text-slate-500 ">Chai Project</span>
									<p className="font-thin text-slate-500">August 2017 - Present . 5 yrs 1 mo <br /> San Francisco Cow Boy Area</p>
								</div>
							</div>

							<button className="absolute right-0 text-md text-primary-500">Edit</button>
						</div>

						<div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3">
							<span className="text-dark-500 font-bold text-md w-40"></span>
							<div className="flex">
								<ElemPhoto wrapClass="w-12 h-12 border p-1 rounded-md" photo={{"id":"attAtWZ0GvZoH3Htr","url":"https://dl.airtable.com/.attachments/7a766e52717adcc89b21cfde621ea132/abdfd0e7/SolriseFinance.jpg?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=af7a92ccf4154c59","size":4431,"type":"image/jpeg","width":200,"height":200,"filename":"Solrise Finance.jpg","thumbnails":{"full":{"url":"https://dl.airtable.com/.attachmentThumbnails/b74127d1260d940a4a8888ff0bc296de/08d24161?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=32e2c28bca27220e","width":3000,"height":3000},"large":{"url":"https://dl.airtable.com/.attachmentThumbnails/94859f1f52eb3dc9bb537d82b3852419/d40a82c0?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=d96a486ded492ce5","width":200,"height":200},"small":{"url":"https://dl.airtable.com/.attachmentThumbnails/dfa1bcf9842cefdae3d14bc01c58162e/d2c57666?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=2e1452e05d13f76d","width":36,"height":36}}}} imgAlt="company logo" />

								<div className="ml-5">
									<h2 className="font-bold font-Metropolis text-md text-slate-600">Chief Executive</h2>
									<span className="font-thin text-slate-500 ">Chai Project</span>
									<p className="font-thin text-slate-500">August 2017 - Present . 5 yrs 1 mo <br /> San Francisco Cow Boy Area</p>
								</div>
							</div>

							<button className="absolute right-0 text-md text-primary-500">Edit</button>
						</div>

						<div className="flex  mt-3 mb-2 relative border-b border-gray-100 pb-3">
							<span className="text-dark-500 font-bold text-md w-40"></span>
							<div className="flex">
								<ElemPhoto wrapClass="w-12 h-12 border p-1 rounded-md" photo={{"id":"attAtWZ0GvZoH3Htr","url":"https://dl.airtable.com/.attachments/7a766e52717adcc89b21cfde621ea132/abdfd0e7/SolriseFinance.jpg?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=af7a92ccf4154c59","size":4431,"type":"image/jpeg","width":200,"height":200,"filename":"Solrise Finance.jpg","thumbnails":{"full":{"url":"https://dl.airtable.com/.attachmentThumbnails/b74127d1260d940a4a8888ff0bc296de/08d24161?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=32e2c28bca27220e","width":3000,"height":3000},"large":{"url":"https://dl.airtable.com/.attachmentThumbnails/94859f1f52eb3dc9bb537d82b3852419/d40a82c0?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=d96a486ded492ce5","width":200,"height":200},"small":{"url":"https://dl.airtable.com/.attachmentThumbnails/dfa1bcf9842cefdae3d14bc01c58162e/d2c57666?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=2e1452e05d13f76d","width":36,"height":36}}}} imgAlt="company logo" />

								<div className="ml-5">
									<h2 className="font-bold font-Metropolis text-md text-slate-600">Chief Executive</h2>
									<span className="font-thin text-slate-500 ">Chai Project</span>
									<p className="font-thin text-slate-500">August 2017 - Present . 5 yrs 1 mo <br /> San Francisco Cow Boy Area</p>
								</div>
							</div>

							<button className="absolute right-0 text-md text-primary-500">Edit</button>
						</div>

					</div>
				</div>

			</div>
		</div>
	);
}
