import { Chip } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  setPage,
}) => {
  const fetchGenres = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=4237669ebd35e8010beee2f55fd45546&language=ru-RU`
    );
    const result = await response.json();
    setGenres(result.genres);
  };

  useEffect(() => {
    fetchGenres();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addGenre = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const delGenre = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  return (
    <div>
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            key={genre.id}
            label={genre.name}
            style={{ margin: 2 }}
            clickable
            color="primary"
            onDelete={() => delGenre(genre)}
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            key={genre.id}
            label={genre.name}
            style={{ margin: 2 }}
            clickable
            onClick={() => addGenre(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
