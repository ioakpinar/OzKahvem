export default function Order({
  CoffieName,
  CoffieSize,
  EstimatedDeliveryTime,
  OrderTime,
  SId,
}) {
  const completeOrder = async (e) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        SId,
        CoffieName,
        CoffieSize,
        EstimatedDeliveryTime,
        OrderTime,
      }),
    };
    const response = await fetch(
      "http://localhost:12345/deliverorder",
      requestOptions
    );
    const data = await response.json();
    document.location.reload(true);
  };

  return (
    <>
      <td>{CoffieName}</td>
      <td>{CoffieSize}</td>
      <td>{EstimatedDeliveryTime}</td>
      <td>{OrderTime}</td>
      <td>
        <button className="orders__button" onClick={completeOrder}>
          Tamamla
        </button>
      </td>
    </>
  );
}
