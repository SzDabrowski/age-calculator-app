import * as test from './tests.js';

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


//return input elemetns

function getInputs () {
     elements = Array.from(document.getElementsByTagName('input'));
     inputs = []
     elements.forEach((element,index) => {

          if(element.value !== ''){inputs[index] = Number(element.value);}
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
 
