const form = document.getElementById('expense-form');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const list = document.getElementById('list');

let transactions = [];

// Function to display transactions
function displayTransactions() {
  list.innerHTML = '';

  transactions.forEach(transaction => {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
      ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
  });
}

// Function to add transaction
function addTransaction(e) {
  e.preventDefault();

  if (textInput.value.trim() === '' || amountInput.value.trim() === '') {
    alert('Please enter both description and amount.');
    return;
  }

  const transaction = {
    id: generateID(),
    text: textInput.value.trim(),
    amount: +amountInput.value.trim()
  };

  transactions.push(transaction);
  displayTransactions();
  
  textInput.value = '';
  amountInput.value = '';
}

// Function to remove transaction
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  displayTransactions();
}

// Function to generate random ID
function generateID() {
  return Math.floor(Math.random() * 1000000);
}

// Event Listener for adding transaction
form.addEventListener('submit', addTransaction);

// Initial display
displayTransactions();
