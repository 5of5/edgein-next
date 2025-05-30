import React from 'react';

import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export const CrunchbaseIcon = () => {
  return (
    <svg
      style={{
        transform: `scale(${24 / 64}, ${24 / 64})`,
        transformOrigin: '2px 2px',
      }}
      width={64}
      height={64}
      viewBox="0 0 64 64.000002"
      dangerouslySetInnerHTML={{
        __html: `<path
     style="clip-rule:evenodd;fill:#0a4063;fill-opacity:1;fill-rule:evenodd;stroke-width:0.10474632;stroke-linejoin:round;stroke-miterlimit:1.41400003"
     d="m 64.000001,8.0000025 c 0,-4.41736 -3.58264,-8 -8,-8 H 7.9999985 c -4.41736,0 -8,3.58264 -8,8 V 55.999997 c 0,4.41736 3.58264,8 8,8 H 56.000001 c 4.41736,0 8,-3.58264 8,-8 z"
     id="path7" />
  <g
     id="g871"
     transform="matrix(2.3849106,0,0,2.3849106,-9.5449499,-43.547318)"
     style="fill:#ffffff">
    <path
       style="fill:#ffffff;fill-opacity:1;stroke-width:0.57408553"
       id="path6"
       d="m 13.939838,33.65836 a 2.9622812,2.9622812 0 1 1 0.03444,-2.439863 h 2.296342 a 5.1667696,5.1667696 0 1 0 0,2.439863 h -2.296342 z" />
    <path
       style="fill:#ffffff;fill-opacity:1;stroke-width:0.57408553"
       id="path18"
       d="m 23.510509,27.257306 h -0.378897 a 5.0978793,5.0978793 0 0 0 -2.525976,0.889833 v -5.752337 h -2.095412 v 14.794184 h 2.106894 v -0.539641 a 5.1667696,5.1667696 0 1 0 2.893391,-9.392039 z m 2.962281,5.534185 v 0.09185 a 2.9393178,2.9393178 0 0 1 -0.08037,0.361674 v 0 a 2.933577,2.933577 0 0 1 -0.143521,0.373156 v 0.04593 a 2.9795038,2.9795038 0 0 1 -2.072449,1.624662 v 0 l -0.281302,0.04593 h -0.06315 a 2.9163544,2.9163544 0 0 1 -0.321488,0 v 0 a 2.9622812,2.9622812 0 0 1 -0.40186,-0.02871 H 23.0168 a 2.933577,2.933577 0 0 1 -0.752052,-0.229634 h -0.05741 a 2.9737629,2.9737629 0 0 1 -0.66594,-0.447787 v 0 a 2.9909855,2.9909855 0 0 1 -0.522417,-0.625753 v 0 a 2.9622812,2.9622812 0 0 1 -0.189449,-0.367414 v 0 a 2.9450587,2.9450587 0 0 1 0.03445,-2.439864 v 0 a 2.9680221,2.9680221 0 0 1 2.376714,-1.68207 2.933577,2.933577 0 0 1 0.304265,0 v 0 a 2.9680221,2.9680221 0 0 1 2.927836,2.881909 v 0 a 2.9565404,2.9565404 0 0 1 0,0.396119 z" />
  </g>`,
      }}
    />
  );
};

export function RenderGoogleIcon({ topPos, leftPos, googleKeyWord }: any) {
  const url = 'https://www.google.com/search?q=' + googleKeyWord;
  return (
    <div style={{ position: 'absolute', top: topPos, left: leftPos }}>
      <a href={url} target="_blank" rel="noreferrer">
        <GoogleIcon />
      </a>
    </div>
  );
}

export function RenderLinkedinIcon({ topPos, leftPos, googleKeyWord }: any) {
  const url = 'https://www.google.com/search?q=' + googleKeyWord + ' Linkedin';

  return (
    <div style={{ position: 'absolute', top: topPos, left: leftPos }}>
      <a href={url} target="_blank" rel="noreferrer">
        <LinkedInIcon />
      </a>
    </div>
  );
}
export function RenderGitHubIcon({ topPos, leftPos, googleKeyWord }: any) {
  const url = 'https://www.google.com/search?q=' + googleKeyWord + ' Github';

  return (
    <div style={{ position: 'absolute', top: topPos, left: leftPos }}>
      <a href={url} target="_blank" rel="noreferrer">
        <GitHubIcon />
      </a>
    </div>
  );
}

export function RenderCBIcon({ topPos, leftPos, googleKeyWord }: any) {
  const url =
    'https://www.google.com/search?q=' + googleKeyWord + '  Crunchbase';

  return (
    <div style={{ position: 'absolute', top: topPos, left: leftPos }}>
      <a href={url} target="_blank" rel="noreferrer">
        <CrunchbaseIcon />
      </a>
    </div>
  );
}
