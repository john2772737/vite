// TableComponent.js
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
 // Import the CSS file for custom styles

function TableComponent({ Heading, Data, Action, onOpenModal, updateProduct, onOpensModal , deleteP }) {
  // Define PropTypes
  TableComponent.propTypes = {
    Heading: PropTypes.arrayOf(PropTypes.string).isRequired,
    Data: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.node]))
    ).isRequired,
    Action: PropTypes.bool.isRequired,
    onOpenModal: PropTypes.func.isRequired,
    onOpensModal: PropTypes.func.isRequired,
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(Data);

  useEffect(() => {
    // Update filtered data when Data or searchQuery changes
    setFilteredData(
      Data.filter((row) =>
        row[1].toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, Data]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Filtering logic is already handled in useEffect
  };

  return (
    <div className="table-container">
    
 
      <form
        className="search-form"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Search for Books"
          className="search-input"
          name="topic"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <button
          type="submit"
          className="search-button"
        >
          Search
        </button>
      </form>
      <div className="table-responsive">
        <Table className="table-custom">
          <thead>
            <tr className="table-header">
              <th>#</th>
              {Heading.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
              {Action && <th>Action</th>}
              {updateProduct && <th>Action</th> }
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td className="table-index">{index + 1}</td>
                {item.map((data, colIndex) => (
                  <td key={colIndex}>{data}</td>
                ))}
                {Action && (
                  <td>
                    <button
                      onClick={() => onOpenModal(item[0])}
                      className="action-button"
                      type="button"
                      data-modal-target="crud-modal"
                      data-modal-toggle="crud-modal"
                    >
                      update stock
                    </button>
                  </td>
                )}

                {updateProduct && (
                  <td>
                    <button
                      onClick={() => onOpensModal(item[0])}
                      className="action-button"
                      type="button"
                      data-modal-target="crud-modals"
                      data-modal-toggle="crud-modals"
                    >
                      update Product
                    </button>
                    <button
                      onClick={() => deleteP(item[0])}
                      className="action-button"
                      type="button"
                      data-modal-target="crud-modals"
                      data-modal-toggle="crud-modals"
                    >
                      delete Product
                    </button>
                  </td>

                  
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default TableComponent;
