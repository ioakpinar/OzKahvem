import "./LeftCard.css";

export default function LeftCard() {
    return (
        <div className="leftCard container"> {/* Hakkmızda altında bulunan bölüm */}
            <div className="leftCard__left"> {/* Bölüm içerisinde yer alan yazılara ait kısım */}
                <h2>
                    <span>Beklemeden</span> <br />
                    söyleyin/alın/özüne varın
                </h2>
                <p>
                    Mesafelerin açıldığı bu dönemde kahve siparişinizi ister dışarıda
                    ister kafemizde sıra beklemeden sipariş etmenizi sağlıyor, mesafeleri
                    kapatıyoruz. Siparişinizin hazırlanma süresi hakkında bilgilendiriyor
                    sizi bekletmiyoruz.
                </p>
            </div>
            <div className="leftCard__right"> {/* Bölüm içerisinde yer alan resme ait kısım */}
                <span></span> {/* Resim altında bulunan çerçeveye ait kısım*/}
                <img
                    src="https://images.unsplash.com/photo-1517640033243-dc06bb716df5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
                    alt=""
                />
            </div>
        </div>
    );
}
