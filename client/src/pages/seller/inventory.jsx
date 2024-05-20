import TableComponent from "../../components/tableComponent";
import axios from 'axios';
import { useFirebase } from "../../utils/context";
import { useState, useEffect } from "react";

function Inventory() {
  const heading = ['Id','Name', 'Image','Total Item','Total Sold','Remaining Stock'];
  const { currentUser } = useFirebase();
  const currentUserUid = currentUser.uid;

  const[data,setData]= useState([])


  const setlist = data.map((item) => {
    const picture = <img src={item.imageUrl} alt="Description of the image" style={{ width: '100px', height: '100px' }} />;
   
    return [
      
      item._id,
      item.name,
  
    
    
      picture,
      item.totalItem,
      item.totalSold,
      item.remainingItem
   
     
    ];
  });
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/seller/${currentUserUid}/getProduct`);
        setData(response.data);
      } catch (error) {
       console.log(error)
      }
    };

    fetchData(); // Call fetchData when the component mounts
  }, [currentUserUid]); // Add currentUserUid to dependency array


  const updateStock = (e)=>{
    e.preventDefault()
    console.log("u[pdate")
  }
  return (
    <div>

      <TableComponent Heading={heading} Data={setlist} Action={true} UpdateStock={updateStock}/>
    </div>
  );
}

export default Inventory;
