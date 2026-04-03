import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./Dashboard";
import { FinanceProvider } from "./context/FinanceContext.tsx";

function App() {
  return (
    <div className="App p-4 sm:p-6 md:p-8 w-full min-h-screen">
      <FinanceProvider>
        <Dashboard />
      </FinanceProvider>
    </div>
  );
}

export default App;
