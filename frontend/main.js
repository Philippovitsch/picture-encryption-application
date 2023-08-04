import "./style.css";

const app = document.querySelector('#app');

function init() {
  app.innerHTML = `
    <p>
      Select a picture to upload...
    </p>
    <input id="picture-input" type="file" accept="image/jpeg, image/png, image/jpg">
    <p>
      <img id="picture-preview" height="100px">
    </p>
  `;

  document.addEventListener("change", displayPreview);
}

function displayPreview() {
  const file = document.querySelector("#picture-input").files;
  if (!file || !file[0] || !file[0].type.includes("image/")) {
    return;
  }

  const picturePreview = document.querySelector("#picture-preview");
  picturePreview.src = URL.createObjectURL(file[0]);

  createUploadButtons();
}

function createUploadButtons() {
  if (!document.querySelector("#decrypt-button")) {
    const encryptButton = document.createElement("input");
    encryptButton.type = "button";
    encryptButton.value = "Encrypt Picture";
    encryptButton.id = "encrypt-button";
    encryptButton.onclick = () => processPicture("http://localhost:8080/api/picture/encrypt");
    app.append(encryptButton);
  }

  if (!document.querySelector("#decrypt-button")) {
    const decryptButton = document.createElement("input");
    decryptButton.type = "button";
    decryptButton.value = "Decrypt Picture";
    decryptButton.id = "decrypt-button";
    decryptButton.onclick = () => processPicture("http://localhost:8080/api/picture/decrypt");
    app.append(decryptButton);
  }
}

async function processPicture(url) {
  const file = document.querySelector("#picture-input").files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("filename", file.name);

  const encryptedPicture = await fetchData(url, formData);
  displayEncryptedPicture(encryptedPicture);
}

async function fetchData(url, formData) {
  let encryptedPicture = null;
  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData
    });
    encryptedPicture = await response.blob();
  } catch (error) {
    console.log("Error: " + error);
  }
  return encryptedPicture;
}

function displayEncryptedPicture(encryptedPicture) {
  if (!document.querySelector("#encrypted-picture")) {
    const encryptedPreviewContainer = document.createElement("p");
    const encryptedPreview = document.createElement("img");
    encryptedPreview.id = "encrypted-picture";
    encryptedPreview.height = 100;
    encryptedPreviewContainer.append(encryptedPreview);
    app.append(encryptedPreviewContainer);
  }

  const encryptedPreview = document.querySelector("#encrypted-picture");
  encryptedPreview.src = URL.createObjectURL(encryptedPicture);
}

init();
