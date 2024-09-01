import React, { useRef } from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList = (props) => {
  // console.log(props);
  const inputEle = useRef("");
  // const navigate = useNavigate();

  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };

  const contacts = Array.isArray(props.contacts) ? props.contacts : [];

  const renderContactList = contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        key={contact.id}
        clickHandler={deleteContactHandler} // Sending props to App.js
      />
    );
  });

  const getSearchTerm = () => {
    props.searchKeyword(inputEle.current.value);
  };

  return (
    <div className="main" style={{ marginTop: "4rem" }}>
      <h2>Contact List</h2>
      <div className="ui search">
        <div className="ui icon input" style={{ marginBottom: "1em" }}>
          <input
            ref={inputEle}
            type="text"
            placeholder="Search Contacts"
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <Link to="/add">
        <button className="ui button blue right">Add Contact</button>
      </Link>

      <div className="ui celled list">
        {renderContactList.length > 0
          ? renderContactList
          : "No Contacts Available"}
      </div>
    </div>
  );
};

export default ContactList;
