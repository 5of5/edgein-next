import { Contact } from '@/types/cloudsponge';
import React, { useEffect } from 'react';
import { SelectedPeople } from './elem-invite-user';

// This implementation is taken from the CloudSponge documentation
// https://www.cloudsponge.com/integrations/react/
const addJavascript = (callback: () => void) => {
  const id = '__cloudsponge_widget_script';
  const src = `https://api.cloudsponge.com/widget/${CLOUDSPONGE_API_KEY}.js`;

  if (document.getElementById(id)) {
    // the script is already loaded so just invoke the callback and return
    callback();

    return;
  }

  // create and add the scrpt tag
  const scriptTag = document.createElement('script');
  scriptTag.type = 'text/javascript';
  scriptTag.async = true;
  scriptTag.id = id;

  // set the script to invoke a callback after it loads
  // @ts-expect-error from docs
  if (scriptTag.readyState) {
    // IE7+
    // @ts-expect-error from docs
    scriptTag.onreadystatechange = () => {
      if (
        // @ts-expect-error from docs
        scriptTag.readyState == 'loaded' ||
        // @ts-expect-error from docs
        scriptTag.readyState == 'complete'
      ) {
        // clear the callback so it only ever executes once
        // @ts-expect-error from docs
        scriptTag.onreadystatechange = null;
        callback();
      }
    };
  } else {
    scriptTag.onload = () => {
      // Other browsers support the onload attribute \o/
      callback();
    };
  }

  // assign the src attribute
  scriptTag.src = src;
  // add the script to the page
  document.body.appendChild(scriptTag);
};

const CLOUDSPONGE_API_KEY = process.env.NEXT_PUBLIC_CLOUDSPONGE_API_KEY;

type Props = {
  setSelectedPeople: (people: SelectedPeople[]) => void;
};

export const ElemAddressBook: React.FC<Props> = ({ setSelectedPeople }) => {
  useEffect(() => {
    addJavascript(() => {
      //@ts-expect-error from cloudsponge docs
      if (window.cloudsponge) {
        //@ts-expect-error after script is loaded cloudsponge should be a global variable
        cloudsponge.init({
          afterSubmitContacts: (
            contacts: Contact[],
            source: string,
            owner: Contact,
          ) => {
            setSelectedPeople(
              contacts.map(contact => ({
                work_email: contact.primaryEmail(),
                name: contact.fullName(),
              })),
            );
          },
        });
      }
    });
  });

  return (
    <div>
      <a className="cloudsponge-launch underline">Add from contacts</a>
    </div>
  );
};
