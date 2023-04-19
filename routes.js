const express = require("express");
const userModel = require("./models");
const app = express();
// const express = require('express');

// const router = express.Router()

// module.exports = router;

// app.post("/add_user", async (request, response) => {
//     const user = new userModel(request.body);
  
//     try {
//       await user.save();
//       response.send(user);
//     } catch (error) {
//       response.status(500).send(error);
//     }
// });

// app.get("/users", async (request, response) => {
//     const users = await userModel.find({});
  
//     try {
//       response.send(users);
//     } catch (error) {
//       response.status(500).send(error);
//     }
//   });
// router.get('/getAll', async (req, res) => {
//     try{
//         const data = await Model.find();
//         res.json(data)
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }
// })
// async function findPatientInfo(fName, lName) {
//     const result = await client.db("FamilyRemindersAppDB").collection("Patient").findOne({ firstName: fName });
  
//     if(result) {
//       return result;
//     }
//   }

  module.exports = router;
