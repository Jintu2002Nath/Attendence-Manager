import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import { useState } from "react";
import {setUser} from "../../Reducer/Slices/Auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {apiConnector} from "../../Services/apiConnector";
import {auth_apis} from "../../Services/apis";

const Navbar=()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const user=useSelector((state)=>state.auth.user);
    const [drop,setDrop]=useState(false);


    const logout=()=>{
        localStorage.removeItem("user");
        dispatch(setUser(null));
        setDrop(false);
        toast.success("Log Out...");
        navigate("/");
    }

    const delet=async()=>{
        try{
            toast.loading("Loading...");
            console.log(auth_apis.DELETE_API)
            const res=await apiConnector("POST",auth_apis.DELETE_API,{userId:user._id})
            toast.dismiss();
            console.log(res);
            toast.success("😢Acount deleted...");
            localStorage.removeItem("user");
            dispatch(setUser(null));
            setDrop(false);
            navigate("/");
            
        }
        catch(error){
            console.log(error);
            toast.dismiss();
            toast.error(error?.response?.data?.message );
            setDrop(false);

        }
    }
    
    return(
        <div className="nav-wraper">
            <div className="nav-1">
               {/* <div className="nav-img" > <img className="nav-img" src="https://imgs.search.brave.com/tfNkD3EJ-RnfvFu-2rri6Ux1e2nUl0MGGSeR-EwNUq4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9qZWNh/c3NhbS5hYy5pbi93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxOC8x/MC9zdGlja3ktbG9n/by5wbmc"/></div> */}
                <h1>JORHAT ENGINEERING <h1>COLLEGE</h1></h1>
            </div>
           <div onClick={()=>setDrop(!drop)} className="nav-img-wr"><img className="nav-img" src={`https://api.dicebear.com/5.x/initials/svg?seed= ${user?.firstName[0]} ${user?.lastName[0] }`}/></div> 
           <div>
           {drop && <div className="drop-wraper">
                
                <div className="drop">
                    <div className="drop-cona"></div>
                    <p onClick={logout}>Log out</p>
                    <div className="drop-line"></div>
                    <p onClick={delet}>Delete account</p>
                </div>
           </div>}
           </div>
            
        </div>
    )
}


export default Navbar;