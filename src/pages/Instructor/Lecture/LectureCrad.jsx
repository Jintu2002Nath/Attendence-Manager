import { useState } from "react";
import "./LectureCard.css";
import { Link } from "react-router-dom";

const LectureCard=({lec})=>{
// console.log(lec);

    console.log("Lecture is",lec);
    const classId=lec?.courseId;
    const lectureId=lec?._id;

    return (
        <Link to={`/instructor/attendance/${classId}/${lectureId}/t`} >
            <div className="cls-wraper">
               <div >
               <p>{lec?.createDay}</p>
                <p className="cls-date">{lec?.createDate}/{lec?.createMonth}/{lec?.createYear}</p>
             
               </div>
                <p className="lc-time">{lec?.createHour}:{lec?.createMinute}</p>
                <p>{lec?.studentAttend?.length}</p>
             </div>
        </Link>
    )
}


export default LectureCard;