import { useRef, useState, useEffect } from "react";

import styled from "styled-components";
import axios from "axios";
import "./LoginSignUp.css";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AuthContext   from "../../hooks/AuthProvider";
import { useContext } from "react";
import Snackbar from '@mui/material/Snackbar';

// const REGISTER_URL = 'http://itsoneforall.herokuapp.com/api/store';
const Errors = styled.small`
  display: flex;
  margin-left: 10px;
  color: red;
`;

const Form = styled.form`
  background-color: #ffffff;

  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
  position: absolute;
  top: 90px;
`;
const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

const LoginSignUp = () => {
  const navigate = useNavigate();
 
  
  // const [errorlog, setErrorlog] = useState(true);
  // const [errorsign, setErrorsign] = useState(true);
 


  const [SignUp, Setsignup] = useState("");
  // const handalingErrorslog = () => {
  //   setErrorlog(true);
  //   setErrorsign(false);
  // };
  // const handalingErrorssign = () => {
  //   setErrorlog(false);
  //   setErrorsign(true);
 
  // };

  //  switch between log in and sin up
  const SinUpSwich = () => {
    Setsignup("right-panel-active");
  };
  //switch between log in and sin up
  const Login = () => {
    Setsignup("");
  };
  const {search,ip} = useContext(AuthContext)

  //for handle validation 
  const [first, setfirst] = useState("")
  const [second, setsecond] = useState("")
  const [third, setthird] = useState("")
  const [forth, setforth] = useState(second)
  const userRef = useRef();
  const errRef = useRef();
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [cpwd, setCpwd] = useState("");
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [name, pwd, email]);
  useEffect(() => {
    setfirst("")
    setsecond("")
    setthird("")
    setforth("")
  }, [name, pwd, email]);
  const handleLogin = async (e) => {
    e.preventDefault();
    // const datae = {
    //   email: email,
    //   password: pwd,
    // };
    const formData = new FormData();
    // formData.append("name", name);
    formData.append("email", email);
    formData.append("password", pwd);
  

    console.log(formData);
    await axios
      .post(`${ip}/api/login`, formData)
      .then(({ data }) => {
        console.log(data.user.user_type);
        const accessToken = data.access_token;
        const userID = data.user.id;
        const userName = data.user.name;
        localStorage.setItem('accessToken',accessToken)
        localStorage.setItem('userID',userID)
       localStorage.setItem('userName',userName)

       localStorage.setItem('userType',data.user.user_type)

        setEmail('');
        setPwd('');
        setState({...state,open:true})
       if(data.user.user_type=="USR")
       {
        localStorage.setItem('userType',data.user.user_type)
         setTimeout(()=>{
          navigate('/')
        },3000)
       }
       else{
        setTimeout(()=>{
          navigate('/Admin')
        },3000)
       }
        // setTimeout(()=>{
        //   navigate('/')
        // },3000)
       
      })
      .catch(({ response }) => {
        if(response.status==401){
          if(response.data.errors.email)
          setsecond(response.data.errors.email);
          if(response.data.errors.password)
          setthird(response.data.errors.password)
        }
       
      }
      );
    
  };
  const handleSignup = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", pwd);
    formData.append("password_confirmation", cpwd);
    formData.append("phone_number", "0982241265");
    formData.append("age", 12);


  

    console.log(formData);
    await axios
      .post(`${ip}/api/store`, formData)
      .then(({ data }) => {
        console.log(data.access_token);
        const accessToken = data.access_token;
        const userID = data.user.id;
        const userName = data.user.name;

        localStorage.setItem('accessToken',accessToken)
        localStorage.setItem('userID',userID)
        localStorage.setItem('userName',userName)
       
        setEmail('');
        setPwd('');
        setState({...state,open:true})
       
        setTimeout(()=>{
          navigate('/')
        },3000)
       
      })
      .catch(({ response }) => {
        if(response.status==422){
          if(response.data.error.name){
            setfirst(response.data.error.name)
          }
          if(response.data.error.email){
            setsecond(response.data.error.email)
          }
          if(response.data.error.password){
            setthird(response.data.error.password)
          }
          if(response.data.error.password){
            setforth(response.data.error.password)
          }
    
          
        }
       
      }
      );
    
  };
  return (
    <div className="containerWrraper">
       <Snackbar
       
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        
        message="Welcome to our store"
        key={vertical + horizontal}
      />
      <div className={`containere ${SignUp}`} id="containere">
        <div className="form-container sign-up-container">
          {/* ///////////////////////Register///////////////// */}
          <Form onSubmit={handleSignup}>
            <h1 className="h1">Create Account</h1>

            <span className="span">Enter your email for registration</span>
            <Input
              className="input"
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              placeholder="Enter your name"
            />
          
              <Errors>{first}</Errors>
         
            <Input
             className="input"
             type="text"
             id="useremail"
           
             autoComplete="off"
             required
             placeholder="Enter your Email"
             onChange={(e) => setEmail(e.target.value)}
             value={email}
             
            />
              <Errors>{second}</Errors>
            
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            
              <Errors>{third}</Errors>
            
            <Input
              type="password"
              
              id="password"
            
              onChange={(e) => setCpwd(e.target.value)}
              value={cpwd}
              required
              placeholder="Confirm your password"
            />
           
              <Errors>{forth}</Errors>
        

            <button onClick={handleSignup} className="button">
              Sign Up
            </button>
          </Form>
        </div>
        <div className="form-container sign-in-container">
          {/* ///////////////////////Login///////////////// */}
          <Form onSubmit={handleLogin}>
            <h1 className="h1">Sign in</h1>

            <span className="span"> Use your account</span>
            <Input
              className="input"
              type="text"
              id="useremail"
              ref={userRef}
              autoComplete="off"
              required
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <Errors>{second}</Errors>

            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
           
       <Errors>{third}</Errors>
            
        
            <button onClick={handleLogin} className="button">
              Sign In
            </button>
          </Form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="h1">Welcome Back!</h1>
              <p className="p">
                To keep connected with us please login with your personal info
              </p>
              <button onClick={Login} className="button ghost" id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="h1">Hello, Friend!</h1>
              <p className="p">
                Enter your personal details and start journey with us
              </p>
              <button onClick={SinUpSwich} className="button ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
