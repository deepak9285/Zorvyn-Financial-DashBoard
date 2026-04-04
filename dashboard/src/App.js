import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./Dashboard";
import { FinanceProvider } from "./context/FinanceContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

function App() {
  return (
    <ThemeProvider>
      <div className="App p-4 sm:p-6 md:p-8 w-full min-h-screen bg-background text-foreground transition-colors duration-200">
        <FinanceProvider>
          <Dashboard />
        </FinanceProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
