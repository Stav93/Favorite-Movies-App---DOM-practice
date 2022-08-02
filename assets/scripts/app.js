// const addMovieMovie = document.getElementById("add-modal");
const backdrop = document.getElementById("backdrop");
const addMovieModal = document.querySelector("#add-modal");
const openMovieModalBtn = document.querySelector("header button");
const closeMovieModalBtn = addMovieModal.querySelector(".btn--passive");
const addMovieBtn = addMovieModal.querySelector(".btn--success");
const userInputs = addMovieModal.querySelectorAll("input");


const movies = [];

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
}

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
    alert("Please enter a number between 1 and 5")
  }

  const newMovie = {
    title: titleValue,
    image: imageValue,
    rating: ratingValue
  }

  movies.push(newMovie);
  console.log(movies)
  toggleMovieModal();
  clearMovieInputs;
};

openMovieModalBtn.addEventListener("click", toggleMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
closeMovieModalBtn.addEventListener("click", closeMovieModalHandler);
addMovieBtn.addEventListener("click", addMovieBtnHandler);
