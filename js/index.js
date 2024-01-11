const previousNumber = document.querySelector(".previous");
const currentNumber = document.querySelector(".current");
const buttons = document.querySelectorAll("button");


class Calculator {

    constructor(previousNumber, currentNumber) {

        this.previousNumber = previousNumber;
        this.currentNumber = currentNumber;
        this.currentValue;

    }

    addDigit(digit) {

        if(digit === "." && this.currentNumber.innerText.includes(".") || digit === "." && this.currentNumber.innerText === "") {

            return

        } else {
            
        this.currentValue = digit;

        this.updateScreen()

        }

    }


    operationProcess(operation) {

        if (currentNumber.innerText === "" && operation !== "C") {

            if (previousNumber.innerText !== "") {

                this.changeOperation(operation)
                
            }

            return
        }

        let previous = +this.previousNumber.innerText.split(" ")[0];
        let current = +this.currentNumber.innerText;
        let operationValue = "";

        switch (operation) {

            case "+":
                operationValue = previous + current
                this.updateScreen(previous, current, operation, operationValue)
                break;
            case "-":
                operationValue = previous - current
                this.updateScreen(previous, current, operation, operationValue)
                break;
            case "*":
                operationValue = previous * current
                this.updateScreen(previous, current, operation, operationValue)
                break;
            case "/":
                operationValue = previous / current
                this.updateScreen(previous, current, operation, operationValue)
                break;
            case "CE":
                this.CE_Operator()
                break;
            case "C":
                this.C_Operator()
                break;
            case "DEL":
                this.DEL_Operator()
                break;
            case "=":
                this.Equal_Operator()
                break;
            default:
                break;
        }
    }


    updateScreen(previous = null, current = null, operation = null,operationValue = null) {

       if (operationValue === null) {

        this.currentNumber.innerText += this.currentValue;

       } else {

            if (previous === 0) {

                operationValue = current;

            }

            this.previousNumber.innerText = `${operationValue} ${operation}`

            this.currentNumber.innerText = " ";
       }
    }

    changeOperation(operation) {

        let mathOperation = ["+","-","*","/"];

        if (mathOperation.includes(operation)) {

            this.previousNumber.innerText = this.previousNumber.innerText.slice(0, -1) + operation
        }
    }

    CE_Operator() {

        this.currentNumber.innerText = " ";

    }

    C_Operator() {

        this.currentNumber.innerText = " ";
        this.previousNumber.innerText = " ";

    }

    DEL_Operator() {

        this.currentNumber.innerText = this.currentNumber.innerText.slice(0, -1)

    }

    Equal_Operator() {

        let operation = this.previousNumber.innerText.split(" ")[1];

        this.operationProcess(operation)
    }



}

const calc = new Calculator(previousNumber, currentNumber)


buttons.forEach((btn) => {

    btn.addEventListener("click", (e) => {

        const value = e.target.innerText;

        if (value >= 0 || value === ".") {

           calc.addDigit(value)

        } else {

            calc.operationProcess(value)

        }
    })
})

