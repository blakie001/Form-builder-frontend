import React, { useEffect, useState } from "react";
import "./homepage.css";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await axios.get("https://form-builder-9kbm.onrender.com/forms/");
        setForms(res.data.allForms);
      } catch (error) {
        console.log(error);
      }
    };
    fetchForms();
  }, []);

  const handleDelete = async(id) =>{
    try {      
      await axios.delete(`https://form-builder-9kbm.onrender.com/forms/${id}/delete`);

      setForms(forms.filter(form => form._id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="home-container">
      <header className="header">
        <h1>Welcome to Form.com</h1>
        <p>This is a simple form builder App</p>
        <Link className="create-button" to={"/forms/create"}>CREATE NEW FORM</Link>
      </header>
      <main className="content">
        <h2>Your Forms</h2>
        {forms.length > 0 ? (
          <div className="forms-container">
            {forms.map((form) => (
              <div className="form-card" key={form._id}>
                <h3>{form.title}</h3>
                <div className="form-actions">
                  <Link className="view-button" to={`/${form._id}`}>VIEW</Link>
                  <Link className="edit-button" to={`/${form._id}/edit`}>EDIT</Link>
                  <Link className="delete-button" onClick={() => handleDelete(form._id)}>DELETE</Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-forms-message">You have no forms created yet.</p>
        )}
      </main>
    </div>
  );
};

export default HomePage;
