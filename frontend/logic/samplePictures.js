import { fetchBlob, fetchPicture, fetchSamplePictures } from "./fetch";
import { displayPreview } from "./previewPicture";

async function displaySamplePictures() {
  let samplePicturesContainer = document.querySelector("#sample-pictures-container");
  if (samplePicturesContainer) {
    samplePicturesContainer.remove();
    return;
  }

  samplePicturesContainer = document.createElement("div");
  samplePicturesContainer.id = "sample-pictures-container";
  samplePicturesContainer.classList.add("sample-pictures");

  const app = document.querySelector("#app")
  const pictureInput = document.querySelector("#picture-input");
  app.insertBefore(samplePicturesContainer, pictureInput);

  const samplePictures = await fetchSamplePictures();
  for (const samplePictureName of samplePictures) {
    const picture = await fetchPicture(`http://localhost:8080/api/picture/sample-pictures/${samplePictureName}`, "GET");
    const pictureBlobUrl = URL.createObjectURL(picture);

    const samplePicture = document.createElement("img");
    samplePicture.id = samplePictureName;
    samplePicture.height = 100;
    samplePicture.alt = samplePictureName;
    samplePicture.src = pictureBlobUrl;
    samplePicture.classList.add("pointer");
    samplePicture.onclick = loadSamplePicture;
  
    samplePicturesContainer.append(samplePicture);
  }
}

async function loadSamplePicture(event) {
  const file = await fetchBlob(event.target.src);
  const filename = event.target.id;
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(new File([file], filename, {type: file.type}));
  const pictureInput = document.querySelector("#picture-input");
  pictureInput.files = dataTransfer.files;
  displayPreview();
}

export { displaySamplePictures };
