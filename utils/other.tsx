import React from "react";

import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import CrunchBaseIcon from './CrunchBaseIcon';

import { crunchbaseImg } from "./constants";

export function RenderGoogleIcon({ topPos, leftPos, googleKeyWord }: any) {
  const url = "https://www.google.com/search?q=" + googleKeyWord;
  return (
    <div style={{ position: "absolute", top: topPos, left: leftPos }}>
      <a href={url} target="_blank" rel="noreferrer">
        <GoogleIcon />
      </a>
    </div>
  );
}

export function RenderLinkedinIcon({ topPos, leftPos, googleKeyWord }: any) {
  const url = "https://www.google.com/search?q=" + googleKeyWord + " Linkedin";

  return (
    <div style={{ position: "absolute", top: topPos, left: leftPos }}>
      <a href={url} target="_blank" rel="noreferrer">
        <LinkedInIcon />
      </a>
    </div>
  );
}
export function RenderGitHubIcon({ topPos, leftPos, googleKeyWord }: any) {
  const url = "https://www.google.com/search?q=" + googleKeyWord + " Github";

  return (
    <div style={{ position: "absolute", top: topPos, left: leftPos }}>
      <a href={url} target="_blank" rel="noreferrer">
        <GitHubIcon />
      </a>
    </div>
  );
}

export function RenderCBIcon({ topPos, leftPos, googleKeyWord }: any) {
  const url =
    "https://www.google.com/search?q=" + googleKeyWord + "  Crunchbase";

  return (
    <div style={{ position: "absolute", top: topPos, left: leftPos }}>
      <a href={url} target="_blank" rel="noreferrer">
        <CrunchBaseIcon />
      </a>
    </div>
  );
}
