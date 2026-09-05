const cl = console.log;

const toggleBtn = document.getElementById("toggleBtn");
const backdrop = document.getElementById("backdrop");
const movieModal = document.getElementById("movieModal");
const toggleIcon = document.getElementById("toggleIcon");
const hideMovieModalBtn = document.getElementById("hideMovieModalBtn");
const movieContainer = document.getElementById("movieContainer");
const form = document.getElementById("form");
const movieName = document.getElementById("movieName");
const movieImage = document.getElementById("movieImage");
const movieDescription = document.getElementById("movieDescription");
const movieRating = document.getElementById("movieRating");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");

// DataBase

let jsonArr = localStorage.getItem("movieArr");

let movieArr = jsonArr ? JSON.parse(jsonArr) : [];

cl(movieArr);

// Functions

// Toggling Function

function onAddMovieBtnClick() {
  backdrop.classList.toggle("active");
  movieModal.classList.toggle("active");
}

// SaveData

function saveDataInLS() {
  localStorage.setItem("movieArr", JSON.stringify(movieArr));
}

// setRating

function setRating(rating) {
  if (rating > 7) {
    return "badge-success";
  } else if (rating > 5) {
    return "badge-warning";
  } else {
    return "badge-danger";
  }
}

// Read

function showOnUI(arr) {
  let result = "";

  arr.forEach((ele) => {
    result += `
               <div class="col-md-3 mb-3">
                <div class="card movieCard" id="${ele.id}">
                 
                    <div class="card-header d-flex justify-content-between cardHeading">
                        <h4 class="m-0">${ele.original_title}</h4>
                        <h5 class="m-0"><span class="badge ${setRating(ele.vote_average)}">${ele.vote_average}</span></h5>
                    </div>
                   
                    <div class="card-body py-0">
                        <figure class="m-0">
                            <img src="https://image.tmdb.org/t/p/w500${ele.poster_path || ele.backdrop_path}" alt="${ele.original_title}" title="${ele.original_title}">
                            <figcaption>
                                <h4 class="m-0">${ele.original_title}</h4>
                                <p class="m-0">${ele.overview}</p>
                            </figcaption>
                        </figure>
                    </div>
                
                    <div class="card-footer d-flex justify-content-between">
                        <button onclick="editMovie(this)" class="btn btn-sm net-pri-btn">Edit</button>
                        <button class="btn btn-sm net-sec-btn">Remove</button>
                    </div>
                </div>
            </div>
        `;
  });
  movieContainer.innerHTML = result;
}

showOnUI(movieArr);

// create

function onMovieAdd(event) {
  event.preventDefault();

  let newMovie = {
    id: crypto.randomUUID(),
    original_title: movieName.value.trim(),
    poster_path: movieImage.value.trim(),
    overview: movieDescription.value.trim(),
    vote_average: movieRating.value,
  };

  movieArr.unshift(newMovie);
  saveDataInLS();
  Swal.fire({
    title: "Movie Added!",
    text: "Movie card created successfully.",
    icon: "success",
    timer: 2000,
  });
  form.reset();
  onAddMovieBtnClick();

  //   UI

  let div = document.createElement("div");

  div.id = newMovie.id;

  div.className = `col-md-3 mb-3`;

  div.innerHTML = `
                  <div class="card movieCard" id="${newMovie.id}">
                 
                    <div class="card-header d-flex justify-content-between cardHeading">
                        <h4 class="m-0">${newMovie.original_title}</h4>
                        <h5 class="m-0"><span class="badge ${setRating(newMovie.vote_average)}">${newMovie.vote_average}</span></h5>
                    </div>
                   
                    <div class="card-body py-0">
                        <figure class="m-0">
                            <img src="https://image.tmdb.org/t/p/w500${newMovie.poster_path || newMovie.backdrop_path}" alt="${newMovie.original_title}" title="${newMovie.original_title}">
                            <figcaption>
                                <h4 class="m-0">${newMovie.original_title}</h4>
                                <p class="m-0">${newMovie.overview}</p>
                            </figcaption>
                        </figure>
                    </div>
                
                    <div class="card-footer d-flex justify-content-between">
                        <button onclick="editMovie(this)" class="btn btn-sm net-pri-btn">Edit</button>
                        <button class="btn btn-sm net-sec-btn">Remove</button>
                    </div>
                </div>
  `;
  movieContainer.prepend(div);
}

// edit

function editMovie(ele) {
  let editId = ele.closest(".movieCard").id;
  onAddMovieBtnClick();

  let editObj = movieArr.find((ele) => String(ele.id) === String(editId));

  movieName.value = editObj.original_title;
  movieImage.value = editObj.poster_path;
  movieDescription.value = editObj.overview;
  movieRating.value = editObj.vote_average;

  submitBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

toggleBtn.addEventListener("click", onAddMovieBtnClick);
toggleIcon.addEventListener("click", onAddMovieBtnClick);
hideMovieModalBtn.addEventListener("click", onAddMovieBtnClick);
backdrop.addEventListener("click", onAddMovieBtnClick);
form.addEventListener("submit", onMovieAdd);
