import PropTypes from "prop-types";
import React from "react";

import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired
};

export default Table;
