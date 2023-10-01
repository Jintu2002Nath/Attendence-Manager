import "./List.css";
import ListCard from "./ListCard";
import {apiConnector} from "../../../Services/apiConnector";
import { lecture_api } from "../../../Services/apis";
import {toast} from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../../Reducer/Slices/Auth";
import { useDispatch } from "react-redux";

const List=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const path=window.location.href;
    const courseId=path.split("/")[5];
    const lectureId=path.split("/")[6];
    const flg=path.split("/")[7];
    // console.log(flg)
    const[studentArray,setStudentArray]=useState([]);
    const [student,setStudent]=useState([]);
    const [data,setData]=useState();

    const fetchStudent=async()=>{
        try{
            toast.loading("Loading...");
            dispatch(setLoading(true));
            const res=await apiConnector("POST",lecture_api.SHOWALLLECTURE,{courseId});
            console.log("response is",res);
            setData(res);
            setStudent(res?.data?.course?.enrollStudent);
            toast.dismiss();
        }
        catch(error){
            toast.dismiss();
            toast.error("Network error...");
        }
        dispatch(setLoading(false));
    }


    useEffect(()=>{
        fetchStudent();
    },[courseId]);


  async  function submitHandeler(){
        console.log("Studentarray is",studentArray);
        try{
            const res=await apiConnector("POST",lecture_api.SUBMITATTENDANCE,{
                courseId:courseId, 
                studentArray:studentArray,
                 lectureId:lectureId
            })
            console.log("Submit atd res",res);
            navigate(-1);
            console.log("solsu de");
        }
        catch(error){
            console.log(error);
        }
    }


    return (
        <div className="id-wraper">
        <div className="id-class-head">
            <div className="id-head">
                <p>Name</p>
                <p>Attendance</p>
                <p>Action</p>
            </div>
          <div className="id-reverse">
          { student?.length==0?
          <div className="id-ncc">
             <p>No Student Enrolled</p>
          </div>
           : student?.map((e)=>(
               <ListCard e={e} data={data} setStudentArray={setStudentArray} studentArray={studentArray}/>
            ))
            }
          </div>
        </div>
          {flg=="f" &&  <button className="ll-submit" onClick={submitHandeler}>Submit</button>}
    </div>
    )
}


export default List;