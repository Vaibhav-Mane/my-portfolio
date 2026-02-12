document.addEventListener("DOMContentLoaded", function () {
    function showToast(message, type) {
        let toast = document.getElementById("formToast");
        const toastType = type || "success";

        if (!toast) {
            toast = document.createElement("div");
            toast.id = "formToast";
            toast.className = "form-toast";
            document.body.appendChild(toast);
        }

        const title = toastType === "success" ? "Success" : "Error";
        const symbol = toastType === "success" ? "✓" : "!";

        toast.innerHTML =
            '<div class="toast-badge">' + symbol + '</div>' +
            '<div class="toast-content">' +
            '<strong>' + title + "</strong>" +
            "<p>" + message + "</p>" +
            "</div>";
        toast.classList.remove("success", "error", "show");
        toast.classList.add(toastType);
        toast.offsetHeight;
        toast.classList.add("show");

        window.clearTimeout(showToast._timer);
        showToast._timer = window.setTimeout(function () {
            toast.classList.remove("show");
        }, 2600);
    }

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
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            const formAction = form.getAttribute("action") || "";
            const submitButton = form.querySelector('button[type="submit"]');

            if (!formAction) {
                showToast("Form action is missing.", "error");
                return;
            }

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Submitting...";
            }

            try {
                const response = await fetch(formAction, {
                    method: "POST",
                    body: new FormData(form),
                    headers: {
                        Accept: "application/json"
                    }
                });

                if (response.ok) {
                    showToast("Message submitted successfully.", "success");
                    form.reset();
                } else {
                    showToast("Submission failed. Please try again.", "error");
                }
            } catch (error) {
                showToast("Network error. Please try again.", "error");
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = "Submit";
                }
            }
        });
    }

});
