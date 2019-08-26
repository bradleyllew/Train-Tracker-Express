// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCeA5viJaX25v4XjKToC-AtbpGdXd9YjL0",
    authDomain: "train-time-364c1.firebaseapp.com",
    databaseURL: "https://train-time-364c1.firebaseio.com",
    projectId: "train-time-364c1",
    storageBucket: "",
    messagingSenderId: "70634217960",
    appId: "1:70634217960:web:b48e3020ac3d6fa8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// Assumptions
var tFrequency = 3;

// Time is 3:30 AM
var firstTime = "03:30";

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
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

//   INSERT FUNCTION TO GRAB DATA, CALCULATE, ARE REPOPULATE TABLE


// INSERT MOMENT FUNCTION TO GET TIMES
var randomDate = "02/23/1999";
var randomFormat = "MM/DD/YYYY";
var convertedDate = moment(randomDate, randomFormat);

convertedDate.format("MMM Do, YYYY hh:mm:ss"));
moment().endOf('day').fromNow();          // in an hour
moment().startOf('hour').fromNow();      