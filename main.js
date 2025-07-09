const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultsDiv = document.getElementById("results");

searchButton.addEventListener("click", performSearch);
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    performSearch();
  }
});

const API_KEY = "DNTMN9dKFRLsqkl8nNp3gUFMdXmi6oLW";
const API_ENDPOINT = "http://api.giphy.com/v1/gifs/search";
let limit = 20;
let offset = 0;
let rating = "g";
let totalCount = 0;
let lastSearchTerm = "";

//Call Function
async function performSearch(event) {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();

  if (!searchTerm) {
    resultsDiv.innerHTML = "<p>Please enter a search term.</p>";
    return;
  }

  const response = await fetchData(searchTerm);
  displayResults(response);
}

// Fetch Function
async function fetchData(data) {
  const fetchData = encodeURIComponent(data);
  const url = `${API_ENDPOINT}?q=${fetchData}&api_key=${API_KEY}&limit=${limit}&offset=${offset}&rating=${rating}`;

  const response = await fetch(url);
  const json = await response.json();
  return json.data;
}

// Display Function
function displayResults(response) {
  resultsDiv.innerHTML = "";
  for (let data of response) {
    const img = document.createElement("img");
    img.src = data.images.fixed_height.url;
    img.alt = data.title;
    resultsDiv.appendChild(img);
  }
}

// Pagination Function
function setNavButtons() {
  if (offset > 0) 
    document.getElementById("prev").disabled = false;
  else 
    document.getElementById("prev").disabled = true;
  if (totalCount > 0 && offset <= (totalCount + limit))
    document.getElementById("next").disabled = false;
  else 
    document.getElementById("next").disabled = true;
}

function handleClickPrev() {
  if (offset >= limit) {
    offset -= limit;
    performSearch();
  }
}

function handleClickNext() {
  if (offset <= (totalCount + limit)) {
    offset += limit;
    performSearch();
  }
}
document.getElementById("prev").addEventListener("click", handleClickPrev);
document.getElementById("next").addEventListener("click", handleClickNext);