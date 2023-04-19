// Requiring module
const MongoClient = require("mongodb").MongoClient;
const express= require('express');
var bodyParser = require('body-parser');
const ejs = require('ejs');
var path = require('path');

const app=express();


// Connection URL
const url = "mongodb+srv://teamDPI:teamDPI@familyremindersdb.nnuiz8t.mongodb.net/?retryWrites=true&w=majority";
const databasename = "FamilyRemindersAppDB";
const client = new MongoClient(url);

async function findRelationName(id) {
    const result = await client.db("FamilyRemindersAppDB").collection("Person").findOne({ id: id });

    return result.firstName;
}



const myArray = [];
var js=[];
  async function findPatientRelatives(fName) {
    const result = await client.db("FamilyRemindersAppDB").collection("Patient").findOne({ firstName: fName });

    if(result) {
        // console.log(result);
        // console.log(result.family)
        o=result.family;
        const jsonString = JSON.stringify(o);
        const parsedObject = JSON.parse(jsonString);

        // At this point, parsedObject is the same as jsonObject

        const relative = Object.keys(parsedObject);
        const values =Object.values(parsedObject);
        const relation_firstName = [];

        for (let i = 0; i < values.length; i++) {
            relation_firstName.push(await findRelationName(values[i][0]));

          }

        for (let i = 0; i < relation_firstName.length; i++) {
        myArray.push({ relation_firstname: relation_firstName[i], relation: relative[i] });
        }

         js = await JSON.stringify(myArray);

        console.log(js);

       return js;
    }
  }
  let globalVariable;

  app.post('/post-feedback',function(req,res){

  })






// Connections server to client
app.listen(3001, () => {
    console.log("Server is running at port 3001");
  });
const curPatientID = 1;
const curMemberID = 102;

// Routes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));
app.get("/", async(req, res) => {
  res.sendFile(__dirname + '/profile.html', {});
});

app.get("/allFamilyData", async(req, res) => {
  const id = 1;
  const patientDetails = await client.db("FamilyRemindersAppDB").collection("Patient").findOne({ id: id });
  const patientFamily = patientDetails.family;
  let familyDetails = []
  for (const relation in patientFamily) {
    const personList = patientFamily[relation];
    for (let i=0; i<personList.length; i++) {
      personID = personList[i];
      const personDetails = await client.db("FamilyRemindersAppDB").collection("Person").findOne({ id: personID });
      familyDetails.push(personDetails);
    }

  }
  // console.log(familyDetails);
  console.log(familyDetails)

  res.json(familyDetails);
});

app.get("/userData", async(req, res) => {
  const id = 102;
  const userData = await client.db("FamilyRemindersAppDB").collection("Person").findOne({ id: id });
  const userName = userData.firstName +" "+ userData.lastName;
  const userAge = userData.age;
  const userPhone = userData.phone;
  json_data={"userName":userName,"userAge":userAge,"userPhone":userPhone};

  res.json(json_data);


});

app.post("/addAnecdote", async(req, res) => {

  console.log(req.body);
  const id = Math.floor(Math.random() * 100000);
  const result = await client.db("FamilyRemindersAppDB").collection("Anecdote").insertOne({id:id,title:req.body.anecName,description:req.body.subject,date:req.body.anecDate});

  var patientObject = await client.db("FamilyRemindersAppDB").collection("Patient").findOne({ id: curPatientID });
  if(patientObject.anecdotes[curMemberID] != null) {
    patientObject.anecdotes[curMemberID].push(id);
  } else {
    var arrAnecdotes = []
    arrAnecdotes.push(id);
    patientObject.anecdotes[curMemberID] = arrAnecdotes;
  }
  const filter = { id: curPatientID };
  const options = { upsert: true };
  const updateDoc = {
      $set: {
        anecdotes: patientObject.anecdotes
      },
    };
  const result2 = await client.db("FamilyRemindersAppDB").collection("Patient").updateOne(filter, updateDoc, options);

  res.redirect('/');
});

app.post("/addEvent", async(req, res) => {

  console.log(req.body);
  const id = Math.floor(Math.random() * 100000);
  const result = await client.db("FamilyRemindersAppDB").collection("Event").insertOne({id:id,title:req.body.eventName,description:req.body.eventSubject,startDate:req.body.eventDate});
  res.redirect('/');

});
app.post("/addFamily", async(req, res) => {

  console.log(req.body);
  const id = Math.floor(Math.random() * 100000);
  const result = await client.db("FamilyRemindersAppDB").collection("Person").insertOne({id:id,firstName:req.body.fname,lastName:req.body.lname,dob:req.body.dob,gender:req.body.gender,relatedTo:{"1":req.body.relation},age:req.body.age,phone:req.body.phone});
  var patientObject = await client.db("FamilyRemindersAppDB").collection("Patient").findOne({ id: curPatientID });
  if(patientObject.family[req.body.relation] != null) {
    patientObject.family[req.body.relation].push(id);
  } else {
    var arrFam = []
    arrFam.push(id);
    patientObject.family[req.body.relation] = arrFam;
  }
  const filter = { id: curPatientID };
  const options = { upsert: true };
  const updateDoc = {
      $set: {
        family: patientObject.family
      },
    };
  const result2 = await client.db("FamilyRemindersAppDB").collection("Patient").updateOne(filter, updateDoc, options);
  res.redirect('/');

});
app.get("/patientData", async(req, res) => {
  const photo_urls=["OldMan.avif","Oldwoman.avif"];

  const userid = 102;
  const userData = await client.db("FamilyRemindersAppDB").collection("Person").findOne({ id: userid });
  const userRelatedTo = userData.relatedTo;
  console.log("userRelatedTo ",userRelatedTo);
  const o=Object.keys(userRelatedTo);
  console.log(o[0]);





  var patients = [];
  for (let i = 0; i < o.length; i++) {

    const p = await client.db("FamilyRemindersAppDB").collection("Patient").findOne({ id:parseInt(o[i])});
    console.log(p);

    const x={"patientName":p.firstName+" "+p.lastName,"patientGender":p.gender,"patientBday":p.dob,"patientRelation":userRelatedTo[o[i]],"photo":photo_urls[i]};
    patients.push(x);

  }
  // console.log("patient array: ",patient);

  console.log(patients);
  res.json(patients);


});

// app.get("/", async(req, res) => {
//  res.send("hello");});
// //   res.sendFile(__dirname + '/profile.html', {

// //         });
// //         const data = await findPatientRelatives("John");
// //         const d=await insertPerson(1,"fn","ln","dob","gender","relation","photoURL")

// //         console.log(d);
// //         // res.json(data);
// app.get("/family", async(req, res) => {
//    const data = await findPatientRelatives("John");
//    res.send(data);

// });



// app.post("/",function(req,res,next)  {
//   res.send("got a Post request");

// });
