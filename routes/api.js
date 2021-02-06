const router = require("express").Router();
const db = require("../models");
const path = require("path");


// HTML ROUTES

router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

// API ROUTES

// Get all workouts
router.get("/api/workouts", (req, res) => {
  db.Workout.find()
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Add a new workout
router.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then((newWorkout) => {
      res.json(newWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

//Update workout by ID
router.put("api/workouts/:id", (req, res) => {
  const workoutId = req.params.id;

  db.Workout.findByIdAndUpdate(workoutId, {
    $push: { exercises: req.body },
  })
    .then((workout) => {
      res.json(workout);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
