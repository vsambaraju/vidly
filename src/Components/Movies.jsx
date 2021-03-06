import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../services/fakeMovieService.js";
import { getMovies, deleteMovie } from "../services/movieService.js";
import Pagination from "./pagination.jsx";
import { paginate } from "../utils/paginate.js";
import { filter } from "../utils/filter.js";
import GenreList from "./GenreList";
import { getGenres } from "../services/genreService";
import MoviesTable from "./MoviesTable.jsx";
import _ from "lodash";
import SearchBox from "./searchBox.jsx";
import { fileURLToPath } from "url";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    genre: "All Movies",
    sortColumn: {
      path: "title",
      order: "asc"
    },
    searchQuery: ""
  };

  componentDidMount() {
    console.log("component mounted");

    let genres = [];
    let allMovies = [];
    getGenres().then(response => {
      genres = [{ _id: "", name: "All Movies" }, ...response.data];
      this.setState({ genres });
    });
    // const genres = [{ _id: "", name: "All Movies" }, ...getGenres()];
    getMovies().then(response => {
      allMovies = [...response.data];
      this.setState({ movies: allMovies });
    });
  }

  handleDelete = movie => {
    const originalMovies = this.state.movies;
    const remainingMovies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies: remainingMovies });

    deleteMovie(movie._id)
      .then(response => console.log(response, " Movie has been deleted"))
      .catch(ex => {
        toast("Movie has already been deleted");
        this.setState({ movies: originalMovies });
      });
  };

  handleLike = movie => {
    console.log("liked");
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelection = genre => {
    this.setState({ genre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, genre: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      genre,
      sortColumn,
      searchQuery
    } = this.state;

    let filteredMovies = allMovies;
    if (searchQuery)
      filteredMovies = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase().trim())
      );
    else filteredMovies = filter(allMovies, genre);
    const orderedMovies = _.orderBy(
      filteredMovies,
      sortColumn.path,
      sortColumn.order
    );
    const movies = paginate(orderedMovies, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: movies };
  };

  render() {
    const count = this.state.movies.length;
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      genre,
      genres,
      sortColumn,
      searchQuery
    } = this.state;

    const { totalCount, data: movies } = this.getPagedData();
    const { user } = this.props;
    if (count === 0) {
      return <p>There are no movies in the database</p>;
    }
    return (
      <div className="row">
        <div className="col-3">
          <GenreList
            genreList={genres}
            selectedItem={genre}
            onItemSelection={this.handleGenreSelection}
          />
        </div>
        <div className="col-9">
          {user && (
            <Link className="btn btn-primary new-movie" to="/movies/new">
              New Movie
            </Link>
          )}
          <p>Showing {totalCount} movies</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            totalCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
