import { fetchPicture } from "./fetch";
import { openModal } from "./modalWindow";

async function processPicture(endpoint, uploadedFile) {
  const filename = uploadedFile.name.substring(0, uploadedFile.name.lastIndexOf('.')) + "_" + endpoint + "ed";
  const password = document.querySelector("#password-input").value;
  const formData = new FormData();
  formData.append("file", uploadedFile);
  formData.append("password", password);

  const encryptedPicture = await fetchPicture("http://localhost:8080/api/picture/" + endpoint, "POST", formData);
  displayEncryptedPicture(URL.createObjectURL(encryptedPicture), filename);
}

function displayEncryptedPicture(blobUrl, filename) {
  let encryptedPreview = document.querySelector("#encrypted-picture");
  if (!encryptedPreview) {
    const encryptedPreviewContainer = document.createElement("div");
    encryptedPreviewContainer.classList.add("container");

    encryptedPreview = document.createElement("img");
    encryptedPreview.id = "encrypted-picture";
    encryptedPreview.height = 100;
    encryptedPreview.alt = "Encrypted picture";
    encryptedPreview.classList.add("pointer");
    encryptedPreview.onclick = openModal;

    encryptedPreviewContainer.append(encryptedPreview);
    app.append(encryptedPreviewContainer);
  }

  encryptedPreview.src = blobUrl;

  let downloadLink = document.querySelector("#download-link");
  if (!downloadLink) {
    downloadLink = document.createElement("a");
    downloadLink.textContent = "Download Picture";
    downloadLink.id = "download-link";
    downloadLink.classList.add("link")
    app.append(downloadLink);
  }

  downloadLink.download = filename;
  downloadLink.href = blobUrl;

  app.append(downloadLink);
}

export { processPicture };
