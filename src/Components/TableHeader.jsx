import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = title => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === title) {
      sortColumn.order === "asc"
        ? (sortColumn.order = "desc")
        : (sortColumn.order = "asc");
    } else {
      sortColumn.path = title;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  createSortIcon = column => {
    const sortColumn = this.props.sortColumn;
    if (column.name !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              key={column.name || column.key}
              onClick={() => this.raiseSort(column.name)}
            >
              {column.label} {this.createSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
