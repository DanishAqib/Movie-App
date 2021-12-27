let currPage = 1;
const APIUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${currPage}`;

const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const mainEl = document.querySelector("main");
const form = document.querySelector("form");
const search = document.getElementById("search");
const logoBtn = document.querySelector(".logo");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const navBtns = document.querySelector(".nav");

getMoveis(APIUrl);

async function getMoveis(url) {
  const resp = await fetch(url);
  const respData = await resp.json();
  showMovies(respData.results);
}

function showMovies(movies) {
  mainEl.innerHTML = "";
  movies.forEach((movie) => {
    const { poster_path, original_title, vote_average, overview } = movie;
    if (!poster_path) return;

    let rating = undefined;
    if (vote_average < 5) {
      rating = "red-span";
    } else if (vote_average >= 5 && vote_average < 7) {
      rating = "orange-span";
    } else {
      rating = "green-span";
    }

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `<img
     src="${IMGPATH + poster_path}"
     alt="${original_title}"
   />
   <div class="movie-info">
     <h3>${original_title}</h3>
     <span class=${rating}>${vote_average}</span></div>
     <div class="overview"><h4>Overview:</h4>${overview}</div>`;

    mainEl.appendChild(movieEl);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;

  if (searchTerm) {
    getMoveis(SEARCHAPI + searchTerm);
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
    search.value = "";
  }
});

logoBtn.addEventListener("click", () => {
  showMovies(APIUrl);
  prevBtn.style.display = "inline-block";
  nextBtn.style.display = "inline-block";
});

nextBtn.addEventListener("click", () => {
  window.scrollTo(0, 0);

  // MAX LIMIT OF PAGE
  if (currPage === 500) {
    nextBtn.style.display = "none";
    return;
  }

  currPage += 1;
  const nextPageUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${currPage}`;
  getMoveis(nextPageUrl);
  prevBtn.style.display = "inline-block";
});

prevBtn.addEventListener("click", () => {
  window.scrollTo(0, 0);

  //MIN LIMIT OF PAGE
  if (currPage === 1) {
    prevBtn.style.display = "none";
    return;
  }
  currPage -= 1;
  const prevPageUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${currPage}`;
  getMoveis(prevPageUrl);
  nextBtn.style.display = "inline-block";
});
