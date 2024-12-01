import { FC } from 'react';
import { ElemButton } from '@/components/elem-button';
import { useUser } from '@/context/user-context';
import { loadStripe } from '@/utils/stripe';

import { useRouter } from 'next/router';
import { ROUTES } from '@/routes';

type Props = {
  title?: string;
  rowsCount?: number;
  columns: any[];
};

export const TableUpgrade: FC<Props> = ({
  title = 'View all items from this search',
  rowsCount = 10,
  columns,
}) => {
  const router = useRouter();
  const { user } = useUser();

  const onBillingClick = async () => {
    if (!user) {
      router.push(ROUTES.SIGN_IN);
    } else {
      loadStripe();
    }
  };

  return (
    <>
      <table className="relative min-w-full table-auto">
        <tbody className="divide-y divide-black/10">
          {Array.from({ length: rowsCount }, (_, i) => {
            return (
              <tr key={i} className="min-w-full">
                {columns.map((column, ii) => {
                  const getColumnWidth = column.width ? column.width : 200;

                  return (
                    <td
                      key={ii}
                      className="p-2 text-sm align-middle"
                      style={{
                        width: `${getColumnWidth}px`,
                        minWidth: `${getColumnWidth}px`,
                        maxWidth: `${getColumnWidth}px`,
                      }}>
                      <div className="flex items-center space-x-3 blur-sm min-h-10">
                        placeholder content
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
          <tr className="absolute top-0 bottom-0 left-0 right-0 z-10 w-full h-full p-5 shadow bg-gray-300/90">
            <td>
              <div className="max-w-2xl">
                <h2 className="text-2xl font-medium text-white lg:text-3xl">
                  {title}
                </h2>
                <p className="text-lg text-white opacity-90">
                  Try EdgeIn Contributor FREE for 7 days.
                </p>
                <div className="flex items-center mt-4 space-x-2">
                  <ElemButton onClick={onBillingClick} btn="default" arrow>
                    Start your free trial
                  </ElemButton>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
