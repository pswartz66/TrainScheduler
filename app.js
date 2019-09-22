
// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDw0MCF-Lg0y5QVndbGvEHDJC8JvWIJpqw",
    authDomain: "trainschedule-df04d.firebaseapp.com",
    databaseURL: "https://trainschedule-df04d.firebaseio.com",
    projectId: "trainschedule-df04d",
    storageBucket: "",
    messagingSenderId: "339799422019",
    appId: "1:339799422019:web:9034f013adb4812da710f6"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var database = firebase.database();



// when user clicks submit button
$('#submit-btn').on('click', function () {
    event.preventDefault();

    var train_name = $('#train-name-input').val().trim();
    var destination = $('#destination-input').val().trim();
    var first_train_time = $('#first-train-time-input').val().trim();
    var frequency = $('#frequency-input').val().trim();

    // test logs
    console.log(train_name);
    console.log(destination);
    console.log(first_train_time);
    console.log(frequency);

    

    // do math here
    var firstTimeConverted = moment(first_train_time, 'HH:mm').subtract(1, 'years');
    // console.log(firstTimeConverted);

    var currentTime = moment(); 
    // console.log(moment(currentTime).format('hh:mm'));

    var timeDiff = moment().diff(moment(firstTimeConverted), 'minutes');
    // console.log('time diff ' + timeDiff);

    var timeApart = timeDiff % frequency;
    // console.log('time apart ' + timeApart + ' minutes');

    var minutesTillNextTrain = frequency - timeApart;
    // console.log('minutes until next train ' + minutesTillNextTrain)

    var nextArrival = moment().add(minutesTillNextTrain, 'minutes');
    // console.log('ARRIVAL TIME ' + moment(nextArrival).format('hh:mm'));
    var nextArrivalUnix = nextArrival.format("X");

    // create an object to be added to our database
    var myTrain = {
        tName: train_name,
        tDestination: destination,
        tFrequency: frequency,
        tNextArrival: nextArrivalUnix,
        tMinutesAway: minutesTillNextTrain
    };

    // push data to the database
    database.ref().push(myTrain);

    
    // reset input box values back to their original state
    $('#train-name-input').val('');
    $('#train-name-input').attr('placeholder', 'Enter a train name');

    $('#destination-input').val('');
    $('#destination-input').attr('placeholder', 'Enter travel destination');

    $('#first-train-time-input').val('');
    $('#first-train-time-input').attr('placeholder', 'Enter a train time');

    $('#frequency-input').val('');
    $('#frequency-input').attr('placeholder', 'Enter the frequency in minutes');

});

database.ref().on("child_added", function(childSnapShot){

    // log the childSnapShot
    console.log(childSnapShot.val());

    // create variables to target database object
    var train_name_DB = childSnapShot.val().tName;
    var destination_DB = childSnapShot.val().tDestination;
    var frequency_DB = childSnapShot.val().tFrequency;
    var nextArrivalUnix_DB = childSnapShot.val().tNextArrival;
    var minutesTillNextTrain_DB = childSnapShot.val().tMinutesAway;

    // convert unix database time back to military
    var cnvrtNextArrivalTime = moment.unix(nextArrivalUnix_DB).format("hh:mm");

    // add row with new data
    var myRow = $('<tr>');

    $('.table-body').prepend(myRow);

    myRow.append('<td>' + train_name_DB + '</td>');
    myRow.append('<td>' + destination_DB + '</td>');
    myRow.append('<td>' + frequency_DB + '</td>');

    // table rows require calculations
    myRow.append('<td>' + cnvrtNextArrivalTime + '</td>');
    myRow.append('<td>' + minutesTillNextTrain_DB + '</td>');


});


function UpdateScheduleEveryThirtySec(){


};

