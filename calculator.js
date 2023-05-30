const list = document.getElementById("list");
const totalCal = document.getElementById("total-calories");
const resultMsg = document.getElementById("total-calories");
const recipeIng = document.querySelector(".recipe__ingredients");
const welcomeMsg = document.querySelector(".welcome-message");

let ingredientCounter = 0;
let totalCalories = 0;

const displayMessage = function (message) {
    document.querySelector(".message").textContent = message;
};

const viewIngredients = function (name, quantity, cal) {
    return `
  <li class="recipe__ingredient">
    ${name} - 
    <span class="quantity">${quantity}</span>
    <span class="unit">гр. - </span>
    <span class="calorie">${cal}</span> ккал/100гр. - </span>
    <span class="calorie">${quantity*(cal/100)}ккал</span>
  </li>`;
};

const viewTotal = function (total, msg) {
    return `
    <span class="total-heading">Усього калорій: </span>
    <span class="total-amount">${total.toFixed(2)}</span>
    <div id="result-message" class="result-message">
      ${msg}
    </div>
  `;
};

const isNegative = function (n) {
    return (res = Math.sign(n) === -1 ? false : true);
};

const checkCalorieRate = function (quantity, cal) {
    return (res = cal / quantity > 20 ? false : true);
};

const calculateTotalCalorie = function (total, amount, cal) {
    total += (amount * cal) / 100;
    return total;
};

const resultMessage = function (total) {
    if (total <= 100) {
        return "🥑 Як повітря, смачного!";
    } else if (101 <= total && total <= 400) {
        return "🥛 Досить здорова страва";
    } else if (401 <= total && total <= 700) {
        return "🍕 Краще замислитися, але разок можна)";
    } else {
        return "🚫 Краще не треба";
    }
};

const reset = function () {
    displayMessage("");
    totalCal.innerHTML = "";
};

document.querySelector(".btn--add").addEventListener("click", function (e) {
    e.preventDefault();
    reset();

    if (recipeIng.classList.contains("hidden")) {
        recipeIng.classList.remove("hidden");
    }

    if (!welcomeMsg.classList.contains("hidden")) {
        welcomeMsg.classList.add("hidden");
    }

    const name = document.getElementById("ingredient-name").value;
    const quantity = document.getElementById("amount").value;
    const calories = +document.getElementById("calories").value;

    const quantityArr = quantity.split(" ");

    const amount = +quantityArr[0];

    // When there is no input
    if (!name || !quantity || !calories) {
        displayMessage("⛔ Немає даних!");

        // If ingredients number is 10
    } else if (ingredientCounter === 10) {
        displayMessage("⛔ Введена максимальна кількість інгрідієнтів!");

        // Negative check
    } else if (!isNegative(amount) || !isNegative(calories)) {
        displayMessage("⛔ Калорії не можуть бути негативні!");

        // Input format
    } else if (!amount) {
        displayMessage("⛔ Невірний формат вводу!");

        // Cal/gr rate check
    } else if (!checkCalorieRate(amount, calories)) {
        displayMessage(
            "⛔ Не може бути більше 20 калорій на грам! (якщо це не уран)"
        );

        // Add ingredients
    } else {
        list.innerHTML += viewIngredients(name, amount, calories);
        totalCalories = calculateTotalCalorie(totalCalories, amount, calories);

        ingredientCounter++;
    }

    document.getElementById("ingredient-name").value = ''
    document.getElementById("amount").value = ''
    document.getElementById("calories").value = ''
    

});

document
    .querySelector(".btn--calculate")
    .addEventListener("click", function (e) {
        e.preventDefault();

        totalCal.innerHTML = viewTotal(totalCalories, resultMessage(totalCalories));
    });