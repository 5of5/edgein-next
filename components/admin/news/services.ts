export const transformFormData = (news: any) => {
  let data = { ...news };
  if (data.source) {
    data.source = JSON.parse(data.source);
  }
  if (data.metadata) {
    data.metadata = JSON.parse(data.metadata);
  }
  return data;
};
