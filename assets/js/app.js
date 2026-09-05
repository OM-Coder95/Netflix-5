const cl = console.log;

const toggleBtn = document.getElementById("toggleBtn");
const backdrop = document.getElementById("backdrop");
const movieModal = document.getElementById("movieModal");
const toggleIcon = document.getElementById("toggleIcon");
const hideMovieModalBtn = document.getElementById("hideMovieModalBtn");
const movieContainer = document.getElementById("movieContainer");

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

// setRating

function setRating(rating) {
    if(rating > 7) {
        return "badge-success"
    } else if (rating > 5) {
        return "badge-warning"
    } else {
        return "badge-danger"
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
                        <button class="btn btn-sm net-pri-btn">Edit</button>
                        <button class="btn btn-sm net-sec-btn">Remove</button>
                    </div>
                </div>
            </div>
        `;
  });
  movieContainer.innerHTML = result;
}

showOnUI(movieArr)

toggleBtn.addEventListener("click", onAddMovieBtnClick);
toggleIcon.addEventListener("click", onAddMovieBtnClick);
hideMovieModalBtn.addEventListener("click", onAddMovieBtnClick);
backdrop.addEventListener("click", onAddMovieBtnClick);
