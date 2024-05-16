//beacause we have limited amount of api calls ie. 25 per day so i am using demo api
import { Route,Routes } from "react-router-dom";
import Home from "./Pages/Home";
import LogIn from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";
import WishList from "./Pages/WishList";
import Nav from "./Components/Nav";
import { useState,useEffect } from "react";
import "./CSS/App.css"
import axios from "axios";


function App() {
  
  const apiUrl = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo`;
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [loading, setLoading] = useState(false);
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);

  async function fetchData() {
    setLoading(true);
    try {
      const { data } = await axios.get(apiUrl);
      const mostTraded = data.most_actively_traded.slice(0, 5);
      const topGainers = data.top_gainers.slice(0, 5);
      const topLosers = data.top_losers.slice(0, 5);

      // Combine data from different sources
      const combinedData = [...mostTraded, ...topGainers, ...topLosers];

      // Use a Set to automatically remove duplicates based on ticker symbol
      const uniqueCombinedData = Array.from(new Set(combinedData.map(item => item.ticker)))
        .map(ticker => combinedData.find(item => item.ticker === ticker));

      setStockData(uniqueCombinedData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="app">
      <div>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      </div>
        <div>
          <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} stockData={stockData} loading={loading} error={error}/>}/>
            <Route path="/login" element={<LogIn setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path="/wishlist" element={<WishList stockData={stockData} IsLoggedIn={isLoggedIn}/>}/>
          </Routes>
        </div>
    </div>
  );
}

export default App;
