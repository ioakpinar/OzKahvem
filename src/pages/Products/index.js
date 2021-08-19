import { useState, useEffect } from "react";
import Card from "../../components/Card";
import "./Products.css";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useFetch } from "../../hooks/useFetch";
import { Link, useHistory } from "react-router-dom";
import { useTime } from "../../hooks/useTime";

export default function Products() {
  // Kahveler Sayfası
  const history = useHistory();
  const { coffies } = useFetch();

  const [value, setValue] = useState("");

  const [seconds, setSeconds] = useState();

  function getOrderTime() {
    // first
    async function fetchData() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oid: parseInt(value) }),
      };
      const response = await fetch(
        "http://localhost:12345/gettime",
        requestOptions
      );
      const data = await response.json();
      setSeconds(data);
      let oid = data.oid;
      let timeleft = data.timeleft;
      history.push(`/order-completed/${oid}/${timeleft}`);
    }
    fetchData();
    // second
  }

  return (
    <>
      <Navbar />
      <>
        <div className="products__orderNo container">
          {seconds ? <h2> ${seconds}</h2> : null}
          <input
            type="text"
            placeholder="Sipariş No'yu Giriniz"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Link to="/order-completed">
            <button
              type="submit"
              className="largeButton"
              onClick={getOrderTime}
              disabled={!value}
            >
              Ara
            </button>
          </Link>
        </div>
        <div className="products container">
          {/* Kahve bilgileri data.json dosyası içerisinden alınmaktadır. */}
          {coffies.map(({ id, name, description, image, time }) => (
            <Card
              key={id}
              name={name}
              description={description}
              image={image}
              cardId={id}
              time={time}
            />
          ))}
        </div>
      </>
      <Footer />
    </>
  );
}

// localhost:3000/products
