import { FC } from 'react';
import { ElemPhoto } from '../elem-photo';
import { IconX } from '../icons';

type Props = {};

export const ElemOnboardingResourceTable: FC<Props> = ({}) => {
  return (
    <div className="relative overflow-x-auto rounded-lg mt-5 border border-gray-200 border-b-0">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-sm text-gray-500 bg-gray-50 border-b border-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3">
              Company
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">Tags</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b border-gray-100">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              <div className="flex items-center gap-3">
                <ElemPhoto
                  photo={{
                    id: 1666759913977,
                    url: 'https://edgein-image-upload-rmdev-new.s3.us-west-2.amazonaws.com/1666759913977.jpg',
                  }}
                  wrapClass="flex items-center justify-center shrink-0 w-10 h-10 bg-white border border-gray-300 rounded-md overflow-hidden"
                  imgClass="object-fit max-w-full max-h-full"
                  imgAlt="Coinbase"
                  placeholderClass="text-gray-300"
                />
                <div>
                  <p>Mars</p>
                  <p className="text-gray-500 font-normal">https://mars.fyi</p>
                </div>
              </div>
            </th>
            <td className="px-6 py-4">
              <ul className="flex items-center gap-2">
                <li className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                  Platform
                </li>
                <li className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                  API
                </li>
              </ul>
            </td>
            <td className="px-6 py-4">
              <IconX className="w-4 h-4 text-gray-500 cursor-pointer float-right" />
            </td>
          </tr>
          <tr className="bg-white border-b border-gray-100">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              <div className="flex items-center gap-3">
                <ElemPhoto
                  photo={{
                    id: 1666759913977,
                    url: 'https://edgein-image-upload-rmdev-new.s3.us-west-2.amazonaws.com/1666759913977.jpg',
                  }}
                  wrapClass="flex items-center justify-center shrink-0 w-10 h-10 bg-white border border-gray-300 rounded-md overflow-hidden"
                  imgClass="object-fit max-w-full max-h-full"
                  imgAlt="Coinbase"
                  placeholderClass="text-gray-300"
                />
                <div>
                  <p>Mars</p>
                  <p className="text-gray-500 font-normal">https://mars.fyi</p>
                </div>
              </div>
            </th>
            <td className="px-6 py-4">
              <ul className="flex items-center gap-2">
                <li className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                  Platform
                </li>
                <li className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                  API
                </li>
              </ul>
            </td>
            <td className="px-6 py-4">
              <IconX className="w-4 h-4 text-gray-500 cursor-pointer float-right" />
            </td>
          </tr>
          <tr className="bg-white border-b border-gray-100">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              <div className="flex items-center gap-3">
                <ElemPhoto
                  photo={{
                    id: 1666759913977,
                    url: 'https://edgein-image-upload-rmdev-new.s3.us-west-2.amazonaws.com/1666759913977.jpg',
                  }}
                  wrapClass="flex items-center justify-center shrink-0 w-10 h-10 bg-white border border-gray-300 rounded-md overflow-hidden"
                  imgClass="object-fit max-w-full max-h-full"
                  imgAlt="Coinbase"
                  placeholderClass="text-gray-300"
                />
                <div>
                  <p>Mars</p>
                  <p className="text-gray-500 font-normal">https://mars.fyi</p>
                </div>
              </div>
            </th>
            <td className="px-6 py-4">
              <ul className="flex items-center gap-2">
                <li className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                  Platform
                </li>
                <li className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                  API
                </li>
              </ul>
            </td>
            <td className="px-6 py-4">
              <IconX className="w-4 h-4 text-gray-500 cursor-pointer float-right" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
