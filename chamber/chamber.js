
// MEMBERS DIRECTORY
// ==============================

const url = "data/members.json";
const container = document.querySelector("#members");



async function getMembers() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to fetch member data.");
        }

        const data = await response.json();

        displayMembers(data);

    } catch (error) {
        console.error("Error:", error);

        container.innerHTML = `
            <p class="error">
                Unable to load member information.
            </p>
        `;
    }
}

getMembers();



function displayMembers(members) {

    members.forEach(member => {

        const card = document.createElement("section");

        card.innerHTML = `
            <img
                src="images/${member.image}"
                alt="${member.name}"
                loading="lazy"
                width="220"
                height="170">

            <h2>${member.name}</h2>

            <p><strong>Address:</strong> ${member.address}</p>

            <p><strong>Phone:</strong> ${member.phone}</p>

            <p>
                <a href="${member.website}"
                   target="_blank"
                   rel="noopener noreferrer">
                   Visit Website
                </a>
            </p>

            <p>${member.description}</p>
        `;

        container.appendChild(card);

    });

}



const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

gridButton.addEventListener("click", () => {

    container.classList.add("grid");
    container.classList.remove("list");

});

listButton.addEventListener("click", () => {

    container.classList.add("list");
    container.classList.remove("grid");

});



const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

});



menuButton.addEventListener("click", () => {

    if (navigation.classList.contains("open")) {

        menuButton.innerHTML = "&times;";

    } else {

        menuButton.innerHTML = "&#9776;";

    }

});