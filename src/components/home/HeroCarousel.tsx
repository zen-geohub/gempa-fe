import { useEffect, useState } from "react";

type CarouselProps = {
  images: string[];
  timeout: number;
};

function HeroCarousel({ images, timeout }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, timeout);

    return () => clearInterval(interval);
  }, [images.length, timeout]);

  return (
    // <div className="relative w-full h-screen overflow-hidden">
    <>
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute z-0 brightness-75 inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
        ></div>
      ))}
    </>
    // </div>
  );
}

export default HeroCarousel;
