
/*
    * All transactions are stored in this array.
    *
    * Example:
    * [
    *   {
    *     id: 123,
    *     description: "Salary",
    *     amount: 1000,
    *     type: "income"
    *   }
    * ]
    */
let transactions = [];

/*
    * Load data from LocalStorage when page loads.
    */
loadTransactions();

/*
    * Add a new transaction.
    */
function addTransaction() {

    const description = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;
    const type = document.getElementById("type").value;

    // Simple validation
    if (!description || !amount) {
        alert("Please enter description and amount");
        return;
    }

    // Create transaction object
    const transaction = {
        id: Date.now(), // unique ID
        description: description,
        amount: Number(amount),
        type: type
    };

    // Add to array
    transactions.push(transaction);

    // Save to LocalStorage
    saveTransactions();

    // Refresh UI
    renderTransactions();

    // Clear form
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
}

/*
    * Delete transaction by ID.
    */
function deleteTransaction(id) {

    transactions = transactions.filter(function(item) {
        return item.id !== id;
    });

    saveTransactions();
    renderTransactions();
}

/*
    * Save transactions array to LocalStorage.
    *
    * LocalStorage only stores strings,
    * so we convert array to JSON string.
    */
function saveTransactions() {
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

/*
    * Load transactions from LocalStorage.
    */
function loadTransactions() {

    const savedData = localStorage.getItem("transactions");

    if (savedData) {
        transactions = JSON.parse(savedData);
    }

    renderTransactions();
}

/*
    * Render all transactions to table.
    */
function renderTransactions() {

    const table = document.getElementById("transactionTable");

    // Clear existing rows
    table.innerHTML = "";

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(function(item) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.description}</td>
            <td class="${item.type}">
                ${item.type}
            </td>
            <td>$${item.amount}</td>
            <td>
                <button
                    class="delete"
                    onclick="deleteTransaction(${item.id})">
                    Delete
                </button>
            </td>
        `;

        table.appendChild(row);

        // Calculate totals
        if (item.type === "income") {
            totalIncome += item.amount;
        } else {
            totalExpense += item.amount;
        }
    });

    const balance = totalIncome - totalExpense;

    document.getElementById("totalIncome").textContent = totalIncome;
    document.getElementById("totalExpense").textContent = totalExpense;
    document.getElementById("balance").textContent = balance;
}