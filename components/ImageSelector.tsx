import styled from "styled-components";
import { Container, Paper, Stack, TextField } from "@mui/material";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactCrop, { Crop } from "react-image-crop";
import { getCroppedImg } from "../src/getCroppedImg";
import { getFileImage } from "../src/getFileImage";

export default function ImageSelector({
  image,
  setImage,
}: {
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
}) {
  const [file, setFile] = useState<File>();
  const [crop, setCrop] = useState<Partial<Crop>>({
    aspect: 16 / 9,
    width: 500,
  });
  const [cropFile, setCropFile] = useState<string>("");
  const [imageElement, setImageElement] = useState<HTMLImageElement>();

  const handleCropComplete = useCallback(async () => {
    if (file && imageElement) {
      const cropImage = await getCroppedImg(imageElement, crop as Crop);
      setImage(URL.createObjectURL(cropImage));
    }
  }, [file, crop, imageElement]);

  useEffect(() => {
    if (!image) {
      handleCropComplete();
    }
  }, [file, imageElement, handleCropComplete]);

  useEffect(() => {
    if (file) {
      setCropFile(URL.createObjectURL(file));
      handleCropComplete();
    } else {
      setImage("");
    }
  }, [file]);

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
    <Stack minHeight={100}>
      <TextField
        type="file"
        variant="standard"
        title="Upload a textfile"
        onChange={handleFileChange}
        inputProps={{ accept: "image" }}
      />
      {cropFile && (
        <ReactCrop
          imageStyle={{ width: 552 }}
          minHeight={16}
          minWidth={9}
          src={cropFile}
          crop={crop}
          onChange={setCrop}
          onComplete={handleCropComplete}
          onImageLoaded={setImageElement}
        />
      )}
    </Stack>
  );
}
