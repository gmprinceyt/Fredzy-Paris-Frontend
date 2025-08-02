import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import { ThemeProvider } from "./components/theme-provider";
import Home from "./pages/Home";
import { Suspense } from "react";
import Loading from "./components/Loading";

function App() {
  return (
    <Suspense fallback={<Loading/>}>
      <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
    </Suspense>
  );
}

export default App;
