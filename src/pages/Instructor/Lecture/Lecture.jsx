import { useNavigate, useParams } from "react-router-dom";
import {IoIosAdd } from "react-icons/io";
import "./Lecture.css";
import { toast } from "react-hot-toast";
import LectureCard from "./LectureCrad";
import { apiConnector } from "../../../Services/apiConnector";
import { lecture_api } from "../../../Services/apis";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../../Reducer/Slices/Auth";
import Regenerate from "../Regenerate";
import { class_api } from "../../../Services/apis";
import Footer from "../../../Components/Common/Footer";


const Lecture=()=>{
    const [generator,setGenerator]=useState(false);
    const [token,setToken]=useState('');
    const dispatch=useDispatch();
    const classid=useParams();
    const navigate=useNavigate();
    const user=useSelector((state)=>state.auth.user);
    const [lecture,setLecture]=useState();
    console.log(classid.id);


    const clickHandeler=async()=>{
        setGenerator(true);
        try{
            dispatch(setLoading(true));
            toast.loading("Loading...");
            const res=await apiConnector("POST",class_api.REGENERATETOKEN,{
                courseId:classid
            })
            console.log(res );
            setToken(res?.data?.newToken)
            toast.dismiss();
            toast.success("Token generated...")
        }
        catch(error){
            toast.dismiss();
            console.log(error);
            toast.error(error.response.data.message )
        }
        dispatch(setLoading(false));
    }






    async function CreatHandeler(){
        
    var creationTime = new Date();

    var  creationDate = creationTime.getDate();
var  creationMonth = creationTime.getMonth() + 1; // Months are zero-based, so add 1 to get the actual month
var creationYear = creationTime.getFullYear();

var creationHours = creationTime.getHours();
var  creationMinutes = creationTime.getMinutes();

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var  creationDayOfWeek = daysOfWeek[creationTime.getDay()]
        try{
            dispatch(setLoading(true));
            const data={courseId:classid.id,
                userId:user._id,
                creationDate,
                creationMonth,
                creationYear,
                creationHours,
                creationMinutes,
                creationDayOfWeek

            };
            console.log(data);
            toast.loading("Loading...");
            const res=await apiConnector("POST",lecture_api.CREATELECTURE,data);
            toast.dismiss();
            toast.success("Lecture Created...");
            console.log(res);
            console.log(res?.data?.course?._id);
            console.log(res?.data?.lecture?._id);
            dispatch(setUser(res?.data?.user));
            localStorage.setItem("user", JSON.stringify(res?.data?.user));
            navigate(`/instructor/attendance/${res?.data?.course?._id}/${res?.data?.lecture?._id}/f`)
        }
        catch(error){
            toast.dismiss();
            console.log(error);
            toast.error(error?.response?.data?.message );
        }
        dispatch(setLoading(false));
    }

    async function fetchLecture(){
        try{
            // dispatch(setLoading(true));
            toast.loading("Loading...");
            const res=await apiConnector("POST",lecture_api.SHOWLECTURE,{courseId:classid.id});
            setLecture(res?.data?.course?.lectures);
            console.log(lecture);
            toast.dismiss();
        }
        catch(error){

        }
        // dispatch(setLoading(false));
    }

    useEffect(()=>{
        fetchLecture();
    },[classid]);


    console.log("Lecture is",lecture);

    return(
        <div>
        <div className="id-wraper">
              <div className="id-2btn">
            <div className="id-creat" onClick={CreatHandeler} ><IoIosAdd/>Create Lecture</div>
            <button className="id-creat" onClick={clickHandeler}>Regenerate Token</button>
            </div>
            <div className="id-class-head">
                <div className="id-head">
                    <p>Date</p>
                    <p>Time</p>
                    <p>Student Present</p>
                </div>
              <div className="id-reverse">
              { lecture?.length==0?
              <div className="id-ncc">
                 <p>No Lecture Created</p>
                 <div className="id-creat" onClick={CreatHandeler} ><IoIosAdd/>Create Lecture</div>
              </div>
               : lecture?.map((lec)=>(
                    <LectureCard lec={lec}/>
                ))
                }
              </div>
            </div>

            {
              generator &&  <Regenerate token={token} setGenerator={setGenerator}/>
            }
            <div className="id-2btn">
                <button onClick={()=>navigate(`/ShowDetails/${classid.id}`)}>Show Details</button>
             
              </div>


        </div>

            <Footer/>
        </div>
    )
}

export default Lecture;