const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("open");
        menuToggle.textContent = isOpen ? "×" : "☰";
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    document.querySelectorAll("#navLinks a").forEach(function(link) {
        link.addEventListener("click", function() {
            navLinks.classList.remove("open");
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open menu");
        });
    });
}

// Select a service automatically from service or pricing links.
document.querySelectorAll("[data-service]").forEach(function(link) {
    link.addEventListener("click", function() {
        const serviceField = document.getElementById("service");
        if (serviceField) {
            serviceField.value = link.dataset.service;
        }
    });
});

// Let visitors choose whether to send their enquiry through WhatsApp or email.
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const service = document.getElementById("service").value;
        const message = document.getElementById("message").value.trim();
        const formNote = document.getElementById("formNote");
        const sendVia = event.submitter ? event.submitter.value : "whatsapp";

        if (!name || !email || !service || !message) {
            formNote.textContent = "Please fill in all fields before sending your enquiry.";
            return;
        }

        const enquiry =
            `Hello OBA'S TECH!\n\n` +
            `My name is ${name}.\n` +
            `My email is ${email}.\n` +
            `Service needed: ${service}.\n\n` +
            `Project details:\n${message}`;

        if (sendVia === "email") {
            const subject = encodeURIComponent(`Project enquiry - ${service}`);
            const body = encodeURIComponent(enquiry);
            formNote.textContent = "Opening your email app. Review the enquiry and press Send.";
            window.location.href = `mailto:hello@obatech.com.ng?subject=${subject}&body=${body}`;
            return;
        }

        const whatsappURL =
            "https://wa.me/2347074080425?text=" +
            encodeURIComponent(enquiry);

        formNote.textContent = "Opening WhatsApp. Review the enquiry and press Send.";
        window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
}

// Animated stats / count-up effect
const counters = document.querySelectorAll(".count-up");

const animateCounter = (counter) => {
    const target = Number(counter.dataset.target);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));

    const update = () => {
        current += step;
        if (current >= target) {
            counter.textContent = `${target}${target === 100 ? "%" : "+"}`;
            return;
        }
        counter.textContent = `${current}${target === 100 ? "%" : "+"}`;
        requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach((counter) => observer.observe(counter));

// Automatic copyright year
const yearElement = document.getElementById("year");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}
