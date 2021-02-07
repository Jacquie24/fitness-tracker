const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({

    day: {
        type: Date 
    },
  
    exercises: [
        {
          type: {
            type: String,
          },
          name: String,
          duration: Number,
          weight: Number,
          reps: Number,
          sets: Number,
          distance: Number
        }
      ]
    },
    {
      toJSON: {
        virtuals: true,
      },
    });

    const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;