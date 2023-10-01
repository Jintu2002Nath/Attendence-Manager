import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Studentdashboard from "./Student/Studentdash";
import Instructordasbboard from "./Instructor/Instructordasbboard";
import JEClogo from "../Assets/Image/JEC_LOGO.jpg";
import "./Home.css";

const Home=()=>{
    const navigate=useNavigate();
    const user=useSelector((state)=>state.auth.user);
    console.log(user);
    return (
        <div>
           {!user && <div className="Home-wrp">
                <div className="home-inner">
                    <div>
                        <img className="home-img" src={JEClogo}/>
                    </div>
                    <p className="home-name">Jorhat Enginnering College</p>
                    <p className="home-sub">Attendance Management System</p>
                </div>    
               <div className="home-btn">
               <Link className="Link" to="/login">Login</Link>
                <Link className="Link lnk" to="/Signup">Signup</Link>
                </div>
            </div>}
            {user?.accountType=="Student" && <Studentdashboard/>}
            {user?.accountType=="Instructor" &&<Instructordasbboard/>}
        </div>
    )
}

export default Home;