import { Link } from "react-router-dom";
import "./Class.css";
import {apiConnector} from "../../Services/apiConnector";
import { lecture_api } from "../../Services/apis";
import { useEffect, useState } from "react";


const Class=({classs})=>{
    console.log(classs?.enrollStudent);
    const [ress,setRes]=useState();
    const updatee=async()=>{
        try{
            console.log(classs);
            const res=await apiConnector("POST",lecture_api.SHOWALLLECTURE,{courseId:classs?._id});
            console.log(res?.data?.course?.enrollStudent.length);
            setRes(res);
        }
        catch(error){

        }
    }

    useEffect(()=>{
        updatee();
    },[])
    return (
        <Link to={`/instructor/lecture/${classs._id}`}>
            <div className="cls-wraper">
            <p>{classs?.courseName}</p>
            <p>{ress?.data?.course?.enrollStudent.length}</p>
            <p>{classs?.lectures?.length}</p>
            </div>
        </Link>
    )
}


export default Class;