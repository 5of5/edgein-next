export const transformFormData = (news: any) => {
  const data = { ...news };
  if (data.source) {
    data.source = JSON.parse(data.source);
  }
  if (data.metadata) {
    data.metadata = JSON.parse(data.metadata);
  }
  return data;
};
