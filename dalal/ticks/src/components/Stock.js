import React from 'react';
import './Stock.css'

function DisplayStockData({ stockData }) {
  if (!stockData) {
    return <p>ENTER STOCK</p>;
  }
  const arrow = stockData.change > 0 ? '\u25B2' : '\u25BC';
  const mp = stockData.change > 0 ? '\x2b' : '\u2212';
  const isStockUp = stockData.change > 0;
  const Change = Math.abs(stockData.change);


  return (

        <div className='info'>
          <div>
            <p style={{color: isStockUp ? "lightgreen" : "red"}}>{stockData.symbol}</p>
            <p style={{color: isStockUp ? "lightgreen" : "red"}}>{stockData.price}</p>
          </div>
          <div>
            <p style={{color: isStockUp ? "lightgreen" : "red"}}>{arrow}{stockData.pChange}</p>
            <p style={{color: isStockUp ? "lightgreen" : "red"}}>{mp}{Change}</p>
          </div>
        </div>
  );
}

export default DisplayStockData;
