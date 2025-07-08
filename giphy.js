const API_KEY = 'DNTMN9dKFRLsqkl8nNp3gUFMdXmi6oLW';

// Function to fetch GIFs from Giphy API
async function fetchGifs(query) {
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(query)}&limit=10&rating=g`;
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.data; // Array of GIF objects
}

// Function to display GIFs in the DOM
function displayGifs(gifs) {
    const container = document.getElementById('giphy-results');
    container.innerHTML = '';
    gifs.forEach(gif => {
        const img = document.createElement('img');
        img.src = gif.images.fixed_height.url;
        img.alt = gif.title;
        container.appendChild(img);
    });
}

// Handle form submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('giphy-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const query = document.getElementById('giphy-query').value;
        const gifs = await fetchGifs(query);
        displayGifs(gifs);
    });
});