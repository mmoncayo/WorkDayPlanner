// gets date from moment.js
  var now = moment().format('dddd, MMMM Do');

// gets hours in military time (24hr format) from moment.js
  var hours24 = moment().format('H');

// takes the current date and sets it at the header of the page based on the id tag "currentDay"
  var date = $('#currentDay');
  date.text(now);
  
// gets stored to-do activities that get populated on the page when browser starts
// also parses the string of the input the user enters
  var todoActivities= JSON.parse(localStorage.getItem("todoActivities"));

  // if there was stored data that was from localStorage, then the data will update the activities onto the planner
  if (todoActivities !== null) {
    storedActivityData = todoActivities;
  } 
  else {
// if there wasn't any data retrieved from localStorage, then this will command will only happen once for the first time the user loads the program
    storedActivityData = new Array(9);
    }

// sets the variable that will reference the timeblock elements
  var dayplannerDiv = $('.container');
// clears existing elements
  dayplannerDiv.empty();


  //creates the day planner formatted by one row for every business hour (9am-5pm aka 09:00-17:00)
  for (var hour = 9; hour <= 17; hour++) {
    // index to identify which row the hour is designated to
      var index = hour - 9;
      
    // this builds row attributes for each hour
      var rowDiv = $('<div>');
      rowDiv.addClass('row');
      rowDiv.attr('hour-index',hour);
    
    // builds time block portion of row with associated attributes (column furthest left)
      var timeDiv = $('<div>');
      timeDiv.addClass('col-md-2');
      timeDiv.addClass('hour');

    
    // create hour portion element (where the time is contained)
      var hourEl = $('<span>');
    // can use this to get value
      hourEl.attr('class','time-block');
      
    // format hours for display in the time column
      var displayHour = 0;
    // to display clock in US 12hr format
      var ampm = "";
      if (hour > 12) { 
        displayHour = hour - 12;
        ampm = "pm";
      } else if(hour == 12) {
        displayHour = hour;
        ampm = "pm";
      }
      else {
        displayHour = hour;
        ampm = "am";
      }
      
    // populate newly created hour element with time
      hourEl.text(`${displayHour} ${ampm}`);

    // insert into col inset into timebox
      rowDiv.append(timeDiv);
      timeDiv.append(hourEl);

    // this builds row attributes for the text area that the activity/to-do list is added
      var todoDiv = $('<textarea>');

      todoDiv.attr('id',`input-${index}`);
      todoDiv.attr('hour-index',index);
      todoDiv.attr('type','text');
      todoDiv.attr('class','description');

      // access index from data array for hour 
      todoDiv.val(storedActivityData[index]);
      
      // creates the column div for the activity area of the text input
      var activityDiv = $('<div>');
      activityDiv.addClass('col-md-9');

      // appends the activity div to the row div
      rowDiv.append(activityDiv);
      activityDiv.append(todoDiv);

      // builds the column attributes for the save button area 
      var saveDiv = $('<div>');
      saveDiv.addClass('col-md-1');
      saveDiv.addClass('saveBtn');

      var saveBtn = $('<i>');
      saveBtn.attr('id',`saveid-${index}`);
      saveBtn.attr('save-id',index);
      // uses font awesome database for the save button icon
      saveBtn.attr('class',"far fa-save");
      
      // appends the save div to the row div and adds the content of the save button inot the save div
      rowDiv.append(saveDiv);
      saveDiv.append(saveBtn);

      // updates the color of the hour based on what time it currently is
      updateRowColor(activityDiv, hour);
      
      // appends the entire day planner div to the row div
      dayplannerDiv.append(rowDiv);
  };

// function that updates the row color based on the time
  function updateRowColor(activityDiv, hour) { 
    if (hour < hours24) {
      activityDiv.addClass("past")
    } else if (hour > hours24) {
      activityDiv.addClass("future")
    } else {
      activityDiv.addClass("present")
    }
  };

// event listener for when the user clicks onto the activity/to-do area and saves entry to local storage
  $(document).on('click','i', function(event) {
    event.preventDefault();  

    var index = $(this).attr('save-id');

    var inputId = '#input-' + index;
    var inputVal = $(inputId).val();

    storedActivityData[index] = inputVal;

    localStorage.setItem("todoActivities", JSON.stringify(storedActivityData));
  });  
