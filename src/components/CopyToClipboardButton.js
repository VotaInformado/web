import React, { useState, useEffect } from "react";

import propTypes from "prop-types";

// Components
import { Tooltip, IconButton, Icon } from "@mui/material";
import { toast } from "react-toastify";

CopyToClipboardButton.propTypes = {
  value: propTypes.string.isRequired,
};

export default function CopyToClipboardButton({ value }) {
  const [open, setOpen] = useState(false);

  function copyToClipboard() {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setOpen(true);
      })
      .catch((err) => {
        toast.error("No se pudo copiar");
      });
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
    <Tooltip open={open} title="Copiado!" placement="bottom" enterTouchDelay={0} leaveTouchDelay={5000}>
      <IconButton size="small" onClick={copyToClipboard}>
        <Icon color="secondary">content_copy_icon </Icon>
      </IconButton>
    </Tooltip>
  );
}
