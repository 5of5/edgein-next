// From https://www.cloudsponge.com/developer/contact-picker/data-structure/

export type Contact = {
  first_name: string;
  last_name: string;
  email?: Email[];
  phone?: Phone[];
  address?: Address[];
  job_title?: string;
  companies?: string[];
  groups?: string[];
  dob?: Date;
  birthday?: Date;
  fullname: () => string;
  primaryEmail: () => string;
  selectedEmail: () => string;
  primaryPhone: () => string;
  selectedPhone: () => string;
};

type Email = {
  address?: string;
  type: string;
};

type Phone = {
  number?: string;
  type: string;
};

type Address = {
  formatter?: string;
  street?: string;
  city?: string;
  region?: string;
  country?: string;
  postal_code?: string;
  type: string;
};
