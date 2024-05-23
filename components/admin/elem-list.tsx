import React, {
  ChangeEvent,
  FC,
  MutableRefObject,
  PropsWithChildren,
  ReactElement,
  useRef,
} from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {
  List,
  Datagrid,
  Pagination,
  BulkDeleteButton,
  BulkExportButton,
  TopToolbar,
  Button,
  CreateButton,
  ExportButton,
} from 'react-admin';

type Props = {
  filters?: ReactElement | ReactElement[];
  enableDelete?: boolean;
  enableIngest?: boolean;
  onClickIngest?: () => void;
  onFileChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

type ListBulkActionProps = {
  enableDelete: boolean;
};

const ListActions = ({
  enableIngest,
  onFileChange,
  fileUploadRef,
}: {
  enableIngest: boolean;
  onFileChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  fileUploadRef: MutableRefObject<any>;
}) => {
  return (
    <TopToolbar>
      <CreateButton />
      {enableIngest && (
        <>
          <Button
            label="Ingest"
            variant="text"
            onClick={() => fileUploadRef.current.click()}
            startIcon={<FileUploadIcon />}
          />
          <input
            type="file"
            onChange={onFileChange}
            ref={fileUploadRef}
            style={{ display: 'none' }}
          />
        </>
      )}
      <ExportButton />
    </TopToolbar>
  );
};

const ListBulkActions = ({ enableDelete }: ListBulkActionProps) => (
  <>
    {enableDelete && <BulkDeleteButton />}
    <BulkExportButton />
  </>
);

const ElemList: FC<PropsWithChildren<Props>> = ({
  filters,
  enableDelete = false,
  enableIngest = false,
  onFileChange,
  children,
}) => {
  const fileUploadRef = useRef(null);

  return (
    <List
      filters={filters}
      actions={
        <ListActions
          enableIngest={enableIngest}
          onFileChange={onFileChange}
          fileUploadRef={fileUploadRef}
        />
      }
      pagination={<Pagination rowsPerPageOptions={[5, 10, 25, 50, 100, 250]} />}
      sx={{
        '.MuiToolbar-root': {
          justifyContent: 'start !important',
          paddingTop: 0,
          marginBottom: '4px',
        },
        '.RaBulkActionsToolbar-toolbar': {
          justifyContent: 'start !important',
        },
        '.MuiToolbar-root .MuiButtonBase-root': {
          paddingTop: 0,
          paddingBottom: 0,
          margin: '4px',
        },
        '.RaBulkActionsToolbar-topToolbar': {
          paddingTop: 0,
          paddingBottom: 0,
          marginBottom: 0,
        },
        '.MuiToolbar-root form': {
          flex: '0 1 auto',
        },
        '.MuiToolbar-root form .MuiFormControl-root': {
          margin: 0,
        },
      }}>
      <Datagrid
        bulkActionButtons={<ListBulkActions enableDelete={enableDelete} />}>
        {children}
      </Datagrid>
    </List>
  );
};

export default ElemList;
