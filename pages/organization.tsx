import { useAuth } from "../hooks/useAuth";
import Link from "next/link"
import { IconCrap } from "../components/reactions/IconCrap"
import { IconHot } from "../components/reactions/IconHot"
import { IconLike } from "../components/reactions/IconLike"
import { ElemButton } from "@/components/ElemButton";
import { ElemPhoto } from "@/components/ElemPhoto";
import { IconChevronLeft } from "@/components/Icons";
import company from "../images/company.png"
import company2 from "../images/company2.png"
import Image from "next/image";
import { InputText } from "@/components/InputText";
import { InputTextarea } from "@/components/InputTextarea";
import { InputSelect } from "@/components/InputSelect";
import { IconOrganization } from "@/components/IconOrganization";
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

                    {/* oragannisaTION CONTENT */}
                    <div className="mt-3">
                        <h3 className="text-xl font-bold font-Metropolis py-1 text-dark-500">My Organizations</h3>
                        <ul className="flex flex-col">
                            <li
                                className="py-1 text-slate-600 inline-flex items-center"
                                role="button"
                            >
                                <Link href=""
                                >
                                    <a className="inline-flex items-center">
                                        <Image
                                            src={company}
                                            alt="company logo"
                                            className="rounded-lg"
                                        /><span className="ml-2">Chia</span>
                                    </a>
                                </Link>
                            </li>
                            <li
                                className="py-1 text-slate-600 inline-flex items-center"
                                role="button">
                                <Link href=""
                                >
                                    <a className="inline-flex items-center">
                                        <Image
                                            src={company2}
                                            alt="company logo"

                                        />
                                        <span className="ml-4">IDEO Colab Ventures</span>
                                    </a>
                                </Link>
                            </li>
                            <li
                                className={`py-1 mt-1 px-2 text-slate-600 inline-flex items-center relative right-2 w-60 bg-slate-200 rounded-lg`}
                                role="button"
                            >
                                <Link href=""
                                >
                                    <a className="inline-flex items-center">

                                        <IconOrganization /><span className="ml-4"> Manage Organization</span>
                                    </a>
                                </Link>
                            </li>

                            {/* {renderMyCustomList()} */}
                        </ul>
                    </div>
                </div>

                <div className="col-span-3">
                    <div className="max-w-6xl bg-white rounded-lg p-5">
                        <div className="flex">
                            <h2 className="text-dark-500 font-Metropolis font-bold text-xl">My Organization(s)</h2>
                        </div>

                        <div className="flex mt-6 mb-2 relative border-b border-gray-100 pb-3">
                            <h2 className="text-dark-500 font-Metropolis font-bold text-md w-40">Verified Organization(s)</h2>
                            <div>
                                <p className="text-slate-600 w-96 text-md">Verify your company or investment firm to access features specifically for your business.</p>
                            </div>

                            <button className="absolute right-0 text-md text-primary-500">Manage Oraganization</button>


                        </div>

                        {/* <div className=" grid grid-col-10 gap-3 mt-6 mb-2 border-b border-gray-100 pb-3">
                            <div className="">
                                <h2 className="text-dark-500 font-Metropolis w-20 font-bold text-md">Verified Organization(s)</h2>
                            </div>

                            <div className=" col-start-3 col-span-6">
                                <p className="text-slate-600 w-96 text-md">Verify your company or investment firm to access features specifically for your business.</p>
                            </div>

                            <div className=" col-end-11 col-span-1">
                                <button className=" text-md text-primary-500">Manage Oraganization</button>
                            </div>
                        </div> */}

                        <div className=" mt-3 mb-2 relative border-b border-gray-100 pb-3">
                            <div className="grid grid-cols-10 gap-3">
                                <div className="col-start-3 col-span-6 flex">
                                    <ElemPhoto
                                        wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 border border-black/10 rounded-lg overflow-hidden"
                                        imgClass="object-fit max-w-full max-h-full"
                                        photo={{ "id": "atth6wpfA28Sqr81L", "url": "https://dl.airtable.com/.attachments/1e1ee497cce1959f1829b93f30a42b97/2e946d55/dc4282d28bdc3cd4dfa7f9e6df51ad0d.jpeg-resized?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=29a47a97b41d9c3b", "size": 2450, "type": "image/jpeg", "width": 128, "height": 128, "filename": "dc4282d28bdc3cd4dfa7f9e6df51ad0d.jpeg-resized", "thumbnails": { "full": { "url": "https://dl.airtable.com/.attachmentThumbnails/81028f5f35feea9f4d57de41b8586fea/bf7513bc?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=d987c3990248627b", "width": 3000, "height": 3000 }, "large": { "url": "https://dl.airtable.com/.attachmentThumbnails/b7a60acdbd21c915bd894e942fdcc06e/f7d0434c?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=bdf9a62b7629758b", "width": 128, "height": 128 }, "small": { "url": "https://dl.airtable.com/.attachmentThumbnails/77705b2245120e1326ad124ffdf936de/9cf84af8?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=4401fb727ecf3cd7", "width": 36, "height": 36 } } }}
                                        imgAlt="company logo" />

                                    <div className="ml-3">
                                        <h2 className="font-bold font-Metropolis text-sm text-slate-600">Chia</h2>
                                        <span className="font-thin text-slate-500 text-sm">Company</span>
                                    </div>
                                </div>
                                <button className=" col-end-11 col-span-1 flex justify-end items-center text-md text-primary-500">Edit</button>
                            </div>
                        </div>

                        <div className=" mt-3 mb-2 relative border-b border-gray-100 pb-3">
                            <div className="grid grid-cols-10 gap-3">
                                <div className="col-start-3 col-span-6 flex">
                                    <ElemPhoto
                                        wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 border border-black/10 rounded-lg overflow-hidden"
                                        imgClass="object-fit max-w-full max-h-full"
                                        photo={{ "id": "atth6wpfA28Sqr81L", "url": "https://dl.airtable.com/.attachments/1e1ee497cce1959f1829b93f30a42b97/2e946d55/dc4282d28bdc3cd4dfa7f9e6df51ad0d.jpeg-resized?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=29a47a97b41d9c3b", "size": 2450, "type": "image/jpeg", "width": 128, "height": 128, "filename": "dc4282d28bdc3cd4dfa7f9e6df51ad0d.jpeg-resized", "thumbnails": { "full": { "url": "https://dl.airtable.com/.attachmentThumbnails/81028f5f35feea9f4d57de41b8586fea/bf7513bc?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=d987c3990248627b", "width": 3000, "height": 3000 }, "large": { "url": "https://dl.airtable.com/.attachmentThumbnails/b7a60acdbd21c915bd894e942fdcc06e/f7d0434c?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=bdf9a62b7629758b", "width": 128, "height": 128 }, "small": { "url": "https://dl.airtable.com/.attachmentThumbnails/77705b2245120e1326ad124ffdf936de/9cf84af8?ts=1658363794&userId=usr7CWMWLCRhTmk83&cs=4401fb727ecf3cd7", "width": 36, "height": 36 } } }}
                                        imgAlt="company logo" />

                                    <div className="ml-3 ">
                                        <h2 className="font-bold font-Metropolis text-sm text-slate-600">IDEO CoLab Ventures
                                        </h2>
                                        <span className="font-thin text-slate-500 text-sm ">Investment Firm</span>
                                    </div>
                                </div>
                                <button className="col-end-11 col-span-1 flex justify-end items-center text-md text-primary-500">Edit</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
