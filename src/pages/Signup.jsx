import { useState } from "react"
import Loading from "../Components/Common/Loding"
import {AiFillEyeInvisible , AiFillEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setSignupData } from "../Reducer/Slices/Auth";
import { useNavigate } from "react-router-dom";
import { auth_apis } from "../Services/apis";
import {apiConnector} from "../Services/apiConnector";
import {toast} from "react-hot-toast";
import "./Signup.css";

const Signup=()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [loading,setLoading]=useState(false);
    const [data,setData]=useState({
        type:"Student",
        firstname:"",
        lastname:"",
        email:"",
        password:"",
        confirmpassword:"",
        token:"",
        rollno:"",
    });
    const [radio,setRadio]=useState("Instructor");
    const [btn1,setBtn1]=useState(false);
    const [btn2,setBtn2]=useState(false);


    function radioHandeler(value){
        if(value=="Student"){
            setRadio("Instructor");
        }
        if(value=="Instructor"){
            setRadio("Student");
        }
        setData((prv)=>({
            ...prv,
            type:value,
        }))
    }


    const submitHandeler=async(e)=>{
        e.preventDefault();
        dispatch(setSignupData(data));
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

    function changeHandeler(e){
        setData((prv)=>({
            ...prv,
            [e.target.name]:e.target.value,
        }))
    }



    return (
        <div>{loading?(<Loading/>):
        (<div className="s-wraper">
           
           <form className="s-from" onSubmit={submitHandeler}>
                    <div className="s-radio">
                        <span className={`${radio=="Student"?"":("s-active")}`} onClick={()=>{radioHandeler("Student")}}>Student</span>
                        <span className={`${radio=="Instructor"?"":("s-active")}`} onClick={()=>{radioHandeler("Instructor")}}>Instructor</span>  
                    </div>     
                    <div className="s-name">
                        <div>
                            <p className="s-firstName">First Name<span>*</span></p>
                            <input type="text" className="text" placeholder="First name" required name="firstname" value={data.firstname} onChange={(e)=>changeHandeler(e)}  ></input>
                        </div>
                        <div>
                        <p className="s-firstName">Last Name<span>*</span></p>
                            <input type="text" className="text" placeholder="Last name" required name="lastname" value={data.lastname} onChange={(e)=>changeHandeler(e)}></input>
                        </div>
                    </div>
                     {/* //email */}
                     <div className="s-frm-div">
                    <p className="s-emailtext">Email Address <span>*</span></p>
                    <input className="input" name="email"  type="email" required value={data.email} onChange={(e)=>changeHandeler(e)} placeholder="Enter email address"/>
                    </div>
                    {/* Token */}
                    {data.type=="Instructor" ? <div className="s-frm-div">
                        <p className="s-emailtext">Instructor Token<span>*</span></p>
                        <input className="input" name="token"  required value={data.token} onChange={(e)=>changeHandeler(e)} placeholder="Enter token"/>
                    </div>:
                    <div className="s-frm-div">
                    <p className="s-emailtext">Roll Number<span>*</span></p>
                    <input className="input" name="rollno"  type="number" required value={data.rollno} onChange={(e)=>changeHandeler(e)} placeholder="Enter roll number"/>
                    </div>}
                    {/* password */}
                    <div className="s-name">
                        <div>
                            <p className="s-firstName">Create Password<span>*</span></p>
                            <div className="password-div-input">
                            <input  type={!btn1?"password":"text"} placeholder="******" required name="password" value={data.password} onChange={(e)=>changeHandeler(e)}></input>
                             <div className="pass-eye" onClick={()=>setBtn1(!btn1)} >
                                {
                                    !btn1?<AiFillEyeInvisible/>:<AiFillEye />
                                }
                             </div>
                            </div>
                        </div>
                        <div>
                        <p className="s-firstName">Confirm Password<span>*</span></p>
                             <div className="password-div-input">
                                 <input type={!btn2?"password":"text"} placeholder="******" required name="confirmpassword" value={data.confirmpassword} onChange={(e)=>changeHandeler(e)}></input>
                                 <div className="pass-eye" onClick={()=>setBtn2(!btn2)} >
                                {
                                    !btn2?<AiFillEyeInvisible/>:<AiFillEye />
                                }
                             </div>
                            </div>
                        </div>
                    </div>
                    <button>Sign Up</button>
           </form>
           
        </div>)}
        </div>
    )
}

export default Signup;