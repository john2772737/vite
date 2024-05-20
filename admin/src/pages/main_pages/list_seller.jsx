
import Container from 'react-bootstrap/Container';
import Table from './/..//../components/tables'
import './list_seller.css'; // Import your CSS file
import axios from 'axios';
import { useState,useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
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
   
  ];
  const[data,setData]= useState([])
console.log(data)
  const setlist = data.map((item) => {
    const picture = <img src={item.picture} alt="Description of the image" style={{ width: '200px', height: '200px' }} />;
    const idPicture = <img src={item.idPicture} alt="Description of the image" style={{ width: '200px', height: '200px' }} />;
    return [
      
      item._id,
      item.firstname,
      item.lastname,
      item.shopname,
      item.email,
      item.birthday.replace("T00:00:00.000Z", " "), // Assuming item.birthday is a string
      item.phoneNumber,
      picture, // Image element
      idPicture ,// Assuming this is another image ID or source
     
    ];
  });
  

  const fetchlist = () => {
    axios.get('http://localhost:4000/seller/listseller',{
      params: {
        approved: "false",
  
      }
    })
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

 
const handleDelete = async(_id) =>{
  console.log(_id)
  const updatedData = {
    approved: "unapproved" // Set the 'submit' field to true
  };
  
  const response = await axios.put(`http://localhost:4000/seller/updateSeller/${_id}`, updatedData);

  try{
    toast.success("Updated Succesfully")
    fetchlist()

  }catch(error){
    toast.error(error)
  }

}
const handleApprove = async(_id) =>{
  console.log(_id)

  const updatedData = {
    approved: "true" // Set the 'submit' field to true
  };
  
  const response = await axios.put(`http://localhost:4000/seller/updateSeller/${_id}`, updatedData);

  try{
    toast.success("Updated Succesfully")
    fetchlist()

  }catch(error){
    toast.error(error)
  }
}
  return (
    <div className='listseller'>
    <Toaster/>
    <h1> Seller Approval</h1>
    <Container className="container-box"> {/* Container box */}

    <Table  heading={tableHeading} dataa={setlist} action={false} approvalAction={true} handleDelete={handleDelete} handleApprove={handleApprove} />
    </Container>
    </div>
  );
}

export default ListSeller;
