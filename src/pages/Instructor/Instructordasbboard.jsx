import {IoIosAdd } from "react-icons/io";
import Class from "./Class";
import "./Instructordashboard.css"
import { useState } from "react";
import CreatClass from "./CreatClass";
import { useSelector } from "react-redux";
import Footer from "../../Components/Common/Footer";

const Instructordasbboard=()=>{
    const [creat,setCreat]=useState(false);
    
    const user=useSelector((state)=>state.auth.user);
   
    console.log(user?.enrolledCourses);

   

    return (
        <div>
        <div className="id-wraper">
            
            <div className="id-creat" onClick={()=>setCreat(true)}><IoIosAdd/>Create Class</div>
            <div className="id-class-head">
                <div className="id-head">
                    <p>Class Name</p>
                    <p>Student Enrolled</p>
                    <p>Total Class</p>
                </div>
              <div className="id-reverse">
              { user?.enrolledCourses==0?
              <div className="id-ncc">
                 <p>No Class Created</p>
                 <div className="id-creat" onClick={()=>setCreat(true)}><IoIosAdd/>Create Class</div>
              </div>
               : user?.enrolledCourses.map((classs)=>(
                    <Class classs={classs}/>
                ))
                }
              </div>
              
              </div>
              {
                creat && <CreatClass setCreat={setCreat}/>
            }

          
           
        </div>

<Footer/>


   </div>

)
}

export default Instructordasbboard;