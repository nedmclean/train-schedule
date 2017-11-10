  

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


  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
  var firstTrainTime = moment($("#train-time-input").val().trim(), "HH:mm").format("X");
 
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


  var trainName  = childSnapshot.val().name;
  var destination = childSnapshot.val().going;
  var frequency = childSnapshot.val().frequency;
  var firstTrainTime = childSnapshot.val().firstTrain;

  var niceTimehhmm = moment.unix(firstTrainTime).format("HH:mm");
  

  // var niceTimemm = moment.unix(firstTrainTime).format("m");

  
  var tFrequency = frequency;


  var firstTime = firstTrainTime;

    
    var firstTimeConverted = moment(firstTime, "HH:mm");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "m");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    var tMinutesTillTrain = parseInt(tFrequency - tRemainder);
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = parseInt(moment(currentTime).add(tMinutesTillTrain));
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
 
$("#train-schedule > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + niceTimehhmm + nextTrain + "</td><td>" + tMinutesTillTrain + " minutes away" + "</td></tr>");

});

