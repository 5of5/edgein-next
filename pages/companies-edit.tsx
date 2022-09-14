import { useAuth } from "../hooks/useAuth";
import Link from "next/link"
import { IconCrap } from "../components/reactions/IconCrap"
import { IconHot } from "../components/reactions/IconHot"
import { IconLike } from "../components/reactions/IconLike"
import { ElemButton } from "@/components/ElemButton";
import { ElemPhoto } from "@/components/ElemPhoto";
import { IconChevronLeft, IconChevronRight } from "@/components/Icons";
import company from "../images/company.png"
import Image from "next/image";
import { InputText } from "@/components/InputText";
import { InputTextarea } from "@/components/InputTextarea";
import { InputSelect } from "@/components/InputSelect";
import { IconCamera } from "@/components/IconCamera";
import { InputSearch } from "@/components/InputSearch";
import { useState } from "react";
import { CompanyEditModal } from "@/components/CompanyEditModal";
import { ElemTeamSideDrawer } from "@/components/ElemTeamSideDrawer";
import { ElemInvestmentSideDrawer } from "@/components/ElemInvestmentSideDrawer";

type Props = {
    children: any
    wrapperClass: string
}

const GridTwelve: React.FC<Props> = ({ children, wrapperClass }) => {
    return (
        <div className={`grid grid-cols-12 gap-2${wrapperClass ? ` ${wrapperClass}` : ''}`}>
            {children}
        </div>
    )
}

