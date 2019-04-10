import PropTypes from "prop-types";
import React from "react";

const Like = ({ liked, onLike }) => {
  let classes = "fa fa-heart";
  if (!liked) classes += "-o";
  return (
    <i onClick={onLike} style={{ cursor: "pointer" }} className={classes} />
  );
};

Like.propTypes = {
  liked: PropTypes.bool,
  onLike: PropTypes.func
};

export default Like;
