const express = require("express");
const router = express.Router();
const Drone = require("../models/Drone.model");
// require the Drone model here

router.get("/drones", (req, res, next) => {
  
  // Iteration #2: List the drones
  Drone.find()
    .then((allDrones) => {
      res.render("./drones/list", {
        allDrones
      });
    })
    .catch((err) => {
      console.log("no drones!");
    });
});

router.get("/drones/create", (req, res, next) => {
  
res.render('./drones/create-form');
});

router.post("/drones/create", (req, res, next) => {
  
  // Iteration #3: Add a new drone
  const {name, propellers, maxSpeed} = req.body;
  Drone.create({name, propellers, maxSpeed})

    .then((response) => res.redirect("/drones"))
    .catch(() => console.log("infos not transmitted"));
});


router.get('/drones/:id/edit', (req, res) => {
  const {id} = req.params
  Drone.findById(id).then((drones) => {
    res.render('./drones/update-form', {drones})
  })
  .catch((err) => console.log('uuppss!'))

})

router.post('/drones/:id/edit', (req, res) => {
  const {id} = req.params
  const {name, propellers, maxSpeed} = req.body

  Drone.findByIdAndUpdate(id, {name, propellers, maxSpeed}) //update drone
    .then((response) =>
      res.redirect('/drones'))
    .catch(() => console.log('drone infos not transmitted'))
})

router.post('/drones/:id/delete', (req, res) => {
  const {id} = req.params

  Drone.findByIdAndRemove(id) //delete
    .then((result) => {
      res.redirect('/drones')
    }).catch((err) => {
      console.log('very destructive')
    });
})

module.exports = router;