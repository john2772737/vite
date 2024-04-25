import React from "react";
import Table from "react-bootstrap/Table";



function ResponsiveTable({ heading, dataa, action ,onActionClick}) {



  return (
    <Table responsive>
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
          {heading.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
          {action && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        {dataa.map((rowData, rowIndex) => (
        
          <tr key={rowIndex}>
          
          <td>{rowIndex + 1}</td>
            {rowData.map((data, colIndex) => (
              <td key={colIndex}>{data}</td>
            ))}
            {action && (
              <td>
              <button onClick={() => onActionClick(rowData[0])}>DELETE</button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ResponsiveTable;
