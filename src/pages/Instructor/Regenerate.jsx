import { useState } from "react";
import "./CreatClass.css"
import {AiOutlineClose} from "react-icons/ai";
import {LuCopy} from "react-icons/lu";
import { toast } from "react-hot-toast";
import { apiConnector } from "../../Services/apiConnector";
import {class_api} from "../../Services/apis";
import { useDispatch, useSelector } from "react-redux";
import {setUser} from "../../Reducer/Slices/Auth";

const Regenerate=({token,setGenerator})=>{

        const dispatch=useDispatch();
        const user=useSelector((state)=>state.auth.user);
        const [tk,setTk]=useState();
       

        function changeHandeler(){
          
        }
    
        function copy(){
            toast.success("Copied...")
            console.log("My function");
            var copyText = document.getElementById("myInput");
            copyText.select();
            copyText.setSelectionRange(0, 99999); 
            navigator.clipboard.writeText(copyText.value); 
          }
          
    return (
        <div className="cc-main">
            <div className="cc-wraper">
            <div className="cc-classname">
                <div className="cc-close">
                    <div className="cc-creat">Class token</div>
                    <AiOutlineClose onClick={()=>setGenerator(false)}/></div>
                <p>Class token</p>
               
               <div >
                    <input type="text" value={token} onChange={changeHandeler} id="myInput"/>
                </div>
                
           
                    <div className="cc-twbtn">
                        <div className="cc-submit" onClick={copy}><LuCopy/>Copy</div>
                         <div className="cc-submit" onClick={()=>setGenerator(false)}>Close</div>
                    </div>    
               
            </div>
          </div>
          <div className="cc-bck"></div>
        </div>
    )
}

export default Regenerate;