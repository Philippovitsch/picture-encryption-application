function openModal(event) {
  const blobUrl = event.target.src;
  const modalWindow = document.createElement("div");
  modalWindow.id = "modal-window";
  modalWindow.classList.add("modal");
  modalWindow.innerHTML = `
    <div class="modal-content">
      <span id="modal-close-button" class="modal-close">&#x2715;</span>
      <img src="${blobUrl}" alt="Modal picture" height="600px">
    </div>
  `;
  app.append(modalWindow);

  document.addEventListener("keydown", closeModal);
  document.addEventListener("click", closeModal);
}

function closeModal(event) {
  const modalWindow = document.querySelector("#modal-window");
  const modalCloseButton = document.querySelector("#modal-close-button");

  if (event.type === "click" && event.target !== modalWindow && event.target !== modalCloseButton) {
    return;
  }

  if (event.type === "keydown" && event.key !== "Escape") {
    return;
  }

  modalWindow.remove();

  document.removeEventListener("keydown", closeModal);
  document.removeEventListener("click", closeModal);
}

export { openModal };
