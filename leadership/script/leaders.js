const container = document.querySelector("#leadersContainer");
const search = document.querySelector("#searchLeader");

let leaders = [];

async function loadLeaders() {
    if (!container) {
        return;
    }

    try {
        const response = await fetch("data/leaders.json");

        if (!response.ok) {
            throw new Error("Unable to load leader data.");
        }

        leaders = await response.json();
        displayLeaders(leaders);
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
                <p>Try searching for another leader or country.</p>
            </div>
        `;
        return;
    }

    data.forEach((leader) => {
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
                    ${leader.achievements.map((item) => `<li>${item}</li>`).join("")}
                </ul>

                <h3>Challenges</h3>
                <ul>
                    ${leader.challenges.map((item) => `<li>${item}</li>`).join("")}
                </ul>

                <h3>Timeline</h3>
                <ul>
                    ${leader.timeline.map((item) => `<li>${item}</li>`).join("")}
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

function revealCards() {
    const cards = document.querySelectorAll(".fade");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    cards.forEach((card) => observer.observe(card));
}

if (search) {
    search.addEventListener("input", () => {
        const value = search.value.toLowerCase().trim();

        const filtered = leaders.filter(
            (leader) =>
                leader.name.toLowerCase().includes(value) ||
                leader.country.toLowerCase().includes(value)
        );

        displayLeaders(filtered);
    });
}

loadLeaders();