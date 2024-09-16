import UGMWhite from "../../assets/Lambang UGM-putih.png";
import UGMBlack from "../../assets/Lambang UGM-hitam.png";
import { useTheme } from "../theme-provider";
import ThemeChanger from "@/components/ThemeChanger";
import { useEffect, useState } from "react";

function Header() {
  const { theme } = useTheme();
  const [fixedHeader, setFixedHeader] = useState<boolean>(false);

  function onScroll() {
    if (window !== undefined) {
      const windowHeight = window.scrollY;
      windowHeight > 0 ? setFixedHeader(true) : setFixedHeader(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    console.log(fixedHeader);
  }, [fixedHeader]);

  return (
    <header className="sticky z-50 top-0 w-full h-16 flex justify-between items-center p-4 bg-white text-slate-950 shadow dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50">
      <div className="flex gap-2">
        {theme === "light" ? (
          <img src={UGMBlack} className="h-12" alt="" />
        ) : (
          <img src={UGMWhite} className="h-12" />
        )}
        <div className="flex flex-col text-sm justify-center text-slate-950 dark:text-white">
          <h1 className="font-medium">Teknik Geodesi</h1>
          <h1 className="font-bold">Universitas Gadjah Mada</h1>
        </div>
      </div>
      <ThemeChanger />
    </header>
  );
}

export default Header;
