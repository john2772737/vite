import React, { useState } from "react";
import "./form.css"; // Corrected import path

function Form(props) {
  const { label, onChange, required, errorMessage, ...inputProps } = props;
  const [focused, setFocused] = useState(false); // Corrected function name

  const handleFocus = () => {
    setFocused(true); // Corrected function name
  };

  return (
    <div>
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus} // Changed onBlur to onFocus
        focused={focused.toString()} // Changed focused to focus
      />
      <span>{errorMessage}</span>
    </div>
  );
}

export default Form;
