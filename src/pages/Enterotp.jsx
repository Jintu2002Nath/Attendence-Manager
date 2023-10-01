
import { useSelector,useDispatch } from "react-redux";
import "./Otpveri.css";
import { BiArrowBack,BiReset } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
// import { sendotp,signup } from "../services/operations/auth";
import Loading from "../Components/Common/Loding";
import { useState } from "react";
import OtpInput from 'react-otp-input'
import {apiConnector} from "../Services/apiConnector";
import { auth_apis } from "../Services/apis";
import { toast } from "react-hot-toast";

const Otp=()=>{
    // const dispatch=useDispatch();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
    const data=useSelector((state)=>(state.auth. signupData));
    const [otp,setOtp]=useState("");

    var mail="";
    if(data){
    const {type,firstname,lastname,email,password,confirmpassword}=data;
     mail=email;
    }

    

    if(!data){
        mail="You";
   }
   

   async function resendHandeler(){
    // e.preventDefault();
    // dispatch(setSignupData(data));
    setLoading(true); 
    // call function send otp for backend
    try{
        toast.loading("Loading...");
        const res= await apiConnector("POST",auth_apis.SENDOTP,{email:data.email})
        console.log(res);
        setLoading(false);
        navigate("/otp");
        console.log(data);
        toast.dismiss();
        toast.success("Send OTP...");
    }
    catch(error){
        toast.dismiss();
        toast.error(error?.response?.data?.message);
        setLoading(false);
    }
    }

   async function verifyHandeler(){
       setLoading(true);
    console.log("der r...................")
        console.log("api is",auth_apis.SIGNUP)
       //call function for verification
       const senddata={
        firstName:data.firstname,  
        lastName:data.lastname,
        email:data.email, 
        password:data.password, 
        confirmPassword:data.confirmpassword, 
        accountType:data.type,
        otp:otp,
        rollno:data.rollno,
        insToken:data.token
       }
       try{
        toast.loading("Loading...");
        const res= await apiConnector("POST",auth_apis.SIGNUP,senddata);
       console.log(res?.response?.data?.message );
       setLoading(false);
       toast.dismiss();
       toast.success("Verified...");
       navigate("/login");
       }
       catch(error){
        setLoading(false);
        toast.dismiss();
        toast.error(error?.response?.data?.message);
       }
    }
   
   
   return <div className="o-wraper">
            {    loading?<Loading/>:(
                <div className="o-scl">
                <h1>Verify Email</h1>
                <p>A verification code has been sent to {mail}. Enter the code below</p>

                                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        className="otpinputwraper"
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} className="otpinput" />}
                        />

                <button onClick={verifyHandeler}>Verify Email</button>
                <div className="o-last">
                        <Link to="/login">
                            <div className="o-left">
                            <BiArrowBack/>
                            <p>Back to Login</p>
                            </div>
                        </Link>       
                        <div className="o-right">
                            <BiReset/>
                            <p onClick={resendHandeler}>Resend it</p>
                        </div>
                    </div>   
                </div>
            
                )}
              </div>
}

export default Otp;