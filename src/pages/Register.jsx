import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../database";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();
  const [ok, setOk] = useState(true);

  const submitUserInfo = async () => {
    try {
      const ok = await createUser(name, email, password, age, location);
      if (ok) {
        navigate("/login");
        setOk(true);
      } else {
        setOk(false);
      }
    } catch (error) {}
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

      <h1>Crea tu cuenta</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="nameInput" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Edad
          </label>
          <input
            type="number"
            min={0}
            className="form-control"
            id="age"
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Departamento donde vives
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          >
            <option value="">Selecciona uno</option>
            <option value="Alta Verapaz">Alta Verapaz</option>
            <option value="Baja Verapaz">Baja Verapaz</option>
            <option value="Chimaltenago">Chimaltenago</option>
            <option value="Chiquimula">Chiquimula</option>
            <option value="Guatemala">Guatemala</option>
            <option value="El Progreso">El Progreso</option>
            <option value="Escuintla">Escuintla</option>
            <option value="Huehuetenango">Huehuetenango</option>
            <option value="Izabal">Izabal</option>
            <option value="Jalapa">Jalapa</option>
            <option value="Jutiapa">Jutiapa</option>
            <option value="Petén">Petén</option>
            <option value="Quetzaltenango">Quetzaltenango</option>
            <option value="Quiché">Quiché</option>
            <option value="Retalhuleu">Retalhuleu</option>
            <option value="Sacatepequez">Sacatepequez</option>
            <option value="San Marcos">San Marcos</option>
            <option value="Santa Rosa">Santa Rosa</option>
            <option value="Sololá">Sololá</option>
            <option value="Suchitepequez">Suchitepequez</option>
            <option value="Totonicapán">Totonicapán</option>
            <option value="Zacapa">Zacapa</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={!name || !location || !password || !email || !age}
          onClick={(e) => {
            e.preventDefault();

            submitUserInfo();
          }}
        >
          Crear Cuenta
        </button>
      </form>
    </div>
  );
}

export default Register;
