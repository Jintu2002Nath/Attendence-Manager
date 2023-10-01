const BASE_URL="http://localhost:4000"

export const auth_apis={
    SENDOTP:BASE_URL+"/api/v1/auth/sendotp",
    SIGNUP:BASE_URL+"/api/v1/auth/signup",
    LOGIN:BASE_URL+"/api/v1/auth/login",
    RESETPASSWORDTOKEN:BASE_URL+"/api/v1/auth/resetpasswordtoken",
    RESETPASSWORD:BASE_URL+"/api/v1/auth/resetpassword",
    DELETE_API:BASE_URL+"/api/v1/auth/deleteAccount"
}

export const class_api={
    CREATCLASS:BASE_URL+"/api/v1/course/createcourse",
    REGENERATETOKEN:BASE_URL+"/api/v1/course/regenerateToken",
    DELETESTUDENT:BASE_URL+"/api/v1/course/userDeletefromCourse"
}

export const lecture_api={
    CREATELECTURE:BASE_URL+"/api/v1/course/createlecture",
    SHOWLECTURE:BASE_URL+"/api/v1/course/showlecture",
    SHOWALLLECTURE:BASE_URL+"/api/v1/course/showlecture",
    SUBMITATTENDANCE:BASE_URL+"/api/v1/auth/updateAttendence"
}

export const student_api={
    JOINCLASS:BASE_URL+"/api/v1/course/joincourse",
    ATTENDANCE:BASE_URL+"/api/v1/auth/attendence"
    // ATTENDANCESUBMIT:BASE_URL+
}

