export const getParentSubOrganizations = (data: any) => {
  const child_companies = data.from_links
    ?.filter((item: any) => item.link_type === "child" && item.to_company)
    ?.map((item: any) => item.to_company.id) || [];

  const child_vc_firms = data.from_links
    ?.filter((item: any) => item.link_type === "child" && item.to_vc_firm)
    ?.map((item: any) => item.to_vc_firm.id) || [];

  const parent_company = data.to_links?.find(
    (item: any) => item.link_type === "child" && item.from_company
  )?.from_company?.id || null;

  const parent_vc_firm = data.to_links?.find(
    (item: any) => item.link_type === "child" && item.from_vc_firm
  )?.from_vc_firm?.id || null;

  return {
    child_companies,
    child_vc_firms,
    parent_company,
    parent_vc_firm,
  };
};

export const onAddResourceLink = async (payload: any) => {
  await fetch("/api/add_resource_link/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const onUpdateResourceLink = async (payload: any) => {
  await fetch("/api/update_resource_link/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const onDeleteResourceLink = async (payload: any) => {
  await fetch("/api/delete_resource_link/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const handleChangeParentOrganization = async (
  recordId: number,
  previous: any,
  current: any,
  type: string,
) => {
  const toId = type === "companies" ? "toCompanyId" : "toVcFirmId";

  if (!current.parent_company && previous.parent_company) {
    await onDeleteResourceLink({
      fromCompanyId: previous.parent_company,
      [toId]: recordId,
    });
  }

  if (current.parent_company) {
    if (!previous.parent_company) {
      await onAddResourceLink({
        linkType: "child",
        fromCompanyId: current.parent_company,
        [toId]: recordId,
      });
    } else {
      await onUpdateResourceLink({
        oldValue: {
          fromCompanyId: previous.parent_company,
          [toId]: recordId,
        },
        newValue: {
          fromCompanyId: current.parent_company,
          [toId]: recordId,
        },
      });
    }
  }

  if (current.parent_vc_firm) {
    if (!previous.parent_vc_firm) {
      await onAddResourceLink({
        linkType: "child",
        fromVcFirmId: current.parent_vc_firm,
        [toId]: recordId,
      });
    } else {
      await onUpdateResourceLink({
        oldValue: {
          fromVcFirmId: previous.parent_vc_firm,
          [toId]: recordId,
        },
        newValue: {
          fromVcFirmId: current.parent_vc_firm,
          [toId]: recordId,
        },
      });
    }
  }
};
