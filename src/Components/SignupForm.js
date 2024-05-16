//beacause we have limited amount of api calls ie. 25 per day so i am using demo apii
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai"
import { useCookies } from "react-cookie";
import {toast} from "react-hot-toast"
import "../CSS/SignupForm.css"
import axios from "axios";

function SignupForm({setIsLoggedIn}) {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        userName: "", email: "", password: "", confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPasswords] = useState(false);
    const [ cookies, setCookie, removeCookie] = useCookies(['user'])

    function changeHandler(event) {
        setFormData((prevData) => (
            {
                ...prevData,
                [event.target.name]: event.target.value
            }
        ))
    }
    const submitHandler = async (event) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords Do Not Match");
        } else {
            try {
                const {data} = await axios.post(`http://localhost:5000/register`, formData);
                if (data.status === "ok") {
                    // User registered successfully
                    await setCookie("userId",data.data);
                    setIsLoggedIn(true);
                    toast.success("Account Created");
                    navigate("/");
                } else if (data.error === "User Exists") {
                    // User already exists
                    toast.error("User already exists");
                } else {
                    // Other errors (handle according to your backend response)
                    toast.error("An error occurred ");
                }
            } catch (err) {
                console.error(err);
                toast.error("An error occurred while creating the account");
            }
        }
    };
    return (
        <div className="card-sign">
            <div className="card-log-p">
                <h2>Sign Up</h2>
            </div>
            <form onSubmit={submitHandler}>
                <div>
                    <label>
                        <p>Name<sup>*</sup></p>
                        <input
                            required
                            type="text"
                            name="userName"
                            onChange={changeHandler}
                            placeholder="Enter Name"
                            value={formData.userName} />
                    </label>
                </div>
                <div>
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
                            placeholder="Enter email id" />
                    </label>
                    <label>
                        <p>
                            Password<sup>*</sup>
                        </p>
                        <input
                            required
                            name="password"
                            type={showPassword ? ("text") : ("password")}
                            value={formData.password}
                            onChange={changeHandler}
                            placeholder="Enter Password" />

                        <span onClick={() => { setShowPassword(!showPassword) }}>
                            {showPassword ? (<AiOutlineEye />) : (<AiOutlineEyeInvisible />)}
                        </span>
                    </label>
                    <label>
                        <p>
                            Confirm Password<sup>*</sup>
                        </p>
                        <input
                            required
                            name="confirmPassword"
                            type={showConfirmPassword ? ("text") : ("password")}
                            value={formData.confirmPassword}
                            onChange={changeHandler}
                            placeholder="Confirm Password" />

                        <span onClick={() => { setShowConfirmPasswords(!showConfirmPassword) }}>
                            {showConfirmPassword ? (<AiOutlineEye />) : (<AiOutlineEyeInvisible />)}
                        </span>
                    </label>
                    <button>Create Account</button>
                </div>
            </form> 
        </div>
    );
}
export default SignupForm