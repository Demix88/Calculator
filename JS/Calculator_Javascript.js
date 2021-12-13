const Calculator= {//Making an object to keep track of values
    Display_Value:'0', //displays 0 on screen
    First_Operand:null,//holds first operand
    Wait_Second_Operand:false,//checks if second operand has been input
    operator:null,//holds the operator
};
function Input_Digit(digit) {//changes the value everytime the button is clicked
    const {Display_Value,Wait_Second_Operand} = Calculator; //
    if (Wait_Second_Operand === true) {//checks if 2nd operand is set and if it's true
        Calculator.Display_Value=digit;
        Calculator.Wait_Second_Operand=false;
    } else {
        Calculator.Display_Value=Display_Value==='0' ? digit :Display_Value + digit;//overwrites display value or adds to it
    }
}
function Input_Decimal(dot){//function for adding decimal point
if (Calculator.Wait_Second_Operand===true) return;//ensures that  accidental clicking of decimal point and dont cause bugs
if (!Calculator.Display_Value.includes(dot)) {//and dont cause bugs
Calculator.Display_Value+=dot;
    }
}
function Handle_Operator (Next_Operator) {// this funcntion handles operators
    const {First_Operand,Display_Value,operator} =Calculator
    const Value_of_Input=parseFloat(Display_Value);//converts the current number on screen (default is 0) to the number we pressed stores result in calculator.first operand if it didnt exist
    if (operator && Calculator.Wait_Second_Operand) {//used to check if operator exists and if wait second operand is true
        Calculator.operator=Next_Operator;//updates operator and exits function
        return;
    }
    if (First_Operand === null) {
        Calculator.First_Operand=Value_of_Input;
    
} else if (operator) {//checks if an operator already exists 
    const Value_Now=First_Operand ||0;//if operator exists, looks up the operators property
    let result =Perform_Calculation[operator](Value_Now,Value_of_Input ); //in the perform calculation object is looked up that matches the executed operator
    result=(result).toFixed(9)
    result=Number(result*1).toString()//removes any  trainling zeros
    Calculator.Display_Value=parseFloat(result);
    Calculator.First_Operand=parseFloat(result);

}
Calculator.Wait_Second_Operand=true;
Calculator.operator=Next_Operator;
}
const Perform_Calculation=  { 
   '/': (First_Operand, Second_Operand) => First_Operand/Second_Operand,//does the divison
   '*': (First_Operand, Second_Operand) =>First_Operand*Second_Operand,//does the multiplication
   '+': (First_Operand, Second_Operand) => First_Operand+Second_Operand,//does the addition
   '-': (First_Operand, Second_Operand) => First_Operand-Second_Operand,//does the substraction
   '=': (First_Operand, Second_Operand) => Second_Operand,//finds the result
};

function Calculator_Reset() { //function that resets calculators values to o
    Calculator.Display_Value='0';
    Calculator.First_Operand=null;
    Calculator.Wait_Second_Operand=false;
    Calculator.operator=null;
}
function Update_Display() {
    const display=document.querySelector('.calculator-screen');
    display.value=Calculator.Display_Value;
}
Update_Display();
const keys=document.querySelector('.calculator-keys');
keys.addEventListener('click', (event)=> { 
    const {target }=event;
    if(!target.matches ('button')) {
        return;
    }
    if(target.classList.contains('operator')) {
        Handle_Operator(target.value);
        Update_Display();
        return;
    }
    if (target.classList.contains ('decimal')){
        Input_Decimal(target.value);
        Update_Display();
        return;
    }
if (target.classList.contains('all-clear')) {
    Calculator_Reset();
    Update_Display();
    return;
}
Input_Digit(target.value);
Update_Display();

})





