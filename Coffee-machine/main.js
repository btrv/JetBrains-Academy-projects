const input = require('sync-input')

let iWantToExit = false;
let money = 550;
let numberOfSupplies = {
    'water': 400,
    'milk': 540,
    'coffee beans': 120,
    'disposable cups': 9,
    'sugar': 50,
}
let espresso = {
    'water': 250,
    'milk': 0,
    'coffee beans': 16,
    'disposable cups': 1,
    'money': 4
}
let latte = {
    'water': 350,
    'milk': 75,
    'coffee beans': 20,
    'disposable cups': 1,
    'money': 7
}
let cappuccino = {
    'water': 200,
    'milk': 100,
    'coffee beans': 12,
    'disposable cups': 1,
    'money': 6
}

while(iWantToExit === false) {
    chooseAction();
}

function chooseAction() {
    let action = input('Write action (buy, fill, take, remaining, exit):\n');
    switch (action) {
        case 'buy':
            buyCoffee();
            break;
        case 'fill':
            toppingUp();
            break;
        case 'take':
            takeMoney();
            break;
        case 'remaining':
            stateOfMachine();
            break;
        case 'exit':
            iWantToExit = true;
            break;
        default:
            console.log('Wrong input');
            break;
    }
}

function stateOfMachine() {
    console.log('The coffee machine has:');
    console.log(`${numberOfSupplies.water} ml of water`);
    console.log(`${numberOfSupplies.milk} ml of milk`);
    console.log(`${numberOfSupplies['coffee beans']} g of coffee beans`);
    console.log(`${numberOfSupplies['disposable cups']} disposable cups`);
    console.log(`${numberOfSupplies.sugar} spoons of sugar`);
    console.log(`$${money} of money`);
}

function buyCoffee() {
    let choice = input('What do you want to buy? ' +
        '1 - espresso, ' +
        '2 - latte, ' +
        '3 - cappuccino, ' +
        '4 - back to main menu:\n');
    switch (choice) {
        case '1':
            calcSupplies(espresso);
            break;
        case '2':
            calcSupplies(latte);
            break;
        case '3':
            calcSupplies(cappuccino);
            break;
        case '4':
            chooseAction();
            break;
        default:
            console.log('Wrong input');
            break;
    }
}

function calcSupplies(coffeeObj) {
    sugarAdd();
    for (let x in coffeeObj) {
        if (coffeeObj[x] > numberOfSupplies[x]) {
            console.log(`Sorry, not enough ${x}!`);
            break;
        } else numberOfSupplies[x] -= coffeeObj[x];
    }
    console.log('I have enough resources, making you a coffee!\n');
    money += coffeeObj.money;
}

function sugarAdd() {
    let sugarAmount = input('Would you like to add some sugar? \nEnter from 0 to 5:\n');
    if (sugarAmount < numberOfSupplies.sugar) {
        numberOfSupplies.sugar -= sugarAmount;
    } else if(sugarAmount > 5) {
        console.log('Maximum quantity of sugar is 5!');
        sugarAdd();
    } else {
        console.log('Wrong input');
        sugarAdd();
    }
}

function toppingUp() {
    let addWater = input('Write how many ml of water you want to add:\n');
    let addMilk = input('Write how many ml of milk you want to add:\n');
    let addBeans = input('Write how many grams of coffee beans you want to add:\n');
    let addCups = input('Write how many disposable coffee cups you want to add:\n');
    let addSugar = input('Write how many sugar you want to add:\n');
    numberOfSupplies["water"] += +addWater;
    numberOfSupplies["milk"] += +addMilk;
    numberOfSupplies["coffee beans"] += +addBeans;
    numberOfSupplies["disposable cups"] += +addCups;
    numberOfSupplies["sugar"] += +addSugar;
}

function takeMoney() {
    console.log(`I gave you $${money}\n`);
    money = 0;
}