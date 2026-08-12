import {
  getFavorites,
  toggleFavorite,
  isFavorite,
  setCurrentYear
} from "./main.js";

const container = document.querySelector("#leadersContainer");
const search = document.querySelector("#searchLeader");
const searchMessage = document.querySelector("#searchMessage");
const modal = document.querySelector("#leaderModal");
const modalContent = document.querySelector("#modalContent");
const closeModal = document.querySelector("#closeModal");
const favoriteMessage = document.querySelector("#favoriteMessage");
const leaderCount = document.querySelector("#leaderCount");
const countryCount = document.querySelector("#countryCount");

let leaders = [];

async function loadLeaders() {
  try {
    const response = await fetch("data/leaders.json");

    if (!response.ok) {
      throw new Error("Unable to retrieve leader data.");
    }

    leaders = await response.json();

    displayLeaders(leaders);
    updateStatistics(leaders);
    updateFavoritesMessage();
  } catch (error) {
    container.innerHTML = `
      <div class="error">
        <h2>Unable to Load Leaders</h2>
        <p>Please refresh the page and try again.</p>
      </div>
    `;
  }
}

function displayLeaders(data) {
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = `
      <div class="error">
        <h2>No Leaders Found</h2>
        <p>Try searching for another name or country.</p>
      </div>
    `;
    return;
  }

  data.forEach((leader) => {
    const card = document.createElement("article");
    const saved = isFavorite(leader.name);

    card.className = "leader-card";

    card.innerHTML = `
      <img src="${leader.image}" alt="${leader.name}" loading="lazy">

      <div class="leader-content">
        <h2>${leader.name}</h2>
        <h4>${leader.country}</h4>

        <p><strong>${leader.position}</strong></p>

        <p>${leader.biography}</p>

        <p><strong>Years:</strong> ${leader.years}</p>

        <h3>Major Achievements</h3>

        <ul>
          ${leader.achievements
            .map((achievement) => `<li>${achievement}</li>`)
            .join("")}
        </ul>

        <div class="leader-actions">
          <button
            class="leader-button details-button"
            type="button"
            data-name="${leader.name}"
          >
            View Details
          </button>

          <button
            class="leader-button favorite-button ${saved ? "saved" : ""}"
            type="button"
            data-favorite="${leader.name}"
          >
            ${saved ? "Saved" : "Save Leader"}
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  addCardEvents();
}

function addCardEvents() {
  document.querySelectorAll("[data-name]").forEach((button) => {
    button.addEventListener("click", () => {
      const leader = leaders.find(
        (item) => item.name === button.dataset.name
      );

      if (leader) {
        openLeaderModal(leader);
      }
    });
  });

  document.querySelectorAll("[data-favorite]").forEach((button) => {
    button.addEventListener("click", () => {
      const favorites = toggleFavorite(button.dataset.favorite);

      button.classList.toggle("saved");
      button.textContent = favorites.includes(button.dataset.favorite)
        ? "Saved"
        : "Save Leader";

      updateFavoritesMessage();
    });
  });
}

function openLeaderModal(leader) {
  modalContent.innerHTML = `
    <img src="${leader.image}" alt="${leader.name}">

    <h2>${leader.name}</h2>

    <p><strong>${leader.country}</strong></p>

    <p>${leader.position}</p>

    <p>${leader.biography}</p>

    <h3>Major Achievements</h3>

    <ul>
      ${leader.achievements
        .map((achievement) => `<li>${achievement}</li>`)
        .join("")}
    </ul>

    <h3>Challenges</h3>

    <ul>
      ${leader.challenges
        .map((challenge) => `<li>${challenge}</li>`)
        .join("")}
    </ul>

    <h3>Timeline</h3>

    <ul>
      ${leader.timeline
        .map((event) => `<li>${event}</li>`)
        .join("")}
    </ul>

    <blockquote class="leader-quote">
      "${leader.quote}"
    </blockquote>
  `;

  modal.showModal();
}

if (search) {
  search.addEventListener("input", () => {
    const value = search.value.toLowerCase().trim();

    const filtered = leaders.filter((leader) => {
      return (
        leader.name.toLowerCase().includes(value) ||
        leader.country.toLowerCase().includes(value) ||
        leader.position.toLowerCase().includes(value)
      );
    });

    displayLeaders(filtered);

    if (searchMessage) {
      searchMessage.textContent = value
        ? `${filtered.length} leader${filtered.length === 1 ? "" : "s"} found`
        : "";
    }
  });
}

if (closeModal) {
  closeModal.addEventListener("click", () => {
    modal.close();
  });
}

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });
}

function updateStatistics(data) {
  if (leaderCount) {
    leaderCount.textContent = data.length;
  }

  if (countryCount) {
    const countries = new Set(data.map((leader) => leader.country));
    countryCount.textContent = countries.size;
  }
}

function updateFavoritesMessage() {
  if (!favoriteMessage) {
    return;
  }

  const favorites = getFavorites();

  if (favorites.length === 0) {
    favoriteMessage.textContent =
      "Select a leader and save them to your favorites.";
    return;
  }

  favoriteMessage.textContent = `You have saved ${favorites.length} leader${
    favorites.length === 1 ? "" : "s"
  }: ${favorites.join(", ")}.`;
}

setCurrentYear();
loadLeaders();