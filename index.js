const apiKey = "3cSlFCYHTuE5UxFxJe3dZX1F8OMuu7uBlAtVhsAZwIbxpjMrV0tT4nHz";
const loadImagesButton = document.getElementById("loadImages");
const loadSecondaryImagesButton = document.getElementById("loadSecondaryImages");
const imageRow = document.getElementById("imageRow");

// Funzione per creare una card di immagine
function createImageCard(image) {
  const card = document.createElement("div");
  card.classList.add("col-md-4", "mb-4");

  card.innerHTML = `
        <div class="card">
          <img src="${image.src.medium}" class="card-img-top" alt="${image.photographer}">
          <div class="card-body">
            <h5 class="card-title">${image.photographer}</h5>
            <button class="btn btn-danger hide-button" onclick="hideCard(this)">Hide</button>
            <button class="btn btn-primary view-button" data-bs-toggle="modal" data-bs-target="#imageViewModal" data-image-url="${image.src.large}">View</button>
          </div>
        </div>
      `;

  return card;
}
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

//vottone di ricerca
searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value;
  if (searchTerm) {
    loadImages(searchTerm);
  }
});

// Carica le immagini dall'API
function loadImages(query) {
  const url = `https://api.pexels.com/v1/search?query=${query}`;
  fetch(url, {
    headers: {
      Authorization: apiKey,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      imageRow.innerHTML = "";
      data.photos.forEach((image) => {
        const card = createImageCard(image);
        imageRow.appendChild(card);
      });
    });
}

// Mostra o nasconde la card
function hideCard(button) {
  const card = button.closest(".card");
  card.style.display = "none";
}

// Inizializza i pulsanti
loadImagesButton.addEventListener("click", () => {
  loadImages("nature");
});

loadSecondaryImagesButton.addEventListener("click", () => {
  loadImages("food");
});

// Inizializza il modal per la visualizzazione delle immagini
const modal = new bootstrap.Modal(document.getElementById("imageViewModal"));

// Gestisce il click sul pulsante "View" e apre il modal
imageRow.addEventListener("click", (event) => {
  if (event.target.classList.contains("view-button")) {
    const imageUrl = event.target.getAttribute("data-image-url");
    const modalImage = document.getElementById("modalImage");
    modalImage.src = imageUrl;
    modal.show();
  }
});
