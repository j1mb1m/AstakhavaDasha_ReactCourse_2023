import './App.css';
import ProductList from './components/ProductList';

let productArray = require('./data/productArray.json');

function App() {
  return (
    <div className="App">
      <ProductList
        goodsList={productArray}
      />
    </div>
  );
}

export default App;


