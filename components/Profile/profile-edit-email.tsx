import { useContext, useEffect, useState } from "react";
import { EditSection } from "../Dashboard/edit-section";
import { ElemButton } from "../elem-button";
import { InputText } from "../input-text";
import {
	People,
} from "@/graphql/types";
import { useUser } from "@/context/user-context";

type Props = {
};

export const ProfileEditEmail: React.FC<Props> = ({
}) => {
    const { user } = useUser();
    const editEmail = false

  return <EditSection
heading="Email"
right={
  !editEmail ? (
    // <button
    //   onClick={() => setEditEmail(true)}
    //   className="text-primary-500 hover:text-dark-500"
    // >
    //   Edit
    // </button>
    <></>
  ) : (
    <></>
  )
}
>
{!editEmail ? (
  <div>
    <p className="text-slate-600">
      {user?.email}
      {user?.email != null && (
        <span className="font-bold text-sm text-primary-500">
          {" "}
          - Primary
        </span>
      )}
    </p>
    {user?.additional_emails &&
      user?.additional_emails.map((email: any) => (
        <p key={email} className="text-slate-600 mb-2">
          {email}
        </p>
      ))}
  </div>
) : (
  <div className="max-w-sm">
    {/* <h2 className=" font-bold text-slate-600">Current Emails</h2>
    <div className="mb-2">
      <span className="block mt-1 text-sm font-semibold text-slate-600">
        {person?.work_email}
      </span>
      <span className="mt-1 text-slate-500 text-sm">Primary</span>
    </div>
    {person.email?.map((mail: any) => (
      <div key={mail.email} className="mb-2">
        <span className="block mt-1 text-sm text-slate-600">
          {mail.email}
        </span>
        <span
          className="mt-1 text-sm text-primary-500 cursor-pointer"
          onClick={makePrimary(mail.email)}
        >
          Make Primary
        </span>
        <span
          className="mt-1 text-sm ml-2 text-primary-500 cursor-pointer"
          onClick={removeEmail(mail.email)}
        >
          Remove
        </span>
      </div>
    ))}

    <InputText
      label="New Email"
      onChange={(e) => {
        setNewEmail(e.target.value);
      }}
      value={newEmail}
      name="new-email"
      placeholder="name@email.com"
    />

    <div className="flex mt-4">
      <ElemButton
        btn="primary"
        className="mr-2"
        onClick={onSave("email")}
      >
        Add
      </ElemButton>
      <ElemButton btn="white" onClick={() => setEditEmail(false)}>
        Cancel
      </ElemButton>
    </div> */}
  </div>
)}
</EditSection>
}