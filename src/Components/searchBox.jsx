import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      value={value}
      className="form-control"
      type="text"
      placeholder="Search..."
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
