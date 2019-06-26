export function filter(movies, genre) {
  if (genre === "All Movies" || genre === null) return movies;
  return movies.filter(movie => movie.genre.name === genre);
}
