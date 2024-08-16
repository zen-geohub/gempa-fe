import preview1 from "../../assets/preview1.png";
import preview2 from "../../assets/preview2.png";
import preview3 from "../../assets/preview3.png";
import { Link } from "react-router-dom";
import HeroCarousel from "./HeroCarousel";
import { Button } from "../ui/button";

function Hero() {
  const image = [preview1, preview2, preview3];

  return (
    <div className="relative px-4 py-2 flex flex-col justify-center gap-2 h-[calc(100dvh-64px)] items-center">
      <HeroCarousel images={image} timeout={3000} />
      <h1 className="font-poppins text-white z-10 text-4xl font-extrabold tracking-tight text-center">
        Jelajahi histori gempa bumi Indonesia di sini!
      </h1>
      <Button className="z-10" variant="secondary">
        <Link to="/dashboard">Masuk</Link>
      </Button>
    </div>
  );
}

export default Hero;
