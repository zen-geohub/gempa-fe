import Main from "@/components/dashboard/Main";
import Sidebar from "@/components/dashboard/Sidebar";
import Loading from "@/components/Loading";
import { useTheme } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { useData } from "@/contexts/DataContext";
import { FilterContext } from "@/contexts/FilterContext";
import { LayerContext } from "@/contexts/LayerContext";
import { cn } from "@/lib/utils";

function Dashboard() {
  const { theme } = useTheme();
  const { loadingState } = useData();

  return (
    <FilterContext>
      <LayerContext>
        <div
          className={cn(
            theme === "light" ? "bg-white" : "bg-[#020617]",
            "w-dvh h-dvh flex"
          )}
        >
          <Main />
          <Sidebar />
          {loadingState && <Loading />}
          <Toaster />
        </div>
      </LayerContext>
    </FilterContext>
  );
}

export default Dashboard;
