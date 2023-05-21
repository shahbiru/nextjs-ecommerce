import React from "react";

function DangerIcon(props) {
  return (
    <svg viewBox="0 0 512 512" {...props}>
      <path
        d="M496 160l-144-144c-9.4-9.4-24.6-9.4-33.9 0L16 409.1c-9.4 9.4-9.4 24.6 0 33.9L160 496c9.4 9.4 24.6 9.4 33.9 0L496 176c9.5-9.4 9.5-24.6 0-33.9z"
      />
      <path
        d="M160 16L16 160c-9.4 9.4-9.4 24.6 0 33.9l304 304c9.4 9.4 24.6 9.4 33.9 0l144-144c9.5-9.4 9.5-24.6 0-33.9L193.9 16c-9.4-9.4-24.6-9.4-33.9 0z"
      />
    </svg>
  );
}

export default DangerIcon;
