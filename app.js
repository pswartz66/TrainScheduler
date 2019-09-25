

// Firebase configuration
var firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: "trainschedule-df04d.firebaseapp.com",
    databaseURL: "https://trainschedule-df04d.firebaseio.com",
    projectId: "trainschedule-df04d",
    storageBucket: "",
    messagingSenderId: config.messagingSenderId,
    appId: config.appID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// reference to the main train schedule top node
var trainSchedule = database.ref('/trainschedule');



// when user clicks submit button
$('#submit-btn').on('click', function () {
    event.preventDefault();

    // user input
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


    var firstTimeConvertedUnix = firstTimeConverted.format("X");

    var currentTime = moment();
    console.log(moment(currentTime).format('HH:mm'));

    var currentTimeUnix = currentTime.format("X");

    var timeDiff = moment().diff(moment(firstTimeConverted), 'minutes');
    // console.log('time diff ' + timeDiff);

    var timeApart = timeDiff % frequency;
    // console.log('time apart ' + timeApart + ' minutes');

    var minutesTillNextTrain = frequency - timeApart;
    // console.log('minutes until next train ' + minutesTillNextTrain)

    var nextArrival = moment().add(minutesTillNextTrain, 'minutes');
    // console.log('ARRIVAL TIME ' + moment(nextArrival).format('HH:mm'));
    var nextArrivalUnix = nextArrival.format("X");

    // create an object to be added to our database
    var myTrain = {
        tFirstTrainTime: firstTimeConvertedUnix,
        tName: train_name,
        tDestination: destination,
        tFrequency: frequency,
        tNextArrival: nextArrivalUnix,
        tMinutesAway: minutesTillNextTrain,
        tCurrentTimeUnix: currentTimeUnix

    };

    // push data to the database
    database.ref(trainSchedule).push(myTrain);


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


// refresh train schedules
$('.refresh-times').on('click', function () {
    event.preventDefault();

    var currentTime = moment();
    console.log(currentTime);

    var currentTimeUnix = currentTime.format("X");
    
    database.ref(trainSchedule).on('value', function (snapshot) {

        // document.location.reload();

        snapshot.forEach(function (childSnapShot) {


            if ((childSnapShot.val().tNextArrival - currentTimeUnix) < 0) {

                var newArrival = moment().add(parseInt(childSnapShot.val().tFrequency), 'minutes');
    
                var newArrivalUnix = newArrival.format("X");

                trainSchedule.child(childSnapShot.key).update({'tNextArrival': newArrivalUnix});

                var newArrivalUnix_DB = childSnapShot.val().tNextArrival;

                var cnvrtNewArrivalUnix = moment.unix(newArrivalUnix_DB).format("HH:mm");

                // console.log(cnvrtNewArrivalUnix);

                $('.updateTimes').text(cnvrtNewArrivalUnix);


                trainSchedule.child(childSnapShot.key).update({'tMinutesAway': childSnapShot.val().tFrequency});


                

            } else {

                console.log('time > 0');

                var minTilNextTrain = moment(childSnapShot.val().tMinutesAway, "HH:mm");
                
                console.log(minTilNextTrain);
                
                var timeDiff = moment().diff(moment(minTilNextTrain, 'minutes'));
                
                var timeDiffUnix = moment.unix(timeDiff).format("HH:mm");


                $('.minTilTrain').text(timeDiffUnix);

            }



            //console.log(childSnapShot.val().tNextArrival + newArrivalUnix);

            
            // currently the app only adds the same frequency
            // when I refresh the page we should see the "TIME LEFT" until
            // the next Arrival time

            var minTilNextTrain = moment(childSnapShot.val().tMinutesAway, "HH:mm");
            console.log(minTilNextTrain);


        });


    });


});






// database functionality

database.ref(trainSchedule).on("child_added", function (childSnapShot) {

    // log the childSnapShot
    console.log(childSnapShot.val());

    // create variables to target database object
    var train_name_DB = childSnapShot.val().tName;
    var destination_DB = childSnapShot.val().tDestination;
    var frequency_DB = childSnapShot.val().tFrequency;
    var nextArrivalUnix_DB = childSnapShot.val().tNextArrival;
    var minutesTillNextTrain_DB = childSnapShot.val().tMinutesAway;

    // convert unix database time back to military
    var cnvrtNextArrivalTime = moment.unix(nextArrivalUnix_DB).format("HH:mm");


    // add row with new data
    var myRow = $('<tr>');

    $('.table-body').prepend(myRow);

    myRow.append('<td>' + train_name_DB + '</td>');
    myRow.append('<td>' + destination_DB + '</td>');
    myRow.append('<td>' + frequency_DB + '</td>');

    // table rows require calculations
    myRow.append('<td class="updateTimes">' + cnvrtNextArrivalTime + '</td>');
    myRow.append('<td class="minTilTrain">' + minutesTillNextTrain_DB + '</td>');






});




