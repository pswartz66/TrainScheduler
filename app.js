





$('#submit-btn').on('click', function () {
    event.preventDefault();

    var train_name = $('#train-name-input').val().trim();
    var destination = $('#destination-input').val().trim();
    var first_train_time = $('#first-train-time-input').val().trim();
    var frequency = $('#frequency-input').val().trim();


    console.log(train_name);
    console.log(destination);
    console.log(first_train_time);
    console.log(frequency);

    


    // reset input box values back to their original state
    $('#train-name-input').val('Enter a train name');
    $('#destination-input').val('Enter travel destination');
    $('#first-train-time-input').val('Enter a train time');
    $('#frequency-input').val('Enter the frequency in minutes');


});
