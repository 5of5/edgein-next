import { FC, useEffect, useMemo, useState } from 'react';
import { useUser } from '@/context/user-context';
import { ElemModal } from '../elem-modal';
import { getListDisplayName } from '@/utils/lists';
import { Lists } from '@/graphql/types';
import { ElemListEditSection } from './elem-list-edit-section';
import { ElemButton } from '../elem-button';
import { zodValidate } from '@/utils/validation';
import { listSchema } from '@/utils/schema';
import { InputText } from '../input-text';
import { InputTextarea } from '../input-textarea';
import { InputSelect } from '../input-select';
import { InputSwitch } from '../input-switch';

type Props = {
  list: Lists;
  isPublicList: boolean;
  groups: Array<any>;
  onSaveListName: (name: string) => void;
  onSaveListDescription: (description: string) => void;
  onSaveListGroups: (ids: Array<number>) => void;
  onChangePublic: (value: boolean) => void;
  onDeleteList: (id: number) => void;
  isDeleting: boolean;
  listSettingsModal: boolean;
  onCloseSettingsDialog: () => void;
};

export const ElemListSettings: FC<Props> = ({
  list,
  isPublicList,
  groups,
  onSaveListName,
  onSaveListDescription,
  onSaveListGroups,
  onChangePublic,
  onDeleteList,
  isDeleting,
  listSettingsModal,
  onCloseSettingsDialog,
}) => {
  const { myGroups } = useUser();

  //Name
  const [listNameOpen, setListNameOpen] = useState(false);
  const [listName, setListName] = useState<string>();
  const [listNameError, setListNameError] = useState<string | null>(null);

  //Description
  const [listDescriptionOpen, setListDescriptionOpen] = useState(false);
  const [listDescription, setListDescription] = useState<string>();
  const [listDescriptionError, setListDescriptionError] = useState<
    string | null
  >(null);

  //Groups
  const [listGroupsOpen, setListGroupsOpen] = useState(false);
  const [listGroups, setListGroups] = useState<Array<any>>([]);
  const [listGroupsError, setListGroupsError] = useState<string | null>(null);

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

  const userGroupOptions = useMemo(() => {
    return myGroups.map(item => ({
      id: item.id,
      title: item.name,
    }));
  }, [myGroups]);

  const listNameValidate = (value: string) => {
    setListName(value);
    const { errors } = zodValidate({ name: value }, listSchema);
    if (errors) {
      setListNameError(errors['name']?.[0] || '');
    } else {
      setListNameError('');
    }
  };

  const validateDescription = (value: string) => {
    const urlRegex =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const emailsRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const emojisRegex =
      /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g; //[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu;

    setListDescription(value);

    const { errors } = zodValidate({ description: value }, listSchema);
    if (
      value.match(urlRegex) ||
      value.match(emailsRegex) ||
      value.match(emojisRegex)
    ) {
      setListDescriptionError(
        'URLs, emails, and special characters are not allowed in description.',
      );
    } else if (errors) {
      setListDescriptionError(errors['description']?.[0] || '');
    } else {
      setListDescriptionError('');
    }
  };

  const onSaveName = () => {
    if (listNameError || !listName) {
      return;
    }
    if (!listNameError) {
      listNameValidate(listName);
      onSaveListName(listName);
      setListNameOpen(false);
    }
  };

  const onSaveDescription = () => {
    if (listDescriptionError) {
      return;
    }

    if (!listDescription || listDescription === '') {
      onSaveListDescription('');
      setListDescriptionOpen(false);
    } else if (!listDescriptionError) {
      validateDescription(listDescription);
      onSaveListDescription(listDescription);
      setListDescriptionOpen(false);
    }
  };

  const onSaveGroups = () => {
    if (listGroupsError) {
      return;
    }
    const groupIds = listGroups.map((item: any) => item.id);
    onSaveListGroups(groupIds);
    setListGroupsOpen(false);
  };

  const onCloseSettingsModal = () => {
    onCloseSettingsDialog();
    setListNameOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };

  useEffect(() => {
    setListName(getListDisplayName(list) ?? '');
    setListNameError('');
  }, [list]);

  useEffect(() => {
    setListDescription(list?.description ?? '');
    setListDescriptionError('');
  }, [list?.description]);

  useEffect(() => {
    setListGroups(
      groups.map(item => ({
        id: item?.id,
        title: item?.name,
      })),
    );
    setListGroupsError('');
  }, [groups]);

  return (
    <ElemModal
      isOpen={listSettingsModal}
      onClose={onCloseSettingsModal}
      showCloseIcon={true}
      placement="center"
      panelClass="relative w-full max-w-lg bg-white rounded-lg px-4 py-3 z-10 my-10">
      <div className="pb-3 border-b border-gray-200">
        <h2 className="text-xl font-medium">List settings</h2>
      </div>

      <div className="flex flex-col pt-4 gap-y-4">
        <div className="bg-white border border-gray-200 divide-y divide-gray-200 rounded-lg ">
          <ElemListEditSection
            heading={
              <button onClick={() => setListNameOpen(true)}>Name</button>
            }
            right={
              !listNameOpen ? (
                <ElemButton
                  onClick={() => setListNameOpen(true)}
                  btn="transparent"
                  className="!p-0">
                  Edit
                </ElemButton>
              ) : (
                <></>
              )
            }>
            {!listNameOpen ? (
              <button
                onClick={() => setListNameOpen(true)}
                className="text-sm text-left text-gray-600 first-letter:uppercase">
                {listName}
              </button>
            ) : (
              <>
                <div className="mt-2">
                  <InputText
                    onChange={e => listNameValidate(e?.target.value)}
                    name="name"
                    type="text"
                    value={listName}
                    className={`!mt-0 ${
                      listNameError === ''
                        ? 'ring-1 ring-gray-200'
                        : 'ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400'
                    }`}
                  />
                  {listNameError && (
                    <div className="mt-2 text-sm font-medium text-rose-400">
                      {listNameError}
                    </div>
                  )}
                </div>
                <div className="flex w-full mt-2 gap-x-2">
                  <ElemButton btn="gray" onClick={() => setListNameOpen(false)}>
                    Cancel
                  </ElemButton>
                  <ElemButton
                    onClick={onSaveName}
                    disabled={listName === '' || Boolean(listNameError)}
                    roundedFull
                    btn="primary">
                    Save
                  </ElemButton>
                </div>
              </>
            )}
          </ElemListEditSection>

          <ElemListEditSection
            heading={
              <button onClick={() => setListDescriptionOpen(true)}>
                Description
              </button>
            }
            right={
              !listNameOpen ? (
                <ElemButton
                  onClick={() => setListDescriptionOpen(true)}
                  btn="transparent"
                  className="!p-0">
                  Edit
                </ElemButton>
              ) : (
                <></>
              )
            }>
            {!listDescriptionOpen ? (
              <button
                onClick={() => setListDescriptionOpen(true)}
                className="text-sm text-left text-gray-600">
                {listDescription ? listDescription : 'Add Description'}
              </button>
            ) : (
              <>
                <div className="mt-2">
                  <InputTextarea
                    name="description"
                    rows={4}
                    value={listDescription}
                    onChange={e => validateDescription(e?.target.value)}
                    placeholder="Add description"
                    className={`!mt-0 ${
                      listDescriptionError === ''
                        ? 'ring-1 ring-gray-200'
                        : 'ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400'
                    }`}
                  />

                  {listDescriptionError && (
                    <div className="mt-2 text-sm font-medium text-rose-400">
                      {listDescriptionError}
                    </div>
                  )}
                </div>
                <div className="flex w-full mt-2 gap-x-2">
                  <ElemButton
                    btn="gray"
                    onClick={() => setListDescriptionOpen(false)}>
                    Cancel
                  </ElemButton>
                  <ElemButton
                    onClick={onSaveDescription}
                    disabled={Boolean(listDescriptionError)}
                    roundedFull
                    btn="primary">
                    Save
                  </ElemButton>
                </div>
              </>
            )}
          </ElemListEditSection>

          <ElemListEditSection
            heading={
              <button onClick={() => setListGroupsOpen(true)}>
                Add to group(s)
              </button>
            }
            right={
              !listNameOpen ? (
                <ElemButton
                  onClick={() => setListGroupsOpen(true)}
                  btn="transparent"
                  className="!p-0">
                  Edit
                </ElemButton>
              ) : (
                <></>
              )
            }>
            {!listGroupsOpen ? (
              <button
                onClick={() => setListGroupsOpen(true)}
                className="text-sm text-gray-600 capitalize">
                {groups && groups?.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {groups.map((item: any, index: number) => {
                      if (!item) {
                        return;
                      }
                      return (
                        <p
                          key={index}
                          className="px-2 py-1 capitalize bg-gray-100 rounded-md">
                          {item?.name}
                        </p>
                      );
                    })}
                  </div>
                ) : (
                  <>Share list with group</>
                )}
              </button>
            ) : (
              <>
                <div className="mt-2">
                  <InputSelect
                    className="w-full"
                    buttonClasses="w-full"
                    dropdownClasses="w-full"
                    multiple
                    by="id"
                    value={listGroups}
                    onChange={setListGroups}
                    options={userGroupOptions}
                    placeholder="Select group(s) to share with"
                  />
                  {listGroupsError === '' ? null : (
                    <div className="mt-2 text-sm font-medium text-rose-400">
                      {listGroupsError}
                    </div>
                  )}
                </div>
                <div className="flex w-full mt-2 gap-x-2">
                  <ElemButton
                    btn="gray"
                    onClick={() => setListGroupsOpen(false)}>
                    Cancel
                  </ElemButton>
                  <ElemButton
                    onClick={onSaveGroups}
                    disabled={Boolean(listGroupsError)}
                    roundedFull
                    btn="primary">
                    Save
                  </ElemButton>
                </div>
              </>
            )}
          </ElemListEditSection>

          <div
            className="flex items-center justify-between w-full p-3 space-x-1 cursor-pointer"
            onClick={() => onChangePublic(!isPublicList)}>
            <p className="font-medium">Public</p>
            <InputSwitch
              className="cursor-pointer"
              checked={isPublicList}
              onChange={() => {}}
            />
          </div>
        </div>

        <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
          <button
            className="w-full p-3 text-rose-500 hover:bg-red-500 hover:text-white"
            onClick={() => {
              setIsOpenDeleteModal(true);
            }}>
            <div className="text-left ">
              <h3 className="flex items-center font-medium">Delete List</h3>
            </div>
          </button>
        </div>
      </div>

      <ElemModal
        isOpen={isOpenDeleteModal}
        onClose={handleCloseDeleteModal}
        showCloseIcon={true}
        placement="center"
        panelClass="relative w-full max-w-lg bg-white rounded-lg px-4 py-6 pb-3 z-10 my-10">
        <div>
          <h2 className="text-xl font-medium">Delete this list?</h2>
        </div>
        <div className="pt-1">
          When you delete a list, everything in it will be removed immediately.{' '}
          <span className="font-medium text-rose-500">
            This can&apos;t be undone.
          </span>
        </div>

        <div className="flex items-center justify-end pt-3 mt-3 border-t border-gray-200 gap-x-2">
          <ElemButton
            onClick={handleCloseDeleteModal}
            roundedFull
            btn="default">
            Cancel
          </ElemButton>
          <ElemButton
            onClick={() => onDeleteList(list?.id)}
            roundedFull
            loading={isDeleting}
            btn="danger">
            Delete
          </ElemButton>
        </div>
      </ElemModal>
    </ElemModal>
  );
};
