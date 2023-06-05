import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useHotkeys } from 'react-hotkeys-hook';
import { ElemLogo } from '@/components/elem-logo';
import { ElemButton } from '@/components/elem-button';
import { NotificationAlerts } from '@/components/notification-alerts';
import { UserMenu } from '@/components/user-menu';
import LoginModal from '@/components/login-modal';
import UsageModal from '@/components/usage-modal';
import ForgotPasswordModal from '@/components/forgot-password-modal';
import SignUpModal from '@/components/sign-up-modal';
import { IconSearch } from '@/components/icons';
import { MobileNav } from '@/components/mobile-nav';
import SearchModal from '@/components/search-modal';
import OnboardingStep1 from '@/components/onboarding/onboarding-step-1';
import OnboardingStep2 from '@/components/onboarding/onboarding-step-2';
import OnboardingStep3 from '@/components/onboarding/onboarding-step-3';
import OnboardingStep4 from './onboarding/onboarding-step-4';
import OnboardingStep5 from './onboarding/onboarding-step-5';
import { useUser } from '@/context/user-context';
import {
  FindPeopleByNameAndEmailQuery,
  useGetUserByIdQuery,
} from '@/graphql/types';
import ElemSearchBox from './elem-search-box';
import { find, kebabCase, first } from 'lodash';
import { getNameFromListName } from '@/utils/reaction';
import ElemLibrarySelector from './elem-library-selector';
import { ElemUpgradeDialog } from './elem-upgrade-dialog';

export type Popups =
  | 'login'
  | 'forgotPassword'
  | 'search'
  | 'signup'
  | 'usage'
  | false;

type Props = {
  showPopup: Popups;
  setShowPopup: React.Dispatch<React.SetStateAction<Popups>>;
};

