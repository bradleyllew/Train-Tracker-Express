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

    // Variables for the Event Listener
    var name;
    var firstTrain;
    var frequency = 0;



    $("#submitBtn").on("click", function () {
        event.preventDefault();
        // Storing and retreiving new train data
        name = $("#option").val().trim();
        console.log("NAME " + name);
        firstTrain = $("#firstTrain").val().trim();
        console.log("FIRST TRAIN " + firstTrain);
        frequency = $("#frequency").val();
        console.log("FREQ " + frequency);

        // Pushing to database
        database.ref().push({
            name: name,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        $("form")[0].reset();
    });

    database.ref().on("child_added", function (childSnapshot) {
        // pushed back 1 year to make sure it comes before current time
        var firstTrainNew = moment(childSnapshot.val().firstTrain, "HH:mm").subtract(1, "years");
        // Difference between the times/time apart=remainder
        var diffTime = moment().diff(moment(firstTrainNew), "minutes");
        var remainder = diffTime % childSnapshot.val().frequency;
        // Minutes until next train
        var minAway = childSnapshot.val().frequency - remainder;
        // Next train time
        var nextTrain = moment().add(minAway, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm");

        $("#add-row").append("<tr><td>" + childSnapshot.val().name +
            "</td><td>" + childSnapshot.val().destination +
            "</td><td>" + childSnapshot.val().frequency +
            "</td><td>" + nextTrain +
            "</td><td>" + minAway + "</td></tr>");

        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
});


