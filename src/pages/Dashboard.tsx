import Main from "@/components/dashboard/Main";
import Sidebar from "@/components/dashboard/Sidebar";
import Loading from "@/components/Loading";
import { useTheme } from "@/components/theme-provider";
import { useData } from "@/contexts/DataContext";
import { FilterContext } from "@/contexts/FilterContext";
import { cn } from "@/lib/utils";

function Dashboard() {
  const { theme } = useTheme();
  const {loadingState} = useData()

  return (
    <FilterContext>
      <div
        className={cn(
          theme === "light" ? "bg-white" : "bg-[#020617]",
          "w-screen h-screen flex"
        )}
      >
        <Main />
        <Sidebar />
        {loadingState && <Loading />}
      </div>
    </FilterContext>
  );
}

export default Dashboard;
