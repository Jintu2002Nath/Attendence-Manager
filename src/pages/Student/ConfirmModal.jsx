import { useState } from "react";
import "./ConfirmModal.css";
import { toast } from "react-hot-toast";
import {MdOutlineClose} from "react-icons/md";

const ConfirmModal=({setCon,setJoin,user})=>{

    const [rollnum,setRollnum]=useState();

    function clickHandeler(){
     if(!rollnum){
        toast.error("Enter Roll Number");
        return;
     }   

     else  if(rollnum==user.rollno){
        setCon(false);
        setJoin(true);
    }
    else{
        toast.error("Please Check Roll Number!")
    }
        
    }


    return (
        <div className="ccm-wraper">
           
            <div className="ccm-main">
                <div className="ccm-warn"><p>Warning</p><MdOutlineClose onClick={()=>setCon(false)} className="ccm-cls"/></div>
                <div className="ccm-body">
                <p className="ccm1">Hey, {user?.firstName}</p>
                <p className="ccm-2">Please Check your details once again.Because once you enrolled in any Course 
                        you can't update or delete your profile. 
                </p>
                <p className="ccm-3">Roll Number: {user?.rollno}</p>
                <p className="ccm-4">Full name: {user?.firstName} {user?.lastName}</p>
                <p className="ccm-5">Email: {user?.email}</p>
                <p className="cc-6">If you find your details is wrong then please delete account and create another account.
                </p>
                <p className="ccn-entr">Enter Roll Number<span>*</span></p>
                <input className="ccm-input" name="roll" value={rollnum} onChange={(e)=>setRollnum(e.target.value)} type="number"/>
                <div>
                <button className="ccm-btn" onClick={clickHandeler}>Verified</button>
                </div>
                </div>
            </div>
            <div className="ccm-back"></div>
        </div>
        
    )
}

export default ConfirmModal;