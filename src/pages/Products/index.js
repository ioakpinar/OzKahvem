import Card from "../../components/Card";
import "./Products.css";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useFetch } from "../../hooks/useFetch";

export default function Products() {
  // Kahveler Sayfası

  const { coffies } = useFetch();

  console.log(coffies);

  return (
    <>
      <Navbar />
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
      <Footer />
    </>
  );
}

// localhost:3000/products
