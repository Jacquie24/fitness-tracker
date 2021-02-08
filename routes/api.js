const router = require("express").Router();
const db = require("../models");
const path = require("path");

// HTML ROUTES

router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", (req, res) => {
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

// Get most recent workout (Corresponds to getLastWorkout in /public/api.js)
router.get("/api/workouts", (req, res) => {
    db.Workout.findOne()
    .sort({day: -1})
    .then(oneWorkout => {
        res.json(oneWorkout);
    });
});

// Get last seven workouts (Corresponds to getWorkoutsInRange in /public/api.js)
router.get("/api/workouts/range", (req, res) => {
    db.Workout.find()
    .sort({day: -1}).limit(7)
    .then(lastWorkouts => {
        res.json(lastWorkouts);
    });
});

// Add a new workout (Corresponds to createWorkout in /public/api.js)
router.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then((newWorkout) => {
      res.json(newWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

//Update workout by ID (Corresponds to addExercise in /public/api.js)
router.put("/api/workouts/:id", (req, res) => {
  const workoutId = req.params.id;

  db.Workout.findByIdAndUpdate(workoutId, { $push: { exercises: req.body } })
    .then((addWorkout) => {
      res.json(addWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
