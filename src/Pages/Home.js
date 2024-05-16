import Card from "../Components/Cards";
import "../CSS/Home.css";
import Spinner from "../Components/Spinner";


function Home({ isLoggedIn,stockData,loading,error }) {
  
  return (
    <div className="home">
      <div className="items-center my-40px">
        {loading ? (
          <p><Spinner/></p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div>
            <div className="card-container">
              {stockData &&
                stockData.map((item, index) => {
                  return (
                    <Card key={index} data={item} IsLoggedIn={isLoggedIn} />
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
