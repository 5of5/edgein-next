export const ElemLogo = (
  props: { mode: 'logo' | 'logo-inverted' | 'icon'; className?: string } = {
    mode: 'logo',
  },
) => {
  const customView = props.mode === 'icon' ? '0 0 23 25' : '0 0 116 25';

  return (
    <svg
      viewBox={customView}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}>
      {(props.mode === 'logo' || props.mode === 'logo-inverted') && (
        <path
          d="M35.12 21L30.58 10.02V21H28.56V6.64H31.26L36.08 18.3L40.88 6.64H43.6V21H41.56V10L37 21H35.12ZM50.9045 21.2C47.8445 21.2 45.7845 18.98 45.7845 15.64C45.7845 12.5 47.9245 10.2 50.8445 10.2C54.0045 10.2 56.1045 12.76 55.7445 16.2H47.8445C48.0045 18.36 49.0845 19.62 50.8645 19.62C52.3645 19.62 53.4045 18.8 53.7445 17.42H55.7445C55.2245 19.78 53.4045 21.2 50.9045 21.2ZM50.8045 11.72C49.1845 11.72 48.0845 12.88 47.8645 14.86H53.6045C53.5045 12.9 52.4445 11.72 50.8045 11.72ZM59.9122 15.02V21H57.8922V10.4H59.7722V12.16C60.4922 10.98 61.6922 10.2 63.1522 10.2C65.3322 10.2 66.7722 11.6 66.7722 14.14V21H64.7522V14.82C64.7522 13 63.9522 11.98 62.4522 11.98C61.0722 11.98 59.9122 13.14 59.9122 15.02ZM75.3956 19.04V20.82C74.7756 21.1 74.2356 21.2 73.5956 21.2C71.6356 21.2 70.2756 20.14 70.2756 17.8V12.12H67.9356V10.4H70.2756V7.26H72.2956V10.4H75.4956V12.12H72.2956V17.34C72.2956 18.8 72.9956 19.32 74.0756 19.32C74.5556 19.32 74.9756 19.24 75.3956 19.04ZM79.8834 7.94C79.8834 8.7 79.2834 9.28 78.4234 9.28C77.5634 9.28 76.9434 8.7 76.9434 7.94C76.9434 7.16 77.5634 6.6 78.4234 6.6C79.2834 6.6 79.8834 7.16 79.8834 7.94ZM79.4434 21H77.4234V10.4H79.4434V21ZM92.3677 15.7C92.3677 18.88 90.5277 21.2 87.6677 21.2C86.1677 21.2 84.8877 20.44 84.1277 19.1V21H82.2477V6.64H84.2677V12.22C85.0077 10.92 86.2277 10.2 87.6677 10.2C90.5077 10.2 92.3677 12.48 92.3677 15.7ZM90.2677 15.7C90.2677 13.3 89.0077 11.98 87.2677 11.98C85.5877 11.98 84.2677 13.28 84.2677 15.66C84.2677 18 85.5477 19.4 87.2677 19.4C89.0077 19.4 90.2677 18.06 90.2677 15.7ZM101.036 16.64V10.4H103.056V21H101.176V19.32C100.616 20.42 99.3756 21.2 97.9356 21.2C95.7956 21.2 94.3156 19.94 94.3156 17.22V10.4H96.3356V16.82C96.3356 18.66 97.2556 19.42 98.5756 19.42C99.9356 19.42 101.036 18.3 101.036 16.64ZM114.261 17.84C114.261 19.92 112.641 21.2 109.821 21.2C107.021 21.2 105.361 19.82 105.161 17.54H107.101C107.181 18.86 108.241 19.68 109.861 19.68C111.281 19.68 112.221 19.18 112.221 18.18C112.221 17.3 111.681 16.92 110.361 16.66L108.641 16.34C106.681 15.96 105.581 14.96 105.581 13.36C105.581 11.5 107.201 10.2 109.661 10.2C112.201 10.2 113.921 11.56 114.101 13.74H112.161C112.041 12.46 111.101 11.72 109.681 11.72C108.401 11.72 107.541 12.26 107.541 13.18C107.541 14.04 108.081 14.44 109.361 14.68L111.161 15.02C113.261 15.4 114.261 16.32 114.261 17.84Z"
          fill={props.mode === 'logo-inverted' ? '#ffffff' : '#0E0067'}
        />
      )}
      <g clipPath="url(#clip0_106_118)">
        <path
          d="M23 3.52076V24.4925L17.4352 22.521V1.54913L23 3.52076Z"
          fill={props.mode === 'logo-inverted' ? '#ffffff' : '#0E0067'}
        />
        <path
          d="M6.44934 22.5209L6.44934 1.54913L0.884461 3.52076L0.884461 24.4925L6.44934 22.5209Z"
          fill={props.mode === 'logo-inverted' ? '#ffffff' : '#0E0067'}
        />
        <path
          d="M14.7408 0.98581L14.7408 21.9576L11.9584 20.9718L9.17603 21.9576L9.17603 0.98581L11.9584 0L14.7408 0.98581Z"
          fill={props.mode === 'logo-inverted' ? '#ffffff' : '#0E0067'}
        />
      </g>
      <defs>
        <clipPath id="clip0_106_118">
          <rect
            width="25"
            height="23"
            fill="white"
            transform="matrix(0 1 -1 0 23 0)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
