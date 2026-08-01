import { places } from "../data/places.mjs";

const container = document.querySelector("#places");

places.forEach((place, index) => {

    const card = document.createElement("section");

    card.className = `card card${index + 1}`;

    card.innerHTML = `
        <h2>${place.name}</h2>

        <figure>
            <img
                src="images/${place.image}"
                alt="${place.name}"
                loading="lazy"
                width="300"
                height="220">
        </figure>

        <address>${place.address}</address>

        <p>${place.description}</p>

        <button>Learn More</button>
    `;

    const button = card.querySelector("button");

    button.addEventListener("click", () => {
        window.open(place.website, "_blank");
    });

    container.appendChild(card);

});

const visitMessage = document.querySelector("#visitMessage");

const lastVisit = Number(localStorage.getItem("lastVisit"));

const now = Date.now();

if (!lastVisit) {

    visitMessage.textContent =
        "Welcome! Let us know if you have any questions.";

} else {

    const days = Math.floor((now - lastVisit) / 86400000);

    if (days < 1) {

        visitMessage.textContent =
            "Back so soon! Awesome!";

    } else if (days === 1) {

        visitMessage.textContent =
            "You last visited 1 day ago.";

    } else {

        visitMessage.textContent =
            `You last visited ${days} days ago.`;

    }

}

localStorage.setItem("lastVisit", now);

const menuButton = document.querySelector("#menu");

const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

    if (navigation.classList.contains("open")) {

        menuButton.innerHTML = "&times;";

    } else {

        menuButton.innerHTML = "&#9776;";

    }

});

const modified = document.querySelector("#lastModified");

if (modified) {

    modified.textContent =
        `Last Modification: ${document.lastModified}`;

}