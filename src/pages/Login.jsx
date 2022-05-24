import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="container my-4">
      <h1>Crea tu cuenta</h1>
      <form>
        <div class="mb-3">
          <label for="nameInput" class="form-label">
            Nombre
          </label>
          <input type="text" class="form-control" id="nameInput" />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">
            Correo
          </label>
          <input type="email" class="form-control" id="email" />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">
            Contraseña
          </label>
          <input type="password" class="form-control" id="password" />
        </div>
        <button type="submit" class="btn btn-primary">
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;
