import PropTypes from "prop-types";
import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = colRefs => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.colRefs === colRefs) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.colRefs = colRefs;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;
    if (column.colRefs !== sortColumn.colRefs) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };

  render() {
    const { columns } = this.props;

    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th
              key={column.colRefs || column.key}
              onClick={() => this.raiseSort(column.colRefs)}
              className="clickable"
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

TableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired
};

export default TableHeader;
