import React, { useEffect, useState } from "react";
import { buyCar, getNearCars, recommendCars } from "../database";

function Recommend({ email }) {
  const [nearCars, setNearCars] = useState([]); // Cars array
  const [recomendedCars, setRecomendedCars] = useState([]); // Recommended cars array
  const [distance, setDistance] = useState("");
  const [capacity, setCapacity] = useState("");
  const [economy, setEconomy] = useState("");
  const [preference, setPreference] = useState("");
  const [meaning, setMeaning] = useState("");
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

  const runRecommendation = async () => {
    const result = await recommendCars(
      email,
      distance,
      capacity,
      economy,
      preference,
      meaning
    );
    setRecomendedCars(result);
  };
  const sendBuyRequest = async (id) => {
    const result = await buyCar(email, id);
  };
  return (
    <>
      <div className="container my-4">
        <h1>Personas que viven cerca también han comprado</h1>
        <div className="row">
          {nearCars.map((car) => {
            return (
              <div className="col-md-4 my-4" key={car.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{car.name} </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {car.company} - {car.type}
                    </h6>
                    <p className="card-text">{car.country}</p>
                    <p className="card-text">{car.year}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        sendBuyRequest(car.id);
                      }}
                    >
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {recomendedCars.length > 0 ? (
        <div className="container my-4">
          <h1>Resultados</h1>
          <div className="row">
            {recomendedCars.map((car) => {
              return (
                <div className="col-md-4 my-4" key={car.id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{car.name} </h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {car.company} - {car.type}
                      </h6>
                      <p className="card-text">{car.country}</p>
                      <p className="card-text">{car.year}</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          sendBuyRequest(car.id);
                        }}
                      >
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}

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
              onChange={(e) => {
                setDistance(e.target.value);
              }}
            >
              <option value="">Selecciona uno</option>
              <option value="LONG">
                Largas distancias, me muevo entre departamentos
              </option>
              <option value="SHORT">
                Distancias cortas, me mantengo en el mismo sector
              </option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Suelo movilizarme…</label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                setCapacity(e.target.value);
              }}
            >
              <option value="">Selecciona uno</option>
              <option value="FAMILIA">
                En familia, usamos todos un mismo vehículo
              </option>
              <option value="INDIVIDUAL">Solo, no comparto mi auto</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Disposición económica</label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                setEconomy(e.target.value);
              }}
            >
              <option value="">Selecciona uno</option>
              <option value="ALTA">Cuento con ahorros suficientes</option>
              <option value="MEDIA">
                Tengo ahorros, pero pediría un extrafinanciamiento
              </option>
              <option value="BAJA">
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
              onChange={(e) => {
                setPreference(e.target.value);
              }}
            >
              <option value="">Selecciona uno</option>
              <option value="BAJA">Comodidad antes que economía</option>
              <option value="MEDIA">Economía antes que comodidad</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Mi auto para mi es…</label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                setMeaning(e.target.value);
              }}
            >
              <option value="">Selecciona uno</option>
              <option value="Luxy">El accesorio perfecto, habla de mi.</option>
              <option value="Standar">Un medio de transporte.</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              console.log(distance, capacity, economy, preference, meaning);
              runRecommendation();
            }}
          >
            Recomendar!
          </button>
        </form>
      </div>
    </>
  );
}

export default Recommend;
