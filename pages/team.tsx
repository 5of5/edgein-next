import React from "react";
import type { NextPage, GetStaticProps, GetServerSideProps } from "next";
import Image from "next/image";

import { ElemHeading } from "../components/ElemHeading";

type Props = {
	team: Record<string, any>[];
};

const Team: NextPage<Props> = ({ team }) => {
	return (
		<div className="relative overflow-hidden">
			<ElemHeading
				title="Meet the EdgeIn Team"
				subtitle="Get to know the people leading data insights for the web3 community"
			></ElemHeading>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="space-y-12 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-4 lg:gap-x-8">
					{team.map((person, index) => (
						<div
							key={index}
							className="bg-white rounded-lg shadow overflow-hidden flex flex-col mx-auto w-full max-w-md transition duration-300 ease-in-out md:h-full"
						>
							<div className="relative aspect-square">
								<Image
									src={person.image}
									alt={person.image}
									layout="fill"
									objectFit="contain"
								/>
							</div>
							<div className="leading-6 font-medium px-4 py-4">
								<h3 className="flex items-center font-bold text-lg text-primary-500">
									{person.name}
								</h3>
								{person.role && <p className="text-gray-400">{person.role}</p>}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const team = [
		{
			image: "/images/redg-snodgrass.jpg",
			name: "Redg Snodgrass",
			role: "Founder & CEO",
			description:
				"Over 15 years in early stage technology for startups and large corporations. I’ve leveraged an appetite for business development around large distribution technology. My early successes focused on building strong senior collaborative teams for large new technology ecosystems around mutual respectful business models. First with Squaretrade, then Skout, Alcatel-Lucent / Bell Labs Global Telecom API business, Taploid, Wearable World IOT / ReadWrite, and Sheeva.AI.  I’m best known for working with founders on their business tech stack, helping them identify the right people/partners to make the business work, and helping them identify the right sources of capital.",
			linkedin: "https://www.linkedin.com/in/redgiesnodgrass/",
		},
		{
			image: "/images/ashley-brown.jpg",
			//image: ashley,
			name: "Ashley Brown",
			role: "Co-Founder & COO",
			description:
				"Ashley has over 10 years of experience working directly with founders of emerging technologies. She has a unique understanding of what communication and marketing strategies will be most effective and offer the competitive advantage you need to succeed.  At the start of her career, Ashley worked at Jones-Dilworth, a boutique consultancy in Austin, TX  where she worked with clients across various industries including Klout, Roku, Siri, Beluga (acquired by Facebook), SRI, Choicevendor (acquired by Linkedin), and more. Ashley then went on to become the first business hire at Postmates, where she worked as both Director of Communications and Marketing, as well as Director of Operations, scaling the supply-side of the business to meet demand and establishing new territories in Seattle and New York. She brings a wealth of knowledge to the table, with a decade of experience leading communication and marketing strategies such as brand messaging and positioning, product PR, strategic corportate initiatives, internal communications and more.",
			linkedin: "https://www.linkedin.com/in/brownashleyk/",
		},
		{
			image: "/images/raymond-l-aleman.jpg",
			name: "Raymond L. Aleman",
			role: "Co-Founder & Chief Design",
			description:
				"Raymond has over a decade of experience across a broad variety of disciplines including product design, web development, and user experience. He has an exceptional ability to solve complex business problems through objective-based design and compelling interactive experiences.",
			linkedin: "https://www.linkedin.com/in/raylopezaleman/",
		},
		{
			image: "/images/ed-parsons.jpg",
			name: "Ed Parsons",
			role: "Chief Technology Advisor",
			//description: "",
			linkedin: "https://www.linkedin.com/in/efparsons/",
		},
		{
			image: "/images/dahn-tamir.jpg",
			name: "Dahn Tamir",
			role: "Head of Data",
			//description: "",
			linkedin: "https://www.linkedin.com/in/dahntamir/",
		},
		{
			image: "/images/jhen-de-leon.jpg",
			name: "Jhen de Leon",
			role: "Chief of Staff",
			//description: "",
			//linkedin: "",
		},
		{
			image: "/images/rocky-rimando.png",
			name: "Rocky Rimando",
			role: "Virtual Strategic Analyst Lead",
			//description: "",
			linkedin: "https://www.linkedin.com/in/rocky-rimando/",
		},
		{
			image: "/images/osman-pulgar.jpg",
			name: "Osman Pulgar",
			role: "Virtual Strategic Analyst",
			//description: "",
			//linkedin: maybe? "https://www.linkedin.com/in/osman-eduardo-pulgar-zada-6a20b122a/",
		},
		{
			image: "/images/jonnelle-gueco.jpg",
			name: "Jonnelle Gueco",
			role: "Virtual Strategic Analyst",
			//description: "",
			//linkedin: maybe? "https://www.linkedin.com/in/jonnelle-gueco-826343200/",
		},
		{
			image: "/images/patricia-pulgar.jpg",
			name: "Patricia Pulgar",
			role: "Virtual Strategic Analyst",
			//description: "",
			//linkedin: maybe? "https://www.linkedin.com/in/ana-patricia-pulgar-zada-796301173/",
		},
	];

	return {
		props: {
			metaTitle: "Meet the EdgeIn Team - EdgeIn.io",
			metaDescription:
				"Get to know the people leading data insights for the web3 community",
			team,
		},
	};
};

export default Team;
