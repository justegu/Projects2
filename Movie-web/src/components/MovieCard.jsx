import React, { useEffect, useState } from "react";

const MovieCard = ({ info, likedMoviesOnly, setMovies }) => {
  const [liked, setLiked] = useState(false);
  const voteAverageRounded = info.vote_average.toFixed(1);

  const backgroundStyle = info.poster_path
    ? {
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${info.poster_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : null;

  const handleMovieClick = () => {
    setLiked((prevLiked) => !prevLiked);

    const newMovie = {
      id: info.id,
      title: info.title,
      release_date: info.release_date,
      poster_path: info.poster_path,
      vote_average: info.vote_average,
    };

    const existingMovies =
      JSON.parse(localStorage.getItem("selectedMovies")) || [];

    // delete and push
    const movieIndex = existingMovies.findIndex(
      (movie) => movie.id === info.id
    );

    if (movieIndex === -1) {
      existingMovies.push(newMovie);
    } else {
      existingMovies.splice(movieIndex, 1);

      if (likedMoviesOnly) {
        setMovies((prevMovies) =>
          prevMovies.filter((movie) => movie.id !== info.id)
        );
      }
    }

    localStorage.setItem("selectedMovies", JSON.stringify(existingMovies));
  };

  useEffect(() => {
    const existingMovies =
      JSON.parse(localStorage.getItem("selectedMovies")) || [];
    const isLiked = existingMovies.some((movie) => movie.id === info.id);
    setLiked(isLiked);
  }, [info.id]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.clear("selectedMovies");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="movie-wrapper">
      <div className="poster" style={backgroundStyle}>
        <i
          className={liked ? "fa-solid fa-heart" : "fa-regular fa-heart"}
          onClick={handleMovieClick}
        />
        <div className="vote">{voteAverageRounded}</div>
      </div>

      <div className="movie-content">
        <h4>{info.title}</h4>
        <p>{info.release_date ? info.release_date.substring(0, 4) : null}</p>
      </div>
    </div>
  );
};

export default MovieCard;
