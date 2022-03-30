const calculatorButtons = document.querySelectorAll(".btn");
const numberButtons = document.querySelectorAll(".btn-number");
const operandButtons = document.querySelectorAll(".btn-op");
const display = document.querySelector(".display");

let firstOperand, secondOperand;
let operator;
let isThereOperator = false;
let isThereFirstOperand = false;
let isThereSecondOperand = false;
display.innerHTML = "";

window.addEventListener('keydown', (e) => {
    console.log("Pressed ", e.key);

    switch (e.key) {

        case "Delete":
        case "Backspace":
            clearDisplay();
            break;
        case "/":
        case "*":
        case "-":
        case "+":
            recordFirstOperand();
            if(!isThereOperator) {
                
                updateDisplay(e);
                isThereOperator = true;
                isThereFirstOperand = true;
                recordOperator(e);
            }
            break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "10":
            updateDisplay(e);
            break;
        case "Enter":

            recordSecondOperand();
            display.innerHTML = calculate();
            isThereOperator = false;
            isThereFirstOperand = false;
            isThereSecondOperand = false;
            break;

        
        default:
            break;
    }
}, false);

calculatorButtons.forEach(addEventListener('click', (e) => {    
    
    logDisplayButtonClick(e);

    switch (e.target.innerHTML) {

        case "C":
            clearDisplay();
            break;

        case "+":
        case "-":
        case "/":
        case "*":
            recordFirstOperand();
            if(!isThereOperator) {
                
                updateDisplay(e);
                isThereOperator = true;
                isThereFirstOperand = true;
                recordOperator(e);
            }
            else {
                alert("Operator is already present");
            }
            break;
        case "=":
            recordSecondOperand();
            // display.innerHTML = compute(display.innerHTML);
            // display.innerHTML = math.evaluate(display.innerHTML);
            // calculate();
            display.innerHTML = calculate();
            isThereOperator = false;
            isThereFirstOperand = false;
            isThereSecondOperand = false;
            break;
            
        default:
            updateDisplay(e);
            break;

    }
}));



function logDisplayButtonClick (e) {
    if(e.target.matches("button")) {
        console.log("clicked ", e.target.innerHTML);
    }
}

function updateDisplay(e) {
    if (e instanceof KeyboardEvent) {
        display.innerHTML += e.key;
        
    } else {
        if(e.target.matches("button")) {
            display.innerHTML += e.target.innerHTML; 
        }
        
    }
    
}

function clearDisplay() {
    display.innerHTML = "";
    console.log("Cleared display");
    firstOperand = NaN;
    secondOperand = NaN;
    isThereFirstOperand = false;
    isThereSecondOperand = false;
    isThereOperator = false;
    operator = null;
}

function recordFirstOperand () {
    if(display.innerHTML != "") {
        firstOperand = parseFloat(display.innerHTML);
        console.log("recorded first operand " + firstOperand);
    }
}

function recordOperator (op) {

    if (op instanceof KeyboardEvent) {
        operator = op.key;
    }
    else {
        operator = op.target.innerHTML;
    }
    
}

function recordSecondOperand () {
    
    if(isThereOperator && isThereFirstOperand) {
        secondOperand = parseFloat(display.innerHTML.substring(display.innerHTML.indexOf(operator) + 1));
        console.log("Recorded second operand " + secondOperand);
        isThereSecondOperand = true;
    }
}

function calculate() {

    if (isThereFirstOperand && isThereOperator && isThereSecondOperand) {

        let result;
        switch (operator) {
            case "+":
                result = firstOperand + secondOperand;
                break;
            case "-":
                result = firstOperand - secondOperand;
                break;
            case "*":
                result = firstOperand * secondOperand;
                break;
            case "/":
                result = firstOperand / secondOperand;
                break;
        }
        console.log("result of " + firstOperand + " " + operator + " " + secondOperand + " = " + result );
        return result;
        
    }

}



// function compute(s) {
//     let total = 0;

//     s = s.match(/[+\-]*(\.\d+|\d+(\.\d+)?)/g) || [];
        
//     while (s.length) {
//       total += parseFloat(s.shift());
//     }

//     return total;
//   }
// function blink () {
//     while(true) {
//         display.innerHTML = "|";
//         setTimeout(1000);
//         display.innerHTML = "";
//         setTimeout(1000);
//     }
// }