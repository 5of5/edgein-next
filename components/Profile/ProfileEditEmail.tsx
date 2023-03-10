import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import validator from "validator";
import { useUser } from "@/context/userContext";
import { EditSection } from "../Dashboard/EditSection";
import { ElemButton } from "../ElemButton";
import { InputText } from "../InputText";

type Props = {};

export const ProfileEditEmail: React.FC<Props> = ({}) => {
  const { user, refreshUser } = useUser();
  const [editEmail, setEditEmail] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const onEdit = () => {
    setEditEmail(true);
  };

  const onCancel = () => {
    setEditEmail(false);
    setNewEmail("");
    setEmailError("");
  };

  const onChangeNewEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmailError("");
    setNewEmail(value);
  };

  const onShowToast = (message: string) => {
    toast.custom(
      (t) => (
        <div
          className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
            t.visible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {message}
        </div>
      ),
      {
        duration: 5000,
        position: "top-center",
      }
    );
  };

  const onSaveNewEmail = async () => {
    if (validator.isEmail(newEmail)) {
      setEmailError("");
      await fetch("/api/send_confirm_additional_email/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: newEmail,
        }),
      });
      onShowToast(`A verify link has been sent to your email ${newEmail}. Please check your mailbox.`);
      onCancel();
    } else {
      setEmailError("Invalid email address");
    }
  };

  const onRemoveEmail = async (email: string) => {
    await fetch("/api/update_additional_emails/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        additionalEmails: [
          ...(user?.additional_emails ?? []).filter((item) => item !== email),
        ],
      }),
    });
    refreshUser();
    onShowToast(`Removed email ${email}`);
  };

  return (
    <EditSection
      heading="Email"
      right={
        !editEmail ? (
          <button
            onClick={onEdit}
            className="text-primary-500 hover:text-dark-500"
          >
            Edit
          </button>
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
          <h2 className=" font-bold text-slate-600">Current Emails</h2>
          <div className="mb-2">
            <span className="block mt-1 text-sm font-semibold text-slate-600">
              {user?.email}
            </span>
            <span className="mt-1 text-slate-500 text-sm">Primary</span>
          </div>
          {user?.additional_emails?.map((email: any) => (
            <div key={email} className="mb-2">
              <span className="block mt-1 text-sm text-slate-600">{email}</span>
              <span
                className="mt-1 text-sm text-primary-500 cursor-pointer"
                onClick={() => onRemoveEmail(email)}
              >
                Remove
              </span>
            </div>
          ))}

          <InputText
            label="New Email"
            onChange={onChangeNewEmail}
            value={newEmail}
            name="new-email"
            placeholder="name@email.com"
            className={`${
              emailError === ""
                ? "ring-1 ring-slate-200"
                : "ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400"
            }`}
          />
          {emailError && (
            <span className="mt-2 font-bold text-sm text-rose-400">
              {emailError}
            </span>
          )}

          <div className="flex mt-4">
            <ElemButton
              btn="primary"
              className="mr-2"
              disabled={!!emailError || !newEmail}
              onClick={onSaveNewEmail}
            >
              Add
            </ElemButton>
            <ElemButton btn="white" onClick={onCancel}>
              Cancel
            </ElemButton>
          </div>
        </div>
      )}
      <Toaster />
    </EditSection>
  );
};
