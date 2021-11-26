import { Stack, TextField, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from "react";

export default function CreateFlashDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const [file, setFile] = useState<File>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const input = event.target as HTMLInputElement;
      if (input?.files) {
        setFile(input.files[0]);
      }
    },
    []
  );


  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Stack flexDirection="row" justifyContent="space-between">
          <DialogTitle id="alert-dialog-title">{"Content"}</DialogTitle>
        </Stack>
        <DialogContent>
        <TextField
            type="file"
            variant="standard"
            title="Upload a textfile"
            onChange={handleFileChange}
            inputProps={{ accept: "image" }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
