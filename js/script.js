document.addEventListener("DOMContentLoaded", function () {

    const links = document.querySelectorAll("nav .links a");
    const nav = document.querySelector("nav");
    const navLinks = document.querySelector("nav .links");
    const navToggle = document.querySelector("nav .nav-toggle");

    links.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add("active");
        }

        link.addEventListener("click", function () {
            if (window.innerWidth <= 768 && navLinks) {
                navLinks.classList.remove("open");
                if (nav) nav.classList.remove("nav-open");
                if (navToggle) navToggle.setAttribute("aria-expanded", "false");
            }
        });
    });

    if (navToggle && navLinks && nav) {
        navToggle.addEventListener("click", function () {
            const isOpen = nav.classList.toggle("nav-open");
            navLinks.classList.toggle("open", isOpen);
            navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 768) {
                navLinks.classList.remove("open");
                nav.classList.remove("nav-open");
                navToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    const form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Message submitted (demo only)");
            form.reset();
        });
    }

});
