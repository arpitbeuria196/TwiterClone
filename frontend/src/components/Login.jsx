import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { LoginUser,LogOutUser,SignUpUser } from "../store/UserSlice";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [userName, setUserName] = useState('');


  const [errorMessage, setErrorMessage] = useState('');


  const [isSignup,setIsSignUp] = useState(true);

  const loginHandle = async ()=>
  {
      try 
      {  
        if (!email || !password) {
          setErrorMessage("Please fill in all the fields.");
          return;
        }      
        const loginVal = await axios.post("http://localhost:8000/auth/login",
          {
            email,
            password,
          },
          {withCredentials:true}
        )

        console.log(loginVal);
        dispatch(LoginUser(loginVal.data.user));
        navigate("/dashboard");

      } catch (error) 
      {
        setErrorMessage("Login failed. Please try again.");
        console.log(error.message);
      }
  }
  const registerHandle = async ()=>
  {
    try 
      {
        if (!email || !password || (isSignup && !userName)) {
          setErrorMessage("Please fill in all the fields.");
          return;
        }   
        const registerVal = await axios.post("http://localhost:8000/auth/register",
          {
            userName,
            email,
            password,
          },
          {withCredentials:true}
        )
        dispatch(SignUpUser(registerVal.data.user));
        navigate("/dashboard");
       
      } catch (error) 
      {
        setErrorMessage("Register failed. Please try again.");
        console.log(error.message);
      }
  }
  const logOutHandle = async ()=>
  {
    try 
    {
      const logOutVal = await axios.post("http://localhost:8000/auth/logout");
      dispatch(LogOutUser());
      
    } catch (error) {
      console.log(error.message); 
    }
  }

  //Handling UserName,email and password States

  const handleUser = (e)=>
  {
    setUserName(e.target.value);
  }

  const handleEmail = (e)=>
    {
      setEmail(e.target.value);
    }

    const handlePassword = (e)=>
      {
        setPassword(e.target.value);
      }

      const handleToogle = ()=>
      {
        setIsSignUp(!isSignup);
      }
      const handleSubmit = (e)=>
      {
        e.preventDefault();
        if(isSignup)
        {
          registerHandle();
        }
        else
        {
          loginHandle();
        }
      }

  return (
    <div className="bg-white relative lg:py-20">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl xl:px-5 lg:flex-row">
        <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
          <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
            <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
              <img src="https://res.cloudinary.com/macxenon/image/upload/v1631570592/Run_-_Health_qcghbu.png" className="btn-" />
            </div>
          </div>
          <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center leading-snug font-serif">{isSignup ? "Sign up for an account" : "Sign In Please" }</p>
              <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                {
                  isSignup ? (
                    <div className="relative">
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Username</p>
                  <input placeholder="John" type="text" className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                  value={userName}
                  onChange={handleUser}
                  
                  />
                </div>
                  ):
                  
                  (<div></div>)
                }
                <div className="relative">
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Email</p>
                  <input
                  value={email}
                  onChange={handleEmail} 
                  placeholder="123@ex.com" type="email" className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md" />
                </div>
                <div className="relative">
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Password</p>
                  <input
                  value={password}
                  onChange={handlePassword}
                   placeholder="Password" type="password" className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md" />
                </div>
                <div>
                  <p onClick={handleToogle}>{isSignup ? "Already a member please signIn" : "Please Register First"}</p>
                </div>
                <div className="relative">
                  <a className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500 rounded-lg transition duration-200 hover:bg-indigo-600 ease
              
                  "
                  onClick={handleSubmit}
                  >Submit</a>
                </div>
              </div>
            </div>
            <svg viewBox="0 0 91 91" className="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-yellow-300 fill-current">
              {/* Ensure SVG content is complete */}
            </svg>
            <svg viewBox="0 0 91 91" className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-indigo-500 fill-current">
              {/* Ensure SVG content is complete */}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
