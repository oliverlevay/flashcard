const awaitJson = (responses: Response[]): Promise<{ url: string }[]> =>
  Promise.all(
    responses.map((response) => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
  );

export const uploadFiles = async (files: File[]) => {
  let errors: string[] = [];
  let imageUrls: string[] = [];
  let responses: Promise<Response>[] = [];
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "flashcard");
    const response = fetch("https://api.cloudinary.com/v1_1/sakur/upload", {
      method: "post",
      body: data,
    });
    responses.push(response);
  }
  await Promise.all(responses)
    .then(awaitJson)
    .then((dataArray) => dataArray.forEach((data) => imageUrls.push(data.url)));
  return { errors, imageUrls };
};
