import { useState } from "react";
import random from "lodash/random";

const useAdminHandleSlug = (items: any) => {
  const [slug, setSlug] = useState("");

  const onGenerateSlug = (value: string, formData: any) => {
    let filterSlug: any[] | undefined;

    const convertedValue = value.replace(/ /g, "-").toLowerCase();

    filterSlug = items?.filter(
      (f: any) => f.slug === convertedValue && f.status !== "draft"
    );

    if (filterSlug && filterSlug?.length > 0) {
      onGenerateSlug(filterSlug[0].slug + "-" + random(10), formData);
    }
    if (filterSlug?.length === 0) {
      setSlug(convertedValue);
    }
  };

  return {
    slug,
    onGenerateSlug,
  }
}

export default useAdminHandleSlug;
