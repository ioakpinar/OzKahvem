import Footer from "../../components/Footer";
import MainSection from "../../components/MainSection";
import ColorSection from "../../components/ColorSection";
import LeftCard from "../../components/LeftCard";
import RightCard from "../../components/RightCard";
import Navbar from "../../components/Navbar";

export default function Home() {
    // Giriş Sayfası
    return (
        <>
            <Navbar />
            <MainSection />
            <ColorSection />
            <LeftCard />
            <RightCard />
            <Footer />
        </>
    );
}

// localhost:3000/
