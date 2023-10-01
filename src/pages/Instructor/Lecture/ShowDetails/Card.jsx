import { useState,useEffect } from "react";
import "./Card.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import { class_api } from "../../../../Services/apis";
import {apiConnector} from "../../../../Services/apiConnector";
import { toast } from "react-hot-toast";


const Card=({e,data})=>{
    const [flg,setFlg]=useState(true);
    // console.log(data);
    const [color,setColor]=useState();
    const [totalLecture,setTotallecture]=useState(data?.data?.course?.lectures?.length);
    // const totalLecture=0;
    const classId=data?.data?.course?._id;
    const [presentArray,setPresentarray]=useState(e?.presentClasses);

    const [attendClass,setAttendClass]=useState(presentArray.filter((e)=>e==classId).length);

    const percentage=Math.floor(attendClass/totalLecture*100);
   
   useEffect(()=>{
    if(percentage<75 && percentage>65){
        setColor("yellow");
    }

    if(percentage<65){
        setColor("red");
    }

    
    if(percentage>=75){
        setColor("green");
    }
   },[percentage]);


   const removeHandeler=async()=>{
    try{
        toast.loading("Loading...");
        const res=await apiConnector("POST",class_api.DELETESTUDENT,{
            courseId:classId,
            userId:e._id
        })
        toast.dismiss();
        toast.success("Student remove from course...");
        console.log(e);
        setFlg(false);
    }
    catch(error){
        toast.dismiss();
        console.log(error);
    }
   }

    return (
       <div>
        { flg &&
        <div className="alc-wraper  sh-wraper">
        <div className="alc-1">
            <div className="alc-name-roll">
                <h1>{e?.firstName} {e?.lastName}</h1>
                <p>{e?.email}</p>
                <p>{e?.rollno}</p>
                <p className="sh-percentage">Attendance:<p className={color}>{percentage<0?0:percentage}%
                                            </p>
                                            ({attendClass}/{totalLecture})
                                            </p>
            </div>
     </div>  
            <RiDeleteBin5Line onClick={removeHandeler} className="sh-remove"/>
           
    </div>
       }
       </div>
    )
}


export default Card;