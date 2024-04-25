import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import Form from '../../components/form'; // Assuming this is a custom form component you've created
import form from '../../components/form';
import './create_manager.css';

function CreateManager() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    position: '',
    email: '',
    birthday: '',
    phoneNumber: '',
    photo: null
  });

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Name",
      label: "Name",
      errorMessage: "Please enter a valid name.",
      pattern: "^[A-Za-z]+$", // Only letters allowed
      required: true,
    },
    {
      id: 2,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      errorMessage: "Please enter a valid username.",
      pattern: "^[a-zA-Z0-9]+$", // Alphanumeric characters only
      required: true,
    },
    {
      id: 3,
      name: "position",
      type: "text",
      placeholder: "Position",
      label: "Position",
      errorMessage: "Please enter a valid position.",
      required: true,
    },
    {
      id: 4,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      errorMessage: "Please enter a valid email address.",
      pattern: "^\\S+@\\S+\\.\\S+$", // Email format
      required: true,
    },
    {
      id: 5,
      name: "birthday",
      type: "date",
      label: "Birthday",
      errorMessage: "Please enter a valid date.",
      required: true,
    },
    {
      id: 6,
      name: "phoneNumber",
      type: "tel",
      placeholder: "Phone Number",
      label: "Phone Number",
      errorMessage: "Please enter a valid phone number.",
      pattern: "^[0-9]{10}$", // 10-digit phone number pattern
      required: true,
    },
    {
      id: 7,
      name: "photo",
      type: "file",
      label: "Photo",
      errorMessage: "Please upload a valid photo.",
      required: true,
    }
  ];
  
  
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
    console.log(form)
  };
console.log(formData);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
      // Check if any required fields are empty
  const emptyFields = inputs.filter(input => input.required && !formData[input.name]);

  if (emptyFields.length > 0) {
    // Display error message for empty fields
    toast.error('Please fill in all required fields.');
    return; // Prevent further execution of the function
  }


    try {
      await axios.post("http://localhost:4000/admin/createadmin", formData);
      console.log("Form data successfully submitted!");
      toast.success('Submitted successfully!');
    } catch (error) {
      if (error.response) {
        // Request was made and server responded with a status code that falls out of the range of 2xx
        console.error("Server responded with an error:", error.response.data);
        toast.error(`Server responded with an error: ${error.response.data}`);
      } else if (error.request) {
        // Request was made but no response was received
        console.error("No response received from server:", error.request);
        toast.error("No response received from server. Please try again later.");
      } else {
        // Something else happened while setting up the request
        console.error("An error occurred while sending the request:", error.message);
        toast.error("An error occurred. Please try again later.");
      }
    }
  };
  
  return (
    <div>
      <Container className="container-box"> {/* Container box */}
      <Toaster />
      
      <form onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <Form 
            
            key={input.id} 
            {...input}
            value={formData[input.name]} 
            onChange={handleInputChange} 
            
          />
          
        ))}
        <button type="submit">Submit</button>
      </form>
      </Container>
    </div>
  );
}

export default CreateManager;
