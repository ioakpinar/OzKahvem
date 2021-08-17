import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./OrderCompleted.css";
import TimeContext from "../../contexts/TimeContext";

export default function OrderCompleted() {
  const time = useContext(TimeContext);
  const [minutes, setMinutes] = useState(time);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div className="orderCompleted">
      <span className="left"></span>
      <span className="right"></span>
      <div className="orderCompleted__body">
        {minutes !== 0 || seconds !== 0 ? (
          <h2>Siparişiniz Alınmıştır.</h2>
        ) : (
          <h2>Siparişiniz Tamamlandı.</h2>
        )}
        {minutes !== 0 || seconds !== 0 ? (
          <h3>Tahmini Bekleme Süreniz</h3>
        ) : null}
        <div className="orderCompleted__timer">
          {minutes === 0 && seconds === 0 ? (
            <Link to="/">
              <button className="largeButton orderCompleted__button">
                Anasayfaya Git
              </button>
            </Link>
          ) : (
            <h1>
              {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}
