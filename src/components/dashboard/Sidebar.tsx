import { useData } from "@/contexts/DataContext";
import Infobar from "./sidebar/Infobar";
import BrandCard from "./main/BrandCard";

function Sidebar() {
  const { earthquake } = useData();

  return (
    <aside className="hidden lg:w-2/12 lg:h-screen lg:p-1 lg:gap-2 lg:flex lg:flex-col lg:z-20">
      {earthquake.length ? <Infobar /> : <BrandCard />}
    </aside>
  );
}

export default Sidebar;
