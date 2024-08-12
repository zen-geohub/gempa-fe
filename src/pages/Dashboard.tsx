import Main from "@/components/dashboard/Main";
import Sidebar from "@/components/dashboard/Sidebar";
import { useTheme } from "@/components/theme-provider";
import FilterContext from "@/contexts/FilterContext";
import { cn } from "@/lib/utils";

function Dashboard() {
  const {theme} = useTheme()

  return (
    <FilterContext>
      <div className={cn(theme === 'light' ? 'bg-white' : 'bg-[#020617]', "w-screen h-screen flex")}>
        <Main />
        <Sidebar />
      </div>
    </FilterContext>
  );
}

export default Dashboard;
