import { TiTick} from "react-icons/ti";
import {AiOutlineClose} from "react-icons/ai";
import "./ListCard.css";
import { useEffect, useState } from "react";

const ListCard=({e,data,setStudentArray,studentArray})=>{


    const path=window.location.href;
    const flg=path.split("/")[7];    
    const lectureId=path.split("/")[6];

    const [color,setColor]=useState();
    const [totalLecture,setTotallecture]=useState(data?.data?.course?.lectures?.length);

    const classId=data?.data?.course?._id;
    const [presentArray,setPresentarray]=useState(e?.presentClasses);

    const [attendClass,setAttendClass]=useState(presentArray.filter((e)=>e==classId).length);
    const[atndflg,setflg]=useState(true);

    const percentage=Math.floor(attendClass/totalLecture*100);
    const [absent,setAbsent]=useState([]);

    function rightHandeler(){

        if(flg=="t")return;

     if(!studentArray.includes(e?._id)){   
    setStudentArray([...studentArray,e?._id]);
    if(atndflg){
        var a=attendClass+1;
       setAttendClass(a);
       setflg(false);
    }
    else{
        var a=attendClass+2;
       setAttendClass(a);
    }
}
    
    setAbsent(absent?.filter((el)=>el!=e?._id));
 

   

 
    
    }



    function cancelHandeler(){
        if(flg=="t")return;
        setStudentArray(studentArray?.filter((el)=>el!=e?._id));
   
        if(!absent.includes(e?._id)){
            setAbsent([...absent,e?._id]);
            if(atndflg){
                var a=attendClass;
               setAttendClass(a);
               setflg(false);
            }
            else{
                var a=attendClass-2;
               setAttendClass(a);
            }
         
        }

    
    }


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

//previous classs student present

   useEffect(()=>{
    if(flg=="t"){
        var alllec=data?.data?.course?.lectures;
        var spcficlec=alllec?.filter((e)=>e?._id==lectureId);
      
            setStudentArray(spcficlec[0]?.studentAttend)
       
           
    }
   },[data])

    return (
        <div className="alc-wraper">
            <div className="alc-1">
                <div>
                <img className="alc-img" src={`https://api.dicebear.com/5.x/initials/svg?seed= ${e?.firstName[0]} ${e?.lastName[0] }`}/>
                </div>
                <div className="alc-name-roll">
                    <h1>{e?.firstName} {e?.lastName}</h1>
                    <p>{e?.rollno}</p>
                </div>
         </div>  
                <p className="alc-percentage"><p className={color}>{percentage<0?0:percentage}%</p></p>
                <div className="alc-btn">
                    <button className={studentArray?.includes(e?._id)?`greenn`:""} onClick={rightHandeler}><TiTick/></button>
                    {flg=="t"?
                        <button className={!studentArray?.includes(e?._id)&& `redd`} onClick={cancelHandeler}><AiOutlineClose/></button>
                    :<button className={absent.includes(e?._id)&& `redd`} onClick={cancelHandeler}><AiOutlineClose/></button>}
                </div>
           
        </div>
    )
}

export default ListCard;