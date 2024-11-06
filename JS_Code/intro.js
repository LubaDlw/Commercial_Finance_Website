// Array of background images and applicable text
const slides = [
    {
        background: "url('https://i.pinimg.com/564x/ab/15/09/ab1509a99863547aca3c4adf2d1cb178.jpg')",
        heading: "Explore South Africa's Economy",
        description: "Gain insights on the latest economic trends and data.",
        buttonText: "Learn More"
    },
    {
        background: "url('https://i.pinimg.com/564x/8f/7c/2c/8f7c2c88f66aa2f881554c2f1814814e.jpg')",
        heading: "Discover GDP Growth",
        description: "Track South Africa's GDP growth with interactive charts.",
        buttonText: "Learn More"
    },
    {
        background: "url('https://i.pinimg.com/564x/fb/d7/43/fbd743fa753f1f8fda349cd3c7f8153b.jpg')",
        heading: "Economic News & Insights",
        description: "Stay updated with the latest economic developments.",
        buttonText: "Learn More"
    }
];

let currentSlideIndex = 0;

// Function to update the background and text
function updateSlide() {
    const introSection = document.getElementById("intro");
    const headingElement = document.getElementById("intro-heading");
    const descriptionElement = document.getElementById("intro-description");
    const buttonElement = document.getElementById("intro-button");

    introSection.style.backgroundImage = slides[currentSlideIndex].background;
    headingElement.innerText = slides[currentSlideIndex].heading;
    descriptionElement.innerText = slides[currentSlideIndex].description;
    buttonElement.innerText = slides[currentSlideIndex].buttonText;
}

// Function to handle carousel button clicks
function goToSlide(index) {
    currentSlideIndex = index;
    updateSlide();
}

// Function to go to the previous slide
function prevSlide() {
    currentSlideIndex = (currentSlideIndex === 0) ? slides.length - 1 : currentSlideIndex - 1;
    updateSlide();
}

// Function to go to the next slide
function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    updateSlide();
}

// Automatically change background every 10 seconds
setInterval(() => {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    updateSlide();
}, 10000);

// Set initial background and text when the page loads
window.onload = updateSlide;

// Event listeners for carousel arrow clicks
document.querySelector('.carousel-arrow.left').addEventListener('click', prevSlide);
document.querySelector('.carousel-arrow.right').addEventListener('click', nextSlide);

// Event listeners for carousel buttons (if you still want them for manual navigation)
document.querySelectorAll(".carousel-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => goToSlide(index));
});
