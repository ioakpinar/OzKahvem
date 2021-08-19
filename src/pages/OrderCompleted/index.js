import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "./OrderCompleted.css";
import TimeContext from "../../contexts/TimeContext";

export default function OrderCompleted() {
  // const orderNo = useContext(TimeContext);

  const { oid, timeleft } = useParams();
  const [isDelivered, setIsDelivered] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // get timeleft from the link
  useEffect(() => {
    // saati al
    let h = Math.floor(timeleft / 3600);
    // dakika al
    let m = Math.floor((timeleft % 3600) / 60);
    // saniyeyi al
    let s = Math.floor((timeleft % 3600) % 60);

    // saati, dakikayı ve saniyeyi setliyoruz
    if (timeleft) {
      if (h > 0) {
        setHours(h);
      }
      if (m > 0) {
        setMinutes(m);
      }
      if (s > 0) {
        setSeconds(s);
      }
    }
  }, [timeleft]);

  useEffect(() => {
    if (timeleft) {
      let myInterval = setInterval(() => {
        // saatin işleyişi
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            if (hours === 0) {
              clearInterval(myInterval);
            } else {
              setHours(hours - 1);
              setMinutes(59);
              setSeconds(59);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
      return () => {
        clearInterval(myInterval);
      };
    }
  }, [hours, minutes, seconds]);

  useEffect(() => {
    // oid check

    let myInterval = setInterval(() => {
      // saatin işleyişi
      async function isDelivered() {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ oid: parseInt(oid) }),
        };
        const response = await fetch(
          "http://localhost:12345/isdelivered",
          requestOptions
        );
        const data = await response.json();
        console.log(data);
        if (data === true) {
          setIsDelivered(data);
          clearInterval(myInterval);
        }
      }
      isDelivered();
    }, 5000);
    return () => {
      clearInterval(myInterval);
    };
  }, [oid]);

  return (
    <>
      {timeleft ? (
        <div className="orderCompleted">
          <span className="left"></span>
          <span className="right"></span>

          <div className="orderCompleted__body">
            {!isDelivered && (hours !== 0 || minutes !== 0 || seconds !== 0) ? (
              <h2>Siparişiniz Alınmıştır.</h2>
            ) : (
              <h2>Siparişiniz Tamamlandı.</h2>
            )}
            {!isDelivered && (hours !== 0 || minutes !== 0 || seconds !== 0) ? (
              <h3>Tahmini Bekleme Süreniz</h3>
            ) : null}
            <div className="orderCompleted__timer">
              {isDelivered ||
              (hours === 0 && minutes === 0 && seconds === 0) ? (
                <Link to="/">
                  <button className="largeButton orderCompleted__button">
                    Anasayfaya Git
                  </button>
                </Link>
              ) : (
                <h1>
                  {hours < 10 ? `0${hours}` : hours}:
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </h1>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
