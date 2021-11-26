export function getFileImage(file: File): Promise<HTMLImageElement> {
  const img = new Image();
  img.src = URL.createObjectURL(file);
  return new Promise((resolve) => {
    img.addEventListener("load", function () {
      resolve(this);
      this.remove();
    });
  });
}
