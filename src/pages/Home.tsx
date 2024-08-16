import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import KeyFeatures from "@/components/home/KeyFeatures";

function Home() {
  return (
    <div className="w-dvw h-dvh bg-white dark:bg-slate-950 overflow-y-auto overflow-x-hidden !scroll-smooth">
      <Header />
      <Hero />
      <KeyFeatures />
      <Footer />
    </div>
  );
}

export default Home;
