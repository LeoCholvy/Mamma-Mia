var burger = false;
const header = document.querySelector("header");
const icon = document.getElementById("burger-icon");

function toggleBurger() {
    burger = !burger;
    if (burger) {
        header.className = "burger-active";
        icon.className = "fa-solid fa-2xl fa-xmark";
    } else {
        header.className = "";
        icon.className = "fa-solid fa-2xl fa-bars";
        // icon.classList.remove("fa-xmark");
        // icon.classList.add("fa-bars");
    }
}

const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", () => {
        dropdown.classList.toggle("active-dropdown");
    });
})