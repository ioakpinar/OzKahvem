import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import "./Card2.css";

export default function Card({ name, description, image, cardId, time }) {
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState();
  const [display, setDisplay] = useState(false);

  const getOrder = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ CoffieName: name, CoffieSize: size }),
    };
    const response = await fetch(
      "http://localhost:12345/getorder",
      requestOptions
    );
    const data = await response.json();
  };

  const handleClick = (e) => {
    // Kart üzerinde boy seçiminde kullanılan radio butonlardan birine tıklandığında seçilen boya göre fiyat bilgisinin alınması.
    let price = e.target.id;

    if (price) {
      setDisplay(true); // Radio butona tıklandığında animasyonun etkinleştirilmesi.
    }

    if (price === "small") {
      setPrice(10);
      setSize("small");
    }
    if (price === "medium") {
      setPrice(20);
      setSize("medium");
    }
    if (price === "large") {
      setPrice(30);
      setSize("large");
    }
  };

  return (
    <>
      {!display ? (
        <div className="card">
          <img src={image} alt="" />
          <div className="card__content">
            <div className={`card__price${display ? " display" : ""}`}>
              {/* Radio butona tıklandığında fiyat bilgisinin gösterilmesi. */}
              <div>
                <p>{price}₺</p>
              </div>
            </div>
            <div className="card__top">
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
            <div className="card__bottom">
              <div className="card__sizes">
                <div className="small">
                  <input
                    type="radio"
                    name={`size${cardId}`}
                    id="small"
                    onClick={handleClick}
                  />
                  <div className="card__desc">
                    <p>Küçük Boy</p>
                    <span></span>
                  </div>
                </div>
                <div className="medium">
                  <input
                    type="radio"
                    name={`size${cardId}`}
                    id="medium"
                    onClick={handleClick}
                  />
                  <div className="card__desc">
                    <p>Orta Boy</p>
                    <span></span>
                  </div>
                </div>
                <div className="large">
                  <input
                    type="radio"
                    name={`size${cardId}`}
                    id="large"
                    onClick={handleClick}
                  />
                  <div className="card__desc">
                    <p>Büyük Boy</p>
                    <span></span>
                  </div>
                </div>
              </div>
              <Link to="/order-completed">
                <button
                  className={`card__button largeButton${
                    // Tıklanmaya göre butonun gösterilmesi.
                    display ? " display" : ""
                  }`}
                >
                  Satın Al
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="card">
          <img src={image} alt="" />
          <div className="card__content">
            <div className="card__price2">
              {/* Radio butona tıklandığında fiyat bilgisinin gösterilmesi. */}
              <div>
                <p>{price}₺</p>
              </div>
            </div>
            <div className="card__top">
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
            <div className="card__bottom2">
              <div className="card__sizes">
                <div className="small">
                  <input
                    type="radio"
                    name={`size${cardId}`}
                    id="small"
                    onClick={handleClick}
                  />
                  <div className="card__desc">
                    <p>Küçük Boy</p>
                    <span></span>
                  </div>
                </div>
                <div className="medium">
                  <input
                    type="radio"
                    name={`size${cardId}`}
                    id="medium"
                    onClick={handleClick}
                  />
                  <div className="card__desc">
                    <p>Orta Boy</p>
                    <span></span>
                  </div>
                </div>
                <div className="large">
                  <input
                    type="radio"
                    name={`size${cardId}`}
                    id="large"
                    onClick={handleClick}
                  />
                  <div className="card__desc">
                    <p>Büyük Boy</p>
                    <span></span>
                  </div>
                </div>
              </div>
              <Link to="/order-completed">
                <button
                  className="card__button2 largeButton"
                  onClick={getOrder}
                >
                  Satın Al
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
