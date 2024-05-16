//beacause we have limited amount of api calls ie. 25 per day so i am using demo api
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "../CSS/LoginForm.css";
import {useCookies} from "react-cookie";
import axios from "axios";

function Login({ setIsLoggedIn }) {
  const url = "https://project-blend-server.onrender.com";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [ cookies, setCookie, removeCookie] = useCookies(['user'])
  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    
    try {
        const response = await axios.post(`${url}/login`, formData);
        //console.log(response);
        if (response.status === 200) {
            setCookie("userId", response.data.data);
            setIsLoggedIn(true);
            toast.success("Welcome Again");
            navigate("/");
        }
    } catch (error) {
      console.error(error);

      // Check if the error response contains a status property
      if (error.response && error.response.status === 404) {
          toast.error("User Not Found");
      } else if (error.response && error.response.status === 401) {
          toast.error("Invalid Password");
      } else {
          // Handle other errors
          toast.error("An error occurred");
      
    }
  }
};



  return (
    <div className="card-log">
      <div className="card-log-p">
        <h2> Log In </h2>
      </div>
      <form className="form-log" onSubmit={submitHandler}>
        <label>
          <p>
            Email Address<sup>*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Enter email id"
          />
        </label>
        <label>
          <p>
            Password<sup>*</sup>
          </p>
          <input
            required
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={changeHandler}
            placeholder="Enter Password"
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </span>
          <button>Sign In</button>
        </label>
      </form>
    </div>
  );
}

export default Login;
