import React, { useEffect, useState } from "react";
import ResponsiveTable from "../../components/tables";
import axios from "axios";
import ModalCom from "../../components/modal";
import '../../components/table.css'

import { Toaster, toast } from "react-hot-toast";
import Container from "react-bootstrap/Container"; 
function List_manager() {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);
  console.log(data)
  
  useEffect(() => {
    fetchData();
  }, []); // Fetch data only once when component mounts

  const fetchData = async (event) => {
    try {
      const response = await axios.get("http://localhost:4000/admin/listAdmin");
      setData(response.data);
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password:"",
    position: "",
    email: "",
    birthday: "",
    phoneNumber: "",
   
  });
  const [required, setRequired] = useState({
    name: false,
    username: false,

    position: false,
    email: false,
    birthday: false,
    phoneNumber: false,
 
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRequired(false);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
  

   
    let hasEmptyField = false;
   
     // Iterate over each field in the form data
    modalForm.forEach(field => {
        if (!formData[field.name]) {
            // If the field is empty, update the required state for that field
            setRequired(prevState => ({ ...prevState, [field.name]: true }));
            hasEmptyField = true;
        } else {
            // If the field is not empty, clear the required state for that field
            setRequired(prevState => ({ ...prevState, [field.name]: false }));
        }
    });
    
  
    if (hasEmptyField) {
      // Show error message for empty fields
      toast.error("Please fill in all required fields.");
      return;
    }
  
    try {
      await axios.post("http://localhost:4000/admin/createadmin", formData);
      console.log("Form data successfully submitted!");
      toast.success("Submitted successfully!");
      fetchData();
      handleModalClose();
      
    } catch (error) {
    
      if (error.response) {
        // Request was made and server responded with a status code
        const statusCode = error.response.status;
        if (statusCode === 409) {
          // If the error is due to a conflict (status 409)
          if (error.response.data.message === "Email already exists") {
            // If the error message indicates duplicate email
            toast.error("Email already exists. Please use a different email.");
          } else if (error.response.data.message === "Username already exists") {
            // If the error message indicates duplicate username
            toast.error("Username already exists. Please choose a different username.");
          } else {
            // If the error is not due to duplicate email or username, display generic error message
            console.error("Server responded with an error:", error.response.data);
            toast.error(`Server responded with an error: ${error.response.data.message}`);
          }
        } else {
          // If the error is not a conflict (status 409), display generic error message
          console.error("Server responded with an error:", error.response.data);
          toast.error(`Server responded with an error: ${error.response.data.message}`);
        }
      } else if (error.request) {
        // Request was made but no response was received
        console.error("No response received from server:", error.request);
        toast.error(
          "No response received from server. Please try again later."
        );
      } else {
        // Something else happened while setting up the request
        console.error(
          "An error occurred while sending the request:",
          error.message
        );
        toast.error("An error occurred. Please try again later.");
      }
    }
  };
  
  const setlist = data.map((item) => [
    item._id,
    item.name,
    item.username,
    item.password,
    item.email,
    item.birthday=item.birthday.replace("T00:00:00.000Z", " "),
    item.phoneNumber,
   


  ]);



  const tableHeading = [
    "id",
    "Name",
    "Username",
    "Password",
    "Email",
    "Birthday",
    "Phone Number",
  
  ];

  const [invalid, setInvalid] = useState({
    name: false,
    username: false,
    position: false,
    email: false,
    birthday: false,
    phoneNumber: false,
   
  });

  const errorHandling = (fieldName) => {
    const namePattern = /^[a-zA-Z\s]+$/; // Regular expression to allow only letters and spaces
    const usernamePattern = /^[a-zA-Z0-9_]{5,}$/;
    // Regular expression for username (letters, numbers, and underscore)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
    const phonePattern = /^\d{10}$/; // Regular expression for 10-digit phone number
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; // Regular expression for password (minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number)// Regular expression for date in yyyy-mm-dd format

    switch (fieldName) {
      case "name":
        if (!namePattern.test(formData.name)) {
          setInvalid((prevState) => ({ ...prevState, name: true })); // Update only the 'name' property of the invalid state
        } else {
          setInvalid((prevState) => ({ ...prevState, name: false }));
        }
        break;
      case "username":
        if (!usernamePattern.test(formData.username)) {
          setInvalid((prevState) => ({ ...prevState, username: true })); // Update only the 'username' property of the invalid state
        } else {
          setInvalid((prevState) => ({ ...prevState, username: false }));
        }
        break;
        case "password":
          if (!passwordPattern.test(formData.password)) {
              setInvalid((prevState) => ({ ...prevState, password: true }));
          } else {
              setInvalid((prevState) => ({ ...prevState, password: false }));
          }
          break;
      case "email":
        if (!emailPattern.test(formData.email)) {
          setInvalid((prevState) => ({ ...prevState, email: true })); // Update only the 'email' property of the invalid state
        } else {
          setInvalid((prevState) => ({ ...prevState, email: false }));
        }
        break;
      case "phoneNumber":
        if (!phonePattern.test(formData.phoneNumber)) {
          setInvalid((prevState) => ({ ...prevState, phoneNumber: true })); // Update only the 'phoneNumber' property of the invalid state
        } else {
          setInvalid((prevState) => ({ ...prevState, phoneNumber: false }));
        }
        break;
      case "birthday":
        if (!datePattern.test(formData.birthday)) {
          setInvalid((prevState) => ({ ...prevState, birthday: true })); // Update only the 'birthday' property of the invalid state
        } else {
          setInvalid((prevState) => ({ ...prevState, birthday: false }));
        }
        break;
       
      
      // Add cases for other fields if needed
      default:
        break;
    }
  };
  
  const modalForm = [
    {
      name: "name",
      controlId: "formName",
      type: "text",
      placeholder: "Enter name",
      onChange: handleInputChange,
      onBlur: () => errorHandling("name"),
      errortext: required.name ? "Name is required" : "Name must contain letters only",
      error: invalid.name || required.name,
    },
    {
      name: "username",
      controlId: "formUsername",
      type: "text",
      placeholder: "Enter username",
      onChange: handleInputChange,
      onBlur: () => errorHandling("username"),
      errortext: required.username ? "Username is required" : "Username must be 5 characters long",
      error: invalid.username || required.username,
    },
    {
      name: "password",
      controlId: "formPassword",
      type: "password",
      placeholder: "Enter password",
      onChange: handleInputChange,
      onBlur: () => errorHandling("password"),
      errortext: invalid.password ? "Invalid password" : "",
      error: invalid.password,
    },
    {
      name: "email",
      controlId: "formEmail",
      type: "email",
      placeholder: "Enter email",
      onChange: handleInputChange,
      onBlur: () => errorHandling("email"),
      errortext: invalid.email ? "Invalid email" : "",
      error: invalid.email,
    },
    {
      name: "birthday",
      controlId: "formBirthday",
      type: "date",
      placeholder: "Select birthday",
      onChange: handleInputChange,
      onBlur: () => errorHandling("birthday"),
      errortext: invalid.birthday ? "Invalid birthday" : "",
      error: invalid.birthday,
    },
    {
      name: "phoneNumber",
      controlId: "formPhoneNumber",
      type: "tel",
      placeholder: "Enter phone number",
      onChange: handleInputChange,
      onBlur: () => errorHandling("phoneNumber"),
      errortext: invalid.phoneNumber ? "Invalid phone number" : "",
      error: invalid.phoneNumber,
    },
    
  ];
  
  const handleActionClick = async (_id) => {
    console.log("Admin ID clicked:", _id);
    
    try {
       await axios.delete(`http://localhost:4000/admin/deleteAdmin/${_id}`);
      toast.success("Deleted Successfully")
      fetchData();
      // Optionally, you can update the UI or trigger a refetch of data if needed
    } catch (error) {
      console.error("Error deleting admin:", error);
      // Handle errors, show error message, or perform any other actions
    }
  };
  

  return (
    <Container fluid className="table-container">
      <div className="table-flex-container">
        {" "}
        {/* Add a wrapper with flex properties */}
        <Toaster />
        <button onClick={handleModalShow}>ADD</button>
        <ModalCom
          Title="Create Manager"
          body={modalForm}
          show={modalShow}
          onHide={handleModalClose}
          onSubmit={handleSubmit}
          onCancel={handleModalClose}
          
         
        />
        <ResponsiveTable heading={tableHeading} dataa={setlist} action={true}  onActionClick={handleActionClick} />
      </div>
    </Container>
  );
}

export default List_manager;
