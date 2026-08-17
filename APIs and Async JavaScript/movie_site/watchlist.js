const watchlistContainer =
    document.getElementById("watchlist-container");

const backButton =
    document.getElementById("back-button");


// Back to home page
backButton.addEventListener("click", function () {

    window.location.href = "index.html";

});


// Get watchlist
let watchlist =
    JSON.parse(localStorage.getItem("watchlist")) || [];


// Check empty
if (watchlist.length === 0) {

    watchlistContainer.innerHTML = `
        <h2>No movies in your watchlist.</h2>
    `;

}


// Display movies
watchlist.forEach(function (movie) {

    const movieCard =
        document.createElement("div");

    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `

        <img
            src="${
                movie.Poster !== "N/A"
                    ? movie.Poster
                    : "placeholder.jpg"
            }"
            alt="${movie.Title}"
        >

        <div class="movie-info">

            <h2>${movie.Title}</h2>

            <p>Year: ${movie.Year}</p>

            <p>Type: ${movie.Type}</p>

            <button class="remove-btn">
                Remove
            </button>

        </div>
    `;


    watchlistContainer.appendChild(movieCard);


    // Remove button
    const removeButton =
        movieCard.querySelector(".remove-btn");


    removeButton.addEventListener("click", function () {

        removeMovie(movie.imdbID);

    });

});


// Remove movie
function removeMovie(movieID) {

    watchlist =
        watchlist.filter(movie => movie.imdbID !== movieID);


    localStorage.setItem(
        "watchlist",
        JSON.stringify(watchlist)
    );


    // Reload page
    location.reload();
}