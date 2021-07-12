import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const OneFilm = () => {
  const { id } = useParams();
  const [film, setFilm] = useState({});
  const fetchFilm = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=4237669ebd35e8010beee2f55fd45546&language=ru-RU`
    );
    const result = await response.json();
    console.log("===>>>", result);
    setFilm(result);
  };
  useEffect(() => {
    fetchFilm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3>{film.title}</h3>
      <img src={`https://image.tmdb.org/t/p/w300/${film.poster_path}`} alt="" />
      <div className="container my-5">{film.overview}</div>
    </div>
  );
};

export default OneFilm;
