import React, { useState, useEffect } from 'react';
import DisplayStockData from './Stock';
import './Stock.css'
import mid from '../mid.png';
import dim from '../dim.png';

function View() {
  const [symbols, setSymbols] = useState([]);
  const [stockData, setStockData] = useState([]);

  const [nseStocks, setNseStocks] = useState([
    { symbol: "AAPL" }, { symbol: "ABNB" }, { symbol: "ADBE" }, { symbol: "ADI" }, { symbol: "ADP" }, { symbol: "AEP" }, { symbol: "ALGN" }, { symbol: "AMAT" }, { symbol: "AMD" }, { symbol: "AMGN" }, { symbol: "ANSS" }, { symbol: "ASML" }, { symbol: "AVGO" }, { symbol: "AZN" }, { symbol: "BIIB" }, { symbol: "BKNG" }, { symbol: "BKR" }, { symbol: "CDNS" }, { symbol: "CEG" }, { symbol: "CHTR" }, { symbol: "CMCSA" }, { symbol: "COST" }, { symbol: "CPRT" }, { symbol: "CRWD" }, { symbol: "CSCO" }, { symbol: "CSGP" }, { symbol: "CSX" }, { symbol: "CTAS" }, { symbol: "CTSH" }, { symbol: "DDOG" }, { symbol: "DLTR" }, { symbol: "DXCM" }, { symbol: "EA" }, { symbol: "EBAY" }, { symbol: "ENPH" }, { symbol: "EXC" }, { symbol: "FANG" }, { symbol: "FAST" }, { symbol: "FTNT" }, { symbol: "GFS" }, { symbol: "GILD" }, { symbol: "GOOG" }, { symbol: "GOOGL" }, { symbol: "HON" }, { symbol: "IDXX" }, { symbol: "ILMN" }, { symbol: "ISRG" }, { symbol: "JD" }, { symbol: "KDP" }, { symbol: "KHC" }, { symbol: "KLAC" }, { symbol: "LCID" }, { symbol: "LRCX" }, { symbol: "MAR" }, { symbol: "MCHP" }, { symbol: "MDLZ" }, { symbol: "MELI" }, { symbol: "META" }, { symbol: "MNST" }, { symbol: "MRNA" }, { symbol: "MRVL" }, { symbol: "MU" }, { symbol: "NFLX" }, { symbol: "NXPI" }, { symbol: "ODFL" }, { symbol: "ON" }, { symbol: "ORLY" }, { symbol: "PANW" }, { symbol: "PAYX" }, { symbol: "PCAR" }, { symbol: "PDD" }, { symbol: "PEP" }, { symbol: "PYPL" }, { symbol: "QCOM" }, { symbol: "REGN" }, { symbol: "ROST" }, { symbol: "SBUX" }, { symbol: "SGEN" }, { symbol: "SIRI" }, { symbol: "SNPS" }, { symbol: "TEAM" }, { symbol: "TMUS" }, { symbol: "TSLA" }, { symbol: "TTD" }, { symbol: "TXN" }, { symbol: "VRSK" }, { symbol: "VRTX" }, { symbol: "WBA" }, { symbol: "WBD" }, { symbol: "WDAY" }, { symbol: "XEL" }, { symbol: "ZM" }, { symbol: "ZS" }

  ]);

  const handleAddSymbol = async (symbol) => {
  if (symbols.length < 9 && !symbols.includes(symbol)) {
    const response = await fetch(`/api/${symbol}/`);
    const data = await response.json();
    if (data.hasOwnProperty("error")) {
      alert(data.error);
      return;
    }
    setSymbols([...symbols, symbol]);
  } else {
    alert("Symbol already entered or maximum limit reached (9)");
  }
};

   
  const [sensexData, setSensexData] = useState({});
  const arrow = sensexData.change > 0 ? '\u25B2' : '\u25BC';
  useEffect(() => {
    const fetchSensexData = async () => {
      const response = await fetch('/api/NDAQ/');
      const data = await response.json();
      setSensexData(data);
    };
    fetchSensexData();
  }, []);
  
  const [sensexDatai, setSensexDatai] = useState({});
  const arrowi = sensexDatai.change > 0 ? '\u25B2' : '\u25BC';
  useEffect(() => {
    const fetchSensexDatai = async () => {
      const response = await fetch('/api/^GSPC/');
      const data = await response.json();
      setSensexDatai(data);
    };
    fetchSensexDatai();
  }, []);
  


  useEffect(() => {
    const fetchData = async () => {
      if (!symbols.length) {
        return;
      }
      const urls = symbols.map(symbol => `/api/${symbol}/`);
      const promises = urls.map(url => fetch(url).then(response => response.json()));
      const data = await Promise.all(promises);
      setStockData(data);
    };
    fetchData();
  }, [symbols]);

  useEffect(() => {
    let sockets = [];
    if (stockData.length) {
      stockData.forEach(data => {
        console.log(data.symbol);
        const isSecureConnection = /^https:/.test(window.location.protocol);
        const protocol = isSecureConnection ? "wss" : "ws";
        const socket = new WebSocket(`${protocol}://${window.location.host}/ws/stock/${data.symbol}/`);
        // const socket = new WebSocket(`ws://127.0.0.1:8000/ws/stock/${data.symbol}/`);
        socket.onmessage = event => {
          const updatedData = JSON.parse(event.data);
          setStockData(prevData => prevData.map(item => (item.symbol === updatedData.symbol ? updatedData : item)));
        };
        sockets.push(socket);
      });
    }
    return () => {
      sockets.forEach(socket => socket.close());
    };
  }, [stockData]);

  return (
    <div className='f19'>
      <div>
        <div className="info-container">
          {stockData.map(data => (
            <div key={data.symbol} >
              <DisplayStockData stockData={data} />
            </div>
          ))}
        </div>
      </div>
      <div className='grid'>
        <form
          onSubmit={event => {
            event.preventDefault();
            const symbol = event.target.symbol.value.toUpperCase();
            handleAddSymbol(symbol);
            event.target.symbol.value = '';
          }}
        >
          <div className='two item'>
            <input className='f19' type="text" placeholder='ENTER STOCK'  name="symbol"></input>
            {/* <button type="submit" >+</button> */}
          </div>
        </form>
        {symbols.length > 0 ? (
          <div className='four item'>
            <div className="circles-grid">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className={`circle ${i < symbols.length ? "black" : "red"}`}
                ></div>
              ))}
            </div>
            <div className="symbol-count">
            <span className="symbol-length">{symbols.length}</span><a className='by'> / 9</a>
              <button className='but f19' onClick={() => {
                setSymbols([]);
                setStockData([]);
              }}>X</button>
              
            </div>
          </div>
        ) : (
          <div className='four item'>
            <div className="circles-grid">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="circle red"></div>
              ))}
            </div>
            <div className="symbol-count">
            <span className="symbol-length">{symbols.length}</span><a className='by'> / 9</a> 
            </div>
          </div>
        )}
        <div className='six item in-grid'>
          <div className='ione'>
            {sensexData && (
              <>
                <div>{sensexData.symbol}</div>
                <div>{sensexData.price}</div>
                <div>{arrow}{sensexData.pChange}</div>
                <div>{sensexData.change}</div>
              </>
            )}
          </div>
          <div className='itwo'>
            {sensexDatai && (
              <>
                <div>{sensexDatai.symbol}</div>
                <div>{sensexDatai.price}</div>
                <div>{arrowi}{sensexDatai.pChange}</div>
                <div>{sensexDatai.change}</div>
              </>
            )}
          </div>
        </div>
        <div className='three element item'>
           {nseStocks.map((stock) => (
            <div
              key={stock.symbol}
              className="nse-stock"
              onClick={() => handleAddSymbol(stock.symbol)}
            >
               {stock.symbol}
            </div>
          ))}
        </div>

        <div className='th item'>
          <img src={mid} width="200" height="415" alt="mid" className='desk'/>
          <img src={dim} width="200" height="415" alt="dim" className='mob' />
        </div>
      </div>  
    </div>
  );
}

export default View;