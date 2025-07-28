import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import { ThemeProvider } from "./components/theme-provider";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
