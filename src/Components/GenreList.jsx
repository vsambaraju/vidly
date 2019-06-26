import React, { Component } from "react";

class GenreList extends Component {
  render() {
    return (
      <ul className="list-group">
        {this.props.genreList.map(genre => (
          <li
            key={genre._id}
            className={
              genre.name === this.props.selectedItem
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => this.props.onItemSelection(genre.name)}
          >
            {genre.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default GenreList;
