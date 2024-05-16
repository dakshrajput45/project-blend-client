import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import toast from "react-hot-toast";
import axios from "axios";
import Card from "../Components/Cards";
import Spinner from "../Components/Spinner";
import "../CSS/Watchlist.css"

function WishList({ stockData, IsLoggedIn }) {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);
  
  const url = "https://project-blend-server.onrender.com";

  const userId = cookies.userId;

  const navigate = useNavigate(); // Initialize useNavigate

  const getUserData = async () => {
    try {
      const response = await axios.post(`${url}/watchlist`, {
        userId: userId,
      });
      setUserData(response.data.data.watchList);
    } catch (error) {
      toast.error("An error occurred while fetching user data");
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const removeFromScreen = (symbol) => {
    setUserData(prevData => prevData.filter(item => item !== symbol));
  };

  let filteredStockData = [];
  if (stockData && IsLoggedIn) {
    filteredStockData = stockData.filter((stock) => {
      const ticker = stock.ticker; 
      const isMatch = userData.includes(ticker);
      return isMatch;
    });
  }

  useEffect(() => {
    if (!IsLoggedIn) {
      navigate('/'); // Redirect to dashboard
    }
  }, [IsLoggedIn, navigate]);

  return (
    <div className="Wishlist">
      {loading ? <Spinner /> : (
        <div className="card-container">
          {filteredStockData.length > 0 ? (
            filteredStockData.map((item, index) => (
              <Card key={index} data={item} IsLoggedIn={IsLoggedIn} isInWishlist={true} removeFromScreen={removeFromScreen} />
            ))
          ) : (
            <div className="empty-message">Please add some cards to your Watchlist.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default WishList;
