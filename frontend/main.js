import "./style.css";

const app = document.querySelector('#app');

function init() {
  app.innerHTML = `
    <p>
      Select a picture to upload...
    </p>
    <input id="input" type="file" accept="image/jpeg, image/png, image/jpg">
    <p>
      <img id="uploaded-picture" height="100px">
    </p>
  `;

  document.addEventListener("change", (event) => displayPicture(event));
}

function displayPicture(event) {
  if (!event.target.files || !event.target.files[0] || !event.target.files[0].type.includes("image/")) {
    return;
  }

  const uploadedPicture = document.querySelector("#uploaded-picture");
  uploadedPicture.src = URL.createObjectURL(event.target.files[0]);

  createUploadButtons();
}

function createUploadButtons() {
  if (!document.querySelector("#decrypt-picture")) {
    const encryptButton = document.createElement("input");
    encryptButton.type = "button";
    encryptButton.value = "Encrypt Picture";
    encryptButton.id = "encrypt-picture";
    encryptButton.onclick = encryptPicture;
    app.append(encryptButton);
  }

  if (!document.querySelector("#decrypt-picture")) {
    const decryptButton = document.createElement("input");
    decryptButton.type = "button";
    decryptButton.value = "Decrypt Picture";
    decryptButton.id = "decrypt-picture"
    decryptButton.onclick = decryptPicture;
    app.append(decryptButton);
  }
}

async function encryptPicture() {
  const response = await fetchData("http://localhost:8080/api/picture/encrypt");
  console.log(`Status ${response.status} - ${response.message}`);
}

async function decryptPicture() {
  const response = await fetchData("http://localhost:8080/api/picture/decrypt");
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
  }

}

init();
