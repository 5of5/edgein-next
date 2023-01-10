import { ChangeEvent, useState } from "react";
import { useMutation } from "react-query";
import { useUser } from "@/context/userContext";
import { User_Groups } from "@/graphql/types";
import { InputText } from "../InputText";

type Props = {
  label: string;
  field: keyof User_Groups;
  group: User_Groups;
  onUpdateGroupData: (data: any) => void;
};

const ElemSettingEditableField: React.FC<Props> = ({
  label,
  field,
  group,
  onUpdateGroupData,
}) => {
  const { user } = useUser();

  const [editMode, setEditMode] = useState<boolean>(false);

  const [value, setValue] = useState<string>(group[field]);

  const [error, setError] = useState<string | null>(null);

  const isGroupManager = user?.id === group.created_by_user_id;

  const { mutate } = useMutation(
    () =>
      fetch("/api/groups/", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: group.id,
          payload: {
            [field]: value,
          },
        }),
      }),
    {
      onSuccess: async (response) => {
        if (response.status !== 200) {
          const err = await response.json();
          setError(err.message);
        } else {
          onUpdateGroupData((prev: User_Groups) => ({
            ...prev,
            [field]: value,
          }));
          handleCloseEditMode();
        }
      },
    }
  );

  const handleOpenEditMode = () => {
    setEditMode(true);
  };

  const handleCloseEditMode = () => {
    setEditMode(false);
  };

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleCancel = () => {
    setEditMode(false);
    setValue(group[field]);
    setError(null);
  };

  const handleSave = () => {
    setError(null);
    mutate();
  };

  return (
    <div className="flex items-start justify-between px-4 py-3 hover:bg-slate-100">
      <div className=" flex-auto pr-4">
        <p className="font-bold">{label}</p>
        {editMode ? (
          <div>
            <InputText
              name={field}
              value={value}
              onChange={handleChangeValue}
              placeholder={`Enter the groups's ${field}`}
              className="ring-1 ring-slate-200"
            />
            {error && <p className=" text-red-600 text-sm mt-2">{error}</p>}
          </div>
        ) : (
          <p className="text-slate-500">{group[field]}</p>
        )}
      </div>
      {isGroupManager && (
        <>
          {editMode ? (
            <div className="flex items-center gap-3">
              <div
                className="font-bold text-sm text-primary-500 cursor-pointer"
                onClick={handleSave}
              >
                Save
              </div>
              <div
                className="font-bold text-sm text-primary-500 cursor-pointer"
                onClick={handleCancel}
              >
                Cancel
              </div>
            </div>
          ) : (
            <div
              className="font-bold text-sm text-primary-500 cursor-pointer"
              onClick={handleOpenEditMode}
            >
              Edit
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ElemSettingEditableField;
