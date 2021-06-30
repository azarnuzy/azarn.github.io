const container = document.querySelector(".container");

let number1 = "";
let operator1 = "";
let operator2 = [];
let number2 = [];
let i = 0,
  j = 0;
let cek = false;
const hasil = "";
let results = 0;

const show = function (number) {
  const mainCal = document.querySelector(".main-cal");
  mainCal.innerHTML = `
    <h1>${number}</h1>
  `;
};

const operation = function (number1, number2, operator) {
  let a = parseInt(a);
  let b = parseInt(b);

  if (operator == "+") {
    results += a + b;
  } else if (operator == "-") {
    results += a - b;
  } else if (operator == "+/-") {
    results = -1 * a;
  } else if (operator == "=") {
    results = results;
  } else if (operator == "CE") {
    results = 0;
  }
};

container.addEventListener("click", function (e) {
  const button = e.target.classList.contains("button");
  if (button == true) {
    const content = e.target.textContent;
    if (content >= 0 && content <= 9) {
      number1 += content;
      show(number1);
      console.log(number1);
      cek = false;
    } else if (e.target.classList.contains("symbol") == true) {
      if (number1.length != 0) {
        number2.push(number1);
        console.log(number2[i++]);
      }
      number1 = "";
      operator1 = content;
      cek = true;
    }

    if (cek == false && operator1.length != 0) {
      operator2.push(operator1);
      console.log(operator2[j++]);
      operator1 = "";
    }

    if (j > 1) {
      console.log(number2[i - 2], number2[i - 1], operator2[j - 1]);
      operation(number2[i - 2], number2[i - 1], operator2[j - 1]);
      show(results);
    }
  }
});
