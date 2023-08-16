import { FC } from 'react';
import startCase from 'lodash/startCase';
import { ElemPhoto } from '../elem-photo';
import { IconX } from '../icons';

type Props = {
  resourceType: 'company' | 'investor' | 'people';
  data: any[];
  onRemove: (slug: string) => void;
};

export const ElemOnboardingResourceTable: FC<Props> = ({
  resourceType,
  data,
  onRemove,
}) => {
  return (
    <div className="relative overflow-x-auto rounded-lg mt-5 border border-gray-200 border-b-0">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-sm text-gray-500 bg-gray-50 border-b border-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3">
              {startCase(resourceType)}
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
          {data.map(row => (
            <tr key={row.slug} className="bg-white border-b border-gray-100">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                <div className="flex items-center gap-3">
                  <ElemPhoto
                    photo={{
                      url: row.logo || row.picture,
                    }}
                    wrapClass="flex items-center justify-center shrink-0 w-10 h-10 bg-white border border-gray-300 rounded-md overflow-hidden"
                    imgClass="object-fit max-w-full max-h-full"
                    imgAlt="Coinbase"
                    placeholderClass="text-gray-300"
                  />
                  <div>
                    <p>{row.name}</p>
                  </div>
                </div>
              </th>
              <td className="px-6 py-4">
                <ul className="flex items-center gap-2">
                  {row.tags?.map((tagItem: string) => (
                    <li
                      key={tagItem}
                      className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {tagItem}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-6 py-4 w-20">
                <button onClick={() => onRemove(row.slug)}>
                  <IconX className="w-4 h-4 text-gray-500 float-right" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
