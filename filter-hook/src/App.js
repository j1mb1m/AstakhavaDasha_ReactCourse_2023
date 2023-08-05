import './App.css';
import Filter from './components/Filter';
import words from './data/words';

function App() {
  const items = words;

  return (
    <div className="App">
        <Filter items={items} />
    </div>
  );
}

export default App;
