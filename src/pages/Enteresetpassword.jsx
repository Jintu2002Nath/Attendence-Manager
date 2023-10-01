import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import "./Enterpasssword.css";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { auth_apis } from "../Services/apis";
import {apiConnector} from '../Services/apiConnector';
import Loading from "../Components/Common/Loding";
import { setLoading } from "../Reducer/Slices/Auth";

const  Enterresetpassword=()=>{
    const [password,setPassword]=useState({
        new:"",
        confirm:"",
    });
    function changeHandeler(e){
            setPassword((prv)=>(
              {  ...prv,
                [e.target.name]:e.target.value,}
            ))
          
    }

    const dispatch=useDispatch();
    const loading=useSelector((state=>state.auth.loading));
    
   
    const navigate=useNavigate();

    const url=useLocation();
    const token=url.pathname.split("/")[3];


   async function clickHandeler(){
        if(password.new!=password.confirm){
          toast.error("Password and confirm password not match");
           console.log("Password and confirm password not match");
        }
        else{
           const data={
            password:password.new
            ,confirmPassword:password.confirm
            , resetToken:token
           } 
          console.log(data);
          try{
            dispatch(setLoading(true));
            toast.loading("Loading...");
            const res=await apiConnector("POST",auth_apis.RESETPASSWORD,data);
            console.log(res);
            toast.dismiss();
            toast.success("Password reset successfully...");
            navigate("/login");
          }
          catch(error){
            console.log(error);
            toast.dismiss();
            toast.error("Token time expired...")
          }
          dispatch(setLoading(false));
        }
    }
    return (
        <div className="e-wraper">
          {loading ?
            (<Loading/>):
            ( <div className="er">
                <div className="err" >
               <div className="er-div1">Choose new password</div>
               <div className="er-div2">Almost done. Enter your new password and youre all set.</div>
             
               <from>
               <div className="er-div3">New Password<span>*</span></div>   
               <input placeholder="Enter Password" type="text" value={password.new}  name="new"   onChange={(e)=>changeHandeler(e)} required/>
               <div className="er-div3 elpass">Confirm New Password<span>*</span></div>   
               <input  placeholder="Confirm Password" type="text" value={password.confirm} name="confirm"  onChange={(e)=>changeHandeler(e)} required/>
               <div className="er-submit" onClick={clickHandeler}>Submit</div>
               </from>
               <Link to="/login">
                   <div className="er-div4">
                       <BiArrowBack/>
                       <p>Back to Login</p>
                   </div>
               </Link>
               </div>
           </div> )
          }

</div>
    )
    
}


export default Enterresetpassword;