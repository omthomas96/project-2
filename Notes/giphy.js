const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsDiv = document.getElementById('results');

searchButton.addEventListener("click", handleClick)

const API_KEY = 'DNTMN9dKFRLsqkl8nNp3gUFMdXmi6oLW';
const API_ENDPOINT = 'http://api.giphy.com/v1/gifs/search';

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        performSearch();
    }
});

async function performSearch() {
    const searchTerm = searchInput.value.trim();

    if (!searchTerm) {
        resultsDiv.innerHTML = '<p>Please enter a search term.</p>';
        return;
    }

    try {
        const response = await fetch(`${API_ENDPOINT}?q=${encodeURIComponent(searchTerm)}&apiKey=${API_KEY}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayResults(data);

    } catch (error) {
        console.error('Error fetching data:', error);
        resultsDiv.innerHTML = '<p>Error fetching search results. Please try again later.</p>';
    }
}

function displayResults(data) {
    resultsDiv.innerHTML = '';

    if (data && data.results && data.results.length > 0) {
        data.results.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p>`; // Adjust based on API response structure
            resultsDiv.appendChild(itemElement);
        });
    } else {
        resultsDiv.innerHTML = '<p>No results found.</p>';
    }
}