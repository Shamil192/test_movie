/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Pages from "../Pages/Pages";
import Genres from "../Genres/Genres";
import { useHistory } from "react-router-dom";
import useGenres from "../../hooks/useGenres";

function Main() {
  const history = useHistory();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [pageNum, setPageNum] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [sort, setSort] = useState("popularity.desc");
  const genresURL = useGenres(selectedGenres);

  const fetchContent = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=4237669ebd35e8010beee2f55fd45546&language=ru-RU&sort_by=${sort}&include_adult=false&include_video=false&page=${page}&with_genres=${genresURL}`
    );
    const result = await response.json();
    const array = result?.results;
    setMovies(array);
    setPageNum(result.total_pages);
  };

  const addFavorites = (name) => {
    if (!favorites.includes(name)) {
      setFavorites([...favorites, name]);
    }
  };

  const delFavorites = (name) => {
    setFavorites(favorites.filter((el) => el.name === name));
  };

  useEffect(() => {
    fetchContent();
  }, [page, genresURL, sort]);

  const info = (id, e) => {
    e.preventDefault();
    console.log(id);
    history.push(`/info/${id}`);
  };

  const sortHandler = (e) => {
    setSort(e.target.value);
  };

  return (
    <>
      <div>
        <h4 className="my-3">Выберите жанр</h4>
        <Genres
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          genres={genres}
          setGenres={setGenres}
          setPage={setPage}
        />
      </div>
      <div className="my-5">
        <select onChange={(e) => sortHandler(e)}>
          <option value="popularity.desc">По популярности</option>
          <option value="vote_average.desc">По рейтингу</option>
          <option value="primary_release_date.desc">По новизне</option>
        </select>
      </div>
      <div className="container my-5 px-5">
        {movies.map((movie) => (
          <div key={movie.id} className="card" style={{ width: "18rem" }}>
            <img
              src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              className="card-img-top"
              alt=""
            />
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
              <a
                href="/info"
                className="btn btn-primary"
                onClick={(e) => info(movie.id, e)}
              >
                Подробнее
              </a>
              {favorites.includes(movie.title) ? (
                <button
                  className="btn btn-danger my-1"
                  onClick={() => delFavorites(movie.title)}
                >
                  Удалить из избранного
                </button>
              ) : (
                <button
                  className="btn btn-success my-1"
                  onClick={() => addFavorites(movie.title)}
                >
                  Добавить в избранное
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Pages setPage={setPage} pageNum={pageNum} />
    </>
  );
}

export default Main;
