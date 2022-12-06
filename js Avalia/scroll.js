window.addEventListener("scroll", function () {
    let header = document.querySelector("header");
    header.classList.toggle("bajar", window.scrollY > 0);
});
