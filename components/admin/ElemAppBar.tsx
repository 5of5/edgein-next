/* eslint-disable @next/next/no-html-link-for-pages */

import React, { useState } from "react";
import { AppBar, useRedirect } from "react-admin";
import { useHotkeys } from "react-hotkeys-hook";
import ElemSearchBox from "../elem-search-box";
import SearchModal from "../search-modal";

const ElemAppBar = (props: any) => {
  const [showSearchModal, setShowSearchModal] = useState(false);

  const redirect = useRedirect();

  useHotkeys("ctrl+k, command+k", function (event) {
    event.preventDefault();
    setShowSearchModal(true);
  });

  return (
    <AppBar {...props}>
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
      <a
        href="/api/sync_algolia/"
        target={"_blank"}
        style={{
          border: "1px white solid",
          borderRadius: 4,
          padding: "0 8px",
          margin: "0 4px",
        }}
      >
        Sync Algolia
      </a>
    </AppBar>
  );
};

export default ElemAppBar;
