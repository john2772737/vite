
import Container from 'react-bootstrap/Container';
import Table from './/..//../components/tables'
import './list_seller.css'; // Import your CSS file
import axios from 'axios';
import { useState,useEffect } from 'react';
function ListSeller() {

  const tableHeading = [
    "ID number",
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
  const[data,setData]= useState([])

  const setlist = data.map((item) => [
    item._id,
    item.firstname,
    item.lastname,
    item.shopname,

    item.email,
    item.birthday=item.birthday.replace("T00:00:00.000Z", " "),
    item.phoneNumber,



  ]);

  const fetchlist = () => {
    axios.get('http://localhost:4000/seller/listseller')
      .then(response => {
        setData(response.data)
      
      })
      .catch(error => {
        // Handle error here
        console.error("Error:", error);
      });
  }
 
  useEffect(() => {
    fetchlist();
  }, []); // Empty dependency array to ensure fetchlist is only called once when the component mounts
  
  console.log(setlist)
 

  return (
    <div className='listseller'>
    <h1>List Seller</h1>
    <Container className="container-box"> {/* Container box */}

    <Table  heading={tableHeading} dataa={setlist} action={false} approvalAction={true} />
    </Container>
    </div>
  );
}

export default ListSeller;
