import React, { useState, useEffect } from "react";

import propTypes from "prop-types";

// Components
import { Tooltip, IconButton, Icon } from "@mui/material";

CopyToClipboardButton.propTypes = {
  value: propTypes.string.isRequired,
};

export default function CopyToClipboardButton({ value }) {
  const [open, setOpen] = useState(false);

  function copyToClipboard() {
    navigator.clipboard.writeText(value);
    setOpen(true);
  }

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Tooltip
      open={open}
      title="Copiado!"
      placement="bottom"
      enterTouchDelay={0}
      leaveTouchDelay={5000}
      onClick={copyToClipboard}>
      <IconButton size="small" onClick={copyToClipboard}>
        <Icon color="secondary">content_copy_icon </Icon>
      </IconButton>
    </Tooltip>
  );
}
