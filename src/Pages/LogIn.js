//beacause we have limited amount of api calls ie. 25 per day so i am using demo api
import Login from "../Components/LoginForm";
import "../CSS/LoginForm.css"

function LogIn({setIsLoggedIn}) {
    return (
      <div className="LogIn">
        <div>
          <Login setIsLoggedIn={setIsLoggedIn}/>
        </div>
      </div>
    );
  }
  
export default LogIn;
  