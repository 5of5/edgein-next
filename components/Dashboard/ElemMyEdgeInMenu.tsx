import Link from "next/link";
import { useRouter } from "next/router";
import { Disclosure } from "@headlessui/react";
import { ElemPhoto } from "@/components/ElemPhoto";
import {
  IconPolygonDown,
  IconSettings,
  IconUserCircle,
} from "@/components/Icons";
import { useAuth } from "@/hooks/useAuth";
import useDisclosureState from "@/hooks/useDisclosureState";

const ElemMyEdgeInMenu = () => {
  const { user } = useAuth();
  const router = useRouter();

  const {
		btnRef,
		isDefaultOpen,
		onDisclosureButtonClick,
	} = useDisclosureState("disclosure-my-edgein-menu-default-open");

  const getActiveClass = (path: string) => {
    return path === router.asPath ? "text-primary-500 bg-slate-200" : "";
  };

  return (
    <Disclosure defaultOpen={isDefaultOpen} as="div">
      {({ open }) => (
        <>
          <div className="w-full flex items-center justify-between">
            <Disclosure.Button
              className="flex focus:outline-none hover:opacity-75"
              ref={btnRef}
              onClick={onDisclosureButtonClick}
            >
              <IconPolygonDown
                className={`${
                  open ? "rotate-0" : "-rotate-90 "
                } h-6 w-6 transform transition-all`}
              />
              <span className="text-xl font-bold">My EdgeIn</span>
            </Disclosure.Button>
          </div>

          <Disclosure.Panel as="ul" className="mt-1 space-y-1 text-slate-600">
            <li>
              <Link href={`/profile`} passHref>
                <a
                  className={`flex space-x-2 py-1 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500 ${getActiveClass(
                    "/profile/"
                  )}`}
                >
                  {user?.person?.picture ? (
                    <ElemPhoto
                      photo={user?.person?.picture}
                      wrapClass="flex items-center justify-center shrink-0 w-6 h-6 bg-white rounded-full"
                      imgClass="object-fit max-w-full max-h-full rounded-full"
                      imgAlt={"profile"}
                      placeholder="user"
                      placeholderClass="text-slate-400 hover:text-slate-400"
                    />
                  ) : (
                    <div className="flex items-center justify-center shrink-0 w-6 h-6 ">
                      <IconUserCircle className="h-6 w-6 " />
                    </div>
                  )}
                  <span>Profile Settings</span>
                </a>
              </Link>
            </li>

            <li>
              <Link href="/account/" passHref>
                <a
                  className={`flex space-x-2 py-1.5 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500 ${getActiveClass(
                    "/account/"
                  )}`}
                >
                  <IconSettings className="h-6 w-6" />
                  <span>Account Settings</span>
                </a>
              </Link>
            </li>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default ElemMyEdgeInMenu;
