const router = require("express").Router();
const Workout = require("../models/workout.js");


// module.exports = (app) => {

//////////////////////////////////////////////////
//                getLastWorkout
//////////////////////////////////////////////////
// app.get("/api/workouts", (req, res) => {
//   db.Workout.find()
//     .then((dbWorkout) => {
//       res.json(dbWorkout);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
      {
          $addFields: {
              totalDuration: {
                  $sum: ["$exercises.duration"]
              }
          }
      }
  ]
  )
      .then(dbWorkout => {
          res.json(dbWorkout);
      })
      .catch(err => {
          res.status(400).json(err);
      });
});


//////////////////////////////////////////////////
//                createWorkout - new
//////////////////////////////////////////////////
// app.post("/api/workouts", (req, res) => {
//   db.Workout.create({})
//     .then((dbWorkout) => {
//       res.json(dbWorkout);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
      .then(dbWorkout => {
          res.json(dbWorkout);
      })
      .catch(err => {
          res.status(400).json(err);
      });
});



//////////////////////////////////////////////////
//       addExercise to most recent workout
//////////////////////////////////////////////////
// app.put("/api/workouts/:id", ({ body, params }, res) => {
//   db.Workout.findByIdAndUpdate(
//     params.id,
//     { $push: { exercises: body } },
//     { new: true, runValidators: true }
//   )
//     .then((dbWorkout) => {
//       res.json(dbWorkout);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });


router.put("/api/workouts/:id", (req, res) => {
  const workoutId = req.params.id;
  Workout.findOneAndUpdate({ _id: workoutId }, { $push: { exercises: req.body } }, { new: true })
      .then(dbWorkout => {
          res.json(dbWorkout);
      })
      .catch(err => {
          res.status(400).json(err);
      });
});

//////////////////////////////////////////////////
//            getWorkoutsInRange
//////////////////////////////////////////////////
// app.get("/api/workouts/range", (req, res) => {
//   db.Workout.aggregate(
//       [{
//         $addFields: {
//           totalWeight: { $sum: "$exercises.weight" } ,
//           totalDuration: { $sum: "$exercises.duration" }
//         }
//       }])
//     .then((dbWorkout) => {
//       res.json(dbWorkout);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });
// };
router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate([
      {
          $addFields: {
              totalDuration: {
                  $sum: ["$exercises.duration"]
              }
          }
      }
  ]
  )
      .sort({ day: "desc" })
      .limit(7)
      .sort({ day: "asc" })
      .then(dbWorkout => {
          res.json(dbWorkout);
      })
      .catch(err => {
          res.status(400).json(err);
      });
});

module.exports = router;
