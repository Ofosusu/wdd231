export function initializeNavigation() {
  const menuBtn = document.querySelector("#menuBtn");
  const navigation = document.querySelector("#navigation");

  if (!menuBtn || !navigation) {
    return;
  }

  menuBtn.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

export function setCurrentYear() {
  const yearElement = document.querySelector("#year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

export function getFavorites() {
  try {
    const saved = localStorage.getItem("favoriteLeaders");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveFavorites(favorites) {
  localStorage.setItem("favoriteLeaders", JSON.stringify(favorites));
}

export function toggleFavorite(name) {
  const favorites = getFavorites();
  const index = favorites.indexOf(name);

  if (index === -1) {
    favorites.push(name);
  } else {
    favorites.splice(index, 1);
  }

  saveFavorites(favorites);
  return favorites;
}

export function isFavorite(name) {
  return getFavorites().includes(name);
}

initializeNavigation();
setCurrentYear();