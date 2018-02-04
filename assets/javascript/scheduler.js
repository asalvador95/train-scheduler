var config = {
    apiKey: "AIzaSyCe8wRidrz2G44AK8n9_ZdhRDX-LfiLXGk",
    authDomain: "train-schedule-f21fc.firebaseapp.com",
    databaseURL: "https://train-schedule-f21fc.firebaseio.com",
    projectId: "train-schedule-f21fc",
    storageBucket: "",
    messagingSenderId: "598587166017"
  };
  firebase.initializeApp(config);

var database = firebase.database();

   $("#add-schedule").on("click", function(event) {
  event.preventDefault();
    // Initial Values
    var name = "";
    var destination = "";
    var time = 0;
    var frequency = "";

    // Capture Button Click


  
  // Grabs train info input
  var empName = $("#name-input").val().trim();
  var empDestination = $("#destination-input").val().trim();
  var empTime = $("#time-input").val().trim();
  var empFrequency = $("#frequency-input").val().trim()

  // Creates local "temporary" object for holding train data
  var newEmp = {
    name: empName,
    destination: empDestination,
    time: empTime,
    frequency: empFrequency,
  };

  // Uploads train data to the database
  database.ref().push(newEmp);

//   // Logs everything to console
  console.log(newEmp.name);
  console.log(newEmp.destination);
  console.log(newEmp.time);
  console.log(newEmp.frequency);

// Alert
  alert("Train Schedule successfully added");

//   // Clears all of the text-boxes
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var empName = childSnapshot.val().name;
  var empDestination = childSnapshot.val().destination;
  var empTime = childSnapshot.val().time;
  var empFrequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(empName);
  console.log(empDestination);
  console.log(empTime);
  console.log(empFrequency);


  // Prettify the train start
  var trainTimePretty = moment.unix(empTime).format("HH:mm");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var trainMin = moment().diff(moment.unix(empTime, "HH:mm"), "minutes");
  console.log(trainMin);

  // Calculate the total billed rate
  var minAway = empTime - trainMin;
  console.log(minAway);



  // Add each train's data into the table -- align ID names to where it is appending



  $("#train-table > tbody").append("<tr><td>" + empName + "</td><td>" + empDestination + "</td><td>" +
  trainTimePretty + "</td><td>" + trainMin + "</td><td>" + trainFreq + "</td><td>" + minAway + "</td></tr>");
});