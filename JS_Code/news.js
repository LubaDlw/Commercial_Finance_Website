const apiKey = '1cc304960bd84f449819e54331741c78';
const newsContainer = document.getElementById('news-container');

// Function to fetch news API
async function fetchNews() {
    const apiUrl = `https://newsapi.org/v2/everything?q=south+african+economy&sortBy=publishedAt&apiKey=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p>Unable to load news at this time. Please try again later.</p>';
    }
}

//This function Displays the functions from the API
function displayNews(articles) {
    if (articles.length === 0) {
        newsContainer.innerHTML = '<p>No news articles available.</p>';
        return;
    }
    
    // Limit articles to 10 articles
    const limitedArticles = articles.slice(0, 10);

    let newsHTML = '';
    limitedArticles.forEach(article => {
        newsHTML += `
            <div class="news-article">
                <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                <p>${article.description || 'No description available.'}</p>
                <p><strong>Published at:</strong> ${new Date(article.publishedAt).toLocaleDateString()}</p>
            </div>
        `;
    });
    newsContainer.innerHTML = newsHTML;
}

// Fetch news on page load
fetchNews();


