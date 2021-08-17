import "./RightCard.css";

export default function RightCard() {
    return (
        <div className="rightCard container" id="rightCard">
            <div className="rightCard__left">
                <span></span> {/* Resim altında bulunan çerçeveye ait kısım*/}
                <img
                    src="https://images.unsplash.com/photo-1522120573867-e574959f84c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
                    alt=""
                />
            </div>
            <div className="rightCard__right">
                <h2>
                    <span>İletişim</span> <br />
                    Görüşlerinizi önemsiyoruz.
                </h2>
                <p>
                    Kahvelerimiz ve sitemiz hakkında görüşlerinize önem veriyoruz.
                    İstek ve önerilerinizi{" "}
                    <span> ozkahvem@gmail.com </span> adresine bekliyoruz.
                </p>
            </div>
        </div>
    );
}
