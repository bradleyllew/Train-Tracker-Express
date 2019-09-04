$(document).ready(function () {


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
    // To call the database
    var database = firebase.database();

    var whichTrain = $("#option").val();
    var destination = $("#dest").val();
    var firstTrain = moment($("#firstTrain").val(), "HH:mm").subtract(1, "years").format("X");
    var tFrequency = $("#frqncy").val();
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTrain), "minutes");
    var tMinutesTillTrain = tFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");


    // Submit button event listener
    $("#submitBtn").on("click", function (event) {
        // Bez we were told to...keeps user from repeatidly pressing button?
        event.preventDefault();


        // Which train user selects
        var whichTrain = $("#option").val();
        console.log("WHICH TRAIN: " + whichTrain);

        // Destination
        var destination = $("#dest").val();
        console.log("Destination " + destination);

        // First Train (pushed back 1 year to make sure it comes before current time)
        var firstTrain = moment($("#firstTrain").val(), "HH:mm").subtract(1, "years").format("X");
        console.log("FIRST TRAIN: " + firstTrain);

        var tFrequency = $("#frqncy").val();

        //Current time
        var currentTime = moment();
        console.log("TIME NOW: " + moment(currentTime).format("HH:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTrain), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


        var option = {
            train: whichTrain,
            destination: destination,
            frequency: tFrequency
        }

        //To add tain to Firebase
        database.ref().push(option);

        // To add values to table - NOT WORKING
        $("#frqncy").val();
        $("#next").val();
        $("#mins").val();

        database.ref().on("child_added", function (childSnapshot) {
            // Log everything that's coming out of snapshot

            console.log(childSnapshot.val());
            console.log(childSnapshot.val().whichTrain);
            console.log(childSnapshot.val().tFrequency);
            console.log(childSnapshot.val().nextTrain);
            console.log(childSnapshot.val().tMinutesTillTrain);
            // Change the HTML to reflect
            $("#frqncy").text(childSnapshot.val().tFrequency);
            $("#next").text(childSnapshot.val().nextTrain);
            $("#mins").text(childSnapshot.val().tMinutesTillTrain);


            // Handle the errors
        }, function (errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });


    });

})