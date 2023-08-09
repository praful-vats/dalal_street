import React, { useState, useEffect } from 'react';
import DisplayStockData from './Stock';
import './Stock.css'
import mid from '../mid.png';
import dim from '../dim.png';

function View() {
  const [symbols, setSymbols] = useState([]);
  const [stockData, setStockData] = useState([]);

  const [nseStocks, setNseStocks] = useState([
   { symbol: "IEX" }, { symbol: "CHOLAFIN" }, { symbol: "M&MFIN" }, { symbol: "GODREJPROP" }, { symbol: "ADANIENT" }, { symbol: "ABFRL" }, { symbol: "LICHSGFIN" }, { symbol: "CANFINHOME" }, { symbol: "IGL" }, { symbol: "ASTRAL" }, { symbol: "L&TFH" }, { symbol: "BHEL" }, { symbol: "DLF" }, { symbol: "OBEROIRLTY" }, { symbol: "BIOCON" }, { symbol: "BAJFINANCE" }, { symbol: "IPCALAB" }, { symbol: "COROMANDEL" }, { symbol: "INDUSINDBK" }, { symbol: "BALRAMCHIN" }, { symbol: "MGL" }, { symbol: "RBLBANK" }, { symbol: "BAJAJFINSV" }, { symbol: "AUROPHARMA" }, { symbol: "ABCAPITAL" }, { symbol: "SBICARD" }, { symbol: "TATAMOTORS" }, { symbol: "ASHOKLEY" }, { symbol: "PNB" }, { symbol: "PEL" }, { symbol: "ADANIPORTS" }, { symbol: "IDFC" }, { symbol: "ACC" }, { symbol: "AUBANK" }, { symbol: "RECLTD" }, { symbol: "HDFCLIFE" }, { symbol: "SBIN" }, { symbol: "SYNGENE" }, { symbol: "GMRINFRA" }, { symbol: "DIVISLAB" }, { symbol: "IDFCFIRSTB" }, { symbol: "HINDPETRO" }, { symbol: "GUJGASLTD" }, { symbol: "LT" }, { symbol: "BANDHANBNK" }, { symbol: "BERGEPAINT" }, { symbol: "MANAPPURAM" }, { symbol: "BPCL" }, { symbol: "IBULHSGFIN" }, { symbol: "AARTIIND" }, { symbol: "SUNPHARMA" }, { symbol: "DALBHARAT" }, { symbol: "M&M" }, { symbol: "MCX" }, { symbol: "HAL" }, { symbol: "MUTHOOTFIN" }, { symbol: "SBILIFE" }, { symbol: "ESCORTS" }, { symbol: "ATUL" }, { symbol: "SHRIRAMFIN" }, { symbol: "EICHERMOT" }, { symbol: "AMBUJACEM" }, { symbol: "BALKRISIND" }, { symbol: "PIDILITIND" }, { symbol: "GRANULES" }, { symbol: "GLENMARK" }, { symbol: "ABB" }, { symbol: "PFC" }, { symbol: "VOLTAS" }, { symbol: "TORNTPHARM" }, { symbol: "ITC" }, { symbol: "WHIRLPOOL" }, { symbol: "LUPIN" }, { symbol: "RELIANCE" }, { symbol: "TRENT" }, { symbol: "MFSL" }, { symbol: "GRASIM" }, { symbol: "ZYDUSLIFE" }, { symbol: "INDHOTEL" }, { symbol: "TATACHEM" }, { symbol: "MARUTI" }, { symbol: "NATIONALUM" }, { symbol: "ICICIPRULI" }, { symbol: "IRCTC" }, { symbol: "JINDALSTEL" }, { symbol: "DIXON" }, { symbol: "PVR" }, { symbol: "RAIN" }, { symbol: "BANKBARODA" }, { symbol: "INDIACEM" }, { symbol: "CANBK" }, { symbol: "MRF" }, { symbol: "IOC" }, { symbol: "HINDALCO" }, { symbol: "ALKEM" }, { symbol: "ASIANPAINT" }, { symbol: "BAJAJ-AUTO" }, { symbol: "BHARTIARTL" }, { symbol: "KOTAKBANK" }, { symbol: "DELTACORP" }, { symbol: "SUNTV" }, { symbol: "MCDOWELL-N" }, { symbol: "GNFC" }, { symbol: "HINDCOPPER" }, { symbol: "DRREDDY" }, { symbol: "TATAPOWER" }, { symbol: "TATACONSUM" }, { symbol: "GODREJCP" }, { symbol: "ULTRACEMCO" }, { symbol: "HDFCBANK" }, { symbol: "CUB" }, { symbol: "NAVINFLUOR" }, { symbol: "SIEMENS" }, { symbol: "TVSMOTOR" }, { symbol: "PIIND" }, { symbol: "DEEPAKNTR" }, { symbol: "ABBOTINDIA" }, { symbol: "CUMMINSIND" }, { symbol: "APOLLOHOSP" }, { symbol: "HDFCAMC" }, { symbol: "COALINDIA" }, { symbol: "HDFC" }, { symbol: "MOTHERSON" }, { symbol: "CHAMBLFERT" }, { symbol: "JSWSTEEL" }, { symbol: "EXIDEIND" }, { symbol: "BHARATFORG" }, { symbol: "NAUKRI" }, { symbol: "COLPAL" }, { symbol: "POWERGRID" }, { symbol: "RAMCOCEM" }, { symbol: "NTPC" }, { symbol: "TATASTEEL" }, { symbol: "GAIL" }, { symbol: "PETRONET" }, { symbol: "APOLLOTYRE" }, { symbol: "LAURUSLABS" }, { symbol: "INTELLECT" }, { symbol: "TATACOMM" }, { symbol: "TITAN" }, { symbol: "BEL" }, { symbol: "HAVELLS" }, { symbol: "CIPLA" }, { symbol: "UPL" }, { symbol: "CONCOR" }, { symbol: "SAIL" }, { symbol: "JKCEMENT" }, { symbol: "AXISBANK" }, { symbol: "FEDERALBNK" }, { symbol: "ICICIGI" }, { symbol: "ICICIBANK" }, { symbol: "HEROMOTOCO" }, { symbol: "NMDC" }, { symbol: "HINDUNILVR" }, { symbol: "SRF" }, { symbol: "INDIGO" }, { symbol: "METROPOLIS" }, { symbol: "TCS" }, { symbol: "UBL" }, { symbol: "POLYCAB" }, { symbol: "PERSISTENT" }, { symbol: "INFY" }, { symbol: "BSOFT" }, { symbol: "LALPATHLAB" }, { symbol: "WIPRO" }, { symbol: "MARICO" }, { symbol: "BRITANNIA" }, { symbol: "INDIAMART" }, { symbol: "NESTLEIND" }, { symbol: "IDEA" }, { symbol: "ZEEL" }, { symbol: "SHREECEM" }, { symbol: "CROMPTON" }, { symbol: "INDUSTOWER" }, { symbol: "JUBLFOOD" }, { symbol: "ONGC" }, { symbol: "LTTS" }, { symbol: "OFSS" }, { symbol: "BOSCHLTD" }, { symbol: "TECHM" }, { symbol: "MPHASIS" }, { symbol: "BATAINDIA" }, { symbol: "LTIM" }, { symbol: "PAGEIND" }, { symbol: "HCLTECH" }, { symbol: "HONAUT" }, { symbol: "COFORGE" }, { symbol: "DABUR" }, { symbol: "VEDL" }

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
      const response = await fetch('/api/BSE/');
      const data = await response.json();
      setSensexData(data);
    };
    fetchSensexData();
  }, []);
  
  const [sensexDatai, setSensexDatai] = useState({});
  const arrowi = sensexDatai.change > 0 ? '\u25B2' : '\u25BC';
  useEffect(() => {
    const fetchSensexDatai = async () => {
      const response = await fetch('/api/INFY/');
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