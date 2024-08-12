import Main from "@/components/dashboard/Main";
import Sidebar from "@/components/dashboard/Sidebar";

function Dashboard() {
  return (
    <div className="w-screen h-screen flex">
      <Main />
      <Sidebar />
    </div>
  );
}

export default Dashboard;
