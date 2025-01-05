import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./viewForm.css";

const ViewForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/forms/${id}`);
        // console.log("Form data:", response.data);

        setForm(response.data.form);
      } catch (error) {
        console.error("Error fetching form:", error);
      }
    };

    fetchForm();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    for (const key in formData) {
      if (!formData[key].trim()) {
        alert(`${key} is required.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responses = form.inputs.map(input => formData[input.title] || "");

    if (validateForm()) {
      try {
        //   console.log(formData);
        await axios.post(`http://localhost:5000/forms/${id}/submit`, { id: id, response: responses});
        setSubmitted(true);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  if (!form || !form.inputs) {
    return <div>Form Not Found Or Deleted</div>;
  }

  return (
    <div className="view-form-container">
      <h2>{form.title}</h2>
      <form onSubmit={handleSubmit}>
        {form.inputs.map((input, index) => (
          <div key={index} className="input-container">
            <label>{input.title}</label>
            <input
              type={input.type}
              name={input.title}
              value={formData[input.title] || ""}
              onChange={handleInputChange}
              placeholder={input.placeholder}
              required
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      {submitted && <p>Thank You for Submitting the Form!</p>}
    </div>
  );
};

export default ViewForm;
