import React,{useRef} from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  console.log(props);
  const inputE1=useRef("");
  const deleteConactHandler = (id) => {
    props.getContactId(id);
  };
  const renderContactList = props.contacts.map((contact) => {
    return (

      <ContactCard
        contact={contact}
        clickHander={deleteConactHandler}
        key={contact.id}
      />
    );
  });

  const getSearchTerm=()=>{
    props.searchKeyword(inputE1.current.value)
  }
  return (
    <div className="main">
      <h2>Contact List
        <Link to="/add">
          <button className="ui primary right floated button">Add Contact</button>
        </Link>
      </h2>
      <div className="ui fluid icon input">
        <input ref={inputE1} type="text" placeholder="Search..." value={props.term} onChange={getSearchTerm}/>
        <i className="search icon"></i>
      </div>
      <div className="ui celled list">{renderContactList.length>0 ? renderContactList:"No contacts available"}</div>
    </div>
  );
};

export default ContactList;
