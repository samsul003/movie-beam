import PropTypes from "prop-types";
import React from "react";

const ListGroup = ({
  items,
  textProp,
  valueProp,
  onItemSelect,
  selectedItem
}) => {
  const cssClasses = "list-group-item clickable";
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item[valueProp]}
          onClick={() => onItemSelect(item)}
          className={
            item === selectedItem ? `${cssClasses} active` : `${cssClasses}`
          }
        >
          {item[textProp]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProp: "name",
  valueProp: "_id"
};

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  onItemSelect: PropTypes.func.isRequired,
  selectedItem: PropTypes.object
};

export default ListGroup;
