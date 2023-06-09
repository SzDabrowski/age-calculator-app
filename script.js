const submitBtn = document.getElementById("submit-data-button");
const currentDate = new Date();

const outputElements = {
    years: document.getElementById("years-output"),
    months: document.getElementById("months-output"),
    days: document.getElementById("days-output")
  };

anyTestBad = false ;


const errorLabels = [
     document.getElementById("day-error-label"), //o - day
     document.getElementById("month-error-label"), // 1 - month
     document.getElementById("year-error-label"), //2 - year
 ]
 
 const errorMessages = {
     emptyField : "This field is required",
     badDay : "Must be a valid day",
     badMonth: "Must be a valid month",
     badYear: " Must be in the past",
     invalidDate: "Must be a valid date",
 };
 


 function formatDate(day, month, year) {
    return new Date(year, month, day);
  }

//obj for data from input

const submitDate = {
    day: 23,
    month: 4,
    year: 1999,
    date: null,
    setDate() {
      this.date = formatDate(this.day, this.month, this.year);
    }
  };
//calculate diff

const Calculate = {

     diffTime : () => 
          Math.floor(currentDate.date-submitDate.date),

     days  : (diff) => 
          Math.ceil(diff / (1000 * 60 * 60 * 24)),

     months  : (diff) => 
          Math.floor(Math.ceil(diff / (1000 * 60 * 60 * 24))/30),

     years  : (diff) => 
          Math.floor(
               Math.ceil(diff / (1000 * 60 * 60 * 24))/(30*12))
}


//test

const errorHandler = {
    errorLabels: document.getElementsByClassName("error-label"),
    inputs: document.getElementsByTagName("input"),
    inputContainers: document.getElementsByClassName("input-container"),
    redColor: "hsl(0, 100%, 67%)",
    grayColor: "hsl(0, 1%, 44%)",
    lightGrayColor: "hsl(0, 0%, 86%)",
  
    showError(index) {
      this.errorLabels[index].style.display = "inline";
      this.inputs[index].style.borderColor = this.redColor;
      Array.from(this.inputs).forEach((element, index) => {
        element.style.borderColor = this.redColor;
        this.inputContainers[index].getElementsByTagName("label")[0].style.color = this.redColor;
    });
    },
  
    hideError(index) {
      this.errorLabels[index].style.display = "none";
      this.inputs[index].style.borderColor = this.lightGrayColor;
      this.inputContainers[index].getElementsByTagName("label")[0].style.color = this.grayColor;
    },
  
    throwError(message, index) {
        if (typeof message === "string") {
            errorLabels[index].innerHTML = message;
            this.showError(index);
            anyTestBad = true; // Set the flag to true
        }
      }
  };

  function notEmpty(input, inputIndex) {
    if (typeof input === "string") {
      if (input !== "") {
        return true;
      } else {
        return errorHandler.throwError(errorMessages.emptyField, inputIndex);
      }
    }
  }
 
 function isValid(input,inputIndex){
    if (Boolean(input.match(/^[0-9]*$/))) {
        if (inputIndex === 0) {
          if (input > 0 && input < 32) {
            return true;
          } else {
            return errorHandler.throwError(errorMessages.badDay, inputIndex);
          }
        }
 
        if (inputIndex === 1) {
            if (input > 0 && input < 13) {
              return true;
            } else {
              return errorHandler.throwError(errorMessages.badMonth, inputIndex);
            }
          }
 
        if(inputIndex === 2) {
            if (String(input).length === 4 && input < currentDate.getFullYear()) {
              return true;
            } else if(String(input).length === 4){
                return errorHandler.throwError(errorMessages.badYear, inputIndex);
            }else {
              return errorHandler.throwError(errorMessages.invalidDate, inputIndex);
            }
          }
        } else {
          return errorHandler.throwError(errorMessages.invalidDate, inputIndex);
        }
      }

function isReal(day, month, year) {
    const newDate = new Date(year, month, day);
    if(!(newDate.getDate() === day)  || !(newDate.getMonth() === month))
        {errorHandler.throwError(errorMessages.invalidDate,0)};
} 
 
 function isPast(submitdate,currentDate){
     if(submitdate > currentDate)
         {
            errorHandler.throwError(
                 errorMessages.invalidDate,inputIndex);
             return false;
         }
 }



//return input elemetns

function getInputs () {
    for(let i = 0; i < 3; i++){ //setall error labels to hidden by default
        errorHandler.hideError(i);
    }

    const inputElements = Array.from(document.getElementsByTagName('input'));
    const inputs = []

    inputElements.forEach((element,index) => {
        const value = element.value;
        if (notEmpty(value, index) && isValid(value, index)) {
            inputs[index] = Number(value);
            bNoErr = true;
          }
        });

    const [day, month, year] = inputs;
    
    if(day!==undefined && month!==undefined & year!==undefined){
        isReal(day, month - 1, year);
    }
        

     return inputs;
}

function showOutput() {
    const diff = currentDate - submitDate.date;
    const dayValue = (1000 * 60 * 60 * 24);
    const showNoValue = "--";
    
    if(!anyTestBad){
        outputElements.years.innerHTML = Math.floor(diff / (dayValue * 365));
        outputElements.months.innerHTML = Math.floor(diff / (dayValue * 30));
        outputElements.days.innerHTML = Math.floor(diff / dayValue );
    }
    else
    {
        outputElements.years.innerHTML = showNoValue;
        outputElements.months.innerHTML = showNoValue;
        outputElements.days.innerHTML = showNoValue;
    }
  }

//event handler

submitBtn.addEventListener("click", () => { 
     
    anyTestBad = false; // Reset the flag before running the tests

     inputs = getInputs();
     submitDate.day = inputs[0];
     submitDate.month = inputs[1]-1; // 0 - jan
     submitDate.year = inputs[2];
     submitDate.setDate();  //format full date from submit

     showOutput();
} );
 
