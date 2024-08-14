import { HomeIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useData } from "@/contexts/DataContext";
import { useTheme } from "../theme-provider";
import UGMWhite from "../../assets/Lambang UGM-putih.png";
import UGMBlack from "../../assets/Lambang UGM-hitam.png";
import ThemeChanger from "../ThemeChanger";
import Infobar from "./sidebar/Infobar";

function Sidebar() {
  const { earthquake } = useData();
  const { theme } = useTheme();

  return (
    <aside className="w-2/12 h-screen p-1 gap-2 flex flex-col z-20">
      <Card className="">
        <CardContent className="p-1">
          <Button className="p-1 h-fit w-fit" variant="ghost">
            <a href="/#/">
              <HomeIcon />
            </a>
          </Button>
          <ThemeChanger />
        </CardContent>
      </Card>
      {earthquake.length ? (
        <Infobar />
      ) : (
        <Card className="flex-grow flex flex-col items-center justify-center">
          {theme === "light" ? (
            <img src={UGMBlack} className="w-24 h-24" />
          ) : (
            <img src={UGMWhite} className="w-24 h-24" />
          )}
          <div className="text-center mt-2">
            <h1 className="text-xs">Program Studi Sarjana Teknik Geodesi</h1>
            <h1 className="text-xs">Departemen Teknik Geodesi</h1>
            <h1 className="text-xs">Fakultas Teknik</h1>
            <h1 className="text-xs">Universitas Gadjah Mada</h1>
          </div>
        </Card>
      )}
    </aside>
  );
}

export default Sidebar;
