const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  createDate: {
    type: Number,
     // default: () => new Date().getDate(), // Using a default function
    // min: 1,
    // max: 31,
  },
  createMonth: {
    type: Number,
    // default: () => new Date().getMonth() + 1,
    // min: 1,
    // max: 12,
  },
  createYear: {
    type: Number,
    // default: () => new Date().getFullYear(),
    // min: 1900,
    // max: 2100,
  },


  createHour: {
    type: Number,
    // default: () => new Date().getHours(),
    // min: 0,
    // max: 23,
  },
  createMinute: {
    type: Number,
    // default: () => new Date().getMinutes(),
    // min: 0,
    // max: 59,
  },

  createDay:{

    type:String,

  //   default: () => {
  //     const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  //     // const today = new Date();
  //     return daysOfWeek[new Date().getDay()];



  // }
},

  studentAttend: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  ],
});

module.exports = mongoose.model("Lecture", lectureSchema);
