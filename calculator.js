const allowedNumberOfSymbols = 15;
const errorMessage = "Math Error";

const calculator = document.getElementById('calculator').rows;

const screen = calculator[0].cells[0];

const deleteButton = calculator[1].cells[0];
const divideButton = calculator[1].cells[1];
const multiplyButton = calculator[1].cells[2];
const backButton = calculator[1].cells[3];

const sevenButton = calculator[2].cells[0];
const eightButton = calculator[2].cells[1];
const nineButton = calculator[2].cells[2];
const minusButton = calculator[2].cells[3];

const fourButton = calculator[3].cells[0];
const fiveButton = calculator[3].cells[1];
const sixButton = calculator[3].cells[2];
const plusButton = calculator[3].cells[3];

const oneButton = calculator[4].cells[0];
const twoButton = calculator[4].cells[1];
const threeButton = calculator[4].cells[2];
const equalsButton = calculator[4].cells[3];

const zeroButton = calculator[5].cells[0];
const dotButton = calculator[5].cells[1];

const buttonArray = [ divideButton, multiplyButton, sevenButton, eightButton, nineButton, minusButton, fourButton, fiveButton, sixButton, plusButton, oneButton, twoButton, threeButton, zeroButton, dotButton ];

const addListenerForNumbers = (element) => {
    element.addEventListener( "click", function() {
        const lastTwoSymbolsOnScreen = screen.innerHTML.slice(-2);
        const isSymbolAndZero = isNaN( lastTwoSymbolsOnScreen[0] ) && lastTwoSymbolsOnScreen[1] == 0; // prevents 15000+020=15016
        
        if ( !(screen.innerHTML.length < allowedNumberOfSymbols && screen.innerHTML != errorMessage && !isSymbolAndZero) ) {
            return;
        }

        if ( screen.innerHTML == 0 && screen.innerHTML.length == 1 ) { // "0." also evaluates true in first condition
            screen.innerHTML = element.innerHTML;
        } else {
            screen.innerHTML += element.innerHTML;
        }
    } )
};

const addListenerForSymbols = (element) => {
    element.addEventListener( "click", function() {
        if ( screen.innerHTML.length < allowedNumberOfSymbols && isNaN( screen.innerHTML.slice(-1) ) != isNaN(element.innerHTML) && screen.innerHTML != errorMessage ) {
            screen.innerHTML += element.innerHTML;
        }
    } )
};

deleteButton.addEventListener( "click", function() {
    screen.innerHTML = 0;
} )

backButton.addEventListener( "click", function() { // deleting the last number should result in zero, not blank cell
    if ( screen.innerHTML != errorMessage ) {
        screen.innerHTML = screen.innerHTML.length === 1 ? 0 : screen.innerHTML.slice(0, -1);
    }
} )

equalsButton.addEventListener( "click", function() {
    const screenEval = eval(screen.innerHTML);
    const symbolsOnScreenAfterEval = screenEval.toString().length;

    if ( isFinite( screenEval ) && symbolsOnScreenAfterEval <= allowedNumberOfSymbols ) {
        screen.innerHTML = screenEval;
    } else if ( isFinite( screenEval ) && symbolsOnScreenAfterEval > allowedNumberOfSymbols ) {
        screen.innerHTML = parseFloat( screenEval ).toFixed(10);
    } else {
        screen.innerHTML = errorMessage;
    }
}  )

for ( let i = 0; i < buttonArray.length; i++ ) { // creating all listeners (+15 lines saved)
    isNaN( buttonArray[i].innerHTML ) ? addListenerForSymbols( buttonArray[i] ) : addListenerForNumbers( buttonArray[i] );
}
