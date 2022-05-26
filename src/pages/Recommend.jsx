import React, { useEffect, useState } from "react";
import { getNearCars } from "../database";

function Recommend({ email }) {
  const [nearCars, setNearCars] = useState([]); // Cars array
  useEffect(() => {
    const fetchNearCars = async () => {
      const cars = await getNearCars(email);
      console.log(cars);

      setNearCars(cars);
    };
    if (email) {
      fetchNearCars();
    }
  }, [email]);
  return (
    <>
      <div className="container my-4">
        <h1>Personas que viven cerca también han comprado</h1>
        <div className="row">
          {nearCars.map((car) => {
            return (
              <div className="col-md-4 my-4">
                <div className="card" key={car.name}>
                  <div className="card-body">
                    <h5 className="card-title">{car.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {car.company} - {car.type}
                    </h6>
                    <p className="card-text">{car.country}</p>
                    <button className="btn btn-primary">Comprar</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="container my-4">
        <h1>Formulario de Recomendacion</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              En mi día a día suelo conducir
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {}}
            >
              <option value="">Selecciona uno</option>
              <option value="larga">
                Largas distancias, me muevo entre departamentos
              </option>
              <option value="corta">
                Distancias cortas, me mantengo en el mismo sector
              </option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Suelo movilizarme…</label>
            <select className="form-select" aria-label="Default select example">
              <option value="">Selecciona uno</option>
              <option value="familia">
                En familia, usamos todos un mismo vehículo
              </option>
              <option value="solo">Solo, no comparto mi auto</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Disposición económica</label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {}}
            >
              <option value="">Selecciona uno</option>
              <option value="high">Cuento con ahorros suficientes</option>
              <option value="medium">
                Tengo ahorros, pero pediría un extrafinanciamiento
              </option>
              <option value="low">
                Necesito un extrafinanciamiento completo
              </option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Al movilizarme en vehículo, prefiero…
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {}}
            >
              <option value="">Selecciona uno</option>
              <option value="comodidad">Comodidad antes que economía</option>
              <option value="economia">Economía antes que comodidad</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Mi auto para mi es…</label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {}}
            >
              <option value="">Selecciona uno</option>
              <option value="accesorio">
                El accesorio perfecto, habla de mi.
              </option>
              <option value="medio">Un medio de transporte.</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" onClick={(e) => {}}>
            Recomendar!
          </button>
        </form>
      </div>
    </>
  );
}

export default Recommend;
