import React from "react";
import user from "../images/Praneeth passport photo.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ContactDetail = () => {
  const location = useLocation(); // Accessing the passed state from Contact Card
  const { contact } = location.state; // Destructuring the contact from state
  const navigate = useNavigate();

  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image" style={{ marginTop: "2.5em" }}>
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{contact.name}</div>
          <div className="description">{contact.email}</div>
        </div>
        <div className="center-div">
          <Link to="/">
            <button
              type="button"
              className="ui button green"
              //   onClick={() => navigate(-1)} // Not a good approach for button navigation, used for programmatic navigation
            >
              Go Back To Contact List
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
