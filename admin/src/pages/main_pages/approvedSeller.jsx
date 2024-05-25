
import Container from 'react-bootstrap/Container';
import Table from './/..//../components/tables'
import axios from 'axios';
import { useState,useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';

function ApprovedSeller() {

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
        approved: true // Set the approved query parameter
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
  
  console.log(setlist)
 
const handleDelete = (_id) =>{
  console.log(_id)

  
  const response = axios.delete(`http://localhost:4000/seller/deleteSeller/${_id}`);
  try{
    toast.success("Deleted succesfully")
  }catch(error){
    toast.error(error)
  }
  fetchlist()
  

}
  return (
    <div className='listseller'>
    <Toaster/>

    <Table  heading={tableHeading} dataa={setlist} action={true} approvalAction={false} removeseller={true} handleDelete={handleDelete} />

    </div>
  );
}

export default ApprovedSeller;
