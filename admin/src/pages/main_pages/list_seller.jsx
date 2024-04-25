
import Container from 'react-bootstrap/Container';
import Table from './/..//../components/tables'
import './list_seller.css'; // Import your CSS file

function ListSeller() {

  const tableHeading = [
    "First Name",
    "Last Name",
    "Shop Name",
    "Email",
    "Birthday",
    "Phone Number",
    "Picture",
    "ID Picture",
    "Approved"
  ];
  
  return (
    <div className='listseller'>
    <h1>List Seller</h1>
    <Container className="container-box"> {/* Container box */}
        <Table  heading={tableHeading} dataa={setlist} action={false} approvalAction={false} />
    </Container>
    </div>
  );
}

export default ListSeller;
