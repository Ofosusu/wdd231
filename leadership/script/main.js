const menuBtn = document.querySelector("#menuBtn");
const navigation = document.querySelector("#navigation");
const year = document.querySelector("#year");

if (menuBtn && navigation) {
    menuBtn.addEventListener("click", () => {
        navigation.classList.toggle("open");
    });
}

if (year) {
    year.textContent = new Date().getFullYear();
}