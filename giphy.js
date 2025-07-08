const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsDiv = document.getElementById('results');

const API_KEY = 'DNTMN9dKFRLsqkl8nNp3gUFMdXmi6oLW';
const BASE_API_URL = 'http://api.giphy.com/v1/gifs/search';

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        performSearch();
    }
});

    try {
        const response = fetch(`${BASE_API_URL}?q=${searchTerm}&apiKey=${API_KEY}&limit=10&offset=0`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            resultsDiv.innerHTML = data.results.map(item => `<p>${item.title}</p>`).join('');
        } else {
            resultsDiv.innerHTML = '<p>No results found.</p>';
        }

    } catch (error) {
        resultsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        console.error('Error fetching data:', error);
    }
