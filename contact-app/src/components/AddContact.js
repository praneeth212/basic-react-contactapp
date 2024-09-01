import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddContact = ({ addContactHandler }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const add = (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      alert("All the fields are mandatory!!");
      return;
    }
    addContactHandler({ name, email }); // passing function as a prop from child to parent(App.js)
    setName("");
    setEmail("");
    // console.log(this.state); // Getting name and email as object
    navigate("/");
  };

  return (
    <div className="ui main" style={{ marginTop: "4rem" }}>
      <h2>Add Contact</h2>
      <form className="ui form" onSubmit={add}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="ui button blue right">
          Add
        </button>
        <button
          type="button"
          className="ui button green"
          onClick={() => navigate(-1)}
        >
          Go Back to Contact List
        </button>
      </form>
    </div>
  );
};

export default AddContact;
