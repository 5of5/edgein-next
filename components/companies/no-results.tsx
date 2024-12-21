import { FC } from 'react';
import { ElemButton } from '@/components/elem-button';
import { useUser } from '@/context/user-context';
import { useRouter } from 'next/router';
import { ROUTES } from '@/routes';
import { IconAnnotation, IconSearch } from '../icons';
import { useIntercom } from 'react-use-intercom';

type Props = {
  title?: string;
  content?: string;
};

export const NoResults: FC<Props> = ({
  title = 'No results found',
  content = 'Please check spelling, try different filters, or tell us about missing data.',
}) => {
  const router = useRouter();
  const { user } = useUser();
  const { showNewMessages } = useIntercom();

  return (
    <div className="flex items-center justify-center mx-auto min-h-[40vh]">
      <div className="w-full max-w-2xl p-8 my-8 text-center bg-black border  border-neutral-700 rounded-2xl">
        <IconSearch className="w-12 h-12 mx-auto text-gray-300" />
        <h2 className="mt-5 text-3xl font-medium">{title}</h2>
        <div className="mt-1 text-lg text-gray-600">{content}</div>
        <ElemButton
          onClick={() =>
            showNewMessages(
              `Hi EdgeIn, I'd like to report missing data on ${router.pathname} page`,
            )
          }
          btn="default"
          className="mt-3">
          <IconAnnotation className="w-6 h-6 mr-1" />
          Tell us about missing data
        </ElemButton>
      </div>
    </div>
  );
};
