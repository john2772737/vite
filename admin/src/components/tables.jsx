import PropTypes from 'prop-types';
import Table from "react-bootstrap/Table";

function ResponsiveTable({ heading, dataa, action, handleDelete,handleApprove ,approvalAction,removeseller}) {
  ResponsiveTable.propTypes = {
    heading: PropTypes.arrayOf(PropTypes.string).isRequired,
    dataa: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired,
    action: PropTypes.bool,
    onActionClick: PropTypes.func.isRequired,
    approvalAction: PropTypes.bool,
    handleDelete: PropTypes.func.isRequired,
    handleApprove: PropTypes.func.isRequired,
    removeseller:PropTypes.bool
  };

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

          {approvalAction && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        {dataa.map((rowData, rowIndex) => (
          <tr key={rowIndex}>
            <td>{rowIndex + 1}</td>
            
            {rowData.map((data, colIndex) => (
              <td key={colIndex}>{data}</td>
            ))}
           

           {approvalAction &&(
            <td>
                <button onClick={() => handleDelete(rowData[0])}>EKIS</button>
                <button onClick={() => handleApprove(rowData[0])}>APPROVE</button>
              </td>
           )}

           
           {removeseller &&(
            <td>
                <button onClick={() => handleDelete(rowData[0])}>remove</button>
               
              </td>
           )}


         
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ResponsiveTable;