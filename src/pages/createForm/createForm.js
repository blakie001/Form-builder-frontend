import React, { useState } from "react";
import "./createForm.css";
import axios from "axios";

const CreateForm = () => {
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [editingTitle, setEditingTitle] = useState(false);
  const [showInputTypes, setShowInputTypes] = useState(false);
  const [formInputs, setFormInputs] = useState([]);
  const [selectedInput, setSelectedInput] = useState(null);

  const addInput = (type) => {
    if (!type) return;
    setFormInputs([...formInputs, { type, title: "", placeholder: "" }]);
    setShowInputTypes(false);
  };


  const handleInputChange = (index, field, value) => {
    const updatedInputs = [...formInputs];
    updatedInputs[index][field] = value;
    setFormInputs(updatedInputs);
    if (selectedInput === index) {
      setSelectedInput(index);
    }
  };

  const handleInputClick = (index) => {
    setSelectedInput(index);
  };

  const deleteInput = (index) => {
    const updatedInputs = formInputs.filter((_, i) => i !== index);
    setFormInputs(updatedInputs);
    setSelectedInput(null);
  };

  const handleSubmit = async()=>{
    if(formInputs.length === 0) {
        alert("Please Add Inputs");
        return;
    }
    // console.log("this is form ttle",{ title: formTitle, input: formInputs })

    try {
        await axios.post("http://localhost:5000/forms/create", { title: formTitle, inputs: formInputs });
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className="create-form-container">
      <h2>Create New Form</h2>
      <div className="form-grid">
        <div>
          {editingTitle ? (
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              onBlur={() => setEditingTitle(false)}
              autoFocus
              className="form-title-input"
            />
          ) : (
            <div className="form-title">
              {formTitle}{" "}
              <button
                onClick={() => setEditingTitle(true)}
                className="edit-title-button"
              >
                ✏️
              </button>
            </div>
          )}
          {showInputTypes ? (
            <>
            <div className="add-input-button-container">
                <button
                  onClick={() => setShowInputTypes(false)}
                  className="close-input-button"
                >
                  CLOSE ADD INPUT
                </button>
                </div>
              <div className="input-types-container">
                <button className="input-type-button" onClick={() => addInput("text")}>TEXT</button>
                <button className="input-type-button" onClick={() => addInput("number")}>NUMBER</button>
                <button className="input-type-button" onClick={() => addInput("email")}>EMAIL</button>
                <button className="input-type-button" onClick={() => addInput("password")}>PASSWORD</button>
                <button className="input-type-button" onClick={() => addInput("date")}>DATE</button>
              </div>
            </>
          ) : (
            <button onClick={() => setShowInputTypes(true)} className="add-input-button">ADD INPUT</button>
          )}

          <div className="dynamic-inputs-container">
            {formInputs.map((input, index) => (
              <div key={index} className="dynamic-input" onClick={() => handleInputClick(index)}>
                <label>{input.title || input.type.toUpperCase()}</label>
                <input type={input.type} placeholder={input.placeholder} />
                <button className="edit-input-button">✏️</button>
                <button className="delete-input-button" onClick={() => deleteInput(index)}>🗑️</button>
              </div>
            ))}
          </div>
          <button className="submit-button" onClick={handleSubmit}>SUBMIT</button>
        </div>

        {/* Form Editor */}
        <div>
        <h3 className="form-editor-title">Form Editor</h3>
        {selectedInput !== null && formInputs[selectedInput] && (
            <div>
            <label className="form-editor-label">Title</label>
            <input
                type="text"
                value={formInputs[selectedInput].title}
                onChange={(e) =>
                handleInputChange(selectedInput, "title", e.target.value)
                }
                className="form-editor-input"
            />
            <label className="form-editor-label">Placeholder</label>
            <input
                type="text"
                value={formInputs[selectedInput].placeholder}
                onChange={(e) =>
                handleInputChange(selectedInput, "placeholder", e.target.value)
                }
                className="form-editor-input"
            />
            </div>
        )}
        </div>

      </div>

      <button className="create-form-button" onClick={handleSubmit}>CREATE FORM</button>

    </div>
  );
};

export default CreateForm;