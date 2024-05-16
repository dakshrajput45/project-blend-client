import React from "react";
import toast from "react-hot-toast";
import LiveChart from "./LiveChart";
import axios from "axios";
import { useCookies } from "react-cookie";
import "../CSS/Cards.css";

function Card({ data, IsLoggedIn, isInWishlist, removeFromScreen }) {
    const [cookies, setCookie, removeCookie] = useCookies(['userId']);
    const userId = cookies.userId;
    const url = "https://project-blend-server.onrender.com/";
    const wishHandler = async (symbol) => {
        try {
            console.log(symbol);
            const response = await axios.post(`${url}/${isInWishlist ? 'removefromlist' : 'addtolist'}`, {
                userId: userId,
                symbol
            });
            if (response.status === 200) {
                toast.success(isInWishlist ? "Removed from Wishlist" : "Added to Wishlist");
                if (isInWishlist) {
                    removeFromScreen(data.ticker); // Remove the card from the screen if it's removed from the wishlist
                }
            } else {
                toast.error("Try Again");
            }
        } catch (error) {
            toast.error("Something Went Wrong");
        }
    };

    function clickHandler() {
        if (IsLoggedIn === true) {
            wishHandler(data.ticker);
        } else {
            toast.error("Please Log In");
        }
    }

    return (
        <div className="card">
            <div className="live-chart-container">
                <LiveChart symbol={data.ticker} />
            </div>
            <div className="info">
                <div className="ticker">
                    <h2>{data.ticker}</h2>
                </div>
                <div className="info-container">
                    <div className="change-cont">
                        <label><p>change_percentage<sup>*</sup></p></label>
                        <p>{data.change_percentage}</p>

                        <label><p>change_amount<sup>*</sup></p></label>
                        <p>{data.change_amount}</p>
                    </div>
                    <div className="price-cont">
                        <label><p>price<sup>*</sup></p></label>
                        <p>{data.price}</p>
                    </div>
                </div>
                <button className={isInWishlist ? "Remove" : "Add"} onClick={clickHandler}>{isInWishlist ? "Remove from Watchlist" : "Add to Watchlist"}</button>
            </div>
        </div>
    );
}

export default Card;
