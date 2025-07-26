import { ThemeProvider } from "@/components/theme-provider"
import Login from "./pages/Login";
import { Toaster } from "@/components/ui/sonner"


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {
        <Login />
      }
         <Toaster />
    </ThemeProvider>
  )
}

export default App