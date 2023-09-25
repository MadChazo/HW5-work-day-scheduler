// Wraps all code in JQuery call
$(function () {
  // HTML element variables
  var currentDay = $("#currentDay");
  var saveBtn = $(".saveBtn");
  var clearBtn = $("#clearBtn");
  // Day.js variable
  var today = dayjs();
  // Saved event storage variable
  var savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || [
    { time: "hour-9", desc: "" },
    { time: "hour-10", desc: "" },
    { time: "hour-11", desc: "" },
    { time: "hour-12", desc: "" },
    { time: "hour-13", desc: "" },
    { time: "hour-14", desc: "" },
    { time: "hour-15", desc: "" },
    { time: "hour-16", desc: "" },
    { time: "hour-17", desc: "" },
  ];

  // Clears local storage and reloads page
  function clearHandler() {
    localStorage.clear();
    location.reload();
  }

  // Saves scheduled events
  function saveHandler(event) {
    var hour = $(event.target).parents(".time-block").eq(0).attr("id");
    var saveEvent = $("#" + hour)
      .children(".description")
      .val();
    var index = hour.split("-")[1] - 9;
    savedEvents[index].desc = saveEvent;
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }

  // Adds saved events back to schedule on each reload
  // Checks time and changes class of div accordingly to past, present, or future
  for (let i = 0; i < 9; i++) {
    var workingEvent = savedEvents[i];
    var workingBlock = $("#" + workingEvent.time);
    $(workingBlock).children("textarea").val(workingEvent.desc);
    var present = parseInt(dayjs().format("H"));
    var blockNum = parseInt(workingBlock.attr("id").split("-")[1]);
    if (blockNum == present) {
      workingBlock.addClass("present");
    } else if (blockNum > present) {
      workingBlock.addClass("future");
    } else {
      workingBlock.addClass("past");
    }
  }

  // Displays the current date in the header of the page.
  currentDay.text(today.format("dddd, MMMM D"));

  // Event listeners for buttons
  clearBtn.on("click", clearHandler);
  saveBtn.on("click", saveHandler);
});
