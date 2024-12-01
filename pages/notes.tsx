import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { useGetNotesQuery, Notes_Bool_Exp } from '@/graphql/types';
import { GetStaticProps } from 'next';
import { FC, useEffect } from 'react';
import { IconDocumentDownload } from '@/components/icons';
import ElemNoteCard from '@/components/notes/elem-note-card';
import { PlaceholderNote } from '@/components/placeholders';
import { useUser } from '@/context/user-context';
import { ElemButton } from '@/components/elem-button';
import { useRouter } from 'next/router';
import { ROUTES } from '@/routes';

type Props = {};

const Notes: FC<Props> = () => {
  const { user, myGroups } = useUser();

  const router = useRouter();

  const {
    data: noteList,
    error,
    isLoading,
    refetch: refetchNotes,
  } = useGetNotesQuery({
    where: {
      created_by: { _eq: user?.id },
      _or: [
        {
          _or: [
            {
              _and: [
                { audience: { _eq: 'public' } },
                { created_by: { _eq: user?.id } },
              ],
            },
          ],
        },
        { _or: [{ user_group_id: { _in: myGroups.map(item => item.id) } }] },
        {
          _or: [
            {
              _and: [
                { audience: { _eq: 'only_me' } },
                { created_by: { _eq: user?.id } },
              ],
            },
          ],
        },
      ],
    } as Notes_Bool_Exp,
  });

  useEffect(() => {
    if (!isLoading && !user) {
      redirectToSignIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading]);

  const redirectToSignIn = () => {
    router.push(ROUTES.SIGN_IN);
  };

  const notes = noteList?.notes || [];

  return (
    <DashboardLayout>
      <div className="px-4 pb-20">
        <div className="w-full py-3">
          <h1 className="h-6 mr-2 text-xl font-medium">My Notes</h1>
        </div>

        {error ? (
          <h4>Error loading notes</h4>
        ) : isLoading || !user ? (
          <div className="flex flex-col mt-4 gap-y-4">
            {Array.from({ length: 2 }, (_, i) => (
              <div key={i} className="max-w-2xl bg-dark-100 rounded-lg shadow">
                <PlaceholderNote />
              </div>
            ))}
          </div>
        ) : notes.length === 0 ? (
          <div className="max-w-2xl px-5 py-4 bg-dark-100 border border-gray-300 rounded-lg">
            <div className="w-full p-12 text-center">
              <IconDocumentDownload
                className="w-12 h-12 mx-auto text-gray-300"
                title="notes"
              />
              <h3 className="mt-2 text-lg font-bold">No notes to show</h3>
              <p className="mt-1 text-slate-600">
                Get started by creating a note in a company or investor profile.
              </p>
              <div className="flex justify-center mt-2 space-x-2">
                <ElemButton href={ROUTES.COMPANIES} btn="default" arrow>
                  Companies
                </ElemButton>
                <ElemButton href={ROUTES.INVESTORS} btn="default" arrow>
                  Investors
                </ElemButton>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col max-w-2xl gap-y-4">
            {notes.map(item => (
              <ElemNoteCard
                key={item.id}
                data={item}
                refetch={refetchNotes}
                layout={`${
                  item.user_group_id
                    ? 'groupAndAuthor'
                    : 'organizationAndAuthor'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default Notes;
