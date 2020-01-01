# TrainScheduler

### Overview

TrainScheduler is an application that uses firebase to host arrival and departure times. The app retrieves and manipulates this information with moment.js. The website provides up-to-date information about various trains, mainly their arrival times and how many minutes are left until the train arrives. Currently the app uses military time (can be updated later to convert into standard time).


### Instructions
  
  * When adding trains, users are able to submit the following:
    
    * Train Name
    
    * Destination 
    
    * First Train Time -- in military time
    
    * Frequency -- in minutes
    
    * Click the refresh button to see more up to date times
  
  * The app calculates when the next train will arrive.
  
  * Users from different machines are be able to view the same train times (i.e. with the help of a firebase database).
  
