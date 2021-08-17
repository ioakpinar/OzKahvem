import Navbar from "../../components/Navbar";
import "./Orders.css";
import { useOrders } from "../../hooks/useOrders";
import Order from "./Order";

export default function Orders() {
  // Çalışan Sipariş Sayfası

  const { listOrders } = useOrders();

  //  CoffieName, CoffieSize,  EstimatedDeliveryTime ,OrderTime

  return (
    // Bu sayfa kullanıcı tarafında gözükmemektedir.
    <>
      <Navbar />
      <div className="container orders">
        <table className="orders__table">
          <tr>
            <th>Kahve Adı</th>
            <th>Kahvenin Boyutu</th>
            <th>Hazırlanması için hesaplanan zaman</th>
            <th>Sipariş Zamanı</th>
            <th>Siparişi Tamamla</th>
          </tr>
          {listOrders === null ? null : (
            <>
              {" "}
              {listOrders.map(
                ({
                  CoffieName,
                  CoffieSize,
                  EstimatedDeliveryTime,
                  OrderTime,
                  _id,
                }) => (
                  <tr>
                    <Order
                      key={_id}
                      CoffieName={CoffieName}
                      CoffieSize={CoffieSize}
                      EstimatedDeliveryTime={EstimatedDeliveryTime}
                      OrderTime={OrderTime}
                      SId={_id}
                    />
                  </tr>
                )
              )}{" "}
            </>
          )}
        </table>
      </div>
    </>
  );
}

// localhost:3000/orders/
