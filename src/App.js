import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage/Homepage.js';
import CreateForm from './pages/createForm/createForm.js';
import ViewForm from './pages/viewForm/viewForm.js';
import EditForm from './pages/editForm/editForm.js';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/forms/create" element={<CreateForm />} />
          <Route path="/:id" element={<ViewForm />} />
          <Route path="/:id/edit" element={<EditForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;