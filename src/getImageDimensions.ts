export function getImageDimensions(
  src: File | Blob
): Promise<{ width: number; height: number }> {
  const img = new Image();
  img.src = URL.createObjectURL(src);
  return new Promise((resolve) => {
    img.addEventListener("load", function () {
      resolve({ width: this.width, height: this.height });
      this.remove();
    });
  });
}
