const menuBtn = document.querySelector("#menuBtn");
const navigation = document.querySelector("#navigation");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        navigation.classList.toggle("open");
    });
}

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.2
    }
);

sections.forEach(section => {
    section.classList.add("fade");
    observer.observe(section);
});

const topButton = document.createElement("button");

topButton.id = "topButton";

topButton.innerHTML = "↑";

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        topButton.classList.add("visible");
    } else {
        topButton.classList.remove("visible");
    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

const year = new Date().getFullYear();

const footerYear = document.querySelector("#year");

if (footerYear) {
    footerYear.textContent = year;
}