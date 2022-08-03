// const addMovieMovie = document.getElementById("add-modal");
const backdrop = document.getElementById("backdrop");
const addMovieModal = document.querySelector("#add-modal");
const openMovieModalBtn = document.querySelector("header button");
const closeMovieModalBtn = addMovieModal.querySelector(".btn--passive");
const addMovieBtn = addMovieModal.querySelector(".btn--success");
const userInputs = addMovieModal.querySelectorAll("input");
const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

const toggleBackdrop = () => {
  //toggle - adds or removes the class base on its current state
  backdrop.classList.toggle("visible");
};

const updateUi = () => {
  const startSection = document.getElementById("entry-text");
  if (movies.length === 0) {
    startSection.style.display = "block";
  } else {
    startSection.style.display = "none";
  }
};

// colse delete movie modal confirmation
const cancleDeleteMovie = () => {
  deleteMovieModal.classList.remove("visible");
  toggleBackdrop();
};

const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movieEl of movies) {
    if (movieEl.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById("movie-list");
  listRoot.children[movieIndex].remove();
  // listRoot.removeChild(listRoot.children[movieIndex]);
  cancleDeleteMovie();
  updateUi();
};

// show delete movie modal confirmation
const deleteMovieHandler = (id) => {
  deleteMovieModal.classList.add("visible");
  toggleBackdrop();
  const cancleDeleteBtn = deleteMovieModal.querySelector(".btn--passive")
  let confirmDeleteBtn = deleteMovieModal.querySelector(".btn--danger")

  // the dom object is created with a clone (with a new object) so all listeners can be deleted
  confirmDeleteBtn.replaceWith(confirmDeleteBtn.cloneNode(true));
  confirmDeleteBtn = deleteMovieModal.querySelector(".btn--danger")

  cancleDeleteBtn.removeEventListener("click", cancleDeleteMovie)

  cancleDeleteBtn.addEventListener("click", cancleDeleteMovie)
  confirmDeleteBtn.addEventListener("click", deleteMovie.bind(null, id))
};

const addNewMovieElement = ({ id, title, image, rating }) => {
  const newMovieEl = document.createElement("li");
  newMovieEl.className = "movie-element";
  newMovieEl.innerHTML = `
    <div class="movie-element__image"> 
      <img src="${image}" alt="${title}"></img>
    </div>
    <div class="movie-element__info">
      <h1>${title}</h1>
      <p>${rating}/5</p>
    </div>
    `;
  // console.log(id)
  newMovieEl.addEventListener("click", deleteMovieHandler.bind(null, id));
  const listRoot = document.getElementById("movie-list");
  listRoot.append(newMovieEl);
};

const closeMovieModal = () => {
  addMovieModal.classList.remove("visible");
  // toggleBackdrop();
};

const showMovieModal = () => {
  addMovieModal.classList.add("visible");
  toggleBackdrop();
};

const clearMovieInputs = () => {
  for (const userInp of userInputs) {
    userInp.value = "";
  }
};

const closeMovieModalHandler = () => {
  closeMovieModal();
  clearMovieInputs();
  toggleBackdrop();
}

const addMovieBtnHandler = () => {
  const titleValue = userInputs[0].value;
  const imageValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === "" ||
    imageValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert("Please enter a number between 1 and 5");
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageValue,
    rating: ratingValue,
  };

  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  toggleBackdrop();
  clearMovieInputs();
  addNewMovieElement(newMovie);
  updateUi();
};

const backdropClickHandler = () => {
  closeMovieModal();
  cancleDeleteMovie();
  clearMovieInputs();
};

openMovieModalBtn.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
closeMovieModalBtn.addEventListener("click", closeMovieModalHandler);
addMovieBtn.addEventListener("click", addMovieBtnHandler);
