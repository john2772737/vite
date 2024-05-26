import TableComponent from "../../components/tableComponent";
import axios from "axios";
import { useFirebase } from "../../utils/context";
import { useState, useEffect } from "react";

import {toast,Toaster} from 'react-hot-toast'

function ProductIncome() {
  const heading = [
    "Id",
    "Name",
    "Image",
    "Total Sold",
    "Total Income",
  ];
  const { currentUser } = useFirebase();
  const currentUserUid = currentUser.uid;

  const [data, setData] = useState([]);


  
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/seller/${currentUserUid}/getProduct`
      );
      console.log('Response data:', response.data);
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentUserUid]);


 

  
  

  if (data.length === 0) {
    return <h1>No Products Available</h1>;
  }

  const setlist = data.map((item) => {
    const picture = (
      <img
        src={item.imageUrl}
        alt="Description of the image"
        style={{ width: "100px", height: "100px" }}
      />
    );

    return [
      item._id,
      item.name,
      picture,
      item.totalSold,
      item.totalIncome,
    ];
  });



  return (
    <div>
 
      <TableComponent
        Heading={heading}
        Data={setlist}
   
      />
    </div>
  );
}

export default ProductIncome;
