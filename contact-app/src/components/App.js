import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Header from "./Header";
import api from "../api/contacts";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Retrieve Contacts
  const retrieveContacts = async () => {
    try {
      const response = await api.get("/contacts");
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error retrieving contacts: ", error);
      throw error;
    }
  };

  // Retrieving the contact details
  useEffect(() => {
    //   const retrieveContacts = JSON.parse(
    //     localStorage.getItem(LOCAL_STORAGE_KEY)
    //   );
    //   if (retrieveContacts?.length) {
    //     setContacts(retrieveContacts);
    //   }

    const getAllContacts = async () => {
      try {
        const allContacts = await retrieveContacts();
        if (allContacts?.length) {
          setContacts(allContacts);
        }
      } catch (error) {
        console.error("Error fetching contacts: ", error);
        throw error;
      }
    };
    getAllContacts();
  }, []);

  // Adding Contacts

  const addContactHandler = async (contact) => {
    try {
      // console.log(contact);
      const request = {
        id: uuid(),
        ...contact,
      };

      const response = await api.post("/contacts", request);
      // console.log(response);
      setContacts([...contacts, response.data]); // Adding new contact to previous contacts using spread operator
    } catch (error) {
      console.error("Error Adding Contact", error);
      throw error;
    }
  };

  // Editing Contacts

  const editContactHandler = async (contact) => {
    try {
      const response = await api.put(`/contacts/${contact.id}`, contact);
      // console.log(response.data);
      const { id, name, email } = response.data;
      setContacts(
        contacts.map((contact) => (contact.id === id ? response.data : contact))
      );
    } catch (error) {
      console.error("Error Updating Details", error);
    }
  };

  // Deleting Contacts

  const deleteContactHandler = async (id) => {
    try {
      await api.delete(`/contacts/${id}`);
      const newContacts = contacts.filter((contact) => contact.id !== id);
      // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newContacts));
      setContacts(newContacts);
    } catch (error) {
      console.error("Error Deleting Contact :", error);
    }
  };

  // Searching through Contacts

  const searchHandler = (searchTerm) => {
    // console.log(searchTerm);
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  // Setting the contact details to Local Storage
  // useEffect(() => {
  // if (contacts?.length) {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  // }
  // }, [contacts]);

  return (
    <div className="ui container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <ContactList
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                getContactId={deleteContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            }
          />
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />
          <Route path="/contact/:id" element={<ContactDetail />} />
          <Route
            path="/edit/:id"
            element={<EditContact editContactHandler={editContactHandler} />}
          />
          {/* <Route
            path="/delete/:id"
            element={
              <DeleteContact deleteContactHandler={deleteContactHandler} />
            }
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
