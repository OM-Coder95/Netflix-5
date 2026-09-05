const cl = console.log;

const toggleBtn = document.getElementById("toggleBtn");
const backdrop = document.getElementById("backdrop");
const movieModal = document.getElementById("movieModal");
const toggleIcon = document.getElementById("toggleIcon");
const hideMovieModalBtn = document.getElementById("hideMovieModalBtn");

// DataBase

let movieArr = movieArray1;

localStorage.setItem("movieArr", JSON.stringify(movieArr));

// Functions

function onAddMovieBtnClick() {
  backdrop.classList.toggle("active");
  movieModal.classList.toggle("active");
}

toggleBtn.addEventListener("click", onAddMovieBtnClick);
toggleIcon.addEventListener("click", onAddMovieBtnClick);
hideMovieModalBtn.addEventListener("click", onAddMovieBtnClick);
backdrop.addEventListener("click", onAddMovieBtnClick);
