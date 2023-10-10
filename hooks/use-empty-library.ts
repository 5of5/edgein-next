import { useEffect } from 'react';
import { useRouter } from 'next/router';

type ResourceType = 'companies' | 'investors' | 'events' | 'people';

function useEmptyLibrary(
  resourceType: ResourceType,
  library: string[] | null,
  slug: string | null,
) {
  const router = useRouter();

  useEffect(() => {
    if (router.query.library !== 'tech' && !library?.length) {
      router.replace(`/tech/${resourceType}/${slug}`);
    }
  }, [resourceType, library, slug, router]);
}

export default useEmptyLibrary;
