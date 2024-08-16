import { useTheme } from "../../theme-provider";
import { Card } from "../../ui/card";
import UGMWhite from "../../../assets/Lambang UGM-putih.png";
import UGMBlack from "../../../assets/Lambang UGM-hitam.png";

function BrandCard() {
  const { theme } = useTheme();

  return (
    <Card className="flex-grow flex flex-col items-center justify-center">
      {theme === "light" ? (
        <img src={UGMBlack} className="w-24 h-24" />
      ) : (
        <img src={UGMWhite} className="w-24 h-24" />
      )}
      <div className="text-center mt-2">
        <h1 className="text-xs">
          Program Studi Sarjana <br /> Teknik Geodesi
        </h1>
        <h1 className="text-xs">Departemen Teknik Geodesi</h1>
        <h1 className="text-xs">Fakultas Teknik</h1>
        <h1 className="text-xs">Universitas Gadjah Mada</h1>
      </div>
    </Card>
  );
}

export default BrandCard;