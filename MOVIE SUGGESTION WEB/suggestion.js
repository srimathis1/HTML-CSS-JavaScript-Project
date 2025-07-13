const popup = document.querySelector(".popup");
const dialog = document.querySelector(".dialog");
const addButton = document.querySelector(".add");
const cancel = document.getElementById("cancelsug");
const form = document.getElementById("sugform");

const titleInput = document.getElementById("addtitle");
const langInput = document.getElementById("addlang");
const genreInput = document.getElementById("addgenre");
const descInput = document.getElementById("desc");
const posterInput = document.getElementById("poster");

const whole = document.getElementById("whole");

let editingIndex = null;

// Show popup
addButton.addEventListener("click", () => {
  popup.style.display = "block";
  dialog.style.display = "block";
  editingIndex = null;
});

// Cancel button
cancel.addEventListener("click", (e) => {
  e.preventDefault();
  form.reset();
  popup.style.display = "none";
  dialog.style.display = "none";
});

// Handle Form Submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const lang = langInput.value.trim();
  const genre = genreInput.value.trim();
  const desc = descInput.value.trim();
  const file = posterInput.files[0];

  if (!title || !lang || !genre || !desc || (!file && editingIndex === null)) {
    alert("Please fill all fields including the poster.");
    return;
  }

  // Read the file
  const reader = new FileReader();
  reader.onload = function () {
    const posterData = file ? reader.result : null;

    let suggestions = JSON.parse(localStorage.getItem("suggestions") || "[]");

    const newCard = {
      title,
      lang,
      genre,
      desc,
      poster: posterData || suggestions[editingIndex].poster,
    };

    if (editingIndex !== null) {
      suggestions[editingIndex] = newCard;
    } else {
      suggestions.push(newCard);
    }

    localStorage.setItem("suggestions", JSON.stringify(suggestions));
    loadCards();

    popup.style.display = "none";
    dialog.style.display = "none";
    form.reset();
    editingIndex = null;
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    reader.onload(); // trigger with existing image
  }
});

// Load cards on startup
function loadCards() {
  whole.innerHTML = "";
  const cards = JSON.parse(localStorage.getItem("suggestions") || "[]");

  cards.forEach((card, index) => {
    const div = document.createElement("div");
    div.className = "content";
    div.innerHTML = `
      <h1>--${card.title}--</h1>
      <h2>${card.lang}</h2>
      <h2>${card.genre}</h2>
      <p>${card.desc}</p>
      <img src="${card.poster}" alt="Poster" style="width:100%; border-radius:10px; margin-top:10px;">
      <button class="delsugg" onclick="deleteCard(${index})">Delete</button>
      <button class="delsugg" onclick="editCard(${index})">Edit</button>
    `;
    whole.appendChild(div);
  });
}

function deleteCard(index) {
  const cards = JSON.parse(localStorage.getItem("suggestions") || "[]");
  cards.splice(index, 1);
  localStorage.setItem("suggestions", JSON.stringify(cards));
  loadCards();
}

function editCard(index) {
  const cards = JSON.parse(localStorage.getItem("suggestions") || "[]");
  const card = cards[index];
  editingIndex = index;

  titleInput.value = card.title;
  langInput.value = card.lang;
  genreInput.value = card.genre;
  descInput.value = card.desc;
  posterInput.value = ""; // can't prefill file input

  popup.style.display = "block";
  dialog.style.display = "block";
}

window.addEventListener("load", loadCards);
