export const typeChoices = [
  {
    id: "EMAIL",
    name: "email",
  },
  {
    id: "DOMAIN",
    name: "domain",
  },
];

export const transform = (data: any) => {
  data.email = (data.email || "").toLowerCase();
  return data;
};