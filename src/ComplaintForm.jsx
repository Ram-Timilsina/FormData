import React, { useState } from "react";
import { generateFormData } from "./generateFormData";

function ComplaintForm() {
  const [formValues, setFormValues] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    officerImage: null, // Corrected field name
    officerType: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormValues({
      ...formValues,
      [name]: files ? files[0] : value, // Handles both text and file inputs
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = generateFormData(formValues);

    // Prepare FormData for multipart/form-data
    // const formData = new FormData();
    // formData.append("firstName", formValues.firstName || "");
    // formData.append("middleName", formValues.middleName || "");
    // formData.append("lastName", formValues.lastName || "");
    // formData.append("contactNumber", formValues.contactNumber || "");
    // formData.append("email", formValues.email || "");
    // formData.append("officerType", formValues.officerType || "");
    // if (formValues.officerImage) {
    //   formData.append("officerImage", formValues.officerImage); // Corrected field name for image
    // }

    try {
      const response = await fetch("/api/OfficerInfo", {
        method: "POST",
        body: data,
      });

      console.log("Response status:", response.status); // Debugging log

      if (!response.ok) {
        const errorResponse = await response.text();
        console.error("Error Response from Server:", errorResponse); // Logs detailed server error
        throw new Error(
          `Server error: ${response.status} ${response.statusText}`
        );
      }

      const responseData = await response.json();

      if (responseData.success) {
        alert("Form submitted successfully!");
        console.log("Response Data:", responseData.data);
      } else {
        alert(
          `Submission failed: ${responseData.errorMessage || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error occurred during form submission:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Arial', sans-serif",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#333",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Officer Information Form
      </h2>
      <form onSubmit={handleSubmit}>
        {[
          { label: "First Name", name: "firstName", type: "text" },
          { label: "Middle Name", name: "middleName", type: "text" },
          { label: "Last Name", name: "lastName", type: "text" },
          {
            label: "Contact Number",
            name: "contactNumber",
            type: "tel",
            placeholder: "e.g., 123-456-7890",
          },
          {
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "e.g., example@example.com",
          },
          {
            label: "Officer Type",
            name: "officerType",
            type: "number",
            placeholder: "Enter the type",
          },
        ].map(({ label, name, type, placeholder }) => (
          <div style={{ marginBottom: "15px" }} key={name}>
            <label
              htmlFor={name}
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
                color: "#555",
              }}
            >
              {label}
            </label>
            <input
              id={name}
              type={type}
              name={name}
              placeholder={placeholder || ""}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "14px",
              }}
            />
          </div>
        ))}
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="officerImage"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "black",
            }}
          >
            Upload Officer Image
          </label>
          <input
            id="officerImage"
            type="file"
            name="officerImage"
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "14px",
              color: "black",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ComplaintForm;
