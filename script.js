const size = 5;
const table = document.getElementById("bingoTable");
const btn = document.getElementById("newCardBtn");
const winOverlay = document.getElementById("winOverlay");

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function checkWin() {
  const rows = table.rows;

  for (let i = 0; i < size; i++) {
    // Horizontale Reihe
    if ([...rows[i].cells].every(cell => cell.classList.contains("marked"))) {
      return true;
    }

    // Vertikale Spalte
    if ([...rows].every(row => row.cells[i].classList.contains("marked"))) {
      return true;
    }
  }

  // Diagonalen
  if ([...rows].every((row, i) => row.cells[i].classList.contains("marked"))) {
    return true;
  }

  if ([...rows].every((row, i) => row.cells[size - 1 - i].classList.contains("marked"))) {
    return true;
  }

  return false;
}

function showWinOverlay() {
  winOverlay.style.visibility = "visible";
  setTimeout(() => {
    winOverlay.style.visibility = "hidden";
  }, 3000); // 4 Sekunden anzeigen
}

function createCard() {
  table.innerHTML = "";
  const shuffled = shuffle([...phrases]);

  for (let r = 0; r < size; r++) {
    const row = document.createElement("tr");

    for (let c = 0; c < size; c++) {
      const cell = document.createElement("td");
      const phrase = shuffled[r * size + c];
      cell.textContent = phrase;

      cell.addEventListener("click", () => {
        cell.classList.toggle("marked");
        if (checkWin()) {
          showWinOverlay();
        }
      });

      row.appendChild(cell);
    }

    table.appendChild(row);
  }
}

btn.addEventListener("click", createCard);

createCard();
