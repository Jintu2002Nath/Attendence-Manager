import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Enterotp from "./pages/Enterotp";
import Resetpassword from "./pages/Resetpassword";
import Enterresetpasssword from "./pages/Enteresetpassword";
import Home from "./pages/Home";
import Lecture from "./pages/Instructor/Lecture/Lecture";
import List from "./pages/Instructor/AttendanceSheat/List";
import Showdetails from "./pages/Instructor/Lecture/ShowDetails/Showdetails";
import Navbar from "./pages/Navbar/Navbar";
import { useSelector } from "react-redux";
import Loading from "./Components/Common/Loding";



function App() {
  const user=useSelector((state)=>state.auth.user);
console.log("user baby",user)
  const loading=useSelector((state)=>state.auth.loading);

  return (
    <div className="app">{
      user && <Navbar/>
      }
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/otp" element={<Enterotp/>}/>
          <Route path="/resetpassword" element={<Resetpassword/>}/>
          <Route path="/resetpassword/enterpassword/:id" element={<Enterresetpasssword/>}/>
          <Route path="/instructor/lecture/:id" element={<Lecture/>}/>
          <Route path="/instructor/attendance/:courseid/:lectureid/:flg" element={<List/>}/>
          <Route path="/ShowDetails/:id" element={<Showdetails/>}/>
        </Routes>

        {
          loading &&
          
         <div className="ap-loading">
           <Loading />
         </div>
        }
    </div>
    
  );
}

export default App;
