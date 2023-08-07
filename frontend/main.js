import { displayPreview } from "./logic/previewPicture";
import { displaySamplePictures } from "./logic/samplePictures";
import "./style.css";

function init() {
  const app = document.querySelector('#app');
  app.innerHTML = `
    <p>
      <i>Select a picture to upload or choose a <span id="sample-pictures-button" class="link">sample</span>...</i>
    </p>
    <input id="picture-input" type="file" accept="image/jpeg, image/png, image/jpg">
  `;

  const samplePicturesButton = document.querySelector("#sample-pictures-button");
  samplePicturesButton.addEventListener("click", displaySamplePictures);

  const pictureInput = document.querySelector("#picture-input");
  pictureInput.addEventListener("change", displayPreview);
}

init();
