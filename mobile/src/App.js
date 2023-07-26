import './App.css';
import MobileCompany from './components/MobileCompany';

let clients = require('./clients.json');

function App() {
  return (
    <div className="App">
      <MobileCompany
        clients={clients}
      />
    </div>
  );
}

export default App;
