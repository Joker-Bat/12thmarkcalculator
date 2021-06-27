// Elements
const form = document.getElementById("formList");
const tenthMarks = document.querySelectorAll(".tenthmarks");
const eleventhMarks = document.querySelectorAll(".eleventhmarks");
const twelfthMarks = document.querySelectorAll(".twelfthmarks");
const resultPage = document.getElementById("resultPage");
const tryAgain = document.getElementById("tryAgain");
const tamilMark = document.getElementById("tamilMark"),
  englishMark = document.getElementById("englishMark"),
  mathsMark = document.getElementById("mathsMark"),
  physicsMark = document.getElementById("physicsMark"),
  chemistryMark = document.getElementById("chemistryMark"),
  biologyMark = document.getElementById("biologyMark"),
  totalMark = document.getElementById("totalMark");

// Form submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  resultPage.classList.add("show");
  const _10thMarks = get10thMarks();
  const _11thMarks = get11thMarks();
  const _12thMarks = get12thMarks();
  calculateMarks(_10thMarks, _11thMarks, _12thMarks);
  window.scrollTo(0, 0);
});

tryAgain.addEventListener("click", () => {
  tenthMarks.forEach((item) => (item.value = ""));
  eleventhMarks.forEach((item) => (item.value = ""));
  twelfthMarks.forEach((item) => (item.value = 30));
  tamilMark.innerText = 0;
  englishMark.innerText = 0;
  mathsMark.innerText = 0;
  physicsMark.innerText = 0;
  chemistryMark.innerText = 0;
  biologyMark.innerText = 0;
  resultPage.classList.remove("show");
  window.scrollTo(0, 0);
});

function get10thMarks() {
  const _10thMarks = [];
  tenthMarks.forEach((item) => _10thMarks.push(item.value));

  // Sort and get highest 3 marks
  _10thMarks.sort((a, b) => b - a);
  const best3Marks = _10thMarks.slice(0, 3);

  const best3MarksTotal = best3Marks.reduce((acc, cur) => (acc += +cur), 0);

  let _10thMarksFor50 = (best3MarksTotal / 3).toFixed(2);

  _10thMarksFor50 = getDecimalCorrectedValue(_10thMarksFor50);

  return (_10thMarksFor50 * 0.5).toFixed(2);
}

function get11thMarks() {
  const _11thMarks = [];
  // If mark less then 35 then make it 35
  eleventhMarks.forEach((item) =>
    _11thMarks.push(item.value < 35 ? 35 : item.value)
  );
  const theoryMarks = _11thMarks.slice(0, 3);
  const coreMarks = _11thMarks.slice(3);
  const theoryMarksFor20 = theoryMarks.map((item) => {
    const for100 = ((item / 90) * 100).toFixed(2);
    const for20 = for100 * 0.2;
    return getDecimalCorrectedValue(for20);
  });
  const coreMarksFor20 = coreMarks.map((item) => {
    const for100 = ((item / 70) * 100).toFixed(2);
    const for20 = for100 * 0.2;
    return getDecimalCorrectedValue(for20);
  });
  return { theoryMarksFor20, coreMarksFor20 };
}

function get12thMarks() {
  const _12Marks = [];
  twelfthMarks.forEach((item) => _12Marks.push(+item.value));
  return _12Marks;
}

function calculateMarks(_10, _11, _12) {
  const { theoryMarksFor20, coreMarksFor20 } = _11;
  // Calculate values
  const tamil =
    parseInt(_10) + parseInt(theoryMarksFor20[0]) + parseInt(_12[0]);
  const english =
    parseInt(_10) + parseInt(theoryMarksFor20[1]) + parseInt(_12[1]);
  const maths =
    parseInt(_10) + parseInt(theoryMarksFor20[2]) + parseInt(_12[2]);
  const physics =
    parseInt(_10) + parseInt(coreMarksFor20[0]) + parseInt(_12[3]);
  const chemistry =
    parseInt(_10) + parseInt(coreMarksFor20[1]) + parseInt(_12[4]);
  const biology =
    parseInt(_10) + parseInt(coreMarksFor20[2]) + parseInt(_12[5]);

  // Put values to UI
  tamilMark.innerText = tamil;
  englishMark.innerText = english;
  mathsMark.innerText = maths;
  physicsMark.innerText = physics;
  chemistryMark.innerText = chemistry;
  biologyMark.innerText = biology;
  totalMark.innerText = tamil + english + maths + physics + chemistry + biology;
}

// Helper functions
function ceilNumber(num) {
  return Math.ceil(num);
}

function floorNumber(num) {
  return Math.floor(num);
}
// Get correct value based on Decimal
function getDecimalCorrectedValue(num) {
  let decimalPoint = num.toString().split(".")[1];
  // Only if it has decimal value
  if (decimalPoint) {
    decimalPoint = decimalPoint.toString().substring(0, 2);
  }
  if (decimalPoint > 51) num = ceilNumber(num);
  else num = floorNumber(num);

  return num;
}
