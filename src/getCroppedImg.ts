import { Crop } from "react-image-crop";

export function getCroppedImg(image: HTMLImageElement, crop: Crop): Promise<Blob> {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalHeight / image.height;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  // New lines to be added
  const pixelRatio = window.devicePixelRatio;
  canvas.width = crop.width * pixelRatio;
  canvas.height = crop.height * pixelRatio;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = "high";
  
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if(blob) {
          resolve(blob);
        }
        else {
          reject("No blob");
        }
      },
      "image/jpeg",
      1
    );
  });
}
