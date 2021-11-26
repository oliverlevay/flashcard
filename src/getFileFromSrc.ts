export function getFileFromSrc(src: string, title: string) {
  return fetch(src)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], title, { type: "image/jpeg" });
    });
}
