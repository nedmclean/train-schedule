  

 var config = {
    apiKey: "AIzaSyDu9K41K2Om8xiJAfqs_v5LrN5eIuIe930",
    authDomain: "ned-s-awesome-project.firebaseapp.com",
    databaseURL: "https://ned-s-awesome-project.firebaseio.com",
    projectId: "ned-s-awesome-project",
    storageBucket: "ned-s-awesome-project.appspot.com",
    messagingSenderId: "245637656283"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


  $("#submit-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
 
  var newTrain = {
    name: trainName,
    going: destination,
    frequency: frequency,
    firstTrain: firstTrainTime
  };
  
    database.ref().push(newTrain); 

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#train-time-input").val("");

});

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {


  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName  = childSnapshot.val().name;
  var destination = childSnapshot.val().going;
  var frequency = childSnapshot.val().frequency;
  var firstTrainTime = childSnapshot.val().firstTrain;

  var niceTime= moment.unix(firstTrainTime).format("hh:mm");

  
  var tFrequency = frequency;

    // Time is 3:30 AM
  var firstTime = firstTrainTime;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
 
$("#train-schedule > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + niceTime + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain +  "</td></tr>");

});

