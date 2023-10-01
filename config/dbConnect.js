const mongoose=require('mongoose')

exports.connect=()=>{

mongoose.connect(process.env.MONGODB_URL,{


    useNewUrlParser: true,
    useUnifiedTopology:true,



})

.then(()=>{


    console.log("DB connection Successfull")
})

.catch((err)=>{

    
        console.log(err);
        console.log("Db Connection error")
        process.exit(1);
    


})




}