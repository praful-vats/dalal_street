import React, { useState, useEffect, useRef } from 'react';
import DisplayStockData from './Stock';
import './Stock.css'
import mid from '../mid.png';
import dim from '../dim.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function View() {
  const [symbols, setSymbols] = useState([]);
  const [stockData, setStockData] = useState([]);
  const socketRefs = useRef([]);

  const [nseStocks, setNseStocks] = useState([
  { symbol: "NIFTY" }, { symbol: "NIFTYIT" }, { symbol: "BANKNIFTY" }, { symbol: "IBULHSGFIN" }, { symbol: "SUNTV" }, { symbol: "IDEA" }, { symbol: "PEL" }, { symbol: "ESCORTS" }, { symbol: "BAJAJFINSV" }, { symbol: "BSOFT" }, { symbol: "INDUSTOWER" }, { symbol: "MOTHERSON" }, { symbol: "PVRINOX" }, { symbol: "IPCALAB" }, { symbol: "BAJFINANCE" }, { symbol: "ONGC" }, { symbol: "GNFC" }, { symbol: "GRANULES" }, { symbol: "MFSL" }, { symbol: "ASIANPAINT" }, { symbol: "BANDHANBNK" }, { symbol: "METROPOLIS" }, { symbol: "HDFCAMC" }, { symbol: "MGL" }, { symbol: "AXISBANK" }, { symbol: "BPCL" }, { symbol: "TATAMOTORS" }, { symbol: "KOTAKBANK" }, { symbol: "PIDILITIND" }, { symbol: "ICICIBANK" }, { symbol: "EICHERMOT" }, { symbol: "BOSCHLTD" }, { symbol: "AARTIIND" }, { symbol: "ABBOTINDIA" }, { symbol: "RELIANCE" }, { symbol: "COLPAL" }, { symbol: "HINDCOPPER" }, { symbol: "MARUTI" }, { symbol: "SRF" }, { symbol: "ASHOKLEY" }, { symbol: "BHARTIARTL" }, { symbol: "MCX" }, { symbol: "IRCTC" }, { symbol: "LALPATHLAB" }, { symbol: "HDFCLIFE" }, { symbol: "MRF" }, { symbol: "FEDERALBNK" }, { symbol: "AUROPHARMA" }, { symbol: "GODREJPROP" }, { symbol: "INDIGO" }, { symbol: "ICICIGI" }, { symbol: "ASTRAL" }, { symbol: "BALKRISIND" }, { symbol: "IEX" }, { symbol: "CUMMINSIND" }, { symbol: "ATUL" }, { symbol: "SHREECEM" }, { symbol: "IGL" }, { symbol: "NAVINFLUOR" }, { symbol: "SHRIRAMFIN" }, { symbol: "BATAINDIA" }, { symbol: "DELTACORP" }, { symbol: "HINDUNILVR" }, { symbol: "IOC" }, { symbol: "APOLLOTYRE" }, { symbol: "GUJGASLTD" }, { symbol: "UPL" }, { symbol: "BEL" }, { symbol: "BRITANNIA" }, { symbol: "IDFCFIRSTB" }, { symbol: "CROMPTON" }, { symbol: "SIEMENS" }, { symbol: "TITAN" }, { symbol: "ICICIPRULI" }, { symbol: "TCS" }, { symbol: "CUB" }, { symbol: "CIPLA" }, { symbol: "NESTLEIND" }, { symbol: "JUBLFOOD" }, { symbol: "COALINDIA" }, { symbol: "BANKBARODA" }, { symbol: "INFY" }, { symbol: "NMDC" }, { symbol: "HEROMOTOCO" }, { symbol: "SAIL" }, { symbol: "RAMCOCEM" }, { symbol: "SUNPHARMA" }, { symbol: "BAJAJ-AUTO" }, { symbol: "PERSISTENT" }, { symbol: "SBILIFE" }, { symbol: "ALKEM" }, { symbol: "PETRONET" }, { symbol: "TATASTEEL" }, { symbol: "TORNTPHARM" }, { symbol: "MUTHOOTFIN" }, { symbol: "JKCEMENT" }, { symbol: "RBLBANK" }, { symbol: "TATACHEM" }, { symbol: "SBIN" }, { symbol: "M&M" }, { symbol: "CHAMBLFERT" }, { symbol: "DIVISLAB" }, { symbol: "GRASIM" }, { symbol: "HDFCBANK" }, { symbol: "MANAPPURAM" }, { symbol: "WIPRO" }, { symbol: "CONCOR" }, { symbol: "BERGEPAINT" }, { symbol: "EXIDEIND" }, { symbol: "PAGEIND" }, { symbol: "LUPIN" }, { symbol: "OFSS" }, { symbol: "DALBHARAT" }, { symbol: "HINDPETRO" }, { symbol: "POLYCAB" }, { symbol: "SBICARD" }, { symbol: "LAURUSLABS" }, { symbol: "TATAPOWER" }, { symbol: "TVSMOTOR" }, { symbol: "ITC" }, { symbol: "HCLTECH" }, { symbol: "PFC" }, { symbol: "MARICO" }, { symbol: "DEEPAKNTR" }, { symbol: "ZEEL" }, { symbol: "GLENMARK" }, { symbol: "LICHSGFIN" }, { symbol: "HINDALCO" }, { symbol: "PIIND" }, { symbol: "IDFC" }, { symbol: "VEDL" }, { symbol: "MCDOWELL-N" }, { symbol: "AUBANK" }, { symbol: "BIOCON" }, { symbol: "CANFINHOME" }, { symbol: "DABUR" }, { symbol: "LTIM" }, { symbol: "ZYDUSLIFE" }, { symbol: "APOLLOHOSP" }, { symbol: "VOLTAS" }, { symbol: "TATACOMM" }, { symbol: "GODREJCP" }, { symbol: "TATACONSUM" }, { symbol: "DLF" }, { symbol: "TECHM" }, { symbol: "DRREDDY" }, { symbol: "JINDALSTEL" }, { symbol: "JSWSTEEL" }, { symbol: "BHARATFORG" }, { symbol: "HAL" }, { symbol: "BALRAMCHIN" }, { symbol: "DIXON" }, { symbol: "OBEROIRLTY" }, { symbol: "NTPC" }, { symbol: "NAUKRI" }, { symbol: "LTTS" }, { symbol: "ULTRACEMCO" }, { symbol: "NATIONALUM" }, { symbol: "GAIL" }, { symbol: "UBL" }, { symbol: "ADANIPORTS" }, { symbol: "ADANIENT" }, { symbol: "INDIACEM" }, { symbol: "HAVELLS" }, { symbol: "LT" }, { symbol: "CANBK" }, { symbol: "ACC" }, { symbol: "CHOLAFIN" }, { symbol: "INDUSINDBK" }, { symbol: "BHEL" }, { symbol: "RECLTD" }, { symbol: "POWERGRID" }, { symbol: "ABCAPITAL" }, { symbol: "INDHOTEL" }, { symbol: "PNB" }, { symbol: "MPHASIS" }, { symbol: "ABB" }, { symbol: "L&TFH" }, { symbol: "M&MFIN" }, { symbol: "ABFRL" }, { symbol: "COROMANDEL" }, { symbol: "GMRINFRA" }, { symbol: "AMBUJACEM" }, { symbol: "TRENT" }, { symbol: "INDIAMART" }, { symbol: "SYNGENE" }, { symbol: "COFORGE" }
  ]);

  const handleAddSymbol = async (symbol) => {
  if (symbols.length < 9 && !symbols.includes(symbol)) {
    const response = await fetch(`/api/${symbol}/`);
    const data = await response.json();
    if (data.hasOwnProperty("error")) {
      toast.error(data.error);
      return;
    }
    setSymbols([...symbols, symbol]);
  } else {
    toast.error("Symbol already entered or maximum limit reached (9)");
  }
};

   
  const [sensexData, setSensexData] = useState({});
  const arrow = sensexData.change > 0 ? '\u25B2' : '\u25BC';
  useEffect(() => {
    const fetchSensexData = async () => {
      const response = await fetch('/api/NSE/');
      const data = await response.json();
      setSensexData(data);
    };
    fetchSensexData();
  }, []);
  
  const [sensexDatai, setSensexDatai] = useState({});
  const arrowi = sensexDatai.change > 0 ? '\u25B2' : '\u25BC';
  useEffect(() => {
    const fetchSensexDatai = async () => {
      const response = await fetch('/api/BSE/');
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

  // useEffect(() => {
  //   // Close previous WebSocket connections
  //   socketRefs.current.forEach(socket => socket.close());

  //   // Establish new WebSocket connections
  //   const newSockets = stockData.map(data => {
  //     const isSecureConnection = /^https:/.test(window.location.protocol);
  //     const protocol = isSecureConnection ? "wss" : "ws";
  //     const socket = new WebSocket(`${protocol}://${window.location.host}/ws/stock/${data.symbol}/`);
  //     socket.onmessage = event => {
  //       const updatedData = JSON.parse(event.data);
  //       setStockData(prevData => prevData.map(item => (item.symbol === updatedData.symbol ? updatedData : item)));
  //     };
  //     return socket;
  //   });

  //   // Update socketRefs with new WebSocket connections
  //   socketRefs.current = newSockets;

  //   return () => {
  //     // Clean up WebSocket connections on component unmount
  //     socketRefs.current.forEach(socket => socket.close());
  //   };
  // }, [stockData]);

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