import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "./components/theme-provider";
import DataContext from "./contexts/DataContext";

function App() {
  return (
    <>
      <HashRouter>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <DataContext>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </DataContext>
        </ThemeProvider>
      </HashRouter>
    </>
  );
}

export default App;
