import { Contact } from '@/types/cloudsponge';
import React, { useEffect } from 'react';
import { useMutation } from 'react-query';

const addJavascript = (src: string, id: string, callback: () => void) => {
  if (id && document.getElementById(id)) {
    // the script is already loaded so just invoke the callback and return
    callback();

    return;
  }

  // create and add the scrpt tag
  const scriptTag = document.createElement('script');
  scriptTag.type = 'text/javascript';
  scriptTag.async = true;

  if (id) {
    scriptTag.id = id;
  }

  // set the script to invoke a callback after it loads
  if (scriptTag.readyState) {
    // IE7+
    scriptTag.onreadystatechange = () => {
      if (
        scriptTag.readyState == 'loaded' ||
        scriptTag.readyState == 'complete'
      ) {
        // clear the callback so it only ever executes once
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

type SendInvitationPayload = {
  emails: string[];
};

const CLOUD_SPONGE_API_KEY = process.env.NEXT_PUBLIC_CLOUD_SPONGE_API_KEY;

export const ElemAddressBook: React.FC = () => {
  const { mutate: sendInvitationEmailMutation, isLoading } = useMutation<
    unknown,
    unknown,
    SendInvitationPayload
  >({
    mutationFn: ({ emails }) =>
      fetch('/api/send-invite-to-emails/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emails }),
      }),
  });

  useEffect(() => {
    addJavascript(
      `https://api.cloudsponge.com/widget/${CLOUD_SPONGE_API_KEY}.js`,
      '__cloudsponge_widget_script',
      () => {
        if (window.cloudsponge) {
          cloudsponge.init({
            selectionLimit: 50,
            afterSubmitContacts: (
              contacts: Contact[],
              source: string,
              owner: Contact,
            ) => {
              const emails = contacts.map(contact => contact.primaryEmail());

              sendInvitationEmailMutation({ emails });
            },
          });
        }
      },
    );
  }) 

  return (
    <div>
      <a className="cloudsponge-launch underline">Add from contacts</a>
    </div>
  );
};
