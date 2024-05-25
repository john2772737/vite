import PropTypes from 'prop-types';

function ResponsiveTable({
  heading, dataa, action, handleDelete, handleApprove, approvalAction, removeseller
}) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr className="bg-black text-white" style={{ fontFamily: 'League Spartan', border: '1px solid black' }}>
          <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider whitespace-nowrap">#</th>
          {heading.map((item, index) => (
            <th key={index} className="px-20 py-3 text-xs font-medium uppercase tracking-wider whitespace-nowrap">{item}</th>
          ))}
          {action && <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider whitespace-nowrap">Action</th>}
          {approvalAction && <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider whitespace-nowrap">Action</th>}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {dataa.map((rowData, rowIndex) => (
          <tr key={rowIndex}>
            <td className="px-6 py-4 text-center whitespace-nowrap">{rowIndex + 1}</td>
            {rowData.map((data, colIndex) => (
              <td key={colIndex} className="px-6 py-4 text-center whitespace-nowrap">{data}</td>
            ))}
            {approvalAction && (
              <td className="px-6 py-4 text-center whitespace-nowrap">
                <button
                  onClick={() => handleDelete(rowData[0])}
                  className="px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                >
                  EKIS
                </button>
                <button
                  onClick={() => handleApprove(rowData[0])}
                  className="ml-2 px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-green active:bg-green-600 transition duration-150 ease-in-out"
                >
                  APPROVE
                </button>
              </td>
            )}
            {removeseller && (
              <td className="px-6 py-4 text-center whitespace-nowrap">
                <button
                  onClick={() => handleDelete(rowData[0])}
                  className="px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                >
                  remove
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

ResponsiveTable.propTypes = {
  heading: PropTypes.arrayOf(PropTypes.string).isRequired,
  dataa: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired,
  action: PropTypes.bool,
  handleDelete: PropTypes.func.isRequired,
  handleApprove: PropTypes.func.isRequired,
  approvalAction: PropTypes.bool,
  removeseller: PropTypes.bool
};

export default ResponsiveTable;
