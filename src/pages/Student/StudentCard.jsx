import { useSelector } from "react-redux";
import { apiConnector } from "../../Services/apiConnector";
import { student_api } from "../../Services/apis";
import { useEffect, useState } from "react";
import "./StudentCrad.css";

const StudentCard=({card})=>{
    // console.log("Course id is",card?._id);
    const user=useSelector((state)=>state.auth.user);
    // console.log("User id is",user._id);
    const [res,setRes]=useState(null);
   
    async function fetchAttendance(){
        try{
            const data={
                courseId:card?._id,
                 userId:user._id
            }
            // console.log(data);
            const ress=await apiConnector("POST",student_api.ATTENDANCE,data);
           setRes(ress);
           console.log(ress);
        //    console.log("response is",res);
        }
        catch(error){

        }
    }

    useEffect(()=>{
        fetchAttendance();
    },[card]);

    return(
        <div className="scc-wraper">
            <p>{card?.courseName}</p>
            <p>{res?.data?.percentage}% ({res?.data?.attendancelength}/{res?.data?.lectureNumber})</p>
            <p>{res?.data?.lectureNumber}</p>
        </div>
    )
}


export default StudentCard;