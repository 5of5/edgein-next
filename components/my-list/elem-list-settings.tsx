import { Switch } from '@headlessui/react';
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

type Props = {
  list: Lists;
  isPublicList: boolean;
  groups: Array<any>;
  onSaveListName: (name: string) => void;
  onSaveListDescription: (name: string) => void;
  onSaveListGroups: (ids: Array<number>) => void;
  onChangePublic: (value: boolean) => void;
  onDeleteList: (id: number) => void;
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

  const [listDeleteModal, setListDeleteModal] = useState(false);

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
    setListDescription(value);
    const { errors } = zodValidate({ description: value }, listSchema);
    if (errors) {
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
    if (listDescription || listDescription === '') {
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
      onClose={() => {
        onCloseSettingsDialog(), setListNameOpen(false);
      }}
      showCloseIcon={true}
      placement="center"
      panelClass="relative w-full max-w-lg bg-white rounded-lg px-4 py-3 z-10 my-10"
    >
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
                  className="!p-0"
                >
                  Edit
                </ElemButton>
              ) : (
                <></>
              )
            }
          >
            {!listNameOpen ? (
              <button
                onClick={() => setListNameOpen(true)}
                className="text-sm text-gray-600 capitalize"
              >
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
                        ? 'ring-1 ring-slate-200'
                        : 'ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400'
                    }`}
                  />
                  {listNameError && (
                    <div className="mt-2 text-sm font-bold text-rose-400">
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
                    btn="primary"
                  >
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
                  className="!p-0"
                >
                  Edit
                </ElemButton>
              ) : (
                <></>
              )
            }
          >
            {!listDescriptionOpen ? (
              <button
                onClick={() => setListDescriptionOpen(true)}
                className="text-sm text-left text-gray-600 capitalize"
              >
                {listDescription}
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
                        ? 'ring-1 ring-slate-200'
                        : 'ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400'
                    }`}
                  />

                  {listDescriptionError && (
                    <div className="mt-2 text-sm font-bold text-rose-400">
                      {listDescriptionError}
                    </div>
                  )}
                </div>
                <div className="flex w-full mt-2 gap-x-2">
                  <ElemButton
                    btn="gray"
                    onClick={() => setListDescriptionOpen(false)}
                  >
                    Cancel
                  </ElemButton>
                  <ElemButton
                    onClick={onSaveDescription}
                    disabled={
                      listDescription === '' || Boolean(listDescriptionError)
                    }
                    roundedFull
                    btn="primary"
                  >
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
                  className="!p-0"
                >
                  Edit
                </ElemButton>
              ) : (
                <></>
              )
            }
          >
            {!listGroupsOpen ? (
              <button
                onClick={() => setListGroupsOpen(true)}
                className="text-sm text-gray-600 capitalize"
              >
                {groups && groups?.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {groups.map((item: any, index: number) => {
                      if (!item) {
                        return;
                      }
                      return (
                        <p
                          key={index}
                          className="px-2 py-1 capitalize bg-gray-100 rounded-md"
                        >
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
                    <div className="mt-2 text-sm font-bold text-rose-400">
                      {listGroupsError}
                    </div>
                  )}
                </div>
                <div className="flex w-full mt-2 gap-x-2">
                  <ElemButton
                    btn="gray"
                    onClick={() => setListGroupsOpen(false)}
                  >
                    Cancel
                  </ElemButton>
                  <ElemButton
                    onClick={onSaveGroups}
                    disabled={Boolean(listGroupsError)}
                    roundedFull
                    btn="primary"
                  >
                    Save
                  </ElemButton>
                </div>
              </>
            )}
          </ElemListEditSection>

          <div
            className="flex items-center justify-between w-full p-3 space-x-1 cursor-pointer"
            onClick={() => onChangePublic(!isPublicList)}
          >
            <p className="font-medium">Public</p>
            <Switch
              checked={isPublicList}
              onChange={onChangePublic}
              className={`${
                isPublicList ? 'bg-primary-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Set list public</span>
              <span
                className={`${
                  isPublicList ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </div>

        <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
          <button
            className="w-full p-3 text-rose-500 hover:bg-red-500 hover:text-white"
            onClick={() => {
              setListDeleteModal(true);
            }}
          >
            <div className="text-left ">
              <h3 className="flex items-center font-medium">Delete List</h3>
            </div>
          </button>
        </div>
      </div>
      <ElemModal
        isOpen={listDeleteModal}
        onClose={() => {
          setListDeleteModal(false);
        }}
        showCloseIcon={true}
        placement="center"
        panelClass="relative w-full max-w-sm bg-white rounded-lg px-4 py-3 z-10 my-10"
      >
        <div className="pb-3 border-b border-gray-200">
          <h2 className="text-xl font-medium">Delete list?</h2>
        </div>

        <div className="pt-4">
          <p className="text-sm text-gray-600">
            When you delete a list, everything in it will be removed
            immediately.{' '}
            <span className="font-medium text-rose-500">
              This can&apos;t be undone.
            </span>
          </p>
          <div className="flex w-full pt-4 gap-x-2">
            <ElemButton btn="gray" onClick={() => setListDeleteModal(false)}>
              Cancel
            </ElemButton>
            <ElemButton
              onClick={() => onDeleteList(list?.id)}
              roundedFull
              btn="danger"
            >
              Delete list
            </ElemButton>
          </div>
        </div>
      </ElemModal>
    </ElemModal>
  );
};
