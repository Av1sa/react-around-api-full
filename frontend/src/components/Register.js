import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password });
  };

  return (
    <div className="form" onSubmit={handleSubmit}>
      <form className="form__container">
        <h1 className="form__title">Sign up</h1>
        <input
          className="form__input"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form__input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="form__submit">
          Sign up
        </button>
        <Link className="form__link" to="/signin">
          Already a member? Log in here!
        </Link>
      </form>
    </div>
  );
}

export default Register;