export const TheNavbar: FC<Props> = ({ showPopup, setShowPopup }) => {
  const router = useRouter();
  const { user, listAndFollows, myGroups } = useUser();

  const hotListId =
    find(listAndFollows, list => 'hot' === getNameFromListName(list))?.id || 0;
  const myListsUrl = `/lists/${hotListId}/hot`;

  const getFirstGroup = first(myGroups ? myGroups : null);

  const myGroupsUrl = getFirstGroup ? `/groups/${getFirstGroup.id}/` : '';

  const [emailFromLogin, setEmailFromLogin] = useState('');
  const [passwordFromLogin, setPasswordFromLogin] = useState('');
  const [onboardingStep, setOnboardingStep] = useState(0);

  const [selectedOption, setSelectedOption] = useState('');
  const [locationTags, setLocationTags] = useState<any[]>([]);
  const [industryTags, setIndustryTags] = useState<string[]>([]);
  const [list, setList] = useState<any[]>([]);
  const [message, setMessage] = useState<string>('');
  const [selectedPerson, setSelectedPerson] =
    useState<FindPeopleByNameAndEmailQuery['people'][0]>();
  const [linkedin, setLinkedin] = useState<string>('');

  const [linkedInError, setLinkedInError] = useState('');
  const [inviteCode, setInviteCode] = useState(
    typeof window !== 'undefined' ? localStorage.inviteCode ?? '' : '',
  );

  const isDisplaySelectLibrary =
    user?.email.endsWith('edgein.io') || user?.email.endsWith('techlist.com');

  const { data: userProfile, isLoading: isFetchingUserProfile } =
    useGetUserByIdQuery({ id: user?.id || 0 }, { enabled: !!user?.id });

  useEffect(() => {
    if (
      !showPopup &&
      onboardingStep === 0 &&
      router.asPath.includes('/login/')
    ) {
      setShowPopup(
        router.asPath.includes('/login/')
          ? router.asPath.includes('?usage=true')
            ? 'usage'
            : 'login'
          : false,
      );
    }
    if (
      !showPopup &&
      onboardingStep === 0 &&
      router.asPath.includes('/signup/')
    ) {
      setShowPopup(
        router.asPath.includes('/signup/')
          ? router.asPath.includes('?usage=true')
            ? 'usage'
            : 'signup'
          : false,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  useHotkeys('ctrl+k, command+k', function (event) {
    event.preventDefault();
    setShowPopup('search');
  });

  const showOnboarding = () => {
    setOnboardingStep(1);
  };

  useEffect(() => {
    if (
      !isFetchingUserProfile &&
      userProfile &&
      !userProfile.users[0]?.onboarding_information
    ) {
      showOnboarding();
    }
  }, [isFetchingUserProfile, userProfile]);

  const siteNav = [
    {
      path: '/companies',
      name: 'Companies',
    },
    {
      path: '/investors',
      name: 'Investors',
    },
    {
      path: '/events',
      name: 'Events',
    },
    {
      path: '/news',
      name: 'News',
    },
  ];

  // if (user) {
  // 	siteNav.push({ path: myListsUrl, name: "My Lists" });
  // }

  const getAccessTokenFromCode = async (code: string) => {
    try {
      const response = await fetch('/api/access-token-from-code/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          redirect_uri: process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL,
        }),
      }); //.then((res) => res.json());
      if (response.status !== 200) {
        const responseText = await response.clone().json();
        if (responseText.message) {
          setLinkedInError(responseText.message);
          setShowPopup('login');
        }
      } else {
        window.location.href = '/';
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (router.query.code) {
      (async () => {
        //setFinishingLogin(true);
        const res = await getAccessTokenFromCode(router.query.code as string);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.code]);

  useEffect(() => {
    if (router.query.invite && !user) {
      setInviteCode(router.query.invite as string);
      localStorage.inviteCode = router.query.invite as string;
      showSignUpModal('', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.invite, user]);

  const onBackFromForgotPassword = () => {
    setShowPopup('login');
  };

  const onModalClose = () => {
    setShowPopup(router.asPath.includes('/login/') ? 'login' : false);
  };

  const showLoginModal = () => {
    setShowPopup('login');
  };

  const showSignUpModal = (email: string, password: string) => {
    setEmailFromLogin(email ? email : '');
    setPasswordFromLogin(password ? password : '');
    setShowPopup('signup');
  };

  // Upgrade modal
  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);

  const onOpenUpgradeDialog = () => {
    setIsOpenUpgradeDialog(true);
  };
  const onCloseUpgradeDialog = () => {
    setIsOpenUpgradeDialog(false);
  };

  return (
    <header className="overflow-y-visible z-40 block fixed top-0 left-0 right-0">
      <div className="px-1 py-1 sm:px-3 shadow bg-white/80 backdrop-blur">
        <nav
          className="flex items-center justify-between lg:justify-start w-full mx-auto transition-all"
          aria-label="Global"
        >
          <div className="flex items-center">
            <div className="flex-none lg:mr-2">
              <Link href={user ? '/companies' : '/'} passHref>
                <a>
                  <ElemLogo
                    mode="logo"
                    className="h-6 w-auto transition duration-200 ease-in-out scale-90 scheme-standard hover:scale-95 sm:h-8"
                  />
                </a>
              </Link>
            </div>
            {!isDisplaySelectLibrary && <ElemLibrarySelector />}
          </div>
          <ElemSearchBox
            onClick={() => {
              setShowPopup('search');
            }}
          />

          <div className="flex items-center group space-x-4 lg:space-x-3 lg:ml-auto">
            {siteNav.map((link, index) => (
              <Link href={link.path} key={index} passHref>
                <a className="hidden lg:inline-block px-2.5 py-1.5 font-bold transition duration-150 group-hover:opacity-50 hover:!opacity-100">
                  {link.name}
                </a>
              </Link>
            ))}
            {user ? (
              <>
                <ElemButton
                  onClick={() => setShowPopup('search')}
                  btn="slate"
                  className="h-9 w-9 !px-0 !py-0 sm:hidden"
                >
                  <IconSearch className="h-5 w-5" />
                </ElemButton>
                <NotificationAlerts />
                <UserMenu onShowUpgrade={onOpenUpgradeDialog} />
              </>
            ) : (
              <>
                <ElemButton
                  onClick={() => setShowPopup('login')}
                  btn="ol-primary"
                  className="px-2.5 sm:px-3"
                >
                  Log In
                </ElemButton>
                <ElemButton
                  onClick={() => setShowPopup('signup')}
                  btn="primary"
                  className="px-2.5 sm:px-3"
                >
                  Sign Up
                </ElemButton>
              </>
            )}

            <MobileNav
              className="flex lg:hidden items-center"
              myListsUrl={myListsUrl}
              myGroupsUrl={myGroupsUrl}
            />
          </div>

          <UsageModal
            onSignUp={showSignUpModal}
            show={showPopup === 'usage'}
            onClose={onModalClose}
          />

          <LoginModal
            linkedInError={linkedInError}
            onSignUp={showSignUpModal}
            onForgotPassword={() => setShowPopup('forgotPassword')}
            show={showPopup === 'login'}
            onClose={onModalClose}
          />
          <SignUpModal
            inviteCode={inviteCode}
            passwordFromLogin={passwordFromLogin}
            emailFromLogin={emailFromLogin}
            onLogin={showLoginModal}
            show={showPopup === 'signup'}
            onClose={onModalClose}
          />
          <ForgotPasswordModal
            show={showPopup === 'forgotPassword'}
            onClose={onModalClose}
            onBack={onBackFromForgotPassword}
          />
          <SearchModal
            show={showPopup === 'search'}
            onClose={() => setShowPopup(false)}
          />
          {onboardingStep === 1 && (
            <OnboardingStep1
              selectedOption={selectedOption}
              show={onboardingStep === 1 && !isFetchingUserProfile}
              onClose={() => setOnboardingStep(0)}
              onNext={selectedOption => {
                setSelectedOption(selectedOption);
                setOnboardingStep(2);
              }}
              user={user}
            />
          )}
          {onboardingStep === 2 && (
            <OnboardingStep2
              selectedOption={selectedOption}
              locationTags={locationTags}
              industryTags={industryTags}
              show={onboardingStep === 2 && !isFetchingUserProfile}
              onClose={() => {
                setOnboardingStep(0);
              }}
              onNext={(locationTags, industryTags) => {
                setOnboardingStep(3);
                setLocationTags(locationTags);
                setIndustryTags(industryTags);
              }}
              onBack={(locationTags, industryTags) => {
                setLocationTags(locationTags);
                setIndustryTags(industryTags);
                setOnboardingStep(1);
              }}
            />
          )}

          {onboardingStep === 3 && (
            <OnboardingStep3
              selectedOption={selectedOption}
              locationTags={locationTags}
              industryTags={industryTags}
              show={onboardingStep === 3 && !isFetchingUserProfile}
              list={list}
              onNext={list => {
                setList(list);
                setOnboardingStep(4);
              }}
              onBack={() => setOnboardingStep(2)}
              user={user}
            />
          )}

          {onboardingStep === 4 && (
            <OnboardingStep4
              show={onboardingStep === 4 && !isFetchingUserProfile}
              selectedPerson={selectedPerson}
              linkedin={linkedin}
              onBack={(person, linkedinUrl) => {
                setSelectedPerson(person);
                setLinkedin(linkedinUrl);
                setOnboardingStep(3);
              }}
              onNext={(person, linkedinUrl) => {
                setSelectedPerson(person);
                setLinkedin(linkedinUrl);
                setOnboardingStep(5);
              }}
            />
          )}
          {onboardingStep === 5 && (
            <OnboardingStep5
              selectedOption={selectedOption}
              locationTags={locationTags}
              industryTags={industryTags}
              list={list}
              message={message}
              selectedPerson={selectedPerson}
              linkedin={linkedin}
              show={onboardingStep === 5 && !isFetchingUserProfile}
              onBack={msg => {
                setMessage(msg);
                setOnboardingStep(4);
              }}
              onNext={() => setOnboardingStep(0)}
            />
          )}
        </nav>
      </div>
      <ElemUpgradeDialog
        isOpen={isOpenUpgradeDialog}
        onClose={onCloseUpgradeDialog}
      />
    </header>
  );
};
