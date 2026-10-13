
const movies = [
    {
        title: "Satluj(Punjab 95)",
        language: "Punjabi",
        year: 2025,
        genre: "Drama",
        color1: "#bc6b46",
        color2: "#351d35",
        video: "videos/punjabi/punjab 95.mp4",
        description: "Punjabi movie"
    },
    {
        title: "Yaar Jigree Kasuti Degree",
        language: "Punjabi",
        year: 2024,
        genre: "Family",
        color1: "#c9a15d",
        color2: "#35442f",
        video: "videos/punjabi/Yaar_Jigree_Kasooti_Degree.mp4",
        description: "Punjabi family movie"
    },
    {
        title: "Safar",
        language: "Hindi",
        year: 2025,
        genre: "Drama",
        color1: "#4d7f91",
        color2: "#1d263e",
        video: "videos/hindi/safar.mp4",
        description: "Hindi movie"
    },
    {
        title: "Nayi Subah",
        language: "Hindi",
        year: 2024,
        genre: "Family",
        color1: "#d3a46e",
        color2: "#69414b",
        video: "videos/hindi/nayi-subah.mp4",
        description: "Hindi family movie"
    }
];

const page = document.body.dataset.page;
const grid = document.getElementById("movieGrid");
const search = document.getElementById("searchInput");
const empty = document.getElementById("emptyState");

const modal = document.getElementById("playerModal");
const video = document.getElementById("moviePlayer");
const playerTitle = document.getElementById("playerTitle");
const playerDescription = document.getElementById("playerDescription");

function renderMovies() {
    const query = search.value.toLowerCase().trim();

    let list = movies.filter(movie => {
        const correctPage =
            page === "home" ||
            movie.language.toLowerCase() === page;

        const matchesSearch =
            movie.title.toLowerCase().includes(query) ||
            movie.genre.toLowerCase().includes(query) ||
            movie.language.toLowerCase().includes(query);

        return correctPage && matchesSearch;
    });

    if (page === "home" && !query) {
        list = list.slice(0, 4);
    }

    grid.innerHTML = "";

    list.forEach(movie => {
        const card = document.createElement("div");
        card.className = "movie-card";

        const poster = document.createElement("div");
        poster.className = "poster";
        poster.style.setProperty("--c1", movie.color1);
        poster.style.setProperty("--c2", movie.color2);

        const title = document.createElement("h3");
        title.textContent = movie.title;

        const play = document.createElement("span");
        play.className = "play";
        play.textContent = "▶ Play Movie";

        poster.append(title, play);

        const details = document.createElement("p");
        details.textContent =
            `${movie.language} • ${movie.year} • ${movie.genre}`;

        card.append(poster, details);
        card.addEventListener("click", () => playMovie(movie));

        grid.appendChild(card);
    });

    empty.hidden = list.length !== 0;
}

function playMovie(movie) {
    playerTitle.textContent = movie.title;
    playerDescription.textContent = movie.description;

    video.pause();
    video.src = movie.video;
    modal.hidden = false;

    video.play().catch(() => {
        // The user can press Play if the browser blocks autoplay.
    });
}

function closeMovie() {
    video.pause();
    video.removeAttribute("src");
    video.load();
    modal.hidden = true;
}

search.addEventListener("input", renderMovies);

document.getElementById("closePlayer")
    .addEventListener("click", closeMovie);

modal.addEventListener("click", event => {
    if (event.target === modal) {
        closeMovie();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeMovie();
    }
});

renderMovies();

function playMovie(videoPath) {
  const player = document.getElementById("moviePlayer");

  player.src = videoPath;
  player.load();
  player.play().catch(error => {
    console.error("Could not play video:", error);
    alert("Video could not play. Check the file path and format.");
  });
}
