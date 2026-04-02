import logo from './logo.svg';
import './App.css';
import Dashboard from './Dashboard';
import { FinanceProvider } from './context/FinanceContext.tsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FinanceProvider>
          <Dashboard />
        </FinanceProvider>
      </header>
    </div>
  );
}

export default App;
