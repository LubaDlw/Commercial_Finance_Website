document.addEventListener("DOMContentLoaded", function() {
    const navbarHTML = `
        <header>
           <div class="container">
            <div id="branding">
                <h1>The South African Economy</h1>
                <br>
                <p>Your Source for Economic Insights and Data</p>
            </div>
            <nav>
                <button class="hamburger" aria-label="Toggle navigation">
                    <span class="bar-pop"></span>
                    <span class="bar-pop"></span>
                    <span class="bar-pop"></span>
                </button>
                <ul class="nav-list">
                    <li><a href="../index.html">Home</a></li>
                    <li><a href="../htmlcode/data.html">Trends</a></li>
                    <li><a href="../htmlcode/news.html">News</a></li>
                    <li><a href="../htmlcode/gdp.html">GDP Data</a></li>
                    <li><a href="../htmlcode/population.html">Population Data</a></li>
                     <li><a href="../htmlcode/life.html">Life  Data</a></li>
                    <li><a href="../htmlcode/design.html">Design & Theory</a></li>
                    <li><a href ="../book/book.html">Essay</a></li>
                </ul>
            </nav>
        </div>
    `;
    document.body.insertAdjacentHTML("afterbegin", navbarHTML);

    // Add 'active-page' class to the current page link
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-list a");

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPath || currentPath.endsWith(link.getAttribute("href").split('/').pop())) {
            link.classList.add("active-page");
        }
    });

    // Toggle navigation on hamburger click
    const hamburger = document.querySelector(".hamburger");
    const navList = document.querySelector(".nav-list");

    hamburger.addEventListener("click", function() {
        navList.classList.toggle("nav-list-visible");
        hamburger.classList.toggle("active"); // Optional: animate the hamburger icon
    });
});
