const movie_name = document.getElementById("moviename");
const button = document.getElementById("search");
const movieResults = document.getElementById("movie-results");
const watchListButton = document.getElementById("watch-list");

// My Watchlist button
watchListButton.addEventListener("click", () => {
    window.location.href = "watchlist.html";
});


button.addEventListener("click", () => {

    const inputvalue = movie_name.value.trim();

    if (inputvalue === "") {
        movieResults.innerHTML = "<p>Please enter a movie name.</p>";
        return;
    }

    const API_KEY = "YOUR_API_KEY";

    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(inputvalue)}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {

            console.log(data);

            if (data.Response === "False") {
                movieResults.innerHTML = `<p>${data.Error}</p>`;
                return;
            }

            movieResults.innerHTML = "";

            data.Search.forEach(movie => {

                const movieCard = document.createElement("div");

                movieCard.classList.add("movie-card");

                movieCard.innerHTML = `
                    <img 
                        src="${movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}"
                        alt="${movie.Title}"
                    >

                    <div class="movie-info">

                        <h2>${movie.Title}</h2>

                        <p>Year: ${movie.Year}</p>

                        <p>Type: ${movie.Type}</p>

                        <button class="watchlist-btn">
                            + Add to Watchlist
                        </button>

                    </div>
                `;

                movieResults.appendChild(movieCard);

                const watchlistButton =
                    movieCard.querySelector(".watchlist-btn");

                watchlistButton.addEventListener("click", () => {
                    addToWatchlist(movie);
                });

            });

        })
        .catch(error => {

            console.error(error);

            movieResults.innerHTML =
                "<p>Something went wrong. Please try again.</p>";

        });

});


function addToWatchlist(movie) {

    // Get existing movies
    let watchlist =
        JSON.parse(localStorage.getItem("watchlist")) || [];

    // Check whether movie already exists
    const alreadyExists = watchlist.some(
        item => item.imdbID === movie.imdbID
    );

    if (alreadyExists) {
        alert("This movie is already in your watchlist!");
        return;
    }

    // Add movie
    watchlist.push(movie);

    // Save movie list
    localStorage.setItem(
        "watchlist",
        JSON.stringify(watchlist)
    );

    alert(`${movie.Title} added to your watchlist!`);
}