import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { ROUTES } from '@/utils/routes';

type ResourceType = 'companies' | 'investors' | 'events' | 'people';

function useEmptyLibrary(
  resourceType: ResourceType,
  library: string[] | null,
  slug: string | null,
) {
  const router = useRouter();

  const redirectUrl = useMemo(() => {
    if (resourceType === 'companies')
      return ROUTES.COMPANY({ slug: slug || '', selectedLibrary: 'tech' });

    if (resourceType === 'investors')
      return ROUTES.INVESTOR({ slug: slug || '', selectedLibrary: 'tech' });

    if (resourceType === 'events')
      return ROUTES.EVENT({ slug: slug || '', selectedLibrary: 'tech' });

    return ROUTES.PERSON({ slug: slug || '', selectedLibrary: 'tech' });
  }, [resourceType, slug]);

  useEffect(() => {
    if (router.query.library !== 'tech' && !library?.length) {
      router.replace(redirectUrl);
    }
  }, [router, library, redirectUrl]);
}

export default useEmptyLibrary;
