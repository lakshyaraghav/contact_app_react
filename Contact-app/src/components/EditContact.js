
import React from 'react'
import { useState } from "react";
import { Link, Routes, Route, useNavigate,useLocation } from 'react-router-dom';


export default function EditContact({ updateContactHandler }) {

  const location=useLocation();
  console.log(location.state.contact)
  const {id,name,email}=location.state.contact;
  const [contactInfo, setContactInfo] = useState({
    id,
    name,
    email,
  });

  const handleChange = (event) => {
    setContactInfo({ ...contactInfo, [event.target.name]: event.target.value });

  };

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();
    // console.log(contactInfo);
    if (contactInfo.name === "" || contactInfo.email === "") {
      alert("ALl the fields are mandatory!");
      return;
    }
    updateContactHandler(contactInfo);
    setContactInfo({ name: "", email: "" });
    navigate('/');
  };

  return (


    <div className="ui main">
      <h3>Contact Form</h3>
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={contactInfo.name}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={contactInfo.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <button className="ui button blue" type='submit'>Update</button>
        </div>
        {/* <Link to="/userlist">User List</Link> */}
      </form>
    </div>

  )
}



