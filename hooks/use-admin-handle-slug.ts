import { useState } from 'react';
import random from 'lodash/random';

const useAdminHandleSlug = (items: any) => {
  const [slug, setSlug] = useState('');

  const onGenerateSlug = (value: string, formData: any) => {
    const convertedValue = value.trim().replace(/ /g, '-').toLowerCase();

    const filterSlug: any[] | undefined = items?.filter(
      (f: any) => f.slug === convertedValue && f.status !== 'draft',
    );

    if (filterSlug && filterSlug?.length > 0) {
      onGenerateSlug(filterSlug[0].slug + '-' + random(10), formData);
    }
    if (filterSlug?.length === 0) {
      setSlug(convertedValue);
    }
  };

  return {
    slug,
    onGenerateSlug,
  };
};

export default useAdminHandleSlug;
