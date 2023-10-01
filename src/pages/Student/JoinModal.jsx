import { useState } from "react";
import "./JoinModal.css"
import {AiOutlineClose} from "react-icons/ai";
import {LuCopy} from "react-icons/lu";
import { toast } from "react-hot-toast";
import { apiConnector } from "../../Services/apiConnector";
import {student_api} from "../../Services/apis";
import { useDispatch, useSelector } from "react-redux";
import {setLoading, setUser} from "../../Reducer/Slices/Auth";

const JoinModal=({setJoin})=>{
        const dispatch=useDispatch();
        const user=useSelector((state)=>state.auth.user);
        const [classtoken,setClasstoken]=useState("");

        function changeHandeler(e){
            setClasstoken(e.target.value);
        }  
        
        async function joinClass(){
            if(classtoken==""){
                toast.error("Class token is required...");
            }
            try{
                toast.loading("Loading...");
                console.log(user.token);
                dispatch(setLoading(true));
              const res=await apiConnector("POST",student_api.JOINCLASS,{
                courseToken:classtoken,
                token:user.token
              })
              localStorage.setItem("user", JSON.stringify(res?.data?.user))
              dispatch(setUser(res?.data?.user));
              console.log(res?.data?.user);
              toast.dismiss();
              toast.success("Join Class");
              setJoin(false);
            }
            catch(error){
                toast.dismiss();
                toast.error(error?.response?.data?.message);
               console.log(error);
            }
            dispatch(setLoading(false));
        }  
          
    return (
        <div className="cc-main">
            <div className="cc-wraper">
            <div className="cc-classname">
                <div className="cc-close">
                    <div className="cc-creat">Join Class</div>
                    <AiOutlineClose onClick={()=>setJoin(false)}/></div>
              
                <p>Enter Class token<span>*</span></p>
                
                <input placeholder="Enter class token" value={classtoken} onChange={(e)=>changeHandeler(e)} type="text"/>
              
                   
                <div className="cc-submit" onClick={joinClass}>Join</div>
            </div>
          </div>
          <div className="cc-bck"></div>
        </div>
    )
}

export default JoinModal;