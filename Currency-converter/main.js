const input = require('sync-input');
let currencyList = {
    USD: 1.0,
    JPY: 113.5,
    EUR: 0.89,
    RUB: 74.36,
    GBP: 0.75
};

let currencyNameFrom;
let currencyNameTo;
let currencyAmount;

welcomeText();
chooseWhatToDo();

function welcomeText() {
    console.log("Welcome to Currency Converter!");
    for (let cur in currencyList) {
        console.log(`1 USD equals  ${currencyList[cur]} ${cur}`);
    }
}

function chooseWhatToDo() {
    console.log('What do you want to do?');
    let choose = Number(input('1-Convert currencies 2-Exit program\n'));
    if (choose === 1){
        iWantConvert();
    } else if (choose === 2) {
        iWantExit();
    } else {
        console.log('Unknown input');
        chooseWhatToDo();
    }
}

function iWantConvert() {
    console.log('What do you want to convert?');
    nameFrom();
    nameTo();
    amountFor();
}

function iWantExit() {
    console.log('Have a nice day!');
    process.exit();
}

function nameFrom() {
    currencyNameFrom = input('From: ').toUpperCase();
    checkNames(currencyNameFrom);
}

function nameTo() {
    currencyNameTo = input('To: ').toUpperCase();
    checkNames(currencyNameTo);
}

function amountFor() {
    currencyAmount = input('Amount: ');
    checkAmount();
}

function checkNames(name) {
    if (!currencyList.hasOwnProperty(name)) {
        console.log('Unknown currency');
        iWantConvert();
    }
}

function checkAmount() {
    if (currencyAmount >= 1) {
        calculateCurrency();
    } else if (isNaN(currencyAmount)) {
        console.log('The amount has to be a number');
        amountFor();
    } else {
        console.log('The amount can not be less than 1');
        amountFor();
    }
}

function calculateCurrency() {
    let currencyCostFrom;
    let currencyCostTo;
    for (let cur in currencyList) {
        if (cur === currencyNameFrom) {
            currencyCostFrom = currencyList[cur];
        }
    }
    for (let cur in currencyList) {
        if (cur === currencyNameTo) {
            currencyCostTo = currencyList[cur];
        }
    }
    let result = (currencyAmount / currencyCostFrom * currencyCostTo).toFixed(4);
    console.log(`Result: ${currencyAmount} ${currencyNameFrom} equals ${result} ${currencyNameTo}`);
    chooseWhatToDo();
}

