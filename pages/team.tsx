import type { GetServerSideProps, NextPage } from 'next';
// import Image from 'next/image';
// import { ElemHeading } from '@/components/elem-heading';
// import { NextSeo } from 'next-seo';
// import {
//   Order_By,
//   Team_Members_Bool_Exp,
//   Team_Members_Order_By,
//   useGetCompanyBySlugQuery,
//   useGetTeamMembersQuery,
// } from '@/graphql/types';
// import { DeepPartial } from '@/types/common';
// import { ElemPhoto } from '@/components/elem-photo';
// import { ElemLink } from '@/components/elem-link';
// import { ROUTES } from '@/routes';
// import { LoaderSpinner } from '@/components/loader-spinner';

type Props = {};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/companies/mentibus',
      permanent: true,
    },
  };
};

const Team: NextPage<Props> = () => {
  // const { data: companyData } = useGetCompanyBySlugQuery({
  //   slug: 'edgein' as string,
  // });

  // const getCompanyid = companyData?.companies[0].id;

  // const teamMembersFilters: DeepPartial<Team_Members_Bool_Exp> = {
  //   _and: [{ company_id: { _eq: getCompanyid } }],
  // };

  // const {
  //   data: teamData,
  //   error,
  //   isLoading,
  // } = useGetTeamMembersQuery(
  //   {
  //     offset: 0,
  //     limit: 50,
  //     where: teamMembersFilters as Team_Members_Bool_Exp,
  //     orderBy: [
  //       {
  //         end_date: Order_By.DescNullsFirst,
  //       } as Team_Members_Order_By,
  //       { founder: Order_By.DescNullsLast } as Team_Members_Order_By,
  //     ],
  //   },
  //   { refetchOnWindowFocus: false },
  // );

  // const teamMembers = teamData?.team_members;

  // const getMemberByName = (getName: string) => {
  //   return teamMembers?.find(member => member.person?.name === getName);
  // };

  // const sortedTeam = [
  //   getMemberByName('Redg Snodgrass'),
  //   getMemberByName('Patricia Arellano'),
  // ];

  // const team = [
  //   {
  //     image: '/images/people/redg-snodgrass.jpg',
  //     name: 'Redg Snodgrass',
  //     role: 'Founder & CEO',
  //     description:
  //       'Over 15 years in early stage technology for startups and large corporations. I’ve leveraged an appetite for business development around large distribution technology. My early successes focused on building strong senior collaborative teams for large new technology ecosystems around mutual respectful business models. First with Squaretrade, then Skout, Alcatel-Lucent / Bell Labs Global Telecom API business, Taploid, Wearable World IOT / ReadWrite, and Sheeva.AI.  I’m best known for working with founders on their business tech stack, helping them identify the right people/partners to make the business work, and helping them identify the right sources of capital.',
  //     linkedin: 'https://www.linkedin.com/in/redgiesnodgrass/',
  //   },
  //   {
  //     image: '/images/people/allon-gladstone.jpg',
  //     name: 'Allon Gladstone',
  //     role: 'Chief Financial Officer',
  //     description: '',
  //     linkedin: 'https://www.linkedin.com/in/allon-gladstone-3279631/',
  //   },
  //   {
  //     image: '/images/people/patricia-arellano.jpg',
  //     name: 'Patricia Arellano',
  //     role: 'Foundation and Operations',
  //     //description: '',
  //     linkedin: 'https://www.linkedin.com/in/patriciaarellano/',
  //   },
  //   {
  //     image: '/images/people/chris-caen.jpg',
  //     name: 'Chrisophert Caen',
  //     role: 'Marketing and Revenue',
  //     //description: '',
  //     linkedin: 'https://www.linkedin.com/in/christophercaen/',
  //   },
  //   {
  //     image: '/images/people/habeeb-syed.jpg',
  //     name: 'Habeeb Syed',
  //     role: 'Legal Advisor',
  //     //description: '',
  //     linkedin: 'https://www.linkedin.com/in/hksyed/',
  //   },
  //   {
  //     image: '/images/people/jhen-de-leon.jpg',
  //     name: 'Jhen de Leon',
  //     role: 'Chief of Staff',
  //     //description: '',
  //     //linkedin: '',
  //   },
  //   {
  //     image: '/images/people/rocky-rimando.png',
  //     name: 'Rocky Rimando',
  //     role: 'Virtual Strategic Analyst Lead',
  //     //description: "",
  //     linkedin: 'https://www.linkedin.com/in/rocky-rimando/',
  //   },
  //   {
  //     image: '/images/people/facundo-furque.jpg',
  //     name: 'Facundo Furque',
  //     role: 'Virtual Strategic Analyst',
  //     //description: "",
  //     linkedin: 'https://www.linkedin.com/in/facu-furque-a762a0247/',
  //   },
  //   {
  //     image: '/images/people/patricia-pulgar.jpg',
  //     name: 'Patricia Pulgar',
  //     role: 'Virtual Strategic Analyst',
  //     //description: "",
  //     linkedin:
  //       'https://www.linkedin.com/in/ana-patricia-pulgar-zada-796301173/',
  //   },
  //   {
  //     image: '/images/people/carlos-mendoza.jpg',
  //     name: 'Carlos Mendoza',
  //     role: 'Virtual Strategic Analyst',
  //     //description: "",
  //     linkedin: 'https://www.linkedin.com/in/carlos-hubert-mendoza-12448b249/',
  //   },
  // ];
  return null;
  // return (
  //   <>
  //     {/* <NextSeo
  //       title="Meet the Mentibus Team"
  //       description="Get to know the people leading data insights for the AI and Web3 community."
  //       openGraph={{
  //         images: [
  //           {
  //             url: 'https://edgein.io/images/og/team.jpg',
  //             width: 800,
  //             height: 600,
  //             alt: 'Mentibus Team',
  //             type: 'image/jpeg',
  //           },
  //         ],
  //       }}
  //     /> */}

  //     {/* <div className="relative mb-10 overflow-hidden">
  //       <ElemHeading
  //         title="Meet our Team"
  //         subtitle="Get to know the people leading data insights for the AI and Web3 community."></ElemHeading>

  //       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
  //         <div className="pb-4 space-y-12 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-4 lg:gap-x-8">
  //           {/* {isLoading ? (
  //             <LoaderSpinner />
  //           ) : (
  //             sortedTeam?.map(member => (
  //               <div
  //                 key={member?.id}
  //                 className="flex flex-col w-full max-w-md mx-auto overflow-hidden transition duration-300 ease-in-out bg-black border  border-neutral-700 rounded-lg md:h-full">
  //                 <ElemLink
  //                   href={`${ROUTES.PEOPLE}/${member?.person?.slug}`}
  //                   className="block aspect-square">
  //                   <ElemPhoto
  //                     photo={member?.person?.picture}
  //                     wrapClass="aspect-square shrink-0 overflow-hidden"
  //                     imgClass=" min-w-full min-h-full"
  //                     imgAlt={member?.person?.name}
  //                     placeholder="user"
  //                     placeholderClass="text-gray-300"
  //                   />
  //                 </ElemLink>

  //                 <div className="px-4 py-4 leading-6">
  //                   <h3 className="flex items-center text-lg font-semibold">
  //                     {member?.person?.name}
  //                   </h3>

  //                   {member?.title && (
  //                     <p className="text-gray-500">{member.title}</p>
  //                   )}
  //                 </div>
  //               </div>
  //             ))
  //           )} */}

  //           {/*{team.map((person, index) => (
  //             <div
  //               key={index}
  //               className="flex flex-col w-full max-w-md mx-auto overflow-hidden transition duration-300 ease-in-out bg-black border  border-neutral-700 rounded-lg md:h-full">
  //               <div className="relative aspect-square">
  //                 <Image
  //                   src={person.image}
  //                   alt={person.image}
  //                   layout="fill"
  //                   objectFit="contain"
  //                 />
  //               </div>
  //               <div className="px-4 py-4 leading-6">
  //                 <h3 className="flex items-center text-lg font-semibold">
  //                   {person.name}
  //                 </h3>
  //                 {person.role && (
  //                   <p className="text-gray-500">{person.role}</p>
  //                 )}
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </div> */}
  //   </>
  // );
};

export default Team;
