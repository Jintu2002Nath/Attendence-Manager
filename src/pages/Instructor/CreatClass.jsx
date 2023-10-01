import { useState } from "react";
import "./CreatClass.css"
import {AiOutlineClose} from "react-icons/ai";
import {LuCopy} from "react-icons/lu";
import { toast } from "react-hot-toast";
import { apiConnector } from "../../Services/apiConnector";
import {class_api} from "../../Services/apis";
import { useDispatch, useSelector } from "react-redux";
import {setLoading, setUser} from "../../Reducer/Slices/Auth";
import {useNavigate } from "react-router-dom";

const CreatClass=({setCreat})=>{
         const navigate=useNavigate();
        const [token,setToken]=useState();
        const dispatch=useDispatch();
        const user=useSelector((state)=>state.auth.user);
        const [classname,setClassname]=useState("");
        function copy(){
            toast.success("Copied...")
            console.log("My function");
            var copyText = document.getElementById("myInput");
            copyText.select();
            copyText.setSelectionRange(0, 99999); 
            navigator.clipboard.writeText(copyText.value); 
          }

        function changeHandeler(e){
            setClassname(e.target.value);
        }  
        
        async function creatClass(){
            if(classname==""){
                toast.error("Class name is required...");
            }
            try{
                dispatch(setLoading(true));
                const data={
                    token:user?.token,
                    courseName:classname
                }
                toast.loading("Loading...")
                const res=await apiConnector("POST",class_api.CREATCLASS,data);
                dispatch(setUser(res?.data?.updateUser));
                localStorage.setItem("user", JSON.stringify(res?.data?.updateUser))
                toast.dismiss();
                toast.success("Course Created...")
                console.log(res?.data?.updateUser);
                setToken(res?.data?.newCourse?.token);
             
                
            }
            catch(error){
                toast.dismiss();
                console.log(error);
                toast.error("Network error...")
            }
            dispatch(setLoading(false));
        }  
          
    return (
        <div className="cc-main">
            <div className="cc-wraper">
            <div className="cc-classname">
                <div className="cc-close">
                    <div className="cc-creat">Creat Class</div>
                    <AiOutlineClose onClick={()=>setCreat(false)}/></div>
                {token?<p>Class token</p>:
                <p>Class Name<span>*</span></p>}
                {token?<div >
                    <input type="text" value={token} id="myInput"/>
                </div>:
                <input placeholder="Enter class name" value={classname} onChange={(e)=>changeHandeler(e)} type="text"/>}
               {token? 
                    <div className="cc-twbtn">
                        <div className="cc-submit" onClick={copy}><LuCopy/>Copy</div>
                         <div className="cc-submit" onClick={()=>setCreat(false)}>Close</div>
                    </div>    
                :<div className="cc-submit" onClick={creatClass}>Submit</div>}
            </div>
          </div>
          <div className="cc-bck"></div>
        </div>
    )
}

export default CreatClass;