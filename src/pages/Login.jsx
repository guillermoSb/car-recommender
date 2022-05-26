import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../database";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ok, setOk] = useState(true);

  const navigate = useNavigate();

  const submitLogin = async () => {
    const result = await loginUser(email, password); // Login
    setOk(result);
    if (result) {
      onLogin(result);
      navigate("/recommend");
    }
  };

  return (
    <div className="container my-4">
      {!ok ? (
        <div className="alert alert-danger" role="alert">
          Error al crear tu cuenta.
        </div>
      ) : (
        ""
      )}
      <h1>Login</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            submitLogin();
          }}
          disabled={!password || !email}
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;
