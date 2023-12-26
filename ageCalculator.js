let inputDateBirth = document.querySelector("#date-input");
let btnCalc = document.querySelector(".calc-btn");
let boxYears = document.querySelector(".box .years");
let boxMonths = document.querySelector(".box .months");
let boxDays = document.querySelector(".box .days");

btnCalc.addEventListener("click", ageCalculate);

function ageCalculate() {
  const today = new Date();
  const inputDate = new Date(inputDateBirth.value);
  //
  const birthDateDetails = {
    date: inputDate.getDate(),
    month: inputDate.getMonth() + 1,
    year: inputDate.getFullYear(),
  };
  //
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDate = today.getDate();
  //
  if (isFutureDate(birthDateDetails, currentYear, currentMonth, currentDate)) {
    // alert("Not born Yet ");
    alert("date of birth can't be in the future");
    displayResult("0", "0", "0");
    return;
  }
  //
  const { years, months, days } = calculateAge(
    birthDateDetails,
    currentYear,
    currentMonth,
    currentDate
  );
  //
  displayResult(days, months, years);
  inputDateBirth.value = "";
}

function isFutureDate(
  birthDateDetails,
  currentYear,
  currentMonth,
  currentDate
) {
  return (
    birthDateDetails.year > currentYear ||
    (birthDateDetails.year === currentYear &&
      (birthDateDetails.month > currentMonth ||
        (birthDateDetails.month === currentMonth &&
          birthDateDetails.date > currentDate)))
  );
}

function calculateAge(
  birthDateDetails,
  currentYear,
  currentMonth,
  currentDate
) {
  let years = currentYear - birthDateDetails.year;
  let months, days;
  // Calc Months
  if (currentMonth < birthDateDetails.month) {
    years--;
    months = 12 - (birthDateDetails.month - currentMonth);
  } else {
    months = currentMonth - birthDateDetails.month;
  }
  //Calc Days
  if (currentDate < birthDateDetails.date) {
    months--;
    const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const daysInlastMonth = getDaysInMonth(lastMonth, currentYear);
    days = daysInlastMonth - (birthDateDetails.date - currentDate);
  } else {
    days = currentDate - birthDateDetails.date;
  }
  return { years, months, days };
}

function getDaysInMonth(month, year) {
  const isLeapYear = year % 4 === 0 && (year % 100 != 0 || year % 400 === 0);
  const getDaysInMonth = [
    31,
    isLeapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  return getDaysInMonth[month - 1];
}

function displayResult(birthDate, birthMonth, birthYear) {
  boxYears.textContent = birthYear;
  boxMonths.textContent = birthMonth;
  boxDays.textContent = birthDate;
}

// preload
let preloadContent = document.querySelector(".preload");

window.addEventListener("load", () => {
  setTimeout(() => {
    preloadContent.classList.add("hidden");
  }, 1600);
});
