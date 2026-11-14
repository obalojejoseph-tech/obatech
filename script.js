const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Mobile navigation
menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.textContent = isOpen ? "×" : "☰";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("#navLinks a").forEach(function(link) {
    link.addEventListener("click", function() {
        navLinks.classList.remove("open");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// Select a service automatically
document.querySelectorAll("[data-service]").forEach(function(link) {
    link.addEventListener("click", function() {
        document.getElementById("service").value =
            link.dataset.service;
    });
});

// Contact form using WhatsApp
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();

    const whatsappMessage =
        `Hello OBA'S TECH!

My name is ${name}.
My email is ${email}.
Service needed: ${service}.

Project details:
${message}`;

    const whatsappURL =
        "https://wa.me/2347074080425?text=" +
        encodeURIComponent(whatsappMessage);

    document.getElementById("formNote").textContent =
        "Opening WhatsApp. Review your message and press Send.";

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
});

// Automatic copyright year
document.getElementById("year").textContent =
    new Date().getFullYear();
