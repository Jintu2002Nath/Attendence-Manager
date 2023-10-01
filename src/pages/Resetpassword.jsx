import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./resetpasswprd.css";
import { useState } from "react";
import Loading from "../Components/Common/Loding";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {apiConnector} from "../Services/apiConnector";
import { auth_apis } from "../Services/apis";

function  Resetpassword(){

const path= window.location.href;    
const [email,setEmail]=useState("");
const [send,setSend]=useState(false);
const [loading,setLoading]=useState(false);
const dispatch=useDispatch();

function changeHandeler(e){
    setEmail(e.target.value);
}

async function resetHandeler(){
    setLoading(true);
    const data={
        email,path
    }
   try{
    toast.loading("Loading...");
    const res=await apiConnector("POST",auth_apis.RESETPASSWORDTOKEN,data);
    toast.dismiss();
    toast.success("Email send...");
     setSend(true);
   }
   catch(error){
      console.log(error);
      toast.dismiss();
      toast.error(error?.response?.data?.message)
   }
   
    setLoading(false);
}

    return <div className="r">

        { loading?(<Loading/>):
            !send?( <div className="rr">
            <div className="r-div1">Reset your password</div>
            <div className="r-div2">Have no fear. We'll email you instructions to reset your password.</div>
            <div className="r-div3">Email Address<span>*</span></div>
            <from>
            <input placeholder="Enter email address" type="email" value={email}  onChange={(e)=>changeHandeler(e)} required/>
            <div className="r-submit" onClick={resetHandeler}>Submit</div>
            </from>
            <Link to="/login">
                <div className="r-div4">
                    <BiArrowBack/>
                    <p>Back to Login</p>
                </div>
            </Link>
            </div>):(<div className="rr">
            <div className="r-div1">Check email</div>
            <div className="r-div2">We have sent the reset email to</div>
            <div className="r-div2">{email}</div>

            
            <Link to="/login">
                <div className="r-div4">
                    <BiArrowBack/>
                    <p>Back to Login</p>
                </div>
            </Link>
            </div>)
        }

    
    </div>
}

export default Resetpassword;