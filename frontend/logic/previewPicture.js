import { processPicture } from "./encryptedPicture";
import { openModal } from "./modalWindow";

function displayPreview() {
  const uploadedFile = document.querySelector("#picture-input").files[0];
  if (!uploadedFile || !uploadedFile.type.includes("image/")) {
    return;
  }

  let picturePreview = document.querySelector("#picture-preview");
  if (!picturePreview) {
    const picturePreviewContainer = document.createElement("div");
    picturePreviewContainer.classList.add("container");

    picturePreview = document.createElement("img");
    picturePreview.id = "picture-preview";
    picturePreview.height = 100;
    picturePreview.alt = "Picture preview";
    picturePreview.classList.add("pointer");
    picturePreview.onclick = openModal;

    picturePreviewContainer.append(picturePreview);
    app.append(picturePreviewContainer);
  }

  picturePreview.src = URL.createObjectURL(uploadedFile);

  createPasswordInput();
  createUploadButtons(uploadedFile);
}

function createPasswordInput() {
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
}

function createUploadButtons(uploadedFile) {
  let encryptButton = document.querySelector("#encrypt-button");
  if (!encryptButton) {
    encryptButton = document.createElement("input");
    encryptButton.type = "button";
    encryptButton.value = "Encrypt picture";
    encryptButton.id = "encrypt-button";
    app.append(encryptButton);
  }

  let decryptButton = document.querySelector("#decrypt-button");
  if (!decryptButton) {
    decryptButton = document.createElement("input");
    decryptButton.type = "button";
    decryptButton.value = "Decrypt picture";
    decryptButton.id = "decrypt-button";
    app.append(decryptButton);
  }

  encryptButton.onclick = () => processPicture("encrypt", uploadedFile);
  decryptButton.onclick = () => processPicture("decrypt", uploadedFile);
}

export { displayPreview };
