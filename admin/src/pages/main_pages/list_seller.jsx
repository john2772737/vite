
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import './list_seller.css'; // Import your CSS file

function ListSeller() {
  return (
    <div className='listseller'>
    <h1>List Seller</h1>
    <Container className="container-box"> {/* Container box */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>john@example.com</td>
            <td>123-456-7890</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </Table>
    </Container>
    </div>
  );
}

export default ListSeller;