export default function CompanyEdit() {

    const [Modal, setModal] = useState(false)
    const [teamdrawer, setteamdrawer] = useState(false)
    const [investmentdrawer, setinvestmentdrawer] = useState(false)

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
                    <div className="flex pl-6 justify-between items-center border-b-4 border-primary-500 sticky top-3 pb-3 z-10">
                        <h2 className="text-xl font-bold font-Metropolis text-dark-950">
                            Edit Chia
                        </h2>
                        <div>
                            <ElemButton btn="transparent" className="text-slate-300">Cancel</ElemButton>
                            <ElemButton btn="primary">Save Edits</ElemButton>
                        </div>
                    </div>

                    <div className="max-w-6xl flex justify-between items-center mt-16 bg-white rounded-lg p-5">
                        <div>
                            <p className="text-xl font-bold font-Metropolis text-dark-950">Do you work at Chia?</p>
                            <p className="text-sm font-normal font-Metropolis">By verifying that you work here, you will be able to edit all fields on the company profile. </p>
                        </div>
                        <div>
                            <ElemButton btn="ol-primary" onClick={() => setModal(true)}>Verify Now <IconChevronRight className="w-4 h-4" /></ElemButton>
                        </div>
                    </div>

                    {Modal && <CompanyEditModal isOpen={Modal} onClose={() => setModal(false)} />}

                    <div className="max-w-6xl mt-7 bg-white rounded-lg p-5">

                        <div className="border-b border-gray-100 pb-3">
                            <h2 className="text-xl font-bold font-Metropolis text-dark-950">
                                Overview
                            </h2>
                        </div>

                        {/* profile image */}
                        <GridTwelve wrapperClass="mt-4 mb-2 border-b border-gray-100 pb-3">
                            <div className="col-span-3">
                                <h2 className="text-dark-500 font-bold w-40">Profile Image*</h2>
                            </div>
                            <div className="col-span-8">
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
                        </GridTwelve>

                        {/* name section */}
                        <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
                            <div className="col-span-3">
                                <h2 className="text-dark-500 font-bold w-40">Name*</h2>
                            </div>
                            <div className="col-span-8">
                                <InputText
                                    onChange={() => { }}
                                    value=""
                                    name=""
                                    placeholder="Chia"
                                    className="placeholder:text-slate-300 w-80"

                                />
                            </div>
                        </GridTwelve>

                        {/* description section */}

                        <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
                            <div className="col-span-3">
                                <h2 className="text-dark-500 font-bold text-md w-40">Description*</h2>
                            </div>
                            <div className="col-span-8">
                                <InputTextarea
                                    placeholder="Chia Network is building a better blockchain and smart transaction."

                                />
                            </div>
                        </GridTwelve>


                        {/* company Type */}

                        <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
                            <div className="col-span-3">
                                <h2 className="text-dark-500 font-bold  w-40">Company Type*</h2>
                            </div>
                            <div className="col-span-8">
                                <InputSelect
                                    options={[]}
                                    placeholder="Layer 1 programmable/Blockchain/Netw..."
                                    className="w-80"
                                />
                            </div>
                        </GridTwelve>

                        {/* industry */}

                        <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
                            <div className="col-span-3">
                                <h2 className="text-dark-500 font-bold  w-40">Industry*</h2>
                            </div>
                            <div className="col-span-8">
                                <InputSearch
                                    className="w-80"
                                    placeholder="Layer 1 programmable/Blockchain/Netw..."

                                />
                                <div className="mt-2 mb-3">
                                    <span className="border px-2.5 py-2 text-purple-50 rounded-2xl border-purple-50 bg-slate-400 font-Metropolis font-bold text-xs ">Financial Software X</span>
                                    <span className="border px-2.5 py-2 text-purple-50 rounded-2xl border-purple-50 bg-slate-400 font-Metropolis font-bold text-xs ml-2">Fintech X</span>
                                </div>
                            </div>
                        </GridTwelve>

                        {/* crypto token  */}

                        <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
                            <div className="col-span-3">
                                <h2 className="text-dark-500 font-bold  w-40">Crypto Token Ticker</h2>
                            </div>
                            <div className="col-span-8">
                                <InputText
                                    onChange={() => { }}
                                    value=""
                                    name=""
                                    placeholder="XCH"
                                    className="placeholder:text-slate-300 w-80"

                                />
                            </div>
                        </GridTwelve>

                        {/* found date */}

                        <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
                            <div className="col-span-3">
                                <h2 className="text-dark-500 font-bold  w-40">Founded Date*</h2>
                            </div>
                            <div className="col-span-8">
                                <InputText
                                    onChange={() => { }}
                                    value=""
                                    name=""
                                    placeholder="Layer 1 programmable/Blockchain/Netw..."
                                    className="placeholder:text-slate-300 w-80"

                                />
                            </div>
                        </GridTwelve>

                        {/* Location  */}

                        <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
                            <div className="col-span-3">
                                <h2 className="text-dark-500 font-bold w-40">Location</h2>
                            </div>
                            <div className="col-span-8">
                                <InputText
                                    onChange={() => { }}
                                    value=""
                                    name=""
                                    placeholder="San Francisco"
                                    label="City"
                                    className="placeholder:text-slate-300 mb-5"
                                />
                                <InputText
                                    onChange={() => { }}
                                    value=""
                                    name=""
                                    placeholder="United State USA"
                                    label="Country"
                                    className="placeholder:text-slate-300"
                                />
                            </div>
                        </GridTwelve>

                        {/* employee  */}

                        <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
                            <div className="col-span-3">
                                <h2 className="text-dark-500 font-bold  w-40">Number of Employees</h2>
                            </div>
                            <div className="col-span-8">
                                <InputText
                                    onChange={() => { }}
                                    value=""
                                    name=""
                                    placeholder="745"
                                    className="placeholder:text-slate-300 w-80"

                                />
                            </div>
                        </GridTwelve>
                        {/* whitepaper section */}

                        <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3">
                            <div className="col-span-3">
                                <h2 className="text-dark-500 font-bold  w-40">White Paper</h2>
                            </div>
                            <div className="col-span-8">
                                {/* <InputText
                                    onChange={() => { }}
                                    value=""
                                    name=""
                                    placeholder="Layer 1 programmable/Blockchain/Netw..."
                                    className="placeholder:text-slate-300 w-80"

                                /> */}
                                <input type="file" placeholder="Browse" />
                            </div>
                        </GridTwelve>

                        {/* website section */}

                        <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
                            <div className="col-span-3">
                                <h2 className="text-dark-500 font-bold  w-40">Website URL*</h2>
                            </div>
                            <div className="col-span-8">
                                <InputText
                                    onChange={() => { }}
                                    value=""
                                    name=""
                                    placeholder="www.website.com"
                                    className="placeholder:text-slate-300 w-80"

                                />
                            </div>
                        </GridTwelve>

                        {/* LinkedIn section */}

                        <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
                            <div className="col-span-3">
                                <h2 className="text-dark-500 font-bold  w-40">LinkedIn URL</h2>
                            </div>
                            <div className="col-span-8">
                                <InputText
                                    onChange={() => { }}
                                    value=""
                                    name=""
                                    placeholder="https://linkedin.com"
                                    className="placeholder:text-slate-300 w-80"

                                />
                            </div>
                        </GridTwelve>

                        {/* Github section */}

                        <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
                            <div className="col-span-3">
                                <h2 className="text-dark-500 font-bold  w-40">Github URL</h2>
                            </div>
                            <div className="col-span-8">
                                <InputText
                                    onChange={() => { }}
                                    value=""
                                    name=""
                                    placeholder="https://github.com"
                                    className="placeholder:text-slate-300 w-80"

                                />
                            </div>
                        </GridTwelve>

                        {/* tWitter section */}

                        <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
                            <div className="col-span-3">
                                <h2 className="text-dark-500 font-bold w-40">Twitter URL</h2>
                            </div>
                            <div className="col-span-8">
                                <InputText
                                    onChange={() => { }}
                                    value=""
                                    name=""
                                    placeholder="https://www.twitter.com"
                                    className="placeholder:text-slate-300 w-80"

                                />
                            </div>
                        </GridTwelve>

                        {/* discord section */}

                        <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
                            <div className="col-span-3">
                                <h2 className="text-dark-500 font-bold w-40">Discord URL</h2>
                            </div>
                            <div className="col-span-8">
                                <InputText
                                    onChange={() => { }}
                                    value=""
                                    name=""
                                    placeholder="https://www.discord.com"
                                    className="placeholder:text-slate-300 w-80"

                                />
                            </div>
                        </GridTwelve>


                        {/* glassdoor section */}

                        <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
                            <div className="col-span-3">
                                <h2 className="text-dark-500 font-bold  w-40">Glassdoor URL</h2>
                            </div>
                            <div className="col-span-8">
                                <InputText
                                    onChange={() => { }}
                                    value=""
                                    name=""
                                    placeholder="https://www.glassdoor.com"
                                    className="placeholder:text-slate-300 w-80"

                                />
                            </div>
                        </GridTwelve>


                        {/* career section */}

                        <GridTwelve wrapperClass="mt-6 mb-2 border-b border-gray-100 pb-3 items-center">
                            <div className="col-span-3">
                                <h2 className="text-dark-500 font-bold w-40">Careers URL</h2>
                            </div>
                            <div className="col-span-8">
                                <InputText
                                    onChange={() => { }}
                                    value=""
                                    name=""
                                    placeholder="htpps://www.careers.coom"
                                    className="placeholder:text-slate-300 w-80"

                                />
                            </div>
                        </GridTwelve>


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
                            <span className="text-md cursor-pointer font-normal text-primary-500 font-Metropolis" onClick={() => setteamdrawer(true)}>Add Employee</span>
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
                                            <span className=" font-Metropolis font-normal text-dark-500">Brahm Cohen</span>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <p>Founder and CEO</p>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <span>2017</span>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <span>-</span>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <span className=" cursor-pointer text-primary-500" onClick={() => setteamdrawer(true)}>Edit</span>
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
                                        <td className="px-1 py-2 text-md font-Metropolis font-normal text-dark-500 cursor-pointer">
                                            <div className="text-md text-primary-500 cursor-pointer">Edit</div>
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
                                            <span className=" font-Metropolis font-normal text-dark-500">Brahm Cohen</span>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <p>Founder and CEO</p>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <span>2017</span>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <span>-</span>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <div className=" text-primary-500">Edit</div>
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
                                            <span className=" font-Metropolis font-normal text-dark-500">Brahm Cohen</span>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <p>Founder and CEO</p>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <span>2017</span>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <span>-</span>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <div className=" text-primary-500">Edit</div>
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
                                            <span className=" font-Metropolis font-normal text-dark-500">Brahm Cohen</span>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <p>Founder and CEO</p>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <span>2017</span>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <span>-</span>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <div className=" text-primary-500">Edit</div>
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
                                            <span className=" font-Metropolis font-normal text-dark-500">Brahm Cohen</span>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <p>Founder and CEO</p>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <span>2017</span>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <span>-</span>
                                        </td>
                                        <td className="px-1 py-2 font-Metropolis font-normal text-dark-500">
                                            <div className=" text-primary-500">Edit</div>
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
                                            <span className=" font-Metropolis font-normal text-dark-500">Brahm Cohen</span>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <p>Founder and CEO</p>
                                        </td>
            <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <span>2017</span>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <span>-</span>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <div className=" text-primary-500">Edit</div>
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
                                            <span className=" font-Metropolis font-normal text-dark-500">Brahm Cohen</span>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <p>Founder and CEO</p>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <span>2017</span>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <span>-</span>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <div className=" text-primary-500">Edit</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {teamdrawer && <ElemTeamSideDrawer isOpen={teamdrawer} onClose={() => setteamdrawer(false)} />}
                    </div>



                    {/* Funding Investments section */}
                    <div className="max-w-6xl mt-7 bg-white rounded-lg p-5">

                        <div className="border-b border-gray-100 pb-3">
                            <h2 className="text-xl font-bold font-Metropolis text-dark-950">
                                Funding Investments
                            </h2>
                        </div>

                        <div className="flex justify-between items-center mt-2 mb-5">
                            <h2 className="text-dark-500 font-bold font-Metropolis text-md">All Investments</h2>
                            <span className="text-md font-normal cursor-pointer text-primary-500 font-Metropolis" onClick={() => setinvestmentdrawer(true)}>Add Investmesnts Round</span>
                        </div>


                        <div className=" w-full border border-slate-200 rounded-lg overflow-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-sm border-b border-slate-200">
                                        <th className="px-1 py-1 ">Type</th>
                                        <th className="px-1 py-1">Money Raised</th>
                                        <th className="px-1 py-1">Date</th>
                                        <th className="px-1 py-1">Investors</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td className="px-1  py-2">

                                            <span className="text-md font-Metropolis font-normal text-dark-500">Series D</span>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <p>$61,00,000</p>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <span>May 24,2021 </span>
                                        </td>
                                        <td className="px-1 py-2 text-sm font-Metropolis font-normal text-dark-500">
                                            <p className="">Slow Ventures, </p>

                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <span className=" text-primary-500 cursor-pointer" onClick={() => setinvestmentdrawer(true)}>Edit</span>

                                        </td>
                                    </tr>


                                    <tr>
                                        <td className="px-1  py-2">

                                            <span className=" font-Metropolis font-normal text-dark-500">Series D</span>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <p>$61,00,000</p>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <span>May 24,2021 </span>
                                        </td>
                                        <td className="px-1 py-2 text-sm font-Metropolis font-normal text-dark-500">
                                            <p className="">Slow Ventures, </p>

                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <span className=" text-primary-500 cursor-pointer" onClick={() => setteamdrawer(true)}>Edit</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-1  py-2">

                                            <span className=" font-Metropolis font-normal text-dark-500">Series D</span>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <p>$61,00,000</p>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <span>May 24,2021 </span>
                                        </td>
                                        <td className="px-1 py-2 text-sm font-Metropolis font-normal text-dark-500">
                                            <p className="">Slow Ventures, </p>

                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <div className=" text-primary-500">Edit</div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-1  py-2">

                                            <span className=" font-Metropolis font-normal text-dark-500">Series D</span>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <p>$61,00,000</p>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <span>May 24,2021 </span>
                                        </td>
                                        <td className="px-1 py-2 text-sm font-Metropolis font-normal text-dark-500">
                                            <p className="">Slow Ventures, </p>

                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <div className=" text-primary-500">Edit</div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-1  py-2">

                                            <span className=" font-Metropolis font-normal text-dark-500">Series D</span>
                                        </td>
                                        <td className="px-1 py-2 font-Metropolis font-normal text-dark-500">
                                            <p>$61,00,000</p>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <span>May 24,2021 </span>
                                        </td>
                                        <td className="px-1 py-2 text-sm font-Metropolis font-normal text-dark-500">
                                            <p className="">Slow Ventures, </p>

                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <div className=" text-primary-500">Edit</div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-1  py-2">

                                            <span className=" font-Metropolis font-normal text-dark-500">Series D</span>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <p>$61,00,000</p>
                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <span>May 24,2021 </span>
                                        </td>
                                        <td className="px-1 py-2 text-sm font-Metropolis font-normal text-dark-500">
                                            <p className="">Slow Ventures, </p>

                                        </td>
                                        <td className="px-1 py-2  font-Metropolis font-normal text-dark-500">
                                            <div className=" text-primary-500">Edit</div>
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>

                        {investmentdrawer && <ElemInvestmentSideDrawer isOpen={investmentdrawer} onClose={() => setinvestmentdrawer(false)} />}


                    </div>
                </div>
            </div>
        </div>
    )
}