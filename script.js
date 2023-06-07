//import * as test from './tests.js';

const date = new Date();

const submitBtn = document.getElementById("submit-data-button");


const currentDate = { 
     day : date.getDate(),
     month : date.getMonth(),
     year : date.getFullYear(),
     date: new Date(),
}

const outputElements = [
     document.getElementById("years-output"),
     document.getElementById("months-output"),
     document.getElementById("days-output")
]

const errorLabels = [
     document.getElementById("day-error-label"), //o - day
     document.getElementById("month-error-label"), // 1 - month
     document.getElementById("year-error-label"), //2 - year
 ]
 
 const errorMess = {
     emptyField : "field is empty",
     badDay : "The day number is not between 1-31",
     badMonth: "The month number is not between 1-12",
     badYear: "The year is in the future",
     invalidDate: "The date is invalid",
 };
 


function formatDate (date) { 

     newDate = new Date(date.year,date.month,date.day);
     console.log(newDate);
     return newDate;
}

//obj for data from input

const submitDate = {
     day : 23,
     month: 4,
     year: 1999,
     date: '',
     
     setDate() { this.date=formatDate(this)},
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

function throwError(message,label){
     if(typeof(message) === "string"){
         label.innerHTML = message;
     }
 };
 
 function notEmpty(input, inputIndex){
     if(typeof(input) === 'string'){
         if(input !== ''){
             return true;
         }
         else
         {
             throwError(
                 errorMess.emptyField,errorLabels[inputIndex]);
             return false;
         }
     }
 }
 
 function isValid(input,inputIndex){
     if(Boolean(input.match(/^[0-9]*$/)))
     {
         if(inputIndex === '0') //if day
         {
             if(0<input<=31)
             {
                 return true;
             }
             else
             {
                 throwError(
                     errorMess.invalidDate,errorLabels[inputIndex]);
                 return false;
             }
         }
 
         if(inputIndex === '1') //if month
         {
             if(0<input<=12)
             {
                 return true;
             } 
             else 
             {
                 throwError(
                     errorMess.invalidDate,errorLabels[inputIndex]);
                 return false;
             }
         } 
 
         if(inputIndex === '2') //if year
         {
             if(input.lenght() === '4')
             {
                 return true;
             } 
             else 
             {
                 throwError(
                     errorMess.invalidDate,errorLabels[inputIndex]);
                 return false;
             }
         }
     }
     else 
     {
         throwError(
             errorMess.invalidDate,errorLabels[inputIndex]);
         return false;
     }
 }
 
 function isPast(submitdate,currentDate){
     if(submitdate > currentDate)
         {
             throwError(
                 errorMess.invalidDate,errorLabels[inputIndex]);
             return false;
         }
 }



//return input elemetns

function getInputs () {
     var elements = Array.from(document.getElementsByTagName('input'));
     var inputs = []
     elements.forEach((element,index) => {
          var val = element.value;
          if(notEmpty(val, index)
          && isValid(val, index)
          ){inputs[index] = Number(val);}
          else{console.log("${index} input is empty! ");}    
     });

     return inputs;
}

function showOutput () {

     diff = Calculate.diffTime();

     outputElements[0].innerHTML = Calculate.years(diff);
     outputElements[1].innerHTML = Calculate.months(diff);
     outputElements[2].innerHTML = Calculate.days(diff);
}


//event handler

submitBtn.addEventListener("click", () => {
     
     inputs = getInputs();

     submitDate.day = inputs[0];
     submitDate.month = inputs[1]-1; // 0 - jan
     submitDate.year = inputs[2];

     submitDate.setDate();  //format full date from submit

     showOutput();
} );
 
