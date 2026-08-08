const menuBtn = document.querySelector("#menuBtn");
const navigation = document.querySelector("#navigation");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        navigation.classList.toggle("open");
    });
}

const container = document.querySelector("#leadersContainer");
const search = document.querySelector("#searchLeader");

let leaders = [];

async function loadLeaders() {

    try {

        const response = await fetch("data/leaders.json");

        leaders = await response.json();

        displayLeaders(leaders);

    } catch (error) {

        container.innerHTML = `
            <div class="error">
                <h2>Unable to Load Leaders</h2>
                <p>Please refresh the page.</p>
            </div>
        `;

    }

}

function displayLeaders(data) {

    container.innerHTML = "";

    data.forEach(leader => {

        const card = document.createElement("article");

        card.className = "leader-card fade";

        card.innerHTML = `

            <img src="${leader.image}" alt="${leader.name}">

            <div class="leader-content">

                <h2>${leader.name}</h2>

                <h4>${leader.country}</h4>

                <p><strong>${leader.position}</strong></p>

                <p>${leader.biography}</p>

                <p><strong>Years:</strong> ${leader.years}</p>

                <h3>Major Achievements</h3>

                <ul>

                    ${leader.achievements.map(item => `<li>${item}</li>`).join("")}

                </ul>

                <h3>Challenges</h3>

                <ul>

                    ${leader.challenges.map(item => `<li>${item}</li>`).join("")}

                </ul>

                <h3>Timeline</h3>

                <ul>

                    ${leader.timeline.map(item => `<li>${item}</li>`).join("")}

                </ul>

                <blockquote>

                    "${leader.quote}"

                </blockquote>

            </div>

        `;

        container.appendChild(card);

    });

    revealCards();

}

search.addEventListener("input", () => {

    const value = search.value.toLowerCase().trim();

    const filtered = leaders.filter(leader =>

        leader.name.toLowerCase().includes(value) ||

        leader.country.toLowerCase().includes(value)

    );

    displayLeaders(filtered);

});

function revealCards() {

    const cards = document.querySelectorAll(".fade");

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {
        threshold: 0.2
    });

    cards.forEach(card => observer.observe(card));

}

loadLeaders();