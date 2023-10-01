import { useState } from "react";
// import "./Login.css";
import {AiFillEyeInvisible , AiFillEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {toast } from "react-hot-toast";
import Loading from "../Components/Common/Loding";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { apiConnector } from "../Services/apiConnector";
import { auth_apis } from "../Services/apis";
import { setUser,setLoading } from "../Reducer/Slices/Auth";
import "./Login.css";

const Login=()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [loading,setLoading]=useState(false);
    const [vis,setVis]=useState(false);
    const [type,setType]=useState("password");


    const [data,setData]=useState({
        email:"",
        password:"",
    })

    function changeHandeler(e){
        
        setData((pre)=>({
            ...pre,
            [e.target.name]:e.target.value
        }))
      
    }


    function visHandeler(){
       setVis(!vis);
       vis?(setType("password")):setType("text");
    }

   async function submitHandeler(e){
    e.preventDefault();
 
       try{
      
        toast.loading("Loading...")
        const res=await apiConnector("POST",auth_apis.LOGIN,data);
        console.log(res.data.user);
        dispatch(setUser(res.data.user))
        localStorage.setItem("user", JSON.stringify(res.data.user))
        toast.dismiss();
        toast.success("Login...")

        navigate("/")
       }
       catch(error){
        toast.dismiss();
        console.log(error.response.data.message)
        toast.error(error.response.data.message);
       }

    }

    return (
        loading?(<Loading/>):
        <div className="l-wraper">
            <div className="l-left">
                <h1>Welcome Back</h1>
                <from className="l-from">
                    <div className="l-frm-div">
                    <p className="l-emailtext">Email Address <span>*</span></p>
                    <input className="input" name="email" onChange={(e)=>changeHandeler(e)} value={data.email} placeholder="Enter email address"/>
                    </div>
                    <div className="l-frm-div">
                    <p className="l-emailtext" >Password<span> *</span></p>
                    <div className="l-pass-span">
                        <input className="input" name="password" onChange={(e)=>changeHandeler(e)} value={data.password} type={type} placeholder="Password"/>
                        <div className="l-eye" onClick={visHandeler}>
                            {!vis?(<AiFillEyeInvisible />):(  <AiFillEye/>) }
                        </div>
                    </div>
                    <Link to="/resetpassword">
                    <p className="l-forgot">Forgot Password</p>
                    </Link>
                    </div>
                    <button onClick={(e)=>submitHandeler(e)}>Sign In</button>
                </from>
            </div>
        </div>
    )
}

export default Login;