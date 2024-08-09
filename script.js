// script.js
const apiKey = 'cb2f1b64030a0d90a497a87b'; // Your API key
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

async function fetchCurrencies() {
    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const currencies = Object.keys(data.conversion_rates);
        populateCurrencyOptions(currencies);
    } catch (error) {
        console.error("Error fetching currencies:", error);
    }
}

function populateCurrencyOptions(currencies) {
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');

    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.textContent = currency;
        fromCurrency.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = currency;
        option2.textContent = currency;
        toCurrency.appendChild(option2);
    });
}

async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (amount === '' || isNaN(amount)) {
        alert('Please enter a valid amount.');
        return;
    }

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const conversionRate = data.conversion_rate;
        const result = (amount * conversionRate).toFixed(2);

        document.getElementById('result').textContent = 
            `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
    } catch (error) {
        console.error("Error converting currency:", error);
    }
}

// Fetch currencies when the page loads
fetchCurrencies();
