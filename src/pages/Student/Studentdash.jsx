import {IoIosAdd } from "react-icons/io";
import { useState } from "react";
import { useSelector } from "react-redux";
import JoinModal from "./JoinModal";
import StudentCard from "./StudentCard";
import ConfirmModal from "./ConfirmModal";
import "./StudentDash.css";

const StudentDash=()=>{
    const [join,setJoin]=useState(false);
    const [con,setCon]=useState(false);
    const user=useSelector((state)=>state.auth.user);
    console.log(user);
    console.log(user?.enrolledCourses);

    function joinHandeler(){
        if(user?.enrolledCourses.length==0){
            setCon(true);
        }
        else
        {setJoin(true);}
    }

    return (
        <div className="id-wraper">
            <h1 className="sd-name">Hey, {user?.firstName}.</h1>
            <button className="sd-join" onClick={joinHandeler}>Join Class</button>
            <div className="id-class-head">
                <div className="id-head">
                    <p>Class Name</p>
                    <p>Attendence</p>
                    <p>Total Class</p>
                </div>
              <div className="id-reverse">
              {
                user?.enrolledCourses?.map((card)=>(
                    <StudentCard card={card}/>
                ))
              }
              </div>
            </div>
           {
            join && <JoinModal setJoin={setJoin}/>
           }{
            con &&
            <ConfirmModal setCon={setCon} setJoin={setJoin} user={user}/>
           }
        </div>
    )
}

export default StudentDash;