// dependencies (DOM Elements)====================
const timeBlocksContainer = $("#time-blocks");

// data
let timeBlocks;
if (localStorage.getItem("timeBlocks")) {
  timeBlocks = JSON.parse(localStorage.getItem("timeBlocks"));
} else {
   timeBlocks = [
    {
      hour: '8',
      description: '',
    },
    {
      hour: '9',
      description: '',
    },
    {
      hour: '10',
      description: '',
    },
    {
      hour: '11',
      description: '',
    },
    {
      hour: '12',
      description: '',
    },
    {
      hour: '13',
      description: '',
    },
    {
      hour: '14',
      description: '',
    },
    {
      hour: '15',
      description: '',
    },
    {
      hour: '16',
      description: '',
    },
    {
      hour: '17',
      description: '',
    },
  ];
}

console.log(timeBlocks);


// helper functions ==============================
// renderTimeBlocks
const renderTimeBlocks = () => {

  timeBlocks.forEach(timeBlock => {

    const timeClass = getTimeClass(timeBlock.hour);

    // create a timeblock element
    const timeBlockEl = $(`<div id="block-${timeBlock.hour}" class="time-block row">`);
    // create an hour display element
    const timeBlockHour = $(`<div class="hour col-1">`).text(
      `${timeBlock.hour}`
    );
    // add it to the timeblock element
    timeBlockEl.append(timeBlockHour);
    // create a description text area
    const timeBlockDesc = $(
      `<textarea class="description col-10 ${timeClass}" id="text-${timeBlock.hour}" cols="30" rows="10">`
    ).val(timeBlock.description);
    // add it to the timeblock element
    timeBlockEl.append(timeBlockDesc);
    // create a save button
    const timeBlockSave = $(`<button class="saveBtn col-1">`).text("Save");
    // add it to the timeblock element
    timeBlockEl.append(timeBlockSave);
    // add the timeblock to the timeBlocksContainer
    timeBlocksContainer.append(timeBlockEl);
  });

  
}
// getTimeClass
const getTimeClass = function(timeBlockHour) {
  const currentHour = moment().hours();
  if (parseInt(timeBlockHour) < currentHour) {
    return 'past';
  } else if (parseInt(timeBlockHour) === currentHour) {
    return 'present';
  } else {
    return 'future';
  }
};

// initializers
renderTimeBlocks();

// user interactions
$(".saveBtn").click(function(event) {
  event.preventDefault();
  // get the time
  const time = $(this).parent().find('.hour').text();
  // get the description
  const description = $(this).prev().val();
  // find the correct timeblock in the array
  timeBlocks.forEach(timeBlock => {
    // update it's values from the text area
    if (timeBlock.hour === time) {
      timeBlock.description = description;
    }
  });

  // save the updated array in local storage
  localStorage.setItem("timeBlocks", JSON.stringify(timeBlocks));
})