/* eslint-disable @next/next/no-html-link-for-pages */

import React, { useState } from 'react';
import { AppBar, Button, useRedirect } from 'react-admin';
import { grey } from '@mui/material/colors';
import { useHotkeys } from 'react-hotkeys-hook';
import { ElemSearchBox } from '../elem-search-box';
import SearchModal from '../search-modal';

const ElemAppBar = (props: any) => {
  const [showSearchModal, setShowSearchModal] = useState(false);

  const redirect = useRedirect();

  useHotkeys('ctrl+k, command+k', function (event) {
    event.preventDefault();
    setShowSearchModal(true);
  });

  return (
    <AppBar
      {...props}
      elevation={0}
      sx={{
        backgroundColor: '#2B2A32',
        color: grey[100],
        borderBottom: `1px solid ${grey[300]}`,
      }}>
      <h6 className="min-w-[150px] mr-8" id="react-admin-title" />
      <div className="flex-1">
        <ElemSearchBox
          onClick={() => {
            setShowSearchModal(true);
          }}
        />
      </div>
      <SearchModal
        show={showSearchModal}
        isAdmin
        redirect={redirect}
        onClose={() => setShowSearchModal(false)}
      />
      <a href="/api/sync-algolia/" target="_blank">
        <Button
          label="Sync Algolia"
          variant="contained"
          color="primary"
          size="medium"
          startIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-4 h-4 fill-white">
              <path d="M12 2C6.535 2 2.08 6.397 2 11.833c-.08 5.52 4.408 10.094 9.94 10.126a9.946 9.946 0 0 0 4.815-1.2.233.233 0 0 0 .043-.38l-.935-.827a.662.662 0 0 0-.695-.116 8.096 8.096 0 0 1-3.27.64c-4.471-.055-8.083-3.767-8.011-8.228C3.958 7.444 7.57 3.883 12 3.883h8.113v14.392l-4.603-4.082a.34.34 0 0 0-.498.052 3.774 3.774 0 0 1-6.775-1.976 3.773 3.773 0 0 1 7.522-.622.67.67 0 0 0 .22.444l1.2 1.061c.136.12.351.047.385-.132a5.66 5.66 0 0 0 .083-1.435c-.193-2.81-2.474-5.07-5.29-5.243-3.23-.199-5.93 2.322-6.015 5.483-.084 3.08 2.444 5.734 5.53 5.802a5.635 5.635 0 0 0 3.449-1.076l6.014 5.32a.4.4 0 0 0 .665-.298V2.38c0-.21-.17-.379-.38-.379H12Z" />
            </svg>
          }
          sx={{
            borderRadius: '4rem',
            margin: '0 4px',
            textTransform: 'none',
          }}
        />
      </a>
    </AppBar>
  );
};

export default ElemAppBar;
