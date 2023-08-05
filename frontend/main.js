import "./style.css";

const app = document.querySelector('#app');

let file = null;
let filename = null;
let blobUrl = null;

function init() {
  app.innerHTML = `
    <p>
      <i>Select a picture to upload...</i>
    </p>
    <input id="picture-input" type="file" accept="image/jpeg, image/png, image/jpg">
  `;
  document.addEventListener("change", displayPreview);
}

function displayPreview() {
  const uploadedFile = document.querySelector("#picture-input").files[0];
  if (!uploadedFile || !uploadedFile.type.includes("image/")) {
    return;
  }

  file = uploadedFile;

  if (!document.querySelector("#picture-preview")) {
    const picturePreviewContainer = document.createElement("div");
    picturePreviewContainer.classList.add("container");
    const picturePreview = document.createElement("img");
    picturePreview.id = "picture-preview";
    picturePreview.height = 100;
    picturePreview.alt = "Picture preview"
    picturePreviewContainer.append(picturePreview);
    app.append(picturePreviewContainer);
  }

  const picturePreview = document.querySelector("#picture-preview");
  picturePreview.src = URL.createObjectURL(file);

  createUploadButtons();
}

function createUploadButtons() {
  if (!document.querySelector("#password-input")) {
    const passwordInputContainer = document.createElement("div");
    passwordInputContainer.innerHTML = "<i>Choose an encryption password (optional):</i><br>";
    passwordInputContainer.classList.add("container");
    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.placeholder = "Password";
    passwordInput.id = "password-input";
    passwordInputContainer.append(passwordInput);
    app.append(passwordInputContainer);  
  }

  if (!document.querySelector("#decrypt-button")) {
    const encryptButton = document.createElement("input");
    encryptButton.type = "button";
    encryptButton.value = "Encrypt Picture";
    encryptButton.id = "encrypt-button";
    encryptButton.onclick = () => processPicture("encrypt");
    app.append(encryptButton);
  }

  if (!document.querySelector("#decrypt-button")) {
    const decryptButton = document.createElement("input");
    decryptButton.type = "button";
    decryptButton.value = "Decrypt Picture";
    decryptButton.id = "decrypt-button";
    decryptButton.onclick = () => processPicture("decrypt");
    app.append(decryptButton);
  }
}

async function processPicture(endpoint) {
  filename = file.name.substring(0, file.name.lastIndexOf('.')) + "_" + endpoint + "ed";
  const password = document.querySelector("#password-input").value;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("password", password);

  const encryptedPicture = await fetchData("http://localhost:8080/api/picture/" + endpoint, formData);
  blobUrl = URL.createObjectURL(encryptedPicture);
  displayEncryptedPicture();
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

function displayEncryptedPicture() {
  if (!document.querySelector("#encrypted-picture")) {
    const encryptedPreviewContainer = document.createElement("div");
    encryptedPreviewContainer.classList.add("container");
    const encryptedPreview = document.createElement("img");
    encryptedPreview.id = "encrypted-picture";
    encryptedPreview.height = 100;
    encryptedPreview.alt = "Encrypted picture";
    encryptedPreviewContainer.append(encryptedPreview);
    app.append(encryptedPreviewContainer);
  }

  const encryptedPreview = document.querySelector("#encrypted-picture");
  encryptedPreview.src = blobUrl;

  if (!document.querySelector("#download-link")) {
    const downloadLink = document.createElement("a");
    downloadLink.textContent = "Download Picture";
    downloadLink.id = "download-link";
    app.append(downloadLink);
  }

  const downloadLink = document.querySelector("#download-link");
  downloadLink.download = filename;
  downloadLink.href = blobUrl;

  app.append(downloadLink);
}

init();
