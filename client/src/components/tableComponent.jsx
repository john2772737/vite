// TableComponent.js
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";

function TableComponent({ Heading, Data, Action, UpdateStock, onOpenModal }) {
  // Define PropTypes
  TableComponent.propTypes = {
    Heading: PropTypes.arrayOf(PropTypes.string).isRequired,
    Data: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.node]))
    ).isRequired,
    Action: PropTypes.bool.isRequired,
    UpdateStock: PropTypes.func.isRequired,
    onOpenModal: PropTypes.func.isRequired,
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
    <div>
      <h1>Table</h1>
      <form
        className="mt-0 mx-auto max-w-[250px] max-h-[40px] py-2 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Search for Books"
          className="font-bodoni-ferrara bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0"
          name="topic"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <button
          type="submit"
          className="mt-0 font-bodoni-ferrara flex flex-row items-center justify-center min-w-[70px] px-4 rounded-full font-medium tracking-wide border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-black text-white font-medium tracking-wide border-transparent py-1 h-[27px] -mr-5"
        >
          Search
        </button>
      </form>
      <Table responsive className="table-custom">
        <thead>
          <tr
            style={{
              backgroundColor: "black",
              color: "white",
              fontFamily: "League Spartan",
              border: "1px solid black",
            }}
          >
            <th>#</th>
            {Heading.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
            {Action && <th>Action</th>} {/* Add Action column if Action is true */}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td style={{ width: "1%" }}>{index + 1}</td>
              {item.map((data, colIndex) => (
                <td key={colIndex}>{data}</td>
              ))}
              {Action && (
                <td>
                  <button
                    onClick={() => onOpenModal(item[0])} // Pass the item ID to the modal open handler
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    data-modal-target="crud-modal" // Add modal target attribute
                    data-modal-toggle="crud-modal" // Add modal toggle attribute
                  >
                    Toggle modal
                  </button>
                </td>
              )} {/* Add Action buttons if Action is true */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TableComponent;
