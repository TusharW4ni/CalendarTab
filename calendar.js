const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const monthYearElement = document.getElementById("monthYear");
const hiddenDatePicker = document.getElementById("hiddenDatePicker");
const calendarBodyElement = document.getElementById("calendar-body");
const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");

// Function to render calendar for a specific month and year
function renderCalendar(month, year) {
  monthYearElement.innerText = `${monthNames[month]} ${year}`;
  hiddenDatePicker.value = `${year}-${(month + 1).toString().padStart(2, "0")}`;
  calendarBodyElement.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let date = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("td");
      if (i === 0 && j < firstDay) {
        cell.innerHTML = "";
      } else if (date > daysInMonth) {
        break;
      } else {
        cell.innerHTML = date;
        if (
          date === currentDate.getDate() &&
          month === currentDate.getMonth() &&
          year === currentDate.getFullYear()
        ) {
          cell.classList.add("active");
        }
        date++;
      }
      row.appendChild(cell);
    }
    calendarBodyElement.appendChild(row);
  }
}

// Function to update the calendar when navigating months
function updateCalendar(increment) {
  currentMonth += increment;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
}

// Function to go directly to a selected date using the hidden date picker
function goToMonthYear(monthYearValue) {
  const [year, month] = monthYearValue.split("-").map(Number);
  currentMonth = month - 1;
  currentYear = year;
  renderCalendar(currentMonth, currentYear);
}

// Event Listeners
prevMonthButton.addEventListener("click", () => updateCalendar(-1));
nextMonthButton.addEventListener("click", () => updateCalendar(1));

// Listen for clicks on the monthYear text to show the date picker
monthYearElement.addEventListener("click", () => {
  hiddenDatePicker.style.display = "inline-block"; // Show the date picker
  hiddenDatePicker.focus(); // Focus the hidden date picker
});

// Listen for changes in the hidden date picker
hiddenDatePicker.addEventListener("change", (e) => {
  goToMonthYear(e.target.value);
  hiddenDatePicker.style.display = "none"; // Hide the date picker after selection
});

// Hide the date picker when clicking outside of it
document.addEventListener("click", (event) => {
  if (
    !monthYearElement.contains(event.target) &&
    !hiddenDatePicker.contains(event.target)
  ) {
    hiddenDatePicker.style.display = "none"; // Hide the date picker
  }
});

// Initial render
renderCalendar(currentMonth, currentYear);
