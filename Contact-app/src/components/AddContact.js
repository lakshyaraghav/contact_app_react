// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
// class AddContact extends React.Component {
//   state = {
//     name: "",
//     email: "",
//   };

//   add = (e) => {
//     e.preventDefault();
//     if (this.state.name === "" || this.state.email === "") {
//       alert("ALl the fields are mandatory!");
//       return;
//     }
//     this.props.addContactHandler(this.state);
//     this.setState({ name: "", email: "" });
//     // this.props.history.push("/");
//     console.log(this.props);
//   };
//   render() {
//     return (
//       <div className="ui main">
//         <h2>Add Contact</h2>
//         <form className="ui form" onSubmit={this.add}>
//           <div className="field">
//             <label>Name</label>
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               value={this.state.name}
//               onChange={(e) => this.setState({ name: e.target.value })}
//             />
//           </div>
//           <div className="field">
//             <label>Email</label>
//             <input
//               type="text"
//               name="email"
//               placeholder="Email"
//               value={this.state.email}
//               onChange={(e) => this.setState({ email: e.target.value })}
//             />
//           </div>
//           <button className="ui button blue">Add Contact</button>
//         </form>
//       </div>
//     );
//   }
// }

// export default AddContact;

import React from 'react'
import { useState } from "react";
import { Link, Routes, Route, useNavigate } from 'react-router-dom';


export default function AddContact({ addContactHandler }) {

  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
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
    addContactHandler(contactInfo);
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
          <button className="ui button blue" type='submit'>Submit Contact</button>
        </div>
        {/* <Link to="/userlist">User List</Link> */}
      </form>
    </div>

  )
}



