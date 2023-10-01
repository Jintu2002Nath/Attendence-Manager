// import "./List.css";
import Card from "./Card";
import {apiConnector} from "../../../../Services/apiConnector";
import { lecture_api } from "../../../../Services/apis";
import {toast} from "react-hot-toast";
import { useEffect, useState } from "react";

const Showdetails=()=>{

    const path=window.location.href;
    const courseId=path.split("/")[4];
    console.log(courseId);
    const[studentArray,setStudentArray]=useState([]);
    const [student,setStudent]=useState([]);
    const [data,setData]=useState();

    const fetchStudent=async()=>{
        try{
            toast.loading("Loading...");
            const res=await apiConnector("POST",lecture_api.SHOWALLLECTURE,{courseId});
            console.log("response is",res);
            setData(res);
            console.log(res);
            setStudent(res?.data?.course?.enrollStudent);
            toast.dismiss();
        }
        catch(error){
            toast.dismiss();
            toast.error("Network error...");
        }
    }


    useEffect(()=>{
        fetchStudent();
    },[courseId]);



    return (
        <div className="id-wraper">
        <div className="id-class-head">
            <div className="id-head">
                <p>Student details</p>
                <p>Remove form class</p>
            </div>
          <div className="id-reverse">
          { student?.length==0?
          <div className="id-ncc">
             <p>No Student Enrolled</p>
          </div>
           : student?.map((e,index)=>(
                <Card e={e} data={data} key={index} setStudentArray={setStudentArray} studentArray={studentArray}/>
            ))
            }
          </div>
        </div>
            
    </div>
    )
}


export default Showdetails;