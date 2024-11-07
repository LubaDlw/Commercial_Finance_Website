// JS_Code/navbar.js
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
                    <li><a href="../index.html" class="current">Home</a></li>
                    <li><a href="../htmlcode/data.html"> Trends</a></li>
                    <li><a href="../htmlcode/news.html"> News</a></li>
                    <li><a href="../htmlcode/gdp.html">GDP Data</a></li>
                    <li><a href="../htmlcode/population.html">Population Data</a></li>
                    <li><a href="../htmlcode/design.html">Design & Theory</a></li>
                    <li><a href ="../Essay/essay.html">Essay</a></li>
                </ul>
            </nav>
        </div>
    `;
    document.body.insertAdjacentHTML("afterbegin", navbarHTML);
});
