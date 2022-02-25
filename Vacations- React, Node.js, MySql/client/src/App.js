import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Add from './comps/Add';
import Edit from './comps/Edit';
import List from './comps/List';
import Login from './comps/Login';
import Register from './comps/Register';
import Header from './comps/Header';
import Reports from './comps/Reports';

export default function App() {
  const [update, setUpdate] = useState(true);
  const [searchInp, setSearchInp] = useState("");


  return <div className='app'>
    <Router>
      <Header searchInp={searchInp} setSearchInp={setSearchInp} setUpdate={setUpdate} update={update} />
      <Routes>
        <Route path="/" element={<List searchInp={searchInp} setUpdate={setUpdate} update={update} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<Add setUpdate={setUpdate} />} />
        <Route path="/edit/:id" element={<Edit setUpdate={setUpdate} />} />
        <Route path="/favorites" element={<List searchInp={searchInp} setUpdate={setUpdate} update={update} />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  </div>;
}
