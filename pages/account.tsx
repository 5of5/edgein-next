import { useAuth } from "../hooks/useAuth";
import Link from "next/link"
import { IconCrap } from "../components/reactions/IconCrap"
import { IconHot } from "../components/reactions/IconHot"
import { IconLike } from "../components/reactions/IconLike"
import { IconLinkedIn } from "@/components/reactions/IconLinkedIn";
import { ElemButton } from "@/components/ElemButton";
import { ElemPhoto } from "@/components/ElemPhoto";
import { IconChevronLeft, } from "@/components/Icons";
import Image from "next/image";
import { InputText } from "@/components/InputText";
import { InputTextarea } from "@/components/InputTextarea";
import { InputSelect } from "@/components/InputSelect";
import person from "../images/person.png"
import { IconSetting } from "@/components/IconSetting";

export default function account() {

    return (
        <div className="max-w-6xl px-4 pt-4 mx-auto sm:px-6 lg:px-8 lg:pt-10 mt-10">
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1">
                    {/* my edgein */}

                    <div className="mb-4">
                        <h3 className="text-xl font-bold py-1  text-dark-500">My EdegIn</h3>
                        <ul className="flex flex-col">
                            <li
                                className="py-2 text-slate-600 inline-flex items-center"
                                role="button"
                            >
                                <Link href=""
                                >
                                    <a className="inline-flex items-center">
                                        <Image src={person} alt="person img" /><span className="ml-2">Bram Cohen</span>
                                    </a>
                                </Link>
                            </li>
                            <li
                                className="py-2 relative right-2 w-60 text-slate-600 inline-flex items-center bg-slate-200 px-2 rounded-lg"
                                role="button">
                                <Link href=""
                                >
                                    <a className="inline-flex items-center">
                                        <IconSetting /> <span className="ml-2 font-normal font-Metropolis text-md">Account Setting</span>
                                    </a>
                                </Link>
                            </li>


                            {/* {renderMyCustomList()} */}
                        </ul>
                    </div>

                    {/* my list */}
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
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-dark-500 font-bold text-xl">Account Setting</h2>
                        </div>

                        <div className="flex mb-4  border-b border-gray-100 pb-3">
                            <h2 className="font-bold w-40 text-md font-Metropolis">Authentication</h2>
                            <div className="ml-12">
                                <p className="font-Metropolis font-normal text-md text-gray-10 tracking-wide">Connect your LinkedIn account to validate your profile and contribute to EdgeIn. Our team will then review your account and enable it for contribution (this may take up to one business day).</p>
                                {/* <button className=" border border-slate-200 mt-2  px-4 py-2 rounded-md"><IconLinkedIn className="inline-block" /> <span className="text-darkblue-600 ml-2 font-bold">Connect LinkedIn</span></button> */}
                                <ElemButton
                                    className="mt-2 border border-gray-100 rounded-t-lg rounded-b-lg"
                                    btn="transparent"
                                >
                                    <IconLinkedIn /> <span className="text-darkblue-600 ml-2">Connect LinkedIn</span>

                                </ElemButton>
                            </div>

                        </div>

                        <div className="flex mt-3 mb-2 relative border-b border-gray-100 pb-3">
                            <h2 className="text-dark-500 font-bold text-md w-40">Change Password</h2>
                            <div>
                                <h2 className="text-gray-10 text-md">Use a strong password that you are not using elsewhere.</h2>
                            </div>

                            <button className="absolute right-0 text-md text-primary-500">Edit</button>


                        </div>


                        {/* hide content */}
                        <div className="flex mt-3 mb-2 relative">
                            <h2 className="text-dark-500 font-bold text-md w-40">Change Password</h2>
                            <div>
                                <div className="w-96 border-b border-gray-100 pb-3">
                                    <InputText
                                        label="Current"
                                        onChange={() => { }}
                                        value=""
                                        name=""
                                        className="mb-4"
                                    />
                                    <InputText
                                        label="New"
                                        onChange={() => { }}
                                        value=""
                                        name=""
                                        className="mb-3" />

                                    <InputText
                                        label="Re-type New"
                                        onChange={() => { }}
                                        value=""
                                        name=""
                                        className="mb-3" />


                                    <div className="flex mt-3 mb-2">
                                        <ElemButton btn="primary" className="mr-2">
                                            Save Changes
                                        </ElemButton>
                                        <ElemButton className="border-none font-bold text-slate-600 bg-transparent rounded-lg p-2">Cancel</ElemButton>
                                    </div>
                                </div>
                            </div>



                        </div>

                        <hr></hr>

                    </div>
                </div>

            </div>
        </div>
    );
}
