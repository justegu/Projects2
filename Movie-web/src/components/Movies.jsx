import React, { useState, useEffect, useCallback } from "react";
import MovieCard from "./MovieCard";
import "./movies.css";
import FullScreenLoader from "./FullScreenLoader";

const Movies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [search_query, setSearch_query] = useState("");
  const [type, setType] = useState("popular");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [likedMoviesOnly, setLikedMoviesOnly] = useState(false);

  const fetchMovies = useCallback(
    async (category, data = null) => {
      try {
        const api_key = "53c258bb52d305146e19a71e58aa2cc5";
        const base_url = "https://api.themoviedb.org/3/";

        let url = "";

        if (!likedMoviesOnly && !data) {
          if (type === "search" && search_query.trim() !== "") {
            url = `${base_url}${type}/movie?query=${search_query}&api_key=${api_key}`;
          } else if (type === "category" && category) {
            url = `${base_url}discover/movie?api_key=${api_key}&with_genres=${category}`;
          } else {
            url = `${base_url}movie/${type}?api_key=${api_key}`;
          }

          const response = await fetch(url);
          if (response.ok) {
            const responseData = await response.json();
            if (responseData.results) {
              setMovies(responseData.results);
              setIsLoading(false);
              setError(null);
            } else {
              setIsLoading(false);
              setError("No movies found.");
            }
          } else {
            setIsLoading(false);
            setError("Error getting movies");
          }
        } else {
          const likedMovies = data || [];
          setMovies(likedMovies);
          setIsLoading(false);
          setError(null);
        }
      } catch (error) {
        setIsLoading(false);
        setError("Error fetching data:", error.message);
      }
    },
    [likedMoviesOnly, search_query, type]
  );

  const fetchGenres = async () => {
    try {
      const api_key = "53c258bb52d305146e19a71e58aa2cc5";
      const base_url = "https://api.themoviedb.org/3/";

      const response = await fetch(
        `${base_url}genre/movie/list?api_key=${api_key}`
      );
      if (response.ok) {
        const data = await response.json();
        setCategories(data.genres);
      } else {
        console.error(`Error fetching genres: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  //
  //
  // useEffect
  useEffect(() => {
    fetchMovies(selectedCategory);
  }, [type, selectedCategory, search_query, fetchMovies]);

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    if (search_query.trim().length < 2) {
      setType("popular");
    }
  }, [search_query]);

  useEffect(() => {
    if (likedMoviesOnly) {
      const likedMovies =
        JSON.parse(localStorage.getItem("selectedMovies")) || [];
      fetchMovies(selectedCategory, likedMovies);
    } else {
      fetchMovies(selectedCategory);
    }
  }, [likedMoviesOnly, selectedCategory, fetchMovies]);

  //
  //
  // handlers
  const inputHandler = (e) => {
    const inputValue = e.target.value;
    setSearch_query(inputValue);
    setLikedMoviesOnly(false);

    if (inputValue.length < 2) {
      setType("popular");
    }
  };

  const handleKeyDown = (e) => {
    if (search_query.trim() !== "") {
      setSelectedCategory("");
      setType("search");
      setLikedMoviesOnly(false);
    } else if (selectedCategory !== "") {
      setType("category");
      setSearch_query("");
      setLikedMoviesOnly(false);
    } else {
      setType("popular");
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);
    setType("category");
    setSearch_query("");
    setLikedMoviesOnly(false);
  };

  const toggleLikedMovies = () => {
    const likedMovies =
      JSON.parse(localStorage.getItem("selectedMovies")) || [];
    setLikedMoviesOnly((prevLikedMoviesOnly) => !prevLikedMoviesOnly);
    fetchMovies(selectedCategory, likedMovies);
  };

  const backToMainPage = () => {
    setType("popular");
    setSearch_query("");
    setSelectedCategory("");
    setLikedMoviesOnly(false);
  };

  const clearAllLikedMovies = () => {
    localStorage.clear("selectedMovies");
    const likedMovies =
      JSON.parse(localStorage.getItem("selectedMovies")) || [];
    fetchMovies(selectedCategory, likedMovies);
  };

  return (
    <div className="movie-parent">
      <div className="header">
        <div className="logo-btn-cont">
          <div className="logo" onClick={backToMainPage}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              role="img"
              viewBox="0 0 24 24"
              height="2em"
              width="2em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title></title>
              <path d="M19.491 21.899c2.106 0 3.531-1.424 3.531-3.531V3.531C23.022 1.425 21.598 0 19.491 0H4.509C2.403 0 .978 1.424.978 3.531V24l1.809-2.101V3.531a1.721 1.721 0 0 1 1.719-1.719h14.982c.949.002 1.718.77 1.719 1.719v14.837a1.721 1.721 0 0 1-1.719 1.719H6.92l-1.81 1.812-.011-.014zM8.787 11.466H7.09v5.698h1.697c3.793 0 3.793-5.698 0-5.698zm0 4.559h-.551v-3.419h.551c2.215 0 2.215 3.418 0 3.418zM8.456 10.389h1.139V5.83h1.418V4.699H7.037V5.83h1.419v4.559zM14.063 7.201l-1.971-2.502h-.366v5.785h1.156v-3.18l1.182 1.531 1.183-1.531-.008 3.18h1.156V4.699h-.36l-1.971 2.502zM15.983 14.315c.358-.247.51-.689.526-1.124.023-1.004-.606-1.729-1.617-1.729h-2.255v5.706h2.255a1.695 1.695 0 0 0 1.681-1.694v-.02-.008c0-.466-.231-.878-.585-1.127l-.004-.003zm-2.204-1.714h1.013c.327 0 .526.255.526.573a.533.533 0 0 1-.526.574h-1.013V12.6zm1.013 3.427h-1.013v-1.139h1.027c.309 0 .559.25.559.559v.014a.566.566 0 0 1-.566.566h-.001z"></path>
            </svg>
            <h1>The Movie DB</h1>
          </div>
          <div className="btn-cont">
            <button onClick={toggleLikedMovies}>
              <span>{likedMoviesOnly ? "All movies" : "Liked movies"}</span>
            </button>
          </div>
        </div>
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Ieškoti..."
            onChange={inputHandler}
            onKeyDown={handleKeyDown}
            value={search_query}
          />
          <div>
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="popular">Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="title-container">
        <h2>
          {likedMoviesOnly
            ? "Liked"
            : selectedCategory && type !== "search"
            ? categories.find(
                (cat) => cat.id === parseInt(selectedCategory, 10)
              )?.name
            : type === "search"
            ? ""
            : "popular"}{" "}
          movies
        </h2>
        <button
          className={likedMoviesOnly ? "" : "hidden"}
          onClick={clearAllLikedMovies}
        >
          <span>Delete all</span>
        </button>
      </div>

      {error ? (
        <div className="error">
          <h2>{error}</h2>
        </div>
      ) : isLoading ? (
        <div>
          <FullScreenLoader />
        </div>
      ) : likedMoviesOnly && movies.length === 0 ? (
        <div className="likedMovies">
          <h2>No liked movies found</h2>
        </div>
      ) : (
        <div className="allMovieCards-wrapper">
          {movies.slice(0, 10).map((movie) => (
            <MovieCard
              key={movie.id}
              info={movie}
              likedMoviesOnly={likedMoviesOnly}
              setMovies={setMovies}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;
