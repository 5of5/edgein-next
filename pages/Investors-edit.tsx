import { useAuth } from "../hooks/useAuth";
import Link from "next/link"
import { IconCrap } from "../components/reactions/IconCrap"
import { IconHot } from "../components/reactions/IconHot"
import { IconLike } from "../components/reactions/IconLike"
import { ElemButton } from "@/components/ElemButton";
import { ElemPhoto } from "@/components/ElemPhoto";
import { IconChevronRight } from "@/components/Icons";
import company from "../images/company.png"
import Image from "next/image";
import { InputText } from "@/components/InputText";
import { InputTextarea } from "@/components/InputTextarea";
import { InputSelect } from "@/components/InputSelect";
import { IconCamera } from "@/components/IconCamera";

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
                    <div className="flex pl-6 justify-between items-center border-b-4 border-primary-500 pb-3">
                        <h2 className="text-xl font-bold font-Metropolis text-dark-950">
                            Edit IDEO CoLab Ventures
                        </h2>
                        <div>
                            <ElemButton btn="transparent" className="text-slate-300">Cancel</ElemButton>
                            <ElemButton btn="primary">Save Edits</ElemButton>
                        </div>
                    </div>

                    <div className="max-w-6xl flex justify-between items-center mt-16 bg-white rounded-lg p-5">
                        <div>
                            <p className="text-xl font-bold font-Metropolis text-dark-950">Do you work at IDEO CoLab Ventures?</p>
                            <p className="text-sm font-normal font-Metropolis">By verifying that you work here, you will be able to edit all fields on the Investor profile. </p>
                        </div>
                        <div>
                            <ElemButton btn="ol-primary">Verify Now <IconChevronRight className="w-4 h-4" /></ElemButton>
                        </div>
                    </div>

                    <div className="max-w-6xl mt-7 bg-white rounded-lg p-5">

                        <div className="border-b border-gray-100 pb-3">
                            <h2 className="text-xl font-bold font-Metropolis text-dark-950">
                                Overview
                            </h2>
                        </div>

                        {/* profile image */}
                        <div className="flex mt-4 mb-2 border-b border-gray-100 pb-3">
                            <h2 className="text-dark-500 font-bold text-md w-40">Profile Image*</h2>
                            <div className="flex">
                                <div className=" relative">
                                    <Image src={company} alt="person image">
                                    </Image>
                                    <span className="absolute right-0 bottom-2 cursor-pointer bg-gray-250 border-none rounded-3xl p-2"> <IconCamera /></span>
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

                        {/* name section */}
                        <div className="flex items-center mt-6 mb-2 border-b border-gray-100 pb-3">
                            <h2 className="text-dark-500 font-bold text-md w-40">Name*</h2>
                            <div className="w-96">
                                <InputText
                                    onChange={() => { }}
                                    value=""
                                    name=""
                                    placeholder="IDEO CoLab Ventures"
                                    className="placeholder:text-gray-500"

                                />
                            </div>
                        </div>

                        {/* description section */}
                        <div className="flex items-center mt-6 mb-2 border-b border-gray-100 pb-3">
                            <h2 className="text-dark-500 font-bold text-md w-40">Description*</h2>
                            <div className="w-96">
                                <InputTextarea

                                    placeholder="CoLab is IDEO's platform for collaborative impact. We connect organizations."
                                />
                            </div>



                        </div>


                        {/* investors Type */}
                        <div className="flex items-center mt-6 mb-2 border-b border-gray-100 pb-3">
                            <h2 className="text-dark-500 font-bold text-md w-40">Investor Type*</h2>
                            <div className="w-96">
                                <InputSelect
                                    options={[]}
                                    placeholder="Venture Capital"
                                    className="placeholder:text-gray-500"
                                />
                            </div>
                        </div>

                        {/* investor stage */}
                        <div className="flex items-center mt-6 mb-2 border-b border-gray-100 pb-3">
                            <h2 className="text-dark-500 font-bold text-md w-40">Investors Stage*</h2>
                            <div className="w-96">
                                <InputSelect
                                    options={[]}
                                    className=""
                                    placeholder="Early Stage Venture"
                                />
                            </div>

                        </div>


                        {/* found date */}
                        <div className="flex items-center mt-6 mb-2 border-b border-gray-100 pb-3">
                            <h2 className="text-dark-500 font-bold text-md w-40">Founded Date*</h2>
                            <div className="w-96 ">
                                <InputSelect
                                    options={[]}
                                    className="text-gray-100"
                                    placeholder="Layer 1 programmable/Blockchain/Netw..."
                                />

                            </div>
                        </div>

                        {/* Location  */}
                        <div className="flex items-center mt-6 mb-2 border-b border-gray-100 pb-3">
                            <h2 className="text-dark-500 font-bold text-md w-40">Location</h2>
                            <div className="w-96">
                                <InputText
                                    onChange={() => { }}
                                    value=""
                                    name=""
                                    placeholder="Cambridge"
                                    label="City"
                                    className="placeholder:text-gray-500 mb-5"
                                />
                                <InputText
                                    onChange={() => { }}
                                    value=""
                                    name=""
                                    placeholder="United State"
                                    label="Country"
                                    className="placeholder:text-gray-500"
                                />
                            </div>
                        </div>

                        {/* employee  */}
                        <div className="flex items-center mt-6 mb-2 border-b border-gray-100 pb-3">
                            <h2 className="text-dark-500 font-bold text-md w-40">Number of Employees</h2>
                            <div className="w-96">
                                <InputText
                                    onChange={() => { }}
                                    value=""
                                    name=""
                                    placeholder="24"
                                    className="placeholder:text-gray-500"
                                />
                            </div>
                        </div>


                        {/* website section */}
                        <div className="flex items-center mt-6 mb-2 border-b border-gray-100 pb-3">
                            <h2 className="text-dark-500 font-bold text-md w-40">Website URL*</h2>
                            <div className="w-96">
                                <InputText
                                    onChange={() => { }}
                                    value=""
                                    name=""
                                    placeholder="https://www.website.com"
                                    className="placeholder:text-gray-500"
                                />
                            </div>
                        </div>

                        {/* LinkedIn section */}
                        <div className="flex items-center mt-6 mb-2 border-b border-gray-100 pb-3">
                            <h2 className="text-dark-500 font-bold text-md w-40">LinkedIN URL</h2>
                            <div className="w-96">
                                <InputText
                                    onChange={() => { }}
                                    value=""
                                    name=""
                                    placeholder="https://linkedin.com"
                                    className="placeholder:text-gray-500"
                                />
                            </div>
                        </div>

                        {/* tWitter section */}
                        <div className="flex items-center mt-6 mb-2 border-b border-gray-100 pb-3">
                            <h2 className="text-dark-500 font-bold text-md w-40">Twitter URL</h2>
                            <div className="w-96">
                                <InputText
                                    onChange={() => { }}
                                    value=""
                                    name=""
                                    className="placeholder:text-gray-500"
                                    placeholder="https://twitter.com"
                                />
                            </div>
                        </div>

                        {/* discord section */}
                        <div className="flex items-center mt-6 mb-2 border-b border-gray-100 pb-3">
                            <h2 className="text-dark-500 font-bold text-md w-40">Discord URL</h2>
                            <div className="w-96">
                                <InputText
                                    onChange={() => { }}
                                    value=""
                                    name=""
                                    placeholder="https://discord.com"
                                    className="placeholder:text-gray-500"
                                />
                            </div>
                        </div>


                        {/* glassdoor section */}
                        <div className="flex items-center mt-6 mb-2 border-b border-gray-100 pb-3">
                            <h2 className="text-dark-500 font-bold text-md w-40">Glassdoor URL</h2>
                            <div className="w-96">
                                <InputText
                                    onChange={() => { }}
                                    value=""
                                    name=""
                                    placeholder="https://glassdoor.com"
                                    className="placeholder:text-gray-500"
                                />
                            </div>
                        </div>


                        {/* career section */}
                        <div className="flex items-center mt-6 mb-2 border-b border-gray-100 pb-3">
                            <h2 className="text-dark-500 font-bold text-md w-40">Careers URL</h2>
                            <div className="w-96">
                                <InputText
                                    onChange={() => { }}
                                    value=""
                                    name=""
                                    placeholder="https://careers.com"
                                    className="placeholder:text-gray-500"


                                />
                            </div>
                        </div>


                    </div>

                    {/* Team section starts here.. */}
                    <div className="max-w-6xl mt-7 bg-white rounded-lg p-5">

                        <div className="border-b border-gray-100 pb-3">
                            <h2 className="text-xl font-bold font-Metropolis text-dark-950">
                                Team
                            </h2>
                        </div>

                        <div className="flex justify-between items-center mt-2 mb-5">
                            <h2 className="text-dark-500 font-bold font-Metropolis text-md">Employees</h2>
                            <span className="text-md font-normal text-primary-500 font-Metropolis">Add Employee</span>
                        </div>

                        <div className=" w-full border border-slate-200 rounded-lg overflow-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-sm border-b border-slate-200">
                                        <th className="px-1 py-1 ">Name</th>
                                        <th className="px-1 py-1">Tittle</th>
                                        <th className="px-1 py-1">Start Date</th>
                                        <th className="px-1 py-1">End Date</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td className="px-1 inline-flex items-center py-2">
                                            <ElemPhoto
                                                photo={{ "id": "atth6wpfA28Sqr81L", "url": "https://dl.airtable.com/.attachments/1e1ee497cce1959f1829b93f30a42b97/2e946d55/dc4282d28bdc3cd4dfa7f9e6df51ad0d.jpeg-resized?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=29a47a97b41d9c3b", "size": 2450, "type": "image/jpeg", "width": 128, "height": 128, "filename": "dc4282d28bdc3cd4dfa7f9e6df51ad0d.jpeg-resized", "thumbnails": { "full": { "url": "https://dl.airtable.com/.attachmentThumbnails/81028f5f35feea9f4d57de41b8586fea/bf7513bc?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=d987c3990248627b", "width": 3000, "height": 3000 }, "large": { "url": "https://dl.airtable.com/.attachmentThumbnails/b7a60acdbd21c915bd894e942fdcc06e/f7d0434c?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=bdf9a62b7629758b", "width": 128, "height": 128 }, "small": { "url": "https://dl.airtable.com/.attachmentThumbnails/77705b2245120e1326ad124ffdf936de/9cf84af8?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=4401fb727ecf3cd7", "width": 36, "height": 36 } } }}
                                                wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white rounded-lg shadow-md mr-2"
                                                imgClass="object-fit max-w-full max-h-full"
                                                imgAlt={'chia'}
                                            />
                                            <span className="text-md font-Metropolis font-normal text-dark-500">Brahm Cohen</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <p>Founder and CEO</p>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>2017</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>-</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <div className="text-md text-primary-500">Edit</div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-1 inline-flex items-center py-2">
                                            <ElemPhoto
                                                photo={{ "id": "atth6wpfA28Sqr81L", "url": "https://dl.airtable.com/.attachments/1e1ee497cce1959f1829b93f30a42b97/2e946d55/dc4282d28bdc3cd4dfa7f9e6df51ad0d.jpeg-resized?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=29a47a97b41d9c3b", "size": 2450, "type": "image/jpeg", "width": 128, "height": 128, "filename": "dc4282d28bdc3cd4dfa7f9e6df51ad0d.jpeg-resized", "thumbnails": { "full": { "url": "https://dl.airtable.com/.attachmentThumbnails/81028f5f35feea9f4d57de41b8586fea/bf7513bc?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=d987c3990248627b", "width": 3000, "height": 3000 }, "large": { "url": "https://dl.airtable.com/.attachmentThumbnails/b7a60acdbd21c915bd894e942fdcc06e/f7d0434c?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=bdf9a62b7629758b", "width": 128, "height": 128 }, "small": { "url": "https://dl.airtable.com/.attachmentThumbnails/77705b2245120e1326ad124ffdf936de/9cf84af8?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=4401fb727ecf3cd7", "width": 36, "height": 36 } } }}
                                                wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white rounded-lg shadow-md mr-2"
                                                imgClass="object-fit max-w-full max-h-full"
                                                imgAlt={'chia'}
                                            />
                                            <span className="text-md font-Metropolis font-normal text-dark-500">Brahm Cohen</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <p>Founder and CEO</p>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>2017</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>-</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <div className="text-md text-primary-500">Edit</div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-1 inline-flex items-center py-2">
                                            <ElemPhoto
                                                photo={{ "id": "atth6wpfA28Sqr81L", "url": "https://dl.airtable.com/.attachments/1e1ee497cce1959f1829b93f30a42b97/2e946d55/dc4282d28bdc3cd4dfa7f9e6df51ad0d.jpeg-resized?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=29a47a97b41d9c3b", "size": 2450, "type": "image/jpeg", "width": 128, "height": 128, "filename": "dc4282d28bdc3cd4dfa7f9e6df51ad0d.jpeg-resized", "thumbnails": { "full": { "url": "https://dl.airtable.com/.attachmentThumbnails/81028f5f35feea9f4d57de41b8586fea/bf7513bc?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=d987c3990248627b", "width": 3000, "height": 3000 }, "large": { "url": "https://dl.airtable.com/.attachmentThumbnails/b7a60acdbd21c915bd894e942fdcc06e/f7d0434c?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=bdf9a62b7629758b", "width": 128, "height": 128 }, "small": { "url": "https://dl.airtable.com/.attachmentThumbnails/77705b2245120e1326ad124ffdf936de/9cf84af8?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=4401fb727ecf3cd7", "width": 36, "height": 36 } } }}
                                                wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white rounded-lg shadow-md mr-2"
                                                imgClass="object-fit max-w-full max-h-full"
                                                imgAlt={'chia'}
                                            />
                                            <span className="text-md font-Metropolis font-normal text-dark-500">Brahm Cohen</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <p>Founder and CEO</p>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>2017</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>-</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <div className="text-md text-primary-500">Edit</div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-1 inline-flex items-center py-2">
                                            <ElemPhoto
                                                photo={{ "id": "atth6wpfA28Sqr81L", "url": "https://dl.airtable.com/.attachments/1e1ee497cce1959f1829b93f30a42b97/2e946d55/dc4282d28bdc3cd4dfa7f9e6df51ad0d.jpeg-resized?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=29a47a97b41d9c3b", "size": 2450, "type": "image/jpeg", "width": 128, "height": 128, "filename": "dc4282d28bdc3cd4dfa7f9e6df51ad0d.jpeg-resized", "thumbnails": { "full": { "url": "https://dl.airtable.com/.attachmentThumbnails/81028f5f35feea9f4d57de41b8586fea/bf7513bc?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=d987c3990248627b", "width": 3000, "height": 3000 }, "large": { "url": "https://dl.airtable.com/.attachmentThumbnails/b7a60acdbd21c915bd894e942fdcc06e/f7d0434c?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=bdf9a62b7629758b", "width": 128, "height": 128 }, "small": { "url": "https://dl.airtable.com/.attachmentThumbnails/77705b2245120e1326ad124ffdf936de/9cf84af8?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=4401fb727ecf3cd7", "width": 36, "height": 36 } } }}
                                                wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white rounded-lg shadow-md mr-2"
                                                imgClass="object-fit max-w-full max-h-full"
                                                imgAlt={'chia'}
                                            />
                                            <span className="text-md font-Metropolis font-normal text-dark-500">Brahm Cohen</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <p>Founder and CEO</p>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>2017</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>-</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <div className="text-md text-primary-500">Edit</div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-1 inline-flex items-center py-2">
                                            <ElemPhoto
                                                photo={{ "id": "atth6wpfA28Sqr81L", "url": "https://dl.airtable.com/.attachments/1e1ee497cce1959f1829b93f30a42b97/2e946d55/dc4282d28bdc3cd4dfa7f9e6df51ad0d.jpeg-resized?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=29a47a97b41d9c3b", "size": 2450, "type": "image/jpeg", "width": 128, "height": 128, "filename": "dc4282d28bdc3cd4dfa7f9e6df51ad0d.jpeg-resized", "thumbnails": { "full": { "url": "https://dl.airtable.com/.attachmentThumbnails/81028f5f35feea9f4d57de41b8586fea/bf7513bc?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=d987c3990248627b", "width": 3000, "height": 3000 }, "large": { "url": "https://dl.airtable.com/.attachmentThumbnails/b7a60acdbd21c915bd894e942fdcc06e/f7d0434c?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=bdf9a62b7629758b", "width": 128, "height": 128 }, "small": { "url": "https://dl.airtable.com/.attachmentThumbnails/77705b2245120e1326ad124ffdf936de/9cf84af8?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=4401fb727ecf3cd7", "width": 36, "height": 36 } } }}
                                                wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white rounded-lg shadow-md mr-2"
                                                imgClass="object-fit max-w-full max-h-full"
                                                imgAlt={'chia'}
                                            />
                                            <span className="text-md font-Metropolis font-normal text-dark-500">Brahm Cohen</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <p>Founder and CEO</p>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>2017</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>-</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <div className="text-md text-primary-500">Edit</div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-1 inline-flex items-center py-2">
                                            <ElemPhoto
                                                photo={{ "id": "atth6wpfA28Sqr81L", "url": "https://dl.airtable.com/.attachments/1e1ee497cce1959f1829b93f30a42b97/2e946d55/dc4282d28bdc3cd4dfa7f9e6df51ad0d.jpeg-resized?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=29a47a97b41d9c3b", "size": 2450, "type": "image/jpeg", "width": 128, "height": 128, "filename": "dc4282d28bdc3cd4dfa7f9e6df51ad0d.jpeg-resized", "thumbnails": { "full": { "url": "https://dl.airtable.com/.attachmentThumbnails/81028f5f35feea9f4d57de41b8586fea/bf7513bc?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=d987c3990248627b", "width": 3000, "height": 3000 }, "large": { "url": "https://dl.airtable.com/.attachmentThumbnails/b7a60acdbd21c915bd894e942fdcc06e/f7d0434c?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=bdf9a62b7629758b", "width": 128, "height": 128 }, "small": { "url": "https://dl.airtable.com/.attachmentThumbnails/77705b2245120e1326ad124ffdf936de/9cf84af8?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=4401fb727ecf3cd7", "width": 36, "height": 36 } } }}
                                                wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white rounded-lg shadow-md mr-2"
                                                imgClass="object-fit max-w-full max-h-full"
                                                imgAlt={'chia'}
                                            />
                                            <span className="text-md font-Metropolis font-normal text-dark-500">Brahm Cohen</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <p>Founder and CEO</p>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>2017</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>-</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <div className="text-md text-primary-500">Edit</div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-1 inline-flex items-center py-2">
                                            <ElemPhoto
                                                photo={{ "id": "atth6wpfA28Sqr81L", "url": "https://dl.airtable.com/.attachments/1e1ee497cce1959f1829b93f30a42b97/2e946d55/dc4282d28bdc3cd4dfa7f9e6df51ad0d.jpeg-resized?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=29a47a97b41d9c3b", "size": 2450, "type": "image/jpeg", "width": 128, "height": 128, "filename": "dc4282d28bdc3cd4dfa7f9e6df51ad0d.jpeg-resized", "thumbnails": { "full": { "url": "https://dl.airtable.com/.attachmentThumbnails/81028f5f35feea9f4d57de41b8586fea/bf7513bc?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=d987c3990248627b", "width": 3000, "height": 3000 }, "large": { "url": "https://dl.airtable.com/.attachmentThumbnails/b7a60acdbd21c915bd894e942fdcc06e/f7d0434c?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=bdf9a62b7629758b", "width": 128, "height": 128 }, "small": { "url": "https://dl.airtable.com/.attachmentThumbnails/77705b2245120e1326ad124ffdf936de/9cf84af8?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=4401fb727ecf3cd7", "width": 36, "height": 36 } } }}
                                                wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white rounded-lg shadow-md mr-2"
                                                imgClass="object-fit max-w-full max-h-full"
                                                imgAlt={'chia'}
                                            />
                                            <span className="text-md font-Metropolis font-normal text-dark-500">Brahm Cohen</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <p>Founder and CEO</p>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>2017</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>-</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <div className="text-md text-primary-500">Edit</div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-1 inline-flex items-center py-2">
                                            <ElemPhoto
                                                photo={{ "id": "atth6wpfA28Sqr81L", "url": "https://dl.airtable.com/.attachments/1e1ee497cce1959f1829b93f30a42b97/2e946d55/dc4282d28bdc3cd4dfa7f9e6df51ad0d.jpeg-resized?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=29a47a97b41d9c3b", "size": 2450, "type": "image/jpeg", "width": 128, "height": 128, "filename": "dc4282d28bdc3cd4dfa7f9e6df51ad0d.jpeg-resized", "thumbnails": { "full": { "url": "https://dl.airtable.com/.attachmentThumbnails/81028f5f35feea9f4d57de41b8586fea/bf7513bc?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=d987c3990248627b", "width": 3000, "height": 3000 }, "large": { "url": "https://dl.airtable.com/.attachmentThumbnails/b7a60acdbd21c915bd894e942fdcc06e/f7d0434c?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=bdf9a62b7629758b", "width": 128, "height": 128 }, "small": { "url": "https://dl.airtable.com/.attachmentThumbnails/77705b2245120e1326ad124ffdf936de/9cf84af8?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=4401fb727ecf3cd7", "width": 36, "height": 36 } } }}
                                                wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white rounded-lg shadow-md mr-2"
                                                imgClass="object-fit max-w-full max-h-full"
                                                imgAlt={'chia'}
                                            />
                                            <span className="text-md font-Metropolis font-normal text-dark-500">Brahm Cohen</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <p>Founder and CEO</p>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>2017</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>-</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <div className="text-md text-primary-500">Edit</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div>
                            <ElemButton
                                btn="ol-primary"
                                className="mt-3"
                            >Add Employee
                            </ElemButton>
                        </div>
                    </div>

                    {/* Investments round */}
                    <div className="max-w-6xl mt-7 bg-white rounded-lg p-5">

                        <div className="border-b border-gray-100 pb-3">
                            <h2 className="text-xl font-bold font-Metropolis text-dark-950">
                                Investment Rounds
                            </h2>
                        </div>

                        <div className="mt-2 mb-5">
                            <h2 className="text-dark-500 font-bold font-Metropolis text-md">All Investments</h2>
                        </div>

                        <div className=" w-full border border-slate-200 rounded-lg overflow-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-sm border-b border-slate-200">
                                        <th className="px-1 py-1 ">Date</th>
                                        <th className="px-1 py-1">Organization</th>
                                        <th className="px-1 py-1">Round Type</th>
                                        <th className="px-1 py-1">Money Raised</th>
                                        <th className="px-1 py-1">Valuation</th>
                                        <th className="px-1 py-1">Amount Invested</th>

                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td className="px-1  py-2">

                                            <span className="text-md font-Metropolis font-normal text-dark-500">August 18,2022</span>
                                        </td>
                                        <td className="px-1 inline-flex items-center py-2">
                                            <ElemPhoto
                                                photo={{ "id": "attSDgh43uoIah6dQ", "url": "https://dl.airtable.com/.attachments/a47cc14d5d2fd301122e7099779b0458/87b4b8c5/Rlink.jpeg-resized?ts=1658363797&userId=usr7CWMWLCRhTmk83&cs=ee1e64b47b6d57b1", "size": 2554, "type": "image/jpeg", "width": 128, "height": 128, "filename": "Rlink.jpeg-resized", "thumbnails": { "full": { "url": "https://dl.airtable.com/.attachmentThumbnails/4305db262448e3c8d3c0522cab7e1378/2a62eff5?ts=1658363797&userId=usr7CWMWLCRhTmk83&cs=e992f1e19eb126d5", "width": 3000, "height": 3000 }, "large": { "url": "https://dl.airtable.com/.attachmentThumbnails/fd5ea16b1afa3ee67c0b44df73ba1fcf/24261b74?ts=1658363797&userId=usr7CWMWLCRhTmk83&cs=028f3724bfaa34ac", "width": 128, "height": 128 }, "small": { "url": "https://dl.airtable.com/.attachmentThumbnails/9a248fa4a4cbd4469c15f692d1355d99/a3723f7f?ts=1658363797&userId=usr7CWMWLCRhTmk83&cs=a0a994a41ac7b8d1", "width": 36, "height": 36 } } }}
                                                wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white rounded-lg shadow-md mr-2"
                                                imgClass="object-fit max-w-full max-h-full"
                                                imgAlt={'chia'}
                                            />
                                            <span className="text-md font-Metropolis font-normal text-dark-500">Rlink</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>Seed </span>
                                        </td>
                                        <td className="px-1 py-2 text-sm font-Metropolis font-normal text-dark-500">
                                            <p className="">$4,40,00,000 </p>

                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>- </span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>- </span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <div className="text-md text-primary-500">Edit</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-1  py-2">

                                            <span className="text-md font-Metropolis font-normal text-dark-500">August 18,2022</span>
                                        </td>
                                        <td className="px-1 inline-flex items-center py-2">
                                            <ElemPhoto
                                                photo={{ "id": "atth6wpfA28Sqr81L", "url": "https://dl.airtable.com/.attachments/1e1ee497cce1959f1829b93f30a42b97/2e946d55/dc4282d28bdc3cd4dfa7f9e6df51ad0d.jpeg-resized?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=29a47a97b41d9c3b", "size": 2450, "type": "image/jpeg", "width": 128, "height": 128, "filename": "dc4282d28bdc3cd4dfa7f9e6df51ad0d.jpeg-resized", "thumbnails": { "full": { "url": "https://dl.airtable.com/.attachmentThumbnails/81028f5f35feea9f4d57de41b8586fea/bf7513bc?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=d987c3990248627b", "width": 3000, "height": 3000 }, "large": { "url": "https://dl.airtable.com/.attachmentThumbnails/b7a60acdbd21c915bd894e942fdcc06e/f7d0434c?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=bdf9a62b7629758b", "width": 128, "height": 128 }, "small": { "url": "https://dl.airtable.com/.attachmentThumbnails/77705b2245120e1326ad124ffdf936de/9cf84af8?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=4401fb727ecf3cd7", "width": 36, "height": 36 } } }}
                                                wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white rounded-lg shadow-md mr-2"
                                                imgClass="object-fit max-w-full max-h-full"
                                                imgAlt={'chia'}
                                            />
                                            <span className="text-md font-Metropolis font-normal text-dark-500">Nifty Comedian</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>Seed </span>
                                        </td>
                                        <td className="px-1 py-2 text-sm font-Metropolis font-normal text-dark-500">
                                            <p className="">$4,40,00,000 </p>

                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>- </span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>- </span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <div className="text-md text-primary-500">Edit</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-1  py-2">

                                            <span className="text-md font-Metropolis font-normal text-dark-500">August 18,2022</span>
                                        </td>
                                        <td className="px-1 inline-flex items-center py-2">
                                            <ElemPhoto
                                                photo={{ "id": "attSDgh43uoIah6dQ", "url": "https://dl.airtable.com/.attachments/a47cc14d5d2fd301122e7099779b0458/87b4b8c5/Rlink.jpeg-resized?ts=1658363797&userId=usr7CWMWLCRhTmk83&cs=ee1e64b47b6d57b1", "size": 2554, "type": "image/jpeg", "width": 128, "height": 128, "filename": "Rlink.jpeg-resized", "thumbnails": { "full": { "url": "https://dl.airtable.com/.attachmentThumbnails/4305db262448e3c8d3c0522cab7e1378/2a62eff5?ts=1658363797&userId=usr7CWMWLCRhTmk83&cs=e992f1e19eb126d5", "width": 3000, "height": 3000 }, "large": { "url": "https://dl.airtable.com/.attachmentThumbnails/fd5ea16b1afa3ee67c0b44df73ba1fcf/24261b74?ts=1658363797&userId=usr7CWMWLCRhTmk83&cs=028f3724bfaa34ac", "width": 128, "height": 128 }, "small": { "url": "https://dl.airtable.com/.attachmentThumbnails/9a248fa4a4cbd4469c15f692d1355d99/a3723f7f?ts=1658363797&userId=usr7CWMWLCRhTmk83&cs=a0a994a41ac7b8d1", "width": 36, "height": 36 } } }}
                                                wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white rounded-lg shadow-md mr-2"
                                                imgClass="object-fit max-w-full max-h-full"
                                                imgAlt={'chia'}
                                            />
                                            <span className="text-md font-Metropolis font-normal text-dark-500">Rlink</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>Seed </span>
                                        </td>
                                        <td className="px-1 py-2 text-sm font-Metropolis font-normal text-dark-500">
                                            <p className="">$4,40,00,000 </p>

                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>- </span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>- </span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <div className="text-md text-primary-500">Edit</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-1  py-2">

                                            <span className="text-md font-Metropolis font-normal text-dark-500">August 18,2022</span>
                                        </td>
                                        <td className="px-1 inline-flex items-center py-2">
                                            <ElemPhoto
                                                photo={{ "id": "atth6wpfA28Sqr81L", "url": "https://dl.airtable.com/.attachments/1e1ee497cce1959f1829b93f30a42b97/2e946d55/dc4282d28bdc3cd4dfa7f9e6df51ad0d.jpeg-resized?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=29a47a97b41d9c3b", "size": 2450, "type": "image/jpeg", "width": 128, "height": 128, "filename": "dc4282d28bdc3cd4dfa7f9e6df51ad0d.jpeg-resized", "thumbnails": { "full": { "url": "https://dl.airtable.com/.attachmentThumbnails/81028f5f35feea9f4d57de41b8586fea/bf7513bc?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=d987c3990248627b", "width": 3000, "height": 3000 }, "large": { "url": "https://dl.airtable.com/.attachmentThumbnails/b7a60acdbd21c915bd894e942fdcc06e/f7d0434c?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=bdf9a62b7629758b", "width": 128, "height": 128 }, "small": { "url": "https://dl.airtable.com/.attachmentThumbnails/77705b2245120e1326ad124ffdf936de/9cf84af8?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=4401fb727ecf3cd7", "width": 36, "height": 36 } } }}
                                                wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white rounded-lg shadow-md mr-2"
                                                imgClass="object-fit max-w-full max-h-full"
                                                imgAlt={'chia'}
                                            />
                                            <span className="text-md font-Metropolis font-normal text-dark-500">Nifty Comedian</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>Seed </span>
                                        </td>
                                        <td className="px-1 py-2 text-sm font-Metropolis font-normal text-dark-500">
                                            <p className="">$4,40,00,000 </p>

                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>- </span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>- </span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <div className="text-md text-primary-500">Edit</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-1  py-2">

                                            <span className="text-md font-Metropolis font-normal text-dark-500">August 18,2022</span>
                                        </td>
                                        <td className="px-1 inline-flex items-center py-2">
                                            <ElemPhoto
                                                photo={{ "id": "attSDgh43uoIah6dQ", "url": "https://dl.airtable.com/.attachments/a47cc14d5d2fd301122e7099779b0458/87b4b8c5/Rlink.jpeg-resized?ts=1658363797&userId=usr7CWMWLCRhTmk83&cs=ee1e64b47b6d57b1", "size": 2554, "type": "image/jpeg", "width": 128, "height": 128, "filename": "Rlink.jpeg-resized", "thumbnails": { "full": { "url": "https://dl.airtable.com/.attachmentThumbnails/4305db262448e3c8d3c0522cab7e1378/2a62eff5?ts=1658363797&userId=usr7CWMWLCRhTmk83&cs=e992f1e19eb126d5", "width": 3000, "height": 3000 }, "large": { "url": "https://dl.airtable.com/.attachmentThumbnails/fd5ea16b1afa3ee67c0b44df73ba1fcf/24261b74?ts=1658363797&userId=usr7CWMWLCRhTmk83&cs=028f3724bfaa34ac", "width": 128, "height": 128 }, "small": { "url": "https://dl.airtable.com/.attachmentThumbnails/9a248fa4a4cbd4469c15f692d1355d99/a3723f7f?ts=1658363797&userId=usr7CWMWLCRhTmk83&cs=a0a994a41ac7b8d1", "width": 36, "height": 36 } } }}
                                                wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white rounded-lg shadow-md mr-2"
                                                imgClass="object-fit max-w-full max-h-full"
                                                imgAlt={'chia'}
                                            />
                                            <span className="text-md font-Metropolis font-normal text-dark-500">Rlink</span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>Seed </span>
                                        </td>
                                        <td className="px-1 py-2 text-sm font-Metropolis font-normal text-dark-500">
                                            <p className="">$4,40,00,000 </p>

                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>- </span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <span>- </span>
                                        </td>
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500">
                                            <div className="text-md text-primary-500">Edit</div>
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>


                        <div>
                            <ElemButton
                                btn="ol-primary"
                                className="mt-3"
                            >Add Investment Round
                            </ElemButton>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
