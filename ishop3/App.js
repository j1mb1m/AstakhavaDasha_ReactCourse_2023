import React from 'react';
import ReactDOM from 'react-dom';

import ProductList from './components/ProductList';

let productArray = require('./productArray.json');


ReactDOM.render(
  <ProductList
    goodsList={productArray}
  />,
  document.getElementById('root')
);
