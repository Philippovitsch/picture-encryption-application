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

  document.addEventListener("change", displayPicture);
}

function displayPicture() {
  const file = document.querySelector("#picture-input").files;
  if (!file || !file[0] || !file[0].type.includes("image/")) {
    return;
  }

  const uploadedPicture = document.querySelector("#picture-preview");
  uploadedPicture.src = URL.createObjectURL(file[0]);

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
  
  const response = await fetchData(url);
  console.log(`Status ${response.status} - ${response.message}`);
}

async function fetchData(url) {
  let message;
  let status;

  try {
    const response = await fetch(url);
    message = await response.text();
    status = response.status;
  } catch (error) {
    message = "Error: " + error;
    status = -1;
  }

  return {
    status: status,
    message: message
  };

}

init();
