// const addMovieMovie = document.getElementById("add-modal");
const backdrop = document.getElementById("backdrop");
const addMovieModal = document.querySelector("#add-modal");
const openMovieModalBtn = document.querySelector("header button");
const closeMovieModalBtn = addMovieModal.querySelector(".btn--passive");
const addMovieBtn = addMovieModal.querySelector(".btn--success");
const userInputs = addMovieModal.querySelectorAll("input");

const movies = [];

const updateUi = () => {
  const startSection = document.getElementById("entry-text");
  if (movies.length === 0) {
    startSection.style.display = "block";
  } else {
    startSection.style.display = "none";
  }
};

const addNewMovieElement = ({id, title, image, rating}) => {
  const newMovieEl = document.createElement("li")
  newMovieEl.className = "movie-element";
  newMovieEl.innerHTML =
    `
    <div class="movie-element__image"> 
      <img src="${image}" alt="${title}"></img>
    </div>
    <div class="movie-element__info">
      <h1>${title}</h1>
      <p>${rating}/5</p>
    </div>
    `;
    // console.log(id)
    newMovieEl.addEventListener("click", deleteMovieHandler.bind(null, id))
    const listRoot = document.getElementById("movie-list")
    listRoot.append(newMovieEl)
}

const deleteMovieHandler = (movieId) => {
  console.log(movieId)
  let movieIndex = 0;
  for (const movieEl of movies) {
    if (movieEl.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById("movie-list")
  listRoot.children[movieIndex].remove();
  // listRoot.removeChild(listRoot.children[movieIndex]);
}

const toggleBackdrop = () => {
  //toggle - adds or removes the class base on its current state
  backdrop.classList.toggle("visible");
};

const toggleMovieModal = () => {
  addMovieModal.classList.toggle("visible");
  toggleBackdrop();
  clearMovieInputs();
};

const clearMovieInputs = () => {
  for (const userInp of userInputs) {
    userInp.value = "";
  }
};

const backdropClickHandler = () => {
  toggleMovieModal();
};

const closeMovieModalHandler = () => {
  toggleMovieModal();
};

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
  toggleMovieModal();
  clearMovieInputs;
  addNewMovieElement(newMovie)
  updateUi();
};

openMovieModalBtn.addEventListener("click", toggleMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
closeMovieModalBtn.addEventListener("click", closeMovieModalHandler);
addMovieBtn.addEventListener("click", addMovieBtnHandler);
