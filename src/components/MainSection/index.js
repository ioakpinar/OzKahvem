import "./MainSection.css";
import { Link } from "react-router-dom";

export default function MainSection() { // Ana Sayfa bölümü
    return (
      <div className="main container">
        <div className="main__left"> {/* Anasayfa içerisinde yer alan yazılara ait kısım */}
          <h1>
            <span>Öz Kahvem</span> <br />
            Kahvenin Özü
          </h1>
          <p className="headlineBody">
            Dünyanın dört bir yanından topladığımız kahve çekirdeklerini sizin
            için öğütüyor, usta ellerden çıkmış formüller ile siz gelmeden
            hazırlıyoruz.
          </p>
          <Link to="./products">
            <button className="main__button largeButton">Sipariş Ver</button>
          </Link>
        </div>
        <div className="main__right"> {/* Anasayfa içerisinde yer alan resime ait kısım */}
          <img 
            src="https://images.unsplash.com/photo-1541167760496-1628856ab772?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1494&q=80"
            alt="Banner"
          />
          <span></span>  {/* Resim altında bulunan çerçeveye ait kısım*/}
        </div>
      </div>
    );
}

// https://images.unsplash.com/photo-1541167760496-1628856ab772?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1494&q=80
