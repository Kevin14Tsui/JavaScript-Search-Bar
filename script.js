const searchbox = document.getElementById("searchbox");
const suggestions = document.getElementById("suggestions");
const suggestionsMoive = document.getElementById("suggestionsMovies");
const suggestionsTV = document.getElementById("suggestionsTVshow");
const movieList = document.getElementById("movie-List");
const tvList = document.getElementById("tvshow-List");
const result = document.getElementsByClassName('result');


// If you can leave some suggestions so that I can improve this test and do better ：）
async function loadsearch(searchTerm) {
  // bf9d768b api key does not work, so I changed
  const ApiKey = "3bca89aa";
  const movieUrl = `https://www.omdbapi.com/?s=${searchTerm}&apikey=${ApiKey}&type=movie`;
  const movieres = await fetch(`${movieUrl}`);
  const moviedata = await movieres.json();
  const tvUrl = `https://www.omdbapi.com/?s=${searchTerm}&apikey=${ApiKey}&type=series`;
  const tvres = await fetch(`${tvUrl}`);
  const tvdata = await tvres.json();

  // found or not
  if (moviedata.Response == "True") {
    displayMovieList(moviedata.Search, searchTerm);
  } else {
    suggestionsMoive.innerHTML = "";
    let resultlist = document.createElement("li");
    resultlist.innerHTML = "no movie found";
    suggestionsMoive.appendChild(resultlist);
  }


  if (tvdata.Response == "True") {
    displaySeriesList(tvdata.Search, searchTerm);
  }else {
    suggestionsTV.innerHTML = "";
    let resultlist = document.createElement("li");
    resultlist.innerHTML = "no movie found";
    suggestionsTV.appendChild(resultlist);
  }
}

// search & Avoid calling the API server excessively
function findResult() {
  let searchTerm = (searchbox.value).trim();
  if (searchTerm.length > 0) {
    suggestions.classList.remove("hidden");
    movieList.classList.remove("hidden");
    tvList.classList.remove("hidden");
    setTimeout(() => {
      loadsearch(searchTerm);
    }, 500)
  } else {
    suggestions.classList.add("hidden");
    movieList.classList.add("hidden");
    tvList.classList.add("hidden");
  }
}

function displayMovieList(result, searchTerm) {
  suggestionsMoive.innerHTML = "";
  let movieCount = 0;
  // list input result of movie
  for (let i = 0; i < result.length; i++) {
    if (movieCount < 3) {
      let resultlist = document.createElement("li");
      resultlist.dataset.id = result[i].imdbID;
      // Use regex to match and make the searchTerm bold in all properties
      let title = result[i].Title.replace(new RegExp(`(${searchTerm})`, "gi"), "<strong>$1</strong>");
      resultlist.innerHTML = `<a href="#"><p class="block hover:bg-gray-200 rounded px-2 py-1" result>${title}</p></a>`;
      suggestionsMoive.appendChild(resultlist);
      movieCount++;
    }
  }
}

function displaySeriesList(result, searchTerm) {
  suggestionsTV.innerHTML = "";
  let seriesCount = 0;
  // list input result of tvshows
  for (let i = 0; i < result.length; i++) {
    if (seriesCount < 3) {
      let resultlist = document.createElement("li");
      resultlist.dataset.id = result[i].imdbID;
      // Use regex to match and make the searchTerm bold in all properties
      let title = result[i].Title.replace(new RegExp(`(${searchTerm})`, "gi"), `<strong>$1</strong>`);
      resultlist.innerHTML = `<a href="#"><p class="block hover:bg-gray-200 rounded px-2 py-1" result>${title}</p></a>`;
      suggestionsTV.appendChild(resultlist);
      seriesCount++;
    }
  }
}