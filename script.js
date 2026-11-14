const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
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
}

// Select a service automatically
const serviceLinks = document.querySelectorAll("[data-service]");
serviceLinks.forEach(function(link) {
    link.addEventListener("click", function() {
        const serviceField = document.getElementById("service");
        if (serviceField) {
            serviceField.value = link.dataset.service;
        }
    });
});

// Contact form using email
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const service = document.getElementById("service").value;
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !service || !message) {
            document.getElementById("formNote").textContent = "Please fill in all fields before sending your enquiry.";
            return;
        }

        const subject = encodeURIComponent(`Project Enquiry - ${service}`);
        const body = encodeURIComponent(
            `Hello OBA'S TECH,\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Service: ${service}\n\n` +
            `Project Details:\n${message}`
        );

        const mailtoLink = `mailto:hello@obatech.com.ng?subject=${subject}&body=${body}`;

        document.getElementById("formNote").textContent =
            "Your email app is opening. Please review the message and send it.";

        window.location.href = mailtoLink;
    });
}

// Automatic copyright year
const yearElement = document.getElementById("year");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}
