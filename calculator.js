const allowedNumberOfSymbols = 15;
const errorMessage = "Math Error";

const calculator = document.getElementById('calculator').rows;

const screen = calculator[0].cells[0];

const buttons$ = {
    delete: calculator[1].cells[0], // testing
    divide: calculator[1].cells[1],
    multiply: calculator[1].cells[2],
    back: calculator[1].cells[3],

    seven: calculator[2].cells[0],
    eight: calculator[2].cells[1],
    nine: calculator[2].cells[2],
    minus: calculator[2].cells[3],

    four: calculator[3].cells[0],
    five: calculator[3].cells[1],
    six: calculator[3].cells[2],
    plus: calculator[3].cells[3],

    one: calculator[4].cells[0],
    two: calculator[4].cells[1],
    three: calculator[4].cells[2],
    equals: calculator[4].cells[3],

    zero: calculator[5].cells[0],
    dot: calculator[5].cells[1],
};

const buttonArray = [ buttons$.divide, buttons$.multiply, buttons$.seven, buttons$.eight, buttons$.nine, buttons$.minus, buttons$.four, buttons$.five, buttons$.six, buttons$.plus, buttons$.one, buttons$.two, buttons$.three, buttons$.zero, buttons$.dot ];

const isScreenCapacityExceeded = () => screen.innerHTML.length >= allowedNumberOfSymbols;
const isScreenDisplayingError = () => screen.innerHTML === errorMessage;
const isUserTryingToEnterTwoSymbolsInARow = ( element ) => isNaN( screen.innerHTML.slice(-1) ) === isNaN( element.innerHTML );

const isScreenZero = () => screen.innerHTML == 0 && screen.innerHTML.length == 1; // "0." also evaluates true in first condition

const addListenerForNumbers = ( element ) => {
    element.addEventListener( "click", function() {
        if ( isScreenCapacityExceeded() || isScreenDisplayingError() ) return;
        isScreenZero() ? screen.innerHTML = element.innerHTML : screen.innerHTML += element.innerHTML;
    } )
};

const addListenerForSymbols = ( symbol ) => {
    symbol.addEventListener( "click", function() {
        if ( isScreenCapacityExceeded() || isScreenDisplayingError() || isUserTryingToEnterTwoSymbolsInARow( symbol ) ) return;
        screen.innerHTML += symbol.innerHTML;
    } )
};

const addListenerForDelete = () => {
    buttons$.delete.addEventListener( "click", function() {
        screen.innerHTML = 0;
    } )
};

const addListenerForBack = () => {
    buttons$.back.addEventListener( "click", function() { // deleting the last number should result in zero, not blank cell
        if ( isScreenDisplayingError() ) return;
        screen.innerHTML = screen.innerHTML.length === 1 ? 0 : screen.innerHTML.slice(0, -1);
    } )
};

const addListenerForEquals = () => {
    buttons$.equals.addEventListener( "click", function() {
        if ( isNaN( screen.innerHTML.slice(-1) ) ) return;
        
        const screenEval = eval( screen.innerHTML );
        const numberOfSymbolsOnScreenAfterEval = screenEval.toString().length;
    
        if ( isFinite( screenEval ) && numberOfSymbolsOnScreenAfterEval <= allowedNumberOfSymbols ) {
            screen.innerHTML = screenEval;
        } else if ( isFinite( screenEval ) && numberOfSymbolsOnScreenAfterEval > allowedNumberOfSymbols ) {
            screen.innerHTML = parseFloat( screenEval ).toFixed(10);
        } else {
            screen.innerHTML = errorMessage;
        }
    }  )
};

function init () {
    for ( let i = 0; i < buttonArray.length; i++ ) {
        isNaN( buttonArray[i].innerHTML ) ? addListenerForSymbols( buttonArray[i] ) : addListenerForNumbers( buttonArray[i] );
    }

    addListenerForDelete();
    addListenerForBack();
    addListenerForEquals();
}

init();
