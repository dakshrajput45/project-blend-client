//beacause we have limited amount of api calls ie. 25 per day so i am using demo api
import SignupForm from "../Components/SignupForm";
import "../CSS/SignupForm.css"

function SignUp({setIsLoggedIn}) {
    return (
      <div className="SignUp">
        <div>
          <SignupForm setIsLoggedIn={setIsLoggedIn}/>
        </div>
      </div>
    );
  }
  
export default SignUp;
  