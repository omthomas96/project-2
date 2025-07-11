const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultsDiv = document.getElementById("results");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

searchButton.addEventListener("click", performSearch);
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    performSearch();
  }
});
prevButton.addEventListener("click", handleClickPrev);
nextButton.addEventListener("click", handleClickNext);

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

// Image Function
const imageUrls = [
  "IMAGE_URL_1",
  "IMAGE_URL_2",
  "IMAGE_URL_3",
  "IMAGE_URL_4",
  "IMAGE_URL_5",
  "IMAGE_URL_6",
  "IMAGE_URL_7",
  "IMAGE_URL_8",
  "IMAGE_URL_9",
  "IMAGE_URL_10",
  "IMAGE_URL_11",
  "IMAGE_URL_12",
  "IMAGE_URL_13",
  "IMAGE_URL_14",
  "IMAGE_URL_15",
  "IMAGE_URL_16",
  "IMAGE_URL_17",
  "IMAGE_URL_18",
  "IMAGE_URL_19",
  "IMAGE_URL_20",
];

function displayImageUrls(imageUrls) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";
  imageUrls.forEach((url) => {
    const img = document.createElement("img");
    img.src = url;
    img.alt = "Giphy result";
    img.onclick = () => displayImageUrls(imageUrls);
    resultsDiv.appendChild(img);
  });
}

displayImageUrls(imageUrls);

// Pagination Function
function setNavButtons() {
  if (offset > 0) document.getElementById("prev").disabled = false;
  else document.getElementById("prev").disabled = true;
  if (totalCount > 0 && offset <= totalCount + limit)
    document.getElementById("next").disabled = false;
  else document.getElementById("next").disabled = true;
}

function handleClickPrev() {
  if (offset >= limit) {
    offset -= limit;
    performSearch(new Event("click"));
  }
}

function handleClickNext() {
  if (offset <= totalCount + limit) {
    offset += limit;
    performSearch(new Event("click"));
  }
}
