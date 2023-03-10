let runningtotal = 0;
let buffer = "0";
let previousoperator;

const screen = document.querySelector('.screen');

function buttonclick(value){
    if(isNaN(value)){
        handlesymbol(value);
    }else{
        handlenumber(value);
    }
    screen.innertext = buffer;
}

function handlesymbol(symbol){
    switch(symbol){
        case 'c':
            buffer = '0';
            runningtotal = 0;
            break;
        case '=':
            if(previousoperator === null){
                return;
            }    
            flushoperation(parseInt(buffer));
            previousoperator = null;
            buffer = runningtotal;
            runningtotal = 0;
            break;
        case '←':
            if(buffer.length ===1){
                buffer = '0';
            }else{
                buffer = buffer.toString(0, buffer.lenght - 1);
            } 
            break;   
        case '+':
        case '-':
        case 'x':
        case '÷':
            handlemath(symbol);
            break;     
    }
}

function handlemath(symbol){
    if(buffer === '0'){
        return;
    }
 
    const intbuffer = parseInt(buffer);

    if(runningtotal === 0){
        runningtotal = intbuffer;
    }else{
        flushoperation(intbuffer);
    }
    previousoperator = symbol;
    buffer = 0;
}

function flushoperation(intbuffer){
    if(previousoperator === '+'){
        runningtotal += intbuffer;
    }else if(previousoperator === '-'){
        runningtotal -= intbuffer;
    }else if(previousoperator === 'x'){
        runningtotal *= intbuffer;
    }else if(previousoperator === '÷'){
        runningtotal /= intbuffer;
    }
}

function handlenumber(numberstring){
    if(buffer === '0'){
        buffer = numberstring;
    }else{
        buffer += numberstring;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonclick(event.target.innertext);
    })
}

init();

