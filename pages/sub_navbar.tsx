import React, { useState } from 'react';
import Image from 'next/image';

// Define a type for the tabs and images
type Tab = 'Premium Databases' | 'AI Agent' | 'The Leads Engine';

interface ImageMap {
  [key: string]: {
    header: string;
    content: string;
    data:string;
  };
}

const SubNavbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Premium Databases');

  // Images for each tab
  const images: ImageMap = {
    'Premium Databases': {
      header: '/images/subNavbarHeader.png', // Stored in public/images
      content: '/images/subNavbarContent.png',
      data: 'The Premium datasets are curated lists for high demand datasets which are not easily available such as non twitter Kols and developer data',
    },
    'AI Agent': {
      header: '/images/subNavbarHeader.png',
      content: '/images/subNavbarContent.png',
      data: 'The Premium datasets are curated lists for high demand datasets which are not easily available such as non twitter Kols and developer data',
    },
    'The Leads Engine': {
      header: '/images/subNavbarHeader.png',
      content: '/images/subNavbarContent.png',
      data: 'The Premium datasets are curated lists for high demand datasets which are not easily available such as non twitter Kols and developer data',
    },
  };
console.log(images['Premium Databases'].header)
  return (
    <div className="bg-black text-white min-h-screen">
      <nav className="relative bg-black text-white h-12 flex items-center justify-center">
        <ul className="flex space-x-8 relative">
          {Object.keys(images).map(tab => (
            <li
              key={tab}
              className={`relative cursor-pointer hover:opacity-80 transition-opacity ${
                activeTab === tab
                  ? 'text-white' // Active tab is white
                  : 'text-gray-400' // Non-active tabs are gray
              }`}
              onClick={() => setActiveTab(tab as Tab)}>
              {tab}
            </li>
          ))}
        </ul>
        <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-400 to-transparent pointer-events-none shine-line"></div>
      </nav>

      <div className="relative w-full max-w-screen-lg mx-auto mt-8 bg-black rounded-3xl overflow-hidden shadow-lg min-h-[500px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/subNavbarBody.png"
            alt="Beneath Div Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        {/* Main content */}
        <div className="relative z-10 w-full max-w-[95%] mx-auto h-40 top-5 rounded-4xl overflow-hidden">
          <div className="absolute top-5 left-5 z-10">
            <h1 className="text-white px-2 py-1 rounded text-2xl font-bold">
              {activeTab}
            </h1>
            <p className="text-[#838383] px-2 py-1 rounded text-lg">
              {images[activeTab].data}
            </p>
          </div>
          <Image
            src={images[activeTab].header}
            alt={`${activeTab} Header`}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="absolute top-[calc(20%+25%)] left-1/2 transform -translate-x-1/2 w-[95%] h-[80%] overflow-hidden z-0">
          <Image
            src="/images/subNavbarContent.png"
            alt="Content Below Main Image"
            layout="fill"
            objectPosition="center"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
};

export default SubNavbar;
