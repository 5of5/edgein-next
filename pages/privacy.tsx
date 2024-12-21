/* eslint-disable */
import type { NextPage, GetStaticProps } from 'next';
import { Tab } from '@headlessui/react';
import { useState } from 'react';
import { NextSeo } from 'next-seo';

type Props = {};

const Privacy: NextPage<Props> = () => {
  const theName = 'EdgeIn.io';

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <NextSeo
        title="Privacy Policy & GDPR"
        description="At EdgeIn, we know you care about how your personal information is used and shared, and we take your privacy seriously. Please read the following to learn more about our Privacy Policy."
      />
      <div className="min-h-[80vh]">
        <div className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-3xl mx-auto prose prose-invert">
            <h1 className="relative mx-auto text-4xl font-bold text-white lg:text-5xl">
              Privacy Policy
            </h1>

            <Tab.Group
              selectedIndex={selectedIndex}
              onChange={setSelectedIndex}>
              <Tab.List className="flex font-semibold transition-all border-b whitespace-nowrap gap-x-4 border-white/10">
                <Tab
                  className={({ selected }) =>
                    selected
                      ? 'text-primary-500 border-b-2 border-primary-500 outline-none'
                      : 'text-gray-400 border-b-2 border-transparent'
                  }>
                  Privacy Policy
                </Tab>
                <Tab
                  className={({ selected }) =>
                    selected
                      ? 'text-primary-500 border-b-2 border-primary-500 outline-none'
                      : 'text-gray-400'
                  }>
                  GDPR
                </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel className="prose prose-invert prose-gray-400 prose-headings:text-white prose-a:text-primary-500">
                  <p>
                    We’ve updated our governing terms to remove references to{' '}
                    {theName}’s Privacy Shield Certification contained in our
                    GDPR Privacy Policy and Data Use Addendum, as {theName}{' '}
                    adheres to the Standard Contractual Clauses (as such term is
                    defined in our Data Use Addendum) in accordance with
                    applicable laws.{' '}
                  </p>
                  <p>Effective Date: January 1, 2024</p>
                  <p>
                    At {theName}, we know you care about how your personal
                    information is used and shared, and we take your privacy
                    seriously. Please read the following to learn more about our
                    Privacy Policy.
                  </p>
                  <p>
                    By using or accessing the Service in any manner, you
                    acknowledge that you accept the practices and policies
                    outlined in this Privacy Policy, and you hereby consent that
                    we will collect, use, and share your information in the
                    following ways.
                  </p>
                  <p>
                    Remember that your use of EdgeIn.io’s Service is at all
                    times subject to our 
                    <a
                      href="https://edgein.io/terms"
                      target="_blank"
                      rel="noreferrer">
                      Terms of Service
                    </a>
                    , which incorporates this Privacy Policy. Any terms we use
                    in this Privacy Policy without defining them have the
                    definitions given to them in the{' '}
                    <a
                      href="https://edgein.io/terms"
                      target="_blank"
                      rel="noreferrer">
                      Terms of Service
                    </a>
                    . Our Privacy Policy applies to all users of the EdgeIn.io
                    website: www.EdgeIn.io (and any subdomains).
                  </p>
                  <p>
                    Notwithstanding the foregoing or anything to the contrary in
                    this Privacy Policy or the{' '}
                    <a
                      href="https://edgein.io/terms"
                      target="_blank"
                      rel="noreferrer">
                      Terms of Service
                    </a>
                    , EdgeIn.io’s use and transfer to any other app of
                    information received from Google APIs will adhere to the
                    <a
                      href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes"
                      target="_blank"
                      rel="noreferrer">
                      Google API Services User Data Policy
                    </a>
                    , including the Limited Use requirements.
                  </p>
                  <h2>What does this Privacy Policy Cover?</h2>
                  <p>
                    This Privacy Policy covers how we treat Personal Data that
                    we gather when you access or use our Service. “Personal
                    Data” means any information that identifies or relates to a
                    particular individual and also includes information referred
                    to as “personally identifiable information” or “personal
                    information” under applicable data privacy laws, rules, or
                    regulations. This Privacy Policy does not cover the
                    practices of companies we don’t own or control or people we
                    don’t manage.
                  </p>
                  <h3>Changes to this Privacy Policy</h3>
                  <p>
                    EdgeIn.io may change this Privacy Policy from time to time.
                    Laws, regulations, and industry standards evolve, which may
                    make those changes necessary, or we may make changes to our
                    Service or business. We will post the changes to this page
                    and encourage you to review our Privacy Policy to stay
                    informed. If we make changes that materially alter your
                    privacy rights, we will do our best to alert you to changes
                    by placing a notice on the EdgeIn.io website, by sending you
                    an email, and/or by some other means. Please note that if
                    you’ve opted not to receive legal notice emails from us (or
                    you haven’t provided us with your email address), those
                    legal notices will still govern your use of the Service, and
                    you are still responsible for reading and understanding
                    them.
                  </p>
                  <p>
                    If you use the Service after any changes to the Privacy
                    Policy have been posted, that means you agree to all of the
                    changes. Use of information we collect is subject to the
                    Privacy Policy in effect at the time such information is
                    collected.
                  </p>
                  <h2>What Personal Data does EdgeIn.io Collect?</h2>
                  <p>We collect Personal Data about you from:</p>
                  <ul>
                    <li>
                      You:
                      <ul>
                        <li>
                          when you provide such information directly to us, and
                        </li>
                        <li>
                          when Personal Data about you is automatically
                          collected in connection with your use of our Service.
                        </li>
                      </ul>
                    </li>
                    <li>
                      Third parties, both when they provide us with Personal
                      Data about you and when we seek out information for
                      Profiles, as discussed below (“Third Parties”). Third
                      Parties that share your Personal Data with us include:
                      <ul>
                        <li>
                          Service providers. For example, we may use analytics
                          service providers to analyze how you interact and
                          engage with the Service, or third parties may help us
                          provide you with customer support.
                        </li>
                        <li>
                          Other networks connected to the Service. If you
                          provide any third-party account credentials to us or
                          otherwise sign in to the Service through a third-party
                          site or service (for example, using LinkedIn,
                          Salesforce, Twitter, Facebook, or Google), you
                          understand some content and/or information in those
                          accounts may be transmitted into your Account with us.
                        </li>
                        <li>
                          Advertising partners. We receive information about you
                          from some of our service providers who assist us with
                          marketing or promotional services related to how you
                          interact with our websites, applications, products,
                          services, advertisements, or communications.
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <p>
                    EdgeIn.io also creates profiles of people and companies,
                    which we call “Profiles,” from different sources. Once we
                    have collected information (primarily business-related
                    information) about a person or company, we combine multiple
                    mentions of the same person or company into a Profile.
                    Profiles are then made available to users of the Service,
                    and our customers and strategic partners.
                  </p>
                  <p>
                    When we create or enhance Profiles about individuals, we may
                    collect this information from multiple sources, including:
                  </p>
                  <ul>
                    <li>
                      Publicly-available web sources that we scan using
                      technology or manual methods.
                    </li>
                    <li>
                      User contributions about themselves or other people and
                      companies.
                    </li>
                    <li>Research conducted internally by EdgeIn.io.</li>
                    <li>
                      Other companies and data partners that license information
                      to us.{' '}
                    </li>
                  </ul>
                  <h2>What Categories of Personal Data We Collect</h2>
                  <p>
                    The following chart details the categories of Personal Data
                    that we collect and have collected over the past twelve (12)
                    months. Throughout this Privacy Policy, we will refer back
                    to the categories of Personal Data listed in this chart (for
                    example, “Category A. Personal identifiers”).
                  </p>
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Category of Personal Data</th>
                        <th>Examples</th>
                        <th>What is the source of this Personal Data?</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>A.</td>
                        <td>Personal identifiers</td>
                        <td>
                          Name, email, phone number, IP, username, social media
                          profile IDs/links, personal websiteProfile data: Name,
                          social profile links, personal website
                        </td>
                        <td>You. Third Parties.</td>
                      </tr>
                      <tr>
                        <td>B.</td>
                        <td>
                          Customer records identified by state law (including
                          the California Customer Records statute (Cal. Civ.
                          Code § 1798.80(e)))
                        </td>
                        <td>
                          Name, address, credit card type, last 4 digits of
                          credit card
                        </td>
                        <td>You</td>
                      </tr>
                      <tr>
                        <td>C.</td>
                        <td>
                          Protected classification characteristics under state
                          or federal law
                        </td>
                        <td>
                          Gender, race Optional profile data: Gender, race
                        </td>
                        <td>You. Third Parties.</td>
                      </tr>
                      <tr>
                        <td>D.</td>
                        <td>
                          Internet or other similar network activity information
                        </td>
                        <td>
                          Website & application usage, interaction w/
                          advertisement, browser/platform/device used, search
                          history
                        </td>
                        <td>You. Third Parties.</td>
                      </tr>
                      <tr>
                        <td>E.</td>
                        <td>Geolocation data</td>
                        <td>IP, location data (city, country, state)</td>
                        <td>You. Third Parties.</td>
                      </tr>
                      <tr>
                        <td>F.</td>
                        <td>Professional or employment-related information</td>
                        <td>
                          Employment history, use case, role, industry Profile
                          data: Current & past companies, current & past job
                          titles, biography description, press references,
                          professional investments, education, events, board and
                          advisor roles
                        </td>
                        <td>You. Third Parties.</td>
                      </tr>
                      <tr>
                        <td>G.</td>
                        <td>
                          Personal Data a user chooses to enter into a free text
                          field within the Service
                        </td>
                        <td>
                          Any information that either directly or indirectly
                          identifies, relates to, or describes a particular
                          consumer or household and/or is reasonably capable of
                          being associated with or could reasonably be linked to
                          a particular consumer or household.
                        </td>
                        <td>You. Third Parties.</td>
                      </tr>
                    </tbody>
                  </table>

                  <p>
                    The following sections provide additional information about
                    how we collect your Personal Data.
                  </p>
                  <p>
                    Information You Provide to Us: We receive and store any
                    information you knowingly provide to us. For example,
                    through the registration process and/or through your account
                    settings, we may collect Personal Data such as your name,
                    email address, phone number, and third-party account
                    credentials (for example, your log-in credentials for
                    LinkedIn, Salesforce, Twitter, Facebook, or Google). If you
                    provide your third-party account credentials to us or
                    otherwise sign into the Service through a third party site
                    or service (such as LinkedIn, Salesforce, Twitter, Facebook,
                    or Google), you understand some content and/or information
                    in those accounts (“Third Party Account Information”) may be
                    transmitted into your account with us, and that Third Party
                    Account Information transmitted to our Service is covered by
                    this Privacy Policy. Certain information may be required to
                    register with us or to take advantage of some of our
                    features.
                  </p>
                  <p>
                    We may communicate with you if you’ve provided us the means
                    to do so. For example, if you’ve given us your email
                    address, we may send you promotional email offers on behalf
                    of other businesses, or email you about your use of the
                    Service. Also, we may receive a confirmation when you open
                    an email from us, which helps us improve our Service. If you
                    do not want to receive communications from us, please
                    indicate your preference on the Account Information page or
                    contact us at policy@EdgeIn.io.
                  </p>
                  <p>
                    <em>Information Collected Automatically:</em> Like many
                    other commercial websites, we may also gather information in
                    connection with your use of the website or Service through
                    the use of cookies and other similar technologies such as
                    server logs, pixel tags, web beacons, user website activity
                    and JavaScript (collectively, “Cookies”) to enable us to
                    recognize your web browser or device and tell us how and
                    when you visit and use our Service, to analyze trends, to
                    learn about our user base, and to operate and improve our
                    Service. Cookies are small pieces of data—usually text
                    files—placed on your computer, tablet, phone, or similar
                    device when you use that device to visit our Service. We may
                    also supplement the information we collect from you with
                    information received from third parties, including third
                    parties that have placed their own Cookies on your
                    device(s). Please note that because of our use of Cookies,
                    the Service does not support “Do Not Track” requests sent
                    from a browser at this time.
                  </p>
                  <p>We use the following types of Cookies:</p>
                  <ul>
                    <li>
                      Essential Cookies. Essential Cookies are required for
                      providing you with features or services that you have
                      requested. For example, certain Cookies enable you to log
                      into secure areas of our Service. Disabling these Cookies
                      may make certain features and services unavailable.
                    </li>
                    <li>
                      Functional Cookies. Functional Cookies are used to record
                      your choices and settings regarding our Service, maintain
                      your preferences over time and recognize you when you
                      return to our Service. These Cookies help us to
                      personalize our content for you, greet you by name, and
                      remember your preferences (for example, your choice of
                      language or region).
                    </li>
                    <li>
                      Performance/Analytical Cookies. Performance/Analytical
                      Cookies allow us to understand how visitors use our
                      Service such as by collecting information about the number
                      of visitors to the Service, what pages visitors view on
                      our Service and how long visitors are viewing pages on the
                      Service. Performance/Analytical Cookies also help us
                      measure the performance of our advertising campaigns in
                      order to help us improve our campaigns and the Service’s
                      content for those who engage with our advertising. For
                      example, Google, Inc. (“Google”) uses cookies in
                      connection with its Google Analytics services. Google’s
                      ability to use and share information collected by Google
                      Analytics about your visits to the Service is subject to
                      the Google Analytics Terms of Service and the Google
                      Privacy Policy. You have the option to opt-out of Google’s
                      use of cookies by visiting the Google advertising opt-out
                      page at{' '}
                      <a
                        href="https://policies.google.com/technologies/ads"
                        rel="noreferrer"
                        target="_blank">
                        https://policies.google.com/technologies/ads
                      </a>{' '}
                      or the Google Analytics Opt-out Browser Add-on at 
                      <a
                        href="https://tools.google.com/dlpage/gaoptout/"
                        rel="noreferrer"
                        target="_blank">
                        https://tools.google.com/dlpage/gaoptout/
                      </a>
                      .
                    </li>
                    <li>
                      Retargeting/Advertising Cookies. Retargeting/Advertising
                      Cookies collect data about your online activity and
                      identify your interests so that we can provide advertising
                      that we believe is relevant to you. For more information
                      about this, please see the section below titled
                      “Information about Interest-Based Advertisements.”
                    </li>
                  </ul>

                  <p>
                    You can decide whether or not to accept Cookies through your
                    internet browser’s settings. Most browsers have an option
                    for turning off the Cookie feature, which will prevent your
                    browser from accepting new Cookies, as well as (depending on
                    the sophistication of your browser software) allow you to
                    decide on acceptance of each new Cookie in a variety of
                    ways. You can also delete all Cookies that are already on
                    your computer. If you do this, however, you may have to
                    manually adjust some preferences every time you visit a
                    site, and this may cause some services and functionalities
                    to not work.
                  </p>

                  <p>
                    To explore what Cookie settings are available to you, look
                    in the “preferences” or “options” section of your browser’s
                    menu. To find out more information about Cookies, including
                    information about how to manage and delete Cookies, please
                    visit 
                    <a
                      href="http://www.allaboutcookies.org/"
                      rel="noreferrer"
                      target="_blank">
                      http://www.allaboutcookies.org/
                    </a>
                    .
                  </p>
                  <p>
                    <em>Information about Interest-Based Advertisements:</em> We
                    may serve advertisements, and also allow third-party ad
                    networks, including third-party ad servers, ad agencies, ad
                    technology vendors and research firms, to serve
                    advertisements through the Service. These advertisements may
                    be targeted to users who fit certain general profile
                    categories or display certain preferences or behaviors
                    (“Interest-Based Ads”). Information for Internet-Based Ads
                    (including Personal Data) may be provided to us by you, or
                    derived from the usage patterns of particular users on the
                    Service and/or services of third-parties. Such information
                    may be gathered through tracking users’ activities across
                    time and unaffiliated properties, including when you leave
                    the Service. To accomplish this, we or our service providers
                    may deliver Cookies, including a file (known as a “web
                    beacon”) from an ad network to you through the Service. Web
                    beacons allow ad networks to provide anonymized, aggregated
                    auditing, research and reporting for us and for advertisers.
                    Web beacons also enable ad networks to serve targeted
                    advertisements to you when you visit other websites. Web
                    beacons allow ad networks to view, edit or set their own
                    Cookies on your browser, just as if you had requested a web
                    page from their site.
                  </p>
                  <p>
                    Several media and marketing associations have developed an
                    industry self-regulatory program to give consumers a better
                    understanding of, and greater control over, ads that are
                    customized based on a consumer’s online behavior across
                    different websites and properties. To make choices about
                    Interest-Based Ads from participating third parties,
                    including to opt-out of receiving behaviorally targeted
                    advertisements from participating organizations, please
                    visit the Digital Advertising Alliance or Network
                    Advertising Initiative consumer opt-out pages, which are
                    located at{' '}
                    <a
                      href="http://www.networkadvertising.org/choices/"
                      rel="noreferrer"
                      target="_blank">
                      http://www.networkadvertising.org/choices/
                    </a>{' '}
                    or{' '}
                    <a
                      href="http://www.aboutads.info/choices"
                      rel="noreferrer"
                      target="_blank">
                      http://www.aboutads.info/choices
                    </a>
                    . Users in the European Union should visit the European
                    Interactive Digital Advertising Alliance’s user information
                    website{' '}
                    <a
                      href="https://www.youronlinechoices.eu/"
                      rel="noreferrer"
                      target="_blank">
                      https://www.youronlinechoices.eu/
                    </a>
                    .
                  </p>
                  <h2>How We Use Your Personal Data</h2>
                  <p>
                    We process Personal Data to operate, improve, understand and
                    personalize our Service. We use Personal Data for the
                    following purposes:{' '}
                  </p>
                  <ul>
                    <li>
                      To meet or fulfill the reason you provided the information
                      to us.{' '}
                    </li>
                    <li>
                      To communicate with you about the Service, including
                      Service announcements, updates or offers.{' '}
                    </li>
                    <li>To provide support and assistance for the Service. </li>
                    <li>
                      To create and manage your Account or other user profiles.{' '}
                    </li>
                    <li>
                      To personalize your experience, website content and
                      communications based on your preferences, including
                      targeted offers and ads served through the Service.{' '}
                    </li>
                    <li>To process orders or other transactions. </li>
                    <li>
                      To respond to user inquiries and fulfill user requests.{' '}
                    </li>
                    <li>
                      To market, improve, and develop the Service, including
                      testing, research, analysis, and product development
                      (including creation, enhancement, and distribution of
                      Profiles).{' '}
                    </li>
                    <li>
                      To protect against or deter fraudulent, illegal or harmful
                      actions and maintain the safety, security and integrity of
                      our Service.{' '}
                    </li>
                    <li>
                      To comply with our legal or contractual obligations,
                      resolve disputes, and enforce our Terms of Service.{' '}
                    </li>
                    <li>
                      To respond to law enforcement requests and as required by
                      applicable law, court order, or governmental regulations.{' '}
                    </li>
                    <li>
                      For any other business purpose stated when collecting your
                      Personal Data or as otherwise set forth in applicable data
                      privacy laws, such as the California Consumer Privacy Act
                      (the “CCPA”).{' '}
                    </li>
                  </ul>
                  <p>
                    We will not collect additional categories of Personal Data
                    or use the Personal Data we collected for materially
                    different, unrelated, or incompatible purposes without
                    providing you notice.
                  </p>
                  <p>
                    As noted in the list above, we may communicate with you if
                    you’ve provided us the means to do so. For example, if
                    you’ve given us your email address, we may send you
                    promotional email offers on behalf of other businesses or
                    email you about your use of the Service.  Also, we may
                    receive a confirmation when you open an email from us, which
                    helps us improve our Service. If you do not want to receive
                    communications from us, please indicate your preference on
                    the Account Information page or contact us
                    at policy@EdgeIn.io.
                  </p>
                  <h2>How We Share Your Personal Data</h2>
                  <p>
                    <em>Disclosures of Personal Data for a Business Purpose</em>
                  </p>
                  <p>
                    We disclose your Personal Data to service providers and
                    other parties for the following business purposes:{' '}
                  </p>
                  <ul>
                    <li>
                      Performing services on our behalf, including maintaining
                      or servicing accounts, providing customer service,
                      processing or fulfilling orders and transactions,
                      verifying customer information, processing payments,
                      providing advertising or marketing services, providing
                      analytic services, or providing similar services on behalf
                      of the business or service provider.{' '}
                    </li>
                    <li>
                      Auditing related to a current interaction and concurrent
                      transactions, including, but not limited to, counting ad
                      impressions to unique visitors, verifying positioning and
                      quality of ad impressions, and auditing compliance with
                      this specification and other standards.{' '}
                    </li>
                    <li>
                      Detecting security incidents, protecting against
                      malicious, deceptive, fraudulent, or illegal activity, and
                      prosecuting those responsible for that activity.{' '}
                    </li>
                    <li>
                      Debugging to identify and repair errors that impair
                      existing intended functionality.{' '}
                    </li>
                    <li>
                      Short-term, transient use of Personal Data that is not
                      used by another party to build a consumer profile or
                      otherwise alter your consumer experience outside the
                      current interaction.{' '}
                    </li>
                    <li>
                      Undertaking internal research for technological
                      development and demonstration.{' '}
                    </li>
                    <li>
                      Undertaking activities to verify or maintain the quality
                      or safety of a service or device that we own, manufacture,
                      was manufactured for us, or we control.{' '}
                    </li>
                  </ul>
                  <p>
                    We disclose your Personal Data to the following categories
                    of service providers and other parties:{' '}
                  </p>
                  <ul>
                    <li>
                      Service providers, including:
                      <ul>
                        <li>
                          Subscription management providers and payment
                          processors
                        </li>
                        <li>Security and fraud prevention consultants </li>
                        <li>
                          Hosting and other technology and communications
                          providers{' '}
                        </li>
                        <li>Analytics providers </li>
                        <li>
                          Customer relationship management and customer support
                          providers{' '}
                        </li>
                        <li>Ad networks </li>
                      </ul>
                    </li>
                    <li>
                      Parties who acquire your Personal Data through an
                      acquisition or other change of control.
                      <ul>
                        <li>
                          Personal Data may be transferred to a third party if
                          we undergo a merger, acquisition, bankruptcy or other
                          transaction in which that third party assumes control
                          of our business (in whole or in part)
                        </li>
                      </ul>
                    </li>
                    <li>
                      Other parties at your direction.
                      <ul>
                        <li>
                          Other users (where you post information publicly or as
                          otherwise necessary to effect a transaction initiated
                          or authorized by you through the Service)
                        </li>
                        <li>
                          Social media services (if you intentionally interact
                          with them through your use of the Service){' '}
                        </li>
                        <li>
                          Third-party business partners who you access through
                          the Service{' '}
                        </li>
                        <li>Other parties authorized by you</li>
                      </ul>
                    </li>
                    <li>
                      Business partners
                      <ul>
                        <li>
                          In some cases, we may disclose information about your
                          use of the Service to your employer or other users
                          within your organization{' '}
                        </li>
                      </ul>
                    </li>
                    <li>
                      Over the past twelve months, we have disclosed the
                      following categories of your Personal Data to service
                      providers or other parties for the business purposes
                      listed above:
                      <ul>
                        <li>Personal identifiers.</li>
                        <li>Customer records identified by state law. </li>
                        <li>
                          Protected classification characteristics under state
                          or federal law.{' '}
                        </li>
                        <li>
                          Internet or other similar network activity
                          information.{' '}
                        </li>
                        <li>Geolocation data.</li>{' '}
                        <li>
                          Professional or employment-related information.{' '}
                        </li>
                        <li>
                          Personal Data a user chooses to enter into a free text
                          field within the Service.
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <h3>Sales of Personal Data</h3>
                  <p>
                    At {theName}, we collect information from a variety of
                    sources (including information contributed directly by you
                    and/or our user community) in order to compile Profiles
                    about entities and individuals. Please refer to the chart
                    above titled “Categories of Personal Data We Collect” for a
                    better understanding of the Personal Data we collect that
                    constitutes Profile data. {' '}
                  </p>
                  <p>
                    In this section, we use the term ‘sell’ as it is defined in
                    the CCPA. We sell your Profile data to our customers and
                    data partners (such as resellers and syndication partners),
                    subject to your right to opt-out of these sales (see the
                    “Your Rights” section below for information about how to
                    opt-out).
                  </p>
                  <p>
                    We may also share your information with advertisers in order
                    to help provide our ads to you. The CCPA considers this a
                    “sale” and, because of this, we are required to disclose
                    these types of transfers as “sales” of personal information.
                    However, we do not sell this information for monetary
                    consideration. This type of sharing is also subject to your
                    right to opt out of these sales (see the “Your Rights”
                    section below for information about how to opt-out).
                  </p>
                  <p>
                    Over the past twelve months, we have sold the following
                    categories of your Personal Data to third parties:
                  </p>
                  <ul>
                    <li>Personal identifiers.</li>
                    <li>
                      Protected classification characteristics under state or
                      federal law.
                    </li>
                    <li>Professional or employment-related information.</li>
                  </ul>

                  <h2>Data Security and Retention</h2>
                  <p>
                    We seek to protect your Personal Data from unauthorized
                    access, use and disclosure using appropriate physical,
                    technical, organizational and administrative security
                    measures based on the type of Personal Data and how we are
                    processing that data, including but not limited to:
                  </p>
                  <ul>
                    <li>The EdgeIn.io website uses SSL (https). </li>
                    <li>
                      Account passwords are hashed when stored in our database.{' '}
                    </li>
                    <li>
                      The authenticity of request methods are verified to
                      prevent CSRF (cross-site request forgery) attacks.{' '}
                    </li>
                    <li>
                      EdgeIn.io employees use Single Sign-On (SSO) and passwords
                      and enable screen locking.{' '}
                    </li>
                    <li>
                      Access to AWS and Payment Processors is limited on a need
                      to know basis and requires Two-Factor Authentication
                      (2FA).{' '}
                    </li>
                    <li>
                      Access to production data requires VPN access which is
                      restricted to only the people that need it.{' '}
                    </li>
                    <li>EdgeIn.io performs third-party penetration testing.</li>
                  </ul>

                  <p>
                    You should also help protect your data by appropriately
                    selecting and protecting your password and/or other sign-on
                    mechanism; limiting access to your computer or device and
                    browser; and signing off after you have finished accessing
                    your account. Although we work to protect the privacy of
                    your account and other Personal Data that we hold in our
                    records, no security system is impenetrable, and
                    unanticipated system failures or the efforts of malicious
                    actors are an unfortunate reality on the Internet.
                    Therefore, EdgeIn.io cannot guarantee that Personal Data
                    during transmission through the Internet or while stored on
                    our systems or otherwise in our care will be absolutely safe
                    from intrusion by others. {' '}
                  </p>
                  <p>
                    We retain Personal Data about you for as long as you have an
                    open account with us or as otherwise necessary to provide
                    the Service. In some cases we retain Personal Data for
                    longer, if doing so is necessary to comply with our legal
                    obligations, resolve disputes or collect fees owed, or is
                    otherwise permitted or required by applicable law, rule or
                    regulation. Afterwards, we retain some information in a
                    depersonalized or aggregated form but not in a way that
                    would identify you personally.{' '}
                  </p>
                  <p>
                    <strong>Personal Data of Children</strong>
                  </p>
                  <p>
                    As noted in the Terms of Service, we do not knowingly
                    collect or solicit Personal Data from children under 16. If
                    you are a child under 16, please do not attempt to register
                    for or otherwise use the Service or send us any Personal
                    Data. If we learn we have collected Personal Data from a
                    child under 16, we will delete that information as quickly
                    as possible. If you believe that a child under 16 may have
                    provided us Personal Data, please contact us at
                    privacy@EdgeIn.io.{' '}
                  </p>
                  <p>
                    <strong>California Resident Rights</strong>
                  </p>
                  <p>
                    If you are a California resident, you have the rights
                    outlined in this section. Please see the &ldquo;Exercising
                    Your Rights&rdquo; section below for instructions regarding
                    how to exercise these rights. If there are any conflicts
                    between this section and any other provision of this Privacy
                    Policy and you are a California resident, the portion that
                    is more protective of Personal Data shall control to the
                    extent of such conflict. If you have any questions about
                    this section or whether any of the following applies to you,
                    please contact us at privacy@EdgeIn.io.{' '}
                  </p>
                  <p>
                    <strong>Access</strong>
                  </p>
                  <p>
                    You have the right to request more information about the
                    Personal Data we hold about you and request a copy of such
                    Personal Data by emailing 
                    <a href="mailto:privacy@EdgeIn.io">privacy@EdgeIn.io</a>
                     or submitting a request using this form.{' '}
                  </p>
                  <p>
                    <strong>Deletion</strong>
                  </p>
                  <p>
                    You have the right to request that we delete the Personal
                    Data that we have collected from you. Under the CCPA, this
                    right is subject to certain exceptions: for example, we may
                    need to retain your Personal Data to provide you with the
                    Service or complete a transaction or other action you have
                    requested. If your deletion request is subject to one of
                    these exceptions, we may deny your deletion request.{' '}
                  </p>
                  <p>
                    <strong>Exercising Your Rights</strong>
                  </p>
                  <p>
                    To exercise the rights described above, you must send us a
                    request that (1) provides sufficient information to allow us
                    to verify that you are the person about whom we have
                    collected Personal Data, and (2) describes your request in
                    sufficient detail to allow us to understand, evaluate, and
                    respond to it. Each request that meets both of these
                    criteria will be considered a &ldquo;Valid Request.&rdquo;
                    We may not respond to requests that do not meet these
                    criteria. We will only use Personal Data provided in a Valid
                    Request to verify you and complete your request. You do not
                    need an account to submit a Valid Request.{' '}
                  </p>
                  <p>
                    We will work to respond to your Valid Request within 45 days
                    of receipt. We will not charge you a fee for making a Valid
                    Request unless your Valid Request(s) is excessive,
                    repetitive, or manifestly unfounded. If we determine that
                    your Valid Request warrants a fee, we will notify you of the
                    fee and explain that decision before completing your
                    request.{' '}
                  </p>
                  <p>
                    You may submit a Valid Request using the following method:{' '}
                  </p>
                  <ul>
                    <li>Emailing us at: privacy@edgein.io</li>
                  </ul>
                  <p>
                    <strong>Personal Data Sales Opt-Out and Opt-In</strong>
                  </p>
                  <p>
                    You have the right to opt-out of the sale of your Personal
                    Data. To do so, sending us an email:{' '}
                  </p>
                  <ul>
                    <li>privacy@edgein.io </li>
                  </ul>
                  <p>
                    Once you have submitted an opt-out request, we will not ask
                    you to reauthorize the sale of your Personal Data for at
                    least 12 months. However, you may change your mind and opt
                    back in to Personal Data sales at any time by creating a new
                    public profile for yourself.{' '}
                  </p>
                  <p>
                    <strong>
                      We Will Not Discriminate Against You for Exercising Your
                      Rights Under the CCPA
                    </strong>
                  </p>
                  <p>
                    We will not discriminate against you for exercising your
                    rights under the CCPA. We will not deny you our goods or
                    services, charge you different prices or rates, or provide
                    you a lower quality of goods and services if you exercise
                    your rights under the CCPA. However, we may have different
                    tiers of services as allowed by applicable data protection
                    laws (including the CCPA) with varying prices, rates, or
                    levels of quality of the goods or services you receive
                    related to the value of Personal Data that we receive from
                    you. {' '}
                  </p>
                  <p>
                    <strong>Nevada Resident Rights</strong>
                  </p>
                  <p>
                    If you are a resident of Nevada, you have the right to
                    opt-out of the sale of certain Personal Data to third
                    parties who intend to license or sell that Personal Data.
                    You can exercise this right by contacting us at 
                    <a href="mailto:privacy@EdgeIn.io">privacy@EdgeIn.io</a>
                     with the subject line &ldquo;Nevada Do Not Sell
                    Request&rdquo; and providing us with your name and the email
                    address associated with your account.
                  </p>
                  <p>
                    <strong>European Union Data Subject Rights</strong>
                  </p>
                  <p>
                    If you are a resident of the European Union
                    (&ldquo;EU&rdquo;), United Kingdom, Lichtenstein, Norway, or
                    Iceland, you may have additional rights under the EU General
                    Data Protection Regulation (the &ldquo;GDPR&rdquo;) or the
                    United Kingdom General Data Protection Regulation (UK-GDPR)
                    with respect to your Personal Data, as outlined in our GDPR
                    Privacy Policy.{' '}
                  </p>
                  <p>
                    <strong>Contact Information:</strong>
                  </p>
                  <p>
                    If you have any questions or comments about this Privacy
                    Policy, the ways in which we collect and use your Personal
                    Data, your choices and rights regarding such use, please do
                    not hesitate to contact your EdgeIn.io representative or
                    email us at  privacy@edgein.io.
                  </p>
                </Tab.Panel>

                <Tab.Panel className="prose prose-invert prose-gray-400 prose-headings:text-white prose-a:text-primary-500">
                  <p>
                    We&rsquo;ve updated our governing terms to remove references
                    to EdgeIn.io&rsquo;s Privacy Shield Certification contained
                    in our GDPR Privacy Policy and Data Use Addendum, as
                    EdgeIn.io adheres to the Standard Contractual Clauses (as
                    such term is defined in our Data Use Addendum) in accordance
                    with applicable laws.
                  </p>
                  <p>Effective Date: January 1, 2024</p>
                  <h2>European Residents</h2>
                  <p>
                    If you are a resident of the European Union
                    (&ldquo;EU&rdquo;), United Kingdom, Lichtenstein, Norway, or
                    Iceland, you may have additional rights under the EU General
                    Data Protection Regulation (the &ldquo;GDPR&rdquo;) or the
                    United Kingdom Data Protection Regulation (the
                    &ldquo;UK-GDPR&rdquo; and, together with the GDPR, the
                    &ldquo;European Privacy Laws&rdquo;) with respect to your
                    Personal Data, as outlined below.  
                  </p>
                  <p>
                    For this GDPR Privacy Notice, we use the terms
                    &ldquo;Personal Data&rdquo; and &ldquo;processing&rdquo; as
                    they are defined in the European Privacy Laws, but
                    &ldquo;Personal Data&rdquo; generally means information that
                    can be used to individually identify a person, and
                    &ldquo;processing&rdquo; generally covers actions that can
                    be performed in connection with data such as collection,
                    use, storage and disclosure.  EdgeIn.io will be the
                    controller of your Personal Data processed in connection
                    with the Service. For purposes of this GDPR Privacy Notice,
                    &ldquo;Personal Data&rdquo; includes (but is not limited to)
                    Profile data, as defined in our Privacy Policy.
                  </p>
                  <p>
                    Where applicable, this GDPR Privacy Notice is intended to
                    supplement, and not replace, EdgeIn.io&rsquo;s Privacy
                    Policy&nbsp;
                    <button
                      className="inline font-medium underline"
                      onClick={() => setSelectedIndex(0)}>
                      HERE
                    </button>
                    &nbsp;(the &ldquo;Privacy Policy&rdquo;).  If there are any
                    conflicts between this GDPR Privacy Notice and
                    EdgeIn.io&rsquo;s Privacy Policy, the policy or portion that
                    is more protective of Personal Data shall control to the
                    extent of such conflict.  If you have any questions about
                    this notice or whether any of the following applies to you,
                    please contact us at privacy@EdgeIn.io.  
                  </p>
                  <table>
                    <thead>
                      <tr>
                        <th>Category of Data</th>
                        <th>Source of Data</th>
                        <th>Purpose of Processing</th>
                        <th>
                          Grounds for Processing (e.g. contractual necessity,
                          legitimate interest, consent)
                        </th>
                        <th>Specific Legitimate Interest (if applicable)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          Customer Account Data (e.g. first last name, email, IP
                          address)
                        </td>
                        <td>Data Subject</td>
                        <td>Analytics</td>
                        <td>Legitimate Interest</td>
                        <td>
                          Monitoring and conducting analytics on website &amp;
                          app use, pages/links clicked, traffic demographics,
                          patterns of navigation, on potential security/spam
                          breach, on performance issues, etc.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Customer Account Data (e.g. first last name, email,
                          company)
                        </td>
                        <td>Data Subject</td>
                        <td>Customer Success Communication</td>
                        <td>Legitimate Interest</td>
                        <td>
                          Personalised service and communications related to the
                          customer&rsquo;s use of the product.
                        </td>
                      </tr>
                      <tr>
                        <td>Customer Account Data</td>
                        <td>Data Subject</td>
                        <td>Marketing Campaign (email, list creation, ads)</td>
                        <td>Legitimate Interest</td>
                        <td>
                          Personalization, market research, targeted
                          advertisement, or direct marketing.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Customer Account Data (e.g. first last name, device
                          type, browser)
                        </td>
                        <td>Data Subject</td>
                        <td>Product Development</td>
                        <td>Legitimate Interest</td>
                        <td>
                          Improving performance, troubleshooting bugs, other
                          internal development needs.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Customer Account Data (e.g. first last name, email,
                          company)
                        </td>
                        <td>Data Subject</td>
                        <td>Sales Communication</td>
                        <td>Legitimate Interest</td>
                        <td>Targeted advertisement or direct marketing.</td>
                      </tr>
                      <tr>
                        <td>
                          Customer Account Data (e.g. first last name, email)
                        </td>
                        <td>Data Subject</td>
                        <td>Using EdgeIn.io Products</td>
                        <td>Contractual Necessity </td>
                        <td>Contractual Necessity.</td>
                      </tr>
                      <tr>
                        <td>Customer Account Data (e.g. image, gender)</td>
                        <td>
                          <p>Data Subject</p>
                        </td>
                        <td>
                          <p>Using EdgeIn.io Products</p>
                        </td>
                        <td>
                          <p>Legitimate Interest</p>
                        </td>
                        <td>
                          <p>
                            Creation of public profiles using public known data,
                            personalized service and communications related to
                            the customer&rsquo;s use of the product.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>
                            Billing Data (e.g. first last name, card type, card
                            country)
                          </p>
                        </td>
                        <td>
                          <p>Data Subject</p>
                        </td>
                        <td>
                          <p>Analytics</p>
                        </td>
                        <td>
                          <p>Legitimate Interest</p>
                        </td>
                        <td>
                          <p>
                            Monitoring and conducting analytics on website &amp;
                            app use, pages/links clicked, traffic demographics,
                            patterns of navigation, on potential security/spam
                            breach, on performance issues, etc.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>
                            Billing Data (e.g. first last name, card type, card
                            country)
                          </p>
                        </td>
                        <td>
                          <p>Data Subject</p>
                        </td>
                        <td>
                          <p>Customer Success Communication</p>
                        </td>
                        <td>
                          <p>Legitimate Interest</p>
                        </td>
                        <td>
                          <p>
                            Personalised service and communications related to
                            the customer&rsquo;s use of the product.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>
                            Billing Data (e.g. first last name, card type, card
                            country)
                          </p>
                        </td>
                        <td>
                          <p>Data Subject</p>
                        </td>
                        <td>
                          <p>Product Development</p>
                        </td>
                        <td>
                          <p>Legitimate Interest</p>
                        </td>
                        <td>
                          <p>
                            Improving performance, troubleshooting bugs, other
                            internal development needs.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>
                            Customer Support Data (e.g. first last name, email,
                            address)
                          </p>
                        </td>
                        <td>
                          <p>Data Subject</p>
                        </td>
                        <td>
                          <p>Analytics</p>
                        </td>
                        <td>
                          <p>Legitimate Interest</p>
                        </td>
                        <td>
                          <p>
                            Monitoring and conducting analytics on website &amp;
                            app use, pages/links clicked, traffic demographics,
                            patterns of navigation, on potential security/spam
                            breach, on performance issues, etc.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>
                            Customer Support Data (e.g. first last name, email,
                            address, last 4 digits of credit card)
                          </p>
                        </td>
                        <td>
                          <p>Data Subject</p>
                        </td>
                        <td>
                          <p>Customer Success Communication</p>
                        </td>
                        <td>
                          <p>Legitimate Interest</p>
                        </td>
                        <td>
                          <p>
                            Personalised service and communications related to
                            the customer&rsquo;s use of the product.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>
                            Customer Support Data (e.g. first last name, email)
                          </p>
                        </td>
                        <td>
                          <p>Data Subject</p>
                        </td>
                        <td>
                          <p>Marketing Campaign (email, list creation, ads)</p>
                        </td>
                        <td>
                          <p>Legitimate Interest</p>
                        </td>
                        <td>
                          <p>
                            Personalization, market research, targeted
                            advertisement, or direct marketing.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>
                            Customer Support Data (e.g. first last name, email)
                          </p>
                        </td>
                        <td>
                          <p>Data Subject</p>
                        </td>
                        <td>
                          <p>Product Development</p>
                        </td>
                        <td>
                          <p>Legitimate Interest</p>
                        </td>
                        <td>
                          <p>
                            Improving performance, troubleshooting bugs, other
                            internal development needs.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>
                            Customer Support Data (e.g. first last name, email)
                          </p>
                        </td>
                        <td>
                          <p>Data Subject</p>
                        </td>
                        <td>
                          <p>Sales Communication</p>
                        </td>
                        <td>
                          <p>Legitimate Interest</p>
                        </td>
                        <td>
                          <p>Targeted advertisement or direct marketing.</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>
                            Customer Support Data (e.g. first last name, email)
                          </p>
                        </td>
                        <td>
                          <p>Data Subject</p>
                        </td>
                        <td>
                          <p>Using EdgeIn.io Products</p>
                        </td>
                        <td>
                          <p>Contractual Necessity</p>
                        </td>
                        <td>
                          <p>Contractual Necessity.</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>
                            Person Profile Data (e.g. first last name, news
                            articles, company, investments)
                          </p>
                        </td>
                        <td>
                          <p>
                            Data Subject, Publicly-available web sources, Third
                            Parties
                          </p>
                        </td>
                        <td>
                          <p>Analytics</p>
                        </td>
                        <td>
                          <p>Legitimate Interest</p>
                        </td>
                        <td>
                          <p>
                            Monitoring and conducting analytics on website &amp;
                            app use, pages/links clicked, traffic demographics,
                            patterns of navigation, on potential security/spam
                            breach, on performance issues, etc.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>
                            Person Profile Data (e.g. first last name, news
                            articles, company, investments)
                          </p>
                        </td>
                        <td>
                          <p>
                            Data Subject, Publicly-available web sources, Third
                            Parties
                          </p>
                        </td>
                        <td>
                          <p>Product Development</p>
                        </td>
                        <td>
                          <p>Legitimate Interest</p>
                        </td>
                        <td>
                          <p>
                            Creation of public profiles, improving performance,
                            troubleshooting bugs, other internal development
                            needs.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>User Session Data (e.g. page url, utms)</p>
                        </td>
                        <td>
                          <p>Data Subject</p>
                        </td>
                        <td>
                          <p>Advertising</p>
                        </td>
                        <td>
                          <p>Legitimate Interest</p>
                        </td>
                        <td>
                          <p>
                            Personalization, market research, targeted
                            advertisement, or direct marketing.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>User Session Data (e.g. page url)</p>
                        </td>
                        <td>
                          <p>Data Subject</p>
                        </td>
                        <td>
                          <p>Mobile App Marketing</p>
                        </td>
                        <td>
                          <p>Legitimate Interest</p>
                        </td>
                        <td>
                          <p>
                            Personalization, market research, targeted
                            advertisement, or direct marketing.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>
                            User Session Data (e.g. utms, logged in, xsrf token)
                          </p>
                        </td>
                        <td>
                          <p>Data Subject</p>
                        </td>
                        <td>
                          <p>Using EdgeIn.io Products</p>
                        </td>
                        <td>
                          <p>Legitimate Interest</p>
                        </td>
                        <td>
                          <p>
                            Maintain logged-in state during a single browsing
                            session. Maintain their logged in state across
                            browsing sessions. Enable users to log back in when
                            a new session is started. Prevent cross-site request
                            forgery attacks. Product feature rollout, conducting
                            analysis. Ad performance and conversion tracking.
                            Personalization of Web Content.
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <h2>How and With Whom Do We Share Your Data?</h2>
                  <p>
                    We share Personal Data with vendors, third party service
                    providers and agents who work on our behalf and provide us
                    or you with services related to the purposes described in
                    this Privacy Policy or our Terms of Service. These parties
                    include:
                  </p>
                  <ul>
                    <li>Payment processors</li>
                    <li>Fraud prevention service providers</li>
                    <li>Ad networks</li>
                    <li>Analytics service providers</li>
                    <li>Staff augmentation and contract personnel </li>
                    <li>Hosting service providers</li>
                    <li>Co-location service providers</li>
                    <li>Marketing service providers</li>
                    <li>Product development service providers</li>
                    <li>Customer success providers</li>
                  </ul>
                  <p>
                    We also share Personal Data when necessary to complete a
                    transaction initiated or authorized by you or provide you
                    with a product or service you have requested.  In addition
                    to those set forth above, these parties also include:
                  </p>
                  <ul>
                    <li>
                      Other users (where you post information publicly, direct
                      us to share the information (such as with other members of
                      your team), or as otherwise necessary to effect a
                      transaction initiated or authorized by you through the
                      Service) 
                    </li>
                    <li>
                      Social media services (if you interact with them through
                      your use of the Service)
                    </li>
                    <li>
                      Third party business partners who you access through the
                      Service
                    </li>
                    <li>
                      Your vendors and service providers, such as customer
                      relationship management system providers
                    </li>
                  </ul>
                  <p>
                    We also share Personal Data when we believe it is necessary
                    to:
                  </p>
                  <ul>
                    <li>
                      Comply with applicable law or respond to valid legal
                      process, including requests from law enforcement or other
                      government agencies
                    </li>
                    <li>
                      Protect us, our business or our users, for example to
                      enforce our terms of service, prevent spam or other
                      unwanted communications and investigate or protect against
                      fraud
                    </li>
                    <li>Maintain the security of our products and services</li>
                  </ul>
                  <p>
                    We also share information with third parties when you give
                    us consent to do so.
                  </p>
                  <p>
                    In addition to the foregoing, we share Personal Data that is
                    Profile data with other users, our customers, partners,
                    resellers, and our resellers&rsquo; customers. 
                  </p>
                  <p>
                    Last, we share Personal Data with our affiliates or other
                    members of our corporate family. Furthermore, if we choose
                    to buy or sell assets, user information is typically one of
                    the transferred business assets. Moreover, if we, or
                    substantially all of our assets, were acquired, or if we go
                    out of business or enter bankruptcy, user information would
                    be one of the assets that is transferred or acquired by a
                    third party, and we would share Personal Data with the party
                    that is acquiring our assets. You acknowledge that such
                    transfers may occur, and that any acquirer of us or our
                    assets may continue to use your Personal Information as set
                    forth in this policy.
                  </p>
                  <h2>What Security Measures Do We Use?</h2>
                  <p>
                    We seek to protect Personal Data using appropriate technical
                    and organizational measures based on the type of Personal
                    Data and applicable processing activity.
                  </p>
                  <ul>
                    <li>The EdgeIn.io website uses SSL (https).</li>
                    <li>
                      Account passwords are hashed when stored in our database.
                    </li>
                    <li>
                      The authenticity of request methods are verified to
                      prevent CSRF (cross-site request forgery) attacks.
                    </li>
                    <li>
                      EdgeIn.io employees use Single Sign-On (SSO) and passwords
                      and enable screen locking.
                    </li>
                    <li>
                      Access to AWS and Payment Processors is limited and
                      requires Two-Factor Authentication (2FA).
                    </li>
                    <li>Access to production data requires VPN access.</li>
                    <li>EdgeIn.io performs third-party penetration testing.</li>
                  </ul>
                  <p>
                    How Long Do We Retain Your Personal Data? We retain Personal
                    Data about you for as long as you have an open account with
                    us or as otherwise necessary to provide you with the
                    Service. In some cases we retain Personal Data for longer if
                    doing so is necessary to comply with our legal obligations,
                    resolve disputes or collect fees owed, or is otherwise
                    permitted or required by applicable law, rule or regulation.
                    Afterwards, we retain some information in a depersonalized
                    or aggregated form but not in a way that would identify you
                    personally.
                  </p>
                  <p>
                    Personal Data of Children: As noted in the Terms of Service,
                    we do not knowingly collect or solicit Personal Data from
                    anyone under the age of 16. If you are under 16, please do
                    not attempt to register for the Service or send any Personal
                    Data about yourself to us. If we learn that we have
                    collected Personal Data from a child under age 16, we will
                    delete that information as quickly as possible. If you
                    believe that a child under 16 may have provided us Personal
                    Data, please contact us at privacy@EdgeIn.io. 
                  </p>
                  <h2>What Rights Do You Have Regarding Your Personal Data?</h2>
                  <p>
                    You have certain rights with respect to your Personal Data,
                    including those set forth below. For more information about
                    these rights, or to submit a request, please email
                    privacy@EdgeIn.io. Please note that in some circumstances,
                    we may not be able to fully comply with your request, such
                    as if it is frivolous or extremely impractical, if it
                    jeopardizes the rights of others, or if it is not required
                    by law, but in those circumstances, we will still respond to
                    notify you of such a decision. In some cases, we may also
                    need you to provide us with additional information, which
                    may include Personal Data, if necessary to verify your
                    identity and the nature of your request.  
                  </p>
                  <ul>
                    <li>
                      Access: You can request more information about the
                      Personal Data we hold about you and request a copy of such
                      Personal Data by emailing privacy@EdgeIn.io. 
                    </li>
                    <li>
                      Rectification: If you believe that any Personal Data we
                      are holding about you is incorrect or incomplete, you can
                      request that we correct or supplement such data. You can
                      also correct some of this information directly by emailing
                      privacy@EdgeIn.io.
                    </li>
                    <li>
                      Erasure: You can request that we erase some or all of your
                      Personal Data from our systems.  
                    </li>
                    <li>
                      Withdrawal of Consent: If we are processing your Personal
                      Data based on your consent (as indicated at the time of
                      collection of such data), you have the right to withdraw
                      your consent at any time. Please note, however, that if
                      you exercise this right, you may have to then provide
                      express consent on a case-by-case basis for the use or
                      disclosure of certain of your Personal Data, if such use
                      or disclosure is necessary to enable you to utilize some
                      or all of our Service. 
                    </li>
                    <li>
                      Portability: You can ask for a copy of your Personal Data
                      in a machine-readable format. You can also request that we
                      transmit the data to another controller where technically
                      feasible. 
                    </li>
                    <li>
                      Objection: You can contact us to let us know that you
                      object to the further use or disclosure of your Personal
                      Data for certain purposes, such as for direct marketing
                      purposes. 
                    </li>
                    <li>
                      Restriction of Processing: You can ask us to restrict
                      further processing of your Personal Data.
                    </li>
                    <li>
                      Right to File Complaint: You have the right to lodge a
                      complaint about EdgeIn.io&rsquo;s practices with respect
                      to your Personal Data with the supervisory authority of
                      your country or EU Member State. 
                    </li>
                  </ul>
                  <p>
                    Transfers of Personal Data: The Service is hosted and
                    operated in the United States (&ldquo;U.S.&rdquo;) through
                    EdgeIn.io and its service providers, and if you do not
                    reside in the U.S., laws in the U.S. may differ from the
                    laws where you reside. By using the Service, you acknowledge
                    that any Personal Data about you, regardless of whether
                    provided by you or obtained from a third party, is being
                    provided to EdgeIn.io in the U.S. and will be hosted on U.S.
                    servers, and you authorize EdgeIn.io to transfer, store and
                    process your information to and in the U.S., and possibly
                    other countries. You hereby consent to the transfer of your
                    data to the U.S.
                  </p>
                  <h2>
                    What If You Have Questions Regarding Your Personal Data?
                  </h2>
                  <p>
                    If you have any questions about this GDPR Privacy Notice or
                    our data practices generally, please contact EdgeIn using
                    the following information:   
                  </p>
                  <ul>
                    <li>Email address for contact: privacy@edgein.io</li>
                    <li>
                      Physical address: 1319 Leavenworth, San Francisco, CA
                      94109
                    </li>
                  </ul>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default Privacy;
