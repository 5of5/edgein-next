type CustomSortProps = {
    field: string;
    order: string;
}

export const sortWithData = (
  data: any,
  customSort: CustomSortProps = { field: "id", order: "ASC" }
) => {
  const isAscending = customSort.order === "ASC";
  let sortData = [];
  if (isAscending) {
    sortData = data.sort((a: any, b: any) =>
      a[customSort.field] > b[customSort.field] ? 1 : -1
    );
  } else {
    sortData = data.sort((a: any, b: any) =>
      a[customSort.field] > b[customSort.field] ? -1 : 1
    );
  }
  return sortData;
};

export const getAdminRenderData = (data: any, headers: Array<string>, counterSuffix: string) => {
  return data?.map((v: any) => {
    let sum = 0;
    for (var index in v) {
      v[index] && headers.includes(index) ? sum++ : sum;
    }
    return { ...v, counter: sum + counterSuffix };
  });
}