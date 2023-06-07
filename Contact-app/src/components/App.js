import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";
import api from "../api/contacts";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ??
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //function of get data through api
  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }

  //Contact add operations
  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: uuid(),
      ...contact
    }

    const response = await api.post("/contacts", request)
    console.log(response);
    setContacts([...contacts, response.data]);//just add {id:uuid(),...contact} place of response.data for add in local storage
  };

  //editcontact operations
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    console.log(contact);
    console.log(response.data)
    const { id, } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    )
  };

  //delete operations using both api and local storage
  const removeContactHandler = async (id) => {
    // alert("Are you sure you want to delete")
    if (window.confirm("Are u want to delete") === true) {
      await api.delete(`/contacts/${id}`);
      const newContactList = contacts.filter((contact) => {
        return contact.id !== id;
      });
      setContacts(newContactList);

    }

  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    }
    else {
      setSearchResults(contacts)
    }
  }

  //get and set contact data in api
  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) setContacts(retriveContacts);
    const getAllContacts = async () => {
      const allContacts = await retriveContacts();
      if (allContacts) setContacts(allContacts);
    }

    getAllContacts();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">

      <Router>
        <Header />
        {/* <Routes>
          <Route path="/" exact render={(props) => (
            <ContactList {...props} contacts={contacts} getContactId={removeContactHandler} />
          )} />

          <Route path="/add" render={(props)=>(
            <AddContact {...props} addContactHandler={addContactHandler} />
          )} />
        </Routes> */}
        <Routes>
          <Route path="/" element={<ContactList contacts={searchTerm.length < 1 ? contacts : searchResults} getContactId={removeContactHandler} term={searchTerm} searchKeyword={searchHandler} />} />
          <Route path="/add" element={<AddContact addContactHandler={addContactHandler} />} />
          <Route path="/edit" element={<EditContact updateContactHandler={updateContactHandler} />} />
          <Route path="/contact/:id" element={<ContactDetail />} />
        </Routes>
      </Router>
      {/* <Header />
      <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
    </div>
  );
}

export default App;
