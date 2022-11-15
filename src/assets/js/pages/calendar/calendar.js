let calendar;
var Draggable = FullCalendarInteraction.Draggable;
let date_picker;

var containerEl = document.getElementById("external-events");
var checkbox = document.getElementById("drop-remove");
var addEvent = document.getElementById("add-event");
var editEvent = document.getElementById("edit-event");
var addEventTitle = document.getElementById("addEventTitle");
var editEventTitle = document.getElementById("editEventTitle");

var date = new Date();
var day = date.getDate();
var month = date.getMonth();
var year = date.getFullYear();

(this.$eventModal = $("#event-modal")),
  $(document).ready(function () {
    initCalendar();
  });

function initCalendar() {
  var calendarEl = $("#calendar").get(0);
  calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ["interaction", "dayGrid", "timeGrid"],
    header: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    weekNumberCalculation: "ISO",
    displayEventEnd: true,
    lazyFetching: true,
    selectable: true,

    views: {
      dayGridMonth: {
        eventLimit: 3,
      },
    },

    events: events(),
  });

  calendar.render();
}

function randomIDGenerate(length, chars) {
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}

function events() {
  return [
    {
      id: "event1",
      title: "All Day Event",
      start: new Date(year, month, 1, 0, 0),
      end: new Date(year, month, 1, 23, 59),
      className: "fc-event-success",
      description:
        "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.",
    },
    {
      id: "event2",
      title: "Break",
      start: new Date(year, month, day + 28, 16, 0),
      end: new Date(year, month, day + 29, 20, 0),
      allDay: false,
      className: "fc-event-primary",
      description:
        "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see. ",
    },
    {
      id: "event3",
      title: "Shopping",
      start: new Date(year, month, day + 4, 12, 0),
      end: new Date(year, month, day + 4, 20, 0),
      allDay: false,
      className: "fc-event-warning",
      description:
        "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see. ",
    },
    {
      id: "event4",
      title: "Meeting",
      start: new Date(year, month, day + 14, 10, 30),
      end: new Date(year, month, day + 16, 20, 0),
      allDay: false,
      className: "fc-event-success",
      description:
        "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.",
    },
    {
      id: "event5",
      title: "Lunch",
      start: new Date(year, month, day, 11, 0),
      end: new Date(year, month, day, 14, 0),
      allDay: false,
      className: "fc-event-primary",
      description:
        "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.",
    },
    {
      id: "event6",
      title: "Office Party",
      start: new Date(year, month, day + 2, 12, 30),
      end: new Date(year, month, day + 2, 14, 30),
      allDay: false,
      className: "fc-event-success",
      description:
        "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.",
    },
    {
      id: "event7",
      title: "Birthday Party",
      start: new Date(year, month, day + 17, 19, 0),
      end: new Date(year, month, day + 17, 19, 30),
      allDay: false,
      className: "fc-event-warning",
      description:
        "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.",
    },
    {
      id: "event8",
      title: "Go to Delhi",
      start: new Date(year, month, day + -5, 10, 0),
      end: new Date(year, month, day + -4, 10, 30),
      allDay: false,
      className: "fc-event-danger",
      description:
        "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.",
    },
    {
      id: "event9",
      title: "Get To Gather",
      start: new Date(year, month, day + 6, 10, 0),
      end: new Date(year, month, day + 7, 10, 30),
      allDay: false,
      className: "fc-event-info",
      description:
        "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.",
    },
    {
      id: "event10",
      title: "Collage Party",
      start: new Date(year, month, day + 20, 10, 0),
      end: new Date(year, month, day + 20, 10, 30),
      allDay: false,
      className: "fc-event-info",
      description:
        "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.",
    },
  ];
}
