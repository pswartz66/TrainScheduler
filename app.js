





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
    console.log(firstTimeConverted);

    var currentTime = moment(); 
    console.log(moment(currentTime).format('hh:mm'));

    var timeDiff = moment().diff(moment(firstTimeConverted), 'minutes');
    console.log('time diff ' + timeDiff);

    var timeApart = timeDiff % frequency;
    console.log('time apart ' + timeApart + ' minutes');

    var minutesTillNextTrain = frequency - timeApart;
    console.log('minutes until next train ' + minutesTillNextTrain)

    var nextArrival = moment().add(minutesTillNextTrain, 'minutes');
    console.log('ARRIVAL TIME ' + moment(nextArrival).format('hh:mm'));


    // add row with new data
    var myRow = $('<tr>');

    $('.table-body').prepend(myRow);

    myRow.append('<td>' + train_name + '</td>');
    myRow.append('<td>' + destination + '</td>');
    myRow.append('<td id="table-row">' + frequency + '</td>');

    // table rows require calculations
    myRow.append('<td id="table-row">' + moment(nextArrival).format('hh:mm') + '</td>');
    myRow.append('<td id="table-row">' + minutesTillNextTrain + '</td>');




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
