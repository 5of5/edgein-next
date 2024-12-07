export const getParentSubOrganizations = (data: any) => {
  const child_companies = Array.isArray(data?.from_links)
    ? data.from_links
        .filter((item: any) => item?.link_type === 'child' && item?.to_company)
        .map((item: any) => item?.to_company?.id)
    : [];

  const child_vc_firms = Array.isArray(data?.from_links)
    ? data.from_links
        .filter((item: any) => item.link_type === 'child' && item.to_vc_firm)
        .map((item: any) => item.to_vc_firm.id)
    : [];

  const parent_company = Array.isArray(data?.to_links)
    ? data.to_links.find(
        (item: any) => item.link_type === 'child' && item.from_company,
      )?.from_company?.id
    : null;

  const parent_vc_firm = Array.isArray(data?.to_links)
    ? data.to_links.find(
        (item: any) => item.link_type === 'child' && item.from_vc_firm,
      )?.from_vc_firm?.id
    : null;

  return {
    child_companies,
    child_vc_firms,
    parent_company,
    parent_vc_firm,
  };
};

export const handleChangeParentOrganization = (
  recordId: number,
  linkId: number,
  previous: any,
  current: any,
  type: string,
  create: any,
  update: any,
  deleteOne: any,
  onCallbackSuccess: any,
) => {
  const toId = type === 'companies' ? 'to_company_id' : 'to_vc_firm_id';

  if (!current.parent_company && previous.parent_company) {
    deleteOne(
      'resource_links',
      {
        id: linkId,
        previousData: {
          from_company_id: previous.parent_company,
          [toId]: recordId,
        },
      },
      {
        onSuccess: onCallbackSuccess,
      },
    );
  }

  if (!current.parent_vc_firm && previous.parent_vc_firm) {
    deleteOne(
      'resource_links',
      {
        id: linkId,
        previousData: {
          from_vc_firm_id: previous.parent_vc_firm,
          [toId]: recordId,
        },
      },
      {
        onSuccess: onCallbackSuccess,
      },
    );
  }

  if (current.parent_company) {
    if (!previous.parent_company) {
      create(
        'resource_links',
        {
          data: {
            link_type: 'child',
            from_company_id: current.parent_company,
            [toId]: recordId,
          },
        },
        {
          onSuccess: onCallbackSuccess,
        },
      );
    } else {
      update(
        'resource_links',
        {
          id: linkId,
          data: {
            from_company_id: current.parent_company,
            [toId]: recordId,
          },
          previousData: {
            from_company_id: previous.parent_company,
            [toId]: recordId,
          },
        },
        {
          onSuccess: onCallbackSuccess,
        },
      );
    }
  }

  if (current.parent_vc_firm) {
    if (!previous.parent_vc_firm) {
      create(
        'resource_links',
        {
          data: {
            link_type: 'child',
            from_vc_firm_id: current.parent_vc_firm,
            [toId]: recordId,
          },
        },
        {
          onSuccess: onCallbackSuccess,
        },
      );
    } else {
      update(
        'resource_links',
        {
          id: linkId,
          data: {
            from_vc_firm_id: current.parent_vc_firm,
            [toId]: recordId,
          },
          previousData: {
            from_vc_firm_id: previous.parent_vc_firm,
            [toId]: recordId,
          },
        },
        {
          onSuccess: onCallbackSuccess,
        },
      );
    }
  }
};
