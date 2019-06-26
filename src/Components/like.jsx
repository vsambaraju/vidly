import React from "react";

const Like = props => {
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className={handleClasses(props)}
      aria-hidden="true"
    />
  );
};

const handleClasses = props => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return classes;
};

export default Like;
