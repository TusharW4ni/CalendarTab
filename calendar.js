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

const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const monthYearElement = document.getElementById("monthYear");
const calendarBodyElement = document.getElementById("calendar-body");

// Function to render calendar for a specific month and year
function renderCalendar(month, year) {
  // Set month and year title
  monthYearElement.innerText = `${monthNames[month]} ${year}`;

  // Clear previous rows
  calendarBodyElement.innerHTML = "";

  // Get first day of the month
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create rows for the calendar
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

// Initial render
renderCalendar(currentMonth, currentYear);
