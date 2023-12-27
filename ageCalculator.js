let inputDateBirth = document.querySelector("#date-input");
let btnCalc = document.querySelector(".calc-btn");
let btnReset = document.querySelector(".btn-reset");
let boxYears = document.querySelector(".box .years");
let boxMonths = document.querySelector(".box .months");
let boxDays = document.querySelector(".box .days");

btnCalc.addEventListener("click", ageCalculate);

btnReset.addEventListener("click", () => {
  displayResult("0", "0", "0");
});

function ageCalculate() {
  if (inputDateBirth.value !== "") {
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
    if (
      isFutureDate(birthDateDetails, currentYear, currentMonth, currentDate)
    ) {
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
  } else {
    alert("Please add date of birth");
  }
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

  [years, months] = calcMonths(years, currentMonth, birthDateDetails.month);
  [months, days] = calcDays(
    months,
    currentDate,
    currentMonth,
    currentYear,
    birthDateDetails.date
  );
  return { years, months, days };
}

function calcMonths(years, currentMonth, birthMonth) {
  let months;
  if (currentMonth < birthMonth) {
    years--;
    months = 12 - (birthMonth - currentMonth);
  } else {
    months = currentMonth - birthMonth;
  }
  return [years, months];
}

function calcDays(months, currentDate, currentMonth, currentYear, birthDate) {
  let days;
  if (currentDate < birthDate) {
    months--;
    const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const daysInlastMonth = getDaysInMonth(lastMonth, currentYear);
    days = daysInlastMonth - (birthDate - currentDate);
  } else {
    days = currentDate - birthDate;
  }
  return [months, days];
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
  }, 1500);
});

// Light & Dark Theme
let btnThem = document.querySelector(".switch");
let rootElement = document.documentElement;

checkLocalStorage();

btnThem.addEventListener("click", switchThem);

function switchThem() {
  let dataThem = rootElement.getAttribute("data-theme");
  let newThem = dataThem === "light" ? "dark" : "light";

  rootElement.setAttribute("data-theme", newThem);
  btnThem.classList.toggle("trans");
  // set local Storage
  localStorage.setItem("them", newThem);
  localStorage.setItem("IconTransform", btnThem.classList.item(1));
}

function checkLocalStorage() {
  if (localStorage.getItem("them")) {
    rootElement.setAttribute("data-theme", localStorage.getItem("them"));
  }

  if (localStorage.getItem("IconTransform") === "trans") {
    btnThem.classList.add("trans");
  }
}
// localStorage.clear();
