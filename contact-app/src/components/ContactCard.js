import React from "react";
import user from "../images/user.png";
import { Link } from "react-router-dom";

const ContactCard = (props) => {
  // Taking props from parent App.js
  const { id, name, email } = props.contact;

  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user" />
      <div className="content">
        {/* Link makes the particular contact clickable anchor tag and goes to specified url */}
        {/* This is sending contact as an obj to contact details component */}
        <Link to={`/contact/${id}`} state={{ contact: props.contact }}>
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
      </div>

      {/* <Link to={`/delete/${id}`}> */}
      <i
        className="trash alternate outline icon right floated"
        style={{ color: "red", marginTop: "10px", marginLeft: "5px" }}
        onClick={() => props.clickHandler(id)} // Sending props to parent App.js
      ></i>
      <Link to={`/edit/${id}`} state={{ contact: props.contact }}>
        <i
          className="edit alternate outline icon right floated"
          style={{ color: "blue", marginTop: "10px" }}
        ></i>
      </Link>

      {/* </Link> */}
    </div>
  );
};

export default ContactCard;
